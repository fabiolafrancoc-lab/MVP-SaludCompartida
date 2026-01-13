// Webhook para mensajes entrantes de WhatsApp - Con AI Companion
import { processUserMessage } from './ai-companion-engine.js';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

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

          // Intentar obtener género y edad del usuario desde registrations
          const userData = await getUserDataFromPhone(phoneNumber);
          
          console.log('👤 Datos del usuario:', {
            phone: phoneNumber,
            name: userData?.name || profileName,
            gender: userData?.gender || 'desconocido',
            age: userData?.age || 'desconocida'
          });

          // Procesar mensaje con AI Companion (incluye género para asignación correcta)
          const { response: aiResponse, isOnboarding, error } = await processUserMessage(
            phoneNumber,
            messageText,
            userData?.name || profileName,
            userData?.gender || null,
            userData?.age || null
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

// Obtener datos del usuario desde la tabla de registrations
async function getUserDataFromPhone(phoneNumber) {
  try {
    // Limpiar número de teléfono (quitar whatsapp:, +, espacios, etc)
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    
    // Buscar en registrations por teléfono del familiar O del migrante
    const { data, error } = await supabase
      .from('registrations')
      .select('family_first_name, family_last_name, migrant_first_name, migrant_last_name, family_phone, migrant_phone, family_birthdate, migrant_birthdate')
      .or(`family_phone.ilike.%${cleanPhone}%,migrant_phone.ilike.%${cleanPhone}%`)
      .limit(1)
      .single();

    if (error || !data) {
      console.log('⚠️ Usuario no encontrado en registrations');
      return null;
    }

    // Determinar si es familiar o migrante
    const isFamilyUser = data.family_phone?.includes(cleanPhone);
    const name = isFamilyUser 
      ? `${data.family_first_name} ${data.family_last_name}`.trim()
      : `${data.migrant_first_name} ${data.migrant_last_name}`.trim();
    
    // Calcular edad desde birthdate
    let age = null;
    const birthdate = isFamilyUser ? data.family_birthdate : data.migrant_birthdate;
    if (birthdate) {
      const today = new Date();
      const birth = new Date(birthdate);
      age = today.getFullYear() - birth.getFullYear();
      if (today.getMonth() < birth.getMonth() || 
          (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
        age--;
      }
    }

    // NOTA: Por ahora no tenemos género en registrations
    // En México, culturalmente: Familiar (México) = más probable mujer, Migrante (USA) = más probable hombre
    // Pero esto es una suposición - idealmente capturamos género en registro
    
    // Estrategia conservadora: asumir gender desconocido → asignará companion femenino
    const inferredGender = null; // No asumimos, mejor asignar femenino por defecto
    
    return {
      name,
      gender: inferredGender,
      age,
      isFamilyUser
    };

  } catch (error) {
    console.error('Error obteniendo datos de usuario:', error);
    return null;
  }
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
