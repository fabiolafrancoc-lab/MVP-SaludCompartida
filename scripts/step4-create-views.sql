-- ============================================================================
-- PARTE 4: Vistas (ejecutar DESPUÉS de step3)
-- ============================================================================

CREATE OR REPLACE VIEW best_training_calls AS
SELECT 
  id,
  agent_id,
  recording_date,
  duration_seconds,
  analysis_category,
  analysis_quality_rating,
  analysis_techniques,
  analysis_power_phrases,
  recording_url
FROM call_recordings
WHERE 
  analysis_status = 'completed'
  AND analysis_quality_rating >= 4
  AND is_training_example = TRUE
ORDER BY analysis_quality_rating DESC, recording_date DESC;

CREATE OR REPLACE VIEW agent_performance AS
SELECT 
  agent_id,
  COUNT(*) as total_calls,
  ROUND(AVG(duration_seconds)) as avg_duration_seconds,
  ROUND(AVG(analysis_quality_rating), 2) as avg_quality,
  COUNT(*) FILTER (WHERE analysis_outcome LIKE '%comprometido%') as successful_outcomes,
  COUNT(*) FILTER (WHERE analysis_quality_rating >= 4) as high_quality_calls
FROM call_recordings
WHERE analysis_status = 'completed'
GROUP BY agent_id
ORDER BY avg_quality DESC;

CREATE OR REPLACE VIEW most_effective_techniques AS
SELECT 
  technique,
  COUNT(*) as usage_count,
  ROUND(AVG(analysis_quality_rating), 2) as avg_quality,
  ROUND(AVG(duration_seconds)) as avg_duration,
  COUNT(*) FILTER (WHERE analysis_outcome LIKE '%comprometido%') as successful_outcomes
FROM call_recordings,
LATERAL unnest(analysis_techniques) as technique
WHERE analysis_status = 'completed'
GROUP BY technique
HAVING COUNT(*) >= 5
ORDER BY avg_quality DESC, usage_count DESC;

-- Verificar
SELECT 'Vistas creadas correctamente' as status;
