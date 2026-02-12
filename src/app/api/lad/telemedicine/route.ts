import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import { mapSupabaseToLAD, validateRegistrationForLAD } from '@/lib/lad-mapper';

export async function POST(request: NextRequest) {
  try {
    const { familyCode, consultationType = 'video' } = await request.json();
    
    if (!familyCode) {
      return NextResponse.json({ error: 'Código familiar requerido' }, { status: 400 });
    }
    
    const supabase = getSupabaseClient();
    const { data: registration, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('family_code', familyCode)
      .eq('status', 'active')
      .single();
    
    if (error || !registration) {
      return NextResponse.json({ error: 'Código no encontrado' }, { status: 404 });
    }
    
    const validation = validateRegistrationForLAD(registration);
    if (!validation.valid) {
      return NextResponse.json({ error: 'Datos incompletos', missing: validation.missing }, { status: 400 });
    }
    
    const ladRequest = mapSupabaseToLAD(registration, 'telemedicine', consultationType);
    
    const tokenResponse = await fetch(`${process.env.LAD_API_URL}/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.LAD_CLIENT_ID,
        client_secret: process.env.LAD_CLIENT_SECRET,
        grant_type: 'client_credentials'
      })
    });
    
    if (!tokenResponse.ok) {
      throw new Error('Error de autenticación con LAD');
    }
    
    const { access_token } = await tokenResponse.json();
    
    const consultationResponse = await fetch(`${process.env.LAD_API_URL}/consultations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify(ladRequest)
    });
    
    if (!consultationResponse.ok) {
      const errorData = await consultationResponse.json();
      throw new Error(`Error creando consulta: ${JSON.stringify(errorData)}`);
    }
    
    const consultation = await consultationResponse.json();
    
    await supabase.from('service_usage').insert({
      registration_id: registration.id,
      service_type: 'telemedicina',
      description: `Consulta ${consultationType} - LAD ID: ${consultation.id}`,
      amount_paid: 0,
      amount_saved: 50,
      used_at: new Date().toISOString()
    });
    
    return NextResponse.json({
      success: true,
      consultation: {
        id: consultation.id,
        status: consultation.status,
        video_url: consultation.video_url || consultation.meeting_url,
        scheduled_at: consultation.scheduled_at
      }
    });
    
  } catch (error: any) {
    console.error('Error en telemedicina LAD:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
