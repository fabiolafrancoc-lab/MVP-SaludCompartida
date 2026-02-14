import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendPostPaymentEmails } from '@/lib/email-templates';

// ════════════════════════════════════════════════════════════════════════════
// ENDPOINT: /api/square-payment
// FLUJO: Suscripciones recurrentes de Square
// ════════════════════════════════════════════════════════════════════════════
// 1. Customer → 2. Card → 3. Subscription → 4. Supabase → 5. Emails
// ════════════════════════════════════════════════════════════════════════════

async function squareFetch(path: string, body: unknown, accessToken: string) {
  const res = await fetch(`https://connect.squareup.com${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Square-Version': '2024-12-18',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  
  if (!res.ok || data.errors) {
    console.error('❌ Square API Error:', JSON.stringify(data.errors || data, null, 2));
    throw new Error(data.errors?.[0]?.detail || 'Square API error');
  }
  
  return data;
}

export async function POST(request: NextRequest) {
  console.log('🔍 [SQUARE] ==================== INICIO SUSCRIPCIÓN ====================');
  
  try {
    const body = await request.json();
    const { sourceId, registrationId } = body;

    if (!sourceId || !registrationId) {
      return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 });
    }

    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
    const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
    const SQUARE_PLAN_VARIATION_ID = process.env.SQUARE_PLAN_VARIATION_ID;

    if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID || !SQUARE_PLAN_VARIATION_ID) {
      console.error('❌ Missing Square credentials');
      return NextResponse.json({ success: false, error: 'Square configuration error' }, { status: 500 });
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(SUPABASE_URL as string, SUPABASE_KEY as string);

    const { data: registration } = await supabase.from('registrations').select('*').eq('id', registrationId).single();

    if (!registration) {
      return NextResponse.json({ success: false, error: 'Registration not found' }, { status: 404 });
    }

    console.log('✅ [1/5] Registration found:', registration.migrant_email);

    // ════════════════════════════════════════════════════════════════════════
    // PASO 1: Crear Customer en Square
    // ════════════════════════════════════════════════════════════════════════
    console.log('🔄 [2/5] Creating Square Customer...');
    
    const customerResp = await squareFetch('/v2/customers', {
      idempotency_key: `customer_${registrationId}_${Date.now()}`,
      email_address: registration.migrant_email,
      given_name: registration.migrant_first_name,
      family_name: registration.migrant_last_name,
      phone_number: `${registration.migrant_country_code}${registration.migrant_phone}`,
    }, SQUARE_ACCESS_TOKEN);

    const customerId = customerResp.customer.id;
    console.log('✅ Customer created:', customerId);

    // ════════════════════════════════════════════════════════════════════════
    // PASO 2: Guardar Card en Square (token → card_id)
    // ════════════════════════════════════════════════════════════════════════
    console.log('🔄 [3/5] Creating Card on file...');
    
    const cardResp = await squareFetch('/v2/cards', {
      idempotency_key: `card_${registrationId}_${Date.now()}`,
      source_id: sourceId,
      customer_id: customerId,
    }, SQUARE_ACCESS_TOKEN);

    const cardId = cardResp.card.id;
    console.log('✅ Card created:', cardId);

    // ════════════════════════════════════════════════════════════════════════
    // PASO 3: Crear Suscripción Mensual de $12
    // ════════════════════════════════════════════════════════════════════════
    console.log('🔄 [4/5] Creating Subscription...');
    
    const today = new Date().toISOString().slice(0, 10);
    
    const subscriptionResp = await squareFetch('/v2/subscriptions', {
      idempotency_key: `subscription_${registrationId}_${Date.now()}`,
      location_id: SQUARE_LOCATION_ID,
      plan_variation_id: SQUARE_PLAN_VARIATION_ID,
      customer_id: customerId,
      card_id: cardId,
      start_date: today,
    }, SQUARE_ACCESS_TOKEN);

    const subscription = subscriptionResp.subscription;
    console.log('✅ Subscription created:', subscription.id);
    console.log('📅 Status:', subscription.status);

    // ════════════════════════════════════════════════════════════════════════
    // PASO 4: Guardar IDs en Supabase
    // ════════════════════════════════════════════════════════════════════════
    console.log('🔄 [5/5] Updating Supabase...');
    
    const nextBillingDate = new Date();
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

    await supabase.from('registrations').update({
      square_customer_id: customerId,
      square_card_id: cardId,
      square_subscription_id: subscription.id,
      status: 'active',
      payment_completed_at: new Date().toISOString(),
      next_billing_date: nextBillingDate.toISOString().slice(0, 10),
    }).eq('id', registrationId);

    console.log('✅ Supabase updated');

    // ════════════════════════════════════════════════════════════════════════
    // PASO 5: Enviar Emails
    // ════════════════════════════════════════════════════════════════════════
    console.log('📧 Sending post-payment emails...');
    
    if (registration) {
      const emailResults = await sendPostPaymentEmails(
        {
          migrant_email: registration.migrant_email,
          migrant_code: registration.migrant_code,
          migrant_first_name: registration.migrant_first_name,
          companion_name: registration.family_companion_assigned === 'lupita' ? 'Lupita' : 'Fernanda',
        },
        {
          family_primary_email: registration.family_email || registration.family_primary_email,
          family_first_name: registration.family_first_name,
          family_code: registration.family_code,
          migrant_first_name: registration.migrant_first_name,
          companion_name: registration.family_companion_assigned === 'lupita' ? 'Lupita' : 'Fernanda',
        },
        registration
      );
      
      console.log('✅ Emails sent:', JSON.stringify(emailResults, null, 2));
    }

    console.log('🎉 [SQUARE] ==================== SUSCRIPCIÓN EXITOSA ====================');

    return NextResponse.json({ 
      success: true, 
      data: { 
        customerId,
        cardId,
        subscriptionId: subscription.id,
        status: subscription.status,
        registrationId 
      } 
    });
    
  } catch (error: any) {
    console.error('❌ [SQUARE] Error:', error);
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
