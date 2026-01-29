// API para procesar pagos con Square - REST API directo (sin SDK)
export default async function handler(req, res) {
  console.log('🔍 Square Payment API called');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sourceId, amount, currency, description } = req.body;
  const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
  const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;

  if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {
    console.error('❌ Square credentials not configured');
    return res.status(500).json({
      success: false,
      error: 'Payment system not configured'
    });
  }

  if (!sourceId || !amount) {
    return res.status(400).json({ 
      success: false,
      error: 'Missing required fields'
    });
  }

  try {
    console.log('💳 Llamando a Square API (SANDBOX)...');
    
    // Llamar a Square REST API - SANDBOX para pruebas
    const response = await fetch('https://connect.squareupsandbox.com/v2/payments', {
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
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Square API error:', data);
      return res.status(response.status).json({
        success: false,
        error: data.errors?.[0]?.detail || 'Error processing payment',
      });
    }

    console.log('✅ Payment successful:', data.payment.id);

    return res.status(200).json({
      success: true,
      data: {
        id: data.payment.id,
        status: data.payment.status,
      },
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
