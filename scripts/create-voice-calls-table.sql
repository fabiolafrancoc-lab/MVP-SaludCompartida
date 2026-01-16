-- Tabla para programar llamadas de voz automáticas
CREATE TABLE IF NOT EXISTS scheduled_voice_calls (
  id BIGSERIAL PRIMARY KEY,
  
  -- Usuario
  user_phone VARCHAR(20) NOT NULL,
  user_name VARCHAR(200) NOT NULL,
  user_type VARCHAR(20), -- 'migrant' o 'family'
  
  -- Agente asignado
  agent_id VARCHAR(20) NOT NULL,
  agent_name VARCHAR(100),
  
  -- Tipo de llamada
  call_reason VARCHAR(50) NOT NULL, -- 'welcome', 'follow_up', 'retention', etc.
  
  -- Programación
  scheduled_for TIMESTAMPTZ NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'calling', 'completed', 'failed', 'no_answer'
  
  -- Resultado de Vapi
  vapi_call_id VARCHAR(100),
  call_started_at TIMESTAMPTZ,
  call_ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  
  -- Contenido
  transcript TEXT,
  summary TEXT,
  sentiment VARCHAR(20), -- 'positive', 'neutral', 'negative'
  
  -- Acciones tomadas
  appointment_scheduled BOOLEAN DEFAULT FALSE,
  escalated_to_human BOOLEAN DEFAULT FALSE,
  next_action TEXT,
  
  -- Metadata
  cost_usd DECIMAL(10, 4),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_scheduled_calls_pending 
ON scheduled_voice_calls(scheduled_for, status)
WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_scheduled_calls_user 
ON scheduled_voice_calls(user_phone);

CREATE INDEX IF NOT EXISTS idx_scheduled_calls_agent 
ON scheduled_voice_calls(agent_id);

-- Comentarios
COMMENT ON TABLE scheduled_voice_calls IS 'Llamadas de voz programadas con AI agents';
COMMENT ON COLUMN scheduled_voice_calls.call_reason IS 'welcome, follow_up, retention, appointment, feedback';
COMMENT ON COLUMN scheduled_voice_calls.status IS 'pending, calling, completed, failed, no_answer';
