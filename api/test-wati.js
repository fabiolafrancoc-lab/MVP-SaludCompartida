// Test endpoint para verificar configuración de WATI
export default async function handler(req, res) {
  try {
    // Verificar variables de entorno
    const WATI_ENDPOINT = process.env.WATI_ENDPOINT;
    const WATI_TOKEN = process.env.WATI_API_TOKEN;

    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: {
        hasEndpoint: !!WATI_ENDPOINT,
        hasToken: !!WATI_TOKEN,
        endpointValue: WATI_ENDPOINT ? WATI_ENDPOINT.substring(0, 30) + '...' : 'NOT SET',
        tokenLength: WATI_TOKEN ? WATI_TOKEN.length : 0
      }
    };

    // Si no hay credenciales, retornar diagnóstico
    if (!WATI_ENDPOINT || !WATI_TOKEN) {
      return res.status(500).json({
        success: false,
        error: 'WATI credentials not configured',
        diagnostics,
        instructions: 'Add WATI_ENDPOINT and WATI_API_TOKEN to Vercel environment variables'
      });
    }

    // Intentar enviar mensaje de prueba
    const testPhone = req.query.phone || '+523055227150'; // Usa tu número de prueba
    
    console.log('🧪 Enviando mensaje de prueba a:', testPhone);
    
    const response = await fetch(`${WATI_ENDPOINT}/api/v1/sendSessionMessage/${testPhone}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WATI_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messageText: '🧪 Test de WATI - ' + new Date().toLocaleTimeString('es-MX')
      })
    });

    const data = await response.json();

    return res.status(response.ok ? 200 : 500).json({
      success: response.ok,
      statusCode: response.status,
      diagnostics,
      response: data,
      instructions: response.ok 
        ? '✅ WATI está configurado correctamente. Verifica que el número reciba el mensaje.'
        : '❌ Error en WATI. Verifica las credenciales o el estado de tu cuenta en wati.io'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
