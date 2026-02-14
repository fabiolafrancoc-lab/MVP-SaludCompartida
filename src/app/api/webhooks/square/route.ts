import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ════════════════════════════════════════════════════════════════════════════
// WEBHOOK: /api/webhooks/square
// Recibe eventos de Square para actualizar estado de suscripciones
// ════════════════════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const event = JSON.parse(body);

    console.log('🔔 [SQUARE WEBHOOK] Event received:', event.type);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    switch (event.type) {
      case 'subscription.created':
        await handleSubscriptionCreated(event.data?.object?.subscription, supabase);
        break;
      
      case 'subscription.updated':
        await handleSubscriptionUpdated(event.data?.object?.subscription, supabase);
        break;
      
      case 'invoice.payment_made':
        await handleInvoicePaymentMade(event.data?.object?.invoice_payment_made, supabase);
        break;
      
      case 'invoice.payment.failed':
        await handleInvoicePaymentFailed(event.data?.object?.invoice_payment_failed, supabase);
        break;

      default:
        console.log('ℹ️  Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('❌ [WEBHOOK] Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// ════════════════════════════════════════════════════════════════════════════
// Handler: Suscripción creada
// ════════════════════════════════════════════════════════════════════════════
async function handleSubscriptionCreated(subscription: any, supabase: any) {
  if (!subscription) return;
  
  console.log('✅ [WEBHOOK] Subscription created:', subscription.id);
  
  // Actualizar estado en registrations
  await supabase
    .from('registrations')
    .update({
      status: subscription.status === 'ACTIVE' ? 'active' : 'pending',
    })
    .eq('square_subscription_id', subscription.id);
}

// ════════════════════════════════════════════════════════════════════════════
// Handler: Suscripción actualizada (cancelada, pausada, reactivada)
// ════════════════════════════════════════════════════════════════════════════
async function handleSubscriptionUpdated(subscription: any, supabase: any) {
  if (!subscription) return;
  
  console.log('🔄 [WEBHOOK] Subscription updated:', subscription.id, subscription.status);
  
  const statusMap: Record<string, string> = {
    'ACTIVE': 'active',
    'CANCELED': 'cancelled',
    'PAUSED': 'suspended',
    'PENDING': 'pending',
  };
  
  await supabase
    .from('registrations')
    .update({
      status: statusMap[subscription.status] || 'pending',
    })
    .eq('square_subscription_id', subscription.id);
}

// ════════════════════════════════════════════════════════════════════════════
// Handler: Pago mensual exitoso
// ════════════════════════════════════════════════════════════════════════════
async function handleInvoicePaymentMade(invoicePayment: any, supabase: any) {
  if (!invoicePayment) return;
  
  const invoice = invoicePayment.invoice;
  const payment = invoicePayment.payment;
  
  console.log('💰 [WEBHOOK] Payment made:', payment.id);
  console.log('📄 Invoice:', invoice.id);
  console.log('💵 Amount:', payment.amount_money?.amount / 100, payment.amount_money?.currency);

  // Buscar el registration por subscription_id
  const { data: registration } = await supabase
    .from('registrations')
    .select('id')
    .eq('square_subscription_id', invoice.subscription_id)
    .single();

  if (!registration) {
    console.error('❌ Registration not found for subscription:', invoice.subscription_id);
    return;
  }

  // Calcular periodo de facturación
  const billingPeriodStart = invoice.scheduled_at ? new Date(invoice.scheduled_at) : new Date();
  const billingPeriodEnd = new Date(billingPeriodStart);
  billingPeriodEnd.setMonth(billingPeriodEnd.getMonth() + 1);

  // Guardar pago en historial
  await supabase.from('subscription_payments').insert({
    registration_id: registration.id,
    square_invoice_id: invoice.id,
    square_payment_id: payment.id,
    amount: payment.amount_money?.amount / 100,
    currency: payment.amount_money?.currency || 'USD',
    status: 'paid',
    billing_period_start: billingPeriodStart.toISOString().slice(0, 10),
    billing_period_end: billingPeriodEnd.toISOString().slice(0, 10),
    paid_at: new Date().toISOString(),
  });

  // Actualizar fecha del próximo cobro
  await supabase
    .from('registrations')
    .update({
      status: 'active',
      last_payment_at: new Date().toISOString(),
      next_billing_date: billingPeriodEnd.toISOString().slice(0, 10),
    })
    .eq('id', registration.id);

  console.log('✅ [WEBHOOK] Payment recorded in subscription_payments');
}

// ════════════════════════════════════════════════════════════════════════════
// Handler: Pago mensual fallido
// ════════════════════════════════════════════════════════════════════════════
async function handleInvoicePaymentFailed(invoicePayment: any, supabase: any) {
  if (!invoicePayment) return;
  
  const invoice = invoicePayment.invoice;
  
  console.error('❌ [WEBHOOK] Payment failed for invoice:', invoice.id);

  // Buscar el registration
  const { data: registration } = await supabase
    .from('registrations')
    .select('id')
    .eq('square_subscription_id', invoice.subscription_id)
    .single();

  if (!registration) {
    console.error('❌ Registration not found for subscription:', invoice.subscription_id);
    return;
  }

  // Registrar el fallo en el historial
  const billingPeriodStart = invoice.scheduled_at ? new Date(invoice.scheduled_at) : new Date();
  const billingPeriodEnd = new Date(billingPeriodStart);
  billingPeriodEnd.setMonth(billingPeriodEnd.getMonth() + 1);

  await supabase.from('subscription_payments').insert({
    registration_id: registration.id,
    square_invoice_id: invoice.id,
    square_payment_id: null,
    amount: invoice.payment_requests?.[0]?.computed_amount_money?.amount / 100 || 12.00,
    currency: 'USD',
    status: 'failed',
    billing_period_start: billingPeriodStart.toISOString().slice(0, 10),
    billing_period_end: billingPeriodEnd.toISOString().slice(0, 10),
  });

  // Marcar la suscripción como suspended si hay fallos consecutivos
  await supabase
    .from('registrations')
    .update({
      status: 'suspended',
    })
    .eq('id', registration.id);

  console.log('⚠️  [WEBHOOK] Payment failure recorded');
}
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
