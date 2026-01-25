// ============================================
// WEBHOOK: VAPI Call Ended (Updated to Lupita Companion System)
// Recibe datos de llamadas completadas y los guarda en Supabase + S3
// ============================================

import { createClient } from '@supabase/supabase-js';
import { processCallAudio } from '../src/lib/vapi-audio-handler.js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('📞 VAPI Webhook received:', JSON.stringify(req.body, null, 2));

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const {
      call,
      transcript,
      recording,
      summary,
      messages,
      metadata
    } = req.body;

    // ========================================
    // 1. GUARDAR EN companion_calls (nuevo sistema)
    // ========================================
    const companionCallData = {
      call_id: call?.id,
      phone_number: call?.customer?.number || call?.phoneNumber?.number,
      started_at: call?.startedAt,
      ended_at: call?.endedAt,
      duration_seconds: call?.duration,
      status: 'completed',
      vapi_recording_url: recording?.url,
      vapi_phone_number_id: call?.phoneNumberId,
      transcript: messages || transcript,
      hung_up_by: call?.endedReason || 'unknown'
    };

    // Insertar/Update en companion_calls
    const { data: companionCall, error: companionError } = await supabase
      .from('companion_calls')
      .upsert(companionCallData, { onConflict: 'call_id' })
      .select()
      .single();

    if (companionError) {
      console.error('❌ Error al guardar companion_call:', companionError);
    } else {
      console.log('✅ Companion call guardada:', companionCall.id);
    }

    // ========================================
    // 2. DESCARGAR Y SUBIR AUDIO A S3
    // ========================================
    if (recording?.url && companionCall) {
      try {
        console.log('⬇️ Descargando audio de VAPI...');
        const audioResult = await processCallAudio(call.id, recording.url);
        
        console.log('📦 Audio subido a S3:', {
          legal: audioResult.legalUrl,
          companion: audioResult.companionUrl,
          size: audioResult.audioSize
        });

        // Actualizar companion_calls con URLs de S3
        await supabase
          .from('companion_calls')
          .update({
            s3_legal_url: audioResult.legalUrl,
            s3_active_url: audioResult.companionUrl,
            s3_legal_key: audioResult.legalKey,
            s3_active_key: audioResult.companionKey,
            audio_size_bytes: audioResult.audioSize
          })
          .eq('id', companionCall.id);

        console.log('✅ URLs de S3 actualizadas en companion_calls');
      } catch (audioError) {
        console.error('❌ Error procesando audio:', audioError);
        // No fallar el webhook por error de audio
      }
    }

    // ========================================
    // 3. LEGACY: Guardar también en call_transcripts (backward compatibility)
    // ========================================
    // ========================================
    // 3. LEGACY: Guardar también en call_transcripts (backward compatibility)
    // ========================================
    const callData = {
      call_id: call?.id,
      phone_number: call?.customer?.number || call?.phoneNumber,
      user_name: call?.customer?.name || metadata?.userName,
      user_email: call?.customer?.email,
      
      // Info de agente
      agent_id: call?.assistantId || 'lupita_001',
      agent_name: 'Lupita',
      call_reason: metadata?.callReason || 'welcome_call',
      call_type: 'outbound',
      
      // Transcripción
      transcript: transcript || buildTranscriptFromMessages(messages),
      transcript_json: messages || [],
      
      // Grabación
      recording_url: recording?.url,
      recording_duration: call?.duration,
      
      // Metadata completa
      vapi_metadata: req.body,
      
      // Status de la llamada
      call_status: call?.status || 'completed',
      call_duration: call?.duration,
      
      // Timestamps
      call_started_at: call?.startedAt,
      call_ended_at: call?.endedAt,
      
      // Valores por defecto
      call_number: 1,
      user_profile: 'adulto_mayor',
      crisis_detected: false,
      crisis_level: 'none',
      follow_up_needed: false
    };

    console.log('💾 Guardando en call_transcripts (legacy)...');

    // Insertar en call_transcripts (tabla vieja)
    const { data, error } = await supabase
      .from('call_transcripts')
      .insert([callData])
      .select();

    if (error) {
      console.error('⚠️ Error al guardar en call_transcripts (legacy):', error);
      // No fallar el webhook, solo loguear
    } else {
      console.log('✅ Legacy call_transcripts guardado:', data[0]?.id);
    }

    // ========================================
    // RESPUESTA EXITOSA
    // ========================================
    return res.status(200).json({ 
      success: true, 
      companion_call_id: companionCall?.id,
      legacy_call_id: data?.[0]?.id,
      message: 'Call saved successfully with audio to S3' 
    });

  } catch (error) {
    console.error('❌ Error en webhook:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}

// Helper: Construir transcript desde mensajes
function buildTranscriptFromMessages(messages) {
  if (!messages || !Array.isArray(messages)) return '';
  
  return messages
    .map(msg => {
      const speaker = msg.role === 'assistant' ? 'Lupita' : 'Usuario';
      return `${speaker}: ${msg.content || msg.message || ''}`;
    })
    .join('\n');
}
