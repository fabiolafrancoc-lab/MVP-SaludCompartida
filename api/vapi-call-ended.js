// ============================================
// WEBHOOK: VAPI Call Ended
// Recibe datos de llamadas completadas y los guarda en Supabase
// ============================================

import { createClient } from '@supabase/supabase-js';

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

    // Extraer información de la llamada
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

    console.log('💾 Guardando en Supabase:', callData);

    // Insertar en Supabase
    const { data, error } = await supabase
      .from('call_transcripts')
      .insert([callData])
      .select();

    if (error) {
      console.error('❌ Error al guardar en Supabase:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }

    console.log('✅ Llamada guardada exitosamente:', data[0]?.id);

    // TODO: Agregar análisis con IA aquí (sentiment, topics, crisis detection)

    return res.status(200).json({ 
      success: true, 
      id: data[0]?.id,
      message: 'Transcript saved successfully' 
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
