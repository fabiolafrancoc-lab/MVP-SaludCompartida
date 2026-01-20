-- Tabla para guardar todas las llamadas de voz AI con Vapi
-- Incluye transcripciones completas, grabaciones y análisis

CREATE TABLE IF NOT EXISTS ai_voice_calls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Identificadores de la llamada
  vapi_call_id TEXT UNIQUE NOT NULL,
  phone_number TEXT NOT NULL,
  agent_id TEXT NOT NULL, -- agent_001 (Lupita), agent_002 (Carmen), etc.
  
  -- Relación con usuario (si existe)
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Información de la llamada
  duration_seconds INTEGER,
  cost_usd DECIMAL(10, 4),
  end_reason TEXT, -- 'completed', 'user-hung-up', 'assistant-hung-up', 'error', etc.
  
  -- Transcripción y grabación
  transcript JSONB, -- Array de mensajes {role: 'user'|'assistant', message: '...', timestamp: '...'}
  recording_url TEXT, -- URL de la grabación de audio
  
  -- Análisis de la conversación
  sentiment TEXT, -- 'positive', 'neutral', 'negative'
  topics TEXT[], -- ['telemedicina', 'farmacia', 'dudas_cobertura']
  action_items TEXT[], -- Acciones que el usuario mencionó
  follow_up_needed BOOLEAN DEFAULT false,
  
  -- Calidad de la llamada
  user_satisfaction INTEGER, -- 1-5 si el usuario calificó
  ai_performance_notes TEXT,
  
  -- Contexto de la llamada
  call_reason TEXT, -- 'welcome_call', 'pharmacy_followup', 'telemedicine_reminder', etc.
  metadata JSONB, -- Cualquier otra información relevante
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  analyzed_at TIMESTAMP WITH TIME ZONE, -- Cuando se analizó con IA
  
  CONSTRAINT valid_phone_number CHECK (phone_number ~ '^\+[0-9]{10,15}$')
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_vapi_calls_phone ON ai_voice_calls(phone_number);
CREATE INDEX idx_vapi_calls_agent ON ai_voice_calls(agent_id);
CREATE INDEX idx_vapi_calls_user_id ON ai_voice_calls(user_id);
CREATE INDEX idx_vapi_calls_created_at ON ai_voice_calls(created_at DESC);
CREATE INDEX idx_vapi_calls_call_reason ON ai_voice_calls(call_reason);
CREATE INDEX idx_vapi_calls_topics ON ai_voice_calls USING GIN (topics);

-- Buscar en transcripciones con texto completo
CREATE INDEX idx_vapi_calls_transcript_gin ON ai_voice_calls USING GIN (transcript jsonb_path_ops);

-- RLS (Row Level Security)
ALTER TABLE ai_voice_calls ENABLE ROW LEVEL SECURITY;

-- Policy: Service role puede hacer todo
CREATE POLICY "Service role full access" ON ai_voice_calls
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Policy: Usuarios pueden ver sus propias llamadas
CREATE POLICY "Users can read own calls" ON ai_voice_calls
  FOR SELECT
  USING (
    user_id = auth.uid()
    OR phone_number IN (
      SELECT phone FROM registrations WHERE id = auth.uid()
    )
  );

-- Función para extraer texto completo de transcripción
CREATE OR REPLACE FUNCTION get_call_transcript_text(call_id UUID)
RETURNS TEXT AS $$
DECLARE
  result TEXT := '';
  msg JSONB;
BEGIN
  FOR msg IN SELECT jsonb_array_elements(transcript) FROM ai_voice_calls WHERE id = call_id
  LOOP
    result := result || msg->>'role' || ': ' || msg->>'message' || E'\n';
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Vista para análisis de llamadas por agente
CREATE OR REPLACE VIEW vapi_calls_analytics AS
SELECT 
  agent_id,
  COUNT(*) as total_calls,
  AVG(duration_seconds) as avg_duration_seconds,
  SUM(cost_usd) as total_cost_usd,
  COUNT(*) FILTER (WHERE end_reason = 'completed') as successful_calls,
  COUNT(*) FILTER (WHERE end_reason LIKE '%error%') as error_calls,
  AVG(user_satisfaction) as avg_satisfaction,
  ROUND(AVG(CASE WHEN sentiment = 'positive' THEN 100
                  WHEN sentiment = 'neutral' THEN 50
                  ELSE 0 END), 2) as positive_sentiment_pct,
  COUNT(DISTINCT phone_number) as unique_users,
  MAX(created_at) as last_call_at
FROM ai_voice_calls
GROUP BY agent_id;

-- Vista para llamadas recientes con detalles
CREATE OR REPLACE VIEW recent_vapi_calls AS
SELECT 
  id,
  vapi_call_id,
  phone_number,
  agent_id,
  duration_seconds,
  ROUND(cost_usd::numeric, 4) as cost_usd,
  end_reason,
  call_reason,
  sentiment,
  topics,
  user_satisfaction,
  created_at,
  CASE 
    WHEN recording_url IS NOT NULL THEN 'Sí'
    ELSE 'No'
  END as tiene_grabacion,
  jsonb_array_length(transcript) as num_mensajes
FROM ai_voice_calls
ORDER BY created_at DESC
LIMIT 100;

COMMENT ON TABLE ai_voice_calls IS 'Registro completo de todas las llamadas de voz AI con Vapi - incluye transcripciones, grabaciones y análisis';
COMMENT ON COLUMN ai_voice_calls.transcript IS 'Array JSON de mensajes: [{role: "user"|"assistant", message: "...", timestamp: "..."}]';
COMMENT ON COLUMN ai_voice_calls.recording_url IS 'URL de la grabación de audio (si recording_enabled=true en Vapi)';
COMMENT ON COLUMN ai_voice_calls.sentiment IS 'Análisis de sentimiento: positive, neutral, negative';
COMMENT ON COLUMN ai_voice_calls.topics IS 'Array de temas discutidos en la llamada';
COMMENT ON COLUMN ai_voice_calls.action_items IS 'Array de acciones que el usuario mencionó o necesita hacer';

-- Verificar que se creó correctamente
SELECT 
  table_name, 
  column_name, 
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'ai_voice_calls'
ORDER BY ordinal_position;
