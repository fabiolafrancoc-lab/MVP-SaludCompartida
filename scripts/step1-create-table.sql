-- ============================================================================
-- PARTE 1: Crear solo la tabla (sin índices, vistas, ni triggers)
-- ============================================================================

CREATE TABLE IF NOT EXISTS call_recordings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relaciones
  user_id TEXT NOT NULL,
  agent_id TEXT NOT NULL,
  
  -- URLs y archivos
  recording_url TEXT NOT NULL,
  
  -- Información básica
  duration_seconds INTEGER,
  recording_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Metadata de la llamada
  call_type TEXT CHECK (call_type IN ('outbound', 'inbound', 'callback', 'escalated')),
  call_outcome TEXT,
  
  -- Etiquetado para búsqueda
  tags TEXT[] DEFAULT '{}',
  emotional_tone TEXT,
  
  -- Para training
  is_training_example BOOLEAN DEFAULT FALSE,
  quality_rating INTEGER CHECK (quality_rating BETWEEN 1 AND 5),
  
  -- TRANSCRIPCIÓN
  transcription_status TEXT DEFAULT 'pending' CHECK (transcription_status IN ('pending', 'processing', 'completed', 'failed')),
  transcription_text TEXT,
  transcription_segments JSONB,
  transcription_duration FLOAT,
  transcription_error TEXT,
  transcribed_at TIMESTAMPTZ,
  
  -- ANÁLISIS
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

-- Verificar que se creó
SELECT 'Tabla creada correctamente' as status;
