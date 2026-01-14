-- ============================================================================
-- PARTE 7: Sistema de Aprendizaje Colectivo del Ecosistema
-- ============================================================================

-- EXTENSIÓN: pgvector para búsqueda semántica
CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Agregar embeddings a call_recordings
ALTER TABLE call_recordings 
ADD COLUMN IF NOT EXISTS transcription_embedding vector(1536);

-- Índice para búsqueda rápida de similitud
CREATE INDEX IF NOT EXISTS idx_call_recordings_embedding 
ON call_recordings 
USING ivfflat (transcription_embedding vector_cosine_ops)
WITH (lists = 100);

-- ============================================================================
-- 2. TABLA: Knowledge Base (Conocimiento Colectivo)
-- ============================================================================

CREATE TABLE IF NOT EXISTS collective_knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Tipo de conocimiento
  knowledge_type TEXT NOT NULL CHECK (knowledge_type IN (
    'power_phrase',      -- Frase poderosa
    'technique',         -- Técnica efectiva
    'pattern',           -- Patrón de éxito/fracaso
    'opening',           -- Apertura efectiva
    'closing',           -- Cierre efectivo
    'objection_handler', -- Manejo de objeciones
    'emotional_response',-- Respuesta emocional
    'churn_predictor',   -- Señal de riesgo de cancelación
    'engagement_driver'  -- Factor de engagement
  )),
  
  -- Contenido
  content TEXT NOT NULL,
  category TEXT, -- "salud", "económico", "emocional", "general"
  context TEXT,  -- Cuándo usar: "usuario preocupado", "primera llamada", etc
  
  -- Outcome (positivo o negativo)
  outcome_type TEXT CHECK (outcome_type IN (
    'retention',      -- Contribuye a retención
    'cancellation',   -- Predictor de cancelación
    'referral',       -- Genera referidos
    'upgrade',        -- Usuario mejora plan
    'engagement',     -- Aumenta uso/interacción
    'complaint',      -- Genera queja
    'no_response',    -- Usuario no responde
    'payment_issue'   -- Problema de pago
  )),
  
  -- Métricas de efectividad
  times_used INTEGER DEFAULT 0,
  times_successful INTEGER DEFAULT 0,
  success_rate FLOAT GENERATED ALWAYS AS (
    CASE WHEN times_used > 0 
    THEN (times_successful::FLOAT / times_used::FLOAT) * 100
    ELSE 0 END
  ) STORED,
  
  avg_quality_rating FLOAT, -- Rating promedio cuando se usa
  confidence_score FLOAT,    -- Qué tan confiable es este conocimiento (0-1)
  
  -- 🎯 SEGMENTACIÓN DEMOGRÁFICA
  age_range TEXT,            -- '18-25', '26-35', '36-45', '46-60', '60+'
  gender TEXT,               -- 'femenino', 'masculino', 'otro', 'no especificado'
  marital_status TEXT,       -- 'casado', 'soltero', 'viudo', etc.
  has_dependents BOOLEAN,    -- Tiene dependientes o no
  
  -- 🌎 SEGMENTACIÓN GEOGRÁFICA
  user_region TEXT,          -- Ciudad/Estado en México (e.g., 'Guadalajara', 'CDMX')
  migrant_location TEXT,     -- Ubicación del migrante (e.g., 'Texas, USA', 'Toronto, Canada')
  migrant_country TEXT,      -- País del migrante ('USA', 'Canada', etc.)
  timezone_difference TEXT,  -- Diferencia horaria con migrante
  
  -- 💰 SEGMENTACIÓN ECONÓMICA
  income_level TEXT,         -- 'bajo', 'medio', 'alto'
  price_sensitivity TEXT,    -- 'alta', 'media', 'baja'
  payment_method TEXT,       -- 'tarjeta', 'oxxo', 'transferencia'
  
  -- 🏥 SEGMENTACIÓN MÉDICA
  health_conditions TEXT[],  -- ['diabetes', 'hipertension', 'ninguna']
  usage_frequency TEXT,      -- 'alta', 'media', 'baja'
  
  -- ⏰ SEGMENTACIÓN TEMPORAL
  best_day_of_week TEXT,     -- 'lunes', 'martes', etc.
  best_time_of_day TEXT,     -- 'mañana', 'tarde', 'noche'
  seasonality TEXT,          -- 'enero-marzo', 'abril-junio', etc.
  
  -- 🗣️ SEGMENTACIÓN COMUNICACIONAL
  emotional_tone TEXT[],     -- ['preocupado', 'feliz', 'confundido']
  communication_style TEXT,  -- 'formal', 'informal', 'directo'
  language_preference TEXT,  -- 'español_mx', 'español_formal', 'spanglish'
  
  -- 🚨 CLASIFICACIÓN DE PATRÓN
  is_sticky_feature BOOLEAN DEFAULT FALSE,  -- Patrón validado POSITIVO (aplicar siempre)
  is_warning_signal BOOLEAN DEFAULT FALSE,  -- Patrón NEGATIVO (alerta de riesgo)
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high', 'critical')), -- Nivel de riesgo si es warning
  
  -- Evidencia
  source_call_ids UUID[],    -- IDs de llamadas donde se observó
  sample_transcripts TEXT[], -- Ejemplos de uso
  
  -- Metadata
  discovered_at TIMESTAMPTZ DEFAULT NOW(),
  last_validated TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_knowledge_type ON collective_knowledge_base(knowledge_type);
CREATE INDEX idx_knowledge_category ON collective_knowledge_base(category);
CREATE INDEX idx_knowledge_success ON collective_knowledge_base(success_rate DESC);
CREATE INDEX idx_knowledge_active ON collective_knowledge_base(is_active) WHERE is_active = TRUE;

-- ============================================================================
-- 3. TABLA: Patrones Emergentes (Lo que el sistema está aprendiendo AHORA)
-- ============================================================================

CREATE TABLE IF NOT EXISTS emerging_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  pattern_type TEXT NOT NULL,
  pattern_description TEXT NOT NULL,
  
  -- Observaciones
  observation_count INTEGER DEFAULT 1,
  first_observed TIMESTAMPTZ DEFAULT NOW(),
  last_observed TIMESTAMPTZ DEFAULT NOW(),
  
  -- Métricas iniciales
  initial_success_rate FLOAT,
  sample_call_ids UUID[],
  
  -- Estado
  status TEXT DEFAULT 'emerging' CHECK (status IN (
    'emerging',     -- Apenas detectado (< 5 observaciones)
    'promising',    -- Parece funcionar (5-10 observaciones)
    'validated',    -- Confirmado (> 10 observaciones consistentes)
    'promoted'      -- Promovido a knowledge_base
  )),
  
  promoted_to_kb_id UUID REFERENCES collective_knowledge_base(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_emerging_status ON emerging_patterns(status);
CREATE INDEX idx_emerging_observed ON emerging_patterns(last_observed DESC);

-- ============================================================================
-- 4. FUNCIONES: Búsqueda Semántica
-- ============================================================================

-- Función: Buscar llamadas similares
CREATE OR REPLACE FUNCTION search_similar_calls(
  query_embedding vector(1536),
  min_quality_rating INTEGER DEFAULT 3,
  similarity_threshold FLOAT DEFAULT 0.7,
  result_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  user_id TEXT,
  agent_id TEXT,
  transcription_text TEXT,
  analysis_techniques TEXT[],
  analysis_power_phrases TEXT[],
  analysis_quality_rating INTEGER,
  similarity_score FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cr.id,
    cr.user_id,
    cr.agent_id,
    cr.transcription_text,
    cr.analysis_techniques,
    cr.analysis_power_phrases,
    cr.analysis_quality_rating,
    1 - (cr.transcription_embedding <=> query_embedding) AS similarity_score
  FROM call_recordings cr
  WHERE cr.transcription_embedding IS NOT NULL
    AND cr.analysis_quality_rating >= min_quality_rating
    AND cr.transcription_status = 'completed'
    AND cr.analysis_status = 'completed'
    AND 1 - (cr.transcription_embedding <=> query_embedding) >= similarity_threshold
  ORDER BY cr.transcription_embedding <=> query_embedding
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 5. FUNCIONES: Análisis de Patrones
-- ============================================================================

-- Función: Obtener técnicas más efectivas
CREATE OR REPLACE FUNCTION get_most_effective_techniques(
  min_usage_count INTEGER DEFAULT 5
)
RETURNS TABLE (
  technique TEXT,
  usage_count BIGINT,
  avg_rating FLOAT,
  success_rate FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    unnest(analysis_techniques) AS technique,
    COUNT(*) AS usage_count,
    AVG(analysis_quality_rating::FLOAT) AS avg_rating,
    (COUNT(*) FILTER (WHERE analysis_quality_rating >= 4)::FLOAT / 
     COUNT(*)::FLOAT * 100) AS success_rate
  FROM call_recordings
  WHERE analysis_status = 'completed'
    AND analysis_techniques IS NOT NULL
    AND array_length(analysis_techniques, 1) > 0
  GROUP BY technique
  HAVING COUNT(*) >= min_usage_count
  ORDER BY avg_rating DESC, usage_count DESC;
END;
$$ LANGUAGE plpgsql;

-- Función: Obtener frases poderosas más efectivas
CREATE OR REPLACE FUNCTION get_most_powerful_phrases(
  min_usage_count INTEGER DEFAULT 3
)
RETURNS TABLE (
  phrase TEXT,
  usage_count BIGINT,
  avg_rating FLOAT,
  contexts TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    unnest(analysis_power_phrases) AS phrase,
    COUNT(*) AS usage_count,
    AVG(analysis_quality_rating::FLOAT) AS avg_rating,
    array_agg(DISTINCT SUBSTRING(transcription_text, 1, 100)) AS contexts
  FROM call_recordings
  WHERE analysis_status = 'completed'
    AND analysis_power_phrases IS NOT NULL
    AND array_length(analysis_power_phrases, 1) > 0
  GROUP BY phrase
  HAVING COUNT(*) >= min_usage_count
  ORDER BY avg_rating DESC, usage_count DESC;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 6. VISTAS: Insights del Ecosistema
-- ============================================================================

-- Vista: Salud del Ecosistema
CREATE OR REPLACE VIEW ecosystem_health AS
SELECT 
  COUNT(DISTINCT user_id) AS total_unique_users,
  COUNT(DISTINCT agent_id) AS total_agents,
  COUNT(*) AS total_calls,
  
  AVG(analysis_quality_rating) AS avg_quality_overall,
  
  COUNT(*) FILTER (WHERE analysis_quality_rating >= 4) AS high_quality_calls,
  (COUNT(*) FILTER (WHERE analysis_quality_rating >= 4)::FLOAT / 
   COUNT(*)::FLOAT * 100) AS high_quality_percentage,
  
  COUNT(DISTINCT unnest(analysis_techniques)) AS unique_techniques_discovered,
  COUNT(DISTINCT unnest(analysis_power_phrases)) AS unique_phrases_discovered,
  
  MIN(recording_date) AS first_call_date,
  MAX(recording_date) AS latest_call_date
FROM call_recordings
WHERE analysis_status = 'completed';

-- Vista: Knowledge Base Activo
CREATE OR REPLACE VIEW active_knowledge AS
SELECT 
  knowledge_type,
  category,
  content,
  context,
  success_rate,
  avg_quality_rating,
  times_used,
  confidence_score
FROM collective_knowledge_base
WHERE is_active = TRUE
ORDER BY success_rate DESC, times_used DESC;

-- ============================================================================
-- 7. FUNCIONES DE ANÁLISIS AUTOMÁTICO (Machine Learning Patterns)
-- ============================================================================

-- Función: Detectar patrones de cancelación por segmento
CREATE OR REPLACE FUNCTION detect_churn_patterns()
RETURNS TABLE (
  pattern_description TEXT,
  user_segment TEXT,
  churn_rate FLOAT,
  sample_size BIGINT,
  confidence FLOAT
) AS $$
BEGIN
  RETURN QUERY
  WITH user_segments AS (
    SELECT 
      r.user_phone,
      r.analysis_emotional_tone,
      r.created_at,
      -- Detectar si eventualmente canceló (esto requeriría tabla de subscriptions)
      -- Por ahora, bajo quality_score es proxy de riesgo
      CASE WHEN r.analysis_quality_score < 3 THEN 1 ELSE 0 END as at_risk
    FROM call_recordings r
    WHERE r.transcription IS NOT NULL
  )
  SELECT 
    'Low quality calls detected' as pattern_description,
    'All users' as user_segment,
    AVG(at_risk) * 100 as churn_rate,
    COUNT(*) as sample_size,
    CASE 
      WHEN COUNT(*) > 50 THEN 0.95
      WHEN COUNT(*) > 20 THEN 0.80
      ELSE 0.60
    END as confidence
  FROM user_segments;
END;
$$ LANGUAGE plpgsql;

-- Función: Encontrar "power hours" (mejores horas para llamar por región)
CREATE OR REPLACE FUNCTION find_power_hours()
RETURNS TABLE (
  hour_of_day INTEGER,
  day_of_week TEXT,
  avg_quality FLOAT,
  call_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    EXTRACT(HOUR FROM created_at)::INTEGER as hour_of_day,
    TO_CHAR(created_at, 'Day') as day_of_week,
    AVG(analysis_quality_score) as avg_quality,
    COUNT(*) as call_count
  FROM call_recordings
  WHERE analysis_quality_score IS NOT NULL
  GROUP BY hour_of_day, day_of_week
  HAVING COUNT(*) >= 5
  ORDER BY avg_quality DESC;
END;
$$ LANGUAGE plpgsql;

-- Función: Identificar frases que predicen outcomes específicos
CREATE OR REPLACE FUNCTION find_predictive_phrases(
  target_outcome TEXT DEFAULT 'cancellation'
)
RETURNS TABLE (
  phrase TEXT,
  outcome_correlation FLOAT,
  times_observed BIGINT
) AS $$
BEGIN
  -- Esta función busca palabras/frases en transcripciones correlacionadas con outcomes
  -- Nota: Requiere análisis de texto más avanzado, aquí un ejemplo simplificado
  RETURN QUERY
  SELECT 
    UNNEST(STRING_TO_ARRAY(LOWER(transcription), ' ')) as phrase,
    AVG(CASE WHEN analysis_quality_score < 3 THEN 1.0 ELSE 0.0 END) as outcome_correlation,
    COUNT(*) as times_observed
  FROM call_recordings
  WHERE transcription IS NOT NULL
  GROUP BY phrase
  HAVING COUNT(*) >= 10
    AND AVG(CASE WHEN analysis_quality_score < 3 THEN 1.0 ELSE 0.0 END) > 0.6
  ORDER BY outcome_correlation DESC, times_observed DESC
  LIMIT 50;
END;
$$ LANGUAGE plpgsql;

-- Función: Análisis de cohortes (comparar grupos de usuarios)
CREATE OR REPLACE FUNCTION cohort_analysis(
  cohort_month TEXT DEFAULT TO_CHAR(NOW(), 'YYYY-MM')
)
RETURNS TABLE (
  cohort TEXT,
  total_users BIGINT,
  avg_calls_per_user FLOAT,
  avg_quality FLOAT,
  engagement_rate FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    TO_CHAR(MIN(created_at), 'YYYY-MM') as cohort,
    COUNT(DISTINCT user_phone) as total_users,
    COUNT(*)::FLOAT / COUNT(DISTINCT user_phone) as avg_calls_per_user,
    AVG(analysis_quality_score) as avg_quality,
    (COUNT(DISTINCT CASE WHEN analysis_quality_score >= 3 THEN user_phone END)::FLOAT / 
     COUNT(DISTINCT user_phone) * 100) as engagement_rate
  FROM call_recordings
  WHERE transcription IS NOT NULL
  GROUP BY TO_CHAR(created_at, 'YYYY-MM')
  ORDER BY cohort DESC;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 8. TRIGGERS
-- ============================================================================

-- Trigger: Actualizar updated_at en knowledge_base
CREATE OR REPLACE FUNCTION update_knowledge_base_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_kb_timestamp ON collective_knowledge_base;

CREATE TRIGGER trigger_update_kb_timestamp
  BEFORE UPDATE ON collective_knowledge_base
  FOR EACH ROW
  EXECUTE FUNCTION update_knowledge_base_timestamp();

-- Trigger similar para emerging_patterns
DROP TRIGGER IF EXISTS trigger_update_patterns_timestamp ON emerging_patterns;

CREATE TRIGGER trigger_update_patterns_timestamp
  BEFORE UPDATE ON emerging_patterns
  FOR EACH ROW
  EXECUTE FUNCTION update_knowledge_base_timestamp();

-- ============================================================================
-- 8. DATOS INICIALES: Semillas de Conocimiento
-- ============================================================================

-- Insertar conocimiento base inicial (mejores prácticas conocidas)
INSERT INTO collective_knowledge_base (knowledge_type, content, category, context, confidence_score) VALUES
  ('power_phrase', '¿Cómo ha estado?', 'general', 'Apertura de llamada', 0.9),
  ('power_phrase', 'Entiendo su preocupación', 'emocional', 'Usuario preocupado', 0.9),
  ('power_phrase', '¿Me puede contar un poco más?', 'general', 'Fomentar apertura', 0.85),
  ('technique', 'validación emocional', 'emocional', 'Usuario expresando emoción', 0.9),
  ('technique', 'escucha activa', 'general', 'Siempre', 0.95),
  ('technique', 'empatía', 'emocional', 'Situación difícil', 0.9),
  ('opening', 'Hola [nombre], ¿cómo ha estado?', 'general', 'Usuario conocido', 0.85),
  ('emotional_response', 'Debe ser muy difícil para usted', 'emocional', 'Usuario compartiendo problema', 0.8)
ON CONFLICT DO NOTHING;

-- Verificar
SELECT 'Sistema de aprendizaje colectivo creado correctamente' AS status;

SELECT 
  'Tablas creadas' AS component,
  COUNT(*) AS count 
FROM information_schema.tables 
WHERE table_name IN ('collective_knowledge_base', 'emerging_patterns');

SELECT 
  'Knowledge base inicial' AS component,
  COUNT(*) AS count 
FROM collective_knowledge_base;
