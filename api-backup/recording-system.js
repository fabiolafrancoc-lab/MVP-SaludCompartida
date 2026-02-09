/**
 * SISTEMA DE GRABACIONES Y TRANSCRIPCIONES
 * 
 * Propósito dual:
 * 1. TRAINING: Mejores prácticas de agentes → Fine-tuning de modelos AI
 * 2. MEASUREMENT: Técnicas que funcionan → A/B testing de conversaciones
 * 
 * Stack:
 * - Storage: Vercel Blob Storage (o Cloudflare R2 para producción)
 * - Transcripción: OpenAI Whisper API
 * - Análisis: GPT-4 para extracción de patrones
 * 
 * Arquitectura:
 * - Grabaciones etiquetadas por: fecha, agente, usuario, resultado, duración
 * - Metadata rica: tono emocional, técnicas usadas, outcome
 * - Indexado para búsqueda: "mejores llamadas de retención", "manejo de crisis", etc.
 */

import { createClient } from '@supabase/supabase-js';
import { put } from '@vercel/blob';
import OpenAI from 'openai';

// Helper function to get Supabase client
function getSupabaseClient() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
}

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Sube una grabación de audio a Vercel Blob Storage
 * 
 * @param {Buffer} audioFile - Archivo de audio en buffer
 * @param {Object} metadata - Metadata de la grabación
 * @returns {Promise<Object>} - URL y metadata de la grabación guardada
 */
export async function uploadRecording(audioFile, metadata) {
  try {
    // Generar nombre único
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `recordings/${metadata.userId}/${timestamp}_${metadata.agentId}.${metadata.format || 'opus'}`;
    
    // Subir a Vercel Blob
    const blob = await put(fileName, audioFile, {
      access: 'private', // Solo accesible con token
      addRandomSuffix: false
    });
    
    console.log('✅ Recording uploaded to Vercel Blob:', blob.url);
    
    // Guardar metadata en Supabase
    const recordingData = {
      user_id: metadata.userId,
      agent_id: metadata.agentId,
      recording_url: blob.url,
      duration_seconds: metadata.duration,
      recording_date: metadata.recordingDate || new Date().toISOString(),
      
      // Metadata de la llamada
      call_type: metadata.callType || 'outbound', // outbound, inbound, callback
      call_outcome: metadata.outcome || 'pending', // completed, dropped, transferred, escalated
      
      // Etiquetado para análisis
      tags: metadata.tags || [], // ['retention', 'crisis', 'medication_reminder', etc.]
      emotional_tone: metadata.emotionalTone || null, // happy, sad, anxious, angry, neutral
      
      // Para training
      is_training_example: metadata.isTrainingExample || false,
      quality_rating: metadata.qualityRating || null, // 1-5
      
      // Estado de procesamiento
      transcription_status: 'pending', // pending, processing, completed, failed
      analysis_status: 'pending'
    };
    
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('call_recordings')
      .insert(recordingData)
      .select()
      .single();
    
    if (error) throw error;
    
    console.log('✅ Recording metadata saved to Supabase:', data.id);
    
    // Iniciar transcripción en background (no bloqueante)
    transcribeRecording(data.id, blob.url).catch(err => {
      console.error('❌ Background transcription failed:', err);
    });
    
    return {
      success: true,
      recordingId: data.id,
      blobUrl: blob.url,
      message: 'Recording uploaded successfully. Transcription in progress.'
    };
    
  } catch (error) {
    console.error('❌ Error uploading recording:', error);
    throw error;
  }
}

/**
 * Transcribe una grabación usando OpenAI Whisper
 * 
 * @param {string} recordingId - ID de la grabación en Supabase
 * @param {string} audioUrl - URL del archivo de audio
 */
async function transcribeRecording(recordingId, audioUrl) {
  try {
    const supabase = getSupabaseClient();
    
    // Actualizar status a "processing"
    await supabase
      .from('call_recordings')
      .update({ transcription_status: 'processing' })
      .eq('id', recordingId);
    
    console.log('🎙️ Starting transcription for recording:', recordingId);
    
    // Descargar el audio (necesario para Whisper)
    const audioResponse = await fetch(audioUrl);
    const audioBuffer = await audioResponse.arrayBuffer();
    const audioFile = new File([audioBuffer], 'recording.opus', { type: 'audio/opus' });
    
    // Transcribir con Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'es', // Español
      response_format: 'verbose_json', // Incluye timestamps
      timestamp_granularities: ['segment'] // Timestamps por segmento
    });
    
    console.log('✅ Transcription completed:', transcription.text.substring(0, 100) + '...');
    
    // Guardar transcripción
    const { error: updateError } = await supabase
      .from('call_recordings')
      .update({
        transcription_text: transcription.text,
        transcription_segments: transcription.segments || [],
        transcription_duration: transcription.duration,
        transcription_status: 'completed',
        transcribed_at: new Date().toISOString()
      })
      .eq('id', recordingId);
    
    if (updateError) throw updateError;
    
    // Analizar la transcripción (siguiente paso)
    await analyzeTranscription(recordingId, transcription.text);
    
    return transcription;
    
  } catch (error) {
    console.error('❌ Error transcribing recording:', error);
    
    // Actualizar status a "failed"
    const supabase = getSupabaseClient();
    await supabase
      .from('call_recordings')
      .update({ 
        transcription_status: 'failed',
        transcription_error: error.message 
      })
      .eq('id', recordingId);
    
    throw error;
  }
}

/**
 * Analiza una transcripción para extraer insights, técnicas, patterns
 * 
 * @param {string} recordingId - ID de la grabación
 * @param {string} transcriptionText - Texto transcrito
 */
async function analyzeTranscription(recordingId, transcriptionText) {
  try {
    const supabase = getSupabaseClient();
    
    await supabase
      .from('call_recordings')
      .update({ analysis_status: 'processing' })
      .eq('id', recordingId);
    
    console.log('🔍 Analyzing transcription for recording:', recordingId);
    
    // Usar GPT-4 para análisis profundo
    const analysisPrompt = `
Eres un experto en análisis de conversaciones telefónicas para servicios de salud dirigidos a migrantes latinos.

Analiza la siguiente transcripción de una llamada y extrae:

1. **Técnicas del agente** que usó (escucha activa, validación emocional, preguntas abiertas, etc.)
2. **Tono emocional** del usuario (ansioso, confiado, triste, agradecido, etc.)
3. **Outcome de la llamada** (usuario comprometido, neutral, resistente)
4. **Momentos clave** (puntos de inflexión en la conversación)
5. **Palabras/frases poderosas** que generaron rapport
6. **Áreas de mejora** para el agente
7. **Categoría** (medication_reminder, crisis_support, routine_checkin, retention_call)
8. **Rating de calidad** (1-5, donde 5 es excelente)

Transcripción:
${transcriptionText}

Responde en formato JSON:
{
  "techniques": ["técnica1", "técnica2"],
  "userEmotionalTone": "string",
  "callOutcome": "string",
  "keyMoments": ["momento1", "momento2"],
  "powerPhrases": ["frase1", "frase2"],
  "improvementAreas": ["área1", "área2"],
  "category": "string",
  "qualityRating": number
}
`;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: analysisPrompt }],
      response_format: { type: 'json_object' },
      temperature: 0.3 // Más determinista
    });
    
    const analysis = JSON.parse(completion.choices[0].message.content);
    
    console.log('✅ Analysis completed:', analysis);
    
    // Guardar análisis
    await supabase
      .from('call_recordings')
      .update({
        analysis_techniques: analysis.techniques,
        analysis_emotional_tone: analysis.userEmotionalTone,
        analysis_outcome: analysis.callOutcome,
        analysis_key_moments: analysis.keyMoments,
        analysis_power_phrases: analysis.powerPhrases,
        analysis_improvement_areas: analysis.improvementAreas,
        analysis_category: analysis.category,
        analysis_quality_rating: analysis.qualityRating,
        analysis_status: 'completed',
        analyzed_at: new Date().toISOString()
      })
      .eq('id', recordingId);
    
    return analysis;
    
  } catch (error) {
    console.error('❌ Error analyzing transcription:', error);
    
    const supabase = getSupabaseClient();
    await supabase
      .from('call_recordings')
      .update({ 
        analysis_status: 'failed',
        analysis_error: error.message 
      })
      .eq('id', recordingId);
    
    throw error;
  }
}

/**
 * Busca grabaciones por criterios (para training o measurement)
 * 
 * @param {Object} criteria - Criterios de búsqueda
 * @returns {Promise<Array>} - Grabaciones que cumplen criterios
 */
export async function searchRecordings(criteria) {
  try {
    const supabase = getSupabaseClient();
    
    let query = supabase
      .from('call_recordings')
      .select('*');
    
    // Aplicar filtros
    if (criteria.agentId) {
      query = query.eq('agent_id', criteria.agentId);
    }
    if (criteria.userId) {
      query = query.eq('user_id', criteria.userId);
    }
    if (criteria.category) {
      query = query.eq('analysis_category', criteria.category);
    }
    if (criteria.minQualityRating) {
      query = query.gte('analysis_quality_rating', criteria.minQualityRating);
    }
    if (criteria.isTrainingExample) {
      query = query.eq('is_training_example', true);
    }
    if (criteria.tags && criteria.tags.length > 0) {
      query = query.contains('tags', criteria.tags);
    }
    if (criteria.dateFrom) {
      query = query.gte('recording_date', criteria.dateFrom);
    }
    if (criteria.dateTo) {
      query = query.lte('recording_date', criteria.dateTo);
    }
    
    // Ordenar por calidad (mejores primero)
    query = query.order('analysis_quality_rating', { ascending: false, nullsFirst: false });
    
    const { data, error } = await query.limit(criteria.limit || 50);
    
    if (error) throw error;
    
    return data;
    
  } catch (error) {
    console.error('❌ Error searching recordings:', error);
    throw error;
  }
}

/**
 * Marca grabaciones como ejemplos de training
 * 
 * @param {Array<string>} recordingIds - IDs de grabaciones
 * @param {boolean} isTraining - true para marcar como training, false para desmarcar
 */
export async function markAsTrainingExample(recordingIds, isTraining = true) {
  try {
    const supabase = getSupabaseClient();
    
    const { error } = await supabase
      .from('call_recordings')
      .update({ 
        is_training_example: isTraining,
        updated_at: new Date().toISOString()
      })
      .in('id', recordingIds);
    
    if (error) throw error;
    
    console.log(`✅ ${recordingIds.length} recordings marked as training=${isTraining}`);
    
    return { success: true };
    
  } catch (error) {
    console.error('❌ Error marking recordings as training:', error);
    throw error;
  }
}

/**
 * Genera reporte de mejores prácticas (para training de agentes)
 * 
 * @param {Object} filters - Filtros para el reporte
 * @returns {Promise<Object>} - Reporte con mejores prácticas identificadas
 */
export async function generateBestPracticesReport(filters = {}) {
  try {
    const supabase = getSupabaseClient();
    
    // Obtener llamadas de alta calidad (rating >= 4)
    let query = supabase
      .from('call_recordings')
      .select('*')
      .gte('analysis_quality_rating', 4)
      .eq('transcription_status', 'completed')
      .eq('analysis_status', 'completed');
    
    if (filters.category) {
      query = query.eq('analysis_category', filters.category);
    }
    if (filters.dateFrom) {
      query = query.gte('recording_date', filters.dateFrom);
    }
    
    const { data, error } = await query.limit(100);
    
    if (error) throw error;
    
    // Agregar técnicas más efectivas
    const techniqueCounts = {};
    const powerPhrasesCount = {};
    const outcomesByTechnique = {};
    
    data.forEach(recording => {
      // Contar técnicas
      (recording.analysis_techniques || []).forEach(technique => {
        techniqueCounts[technique] = (techniqueCounts[technique] || 0) + 1;
        
        // Asociar outcome a técnica
        if (!outcomesByTechnique[technique]) {
          outcomesByTechnique[technique] = [];
        }
        outcomesByTechnique[technique].push(recording.analysis_outcome);
      });
      
      // Contar power phrases
      (recording.analysis_power_phrases || []).forEach(phrase => {
        powerPhrasesCount[phrase] = (powerPhrasesCount[phrase] || 0) + 1;
      });
    });
    
    // Top técnicas
    const topTechniques = Object.entries(techniqueCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([technique, count]) => ({
        technique,
        occurrences: count,
        avgQuality: data
          .filter(r => r.analysis_techniques?.includes(technique))
          .reduce((sum, r) => sum + r.analysis_quality_rating, 0) / count
      }));
    
    // Top power phrases
    const topPowerPhrases = Object.entries(powerPhrasesCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([phrase, count]) => ({ phrase, occurrences: count }));
    
    const report = {
      totalAnalyzed: data.length,
      dateRange: {
        from: filters.dateFrom || data[data.length - 1]?.recording_date,
        to: data[0]?.recording_date
      },
      topTechniques,
      topPowerPhrases,
      avgDuration: data.reduce((sum, r) => sum + (r.duration_seconds || 0), 0) / data.length,
      avgQualityRating: data.reduce((sum, r) => sum + r.analysis_quality_rating, 0) / data.length,
      outcomeDistribution: data.reduce((acc, r) => {
        acc[r.analysis_outcome] = (acc[r.analysis_outcome] || 0) + 1;
        return acc;
      }, {}),
      generatedAt: new Date().toISOString()
    };
    
    return report;
    
  } catch (error) {
    console.error('❌ Error generating best practices report:', error);
    throw error;
  }
}

/**
 * Endpoint handler para subir grabaciones (Vercel Serverless)
 */
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Esperar que el audio venga como multipart/form-data
      // En producción, usar un parser de multipart como 'formidable' o 'multer'
      
      const { audioFile, metadata } = req.body; // Simplificado
      
      const result = await uploadRecording(audioFile, metadata);
      
      return res.status(200).json(result);
      
    } catch (error) {
      console.error('❌ Error in recording upload handler:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
  
  else if (req.method === 'GET') {
    try {
      // Buscar grabaciones
      const criteria = req.query;
      
      const recordings = await searchRecordings(criteria);
      
      return res.status(200).json({ 
        success: true, 
        recordings,
        count: recordings.length 
      });
      
    } catch (error) {
      console.error('❌ Error searching recordings:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
  
  else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
