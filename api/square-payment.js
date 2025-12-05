// API para procesar pagos con Square - ES6 modules para Vercel
import { Client, Environment } from 'square';

// Configuración de Square
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN || 'EAAAlwfQWzG7D77hEzn9EMZ82cEM_J86txrAAZYuKycqipeq6xkGremv_XAgEFXk';
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID || 'LT92PZMMZ3CQ2';

// Inicializar cliente de Square
const client = new Client({
  accessToken: SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

export default async function handler(req, res) {
  console.log('🔍 Square Payment API called');
  console.log('📝 Method:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sourceId, amount, currency, description } = req.body;

  if (!sourceId || !amount) {
    return res.status(400).json({ 
      success: false,
      error: 'Missing required fields'
    });
  }

  try {
    console.log('💳 Processing payment...');
    
    const { result } = await client.paymentsApi.createPayment({
      sourceId,
      amountMoney: {
        amount: BigInt(amount),
        currency: currency || 'USD',
      },
      locationId: SQUARE_LOCATION_ID,
      idempotencyKey: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
    });

    console.log('✅ Payment successful:', result.payment.id);

    return res.status(200).json({
      success: true,
      data: {
        id: result.payment.id,
        status: result.payment.status,
      },
    });

  } catch (error) {
    console.error('❌ Error:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
