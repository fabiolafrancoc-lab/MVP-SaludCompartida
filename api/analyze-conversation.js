/**
 * ANALYZE CONVERSATION WITH CLAUDE
 * POST /api/analyze-conversation
 * 
 * Body:
 * {
 *   "transcript": [
 *     { "role": "user", "content": "..." },
 *     { "role": "assistant", "content": "..." }
 *   ]
 * }
 */

import { analyzeConversation, detectEmotion } from '../src/lib/claude-client.js';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { transcript, conversationId, saveToDatabase = false } = req.body;

    if (!transcript || !Array.isArray(transcript)) {
      return res.status(400).json({ 
        error: 'Transcript requerido',
        example: {
          transcript: [
            { role: 'user', content: 'Hola, me siento muy triste' },
            { role: 'assistant', content: 'Lo siento mucho. ¿Quieres contarme más?' }
          ]
        }
      });
    }

    console.log('🔍 Analizando conversación con Claude...');

    // Analizar conversación completa
    const analysis = await analyzeConversation(transcript);

    console.log('✅ Análisis completado:', {
      sentiment: analysis.sentiment,
      urgency: analysis.urgency,
      topics: analysis.topics,
      flags: analysis.flags
    });

    // Si hay flags críticos, registrar alerta
    if (analysis.flags && analysis.flags.length > 0) {
      console.warn('⚠️ FLAGS DETECTADOS:', analysis.flags);
      
      // TODO: Enviar notificación al equipo si hay flags de "crisis" o "suicidio"
      const criticalFlags = analysis.flags.filter(f => 
        ['crisis', 'suicidio', 'violencia', 'abuso'].includes(f.toLowerCase())
      );
      
      if (criticalFlags.length > 0) {
        console.error('🚨 ALERTA CRÍTICA:', criticalFlags);
      }
    }

    // Guardar análisis en Supabase si se solicita
    if (saveToDatabase && conversationId) {
      try {
        const { error: updateError } = await supabase
          .from('call_transcripts')
          .update({
            analysis_claude: analysis,
            analyzed_at: new Date().toISOString()
          })
          .eq('vapi_call_id', conversationId);

        if (updateError) {
          console.error('Error guardando análisis en Supabase:', updateError);
        } else {
          console.log('✅ Análisis guardado en Supabase');
        }
      } catch (dbError) {
        console.error('Error de base de datos:', dbError);
      }
    }

    return res.status(200).json({
      success: true,
      conversationId: conversationId,
      analysis: analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error analizando conversación:', error);

    return res.status(500).json({
      success: false,
      error: error.message,
      troubleshooting: 'Verifica que ANTHROPIC_API_KEY esté configurado en Vercel'
    });
  }
}
