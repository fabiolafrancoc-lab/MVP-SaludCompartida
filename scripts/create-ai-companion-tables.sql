-- Schema para AI Companion System
-- Ejecutar en Supabase SQL Editor

-- 1. Tabla de configuración del companion por usuario
CREATE TABLE IF NOT EXISTS ai_companions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  phone_number TEXT NOT NULL,
  
  -- Información del usuario
  user_name TEXT NOT NULL,
  user_age INTEGER,
  user_gender TEXT,
  user_interests TEXT[], -- Array: ["jardinería", "cocina", "nietos"]
  
  -- Configuración del companion
  companion_name TEXT DEFAULT 'Lupita',
  companion_personality TEXT DEFAULT 'caring', -- caring, wise, funny
  companion_voice TEXT DEFAULT 'female', -- female, male
  language_style TEXT DEFAULT 'mexican_casual', -- mexican_casual, mexican_formal
  
  -- Preferencias de comunicación
  chat_frequency TEXT DEFAULT 'daily', -- daily, twice_daily, on_demand
  preferred_time TIME DEFAULT '09:00:00', -- Hora preferida para iniciar conversación
  timezone TEXT DEFAULT 'America/Mexico_City',
  
  -- Estado
  active BOOLEAN DEFAULT true,
  onboarding_completed BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla de memoria del companion (temas importantes)
CREATE TABLE IF NOT EXISTS companion_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES ai_companions(user_id) ON DELETE CASCADE,
  
  -- Contenido de la memoria
  topic TEXT NOT NULL, -- "hijo_en_usa", "nietos_visita", "problema_rodilla"
  category TEXT, -- family, health, hobbies, concerns
  content TEXT NOT NULL, -- Descripción detallada
  
  -- Contexto emocional
  sentiment TEXT, -- positive, negative, neutral, mixed
  importance INTEGER DEFAULT 3 CHECK (importance BETWEEN 1 AND 5),
  
  -- Seguimiento
  first_mentioned TIMESTAMPTZ DEFAULT NOW(),
  last_mentioned TIMESTAMPTZ DEFAULT NOW(),
  mention_count INTEGER DEFAULT 1,
  follow_up_needed BOOLEAN DEFAULT false,
  follow_up_question TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabla de historial de conversaciones
CREATE TABLE IF NOT EXISTS companion_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES ai_companions(user_id) ON DELETE CASCADE,
  
  -- Mensaje
  message_from TEXT NOT NULL, -- 'user' o 'ai'
  message_content TEXT NOT NULL,
  
  -- Análisis del mensaje
  emotion_detected TEXT, -- happy, sad, worried, angry, neutral
  topics_mentioned TEXT[], -- Array de topics relacionados
  
  -- Metadata
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  whatsapp_message_id TEXT -- ID del mensaje de WhatsApp
);

-- 4. Tabla de recordatorios de medicina
CREATE TABLE IF NOT EXISTS medication_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES ai_companions(user_id) ON DELETE CASCADE,
  
  -- Información del medicamento
  medication_name TEXT NOT NULL,
  dosage TEXT, -- "500mg", "1 pastilla"
  frequency TEXT NOT NULL, -- "daily", "twice_daily", "weekly"
  times TIME[], -- Array de horas: ["08:00", "20:00"]
  
  -- Tracking
  last_taken TIMESTAMPTZ,
  last_reminded TIMESTAMPTZ,
  missed_count INTEGER DEFAULT 0,
  
  -- Estado
  active BOOLEAN DEFAULT true,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabla de seguimiento de adherencia
CREATE TABLE IF NOT EXISTS medication_adherence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES ai_companions(user_id) ON DELETE CASCADE,
  medication_id UUID NOT NULL REFERENCES medication_reminders(id) ON DELETE CASCADE,
  
  -- Evento
  scheduled_time TIMESTAMPTZ NOT NULL,
  taken_time TIMESTAMPTZ,
  status TEXT NOT NULL, -- 'taken', 'missed', 'late'
  
  -- Respuesta del usuario
  user_response TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_companions_user_id ON ai_companions(user_id);
CREATE INDEX IF NOT EXISTS idx_companions_phone ON ai_companions(phone_number);
CREATE INDEX IF NOT EXISTS idx_memory_user_id ON companion_memory(user_id);
CREATE INDEX IF NOT EXISTS idx_memory_importance ON companion_memory(importance DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON companion_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_timestamp ON companion_conversations(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_reminders_user_id ON medication_reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_adherence_user_id ON medication_adherence(user_id);

-- RLS (Row Level Security) - Opcional pero recomendado
ALTER TABLE ai_companions ENABLE ROW LEVEL SECURITY;
ALTER TABLE companion_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE companion_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_adherence ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso (ajustar según tu auth)
CREATE POLICY "Users can read own companion data" ON ai_companions
  FOR SELECT USING (true); -- Ajusta según tu sistema de auth

CREATE POLICY "Users can read own memory" ON companion_memory
  FOR SELECT USING (true);

CREATE POLICY "Users can read own conversations" ON companion_conversations
  FOR SELECT USING (true);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ai_companions_updated_at
  BEFORE UPDATE ON ai_companions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companion_memory_updated_at
  BEFORE UPDATE ON companion_memory
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_medication_reminders_updated_at
  BEFORE UPDATE ON medication_reminders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comentarios para documentación
COMMENT ON TABLE ai_companions IS 'Configuración del AI companion por usuario';
COMMENT ON TABLE companion_memory IS 'Memoria a largo plazo del companion sobre temas importantes del usuario';
COMMENT ON TABLE companion_conversations IS 'Historial completo de conversaciones entre usuario y AI';
COMMENT ON TABLE medication_reminders IS 'Recordatorios de medicamentos configurados por usuario';
COMMENT ON TABLE medication_adherence IS 'Tracking de adherencia a medicamentos';
