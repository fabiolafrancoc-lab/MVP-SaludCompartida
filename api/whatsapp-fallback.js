// Webhook fallback para mensajes entrantes de WhatsApp
// Se activa cuando el webhook principal falla o hay un error de runtime

export default async function handler(req, res) {
  // Solo aceptar POST de Twilio
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      From,
      To,
      Body,
      MessageSid,
      ProfileName,
    } = req.body;

    console.error('⚠️  FALLBACK activado - Mensaje entrante:', {
      from: From,
      to: To,
      body: Body,
      messageSid: MessageSid,
      profileName: ProfileName,
    });

    // Respuesta de emergencia
    const fallbackReply = `Hola! Estamos experimentando dificultades técnicas temporales.\n\nPor favor contáctanos por email:\ncontact@saludcompartida.com\n\nO visita:\nhttps://saludcompartida.app\n\nGracias por tu paciencia! 🙏`;

    res.status(200).send(
      `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${fallbackReply}</Message>
</Response>`
    );

  } catch (error) {
    console.error('❌ Error en fallback webhook:', error);
    
    // Última respuesta de emergencia (sin TwiML)
    res.status(200).json({ 
      success: true, 
      fallback: true,
      message: 'Fallback received but could not process' 
    });
  }
}
