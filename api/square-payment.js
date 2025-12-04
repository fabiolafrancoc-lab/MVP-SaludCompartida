// API para procesar pagos con Square
import { Client, Environment } from 'square';

// Configuración de Square
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN || 'EAAAlwfQWzG7D77hEzn9EMZ82cEM_J86txrAAZYuKycqipeq6xkGremv_XAgEFXk';
const SQUARE_ENVIRONMENT = process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox;

const client = new Client({
  accessToken: SQUARE_ACCESS_TOKEN,
  environment: SQUARE_ENVIRONMENT,
});

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sourceId, amount, currency, description } = req.body;

  // Validar datos
  if (!sourceId || !amount) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required fields' 
    });
  }

  try {
    console.log('💳 Procesando pago con Square...');
    console.log('Source ID:', sourceId);
    console.log('Amount:', amount, 'Currency:', currency);
    console.log('Environment:', SQUARE_ENVIRONMENT);

    // Crear el pago
    const { result } = await client.paymentsApi.createPayment({
      sourceId,
      amountMoney: {
        amount: BigInt(amount), // Monto en centavos
        currency: currency || 'USD',
      },
      idempotencyKey: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
      note: description || 'SaludCompartida Payment',
    });

    console.log('✅ Pago exitoso:', result.payment.id);

    return res.status(200).json({
      success: true,
      data: {
        id: result.payment.id,
        status: result.payment.status,
        amount: result.payment.amountMoney.amount,
        currency: result.payment.amountMoney.currency,
        createdAt: result.payment.createdAt,
      },
    });

  } catch (error) {
    console.error('❌ Error procesando pago:', error);
    console.error('Error details:', error.errors);
    
    return res.status(500).json({
      success: false,
      error: error.message || 'Error processing payment',
      details: error.errors || [],
    });
  }
}
