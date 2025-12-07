// API para enviar mensajes de WhatsApp usando Twilio
import twilio from 'twilio';

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, message, type = 'notification', countryCode } = req.body;

    // Validar datos
    if (!to || !message) {
      return res.status(400).json({ error: 'Faltan datos requeridos: to, message' });
    }

    // Twilio credentials desde variables de entorno
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER; // Ej: whatsapp:+14155238886

    if (!accountSid || !authToken || !twilioWhatsAppNumber) {
      console.error('Faltan credenciales de Twilio en variables de entorno');
      return res.status(500).json({ 
        error: 'Configuración de WhatsApp incompleta',
        success: false 
      });
    }

    // Formatear número de destino
    // Si el número ya tiene formato completo (empieza con +), usarlo
    // Si no, construir con countryCode o default +52
    let formattedTo;
    console.log('📞 Formateando número - to:', to, 'countryCode:', countryCode);
    
    if (to.startsWith('whatsapp:')) {
      formattedTo = to;
    } else if (to.startsWith('+')) {
      formattedTo = `whatsapp:${to}`;
    } else {
      const prefix = countryCode || '+52';
      const cleanNumber = to.replace(/\D/g, '');
      formattedTo = `whatsapp:${prefix}${cleanNumber}`;
      console.log('📱 Número formateado:', formattedTo);
    }

    // Inicializar cliente de Twilio
    const client = twilio(accountSid, authToken);

    // Enviar mensaje de WhatsApp
    const messageResponse = await client.messages.create({
      body: message,
      from: twilioWhatsAppNumber,
      to: formattedTo
    });

    console.log('WhatsApp enviado:', messageResponse.sid);

    return res.status(200).json({
      success: true,
      messageSid: messageResponse.sid,
      status: messageResponse.status,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error enviando WhatsApp:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message || 'Error al enviar mensaje de WhatsApp',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}
