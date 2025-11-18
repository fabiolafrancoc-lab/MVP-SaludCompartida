// Webhook de Stripe - Escucha eventos de pago exitoso
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Función para generar código aleatorio
function generateAccessCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Manejar el evento de checkout completado
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    console.log('✅ Pago exitoso:', session.id);
    console.log('Cliente:', session.customer_email);

    // Generar códigos de acceso
    const migrantCode = generateAccessCode();
    const familyCode = generateAccessCode();

    const migrantName = session.metadata?.migrant_name || 'Usuario';
    const email = session.customer_email;
    const phone = session.metadata?.phone || '';

    console.log('🎫 Códigos generados:', { migrantCode, familyCode });

    // TODO: Guardar en Supabase
    // TODO: Enviar por email
    
    // Enviar por WhatsApp
    if (phone) {
      try {
        const whatsappResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-whatsapp-codes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            migrantPhone: phone,
            migrantCode: migrantCode,
            migrantName: migrantName,
            // familyPhone y familyCode si los tienes
          })
        });

        if (whatsappResponse.ok) {
          console.log('✅ WhatsApp enviado correctamente');
        } else {
          console.error('❌ Error enviando WhatsApp');
        }
      } catch (error) {
        console.error('❌ Error en llamada a WhatsApp:', error);
      }
    }
  }

  res.json({ received: true });
}
