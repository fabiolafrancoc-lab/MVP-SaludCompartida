-- Crear tabla para conversaciones de Lupita
CREATE TABLE IF NOT EXISTS lupita_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_phone TEXT,
  user_name TEXT,
  transcript JSONB NOT NULL, -- Array de mensajes {role: 'user'|'assistant', content: '...'}
  summary TEXT, -- Resumen de la conversación
  topics TEXT[], -- Temas discutidos: ['dolor_cabeza', 'fiebre', 'receta']
  sentiment TEXT, -- 'positive', 'negative', 'neutral'
  duration_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_lupita_user_id ON lupita_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_lupita_user_phone ON lupita_conversations(user_phone);
CREATE INDEX IF NOT EXISTS idx_lupita_created_at ON lupita_conversations(created_at DESC);

-- RLS (Row Level Security) - Opcional
ALTER TABLE lupita_conversations ENABLE ROW LEVEL SECURITY;

-- Policy: Lupita (sistema) puede leer/escribir todo
CREATE POLICY "Lupita can access all conversations"
  ON lupita_conversations
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Usuarios pueden ver solo sus propias conversaciones
CREATE POLICY "Users can view own conversations"
  ON lupita_conversations
  FOR SELECT
  TO anon
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

COMMENT ON TABLE lupita_conversations IS 'Almacena transcripciones de conversaciones de Lupita (VAPI) para contexto y análisis';
COMMENT ON COLUMN lupita_conversations.transcript IS 'Array JSON de mensajes: [{role: "user", content: "...", timestamp: "..."}, ...]';
COMMENT ON COLUMN lupita_conversations.topics IS 'Array de temas discutidos para analytics';
