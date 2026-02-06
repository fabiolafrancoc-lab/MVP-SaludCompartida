import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import { 
  sendMigrantWelcomeEmail,
  sendAuraImmediateNotification 
} from '@/lib/resend';

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

  console.log('✅ Registration activated:', registration.codigo_familia);

  // ════════════════════════════════════════════════════════════════════════
  // ENVIAR EMAILS PERSONALIZADOS (con datos de Supabase)
  // ════════════════════════════════════════════════════════════════════════
  console.log('📧 [WEBHOOK] Sending personalized emails from Supabase data...');

  try {
    const now = new Date();
    const activationDate = now.toLocaleDateString('es-MX', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const activationTime = now.toLocaleTimeString('es-MX', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    // Email 1: Al migrante en USA
    await sendMigrantWelcomeEmail({
      migrantName: registration.suscriptor_nombre,
      migrantEmail: registration.suscriptor_email,
      codigoFamilia: registration.codigo_familia,
      planName: registration.plan_name || 'SaludCompartida Familiar',
      planPrice: registration.plan_price || 12,
    });
    console.log('✅ [WEBHOOK] Migrant email sent');

    // Email 2: A la familia en México (se envía vía WhatsApp, no email)
    console.log('ℹ️ [FAMILIA] Notificación enviada vía WhatsApp (no email)');

    // Email 3: A contact@saludcompartida.app
    await sendAuraImmediateNotification({
      migrantName: registration.suscriptor_nombre.split(' ')[0],
      migrantLastName: registration.suscriptor_nombre.split(' ').slice(1).join(' '),
      migrantEmail: registration.suscriptor_email,
      migrantPhone: registration.suscriptor_telefono,
      principalName: registration.usuario_principal_nombre.split(' ')[0],
      principalLastName: registration.usuario_principal_nombre.split(' ').slice(1).join(' '),
      principalBirthDate: 'N/A',
      principalPhone: registration.usuario_principal_telefono,
      codigoFamilia: registration.codigo_familia,
      planName: registration.plan_name || 'SaludCompartida Familiar',
      planPrice: registration.plan_price || 12,
      familyMembersCount: 1,
      activationDate,
      activationTime,
    });
    console.log('✅ [WEBHOOK] Aura notification sent to contact@saludcompartida.app');

  } catch (emailError) {
    console.error('❌ [WEBHOOK] Error sending emails:', emailError);
  }
}
