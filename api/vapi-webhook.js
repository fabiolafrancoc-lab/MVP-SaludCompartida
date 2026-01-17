/**
 * VAPI.AI WEBHOOK HANDLER
 * ======================
 * Recibe eventos de Vapi.ai cuando ocurren llamadas:
 * - call-start: Cuando inicia una llamada
 * - call-end: Cuando termina una llamada (con transcripción completa)
 * - function-call: Cuando el AI necesita ejecutar una función
 * 
 * Documentación: https://docs.vapi.ai/webhooks
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  // Solo aceptar POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const event = req.body;
    
    console.log('📞 Vapi Webhook Event:', {
      type: event.type,
      callId: event.call?.id,
      timestamp: new Date().toISOString()
    });

    // Manejar diferentes tipos de eventos
    switch (event.type) {
      case 'call-start':
        await handleCallStart(event);
        break;
      
      case 'call-end':
        await handleCallEnd(event);
        break;
      
      case 'function-call':
        await handleFunctionCall(event);
        break;
      
      default:
        console.log('ℹ️ Unhandled event type:', event.type);
    }

    // Siempre responder 200 OK para que Vapi no reintente
    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('❌ Vapi webhook error:', error);
    // Aún así responder 200 para evitar reintentos
    return res.status(200).json({ 
      received: true, 
      error: error.message 
    });
  }
}

/**
 * Maneja el inicio de una llamada
 */
async function handleCallStart(event) {
  const { call } = event;
  
  console.log('🟢 Call Started:', {
    callId: call.id,
    phoneNumber: call.customer.number,
    assistantId: call.assistantId
  });

  // Opcional: Actualizar estado en base de datos
  // Por ejemplo, marcar scheduled_voice_calls como "in_progress"
}

/**
 * Maneja el fin de una llamada y guarda la transcripción
 */
async function handleCallEnd(event) {
  const { call, transcript, recording } = event;
  
  console.log('🔴 Call Ended:', {
    callId: call.id,
    duration: call.duration,
    cost: call.cost,
    endReason: call.endedReason
  });

  try {
    // Guardar transcripción completa en Supabase
    const { data, error } = await supabase
      .from('ai_voice_calls')
      .insert({
        vapi_call_id: call.id,
        phone_number: call.customer.number,
        agent_id: call.assistantId,
        duration_seconds: call.duration,
        cost_usd: call.cost,
        transcript: transcript,
        recording_url: recording?.url,
        end_reason: call.endedReason,
        created_at: new Date(call.createdAt).toISOString()
      });

    if (error) {
      console.error('❌ Error saving call to database:', error);
    } else {
      console.log('✅ Call saved to database:', data);
    }

    // Opcional: Guardar en Weaviate para memoria de IA
    // await storeCallInWeaviate(call, transcript);

  } catch (error) {
    console.error('❌ Error in handleCallEnd:', error);
  }
}

/**
 * Maneja llamadas a funciones del AI
 * (Por ejemplo, si el AI necesita agendar una cita o buscar información)
 */
async function handleFunctionCall(event) {
  const { functionCall, call } = event;
  
  console.log('🔧 Function Call:', {
    callId: call.id,
    function: functionCall.name,
    parameters: functionCall.parameters
  });

  // Aquí puedes implementar funciones que el AI puede llamar
  // Por ejemplo: scheduleAppointment, lookupUserInfo, etc.
  
  // Retornar resultado al AI
  return {
    result: 'Function executed successfully',
    data: {}
  };
}
