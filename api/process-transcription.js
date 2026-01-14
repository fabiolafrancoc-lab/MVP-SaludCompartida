/**
 * ENDPOINT: Procesar Transcripción Manualmente
 * 
 * Uso: POST /api/process-transcription
 * Body: { recordingId: "uuid" }
 * 
 * Este endpoint procesa manualmente una grabación pendiente
 */

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

function getSupabaseClient() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { recordingId } = req.body;

    if (!recordingId) {
      return res.status(400).json({ error: 'Missing recordingId' });
    }

    console.log('🔄 Processing transcription for:', recordingId);

    const supabase = getSupabaseClient();

    // Obtener la grabación
    const { data: recording, error: fetchError } = await supabase
      .from('call_recordings')
      .select('*')
      .eq('id', recordingId)
      .single();

    if (fetchError || !recording) {
      return res.status(404).json({ error: 'Recording not found' });
    }

    if (!recording.recording_url) {
      return res.status(400).json({ error: 'No recording URL found' });
    }

    console.log('📥 Downloading audio from:', recording.recording_url);

    // Descargar el audio desde Blob
    const audioResponse = await fetch(recording.recording_url);
    if (!audioResponse.ok) {
      throw new Error('Failed to download audio from Blob');
    }

    const audioBuffer = Buffer.from(await audioResponse.arrayBuffer());
    console.log('✅ Audio downloaded:', audioBuffer.length, 'bytes');

    // Actualizar status
    await supabase
      .from('call_recordings')
      .update({ transcription_status: 'processing' })
      .eq('id', recordingId);

    // Crear File object para Whisper
    const audioFile = new File([audioBuffer], 'recording.m4a', { 
      type: 'audio/m4a'
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

    console.log('✅ Transcription completed');
    console.log('Text preview:', transcription.text.substring(0, 100));

    // Guardar transcripción
    await supabase
      .from('call_recordings')
      .update({
        transcription_text: transcription.text,
        transcription_segments: transcription.segments || [],
        transcription_duration: transcription.duration,
        transcription_status: 'completed',
        transcribed_at: new Date().toISOString(),
        analysis_status: 'processing'
      })
      .eq('id', recordingId);

    // Analizar con GPT-4
    console.log('🤖 Analyzing with GPT-4...');
    const analysisPrompt = `Analiza esta transcripción de una llamada de un agente de salud en México:

"${transcription.text}"

Extrae:
1. Técnicas de rapport utilizadas (empatía, validación emocional, escucha activa, lenguaje inclusivo)
2. Frases poderosas exactas que generaron conexión
3. Calificación de calidad de 1-5
4. Momentos clave con timestamp

Responde en JSON con esta estructura:
{
  "techniques": ["técnica1", "técnica2"],
  "powerPhrases": ["frase1", "frase2"],
  "qualityRating": 4,
  "keyMoments": [{"timestamp": "00:30", "description": "momento importante"}],
  "emotionalTone": "empático/neutral/distante",
  "recommendations": ["recomendación1"]
}`;

    const analysisResponse = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: 'Eres un experto en análisis de comunicación en salud comunitaria.' },
        { role: 'user', content: analysisPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3
    });

    const analysis = JSON.parse(analysisResponse.choices[0].message.content);
    console.log('✅ Analysis completed');

    // Guardar análisis
    await supabase
      .from('call_recordings')
      .update({
        analysis_techniques: analysis.techniques || [],
        analysis_power_phrases: analysis.powerPhrases || [],
        analysis_quality_rating: analysis.qualityRating || null,
        analysis_key_moments: analysis.keyMoments || [],
        analysis_emotional_tone: analysis.emotionalTone || null,
        analysis_recommendations: analysis.recommendations || [],
        analysis_status: 'completed',
        analyzed_at: new Date().toISOString()
      })
      .eq('id', recordingId);

    return res.status(200).json({
      success: true,
      recordingId,
      transcription: {
        text: transcription.text,
        duration: transcription.duration
      },
      analysis: analysis
    });

  } catch (error) {
    console.error('❌ Error processing transcription:', error);
    
    // Marcar como fallido en DB
    if (req.body.recordingId) {
      const supabase = getSupabaseClient();
      await supabase
        .from('call_recordings')
        .update({ 
          transcription_status: 'failed',
          analysis_status: 'failed'
        })
        .eq('id', req.body.recordingId);
    }

    return res.status(500).json({
      error: 'Processing failed',
      message: error.message
    });
  }
}
