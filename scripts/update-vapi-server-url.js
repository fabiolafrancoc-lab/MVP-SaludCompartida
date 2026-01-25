#!/usr/bin/env node
/**
 * ACTUALIZAR SERVER URL EN VAPI - LUPITA
 * ======================================
 * 
 * Cambia la Server URL de Lupita a /api/vapi-webhook
 */

const VAPI_API_KEY = 'fa00fb52-c01f-499b-86e9-ea07fe9092ce'; // Private Key
const LUPITA_ASSISTANT_ID = 'e313a305-254b-4cb8-808b-3a1b79e5fdea';
const NEW_SERVER_URL = 'https://saludcompartida.app/api/vapi-webhook';

async function updateServerURL() {
  console.log('🔧 Actualizando Server URL de Lupita en VAPI...\n');
  
  try {
    const response = await fetch(`https://api.vapi.ai/assistant/${LUPITA_ASSISTANT_ID}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        server: {
          url: NEW_SERVER_URL,
          timeoutSeconds: 20
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error ${response.status}: ${error}`);
    }

    const result = await response.json();
    
    console.log('✅ Server URL actualizada exitosamente!');
    console.log(`📍 Nueva URL: ${result.server.url}\n`);
    console.log('🎉 Lupita ahora enviará webhooks a /api/vapi-webhook\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateServerURL();
