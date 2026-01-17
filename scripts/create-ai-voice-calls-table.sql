-- ============================================
-- CREATE AI_VOICE_CALLS TABLE
-- ============================================
-- Almacena todas las llamadas de voz realizadas por el sistema AI
-- Incluye transcripciones completas y metadatos

CREATE TABLE IF NOT EXISTS ai_voice_calls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Identificación de la llamada
  vapi_call_id TEXT UNIQUE NOT NULL,
  phone_number TEXT NOT NULL,
  agent_id TEXT NOT NULL,
  
  -- Usuario asociado (si existe)
  user_email TEXT REFERENCES registrations(email) ON DELETE SET NULL,
  
  -- Métricas de la llamada
  duration_seconds INTEGER,
  cost_usd DECIMAL(10, 4),
  
  -- Contenido
  transcript JSONB,
  recording_url TEXT,
  
  -- Metadatos
  end_reason TEXT,
  call_reason TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_ai_voice_calls_phone ON ai_voice_calls(phone_number);
CREATE INDEX IF NOT EXISTS idx_ai_voice_calls_user_email ON ai_voice_calls(user_email);
CREATE INDEX IF NOT EXISTS idx_ai_voice_calls_agent ON ai_voice_calls(agent_id);
CREATE INDEX IF NOT EXISTS idx_ai_voice_calls_created ON ai_voice_calls(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_voice_calls_vapi_id ON ai_voice_calls(vapi_call_id);

-- RLS (Row Level Security)
ALTER TABLE ai_voice_calls ENABLE ROW LEVEL SECURITY;

-- Policy: Admin puede ver todas las llamadas
CREATE POLICY "Admin can view all calls"
  ON ai_voice_calls
  FOR SELECT
  USING (true);

-- Policy: Sistema puede insertar llamadas
CREATE POLICY "System can insert calls"
  ON ai_voice_calls
  FOR INSERT
  WITH CHECK (true);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_ai_voice_calls_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ai_voice_calls_timestamp
  BEFORE UPDATE ON ai_voice_calls
  FOR EACH ROW
  EXECUTE FUNCTION update_ai_voice_calls_updated_at();

-- Comentarios para documentación
COMMENT ON TABLE ai_voice_calls IS 'Registro completo de todas las llamadas de voz AI realizadas por Vapi.ai';
COMMENT ON COLUMN ai_voice_calls.vapi_call_id IS 'ID único de la llamada en Vapi.ai';
COMMENT ON COLUMN ai_voice_calls.transcript IS 'Transcripción completa en formato JSON';
COMMENT ON COLUMN ai_voice_calls.recording_url IS 'URL del audio grabado (si está disponible)';
COMMENT ON COLUMN ai_voice_calls.end_reason IS 'Razón por la que terminó la llamada (completed, hangup, error, etc.)';
