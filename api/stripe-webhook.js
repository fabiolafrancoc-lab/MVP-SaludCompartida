// Webhook de Stripe - Escucha eventos de pago exitoso
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Función para generar código de acceso único (formato: SC + 4 caracteres)
function generateAccessCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Sin O, 0, I, 1 para evitar confusión
  let code = 'SC';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code; // Ejemplo: SC2A4B, SCH7K9, etc.
}

// Configuración necesaria para webhooks de Stripe
export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  // Permitir GET para verificación de Stripe
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'Webhook endpoint is active' });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Obtener el raw body
    const buf = await buffer(req);
    const body = buf.toString();
    
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
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
    
    // Enviar por WhatsApp usando Meta Business API
    if (phone) {
      try {
        const whatsappResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-whatsapp-codes-meta`, {
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
