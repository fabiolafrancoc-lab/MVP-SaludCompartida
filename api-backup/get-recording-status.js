/**
 * ENDPOINT: Consultar estado de una grabación
 * 
 * GET /api/get-recording-status?id=UUID
 * 
 * Devuelve:
 * - Status de transcripción (pending/processing/completed/failed)
 * - Status de análisis (pending/processing/completed/failed)
 * - Texto transcrito (si está completo)
 * - Análisis completo (si está completo)
 */

import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ 
        error: 'Missing recording ID',
        usage: 'GET /api/get-recording-status?id=UUID'
      });
    }

    const supabase = getSupabaseClient();
    
    const { data: recording, error } = await supabase
      .from('call_recordings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ 
          error: 'Recording not found',
          id 
        });
      }
      throw error;
    }

    // Formatear respuesta
    const response = {
      id: recording.id,
      userId: recording.user_id,
      agentId: recording.agent_id,
      recordingDate: recording.recording_date,
      duration: recording.duration_seconds,
      
      status: {
        transcription: recording.transcription_status,
        analysis: recording.analysis_status
      },
      
      transcription: recording.transcription_status === 'completed' ? {
        text: recording.transcription_text,
        duration: recording.transcription_duration,
        segments: recording.transcription_segments,
        completedAt: recording.transcribed_at
      } : recording.transcription_status === 'failed' ? {
        error: recording.transcription_error
      } : null,
      
      analysis: recording.analysis_status === 'completed' ? {
        techniques: recording.analysis_techniques,
        emotionalTone: recording.analysis_emotional_tone,
        outcome: recording.analysis_outcome,
        keyMoments: recording.analysis_key_moments,
        powerPhrases: recording.analysis_power_phrases,
        improvementAreas: recording.analysis_improvement_areas,
        category: recording.analysis_category,
        qualityRating: recording.analysis_quality_rating,
        completedAt: recording.analyzed_at
      } : recording.analysis_status === 'failed' ? {
        error: recording.analysis_error
      } : null,
      
      metadata: {
        callType: recording.call_type,
        tags: recording.tags,
        emotionalTone: recording.emotional_tone,
        isTrainingExample: recording.is_training_example,
        qualityRating: recording.quality_rating
      }
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error('❌ Error fetching recording status:', error);
    return res.status(500).json({ 
      error: error.message 
    });
  }
}
