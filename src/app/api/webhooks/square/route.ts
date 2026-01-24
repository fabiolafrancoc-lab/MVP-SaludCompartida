import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const event = JSON.parse(body);

    console.log('Square webhook event:', event.type);

    if (event.type === 'payment.completed') {
      await handlePaymentCompleted(event.data?.object?.payment);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function handlePaymentCompleted(payment: any) {
  if (!payment) return;

  console.log('Payment completed:', payment.id);

  const orderId = payment.order_id;
  const supabase = getSupabaseClient();

  const { data: registration, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('square_order_id', orderId)
    .single();

  if (error || !registration) {
    console.error('Registration not found for order:', orderId);
    return;
  }

  await supabase
    .from('registrations')
    .update({
      subscription_status: 'active',
      square_payment_id: payment.id,
      square_customer_id: payment.customer_id,
      activated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('registration_id', registration.registration_id);

  console.log('Registration activated:', registration.codigo_familia);

  // Disparar notificaciones
  try {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/notificaciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'activation',
        registrationId: registration.registration_id,
        codigoFamilia: registration.codigo_familia,
        suscriptorEmail: registration.suscriptor_email,
        suscriptorNombre: registration.suscriptor_nombre,
        suscriptorTelefono: registration.suscriptor_telefono,
        usuarioPrincipalNombre: registration.usuario_principal_nombre,
        usuarioPrincipalTelefono: registration.usuario_principal_telefono,
        planName: registration.plan_name,
      }),
    });
  } catch (notifError) {
    console.error('Error sending notifications:', notifError);
  }
}
