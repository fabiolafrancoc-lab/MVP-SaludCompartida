/**
 * API Endpoint: Verificar conexión de WhatsApp Business
 * Prueba ambas integraciones: WATI y Meta WhatsApp Business API
 * 
 * GET /api/verify-whatsapp-connection
 * 
 * Responde con:
 * - Estado de credenciales
 * - Test de conectividad con WATI
 * - Test de conectividad con Meta (si está configurado)
 * - Recomendaciones
 */

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido. Use GET.' });
  }

  const results = {
    timestamp: new Date().toISOString(),
    status: 'checking',
    integrations: {}
  };

  // ============================================
  // 1. VERIFICAR WATI.IO
  // ============================================
  console.log('🔍 Verificando WATI.IO...');
  
  const watiEndpoint = process.env.WATI_ENDPOINT;
  const watiToken = process.env.WATI_API_TOKEN;
  const watiNumber = process.env.WATI_WHATSAPP_NUMBER;

  results.integrations.wati = {
    name: 'WATI.IO',
    configured: Boolean(watiEndpoint && watiToken && watiNumber),
    credentials: {
      endpoint: watiEndpoint ? `${watiEndpoint.substring(0, 30)}...` : 'NOT SET',
      token: watiToken ? `${watiToken.substring(0, 20)}...` : 'NOT SET',
      number: watiNumber || 'NOT SET'
    }
  };

  // Test de conectividad con WATI
  if (watiEndpoint && watiToken) {
    try {
      console.log('📡 Probando conexión con WATI...');
      console.log('Endpoint:', watiEndpoint);
      
      // Intentar obtener la lista de plantillas (endpoint simple de verificación)
      const testResponse = await fetch(`${watiEndpoint}/api/v1/getMessageTemplates`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${watiToken}`,
          'Content-Type': 'application/json'
        }
      });

      results.integrations.wati.httpStatus = testResponse.status;
      results.integrations.wati.statusText = testResponse.statusText;

      let testData;
      const responseText = await testResponse.text();
      
      try {
        testData = JSON.parse(responseText);
      } catch (parseError) {
        results.integrations.wati.status = '❌ INVALID RESPONSE';
        results.integrations.wati.error = 'Response is not valid JSON';
        results.integrations.wati.rawResponse = responseText.substring(0, 200);
        results.integrations.wati.connected = false;
        console.error('❌ WATI respuesta inválida:', responseText.substring(0, 200));
        return;
      }

      results.integrations.wati.status = testResponse.ok ? '✅ CONNECTED' : '❌ ERROR';
      results.integrations.wati.connected = testResponse.ok;
      
      if (testResponse.ok) {
        results.integrations.wati.templates = Array.isArray(testData.messageTemplates) 
          ? testData.messageTemplates.length 
          : 0;
        console.log('✅ WATI conectado exitosamente');
      } else {
        results.integrations.wati.error = testData.message || testData.error || 'Unknown error';
        results.integrations.wati.errorDetails = testData;
        console.error('❌ WATI error:', testData);
      }

    } catch (error) {
      results.integrations.wati.status = '❌ CONNECTION FAILED';
      results.integrations.wati.error = error.message;
      results.integrations.wati.errorStack = error.stack;
      results.integrations.wati.connected = false;
      console.error('❌ Error conectando con WATI:', error);
    }
  } else {
    results.integrations.wati.status = '⚠️ NOT CONFIGURED';
    results.integrations.wati.connected = false;
  }

  // ============================================
  // 2. VERIFICAR META WHATSAPP BUSINESS API
  // ============================================
  console.log('🔍 Verificando Meta WhatsApp Business API...');
  
  const metaAccessToken = process.env.META_WHATSAPP_ACCESS_TOKEN;
  const metaPhoneNumberId = process.env.META_WHATSAPP_PHONE_NUMBER_ID;
  const metaBusinessAccountId = process.env.META_WHATSAPP_BUSINESS_ACCOUNT_ID;

  results.integrations.meta = {
    name: 'Meta WhatsApp Business API',
    configured: Boolean(
      metaAccessToken && 
      metaPhoneNumberId && 
      metaBusinessAccountId &&
      !metaAccessToken.includes('tu-token') &&
      !metaPhoneNumberId.includes('123456')
    ),
    credentials: {
      accessToken: metaAccessToken ? 
        (metaAccessToken.includes('tu-token') ? '⚠️ PLACEHOLDER' : `${metaAccessToken.substring(0, 20)}...`) 
        : 'NOT SET',
      phoneNumberId: metaPhoneNumberId || 'NOT SET',
      businessAccountId: metaBusinessAccountId || 'NOT SET'
    }
  };

  // Test de conectividad con Meta
  if (metaAccessToken && metaPhoneNumberId && !metaAccessToken.includes('tu-token')) {
    try {
      console.log('📡 Probando conexión con Meta WhatsApp...');
      
      // Verificar el Phone Number ID
      const testResponse = await fetch(
        `https://graph.facebook.com/v21.0/${metaPhoneNumberId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${metaAccessToken}`
          }
        }
      );

      const testData = await testResponse.json();

      results.integrations.meta.status = testResponse.ok ? '✅ CONNECTED' : '❌ ERROR';
      results.integrations.meta.httpStatus = testResponse.status;
      results.integrations.meta.connected = testResponse.ok;
      
      if (testResponse.ok) {
        results.integrations.meta.phoneNumber = testData.display_phone_number || 'Unknown';
        results.integrations.meta.verifiedName = testData.verified_name || 'Unknown';
        results.integrations.meta.qualityRating = testData.quality_rating || 'Unknown';
        console.log('✅ Meta WhatsApp conectado exitosamente');
      } else {
        results.integrations.meta.error = testData.error?.message || 'Unknown error';
        results.integrations.meta.errorCode = testData.error?.code;
        console.error('❌ Meta WhatsApp error:', testData);
      }

    } catch (error) {
      results.integrations.meta.status = '❌ CONNECTION FAILED';
      results.integrations.meta.error = error.message;
      results.integrations.meta.connected = false;
      console.error('❌ Error conectando con Meta WhatsApp:', error);
    }
  } else {
    results.integrations.meta.status = '⚠️ NOT CONFIGURED';
    results.integrations.meta.connected = false;
  }

  // ============================================
  // 3. RECOMENDACIONES Y ESTADO GENERAL
  // ============================================
  
  const anyConnected = results.integrations.wati.connected || results.integrations.meta.connected;
  
  results.status = anyConnected ? 'operational' : 'error';
  results.recommendations = [];

  if (!results.integrations.wati.connected && !results.integrations.meta.connected) {
    results.recommendations.push({
      priority: 'HIGH',
      message: '❌ Ninguna integración de WhatsApp está funcionando',
      action: 'Configura al menos WATI o Meta WhatsApp en las variables de entorno de Vercel'
    });
  }

  if (results.integrations.wati.connected && !results.integrations.meta.connected) {
    results.recommendations.push({
      priority: 'INFO',
      message: '✅ WATI está funcionando correctamente',
      action: 'Opcionalmente configura Meta WhatsApp como alternativa'
    });
  }

  if (results.integrations.meta.connected && !results.integrations.wati.connected) {
    results.recommendations.push({
      priority: 'INFO',
      message: '✅ Meta WhatsApp está funcionando correctamente',
      action: 'WATI no configurado o no disponible'
    });
  }

  if (results.integrations.wati.connected && results.integrations.meta.connected) {
    results.recommendations.push({
      priority: 'SUCCESS',
      message: '🎉 Ambas integraciones están funcionando',
      action: 'Sistema tiene redundancia completa para envío de WhatsApp'
    });
  }

  // Agregar URLs de configuración
  results.configurationGuides = {
    wati: 'https://app.wati.io/dashboard/api',
    meta: 'https://business.facebook.com/settings/whatsapp-business-accounts',
    vercel: 'https://vercel.com/dashboard (Settings → Environment Variables)'
  };

  // ============================================
  // 4. RESPONDER
  // ============================================
  
  const statusCode = anyConnected ? 200 : 503;
  
  console.log('\n📊 Resumen de verificación:');
  console.log('WATI:', results.integrations.wati.status);
  console.log('Meta:', results.integrations.meta.status);
  
  return res.status(statusCode).json(results);
}
