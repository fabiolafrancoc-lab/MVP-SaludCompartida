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
    
    // Formatear fecha dd-mm-yyyy
    const birthDate = registration.family_birthdate 
      ? new Date(registration.family_birthdate).toLocaleDateString('es-MX', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        }).split('/').join('-')
      : '01-01-1980';
    
    // Crear token LAD
    const ladBody = {
      provider: process.env.LAD_PROVIDER_ID,
      email: registration.family_primary_email || registration.family_email,
      name: `${registration.family_first_name} ${registration.family_last_name}`,
      documentNumber: registration.family_code,
      documentType: 'PAS',
      birthDate: birthDate,
      gender: registration.family_sex || 'M',
      phone: registration.family_phone?.replace(/\D/g, ''),
      plan: 'SALUDCOMPARTIDA',
      credential: registration.family_code,
      healthInsurance: 'SaludCompartida',
      owner: 'true',
      externalId: registration.family_code
    };
    
    const apiUrl = process.env.LAD_API_URL || 'https://api.llamandoaldoctor.com';
    const tokenUrl = `${apiUrl}/patient/token?client_id=${process.env.LAD_CLIENT_ID}&client_secret=${process.env.LAD_CLIENT_SECRET}`;
    
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ladBody)
    });
    
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Error LAD:', errorData);
      throw new Error(`Error LAD: ${errorData.message || 'Error desconocido'}`);
    }
    
    const { token } = await tokenResponse.json();
    
    // Guardar uso
    await supabase.from('service_usage').insert({
      registration_id: registration.id,
      service_type: 'telemedicina',
      description: 'Acceso a videollamada LAD',
      amount_paid: 0,
      amount_saved: 50,
      used_at: new Date().toISOString()
    });
    
    // URL de la PWA con token y shortFlow
    const pwaUrl = process.env.LAD_PWA_URL || 'https://app.llamandoaldoctor.com';
    const fullUrl = `${pwaUrl}/?token=${token}&shortFlow=true&skipMedicalHistory=true`;
    
    return NextResponse.json({
      success: true,
      pwa_url: fullUrl
    });
    
  } catch (error: any) {
    console.error('Error en telemedicina LAD:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
