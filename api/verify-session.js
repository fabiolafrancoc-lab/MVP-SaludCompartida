// Verificar estado de la sesión de Stripe después del pago
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ error: 'Session ID requerido' });
    }

    // Recuperar la sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['subscription', 'customer']
    });

    // Verificar que el pago fue exitoso
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ 
        error: 'Pago no completado',
        status: session.payment_status 
      });
    }

    return res.status(200).json({
      success: true,
      customer: {
        id: session.customer?.id,
        email: session.customer_email,
      },
      subscription: {
        id: session.subscription?.id,
        status: session.subscription?.status,
        current_period_end: session.subscription?.current_period_end,
      },
      metadata: session.metadata,
    });

  } catch (error) {
    console.error('Error verificando sesión:', error);
    return res.status(500).json({ 
      error: 'Error al verificar el pago',
      details: error.message 
    });
  }
}
