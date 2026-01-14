-- ============================================================================
-- VERIFICACIÓN: Ver la grabación procesada en Supabase
-- ============================================================================

-- 1. Ver todos los datos de la grabación
SELECT 
  id,
  user_id,
  agent_id,
  recording_date,
  duration,
  recording_url,
  transcription_status,
  analysis_status,
  transcription_text,
  transcription_duration,
  analysis_techniques,
  analysis_power_phrases,
  analysis_quality_rating,
  analysis_emotional_tone,
  analysis_recommendations,
  transcribed_at,
  analyzed_at,
  created_at
FROM call_recordings
WHERE id = '2936647b-9ceb-483f-a5d8-424937809f43';

-- 2. Ver solo la transcripción
SELECT 
  transcription_text,
  transcription_duration,
  transcription_status,
  transcribed_at
FROM call_recordings
WHERE id = '2936647b-9ceb-483f-a5d8-424937809f43';

-- 3. Ver solo el análisis
SELECT 
  analysis_techniques,
  analysis_power_phrases,
  analysis_quality_rating,
  analysis_emotional_tone,
  analysis_recommendations,
  analysis_status,
  analyzed_at
FROM call_recordings
WHERE id = '2936647b-9ceb-483f-a5d8-424937809f43';

-- 4. Ver todas las grabaciones (resumen)
SELECT 
  id,
  agent_id,
  recording_date,
  duration,
  transcription_status,
  analysis_status,
  analysis_quality_rating,
  LEFT(transcription_text, 50) as transcription_preview
FROM call_recordings
ORDER BY created_at DESC;

-- 5. Verificar contadores
SELECT 
  COUNT(*) as total_recordings,
  COUNT(*) FILTER (WHERE transcription_status = 'completed') as transcribed,
  COUNT(*) FILTER (WHERE analysis_status = 'completed') as analyzed,
  COUNT(*) FILTER (WHERE transcription_status = 'processing') as processing,
  COUNT(*) FILTER (WHERE transcription_status = 'failed') as failed
FROM call_recordings;

-- 6. Ver en la vista de mejores llamadas (si calidad >= 4)
SELECT * FROM best_training_calls;

-- 7. Ver performance del agente
SELECT * FROM agent_performance 
WHERE agent_id = 'agent_test_001';

-- 8. Ver técnicas más efectivas
SELECT * FROM most_effective_techniques;
