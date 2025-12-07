// Webhook para mensajes entrantes de WhatsApp
// Twilio enviará aquí los mensajes que los clientes envíen

export default async function handler(req, res) {
  // Solo aceptar POST de Twilio
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extraer datos del mensaje entrante
    const {
      From,           // Número del cliente (whatsapp:+1234567890)
      To,             // Tu número de WhatsApp Business
      Body,           // Texto del mensaje
      MessageSid,     // ID único del mensaje
      ProfileName,    // Nombre del perfil del cliente
      NumMedia,       // Número de archivos multimedia
    } = req.body;

    console.log('📨 Mensaje entrante de WhatsApp:', {
      from: From,
      to: To,
      body: Body,
      messageSid: MessageSid,
      profileName: ProfileName,
      numMedia: NumMedia,
    });

    // Aquí puedes agregar lógica para:
    // 1. Guardar el mensaje en Supabase
    // 2. Responder automáticamente
    // 3. Notificar a un admin
    // 4. Procesar comandos del cliente

    // Ejemplo: Respuesta automática básica
    const autoReply = `Hola ${ProfileName || 'amigo'}! 👋\n\nGracias por contactarnos en SaludCompartida.\n\nUn miembro de nuestro equipo te responderá pronto.\n\nSi tienes tu código de acceso, visita:\nhttps://saludcompartida.app/page3`;

    // Twilio espera una respuesta en formato TwiML (opcional)
    // Si no respondes automáticamente, solo devuelve 200 OK
    res.status(200).send(
      `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${autoReply}</Message>
</Response>`
    );

    // Si NO quieres responder automáticamente, usa:
    // res.status(200).json({ success: true, received: true });

  } catch (error) {
    console.error('❌ Error procesando mensaje entrante:', error);
    res.status(500).json({ 
      error: 'Error processing incoming message',
      message: error.message 
    });
  }
}
