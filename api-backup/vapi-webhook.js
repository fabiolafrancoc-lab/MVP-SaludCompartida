/**
 * VAPI.AI WEBHOOK HANDLER
 * ======================
 * Recibe eventos de Vapi.ai cuando ocurren llamadas:
 * - call-start: Cuando inicia una llamada
 * - call-end: Cuando termina una llamada (con transcripción completa)
 * - function-call: Cuando el AI necesita ejecutar una función
 * 
 * NUEVO (2026-01-24): Descarga recordings de VAPI y sube a AWS S3 (legal + companion)
 * Guarda transcripciones en call_transcripts + companion_calls con análisis de IA
 * para detectar códigos de comportamiento (CRISIS, EMOCION, SALUD, etc.)
 * 
 * Documentación: https://docs.vapi.ai/webhooks
 */

import { createClient } from '@supabase/supabase-js';
import { CODIGOS_COMPORTAMIENTO } from '../ai-brain/lupita-scripts-relacionales.js';
import { processCallAudio } from '../src/lib/vapi-audio-handler.js';

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

  // Insertar en companion_calls (nueva tabla)
  try {
    await supabase.from('companion_calls').insert({
      call_id: call.id,
      phone_number: call.customer?.number || 'unknown',
      started_at: call.startedAt ? new Date(call.startedAt).toISOString() : new Date().toISOString(),
      status: 'in_progress',
      vapi_phone_number_id: call.phoneNumberId || process.env.VAPI_PHONE_NUMBER_ID,
      companion_type: call.metadata?.companion || 'lupita'
    });
    console.log('✅ companion_calls record created for call:', call.id);
  } catch (error) {
    console.error('❌ Error creating companion_calls record:', error);
  }
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
    // Preparar la transcripción en formato estructurado
    const transcriptMessages = [];
    let fullTranscriptText = '';
    
    if (transcript && Array.isArray(transcript)) {
      for (const msg of transcript) {
        const message = msg.content || msg.message || '';
        const role = msg.role || (msg.user ? 'user' : 'assistant');
        
        transcriptMessages.push({
          role,
          message,
          timestamp: msg.timestamp || new Date().toISOString()
        });
        
        fullTranscriptText += `${role === 'user' ? 'Usuario' : 'Lupita'}: ${message}\n`;
      }
    }

    // Extraer información del usuario de metadata o customer
    const phoneNumber = call.customer?.number || 'unknown';
    const userName = call.metadata?.userName || call.customer?.name || null;
    const userEmail = call.metadata?.userEmail || null;
    const accessCode = call.metadata?.accessCode || null; // Código de acceso del usuario
    const agentId = call.metadata?.agentId || call.assistantId || 'agent_001';
    const callReason = call.metadata?.callReason || 'general';
    const userProfile = call.metadata?.userProfile || null; // 'adulto_mayor' o 'madre_hijos'
    const callNumber = call.metadata?.callNumber || 1;
    const previousTopics = call.metadata?.previousTopics || [];

    // Guardar transcripción completa en Supabase (tabla nueva call_transcripts)
    const { data: transcriptData, error: transcriptError } = await supabase
      .from('call_transcripts')
      .insert({
        call_id: call.id,
        access_code: accessCode,
        phone_number: phoneNumber,
        user_name: userName,
        user_email: userEmail,
        agent_id: agentId,
        agent_name: getAgentName(agentId),
        call_reason: callReason,
        call_type: call.type || 'outbound',
        user_profile: userProfile,
        call_number: callNumber,
        previous_topics: previousTopics,
        transcript: fullTranscriptText,
        transcript_json: transcriptMessages,
        recording_url: recording?.url || null,
        recording_duration: Math.round(call.duration || 0),
        call_status: call.endedReason === 'hangup' ? 'completed' : call.endedReason || 'unknown',
        call_duration: Math.round(call.duration || 0),
        vapi_metadata: {
          startedAt: call.startedAt,
          endedAt: call.endedAt,
          cost: call.cost,
          customer: call.customer,
          ...call.metadata
        },
        call_started_at: call.startedAt ? new Date(call.startedAt).toISOString() : new Date().toISOString(),
        call_ended_at: call.endedAt ? new Date(call.endedAt).toISOString() : new Date().toISOString()
      })
      .select()
      .single();

    if (transcriptError) {
      console.error('❌ Error saving call transcript:', transcriptError);
      return;
    }

    console.log('✅ Call transcript saved:', transcriptData.id);

    // **NUEVO: Procesar audio y subir a S3**
    if (recording?.url) {
      console.log('📥 Processing audio from VAPI recording...');
      try {
        const audioResult = await processCallAudio(call.id, recording.url);
        
        // Actualizar companion_calls con URLs de S3
        await supabase.from('companion_calls')
          .update({
            s3_legal_url: audioResult.legalUrl,
            s3_active_url: audioResult.companionUrl,
            s3_legal_key: audioResult.legalKey,
            s3_active_key: audioResult.companionKey,
            audio_size_bytes: audioResult.audioSize,
            status: 'completed',
            ended_at: call.endedAt ? new Date(call.endedAt).toISOString() : new Date().toISOString(),
            duration_seconds: Math.round(call.duration || 0),
            transcript: transcriptMessages,
            vapi_recording_url: recording.url,
            hung_up_by: call.endedReason === 'hangup' ? 'user' : 'system'
          })
          .eq('call_id', call.id);
        
        console.log('✅ Audio uploaded to S3 (legal + companion):', {
          legal: audioResult.legalUrl,
          companion: audioResult.companionUrl
        });
      } catch (audioError) {
        console.error('❌ Error processing audio:', audioError);
        // Actualizar con error pero mantener metadata
        await supabase.from('companion_calls')
          .update({
            status: 'failed',
            ended_at: new Date().toISOString(),
            vapi_recording_url: recording.url
          })
          .eq('call_id', call.id);
      }
    } else {
      console.warn('⚠️ No recording URL provided by VAPI');
      // Actualizar companion_calls sin audio
      await supabase.from('companion_calls')
        .update({
          status: 'completed',
          ended_at: call.endedAt ? new Date(call.endedAt).toISOString() : new Date().toISOString(),
          duration_seconds: Math.round(call.duration || 0),
          transcript: transcriptMessages
        })
        .eq('call_id', call.id);
    }

    // Analizar la llamada con IA si hay transcripción
    if (fullTranscriptText.length > 50) {
      analyzeCallWithAI(transcriptData.id, fullTranscriptText, transcriptMessages)
        .catch(err => console.error('Error analyzing call:', err));
    }

    // LEGACY: También guardar en ai_voice_calls para compatibilidad (si existe)
    try {
      await supabase.from('ai_voice_calls').insert({
        vapi_call_id: call.id,
        phone_number: phoneNumber,
        agent_id: agentId,
        duration_seconds: Math.round(call.duration || 0),
        cost_usd: call.cost || 0,
        transcript: transcriptMessages,
        recording_url: recording?.url || null,
        end_reason: call.endedReason || 'unknown',
        call_reason: callReason,
        metadata: call.metadata,
        created_at: call.createdAt ? new Date(call.createdAt).toISOString() : new Date().toISOString()
      });
    } catch (legacyError) {
      // Ignorar si la tabla no existe
      console.log('ℹ️ Legacy ai_voice_calls table not available');
    }

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

/**
 * Analiza una llamada con OpenAI para extraer:
 * - Sentimiento (positive/neutral/negative)
 * - Códigos de comportamiento (CRISIS, EMOCION, SALUD, etc.)
 * - Topics principales discutidos
 * - Action items
 * - Personas mencionadas
 * - Nivel de crisis
 */
async function analyzeCallWithAI(transcriptId, fullTranscriptText, transcriptMessages) {
  try {
    // Llamar a OpenAI para análisis profundo
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.2,
        messages: [{
          role: 'system',
          content: `Eres un analista experto en conversaciones de acompañamiento emocional. 
Analiza esta conversación telefónica entre Lupita (agente de SaludCompartida) y un usuario.

CÓDIGOS DE COMPORTAMIENTO A DETECTAR:
- CERRADO: Respuestas cortas, monosílabos, tono cortante
- EMOCION: Llanto, voz quebrada, suspiros profundos
- SALUD: Menciona dolor físico, síntomas, malestar
- PAREJA: Menciona pleitos con pareja/migrante
- FINANZAS: Menciona dinero, remesas, problemas económicos
- ABANDONO: Siente que el migrante no llama, se siente sola
- CRISIS: Menciona "ya no quiero vivir", "no tiene caso", ideación suicida

NIVEL DE CRISIS (si aplica):
- none: Sin señales de crisis
- low: Desánimo leve, tristeza pasajera
- medium: Desánimo persistente, aislamiento social
- high: Desesperanza, pensamientos negativos recurrentes
- critical: Ideación suicida, plan concreto de autolesión

Devuelve un JSON con:
{
  "sentiment": {
    "overall": "positive" | "neutral" | "negative",
    "confidence": 0.0-1.0,
    "emotions": ["tristeza", "ansiedad", "alegría", etc.]
  },
  "detected_codes": ["CODIGO1", "CODIGO2", ...],
  "crisis_detected": true | false,
  "crisis_level": "none" | "low" | "medium" | "high" | "critical",
  "crisis_evidence": "citas textuales que evidencian crisis, o null",
  "topics": ["cocina", "medicamentos", "familia", "salud", etc.] (máximo 10),
  "mentioned_people": ["Juan", "María", etc.] (nombres propios mencionados),
  "action_items": ["recordar_tomar_medicamento", "agendar_doctor", etc.],
  "follow_up_needed": true | false,
  "follow_up_reason": "razón del seguimiento o null",
  "call_quality_score": 0.0-1.0 (calidad de la interacción),
  "user_satisfaction": "satisfied" | "neutral" | "dissatisfied",
  "summary": "resumen ejecutivo de la llamada en 2-3 líneas",
  "relational_notes": "notas sobre la relación Lupita-usuario, temas para retomar"
}`
        }, {
          role: 'user',
          content: `TRANSCRIPCIÓN DE LLAMADA:\n\n${fullTranscriptText}\n\nAnaliza esta conversación.`
        }],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const result = await response.json();
    const analysis = JSON.parse(result.choices[0].message.content);

    // Actualizar la base de datos con el análisis completo
    const { error: updateError } = await supabase
      .from('call_transcripts')
      .update({
        sentiment_analysis: analysis.sentiment,
        detected_codes: analysis.detected_codes || [],
        crisis_detected: analysis.crisis_detected || false,
        crisis_level: analysis.crisis_level || 'none',
        topics: analysis.topics || [],
        mentioned_people: analysis.mentioned_people || [],
        action_items: analysis.action_items || [],
        call_quality_score: analysis.call_quality_score || null,
        user_satisfaction: analysis.user_satisfaction || 'neutral',
        follow_up_needed: analysis.follow_up_needed || false,
        follow_up_reason: analysis.follow_up_reason || null,
        analyzed_at: new Date().toISOString()
      })
      .eq('id', transcriptId);

    if (updateError) {
      console.error('❌ Error updating call analysis:', updateError);
      return;
    }

    console.log('✅ Call analyzed with AI:', {
      transcriptId,
      sentiment: analysis.sentiment?.overall,
      codes: analysis.detected_codes,
      crisis: analysis.crisis_detected ? analysis.crisis_level : 'none'
    });

    // Si hay crisis detectada, enviar alerta
    if (analysis.crisis_detected && ['high', 'critical'].includes(analysis.crisis_level)) {
      await sendCrisisAlert(transcriptId, analysis);
    }

  } catch (error) {
    console.error('❌ Error analyzing call with AI:', error);
  }
}

/**
 * Envía alerta de crisis al equipo (Slack, email, SMS, etc.)
 */
async function sendCrisisAlert(transcriptId, analysis) {
  try {
    // Obtener datos completos de la llamada
    const { data: callData } = await supabase
      .from('call_transcripts')
      .select('*')
      .eq('id', transcriptId)
      .single();

    if (!callData) return;

    console.log('🚨 CRISIS ALERT:', {
      level: analysis.crisis_level,
      user: callData.user_name || callData.phone_number,
      evidence: analysis.crisis_evidence
    });

    // TODO: Implementar notificación real
    // - Enviar a Slack webhook
    // - Enviar email urgente al equipo
    // - Enviar SMS al supervisor
    // - Crear ticket prioritario

    // Por ahora, marcar para seguimiento inmediato
    await supabase
      .from('call_transcripts')
      .update({
        follow_up_scheduled_at: new Date(Date.now() + 60 * 60 * 1000).toISOString() // En 1 hora
      })
      .eq('id', transcriptId);

  } catch (error) {
    console.error('❌ Error sending crisis alert:', error);
  }
}

/**
 * Obtiene el nombre del agente desde su ID
 */
function getAgentName(agentId) {
  const agentNames = {
    'agent_001': 'Lupita',
    'agent_002': 'Carmen',
    'agent_003': 'Rosa',
    'agent_004': 'Teresa',
    'agent_005': 'María',
    'agent_006': 'Ana',
    'agent_007': 'Sofía',
    'agent_008': 'Daniela',
    'agent_009': 'Don Roberto'
  };
  return agentNames[agentId] || 'Lupita';
}

