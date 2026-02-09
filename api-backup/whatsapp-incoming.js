// Webhook para mensajes entrantes de WhatsApp - Con AI Companion
import { processUserMessage } from './ai-companion-engine.js';

export default async function handler(req, res) {
  // Verificación del webhook de Meta (GET request)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Verificar token (configura WHATSAPP_VERIFY_TOKEN en Vercel)
    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      console.log('✅ Webhook verificado');
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send('Forbidden');
    }
  }

  // Procesar mensajes entrantes (POST request)
  if (req.method === 'POST') {
    try {
      const body = req.body;

      // Meta WhatsApp API envía datos en este formato
      if (body.object === 'whatsapp_business_account') {
        const entry = body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;

        // Verificar que sea un mensaje (no status update)
        if (value?.messages) {
          const message = value.messages[0];
          const phoneNumber = message.from; // Número del usuario
          const messageText = message.text?.body; // Texto del mensaje
          const messageId = message.id;
          const profileName = value.contacts?.[0]?.profile?.name || 'Amigo';

          console.log('📨 Mensaje de WhatsApp recibido:', {
            from: phoneNumber,
            text: messageText,
            name: profileName,
            id: messageId
          });

          // Ignorar mensajes vacíos
          if (!messageText) {
            return res.status(200).json({ success: true, message: 'No text content' });
          }

          // Procesar mensaje con AI Companion
          const { response: aiResponse, isOnboarding, error } = await processUserMessage(
            phoneNumber,
            messageText,
            profileName
          );

          // Enviar respuesta por WhatsApp
          const sent = await sendWhatsAppMessage(phoneNumber, aiResponse);

          if (sent) {
            console.log('✅ Respuesta enviada al usuario');
          } else {
            console.error('❌ Error enviando respuesta');
          }

          return res.status(200).json({
            success: true,
            processed: true,
            aiEngaged: true
          });
        }
      }

      // Otros tipos de webhooks (status updates, etc.)
      return res.status(200).json({ success: true, processed: false });

    } catch (error) {
      console.error('❌ Error procesando webhook:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Método no permitido
  return res.status(405).json({ error: 'Method not allowed' });
}

// Función para enviar mensaje por WhatsApp usando Meta API
async function sendWhatsAppMessage(to, message) {
  const accessToken = process.env.META_WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.META_WHATSAPP_PHONE_NUMBER_ID;

  if (!accessToken || !phoneNumberId) {
    console.error('❌ Credenciales de WhatsApp no configuradas');
    return false;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          type: 'text',
          text: {
            body: message
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Error de Meta API:', data);
      return false;
    }

    return true;

  } catch (error) {
    console.error('❌ Error enviando mensaje:', error);
    return false;
  }
}

  } catch (error) {
    console.error('❌ Error procesando mensaje entrante:', error);
    res.status(500).json({ 
      error: 'Error processing incoming message',
      message: error.message 
    });
  }
}
