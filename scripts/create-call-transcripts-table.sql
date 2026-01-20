-- ============================================
-- TABLA: call_transcripts
-- Almacena transcripciones y grabaciones de llamadas de Vapi
-- Para análisis, mejora continua y entrenamiento de IA
-- ============================================

CREATE TABLE IF NOT EXISTS public.call_transcripts (
  -- Identificadores
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id TEXT UNIQUE NOT NULL, -- ID de llamada de Vapi
  user_id UUID REFERENCES auth.users(id), -- Si está logueado
  
  -- Información del usuario
  phone_number TEXT NOT NULL,
  user_name TEXT,
  user_email TEXT,
  
  -- Información de la llamada
  agent_id TEXT, -- agent_001, agent_002, etc.
  agent_name TEXT, -- Lupita, Carmen, Rosa, etc.
  call_reason TEXT, -- welcome_call, medication_reminder, telemedicine, etc.
  call_type TEXT, -- inbound, outbound
  
  -- Perfil y contexto relacional
  user_profile TEXT, -- 'adulto_mayor', 'madre_hijos'
  call_number INTEGER DEFAULT 1, -- Número de llamada en secuencia (1, 2, 3...)
  previous_topics JSONB DEFAULT '[]'::jsonb, -- Temas mencionados en llamadas anteriores
  
  -- Transcripción y análisis
  transcript TEXT, -- Transcripción completa
  transcript_json JSONB, -- Transcripción estructurada por turnos
  
  -- Grabación de audio
  recording_url TEXT, -- URL de la grabación de Vapi
  recording_duration INTEGER, -- Duración en segundos
  
  -- Análisis con IA
  sentiment_analysis JSONB, -- { overall: 'positive/neutral/negative', confidence: 0.8, emotions: [...] }
  detected_codes JSONB DEFAULT '[]'::jsonb, -- Códigos comportamiento: ['EMOCION', 'SALUD', etc.]
  crisis_detected BOOLEAN DEFAULT FALSE,
  crisis_level TEXT, -- 'none', 'low', 'medium', 'high', 'critical'
  
  -- Topics y entidades extraídas
  topics JSONB DEFAULT '[]'::jsonb, -- ['cocina', 'medicamentos', 'familia']
  mentioned_people JSONB DEFAULT '[]'::jsonb, -- Nombres mencionados
  action_items JSONB DEFAULT '[]'::jsonb, -- ['recordar_llamar_doctor', 'enviar_recetas']
  
  -- Calidad de la llamada
  call_status TEXT, -- 'completed', 'no-answer', 'busy', 'failed', 'ended-by-user'
  call_duration INTEGER, -- Duración real en segundos
  call_quality_score DECIMAL(3,2), -- 0.00 - 1.00
  user_satisfaction TEXT, -- 'satisfied', 'neutral', 'dissatisfied' (inferido)
  
  -- Metadata de Vapi
  vapi_metadata JSONB, -- Metadata completa del webhook
  
  -- Seguimiento
  follow_up_needed BOOLEAN DEFAULT FALSE,
  follow_up_reason TEXT,
  follow_up_scheduled_at TIMESTAMPTZ,
  
  -- Timestamps
  call_started_at TIMESTAMPTZ,
  call_ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Análisis completado
  analyzed_at TIMESTAMPTZ,
  analysis_version TEXT DEFAULT 'v1.0'
);

-- ============================================
-- ÍNDICES PARA BÚSQUEDA Y ANÁLISIS
-- ============================================

-- Búsqueda por usuario
CREATE INDEX IF NOT EXISTS idx_call_transcripts_phone 
  ON public.call_transcripts(phone_number);

CREATE INDEX IF NOT EXISTS idx_call_transcripts_user_id 
  ON public.call_transcripts(user_id);

-- Búsqueda por agente
CREATE INDEX IF NOT EXISTS idx_call_transcripts_agent 
  ON public.call_transcripts(agent_id);

-- Búsqueda por fecha
CREATE INDEX IF NOT EXISTS idx_call_transcripts_created 
  ON public.call_transcripts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_call_transcripts_call_started 
  ON public.call_transcripts(call_started_at DESC);

-- Búsqueda por crisis
CREATE INDEX IF NOT EXISTS idx_call_transcripts_crisis 
  ON public.call_transcripts(crisis_detected, crisis_level) 
  WHERE crisis_detected = TRUE;

-- Búsqueda por seguimiento
CREATE INDEX IF NOT EXISTS idx_call_transcripts_followup 
  ON public.call_transcripts(follow_up_needed, follow_up_scheduled_at) 
  WHERE follow_up_needed = TRUE;

-- Búsqueda por perfil y número de llamada
CREATE INDEX IF NOT EXISTS idx_call_transcripts_profile_callnum 
  ON public.call_transcripts(user_profile, call_number);

-- Búsqueda full-text en transcripciones (PostgreSQL)
CREATE INDEX IF NOT EXISTS idx_call_transcripts_transcript_search 
  ON public.call_transcripts USING gin(to_tsvector('spanish', transcript));

-- Búsqueda en topics (JSONB)
CREATE INDEX IF NOT EXISTS idx_call_transcripts_topics 
  ON public.call_transcripts USING gin(topics);

-- Búsqueda en códigos detectados (JSONB)
CREATE INDEX IF NOT EXISTS idx_call_transcripts_codes 
  ON public.call_transcripts USING gin(detected_codes);

-- ============================================
-- FUNCIÓN: Actualizar timestamp automáticamente
-- ============================================
CREATE OR REPLACE FUNCTION update_call_transcripts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_call_transcripts_updated_at
  BEFORE UPDATE ON public.call_transcripts
  FOR EACH ROW
  EXECUTE FUNCTION update_call_transcripts_updated_at();

-- ============================================
-- RLS (Row Level Security)
-- ============================================
ALTER TABLE public.call_transcripts ENABLE ROW LEVEL SECURITY;

-- Admins pueden ver todo
CREATE POLICY "Admins can view all transcripts"
  ON public.call_transcripts
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_accounts
      WHERE user_accounts.user_id = auth.uid()
      AND user_accounts.role = 'admin'
    )
  );

-- Usuarios solo ven sus propias transcripciones
CREATE POLICY "Users can view own transcripts"
  ON public.call_transcripts
  FOR SELECT
  USING (user_id = auth.uid());

-- Solo el sistema puede insertar (via service key)
CREATE POLICY "Service can insert transcripts"
  ON public.call_transcripts
  FOR INSERT
  WITH CHECK (true);

-- Solo el sistema puede actualizar (via service key)
CREATE POLICY "Service can update transcripts"
  ON public.call_transcripts
  FOR UPDATE
  USING (true);

-- ============================================
-- VISTA: Resumen de llamadas por usuario
-- ============================================
CREATE OR REPLACE VIEW call_transcripts_summary AS
SELECT 
  phone_number,
  user_name,
  user_profile,
  COUNT(*) as total_calls,
  COUNT(*) FILTER (WHERE call_status = 'completed') as completed_calls,
  COUNT(*) FILTER (WHERE crisis_detected = TRUE) as crisis_calls,
  COUNT(*) FILTER (WHERE follow_up_needed = TRUE) as follow_ups_pending,
  AVG(call_duration) as avg_duration_seconds,
  AVG(call_quality_score) as avg_quality,
  MAX(call_started_at) as last_call_at,
  ARRAY_AGG(DISTINCT agent_name) as agents_interacted,
  -- Temas más frecuentes (top 10)
  (
    SELECT ARRAY_AGG(topic)
    FROM (
      SELECT jsonb_array_elements_text(topics) as topic
      FROM call_transcripts ct2
      WHERE ct2.phone_number = ct.phone_number
      GROUP BY topic
      ORDER BY COUNT(*) DESC
      LIMIT 10
    ) t
  ) as top_topics
FROM call_transcripts ct
GROUP BY phone_number, user_name, user_profile;

-- ============================================
-- VISTA: Alertas de crisis recientes
-- ============================================
CREATE OR REPLACE VIEW crisis_alerts AS
SELECT 
  id,
  call_id,
  phone_number,
  user_name,
  agent_name,
  crisis_level,
  detected_codes,
  transcript,
  call_started_at,
  follow_up_needed,
  follow_up_scheduled_at
FROM call_transcripts
WHERE crisis_detected = TRUE
  AND call_started_at >= NOW() - INTERVAL '7 days'
ORDER BY 
  CASE crisis_level
    WHEN 'critical' THEN 1
    WHEN 'high' THEN 2
    WHEN 'medium' THEN 3
    WHEN 'low' THEN 4
    ELSE 5
  END,
  call_started_at DESC;

-- ============================================
-- COMENTARIOS PARA DOCUMENTACIÓN
-- ============================================
COMMENT ON TABLE public.call_transcripts IS 'Almacena transcripciones y análisis de llamadas de Vapi para mejora continua del sistema de acompañamiento emocional';
COMMENT ON COLUMN public.call_transcripts.call_number IS 'Número secuencial de llamada para tracking de progreso relacional (Llamada 1: Llegada, Llamada 2: Sabor de Casa, etc.)';
COMMENT ON COLUMN public.call_transcripts.detected_codes IS 'Códigos de comportamiento detectados: CERRADO, EMOCION, SALUD, PAREJA, FINANZAS, ABANDONO, CRISIS';
COMMENT ON COLUMN public.call_transcripts.previous_topics IS 'Temas mencionados en llamadas anteriores para retomar en próxima llamada (memoria relacional)';
COMMENT ON VIEW crisis_alerts IS 'Vista de alertas de crisis de los últimos 7 días ordenadas por severidad';
