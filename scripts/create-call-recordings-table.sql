-- ============================================================================
-- TABLA: call_recordings
-- Propósito: Almacenar metadata de grabaciones de llamadas telefónicas
-- Uso dual: Training de modelos + Measurement de técnicas
-- ============================================================================

CREATE TABLE IF NOT EXISTS call_recordings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relaciones
  user_id TEXT NOT NULL REFERENCES ai_companions(user_phone),
  agent_id TEXT NOT NULL, -- ID del agente humano que hizo la llamada
  
  -- URLs y archivos
  recording_url TEXT NOT NULL, -- URL en Vercel Blob Storage o Cloudflare R2
  
  -- Información básica
  duration_seconds INTEGER,
  recording_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Metadata de la llamada
  call_type TEXT CHECK (call_type IN ('outbound', 'inbound', 'callback', 'escalated')),
  call_outcome TEXT, -- completed, dropped, transferred, escalated, voicemail
  
  -- Etiquetado para búsqueda
  tags TEXT[] DEFAULT '{}', -- ['retention', 'crisis', 'medication_reminder', 'welcome_call']
  emotional_tone TEXT, -- happy, sad, anxious, angry, neutral, mixed
  
  -- Para training
  is_training_example BOOLEAN DEFAULT FALSE,
  quality_rating INTEGER CHECK (quality_rating BETWEEN 1 AND 5),
  
  -- ============================================================================
  -- TRANSCRIPCIÓN (Whisper API)
  -- ============================================================================
  transcription_status TEXT DEFAULT 'pending' CHECK (transcription_status IN ('pending', 'processing', 'completed', 'failed')),
  transcription_text TEXT, -- Texto completo transcrito
  transcription_segments JSONB, -- Segments con timestamps de Whisper
  transcription_duration FLOAT, -- Duración según Whisper
  transcription_error TEXT,
  transcribed_at TIMESTAMPTZ,
  
  -- ============================================================================
  -- ANÁLISIS (GPT-4)
  -- ============================================================================
  analysis_status TEXT DEFAULT 'pending' CHECK (analysis_status IN ('pending', 'processing', 'completed', 'failed')),
  
  -- Técnicas del agente identificadas
  analysis_techniques TEXT[], -- ['escucha_activa', 'validacion_emocional', 'preguntas_abiertas']
  
  -- Tono emocional del usuario (más detallado que emotional_tone inicial)
  analysis_emotional_tone TEXT,
  
  -- Outcome analizado
  analysis_outcome TEXT, -- 'usuario_comprometido', 'neutral', 'resistente', 'crisis_resuelta'
  
  -- Momentos clave de la conversación
  analysis_key_moments TEXT[], -- ["Minuto 2: Usuario menciona miedo", "Minuto 5: Breakthrough emocional"]
  
  -- Frases poderosas que generaron rapport
  analysis_power_phrases TEXT[], -- ["Entiendo perfectamente cómo te sientes", "No estás solo en esto"]
  
  -- Áreas de mejora
  analysis_improvement_areas TEXT[], -- ["Interrumpió al usuario 3 veces", "Podría haber validado más"]
  
  -- Categoría de la llamada
  analysis_category TEXT, -- medication_reminder, crisis_support, routine_checkin, retention_call, onboarding
  
  -- Rating de calidad (puede diferir del manual)
  analysis_quality_rating INTEGER CHECK (analysis_quality_rating BETWEEN 1 AND 5),
  
  analysis_error TEXT,
  analyzed_at TIMESTAMPTZ,
  
  -- Índices para búsqueda rápida
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES ai_companions(user_phone) ON DELETE CASCADE
);

-- ============================================================================
-- ÍNDICES para búsquedas comunes
-- ============================================================================

-- Búsqueda por agente (ver performance de un agente específico)
CREATE INDEX idx_recordings_agent ON call_recordings(agent_id);

-- Búsqueda por usuario (ver historial de llamadas de un usuario)
CREATE INDEX idx_recordings_user ON call_recordings(user_id);

-- Búsqueda por fecha (reportes mensuales)
CREATE INDEX idx_recordings_date ON call_recordings(recording_date DESC);

-- Búsqueda por calidad (mejores ejemplos para training)
CREATE INDEX idx_recordings_quality ON call_recordings(analysis_quality_rating DESC) WHERE analysis_quality_rating >= 4;

-- Búsqueda por categoría (ejemplos de crisis, retention, etc.)
CREATE INDEX idx_recordings_category ON call_recordings(analysis_category);

-- Búsqueda por tags (buscar por múltiples tags)
CREATE INDEX idx_recordings_tags ON call_recordings USING GIN(tags);

-- Búsqueda de ejemplos de training
CREATE INDEX idx_recordings_training ON call_recordings(is_training_example) WHERE is_training_example = TRUE;

-- ============================================================================
-- POLÍTICAS RLS (Row Level Security)
-- ============================================================================

ALTER TABLE call_recordings ENABLE ROW LEVEL SECURITY;

-- Los agentes solo ven sus propias grabaciones (privacidad)
CREATE POLICY "Agents can view own recordings" ON call_recordings
  FOR SELECT
  USING (agent_id = current_setting('app.current_agent_id', true));

-- Admins ven todo
CREATE POLICY "Admins can view all recordings" ON call_recordings
  FOR ALL
  USING (current_setting('app.user_role', true) = 'admin');

-- Service role bypass (para API)
CREATE POLICY "Service role bypass" ON call_recordings
  FOR ALL
  USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

-- ============================================================================
-- VISTAS ÚTILES
-- ============================================================================

-- Vista: Mejores llamadas para training
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

-- Vista: Performance por agente
CREATE OR REPLACE VIEW agent_performance AS
SELECT 
  agent_id,
  COUNT(*) as total_calls,
  ROUND(AVG(duration_seconds)) as avg_duration_seconds,
  ROUND(AVG(analysis_quality_rating), 2) as avg_quality,
  COUNT(*) FILTER (WHERE analysis_outcome LIKE '%comprometido%') as successful_outcomes,
  COUNT(*) FILTER (WHERE analysis_quality_rating >= 4) as high_quality_calls,
  ARRAY_AGG(DISTINCT unnest(analysis_techniques)) as techniques_used
FROM call_recordings
WHERE analysis_status = 'completed'
GROUP BY agent_id
ORDER BY avg_quality DESC;

-- Vista: Técnicas más efectivas
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
HAVING COUNT(*) >= 5 -- Al menos 5 usos
ORDER BY avg_quality DESC, usage_count DESC;

-- ============================================================================
-- FUNCIÓN: Auto-update updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_recordings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_recordings_timestamp
  BEFORE UPDATE ON call_recordings
  FOR EACH ROW
  EXECUTE FUNCTION update_recordings_updated_at();

-- ============================================================================
-- COMENTARIOS PARA DOCUMENTACIÓN
-- ============================================================================

COMMENT ON TABLE call_recordings IS 'Metadata de grabaciones de llamadas telefónicas. Propósito dual: training de modelos AI y measurement de técnicas de agentes.';
COMMENT ON COLUMN call_recordings.is_training_example IS 'TRUE si esta grabación debe usarse para fine-tuning de modelos';
COMMENT ON COLUMN call_recordings.analysis_techniques IS 'Técnicas del agente identificadas por GPT-4: escucha_activa, validacion_emocional, etc.';
COMMENT ON COLUMN call_recordings.analysis_power_phrases IS 'Frases específicas que generaron rapport o breakthrough emocional';
COMMENT ON VIEW best_training_calls IS 'Mejores llamadas (rating >= 4) marcadas como ejemplos de training';
COMMENT ON VIEW agent_performance IS 'KPIs agregados por agente: avg_quality, successful_outcomes, techniques_used';
COMMENT ON VIEW most_effective_techniques IS 'Técnicas más efectivas basadas en quality_rating y successful_outcomes';
