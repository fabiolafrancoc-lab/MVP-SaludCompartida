// Procesa el pago exitoso - obtiene datos de Stripe y envía códigos por WhatsApp
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

  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID requerido' });
  }

  try {
    // Obtener datos de la sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log('✅ Sesión obtenida:', session.id);
    console.log('Cliente:', session.customer_email);
    console.log('Metadata:', session.metadata);

    // Verificar que el pago esté completo
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Pago no completado' });
    }

    // Generar códigos de acceso
    const migrantCode = generateAccessCode();
    const familyCode = generateAccessCode();

    const migrantName = session.metadata?.migrant_name || 'Usuario';
    const email = session.customer_email;
    const phone = session.metadata?.phone || '';

    console.log('🎫 Códigos generados:', { migrantCode, familyCode });

    // Enviar por WhatsApp
    if (phone) {
      try {
        const whatsappResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://saludcompartida.app'}/api/send-whatsapp-codes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            migrantPhone: phone,
            migrantCode: migrantCode,
            migrantName: migrantName,
            familyCode: familyCode,
          })
        });

        const whatsappData = await whatsappResponse.json();

        if (whatsappResponse.ok) {
          console.log('✅ WhatsApp enviado correctamente');
          
          return res.status(200).json({
            success: true,
            codes: {
              migrant: migrantCode,
              family: familyCode
            },
            email: email,
            phone: phone,
            whatsapp: whatsappData
          });
        } else {
          console.error('❌ Error enviando WhatsApp:', whatsappData);
          throw new Error('Error al enviar WhatsApp');
        }
      } catch (error) {
        console.error('❌ Error en llamada a WhatsApp:', error);
        return res.status(500).json({ 
          error: 'Error al enviar códigos por WhatsApp',
          details: error.message 
        });
      }
    } else {
      return res.status(400).json({ 
        error: 'No se encontró número de teléfono en la sesión' 
      });
    }

  } catch (error) {
    console.error('❌ Error procesando pago:', error);
    return res.status(500).json({ 
      error: 'Error al procesar el pago',
      details: error.message 
    });
  }
}
