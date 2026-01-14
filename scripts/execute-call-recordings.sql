-- ============================================================================
-- EJECUTAR EN SUPABASE SQL EDITOR
-- Tabla: call_recordings (Sistema de Grabaciones)
-- ============================================================================

CREATE TABLE IF NOT EXISTS call_recordings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relaciones
  user_id TEXT NOT NULL, -- Phone number del usuario (referencia a ai_companions.user_phone)
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
  
  -- TRANSCRIPCIÓN (Whisper API)
  transcription_status TEXT DEFAULT 'pending' CHECK (transcription_status IN ('pending', 'processing', 'completed', 'failed')),
  transcription_text TEXT,
  transcription_segments JSONB,
  transcription_duration FLOAT,
  transcription_error TEXT,
  transcribed_at TIMESTAMPTZ,
  
  -- ANÁLISIS (GPT-4)
  analysis_status TEXT DEFAULT 'pending' CHECK (analysis_status IN ('pending', 'processing', 'completed', 'failed')),
  analysis_techniques TEXT[],
  analysis_emotional_tone TEXT,
  analysis_outcome TEXT,
  analysis_key_moments TEXT[],
  analysis_power_phrases TEXT[],
  analysis_improvement_areas TEXT[],
  analysis_category TEXT,
  analysis_quality_rating INTEGER CHECK (analysis_quality_rating BETWEEN 1 AND 5),
  analysis_error TEXT,
  analyzed_at TIMESTAMPTZ
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_recordings_agent ON call_recordings(agent_id);
CREATE INDEX IF NOT EXISTS idx_recordings_user ON call_recordings(user_id);
CREATE INDEX IF NOT EXISTS idx_recordings_date ON call_recordings(recording_date DESC);
CREATE INDEX IF NOT EXISTS idx_recordings_quality ON call_recordings(analysis_quality_rating DESC) WHERE analysis_quality_rating >= 4;
CREATE INDEX IF NOT EXISTS idx_recordings_category ON call_recordings(analysis_category);
CREATE INDEX IF NOT EXISTS idx_recordings_tags ON call_recordings USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_recordings_training ON call_recordings(is_training_example) WHERE is_training_example = TRUE;

-- RLS
ALTER TABLE call_recordings ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Service role bypass" ON call_recordings
  FOR ALL
  USING (auth.role() = 'service_role');

-- Vistas
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

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_recordings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_recordings_timestamp ON call_recordings;
CREATE TRIGGER trigger_update_recordings_timestamp
  BEFORE UPDATE ON call_recordings
  FOR EACH ROW
  EXECUTE FUNCTION update_recordings_updated_at();

-- Comentarios
COMMENT ON TABLE call_recordings IS 'Metadata de grabaciones de llamadas. Dual purpose: training de modelos AI y measurement de técnicas.';
COMMENT ON COLUMN call_recordings.is_training_example IS 'TRUE si esta grabación debe usarse para fine-tuning de modelos';
COMMENT ON VIEW best_training_calls IS 'Mejores llamadas (rating >= 4) marcadas como ejemplos de training';
COMMENT ON VIEW agent_performance IS 'KPIs agregados por agente';
COMMENT ON VIEW most_effective_techniques IS 'Técnicas más efectivas basadas en quality_rating y successful_outcomes';
