// API para enviar mensajes de WhatsApp usando WATI
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

    // WATI credentials desde variables de entorno
    const WATI_ENDPOINT = process.env.WATI_ENDPOINT;
    const WATI_TOKEN = process.env.WATI_API_TOKEN;

    if (!WATI_ENDPOINT || !WATI_TOKEN) {
      console.error('Faltan credenciales de WATI en variables de entorno');
      return res.status(500).json({ 
        error: 'Configuración de WhatsApp incompleta',
        success: false 
      });
    }

    // Formatear número de destino
    // REGLA: Si no tiene +, agregar según el countryCode enviado
    let formattedPhone;
    console.log('📞 Formateando número - to:', to, 'countryCode:', countryCode);
    
    if (to.startsWith('+')) {
      // Ya tiene prefijo completo
      formattedPhone = to;
    } else {
      // No tiene prefijo, usar el countryCode proporcionado
      // Si no hay countryCode, default a +52 (México)
      const prefix = countryCode || '+52';
      const cleanNumber = to.replace(/\D/g, ''); // Remover no-numéricos
      formattedPhone = `${prefix}${cleanNumber}`;
    }
    
    console.log('📱 Número formateado para WATI:', formattedPhone);

    // Enviar mensaje via WATI
    // WATI_TOKEN ya incluye "Bearer " prefix desde variables de entorno
    const response = await fetch(`${WATI_ENDPOINT}/api/v1/sendSessionMessage/${formattedPhone}`, {
      method: 'POST',
      headers: {
        'Authorization': WATI_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messageText: message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'WATI API error');
    }

    console.log('✅ WhatsApp enviado via WATI:', data.result?.messageId || data.id);

    return res.status(200).json({
      success: true,
      messageId: data.result?.messageId || data.id,
      provider: 'WATI',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error enviando WhatsApp:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message || 'Error al enviar mensaje de WhatsApp',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}
