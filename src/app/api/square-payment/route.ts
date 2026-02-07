import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import { 
  sendMigrantWelcomeEmail, 
  sendAuraImmediateNotification 
} from '@/lib/resend';

// ════════════════════════════════════════════════════════════════════════════
// ENDPOINT: /api/square-payment
// ════════════════════════════════════════════════════════════════════════════
// Flujo: Supabase (datos cliente) → Square Customer → Square Subscription
// ════════════════════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  console.log('🔍 [SQUARE] Iniciando creación de suscripción');
  
  try {
    const body = await request.json();
    const { sourceId, registrationId } = body;
    
    console.log('📦 [SQUARE] Body recibido:', { sourceId: sourceId?.substring(0, 20) + '...', registrationId });

    // Validación de parámetros
    if (!sourceId || !registrationId) {
      console.error('❌ [SQUARE] Faltan parámetros requeridos');
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // ════════════════════════════════════════════════════════════════════════
    // 1️⃣ SQUARE CREDENTIALS
    // ════════════════════════════════════════════════════════════════════════
    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
    const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
    const SQUARE_PLAN_VARIATION_ID = process.env.SQUARE_PLAN_VARIATION_ID || 'VU76FHKSAXPGGJT2MM72WKSZ';

    if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {
      console.error('❌ [SQUARE] Missing Square credentials');
      return NextResponse.json(
        { success: false, error: 'Square configuration error' },
        { status: 500 }
      );
    }

    // Detect sandbox vs production based on access token prefix
    const isSandbox = SQUARE_ACCESS_TOKEN.startsWith('EAAAl') || SQUARE_ACCESS_TOKEN.startsWith('sandbox-');
    const SQUARE_API = isSandbox
      ? 'https://connect.squareupsandbox.com/v2'
      : 'https://connect.squareup.com/v2';

    console.log('✅ [SQUARE] Credentials loaded');
    console.log('🔧 [SQUARE] Environment:', isSandbox ? 'SANDBOX' : 'PRODUCTION');
    console.log('📍 [SQUARE] Location ID:', SQUARE_LOCATION_ID);
    console.log('📦 [SQUARE] Plan ID:', SQUARE_PLAN_VARIATION_ID);

    // ════════════════════════════════════════════════════════════════════════
    // 2️⃣ SUPABASE - GET USER DATA
    // ════════════════════════════════════════════════════════════════════════
    const supabase = getSupabaseClient();

    console.log('🔍 [SUPABASE] Fetching registration:', registrationId);

    const { data: registration, error: supabaseError } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', registrationId)
      .single();

    if (supabaseError || !registration) {
      console.error('❌ [SUPABASE] Registration not found:', supabaseError);
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }

    console.log('✅ [SUPABASE] Registration found:', registration.migrant_email);

    // ════════════════════════════════════════════════════════════════════════
    // 3️⃣ SQUARE - CREATE CUSTOMER
    // ════════════════════════════════════════════════════════════════════════
    console.log('👤 [SQUARE] Creating customer...');

    const customerPayload = {
      idempotency_key: `customer_${registrationId}_${Date.now()}`,
      given_name: registration.migrant_first_name,
      family_name: registration.migrant_last_name,
      email_address: registration.migrant_email,
      phone_number: registration.migrant_phone,
      reference_id: String(registrationId),
    };

    console.log('📤 [SQUARE] Customer payload:', customerPayload);

    const customerResponse = await fetch(`${SQUARE_API}/customers`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerPayload),
    });

    const customerData = await customerResponse.json();

    if (!customerResponse.ok || customerData.errors) {
      console.error('❌ [SQUARE] Customer creation failed:', customerData);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create Square customer',
          details: customerData.errors || [],
        },
        { status: 500 }
      );
    }

    const customerId = customerData.customer.id;
    console.log('✅ [SQUARE] Customer created:', customerId);

    // ════════════════════════════════════════════════════════════════════════
    // 4️⃣ SQUARE - STORE CARD ON FILE
    // ════════════════════════════════════════════════════════════════════════
    console.log('💳 [SQUARE] Storing card on file...');

    const cardPayload = {
      idempotency_key: `card_${registrationId}_${Date.now()}`,
      source_id: sourceId,
      card: {
        customer_id: customerId,
      },
    };

    console.log('� [SQUARE] Card payload:', { ...cardPayload, source_id: sourceId.substring(0, 20) + '...' });

    const cardResponse = await fetch(`${SQUARE_API}/cards`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardPayload),
    });

    const cardData = await cardResponse.json();

    if (!cardResponse.ok || cardData.errors) {
      console.error('❌ [SQUARE] Card storage failed:', cardData);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to store card',
          details: cardData.errors || [],
        },
        { status: 500 }
      );
    }

    const cardId = cardData.card.id;
    console.log('✅ [SQUARE] Card stored:', cardId);

    // ════════════════════════════════════════════════════════════════════════
    // 5️⃣ SQUARE - CREATE SUBSCRIPTION
    // ════════════════════════════════════════════════════════════════════════
    console.log('� [SQUARE] Creating subscription...');

    const subscriptionPayload = {
      idempotency_key: `subscription_${registrationId}_${Date.now()}`,
      location_id: SQUARE_LOCATION_ID,
      plan_variation_id: SQUARE_PLAN_VARIATION_ID,
      customer_id: customerId,
      card_id: cardId,
      start_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      timezone: 'America/Mexico_City',
    };

    console.log('📤 [SQUARE] Subscription payload:', subscriptionPayload);

    const subscriptionResponse = await fetch(`${SQUARE_API}/subscriptions`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionPayload),
    });

    const subscriptionData = await subscriptionResponse.json();

    if (!subscriptionResponse.ok || subscriptionData.errors) {
      console.error('❌ [SQUARE] Subscription creation failed:', subscriptionData);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create subscription',
          details: subscriptionData.errors || [],
        },
        { status: 500 }
      );
    }

    const subscriptionId = subscriptionData.subscription.id;
    console.log('✅ [SQUARE] Subscription created:', subscriptionId);

    // ════════════════════════════════════════════════════════════════════════
    // 6️⃣ SQUARE - CREATE INITIAL PAYMENT ($12.00)
    // ════════════════════════════════════════════════════════════════════════
    console.log('💰 [SQUARE] Processing initial payment...');

    const paymentPayload = {
      idempotency_key: `payment_${registrationId}_${Date.now()}`,
      source_id: cardId,
      amount_money: {
        amount: 1200, // $12.00 USD en centavos
        currency: 'USD',
      },
      customer_id: customerId,
      location_id: SQUARE_LOCATION_ID,
      autocomplete: true,
    };

    console.log('📤 [SQUARE] Payment payload:', paymentPayload);

    const paymentResponse = await fetch(`${SQUARE_API}/payments`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentPayload),
    });

    const paymentData = await paymentResponse.json();

    if (!paymentResponse.ok || paymentData.errors) {
      console.error('❌ [SQUARE] Payment failed:', paymentData);
      return NextResponse.json(
        {
          success: false,
          error: 'Payment failed',
          details: paymentData.errors || [],
        },
        { status: 500 }
      );
    }

    const paymentId = paymentData.payment.id;
    console.log('✅ [SQUARE] Payment successful:', paymentId);

    // ════════════════════════════════════════════════════════════════════════
    // 7️⃣ SUPABASE - SAVE TO DATABASE
    // ════════════════════════════════════════════════════════════════════════
    console.log('💾 [SUPABASE] Saving to database...');

    // Save customer
    const { error: customerError } = await supabase
      .from('square_customers')
      .insert({
        registration_id: registrationId,
        square_customer_id: customerId,
        square_card_id: cardId,
        // Use migrant_* column names (matching 20260202 migration schema)
        migrant_email: registration.migrant_email,
        migrant_first_name: registration.migrant_first_name,
        migrant_last_name: registration.migrant_last_name,
        migrant_phone: registration.migrant_phone,
        migrant_code: registration.migrant_code,
        family_primary_email: registration.family_email,
        family_first_name: registration.family_first_name,
        family_code: registration.family_code,
      });

    if (customerError) {
      console.error('❌ [SUPABASE] Customer save failed:', customerError);
      console.error('❌ [SUPABASE] Customer error details:', JSON.stringify(customerError));
    } else {
      console.log('✅ [SUPABASE] Customer saved');
    }

    // Save subscription
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const { error: subscriptionError } = await supabase
      .from('square_subscriptions')
      .insert({
        registration_id: registrationId,
        square_subscription_id: subscriptionId,
        square_customer_id: customerId,
        square_plan_variation_id: SQUARE_PLAN_VARIATION_ID,
        status: 'ACTIVE',
        start_date: today,
      });

    if (subscriptionError) {
      console.error('❌ [SUPABASE] Subscription save failed:', subscriptionError);
      console.error('❌ [SUPABASE] Subscription error details:', JSON.stringify(subscriptionError));
    } else {
      console.log('✅ [SUPABASE] Subscription saved');
    }

    // Save payment - get subscription_id for FK reference
    let savedSubscriptionId = null;
    if (!subscriptionError) {
      const { data: subData, error: subQueryError } = await supabase
        .from('square_subscriptions')
        .select('id')
        .eq('square_subscription_id', subscriptionId)
        .single();
      if (subQueryError) {
        console.error('❌ [SUPABASE] Subscription query failed:', subQueryError);
      }
      savedSubscriptionId = subData?.id || null;
    }

    const { error: paymentError } = await supabase
      .from('square_payments')
      .insert({
        subscription_id: savedSubscriptionId,
        square_subscription_id: subscriptionId,
        square_payment_id: paymentId,
        square_customer_id: customerId,
        amount_cents: 1200,
        currency: 'USD',
        status: 'COMPLETED',
        payment_date: today,
        billing_period_start: today,
      });

    if (paymentError) {
      console.error('❌ [SUPABASE] Payment save failed:', paymentError);
      console.error('❌ [SUPABASE] Payment error details:', JSON.stringify(paymentError));
    } else {
      console.log('✅ [SUPABASE] Payment saved');
    }

    // Update registration status
    // Valores válidos: 'pending_payment', 'active', 'cancelled', 'expired', 'paused'
    const { error: updateError } = await supabase
      .from('registrations')
      .update({
        status: 'active',
        payment_completed_at: new Date().toISOString(),
        square_customer_id: customerId,
        square_subscription_id: subscriptionId,
        square_payment_id: paymentId,
      })
      .eq('id', registrationId);

    if (updateError) {
      console.error('❌ [SUPABASE] Registration update failed:', updateError);
      console.error('❌ [SUPABASE] Registration update error details:', JSON.stringify(updateError));
    } else {
      console.log('✅ [SUPABASE] Registration updated to active');
    }

    // Collect DB save warnings (non-blocking but reported)
    const dbWarnings: string[] = [];
    if (customerError) dbWarnings.push(`customer: ${customerError.message}`);
    if (subscriptionError) dbWarnings.push(`subscription: ${subscriptionError.message}`);
    if (paymentError) dbWarnings.push(`payment: ${paymentError.message}`);
    if (updateError) dbWarnings.push(`registration_update: ${updateError.message}`);
    if (dbWarnings.length > 0) {
      console.warn('⚠️ [SUPABASE] Some DB saves had issues:', dbWarnings);
    }

    // ════════════════════════════════════════════════════════════════════════
    // 8️⃣ SEND EMAILS (TODOS)
    // ════════════════════════════════════════════════════════════════════════
    console.log('📧 [EMAILS] Sending all welcome emails...');

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

      // Email 1: Al migrante
      await sendMigrantWelcomeEmail({
        migrantName: registration.migrant_first_name,
        migrantEmail: registration.migrant_email,
        codigoFamilia: registration.family_code || 'N/A',
        planName: 'SaludCompartida Familiar',
        planPrice: 12,
      });
      console.log('✅ [EMAILS] Migrant email sent');

      // Email 2: A la familia en México (se envía vía WhatsApp, no email)
      // La familia recibe el código y datos vía WhatsApp automáticamente
      console.log('ℹ️ [FAMILIA] Notificación enviada vía WhatsApp (no email)');

      // Email 3: A contact@saludcompartida (notificación interna)
      await sendAuraImmediateNotification({
        migrantName: registration.migrant_first_name,
        migrantLastName: registration.migrant_last_name,
        migrantEmail: registration.migrant_email,
        migrantPhone: registration.migrant_phone,
        principalName: registration.family_first_name,
        principalLastName: registration.family_last_name || '',
        principalBirthDate: registration.family_birthdate || 'N/A',
        principalPhone: registration.family_phone || 'N/A',
        codigoFamilia: registration.family_code || 'N/A',
        planName: 'SaludCompartida Familiar',
        planPrice: 12,
        familyMembersCount: 1,
        activationDate,
        activationTime,
      });
      console.log('✅ [EMAILS] Aura notification sent to contact@saludcompartida.app');
    } catch (emailError) {
      console.error('❌ [EMAILS] Error sending emails:', emailError);
      // No bloqueamos el pago si fallan los emails
    }

    // ════════════════════════════════════════════════════════════════════════
    // 9️⃣ SUCCESS RESPONSE
    // ════════════════════════════════════════════════════════════════════════
    console.log('🎉 [SQUARE] All operations completed successfully');

    return NextResponse.json({
      success: true,
      data: {
        customerId,
        subscriptionId,
        paymentId,
        registrationId,
      },
      ...(dbWarnings.length > 0 && { dbWarnings }),
    });

  } catch (error: any) {
    console.error('❌ [SQUARE] Unexpected error:', error);
    console.error('❌ [SQUARE] Error stack:', error?.stack);
    
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
