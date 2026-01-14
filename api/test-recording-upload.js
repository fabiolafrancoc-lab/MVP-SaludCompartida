/**
 * ENDPOINT DE TESTING: Subir Grabación de Audio
 * 
 * Uso:
 * POST /api/test-recording-upload
 * 
 * Body (form-data):
 * - audioFile: archivo de audio (.mp3, .m4a, .opus, .wav)
 * - userId: teléfono del usuario (ej: "+525512345678")
 * - agentId: ID del agente (ej: "agent_001")
 * - duration: duración en segundos (opcional)
 * - tags: array de tags (opcional)
 * 
 * Este endpoint:
 * 1. Sube el audio a Vercel Blob Storage
 * 2. Guarda metadata en Supabase
 * 3. Inicia transcripción automática (Whisper)
 * 4. Inicia análisis automático (GPT-4)
 */

import { put } from '@vercel/blob';
import { createClient } from '@supabase/supabase-js';
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

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    console.log('📤 Starting recording upload...');
    console.log('Content-Type:', req.headers['content-type']);
    
    // Por ahora, aceptar datos en JSON simple para testing
    // En producción, usarías multipart/form-data con formidable o multer
    const { 
      audioBase64,  // Audio en base64
      userId, 
      agentId, 
      duration,
      tags = [],
      filename = 'recording.opus'
    } = req.body;

    // Validaciones
    if (!audioBase64) {
      return res.status(400).json({ 
        error: 'Missing audioBase64',
        help: 'Send audio file as base64 encoded string'
      });
    }
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId (phone number)' });
    }
    if (!agentId) {
      return res.status(400).json({ error: 'Missing agentId' });
    }

    console.log('✅ Validation passed');
    console.log('User:', userId, 'Agent:', agentId);

    // Convertir base64 a Buffer
    const audioBuffer = Buffer.from(audioBase64, 'base64');
    console.log('📦 Audio size:', audioBuffer.length, 'bytes');

    // Generar nombre único para el archivo
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const blobFileName = `recordings/${userId}/${timestamp}_${agentId}_${filename}`;
    
    console.log('📁 Uploading to Blob:', blobFileName);

    // Subir a Vercel Blob Storage
    const blob = await put(blobFileName, audioBuffer, {
      access: 'private', // Solo accesible con token
      addRandomSuffix: false,
      contentType: 'audio/opus' // Ajustar según el formato
    });

    console.log('✅ Blob uploaded:', blob.url);

    // Guardar metadata en Supabase
    const supabase = getSupabaseClient();
    const recordingData = {
      user_id: userId,
      agent_id: agentId,
      recording_url: blob.url,
      duration_seconds: duration || null,
      recording_date: new Date().toISOString(),
      call_type: 'outbound',
      tags: tags,
      transcription_status: 'pending',
      analysis_status: 'pending'
    };

    const { data: recording, error: dbError } = await supabase
      .from('call_recordings')
      .insert(recordingData)
      .select()
      .single();

    if (dbError) {
      console.error('❌ Database error:', dbError);
      throw dbError;
    }

    console.log('✅ Recording saved to database:', recording.id);

    // Responder inmediatamente (transcripción será en background)
    res.status(200).json({
      success: true,
      message: 'Recording uploaded successfully. Transcription and analysis in progress.',
      recording: {
        id: recording.id,
        blobUrl: blob.url,
        status: {
          transcription: 'pending',
          analysis: 'pending'
        }
      },
      next: `Check status at: /api/get-recording-status?id=${recording.id}`
    });

    // Iniciar transcripción en background (no esperar)
    transcribeAndAnalyze(recording.id, blob.url, audioBuffer)
      .catch(err => {
        console.error('❌ Background processing error:', err);
      });

  } catch (error) {
    console.error('❌ Error in upload handler:', error);
    return res.status(500).json({ 
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

/**
 * Procesa transcripción y análisis en background
 */
async function transcribeAndAnalyze(recordingId, blobUrl, audioBuffer) {
  const supabase = getSupabaseClient();

  try {
    console.log('🎙️ Starting transcription for:', recordingId);

    // Actualizar status a "processing"
    await supabase
      .from('call_recordings')
      .update({ transcription_status: 'processing' })
      .eq('id', recordingId);

    // Crear File object para Whisper
    const audioFile = new File([audioBuffer], 'recording.opus', { 
      type: 'audio/opus' 
    });

    // Transcribir con Whisper
    console.log('🔊 Calling Whisper API...');
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'es',
      response_format: 'verbose_json',
      timestamp_granularities: ['segment']
    });

    console.log('✅ Transcription completed:', transcription.text.substring(0, 100));

    // Guardar transcripción
    await supabase
      .from('call_recordings')
      .update({
        transcription_text: transcription.text,
        transcription_segments: transcription.segments || [],
        transcription_duration: transcription.duration,
        transcription_status: 'completed',
        transcribed_at: new Date().toISOString(),
        analysis_status: 'processing' // Iniciar análisis
      })
      .eq('id', recordingId);

    // Analizar con GPT-4
    console.log('🔍 Starting analysis...');
    await analyzeTranscription(recordingId, transcription.text);

    console.log('✅ Full pipeline completed for:', recordingId);

  } catch (error) {
    console.error('❌ Error in background processing:', error);

    // Actualizar status a "failed"
    await supabase
      .from('call_recordings')
      .update({
        transcription_status: 'failed',
        transcription_error: error.message,
        analysis_status: 'failed'
      })
      .eq('id', recordingId);
  }
}

/**
 * Analiza transcripción con GPT-4
 */
async function analyzeTranscription(recordingId, transcriptionText) {
  const supabase = getSupabaseClient();

  try {
    const analysisPrompt = `
Eres un experto en análisis de conversaciones telefónicas para servicios de salud dirigidos a migrantes latinos.

Analiza la siguiente transcripción y extrae:

1. **Técnicas del agente** (escucha_activa, validacion_emocional, preguntas_abiertas, empatia, etc.)
2. **Tono emocional del usuario** (ansioso, confiado, triste, agradecido, neutral, etc.)
3. **Outcome de la llamada** (usuario_comprometido, neutral, resistente, crisis_resuelta, etc.)
4. **Momentos clave** (puntos de inflexión en la conversación)
5. **Frases poderosas** que generaron rapport
6. **Áreas de mejora** para el agente
7. **Categoría** (medication_reminder, crisis_support, routine_checkin, retention_call, onboarding, etc.)
8. **Rating de calidad** (1-5, donde 5 es excelente)

Transcripción:
${transcriptionText}

Responde SOLO con JSON válido (sin markdown):
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
      temperature: 0.3
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

  } catch (error) {
    console.error('❌ Error in analysis:', error);
    
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
