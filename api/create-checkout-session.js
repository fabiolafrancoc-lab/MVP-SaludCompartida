// Stripe Checkout Session para Suscripción $12/mes
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, migrantName } = req.body;

    console.log('🔵 Creating Stripe session for:', email);
    console.log('🔵 STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
    console.log('🔵 STRIPE_PRICE_ID:', process.env.STRIPE_PRICE_ID);

    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY no configurado');
    }

    if (!process.env.STRIPE_PRICE_ID) {
      throw new Error('STRIPE_PRICE_ID no configurado');
    }

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      client_reference_id: email,
      
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://mvp-salud-compartida.vercel.app'}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://mvp-salud-compartida.vercel.app'}/?checkout=cancelled`,
      
      metadata: {
        migrant_name: migrantName,
        program: 'SaludCompartida',
        plan: 'mensual-12usd',
      },
      
      subscription_data: {
        metadata: {
          migrant_name: migrantName,
          program: 'SaludCompartida',
        },
      },
      
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    });

    console.log('✅ Stripe session created:', session.id);

    return res.status(200).json({ 
      sessionId: session.id,
      url: session.url 
    });
    
  } catch (error) {
    console.error('❌ Error creando Checkout Session:', error);
    return res.status(500).json({ 
      error: 'Error al crear la sesión de pago',
      details: error.message 
    });
  }
}
