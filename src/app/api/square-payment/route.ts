import { NextRequest, NextResponse } from 'next/server';

// ════════════════════════════════════════════════════════════
// API SQUARE PAYMENT - Procesar pagos con Square
// ════════════════════════════════════════════════════════════
// Modo: SANDBOX (testing) o PRODUCTION
// ════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  console.log('🔍 [SQUARE] Payment API called');
  
  try {
    const body = await request.json();
    const { sourceId, amount, currency, description, registrationId, idempotencyKey } = body;
    
    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
    const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
    
    // Detectar si estamos en Sandbox o Production
    const isSandbox = SQUARE_ACCESS_TOKEN?.startsWith('EAAAE');
    const apiUrl = isSandbox 
      ? 'https://connect.squareupsandbox.com/v2/payments'
      : 'https://connect.squareup.com/v2/payments';

    console.log(`🔧 [SQUARE] Modo: ${isSandbox ? 'SANDBOX' : 'PRODUCTION'}`);
    console.log('📍 [SQUARE] Location ID:', SQUARE_LOCATION_ID);
    console.log('💰 [SQUARE] Amount:', amount, currency || 'USD');
    console.log('🔑 [SQUARE] Idempotency Key:', idempotencyKey);

    if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {
      console.error('❌ [SQUARE] Credentials not configured');
      return NextResponse.json(
        {
          success: false,
          error: 'Payment system not configured',
        },
        { status: 500 }
      );
    }

    if (!sourceId || !amount) {
      console.error('❌ [SQUARE] Missing required fields');
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: sourceId and amount are required',
        },
        { status: 400 }
      );
    }

    console.log('💳 [SQUARE] Calling Square API...');

    // Llamar a Square API (Sandbox o Production)
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_id: sourceId,
        amount_money: {
          amount: amount,
          currency: currency || 'USD',
        },
        location_id: SQUARE_LOCATION_ID,
        idempotency_key: idempotencyKey || `${Date.now()}-${Math.random().toString(36).substring(7)}`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ [SQUARE] API error:', JSON.stringify(data, null, 2));
      
      // Extraer error detallado
      const errorDetail = data.errors?.[0]?.detail || 'Error processing payment';
      const errorCode = data.errors?.[0]?.code || 'UNKNOWN';
      
      return NextResponse.json(
        {
          success: false,
          error: errorDetail,
          errorCode: errorCode,
          details: data.errors,
        },
        { status: response.status }
      );
    }

    console.log('✅ [SQUARE] Payment successful!');
    console.log('   Payment ID:', data.payment.id);
    console.log('   Status:', data.payment.status);
    console.log('   Amount:', data.payment.amount_money.amount, data.payment.amount_money.currency);

    return NextResponse.json({
      success: true,
      data: {
        id: data.payment.id,
        status: data.payment.status,
        amount: data.payment.amount_money,
        receipt_url: data.payment.receipt_url,
      },
    });

  } catch (error: any) {
    console.error('❌ [SQUARE] Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Unexpected error processing payment',
      },
      { status: 500 }
    );
  }
}
