/**
 * TEST: Hacer que Lupita te llame
 * Endpoint: POST /api/test-lupita-call
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phoneNumber, userName } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ 
      error: 'Falta el número de teléfono',
      example: { 
        phoneNumber: '+13055551234',
        userName: 'María García'
      }
    });
  }

  const VAPI_API_KEY = process.env.VAPI_API_KEY;
  const VAPI_PHONE_NUMBER_ID = process.env.VAPI_PHONE_NUMBER_ID;
  const LUPITA_ASSISTANT_ID = 'e313a305-254b-4cb8-808b-3a1b79e5fdea'; // Assistant ID de Lupita en VAPI

  if (!VAPI_API_KEY) {
    return res.status(500).json({ error: 'VAPI_API_KEY no configurado en Vercel' });
  }

  try {
    console.log(`📞 Llamando a ${phoneNumber} con Lupita...`);

    const response = await fetch('https://api.vapi.ai/call/phone', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Número desde el cual llamar (tu número de Vapi)
        phoneNumberId: VAPI_PHONE_NUMBER_ID,
        
        // A quién llamar
        customer: {
          number: phoneNumber
        },
        
        // Usar el Assistant de Lupita que creaste en VAPI
        assistantId: LUPITA_ASSISTANT_ID,
        
        // Override del primer mensaje con el nombre del usuario
        assistantOverrides: {
          firstMessage: userName 
            ? `Hola, ¿hablo con ${userName}? Le habla Lupita de Salud Compartida. ¿Tiene un minutito para platicar?`
            : `Hola, le habla Lupita de Salud Compartida. ¿Tiene un minutito para platicar?`,
          
          // CRÍTICO: Sin ruido de fondo (eliminar ambiente de call center)
          backgroundSound: 'off',
          
          // Mejorar detección de cuando el usuario habla
          voice: {
            provider: '11labs',
            voiceId: 'z1ngDYs2H24Xsd8ts3az',
            model: 'eleven_turbo_v2',
            stability: 0.5,
            similarityBoost: 0.75,
            style: 0.3,
            optimizeStreamingLatency: 4,
            language: 'es'
          },
          
          // Configuración para que ESCUCHE mejor
          transcriber: {
            provider: 'deepgram',
            model: 'nova-2',
            language: 'es',
            keywords: ['sí', 'no', 'ajá', 'ok', 'bueno', 'hola']  // Palabras clave mexicanas
          },
          
          // CRÍTICO: Detección de interrupciones (que pare de hablar cuando hablas)
          interruptionThreshold: 50,  // Más sensible = la interrumpes más fácil (50-200, default 100)
          responseDelaySeconds: 1.2,  // Espera 1.2 segundos después de que termines de hablar
          silenceTimeoutSeconds: 3,   // Si hay silencio 3 segundos, pregunta si sigues ahí
          
          variableValues: {
            userName: userName || 'Usuario',
            callNumber: '1',
            userProfile: 'test'
          }
        },
        
        // Metadata opcional
        metadata: {
          test: true,
          userName: userName,
          timestamp: new Date().toISOString()
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Error de VAPI:', error);
      return res.status(response.status).json({ 
        error: 'Error al iniciar llamada',
        details: error 
      });
    }

    const callData = await response.json();
    console.log('✅ Llamada iniciada:', callData.id);

    return res.status(200).json({
      success: true,
      message: '¡Lupita está llamando!',
      callId: callData.id,
      status: callData.status
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({ 
      error: 'Error interno',
      message: error.message 
    });
  }
}
