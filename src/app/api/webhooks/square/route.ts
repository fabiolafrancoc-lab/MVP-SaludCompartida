import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import { 
  sendMigrantWelcomeEmail,
  sendAuraImmediateNotification 
} from '@/lib/resend';
import crypto from 'crypto';

// ════════════════════════════════════════════════════════════════════════════
// SQUARE WEBHOOK HANDLER - COMPREHENSIVE FIX
// ════════════════════════════════════════════════════════════════════════════
// Handles: subscription.created, subscription.updated, payment.created, 
//          payment.updated, invoice.payment_made
// Features: Signature validation, idempotent upserts, comprehensive logging
// ════════════════════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  console.log('🔔 [SQUARE WEBHOOK] Incoming webhook request');

  try {
    // ════════════════════════════════════════════════════════════════════════
    // 1️⃣ READ AND VALIDATE REQUEST
    // ════════════════════════════════════════════════════════════════════════
    const body = await request.text();
    const signature = request.headers.get('x-square-hmacsha256-signature');
    const webhookUrl = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;

    // Validate signature if configured (recommended for production)
    if (webhookUrl && signature) {
      const isValid = verifySquareSignature(body, signature, webhookUrl);
      if (!isValid) {
        console.error('❌ [SQUARE WEBHOOK] Invalid signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
      console.log('✅ [SQUARE WEBHOOK] Signature validated');
    } else {
      console.warn('⚠️ [SQUARE WEBHOOK] Signature validation skipped (not configured)');
    }

    const event = JSON.parse(body);
    const eventType = event.type;
    const eventId = event.event_id || `event_${Date.now()}`;

    console.log('📨 [SQUARE WEBHOOK] Event type:', eventType);
    console.log('🆔 [SQUARE WEBHOOK] Event ID:', eventId);

    // ════════════════════════════════════════════════════════════════════════
    // 2️⃣ LOG WEBHOOK EVENT (for auditing and debugging)
    // ════════════════════════════════════════════════════════════════════════
    const supabase = getSupabaseClient();
    
    await logWebhookEvent(supabase, {
      event_type: eventType,
      square_event_id: eventId,
      payload: event,
    });

    // ════════════════════════════════════════════════════════════════════════
    // 3️⃣ ROUTE TO APPROPRIATE HANDLER
    // ════════════════════════════════════════════════════════════════════════
    let result;
    
    switch (eventType) {
      case 'subscription.created':
      case 'subscription.updated':
        result = await handleSubscriptionEvent(supabase, event);
        break;
        
      case 'payment.created':
      case 'payment.updated':
        result = await handlePaymentEvent(supabase, event);
        break;
        
      case 'invoice.payment_made':
      case 'invoice.paid':
        result = await handleInvoiceEvent(supabase, event);
        break;
        
      default:
        console.log(`ℹ️ [SQUARE WEBHOOK] Unhandled event type: ${eventType}`);
        result = { handled: false, message: 'Event type not handled' };
    }

    // ════════════════════════════════════════════════════════════════════════
    // 4️⃣ UPDATE WEBHOOK LOG WITH RESULT
    // ════════════════════════════════════════════════════════════════════════
    await updateWebhookLog(supabase, eventId, result.handled, result.error);

    const duration = Date.now() - startTime;
    console.log(`✅ [SQUARE WEBHOOK] Completed in ${duration}ms`);

    return NextResponse.json({ 
      received: true,
      handled: result.handled,
      duration_ms: duration
    });

  } catch (error: any) {
    console.error('❌ [SQUARE WEBHOOK] Unexpected error:', error);
    console.error('❌ [SQUARE WEBHOOK] Stack:', error?.stack);
    
    return NextResponse.json(
      { error: 'Webhook processing failed', message: error?.message },
      { status: 500 }
    );
  }
}

// ════════════════════════════════════════════════════════════════════════════
// SIGNATURE VERIFICATION
// ════════════════════════════════════════════════════════════════════════════
function verifySquareSignature(body: string, signature: string, signatureKey: string): boolean {
  try {
    const hmac = crypto.createHmac('sha256', signatureKey);
    hmac.update(body);
    const hash = hmac.digest('base64');
    return hash === signature;
  } catch (error) {
    console.error('❌ [SIGNATURE] Verification failed:', error);
    return false;
  }
}

// ════════════════════════════════════════════════════════════════════════════
// WEBHOOK EVENT LOGGING
// ════════════════════════════════════════════════════════════════════════════
async function logWebhookEvent(supabase: any, data: any) {
  try {
    const { error } = await supabase
      .from('square_webhooks')
      .upsert({
        event_type: data.event_type,
        square_event_id: data.square_event_id,
        payload: data.payload,
        processed: false,
        created_at: new Date().toISOString(),
      }, {
        onConflict: 'square_event_id',
        ignoreDuplicates: true,
      });

    if (error) {
      console.error('❌ [LOG] Failed to log webhook:', error);
    } else {
      console.log('✅ [LOG] Webhook event logged');
    }
  } catch (error) {
    console.error('❌ [LOG] Exception logging webhook:', error);
  }
}

async function updateWebhookLog(supabase: any, eventId: string, processed: boolean, error?: string) {
  try {
    await supabase
      .from('square_webhooks')
      .update({
        processed,
        processed_at: new Date().toISOString(),
        processing_error: error || null,
      })
      .eq('square_event_id', eventId);
  } catch (err) {
    console.error('❌ [LOG] Failed to update webhook log:', err);
  }
}

// ════════════════════════════════════════════════════════════════════════════
// SUBSCRIPTION EVENT HANDLER
// ════════════════════════════════════════════════════════════════════════════
async function handleSubscriptionEvent(supabase: any, event: any) {
  console.log('📝 [SUBSCRIPTION] Processing subscription event');
  
  try {
    const subscription = event.data?.object?.subscription;
    if (!subscription) {
      console.error('❌ [SUBSCRIPTION] No subscription data in event');
      return { handled: false, error: 'No subscription data' };
    }

    const subscriptionId = subscription.id;
    const customerId = subscription.customer_id;
    const status = subscription.status;
    const planVariationId = subscription.plan_variation_id;

    console.log('🆔 [SUBSCRIPTION] ID:', subscriptionId);
    console.log('👤 [SUBSCRIPTION] Customer ID:', customerId);
    console.log('📊 [SUBSCRIPTION] Status:', status);

    // Find registration by customer_id
    const { data: registration } = await supabase
      .from('registrations')
      .select('*')
      .eq('square_customer_id', customerId)
      .single();

    if (!registration) {
      console.warn('⚠️ [SUBSCRIPTION] No registration found for customer:', customerId);
      return { handled: false, error: 'Registration not found' };
    }

    console.log('✅ [SUBSCRIPTION] Found registration:', registration.id);

    // Upsert subscription (idempotent)
    const { error: subError } = await supabase
      .from('square_subscriptions')
      .upsert({
        registration_id: registration.id,
        square_customer_id: customerId,
        square_subscription_id: subscriptionId,
        square_plan_variation_id: planVariationId,
        status: status,
        start_date: subscription.start_date || new Date().toISOString().split('T')[0],
        canceled_date: subscription.canceled_date || null,
        paused_date: subscription.paused_date || null,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'square_subscription_id',
      });

    if (subError) {
      console.error('❌ [SUBSCRIPTION] Failed to save:', subError);
      return { handled: false, error: subError.message };
    }

    console.log('✅ [SUBSCRIPTION] Saved to database');

    // Update registration with subscription ID
    await supabase
      .from('registrations')
      .update({
        square_subscription_id: subscriptionId,
        status: status === 'ACTIVE' ? 'active' : 'pending',
        updated_at: new Date().toISOString(),
      })
      .eq('id', registration.id);

    console.log('✅ [SUBSCRIPTION] Registration updated');

    return { handled: true };

  } catch (error: any) {
    console.error('❌ [SUBSCRIPTION] Error:', error);
    return { handled: false, error: error?.message };
  }
}

// ════════════════════════════════════════════════════════════════════════════
// PAYMENT EVENT HANDLER
// ════════════════════════════════════════════════════════════════════════════
async function handlePaymentEvent(supabase: any, event: any) {
  console.log('💰 [PAYMENT] Processing payment event');
  
  try {
    const payment = event.data?.object?.payment;
    if (!payment) {
      console.error('❌ [PAYMENT] No payment data in event');
      return { handled: false, error: 'No payment data' };
    }

    const paymentId = payment.id;
    const customerId = payment.customer_id;
    const status = payment.status; // COMPLETED, APPROVED, PENDING, etc.
    const amount = payment.amount_money?.amount || 0;
    const currency = payment.amount_money?.currency || 'USD';

    console.log('🆔 [PAYMENT] ID:', paymentId);
    console.log('👤 [PAYMENT] Customer ID:', customerId);
    console.log('💵 [PAYMENT] Amount:', amount, currency);
    console.log('📊 [PAYMENT] Status:', status);

    // Find registration by customer_id
    const { data: registration } = await supabase
      .from('registrations')
      .select('*')
      .eq('square_customer_id', customerId)
      .single();

    if (!registration) {
      console.warn('⚠️ [PAYMENT] No registration found for customer:', customerId);
      return { handled: false, error: 'Registration not found' };
    }

    console.log('✅ [PAYMENT] Found registration:', registration.id);

    // Find or get subscription
    let subscriptionId = registration.square_subscription_id;
    let internalSubId = null;

    if (subscriptionId) {
      const { data: sub } = await supabase
        .from('square_subscriptions')
        .select('id')
        .eq('square_subscription_id', subscriptionId)
        .single();
      
      internalSubId = sub?.id;
    }

    // Check if payment already exists (for idempotency)
    const { data: existingPayment } = await supabase
      .from('square_payments')
      .select('id')
      .eq('square_payment_id', paymentId)
      .single();

    let payError;
    if (existingPayment) {
      // Update existing payment
      const { error } = await supabase
        .from('square_payments')
        .update({
          status: status,
          square_raw_response: payment,
          updated_at: new Date().toISOString(),
        })
        .eq('square_payment_id', paymentId);
      payError = error;
      console.log('✅ [PAYMENT] Updated existing payment');
    } else {
      // Insert new payment
      const { error } = await supabase
        .from('square_payments')
        .insert({
          subscription_id: internalSubId,
          square_subscription_id: subscriptionId || 'NONE',
          square_customer_id: customerId,
          square_payment_id: paymentId,
          square_invoice_id: payment.invoice_id || null,
          amount_cents: amount,
          status: status,
          payment_date: new Date().toISOString().split('T')[0],
          billing_period_start: new Date().toISOString().split('T')[0],
          square_raw_response: payment,
        });
      payError = error;
      console.log('✅ [PAYMENT] Inserted new payment');
    }

    if (payError) {
      console.error('❌ [PAYMENT] Failed to save:', payError);
      return { handled: false, error: payError.message };
    }

    console.log('✅ [PAYMENT] Saved to database');

    // If payment is successful, activate registration
    if (status === 'COMPLETED' || status === 'APPROVED') {
      const updateData: any = {
        status: 'active',
        square_payment_id: paymentId,
        last_payment_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Only set activated_at if not already set
      if (!registration.activated_at) {
        updateData.activated_at = new Date().toISOString();
      }

      await supabase
        .from('registrations')
        .update(updateData)
        .eq('id', registration.id);

      console.log('✅ [PAYMENT] Registration activated');

      // Send welcome emails only on first activation
      if (!registration.activated_at) {
        await sendWelcomeEmails(registration);
      }
    }

    return { handled: true };

  } catch (error: any) {
    console.error('❌ [PAYMENT] Error:', error);
    return { handled: false, error: error?.message };
  }
}

// ════════════════════════════════════════════════════════════════════════════
// INVOICE EVENT HANDLER
// ════════════════════════════════════════════════════════════════════════════
async function handleInvoiceEvent(supabase: any, event: any) {
  console.log('🧾 [INVOICE] Processing invoice event');
  
  try {
    const invoice = event.data?.object?.invoice;
    if (!invoice) {
      console.error('❌ [INVOICE] No invoice data in event');
      return { handled: false, error: 'No invoice data' };
    }

    // Extract payment info from invoice
    const paymentRequests = invoice.payment_requests || [];
    const customerId = invoice.primary_recipient?.customer_id;
    const subscriptionId = invoice.subscription_id;

    console.log('🆔 [INVOICE] ID:', invoice.id);
    console.log('👤 [INVOICE] Customer ID:', customerId);
    console.log('📋 [INVOICE] Subscription ID:', subscriptionId);

    if (!customerId) {
      console.warn('⚠️ [INVOICE] No customer ID in invoice');
      return { handled: false, error: 'No customer ID' };
    }

    // Process each payment in the invoice
    for (const request of paymentRequests) {
      if (request.computed_amount_money) {
        const amount = request.computed_amount_money.amount;
        const currency = request.computed_amount_money.currency;
        
        // Create a synthetic payment event
        const syntheticPayment = {
          data: {
            object: {
              payment: {
                id: invoice.id,
                customer_id: customerId,
                invoice_id: invoice.id,
                amount_money: { amount, currency },
                status: invoice.status === 'PAID' ? 'COMPLETED' : 'PENDING',
              }
            }
          }
        };

        await handlePaymentEvent(supabase, syntheticPayment);
      }
    }

    return { handled: true };

  } catch (error: any) {
    console.error('❌ [INVOICE] Error:', error);
    return { handled: false, error: error?.message };
  }
}

// ════════════════════════════════════════════════════════════════════════════
// SEND WELCOME EMAILS
// ════════════════════════════════════════════════════════════════════════════
async function sendWelcomeEmails(registration: any) {
  console.log('📧 [EMAILS] Sending welcome emails');

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

    // Email to migrant
    await sendMigrantWelcomeEmail({
      migrantName: registration.migrant_first_name || registration.migrant_name,
      migrantEmail: registration.migrant_email,
      codigoFamilia: registration.migrant_code || registration.family_code || 'N/A',
      planName: registration.plan_name || 'SaludCompartida Familiar',
      planPrice: registration.plan_price || 12,
    });
    console.log('✅ [EMAILS] Migrant email sent');

    // Email to internal team
    await sendAuraImmediateNotification({
      migrantName: registration.migrant_first_name || 'Usuario',
      migrantLastName: registration.migrant_last_name || '',
      migrantEmail: registration.migrant_email,
      migrantPhone: registration.migrant_phone || 'N/A',
      principalName: registration.family_first_name || 'Familia',
      principalLastName: registration.family_last_name || '',
      principalBirthDate: registration.family_birthdate || 'N/A',
      principalPhone: registration.family_phone || 'N/A',
      codigoFamilia: registration.family_code || 'N/A',
      planName: registration.plan_name || 'SaludCompartida Familiar',
      planPrice: registration.plan_price || 12,
      familyMembersCount: 1,
      activationDate,
      activationTime,
    });
    console.log('✅ [EMAILS] Internal notification sent');

  } catch (error) {
    console.error('❌ [EMAILS] Error sending emails:', error);
    // Don't throw - emails are not critical to payment processing
  }
}
