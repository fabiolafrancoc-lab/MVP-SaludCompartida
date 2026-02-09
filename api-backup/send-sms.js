// API para enviar SMS usando Twilio
import twilio from 'twilio';

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, message, countryCode } = req.body;

    // Validar datos
    if (!to || !message) {
      return res.status(400).json({ error: 'Faltan datos requeridos: to, message' });
    }

    // Twilio credentials desde variables de entorno
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Ej: +15557218375

    if (!accountSid || !authToken || !twilioPhoneNumber) {
      console.error('Faltan credenciales de Twilio en variables de entorno');
      return res.status(500).json({ 
        error: 'Configuración de SMS incompleta',
        success: false 
      });
    }

    // Formatear número de destino
    let formattedTo;
    console.log('📞 Formateando número SMS - to:', to, 'countryCode:', countryCode);
    
    if (to.startsWith('+')) {
      formattedTo = to;
    } else {
      const prefix = countryCode || '+52';
      const cleanNumber = to.replace(/\D/g, '');
      formattedTo = `${prefix}${cleanNumber}`;
      console.log('📱 Número SMS formateado:', formattedTo);
    }

    // Inicializar cliente de Twilio
    const client = twilio(accountSid, authToken);

    // Enviar SMS
    const messageResponse = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: formattedTo
    });

    console.log('SMS enviado:', messageResponse.sid);

    return res.status(200).json({
      success: true,
      messageSid: messageResponse.sid,
      status: messageResponse.status,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error enviando SMS:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message || 'Error al enviar SMS',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}
