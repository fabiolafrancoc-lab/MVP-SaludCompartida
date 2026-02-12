import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const documentNumber = searchParams.get('documentNumber');
    
    if (!documentNumber) {
      return NextResponse.json({ error: 'documentNumber requerido' }, { status: 400 });
    }
    
    const supabase = getSupabaseClient();
    
    // Buscar por family_code (usamos como documentNumber)
    const { data: registration, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('family_code', documentNumber)
      .eq('status', 'active')
      .single();
    
    if (error || !registration) {
      return NextResponse.json(
        { error: 'El dni / referencia no coinciden con un afiliado activo' },
        { status: 404 }
      );
    }
    
    // Formatear fecha dd-mm-yyyy
    const birthDate = registration.family_birthdate 
      ? new Date(registration.family_birthdate).toLocaleDateString('es-MX', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        }).split('/').join('-')
      : '01-01-1980';
    
    // Respuesta con datos del paciente
    return NextResponse.json({
      email: registration.family_primary_email || registration.family_email,
      name: `${registration.family_first_name} ${registration.family_last_name}`,
      documentNumber: registration.family_code,
      documentType: 'PAS',
      birthDate: birthDate,
      gender: registration.family_sex || 'M',
      mobilePhone: registration.family_phone?.replace(/\D/g, ''),
      plan: 'SALUDCOMPARTIDA',
      credential: registration.family_code,
      healthInsurance: 'SaludCompartida',
      owner: 'true',
      externalId: registration.family_code
    });
    
  } catch (error: any) {
    console.error('Error validando paciente LAD:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
