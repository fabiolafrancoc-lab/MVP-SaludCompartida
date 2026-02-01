import { NextRequest, NextResponse } from 'next/server';

// API para procesar pagos con Square - REST API directo (sin SDK)
export async function POST(request: NextRequest) {
  console.log('🔍 Square Payment API called');
  
  try {
    const body = await request.json();
    const { sourceId, amount, currency, description, registrationId } = body;
    
    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
    const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;

    if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {
      console.error('❌ Square credentials not configured');
      return NextResponse.json(
        {
          success: false,
          error: 'Payment system not configured',
        },
        { status: 500 }
      );
    }

    if (!sourceId || !amount) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    console.log('💳 Llamando a Square API directamente...');
    console.log('📍 Location ID:', SQUARE_LOCATION_ID);
    console.log('💰 Amount:', amount, currency || 'USD');

    // Llamar a Square REST API directamente (Production)
    const response = await fetch('https://connect.squareup.com/v2/payments', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-12-18',
        Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_id: sourceId,
        amount_money: {
          amount: amount,
          currency: currency || 'USD',
        },
        location_id: SQUARE_LOCATION_ID,
        idempotency_key: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Square API error:', data);
      return NextResponse.json(
        {
          success: false,
          error: data.errors?.[0]?.detail || 'Error processing payment',
          details: data.errors,
        },
        { status: response.status }
      );
    }

    console.log('✅ Payment successful:', data.payment.id);

    return NextResponse.json({
      success: true,
      data: {
        id: data.payment.id,
        status: data.payment.status,
      },
    });

  } catch (error: any) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
