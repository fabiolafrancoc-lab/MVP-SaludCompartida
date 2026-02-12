import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { familyCode } = await request.json();
    
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
    
    // Guardar uso
    await supabase.from('service_usage').insert({
      registration_id: registration.id,
      service_type: 'telemedicina',
      description: 'Acceso a videollamada LAD',
      amount_paid: 0,
      amount_saved: 50,
      used_at: new Date().toISOString()
    });
    
    // URL de la app LAD (el usuario se loguea con su family_code)
    const ladAppUrl = process.env.LAD_APP_URL || 'https://app.llamandoaldoctor.com';
    
    return NextResponse.json({
      success: true,
      app_url: ladAppUrl,
      documentNumber: registration.family_code,
      instructions: 'Ingresa con tu código de familia como documento'
    });
    
  } catch (error: any) {
    console.error('Error en telemedicina LAD:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
