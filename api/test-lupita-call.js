/**
 * TEST: Hacer que Lupita te llame
 * Endpoint: POST /api/test-lupita-call
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ 
      error: 'Falta el número de teléfono',
      example: { phoneNumber: '+13055551234' }
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
        
        // Metadata opcional
        metadata: {
          test: true,
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
