import { NextRequest, NextResponse } from 'next/server';
import { sendPostPaymentNotifications } from '@/lib/post-payment-notifications';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { registration_id } = body;

    if (!registration_id) {
      return NextResponse.json({
        success: false,
        error: 'Missing registration_id'
      }, { status: 400 });
    }

    console.log('📧 Procesando notificaciones post-pago para:', registration_id);

    // Obtener datos del registro
    const { data: registration, error: fetchError } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', registration_id)
      .single();

    if (fetchError || !registration) {
      console.error('❌ Error obteniendo registro:', fetchError);
      return NextResponse.json({
        success: false,
        error: 'Registration not found'
      }, { status: 404 });
    }

    // Verificar que tenga email del migrante
    if (!registration.migrant_email) {
      console.error('❌ Registro sin email de migrante');
      return NextResponse.json({
        success: false,
        error: 'Migrant email is required'
      }, { status: 400 });
    }

    // Enviar todas las notificaciones
    const results = await sendPostPaymentNotifications({
      registration_id: registration.id,
      family_code: registration.family_code,
      migrant_first_name: registration.migrant_first_name,
      migrant_last_name: registration.migrant_last_name,
      migrant_email: registration.migrant_email,
      migrant_phone: `${registration.migrant_country_code}${registration.migrant_phone}`,
      family_first_name: registration.family_first_name,
      family_last_name: registration.family_last_name,
      family_email: registration.family_email || undefined,
      family_phone: `${registration.family_country_code}${registration.family_phone}`,
      companion_assigned: registration.companion_assigned,
    });

    // Actualizar el registro con timestamp de notificaciones
    await supabase
      .from('registrations')
      .update({
        notifications_sent_at: new Date().toISOString(),
      })
      .eq('id', registration_id);

    return NextResponse.json({
      success: true,
      results,
    });

  } catch (error: any) {
    console.error('❌ Error en send-notifications:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
