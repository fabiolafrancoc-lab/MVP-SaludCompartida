-- ============================================================================
-- LANGCHAIN INTEGRATION
-- ============================================================================

-- Función requerida por LangChain para búsqueda semántica
-- Esta función busca las llamadas más similares usando embeddings
CREATE OR REPLACE FUNCTION match_call_recordings(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  transcription text,
  analysis_techniques text[],
  analysis_power_phrases text[],
  analysis_quality_score decimal,
  analysis_emotional_tone text,
  user_phone text,
  created_at timestamptz,
  similarity float,
  metadata jsonb
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    cr.id,
    cr.transcription,
    cr.analysis_techniques,
    cr.analysis_power_phrases,
    cr.analysis_quality_score,
    cr.analysis_emotional_tone,
    cr.user_phone,
    cr.created_at,
    1 - (cr.transcription_embedding <=> query_embedding) as similarity,
    jsonb_build_object(
      'duration', cr.duration,
      'quality_score', cr.analysis_quality_score,
      'techniques', cr.analysis_techniques,
      'phrases', cr.analysis_power_phrases
    ) as metadata
  FROM call_recordings cr
  WHERE 
    cr.transcription_embedding IS NOT NULL
    AND 1 - (cr.transcription_embedding <=> query_embedding) > match_threshold
  ORDER BY cr.transcription_embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Índice para optimizar búsqueda
CREATE INDEX IF NOT EXISTS idx_call_recordings_embedding 
ON call_recordings USING ivfflat (transcription_embedding vector_cosine_ops)
WITH (lists = 100);

-- ============================================================================
-- TABLA: Scheduled Calls (para schedule_follow_up tool)
-- ============================================================================

CREATE TABLE IF NOT EXISTS scheduled_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_phone TEXT NOT NULL,
  scheduled_for TIMESTAMPTZ NOT NULL,
  urgency TEXT NOT NULL CHECK (urgency IN ('low', 'medium', 'high', 'critical')),
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'missed', 'rescheduled', 'cancelled')),
  
  -- Metadata
  created_by TEXT DEFAULT 'lupita_agent',
  completed_at TIMESTAMPTZ,
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_scheduled_calls_phone 
ON scheduled_calls(user_phone);

CREATE INDEX IF NOT EXISTS idx_scheduled_calls_date 
ON scheduled_calls(scheduled_for) 
WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_scheduled_calls_urgency 
ON scheduled_calls(urgency, scheduled_for) 
WHERE status = 'pending';

-- Trigger para updated_at
CREATE TRIGGER update_scheduled_calls_updated_at
  BEFORE UPDATE ON scheduled_calls
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VISTA: Today's Call Queue (llamadas programadas para hoy)
-- ============================================================================

CREATE OR REPLACE VIEW todays_call_queue AS
SELECT 
  sc.id,
  sc.user_phone,
  sc.scheduled_for,
  sc.urgency,
  sc.reason,
  ucp.preferred_name as user_name,
  ucp.age_range,
  ucp.region,
  CASE sc.urgency
    WHEN 'critical' THEN 1
    WHEN 'high' THEN 2
    WHEN 'medium' THEN 3
    WHEN 'low' THEN 4
  END as urgency_rank
FROM scheduled_calls sc
LEFT JOIN user_conversation_profiles ucp ON ucp.phone_number = sc.user_phone
WHERE 
  sc.status = 'pending'
  AND DATE(sc.scheduled_for) = CURRENT_DATE
ORDER BY urgency_rank, sc.scheduled_for;

-- ============================================================================
-- FUNCIÓN: Get Agent Performance Metrics
-- ============================================================================

CREATE OR REPLACE FUNCTION get_agent_performance()
RETURNS TABLE (
  metric_name TEXT,
  metric_value NUMERIC,
  period TEXT
) AS $$
BEGIN
  RETURN QUERY
  
  -- Total de llamadas procesadas
  SELECT 
    'Total Calls Processed'::TEXT,
    COUNT(*)::NUMERIC,
    'last_30_days'::TEXT
  FROM call_recordings
  WHERE created_at > NOW() - INTERVAL '30 days'
  
  UNION ALL
  
  -- Promedio de calidad
  SELECT 
    'Average Quality Score'::TEXT,
    AVG(analysis_quality_score)::NUMERIC,
    'last_30_days'::TEXT
  FROM call_recordings
  WHERE 
    created_at > NOW() - INTERVAL '30 days'
    AND analysis_quality_score IS NOT NULL
  
  UNION ALL
  
  -- Tasa de escalación
  SELECT 
    'Escalation Rate (%)'::TEXT,
    (COUNT(CASE WHEN status = 'pending' THEN 1 END)::NUMERIC / 
     NULLIF(COUNT(*)::NUMERIC, 0) * 100),
    'current'::TEXT
  FROM escalations
  WHERE created_at > NOW() - INTERVAL '30 days'
  
  UNION ALL
  
  -- Usuarios de alto riesgo
  SELECT 
    'High Risk Users'::TEXT,
    COUNT(DISTINCT phone_number)::NUMERIC,
    'current'::TEXT
  FROM user_conversation_profiles
  WHERE 
    is_active = TRUE
    AND (
      age_range = '60+' 
      OR region ILIKE '%guadalajara%'
      OR days_since_last_call > 14
    )
  
  UNION ALL
  
  -- Llamadas programadas pendientes
  SELECT 
    'Pending Scheduled Calls'::TEXT,
    COUNT(*)::NUMERIC,
    'current'::TEXT
  FROM scheduled_calls
  WHERE status = 'pending';
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- FUNCIÓN: Get Similar Users (para transfer learning)
-- ============================================================================

CREATE OR REPLACE FUNCTION get_similar_users(
  target_phone TEXT,
  similarity_threshold FLOAT DEFAULT 0.7,
  limit_count INT DEFAULT 10
)
RETURNS TABLE (
  phone_number TEXT,
  similarity_score FLOAT,
  age_range TEXT,
  region TEXT,
  avg_quality DECIMAL,
  total_calls INTEGER
) AS $$
BEGIN
  RETURN QUERY
  WITH target AS (
    SELECT 
      age_range,
      region,
      migrant_location,
      gender
    FROM user_conversation_profiles
    WHERE phone_number = target_phone
  )
  SELECT 
    ucp.phone_number,
    (
      CASE WHEN ucp.age_range = target.age_range THEN 0.3 ELSE 0 END +
      CASE WHEN ucp.region = target.region THEN 0.3 ELSE 0 END +
      CASE WHEN ucp.migrant_location = target.migrant_location THEN 0.2 ELSE 0 END +
      CASE WHEN ucp.gender = target.gender THEN 0.2 ELSE 0 END
    ) as similarity_score,
    ucp.age_range,
    ucp.region,
    ucp.avg_call_quality,
    ucp.total_calls
  FROM user_conversation_profiles ucp, target
  WHERE 
    ucp.phone_number != target_phone
    AND ucp.is_active = TRUE
    AND (
      CASE WHEN ucp.age_range = target.age_range THEN 0.3 ELSE 0 END +
      CASE WHEN ucp.region = target.region THEN 0.3 ELSE 0 END +
      CASE WHEN ucp.migrant_location = target.migrant_location THEN 0.2 ELSE 0 END +
      CASE WHEN ucp.gender = target.gender THEN 0.2 ELSE 0 END
    ) >= similarity_threshold
  ORDER BY similarity_score DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- COMENTARIOS
-- ============================================================================

COMMENT ON FUNCTION match_call_recordings IS 
'Función requerida por LangChain para búsqueda semántica. Encuentra las llamadas más similares usando embeddings de OpenAI.';

COMMENT ON TABLE scheduled_calls IS 
'Llamadas programadas por el agente AI. Usada por el tool schedule_follow_up de LupitaAgent.';

COMMENT ON VIEW todays_call_queue IS 
'Vista de las llamadas programadas para hoy, ordenadas por urgencia.';

COMMENT ON FUNCTION get_agent_performance IS 
'Métricas de rendimiento del agente AI para monitoreo y optimización.';

COMMENT ON FUNCTION get_similar_users IS 
'Encuentra usuarios similares para transfer learning. Útil para aplicar estrategias que funcionaron con usuarios parecidos.';
