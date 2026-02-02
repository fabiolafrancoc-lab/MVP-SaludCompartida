import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ════════════════════════════════════════════════════════════════════════════
// ENDPOINT: /api/create-subscription
// ════════════════════════════════════════════════════════════════════════════
// Descripción: Crea Customer en Square + Subscription usando datos de Supabase
// Flujo: Supabase → Square Customers API → Square Subscriptions API
// ════════════════════════════════════════════════════════════════════════════

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(request: NextRequest) {
  console.log('🔄 [SUBSCRIPTION] Iniciando creación de suscripción...');
  
  try {
    const { registrationId, cardToken } = await request.json();
    
    if (!registrationId) {
      return NextResponse.json(
        { success: false, error: 'registrationId es requerido' },
        { status: 400 }
      );
    }

    // ════════════════════════════════════════════════════════════
    // 1. OBTENER DATOS DEL REGISTRO DESDE SUPABASE
    // ════════════════════════════════════════════════════════════
    console.log('📊 [SUPABASE] Obteniendo datos de registration:', registrationId);
    
    const { data: registration, error: supabaseError } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', registrationId)
      .single();

    if (supabaseError || !registration) {
      console.error('❌ [SUPABASE] Error:', supabaseError);
      return NextResponse.json(
        { success: false, error: 'Registro no encontrado' },
        { status: 404 }
      );
    }

    console.log('✅ [SUPABASE] Datos obtenidos:', {
      migrant_email: registration.migrant_email,
      migrant_first_name: registration.migrant_first_name,
      family_primary_email: registration.family_primary_email,
    });

    // ════════════════════════════════════════════════════════════
    // 2. CREAR CUSTOMER EN SQUARE (usando datos de Supabase)
    // ════════════════════════════════════════════════════════════
    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
    const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
    
    if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {
      return NextResponse.json(
        { success: false, error: 'Square no configurado' },
        { status: 500 }
      );
    }

    console.log('👤 [SQUARE] Creando customer...');
    
    // Crear Customer en Square con datos de Supabase
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
        phone_number: registration.migrant_phone || '',
        note: `Registro ID: ${registrationId}`,
        reference_id: registrationId.toString(), // Vincula con Supabase
      }),
    });

    const customerData = await customerResponse.json();

    if (!customerResponse.ok) {
      console.error('❌ [SQUARE] Error creando customer:', customerData);
      return NextResponse.json(
        { 
          success: false, 
          error: customerData.errors?.[0]?.detail || 'Error creando customer' 
        },
        { status: customerResponse.status }
      );
    }

    const customerId = customerData.customer.id;
    console.log('✅ [SQUARE] Customer creado:', customerId);

    // ════════════════════════════════════════════════════════════
    // 3. AGREGAR TARJETA AL CUSTOMER (si se provee cardToken)
    // ════════════════════════════════════════════════════════════
    if (cardToken) {
      console.log('💳 [SQUARE] Asociando tarjeta al customer...');
      
      const cardResponse = await fetch('https://connect.squareup.com/v2/cards', {
        method: 'POST',
        headers: {
          'Square-Version': '2024-12-18',
          'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idempotency_key: `card-${registrationId}-${Date.now()}`,
          source_id: cardToken,
          card: {
            customer_id: customerId,
          },
        }),
      });

      const cardData = await cardResponse.json();
      
      if (!cardResponse.ok) {
        console.error('❌ [SQUARE] Error agregando tarjeta:', cardData);
        // No es crítico, continuar sin tarjeta
      } else {
        console.log('✅ [SQUARE] Tarjeta asociada:', cardData.card.id);
      }
    }

    // ════════════════════════════════════════════════════════════
    // 4. CREAR SUBSCRIPTION
    // ════════════════════════════════════════════════════════════
    // IMPORTANTE: Necesitas el SUBSCRIPTION_PLAN_VARIATION_ID
    // Lo obtienes desde Square Dashboard → Subscriptions → Tu Plan
    
    const SUBSCRIPTION_PLAN_VARIATION_ID = process.env.SQUARE_SUBSCRIPTION_PLAN_ID;
    
    if (!SUBSCRIPTION_PLAN_VARIATION_ID) {
      console.error('⚠️ [CONFIG] SQUARE_SUBSCRIPTION_PLAN_ID no configurado');
      // Guardar customer_id en Supabase y devolver éxito parcial
      await supabase
        .from('registrations')
        .update({ square_customer_id: customerId })
        .eq('id', registrationId);
      
      return NextResponse.json({
        success: true,
        customerId,
        message: 'Customer creado. Configure SQUARE_SUBSCRIPTION_PLAN_ID para crear suscripción.',
      });
    }

    console.log('📅 [SQUARE] Creando subscription...');
    
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
        plan_variation_id: SUBSCRIPTION_PLAN_VARIATION_ID,
        customer_id: customerId,
        start_date: new Date().toISOString().split('T')[0], // Hoy
        card_id: cardToken ? 'on_file' : undefined, // Usa tarjeta guardada
      }),
    });

    const subscriptionData = await subscriptionResponse.json();

    if (!subscriptionResponse.ok) {
      console.error('❌ [SQUARE] Error creando subscription:', subscriptionData);
      
      // Guardar customer_id aunque falle subscription
      await supabase
        .from('registrations')
        .update({ square_customer_id: customerId })
        .eq('id', registrationId);
      
      return NextResponse.json(
        { 
          success: false, 
          error: subscriptionData.errors?.[0]?.detail || 'Error creando subscription',
          customerId, // Devolver customer_id para retry
        },
        { status: subscriptionResponse.status }
      );
    }

    const subscriptionId = subscriptionData.subscription.id;
    console.log('✅ [SQUARE] Subscription creada:', subscriptionId);

    // ════════════════════════════════════════════════════════════
    // 5. ACTUALIZAR SUPABASE CON IDs DE SQUARE
    // ════════════════════════════════════════════════════════════
    console.log('💾 [SUPABASE] Actualizando registro con IDs de Square...');
    
    const { error: updateError } = await supabase
      .from('registrations')
      .update({
        square_customer_id: customerId,
        square_subscription_id: subscriptionId,
        payment_status: 'active', // Suscripción activa
        updated_at: new Date().toISOString(),
      })
      .eq('id', registrationId);

    if (updateError) {
      console.error('⚠️ [SUPABASE] Error actualizando:', updateError);
    } else {
      console.log('✅ [SUPABASE] Registro actualizado exitosamente');
    }

    // ════════════════════════════════════════════════════════════
    // 6. ENVIAR EMAILS DE BIENVENIDA
    // ════════════════════════════════════════════════════════════
    console.log('📧 [EMAILS] Enviando notificaciones...');
    
    try {
      await fetch(`${request.nextUrl.origin}/api/send-notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'payment_success',
          registrationId,
        }),
      });
      console.log('✅ [EMAILS] Notificaciones enviadas');
    } catch (emailError) {
      console.error('⚠️ [EMAILS] Error (no crítico):', emailError);
    }

    // ════════════════════════════════════════════════════════════
    // 7. RESPUESTA EXITOSA
    // ════════════════════════════════════════════════════════════
    return NextResponse.json({
      success: true,
      customerId,
      subscriptionId,
      status: subscriptionData.subscription.status,
      message: 'Suscripción creada exitosamente',
    });

  } catch (error: any) {
    console.error('❌ [ERROR] Error general:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
