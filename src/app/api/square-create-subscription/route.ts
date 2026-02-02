import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ════════════════════════════════════════════════════════════════════════════
// ENDPOINT: /api/square-create-subscription
// ════════════════════════════════════════════════════════════════════════════
// Flujo completo:
// 1. Obtener datos del registro de SUPABASE
// 2. Crear Customer en Square con esos datos
// 3. Crear Subscription para ese Customer
// ════════════════════════════════════════════════════════════════════════════

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(request: NextRequest) {
  console.log('🔍 [SQUARE SUBSCRIPTION] Iniciando proceso...');
  
  try {
    const { registrationId, sourceId } = await request.json();
    
    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
    const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;

    if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {
      console.error('❌ Square credentials not configured');
      return NextResponse.json(
        { success: false, error: 'Payment system not configured' },
        { status: 500 }
      );
    }

    if (!registrationId || !sourceId) {
      return NextResponse.json(
        { success: false, error: 'Missing registrationId or sourceId' },
        { status: 400 }
      );
    }

    // ════════════════════════════════════════════════════════════════════════
    // PASO 1: Obtener datos del registro de SUPABASE
    // ════════════════════════════════════════════════════════════════════════
    console.log('📊 [SUPABASE] Obteniendo datos del registro:', registrationId);
    
    const { data: registration, error: supabaseError } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', registrationId)
      .single();

    if (supabaseError || !registration) {
      console.error('❌ [SUPABASE] Error:', supabaseError);
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }

    console.log('✅ [SUPABASE] Datos obtenidos:', {
      migrant_email: registration.migrant_email,
      migrant_first_name: registration.migrant_first_name,
      migrant_last_name: registration.migrant_last_name,
      migrant_phone: registration.migrant_phone
    });

    // ════════════════════════════════════════════════════════════════════════
    // PASO 2: Crear Customer en Square
    // ════════════════════════════════════════════════════════════════════════
    console.log('👤 [SQUARE] Creando customer...');
    
    const customerPayload = {
      idempotency_key: `cust-${registrationId}-${Date.now()}`,
      given_name: registration.migrant_first_name || 'Cliente',
      family_name: registration.migrant_last_name || '',
      email_address: registration.migrant_email,
      phone_number: registration.migrant_phone || undefined,
      reference_id: `supabase-${registrationId}`, // Para vincular con tu DB
    };

    console.log('📤 [SQUARE] Customer payload:', customerPayload);

    const customerResponse = await fetch('https://connect.squareup.com/v2/customers', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerPayload),
    });

    const customerData = await customerResponse.json();

    if (!customerResponse.ok) {
      console.error('❌ [SQUARE] Error creando customer:', JSON.stringify(customerData, null, 2));
      return NextResponse.json(
        { 
          success: false, 
          error: customerData.errors?.[0]?.detail || 'Error creating customer',
          details: customerData.errors 
        },
        { status: customerResponse.status }
      );
    }

    const customerId = customerData.customer.id;
    console.log('✅ [SQUARE] Customer creado:', customerId);

    // ════════════════════════════════════════════════════════════════════════
    // PASO 3: Crear Card para el Customer
    // ════════════════════════════════════════════════════════════════════════
    console.log('💳 [SQUARE] Asociando tarjeta al customer...');

    const cardPayload = {
      idempotency_key: `card-${registrationId}-${Date.now()}`,
      source_id: sourceId,
      card: {
        customer_id: customerId,
      },
    };

    const cardResponse = await fetch('https://connect.squareup.com/v2/cards', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardPayload),
    });

    const cardData = await cardResponse.json();

    if (!cardResponse.ok) {
      console.error('❌ [SQUARE] Error asociando tarjeta:', JSON.stringify(cardData, null, 2));
      return NextResponse.json(
        { 
          success: false, 
          error: cardData.errors?.[0]?.detail || 'Error associating card',
          details: cardData.errors 
        },
        { status: cardResponse.status }
      );
    }

    const cardId = cardData.card.id;
    console.log('✅ [SQUARE] Tarjeta asociada:', cardId);

    // ════════════════════════════════════════════════════════════════════════
    // PASO 4: Crear Subscription
    // ════════════════════════════════════════════════════════════════════════
    // NOTA: Necesitas tener un Subscription Plan creado en Square Dashboard
    // Ve a: https://squareup.com/dashboard/items/subscriptions
    // ════════════════════════════════════════════════════════════════════════
    
    const SUBSCRIPTION_PLAN_ID = process.env.SQUARE_SUBSCRIPTION_PLAN_ID;
    
    if (!SUBSCRIPTION_PLAN_ID) {
      console.error('❌ [SQUARE] SQUARE_SUBSCRIPTION_PLAN_ID no configurado');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Subscription plan not configured. Please create a plan in Square Dashboard first.',
          customerId,
          cardId,
        },
        { status: 500 }
      );
    }

    console.log('📋 [SQUARE] Creando suscripción con plan:', SUBSCRIPTION_PLAN_ID);

    const subscriptionPayload = {
      idempotency_key: `sub-${registrationId}-${Date.now()}`,
      location_id: SQUARE_LOCATION_ID,
      plan_variation_id: SUBSCRIPTION_PLAN_ID,
      customer_id: customerId,
      card_id: cardId,
      start_date: new Date().toISOString().split('T')[0], // Formato: YYYY-MM-DD
    };

    console.log('📤 [SQUARE] Subscription payload:', subscriptionPayload);

    const subscriptionResponse = await fetch('https://connect.squareup.com/v2/subscriptions', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionPayload),
    });

    const subscriptionData = await subscriptionResponse.json();

    if (!subscriptionResponse.ok) {
      console.error('❌ [SQUARE] Error creando suscripción:', JSON.stringify(subscriptionData, null, 2));
      return NextResponse.json(
        { 
          success: false, 
          error: subscriptionData.errors?.[0]?.detail || 'Error creating subscription',
          details: subscriptionData.errors,
          customerId,
          cardId,
        },
        { status: subscriptionResponse.status }
      );
    }

    const subscription = subscriptionData.subscription;
    console.log('✅ [SQUARE] Suscripción creada:', subscription.id);

    // ════════════════════════════════════════════════════════════════════════
    // PASO 5: Actualizar SUPABASE con los datos de Square
    // ════════════════════════════════════════════════════════════════════════
    console.log('💾 [SUPABASE] Actualizando registro con datos de Square...');

    const { error: updateError } = await supabase
      .from('registrations')
      .update({
        square_customer_id: customerId,
        square_card_id: cardId,
        square_subscription_id: subscription.id,
        subscription_status: subscription.status,
        payment_status: 'completed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', registrationId);

    if (updateError) {
      console.error('⚠️ [SUPABASE] Error actualizando registro:', updateError);
      // No retornamos error porque la suscripción SÍ se creó en Square
    } else {
      console.log('✅ [SUPABASE] Registro actualizado correctamente');
    }

    // ════════════════════════════════════════════════════════════════════════
    // RESPUESTA EXITOSA
    // ════════════════════════════════════════════════════════════════════════
    return NextResponse.json({
      success: true,
      data: {
        customerId,
        cardId,
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status,
        startDate: subscription.start_date,
        chargedThroughDate: subscription.charged_through_date,
      },
    });

  } catch (error: any) {
    console.error('❌ [ERROR]:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
