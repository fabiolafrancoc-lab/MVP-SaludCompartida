/**
 * SEND WHATSAPP - WATI.io Integration
 * 
 * Alternativa FÁCIL a Twilio para WhatsApp Business
 * Setup en 10 minutos, sin complicaciones
 */

export default async function handler(req, res) {
  // Allow GET for health checks
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: 'ok', 
      provider: 'WATI',
      configured: !!(process.env.WATI_ENDPOINT && process.env.WATI_API_TOKEN)
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phone, message, template_name = null, parameters = [] } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: phone, message' 
      });
    }

    // Configuración WATI (obtener de variables de entorno)
    const WATI_ENDPOINT = process.env.WATI_ENDPOINT; // ej: https://live-server-12345.wati.io
    const WATI_TOKEN = process.env.WATI_API_TOKEN;

    if (!WATI_ENDPOINT || !WATI_TOKEN) {
      return res.status(500).json({
        error: 'WATI not configured',
        instructions: 'Add WATI_ENDPOINT and WATI_API_TOKEN to Vercel environment variables'
      });
    }

    // Formatear número (WATI acepta con o sin +)
    const formattedPhone = phone.startsWith('+') ? phone : `+52${phone}`;

    console.log(`📱 Enviando WhatsApp via WATI a: ${formattedPhone}`);

    // Si hay template, usar template message (recomendado para mensajes automáticos)
    if (template_name) {
      const payload = {
        whatsappNumber: formattedPhone,
        template_name: template_name,
        broadcast_name: 'saludcompartida_notification'
      };

      // Add parameters if provided (for template variables)
      if (parameters && parameters.length > 0) {
        payload.parameters = parameters;
      }

      const response = await fetch(`${WATI_ENDPOINT}/api/v1/sendTemplateMessage`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WATI_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'WATI API error');
      }

      return res.status(200).json({
        success: true,
        messageId: data.result?.messageId || data.id,
        provider: 'WATI',
        timestamp: new Date().toISOString()
      });
    }

    // Mensaje de texto simple (para conversaciones interactivas)
    const response = await fetch(`${WATI_ENDPOINT}/api/v1/sendSessionMessage/${formattedPhone}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WATI_TOKEN}`,
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
    console.error('❌ Error enviando WhatsApp via WATI:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      provider: 'WATI'
    });
  }
}
