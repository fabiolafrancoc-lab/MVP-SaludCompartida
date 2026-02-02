import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * API para crear suscripciones en Square usando datos de SUPABASE
 * 
 * Flujo:
 * 1. Obtener datos del registro en Supabase
 * 2. Crear Customer en Square (con datos de Supabase)
 * 3. Asociar tarjeta al Customer
 * 4. Crear Subscription
 * 5. Guardar IDs de Square en Supabase
 */

// Inicializar Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(request: NextRequest) {
  console.log('🔵 [SQUARE SUBSCRIPTION] Iniciando creación de suscripción');
  
  try {
    const body = await request.json();
    const { 
      sourceId,          // Token de tarjeta de Square Web SDK
      registrationId     // ID del registro en Supabase
    } = body;
    
    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
    const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
    const SUBSCRIPTION_PLAN_ID = process.env.SQUARE_SUBSCRIPTION_PLAN_ID; // Plan variation ID

    if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID || !SUBSCRIPTION_PLAN_ID) {
      console.error('❌ Square credentials not configured');
      return NextResponse.json(
        { success: false, error: 'Payment system not configured' },
        { status: 500 }
      );
    }

    if (!sourceId || !registrationId) {
      return NextResponse.json(
        { success: false, error: 'Missing sourceId or registrationId' },
        { status: 400 }
      );
    }

    // ════════════════════════════════════════════════════════════════
    // PASO 1: Obtener datos del registro en SUPABASE
    // ════════════════════════════════════════════════════════════════
    console.log('📊 [SUPABASE] Obteniendo datos del registro:', registrationId);

    const { data: registration, error: supabaseError } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', registrationId)
      .single();

    if (supabaseError || !registration) {
      console.error('❌ [SUPABASE] Error obteniendo registro:', supabaseError);
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }

    console.log('✅ [SUPABASE] Registro obtenido:', {
      id: registration.id,
      migrant_email: registration.migrant_email,
      migrant_first_name: registration.migrant_first_name
    });

    const headers = {
      'Square-Version': '2024-12-18',
      'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    // ════════════════════════════════════════════════════════════════
    // PASO 2: Crear Customer en Square (usando datos de Supabase)
    // ════════════════════════════════════════════════════════════════
    console.log('👤 [SQUARE] Creando customer...');
    
    const headers = {
      'Square-Version': '2024-12-18',
      'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };
    
    const customerResponse = await fetch('https://connect.squareup.com/v2/customers', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        idempotency_key: `customer-${registrationId}-${Date.now()}`,
        given_name: registration.migrant_first_name || 'Usuario',
        family_name: registration.migrant_last_name || '',
        email_address: registration.migrant_email,
        phone_number: registration.migrant_phone || '',
        reference_id: `supabase-${registrationId}`,
        note: `Cliente desde Salud Compartida - ID: ${registrationId}`
      }),
    });

    const customerData = await customerResponse.json();

    if (!customerResponse.ok) {
      console.error('❌ Error creando customer:', JSON.stringify(customerData, null, 2));
      const errorDetail = customerData.errors?.[0];
      return NextResponse.json(
        {
          success: false,
          error: errorDetail?.detail || 'Error creating customer',
          errorCode: errorDetail?.code,
        },
        { status: customerResponse.status }
      );
    }

    const customerId = customerData.customer.id;
    console.log('✅ [SQUARE] Customer creado:', customerId);

    // ════════════════════════════════════════════════════════════════
    // PASO 2: Asociar tarjeta al Customer
    // ════════════════════════════════════════════════════════════════
    console.log('💳 [SQUARE] Asociando tarjeta al customer...');
    
    const cardResponse = await fetch('https://connect.squareup.com/v2/cards', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        idempotency_key: `card-${registrationId}-${Date.now()}`,
        source_id: sourceId,
        card: {
          customer_id: customerId,
        },
      }),
    });

    const cardData = await cardResponse.json();

    if (!cardResponse.ok) {
      console.error('❌ Error asociando tarjeta:', JSON.stringify(cardData, null, 2));
      const errorDetail = cardData.errors?.[0];
      return NextResponse.json(
        {
          success: false,
          error: errorDetail?.detail || 'Error linking card',
          errorCode: errorDetail?.code,
        },
        { status: cardResponse.status }
      );
    }

    const cardId = cardData.card.id;
    console.log('✅ [SQUARE] Tarjeta asociada:', cardId);

    // ════════════════════════════════════════════════════════════════
    // PASO 4: Crear Subscription (usando SUBSCRIPTION_PLAN_ID de .env)
    // ════════════════════════════════════════════════════════════════
    console.log('🔄 [SQUARE] Creando suscripción con plan:', SUBSCRIPTION_PLAN_ID);
    
    const subscriptionResponse = await fetch('https://connect.squareup.com/v2/subscriptions', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        idempotency_key: `sub-${registrationId}-${Date.now()}`,
        location_id: SQUARE_LOCATION_ID,
        customer_id: customerId,
        plan_variation_id: SUBSCRIPTION_PLAN_ID, // Plan ID desde .env
        card_id: cardId,
        timezone: 'America/New_York',
      }),
    });

    const subscriptionData = await subscriptionResponse.json();

    if (!subscriptionResponse.ok) {
      console.error('❌ Error creando suscripción:', JSON.stringify(subscriptionData, null, 2));
      const errorDetail = subscriptionData.errors?.[0];
      return NextResponse.json(
        {
          success: false,
          error: errorDetail?.detail || 'Error creating subscription',
          errorCode: errorDetail?.code,
        },
        { status: subscriptionResponse.status }
      );
    }

    const subscription = subscriptionData.subscription;
    console.log('✅ [SQUARE] Suscripción creada:', subscription.id);
    console.log('📅 [SQUARE] Status:', subscription.status);
    console.log('💰 [SQUARE] Charged through date:', subscription.charged_through_date);

    // ════════════════════════════════════════════════════════════════
    // PASO 5: Guardar IDs de Square en SUPABASE
    // ════════════════════════════════════════════════════════════════
    console.log('💾 [SUPABASE] Actualizando registro con IDs de Square...');

    const { error: updateError } = await supabase
      .from('registrations')
      .update({
        square_customer_id: customerId,
        square_subscription_id: subscription.id,
        square_card_id: cardId,
        payment_status: 'completed',
        subscription_status: subscription.status
      })
      .eq('id', registrationId);

    if (updateError) {
      console.error('⚠️ [SUPABASE] Error actualizando registro:', updateError);
      // No retornamos error porque la suscripción ya fue creada
    } else {
      console.log('✅ [SUPABASE] Registro actualizado correctamente');
    }

    // ════════════════════════════════════════════════════════════════
    // RESPUESTA EXITOSA
    // ════════════════════════════════════════════════════════════════
    return NextResponse.json({
      success: true,
      data: {
        customerId,
        cardId,
        subscriptionId: subscription.id,
        status: subscription.status,
        startDate: subscription.start_date,
        chargedThroughDate: subscription.charged_through_date,
      },
    });

  } catch (error: any) {
    console.error('❌ [SQUARE] Error general:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
