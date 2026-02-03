import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
    
    console.log('📥 [SQUARE] Body recibido:', { sourceId: sourceId?.substring(0, 20) + '...', registrationId });
    
    // ⚠️ SIMULACIÓN TEMPORAL - ELIMINAR DESPUÉS
    console.log('🧪 [SQUARE] Devolviendo respuesta de simulación para testing');
    return NextResponse.json({
      success: true,
      data: {
        simulation: true,
        received: true,
        registrationId,
      },
    });
    // ⚠️ FIN SIMULACIÓN TEMPORAL
    
    // ════════════════════════════════════════════════════════════
    // 1. VALIDAR CREDENCIALES
    // ════════════════════════════════════════════════════════════
    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
    const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {
      console.error('❌ [SQUARE] Credenciales no configuradas');
      return NextResponse.json(
        { success: false, error: 'Payment system not configured' },
        { status: 500 }
      );
    }

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.error('❌ [SUPABASE] Credenciales no configuradas');
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 500 }
      );
    }

    if (!sourceId || !registrationId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('✅ [SQUARE] Credenciales OK');
    console.log('📍 [SQUARE] Location ID:', SQUARE_LOCATION_ID);
    console.log('� [SUPABASE] Registration ID:', registrationId);

    // ════════════════════════════════════════════════════════════
    // 2. OBTENER DATOS DEL CLIENTE DESDE SUPABASE
    // ════════════════════════════════════════════════════════════
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    const { data: registration, error: dbError } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', registrationId)
      .single();

    if (dbError || !registration) {
      console.error('❌ [SUPABASE] Error obteniendo registro:', dbError);
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }

    console.log('✅ [SUPABASE] Datos obtenidos:', {
      migrant_email: registration.migrant_email,
      migrant_first_name: registration.migrant_first_name,
    });

    // ════════════════════════════════════════════════════════════
    // 3. CREAR CUSTOMER EN SQUARE
    // ════════════════════════════════════════════════════════════
    console.log('👤 [SQUARE] Creando customer...');
    
    const customerResponse = await fetch('https://connect.squareup.com/v2/customers', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idempotency_key: `customer-${registrationId}-${Date.now()}`,
        given_name: registration.migrant_first_name || 'Cliente',
        family_name: registration.migrant_last_name || '',
        email_address: registration.migrant_email,
        phone_number: registration.migrant_phone,
        reference_id: `supabase-${registrationId}`,
      }),
    });

    const customerData = await customerResponse.json();

    if (!customerResponse.ok) {
      console.error('❌ [SQUARE] Error creando customer:', JSON.stringify(customerData, null, 2));
      return NextResponse.json(
        {
          success: false,
          error: customerData.errors?.[0]?.detail || 'Error creating customer',
          details: customerData.errors,
        },
        { status: customerResponse.status }
      );
    }

    const customerId = customerData.customer.id;
    console.log('✅ [SQUARE] Customer creado:', customerId);

    // ════════════════════════════════════════════════════════════
    // 4. GUARDAR CARD ON FILE
    // ════════════════════════════════════════════════════════════
    console.log('💳 [SQUARE] Guardando tarjeta...');
    
    const cardResponse = await fetch('https://connect.squareup.com/v2/cards', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
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
      console.error('❌ [SQUARE] Error guardando tarjeta:', JSON.stringify(cardData, null, 2));
      return NextResponse.json(
        {
          success: false,
          error: cardData.errors?.[0]?.detail || 'Error saving card',
          details: cardData.errors,
        },
        { status: cardResponse.status }
      );
    }

    const cardId = cardData.card.id;
    console.log('✅ [SQUARE] Tarjeta guardada:', cardId);

    // ════════════════════════════════════════════════════════════
    // 5. BUSCAR CATALOG ITEM "SaludCompartida"
    // ════════════════════════════════════════════════════════════
    console.log('🔍 [SQUARE] Buscando plan de suscripción...');
    
    const catalogResponse = await fetch('https://connect.squareup.com/v2/catalog/search', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        object_types: ['ITEM'],
        query: {
          text_query: {
            keywords: ['SaludCompartida'],
          },
        },
      }),
    });

    const catalogData = await catalogResponse.json();

    if (!catalogResponse.ok || !catalogData.objects || catalogData.objects.length === 0) {
      console.error('❌ [SQUARE] Plan "SaludCompartida" no encontrado');
      return NextResponse.json(
        {
          success: false,
          error: 'Subscription plan not found in Square. Please create "SaludCompartida" item in Square Dashboard.',
        },
        { status: 404 }
      );
    }

    const planItem = catalogData.objects[0];
    const planVariationId = planItem.item_data.variations[0].id;
    console.log('✅ [SQUARE] Plan encontrado:', planItem.id);
    console.log('✅ [SQUARE] Variation ID:', planVariationId);

    // ════════════════════════════════════════════════════════════
    // 6. CREAR SUBSCRIPTION
    // ════════════════════════════════════════════════════════════
    console.log('📋 [SQUARE] Creando suscripción...');
    
    const subscriptionResponse = await fetch('https://connect.squareup.com/v2/subscriptions', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idempotency_key: `subscription-${registrationId}-${Date.now()}`,
        location_id: SQUARE_LOCATION_ID,
        customer_id: customerId,
        plan_variation_id: planVariationId,
        card_id: cardId,
        start_date: new Date().toISOString().split('T')[0], // Hoy
      }),
    });

    const subscriptionData = await subscriptionResponse.json();

    if (!subscriptionResponse.ok) {
      console.error('❌ [SQUARE] Error creando suscripción:', JSON.stringify(subscriptionData, null, 2));
      return NextResponse.json(
        {
          success: false,
          error: subscriptionData.errors?.[0]?.detail || 'Error creating subscription',
          details: subscriptionData.errors,
        },
        { status: subscriptionResponse.status }
      );
    }

    const subscriptionId = subscriptionData.subscription.id;
    console.log('✅ [SQUARE] Suscripción creada:', subscriptionId);

    // ════════════════════════════════════════════════════════════
    // 6.5 PROCESAR PAGO INICIAL DE $12 USD
    // ════════════════════════════════════════════════════════════
    console.log('💳 [SQUARE] Procesando pago inicial de $12...');
    
    const paymentResponse = await fetch('https://connect.squareup.com/v2/payments', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idempotency_key: `payment-${registrationId}-${Date.now()}`,
        source_id: cardId,
        amount_money: {
          amount: 1200, // $12.00 en centavos
          currency: 'USD',
        },
        customer_id: customerId,
        location_id: SQUARE_LOCATION_ID,
        note: `SaludCompartida - Pago inicial - Registration ${registrationId}`,
      }),
    });

    const paymentData = await paymentResponse.json();

    if (!paymentResponse.ok) {
      console.error('❌ [SQUARE] Error procesando pago inicial:', JSON.stringify(paymentData, null, 2));
      return NextResponse.json(
        {
          success: false,
          error: paymentData.errors?.[0]?.detail || 'Error processing initial payment',
          details: paymentData.errors,
        },
        { status: paymentResponse.status }
      );
    }

    const paymentId = paymentData.payment.id;
    console.log('✅ [SQUARE] Pago inicial procesado:', paymentId);

    // ════════════════════════════════════════════════════════════
    // 7. GUARDAR EN SUPABASE (TABLAS SEPARADAS DE SQUARE)
    // ════════════════════════════════════════════════════════════
    
    // 7.1 Crear registro en square_customers (MISMA nomenclatura que registrations)
    const { data: customerRecord, error: customerError } = await supabase
      .from('square_customers')
      .insert({
        registration_id: registrationId,
        square_customer_id: customerId,
        square_card_id: cardId,
        
        // Datos del migrante (USA)
        migrant_email: registration.migrant_email,
        migrant_first_name: registration.migrant_first_name,
        migrant_last_name: registration.migrant_last_name,
        migrant_phone: registration.migrant_phone,
        migrant_code: registration.migrant_code,
        
        // Datos de la familia (México)
        family_primary_email: registration.family_primary_email,
        family_first_name: registration.family_first_name,
        family_code: registration.family_code,
        
        // Compañera asignada
        assigned_companion_id: registration.assigned_companion_id,
      })
      .select()
      .single();

    if (customerError) {
      console.error('⚠️ [SUPABASE] Error guardando customer:', customerError);
    } else {
      console.log('✅ [SUPABASE] Customer guardado');
    }

    // 7.2 Crear registro en square_subscriptions
    const { data: subscriptionRecord, error: subscriptionError } = await supabase
      .from('square_subscriptions')
      .insert({
        registration_id: registrationId,
        square_customer_id: customerId,
        square_subscription_id: subscriptionId,
        square_plan_variation_id: planVariationId,
        status: subscriptionData.subscription.status,
        start_date: new Date().toISOString().split('T')[0],
      })
      .select()
      .single();

    if (subscriptionError) {
      console.error('⚠️ [SUPABASE] Error guardando subscription:', subscriptionError);
    } else {
      console.log('✅ [SUPABASE] Subscription guardada');
    }

    // 7.3 Crear primer pago en square_payments (pago inicial)
    const { error: paymentError } = await supabase
      .from('square_payments')
      .insert({
        subscription_id: subscriptionRecord?.id,
        square_subscription_id: subscriptionId,
        square_customer_id: customerId,
        square_payment_id: paymentId, // ID del pago de Square
        amount_cents: 1200, // $12.00
        status: 'COMPLETED',
        payment_date: new Date().toISOString().split('T')[0],
        billing_period_start: new Date().toISOString().split('T')[0],
        attempt_number: 1,
      });

    if (paymentError) {
      console.error('⚠️ [SUPABASE] Error guardando primer pago:', paymentError);
    } else {
      console.log('✅ [SUPABASE] Primer pago registrado');
    }

    // 7.4 Actualizar registrations con payment_status y payment_id
    const { error: updateError } = await supabase
      .from('registrations')
      .update({
        payment_status: 'completed',
        payment_id: paymentId, // Guardar el payment_id de Square
      })
      .eq('id', registrationId);

    if (updateError) {
      console.error('⚠️ [SUPABASE] Error actualizando registration:', updateError);
    } else {
      console.log('✅ [SUPABASE] Registration actualizada');
    }

    // ════════════════════════════════════════════════════════════
    // 8. RETORNAR ÉXITO
    // ════════════════════════════════════════════════════════════
    console.log('🎉 [SQUARE] Suscripción creada exitosamente');

    return NextResponse.json({
      success: true,
      data: {
        subscription_id: subscriptionId,
        customer_id: customerId,
        status: subscriptionData.subscription.status,
      },
    });

  } catch (error: any) {
    console.error('❌ [ERROR FATAL] Error no manejado:', error);
    console.error('❌ [ERROR STACK]:', error.stack);
    
    // Determinar mensaje de error apropiado
    let errorMessage = 'Internal server error';
    let statusCode = 500;
    
    if (error.message) {
      errorMessage = error.message;
    }
    
    // Si el error viene de un fetch que falló
    if (error.cause) {
      console.error('❌ [ERROR CAUSE]:', error.cause);
      errorMessage = `Network error: ${error.cause.message || 'Failed to connect to payment service'}`;
      statusCode = 503;
    }
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: [{
          category: 'API_ERROR',
          code: 'INTERNAL_ERROR',
          detail: errorMessage,
        }],
      },
      { status: statusCode }
    );
  }
}
