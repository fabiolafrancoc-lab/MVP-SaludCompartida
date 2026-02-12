/**
 * DEBUG WATI - Endpoint para diagnosticar problemas con WATI
 * 
 * Uso: GET /api/debug-wati?phone=+523055227150
 */

export default async function handler(req, res) {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ 
      error: 'Debes proporcionar ?phone=+523055227150' 
    });
  }

  const WATI_ENDPOINT = process.env.WATI_ENDPOINT;
  const WATI_TOKEN = process.env.WATI_API_TOKEN;
  const WATI_WHATSAPP_NUMBER = process.env.WATI_WHATSAPP_NUMBER;

  console.log('🔍 DEBUG WATI - Iniciando diagnóstico...');
  console.log('📱 Teléfono destino:', phone);
  console.log('🔑 WATI_ENDPOINT:', WATI_ENDPOINT ? '✅ Configurado' : '❌ FALTA');
  console.log('🔑 WATI_API_TOKEN:', WATI_TOKEN ? `✅ ${WATI_TOKEN.substring(0, 10)}...` : '❌ FALTA');
  console.log('🔑 WATI_WHATSAPP_NUMBER:', WATI_WHATSAPP_NUMBER || '❌ FALTA');

  if (!WATI_ENDPOINT || !WATI_TOKEN) {
    return res.status(500).json({
      error: 'Configuración incompleta',
      details: {
        WATI_ENDPOINT: !!WATI_ENDPOINT,
        WATI_API_TOKEN: !!WATI_TOKEN,
        WATI_WHATSAPP_NUMBER: !!WATI_WHATSAPP_NUMBER
      }
    });
  }

  try {
    // Probar diferentes estructuras de endpoint
    const testEndpoints = [
      `${WATI_ENDPOINT}/api/v1/getContacts?pageSize=1`,
      `https://live-mt-server.wati.io/api/v1/getContacts?pageSize=1`,
      `https://live-server-1079185.wati.io/api/v1/getContacts?pageSize=1`
    ];

    const testResults = [];

    for (const testUrl of testEndpoints) {
      console.log(`🧪 Probando: ${testUrl}`);
      
      try {
        const response = await fetch(testUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${WATI_TOKEN}`
          }
        });

        const data = await response.text();
        
        testResults.push({
          url: testUrl,
          status: response.status,
          ok: response.ok,
          response: data.substring(0, 200)
        });

        if (response.ok) {
          console.log(`✅ ÉXITO con: ${testUrl}`);
          break;
        }
      } catch (err) {
        testResults.push({
          url: testUrl,
          error: err.message
        });
      }
    }

    console.log('📊 Resultados de tests:', testResults);

    const successTest = testResults.find(t => t.ok);
    
    if (!successTest) {
      return res.status(500).json({
        error: 'Ninguna estructura de endpoint funcionó',
        testResults,
        instructions: 'Ve a WATI Dashboard → Settings → API Docs y copia el endpoint exacto que aparece ahí'
      });
    }

    console.log('✅ Endpoint correcto encontrado:', successTest.url);

    // Paso 2: Intentar enviar mensaje de prueba
    console.log('🧪 Paso 2: Enviando mensaje de prueba...');
    
    const testMessage = `🧪 Mensaje de prueba de Salud Compartida\n\nFecha: ${new Date().toLocaleString('es-MX')}\n\nSi recibes este mensaje, la integración con WATI funciona correctamente. ✅`;

    const sendResponse = await fetch(`${WATI_ENDPOINT}/api/v1/sendSessionMessage/${phone}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WATI_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messageText: testMessage
      })
    });

    const sendData = await sendResponse.json();
    console.log('📤 Respuesta de envío:', JSON.stringify(sendData, null, 2));

    if (!sendResponse.ok) {
      console.error('❌ Error al enviar mensaje:', sendData);
      
      return res.status(500).json({
        error: 'Error al enviar mensaje',
        watiResponse: sendData,
        status: sendResponse.status,
        possibleReasons: [
          '1. El número no ha iniciado conversación en últimas 24 horas',
          '2. El número no está registrado en WATI',
          '3. El token de API no tiene permisos de envío',
          '4. El endpoint WATI no es correcto',
          '5. La cuenta WATI está suspendida o con límites'
        ]
      });
    }

    console.log('✅ Mensaje enviado exitosamente via WATI');

    return res.status(200).json({
      success: true,
      message: 'Mensaje de prueba enviado',
      messageId: sendData.result?.messageId || sendData.id,
      watiResponse: sendData,
      instructions: 'Revisa tu WhatsApp. Deberías recibir el mensaje en 5-30 segundos.',
      troubleshooting: {
        if_not_received: [
          '1. Verifica que el número sea correcto (incluye código de país)',
          '2. Envía "Hola" desde tu WhatsApp al número de WATI para abrir ventana de 24 horas',
          '3. Revisa WATI Dashboard > Conversations para ver el estado del mensaje',
          '4. Verifica que tu cuenta WATI esté activa y aprobada',
          '5. Revisa los logs de WATI Dashboard > Settings > API Logs'
        ]
      }
    });

  } catch (error) {
    console.error('💥 Error inesperado:', error);
    
    return res.status(500).json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      diagnostic: 'Error de red o configuración. Verifica las variables de entorno en Vercel.'
    });
  }
}
