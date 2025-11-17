// Stripe Checkout Session para Suscripción $12/mes
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, migrantName } = req.body;

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      client_reference_id: email, // Para identificar después
      
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // ID del plan $12/mes (crear en Stripe Dashboard)
          quantity: 1,
        },
      ],
      
      // URLs de redirección
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://saludcompartida.app'}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://saludcompartida.app'}/?checkout=cancelled`,
      
      // Metadata para tracking
      metadata: {
        migrant_name: migrantName,
        program: 'SaludCompartida',
        plan: 'mensual-12usd',
      },
      
      // Configuración de suscripción
      subscription_data: {
        metadata: {
          migrant_name: migrantName,
          program: 'SaludCompartida',
        },
      },
      
      // Permitir códigos promocionales
      allow_promotion_codes: true,
      
      // Billing address collection
      billing_address_collection: 'auto',
    });

    return res.status(200).json({ 
      sessionId: session.id,
      url: session.url 
    });
    
  } catch (error) {
    console.error('Error creando Checkout Session:', error);
    return res.status(500).json({ 
      error: 'Error al crear la sesión de pago',
      details: error.message 
    });
  }
}
