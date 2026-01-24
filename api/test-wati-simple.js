/**
 * Test simple de envío de WhatsApp con WATI
 * POST /api/test-wati-simple
 * 
 * Body: { "to": "+525512345678", "message": "Test message" }
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST method' });
  }

  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: { to: '+525512345678', message: 'Your message' }
    });
  }

  // WATI credentials
  const WATI_ENDPOINT = process.env.WATI_ENDPOINT;
  const WATI_TOKEN = process.env.WATI_API_TOKEN;

  if (!WATI_ENDPOINT || !WATI_TOKEN) {
    return res.status(500).json({ 
      error: 'WATI not configured',
      missing: {
        endpoint: !WATI_ENDPOINT,
        token: !WATI_TOKEN
      }
    });
  }

  // Formatear número
  const cleanNumber = to.replace(/\D/g, '');
  const formattedPhone = to.startsWith('+') ? to : `+${cleanNumber}`;

  console.log('📱 Enviando WhatsApp via WATI...');
  console.log('To:', formattedPhone);
  console.log('Message:', message);

  try {
    const response = await fetch(
      `${WATI_ENDPOINT}/api/v1/sendSessionMessage/${formattedPhone}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WATI_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messageText: message
        })
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log('✅ WhatsApp enviado exitosamente');
      return res.status(200).json({
        success: true,
        message: 'WhatsApp sent successfully',
        data,
        details: {
          to: formattedPhone,
          provider: 'WATI',
          timestamp: new Date().toISOString()
        }
      });
    } else {
      console.error('❌ Error de WATI:', data);
      return res.status(response.status).json({
        success: false,
        error: data.message || 'WATI error',
        details: data
      });
    }

  } catch (error) {
    console.error('❌ Exception:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
