import { NextRequest, NextResponse } from 'next/server';import { NextRequest, NextResponse } from 'next/server';



// API para procesar pagos con Square - REST API directo (sin SDK)export async function POST(request: NextRequest) {

export async function POST(request: NextRequest) {  console.log('🔍 Square Payment API called');

  console.log('🔍 Square Payment API called');  

  try {

  try {    const body = await request.json();

    const body = await request.json();    const { sourceId, amount, currency, description } = body;

    const { sourceId, amount, currency, description, registrationId } = body;    

    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;

    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;    const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;

    const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;

    if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {

    if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {      console.error('❌ Square credentials not configured');

      console.error('❌ Square credentials not configured');      return NextResponse.json({

      return NextResponse.json(        success: false,

        {        error: 'Payment system not configured'

          success: false,      }, { status: 500 });

          error: 'Payment system not configured',    }

        },

        { status: 500 }    if (!sourceId || !amount) {

      );      return NextResponse.json({ 

    }        success: false,

        error: 'Missing required fields: sourceId and amount'

    if (!sourceId || !amount) {      }, { status: 400 });

      return NextResponse.json(    }

        {

          success: false,    console.log('💳 Llamando a Square API (PRODUCCIÓN)...');

          error: 'Missing required fields',    console.log('Amount:', amount, 'Currency:', currency || 'USD');

        },    

        { status: 400 }    // Llamar a Square REST API - PRODUCCIÓN (cobra dinero real)

      );    const response = await fetch('https://connect.squareup.com/v2/payments', {

    }      method: 'POST',

      headers: {

    console.log('💳 Llamando a Square API directamente...');        'Square-Version': '2024-12-18',

    console.log('📍 Location ID:', SQUARE_LOCATION_ID);        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,

    console.log('💰 Amount:', amount, currency || 'USD');        'Content-Type': 'application/json',

      },

    // Llamar a Square REST API directamente (Production)      body: JSON.stringify({

    const response = await fetch('https://connect.squareup.com/v2/payments', {        source_id: sourceId,

      method: 'POST',        amount_money: {

      headers: {          amount: amount,

        'Square-Version': '2024-12-18',          currency: currency || 'USD',

        Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,        },

        'Content-Type': 'application/json',        location_id: SQUARE_LOCATION_ID,

      },        idempotency_key: `${Date.now()}-${Math.random().toString(36).substring(7)}`,

      body: JSON.stringify({        note: description || 'SaludCompartida - Plan Familiar',

        source_id: sourceId,      }),

        amount_money: {    });

          amount: amount,

          currency: currency || 'USD',    const data = await response.json();

        },

        location_id: SQUARE_LOCATION_ID,    if (!response.ok) {

        idempotency_key: `${Date.now()}-${Math.random().toString(36).substring(7)}`,      console.error('❌ Square API error:', data);

      }),      return NextResponse.json({

    });        success: false,

        error: data.errors?.[0]?.detail || 'Error processing payment',

    const data = await response.json();        details: data.errors,

      }, { status: response.status });

    if (!response.ok) {    }

      console.error('❌ Square API error:', data);

      return NextResponse.json(    console.log('✅ Payment successful:', data.payment.id);

        {

          success: false,    return NextResponse.json({

          error: data.errors?.[0]?.detail || 'Error processing payment',      success: true,

          details: data.errors,      data: {

        },        id: data.payment.id,

        { status: response.status }        status: data.payment.status,

      );        amount: data.payment.amount_money,

    }        created_at: data.payment.created_at,

      },

    console.log('✅ Payment successful:', data.payment.id);    });



    return NextResponse.json({  } catch (error: any) {

      success: true,    console.error('❌ Error processing payment:', error);

      data: {    return NextResponse.json({

        id: data.payment.id,      success: false,

        status: data.payment.status,      error: error.message || 'Internal server error',

      },    }, { status: 500 });

    });  }

  } catch (error: any) {}

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
