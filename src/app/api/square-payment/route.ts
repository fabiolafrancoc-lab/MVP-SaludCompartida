import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🔍 Square Payment API called');
  
  try {
    const body = await request.json();
    const { sourceId, amount, currency, description } = body;
    
    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
    const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;

    if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {
      console.error('❌ Square credentials not configured');
      return NextResponse.json({
        success: false,
        error: 'Payment system not configured'
      }, { status: 500 });
    }

    if (!sourceId || !amount) {
      return NextResponse.json({ 
        success: false,
        error: 'Missing required fields: sourceId and amount'
      }, { status: 400 });
    }

    console.log('💳 Llamando a Square API (PRODUCCIÓN)...');
    console.log('Amount:', amount, 'Currency:', currency || 'USD');
    
    // Llamar a Square REST API - PRODUCCIÓN (cobra dinero real)
    const response = await fetch('https://connect.squareup.com/v2/payments', {
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
        idempotency_key: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
        note: description || 'SaludCompartida - Plan Familiar',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Square API error:', data);
      return NextResponse.json({
        success: false,
        error: data.errors?.[0]?.detail || 'Error processing payment',
        details: data.errors,
      }, { status: response.status });
    }

    console.log('✅ Payment successful:', data.payment.id);

    return NextResponse.json({
      success: true,
      data: {
        id: data.payment.id,
        status: data.payment.status,
        amount: data.payment.amount_money,
        created_at: data.payment.created_at,
      },
    });

  } catch (error: any) {
    console.error('❌ Error processing payment:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal server error',
    }, { status: 500 });
  }
}
