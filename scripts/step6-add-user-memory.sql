-- ============================================================================
-- PARTE 6: Sistema de Memoria Conversacional por Usuario
-- ============================================================================

-- Tabla para perfiles de usuario (memoria acumulativa)
CREATE TABLE IF NOT EXISTS user_conversation_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  
  -- Información personal descubierta
  name TEXT,
  preferred_name TEXT, -- "Señora Lupita" vs "Lupita"
  age_range TEXT,
  location TEXT,
  family_members JSONB DEFAULT '[]', -- ["hijo Juan", "esposo Pedro"]
  
  -- Contexto de salud
  health_conditions TEXT[], -- ["diabetes", "presión alta"]
  medications TEXT[],
  last_symptoms TEXT[],
  health_concerns TEXT[], -- Preocupaciones mencionadas
  
  -- Contexto emocional
  emotional_state TEXT, -- "preocupada", "animada", "cansada"
  support_network TEXT[], -- ["hija la ayuda", "vecina María"]
  stressors TEXT[], -- ["dinero", "salud del esposo"]
  
  -- Contexto económico
  income_situation TEXT, -- "pensión", "trabajo informal"
  economic_concerns TEXT[],
  products_interested JSONB DEFAULT '[]',
  
  -- Historial conversacional
  total_calls INTEGER DEFAULT 0,
  first_contact_date TIMESTAMPTZ,
  last_contact_date TIMESTAMPTZ,
  conversation_summary TEXT, -- Resumen acumulativo
  key_topics JSONB DEFAULT '[]', -- Temas importantes discutidos
  
  -- Para personalización
  preferred_communication_style TEXT, -- "formal", "casual", "empático"
  response_patterns TEXT[], -- "prefiere respuestas cortas", "necesita validación"
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_user_profiles_user_id ON user_conversation_profiles(user_id);
CREATE INDEX idx_user_profiles_last_contact ON user_conversation_profiles(last_contact_date DESC);

-- Tabla para extraer información de cada llamada
CREATE TABLE IF NOT EXISTS call_extracted_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_recording_id UUID REFERENCES call_recordings(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  
  -- Información nueva descubierta en esta llamada
  new_personal_info JSONB DEFAULT '{}',
  new_health_info JSONB DEFAULT '{}',
  new_emotional_info JSONB DEFAULT '{}',
  new_economic_info JSONB DEFAULT '{}',
  
  -- Referencias a conversaciones anteriores
  referenced_past_topics TEXT[], -- "mencionó su hijo", "preguntó por medicamento"
  
  -- Para actualizar el perfil
  should_update_profile BOOLEAN DEFAULT TRUE,
  profile_updated BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_call_extracted_user ON call_extracted_info(user_id);
CREATE INDEX idx_call_extracted_recording ON call_extracted_info(call_recording_id);

-- Vista: Obtener contexto completo para siguiente llamada
CREATE OR REPLACE VIEW user_call_context AS
SELECT 
  ucp.user_id,
  ucp.name,
  ucp.preferred_name,
  ucp.health_conditions,
  ucp.emotional_state,
  ucp.family_members,
  ucp.total_calls,
  ucp.last_contact_date,
  ucp.conversation_summary,
  ucp.key_topics,
  
  -- Última llamada
  cr.transcription_text as last_call_transcription,
  cr.recording_date as last_call_date,
  cei.new_personal_info as last_call_new_info
  
FROM user_conversation_profiles ucp
LEFT JOIN call_recordings cr ON cr.user_id = ucp.user_id 
  AND cr.recording_date = ucp.last_contact_date
LEFT JOIN call_extracted_info cei ON cei.call_recording_id = cr.id
ORDER BY ucp.last_contact_date DESC;

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_user_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_user_profile_timestamp ON user_conversation_profiles;

CREATE TRIGGER trigger_update_user_profile_timestamp
  BEFORE UPDATE ON user_conversation_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_user_profile_updated_at();

-- Función: Obtener contexto para nueva llamada
CREATE OR REPLACE FUNCTION get_user_context_for_call(p_user_id TEXT)
RETURNS TABLE (
  has_history BOOLEAN,
  total_previous_calls INTEGER,
  last_call_summary TEXT,
  key_facts TEXT[],
  conversation_starters TEXT[]
) AS $$
DECLARE
  v_profile RECORD;
  v_facts TEXT[];
  v_starters TEXT[];
BEGIN
  -- Obtener perfil
  SELECT * INTO v_profile
  FROM user_conversation_profiles
  WHERE user_id = p_user_id;
  
  -- Si no existe perfil, es primera llamada
  IF NOT FOUND THEN
    RETURN QUERY SELECT 
      FALSE,
      0,
      NULL::TEXT,
      ARRAY[]::TEXT[],
      ARRAY['Hola, le habla [nombre] de Salud Compartida. ¿Cómo está el día de hoy?']::TEXT[];
    RETURN;
  END IF;
  
  -- Construir key_facts
  v_facts := ARRAY[]::TEXT[];
  
  IF v_profile.preferred_name IS NOT NULL THEN
    v_facts := array_append(v_facts, 'Llamar: ' || v_profile.preferred_name);
  END IF;
  
  IF v_profile.health_conditions IS NOT NULL AND array_length(v_profile.health_conditions, 1) > 0 THEN
    v_facts := array_append(v_facts, 'Condiciones: ' || array_to_string(v_profile.health_conditions, ', '));
  END IF;
  
  IF v_profile.family_members IS NOT NULL THEN
    v_facts := array_append(v_facts, 'Familia: ' || v_profile.family_members::TEXT);
  END IF;
  
  -- Construir conversation_starters
  v_starters := ARRAY[]::TEXT[];
  
  IF v_profile.preferred_name IS NOT NULL THEN
    v_starters := array_append(v_starters, 
      'Hola ' || v_profile.preferred_name || ', le habla [nombre] de Salud Compartida. ¿Cómo ha estado?');
  END IF;
  
  IF v_profile.last_symptoms IS NOT NULL AND array_length(v_profile.last_symptoms, 1) > 0 THEN
    v_starters := array_append(v_starters, 
      '¿Cómo ha seguido de ' || v_profile.last_symptoms[1] || '?');
  END IF;
  
  RETURN QUERY SELECT 
    TRUE,
    v_profile.total_calls,
    v_profile.conversation_summary,
    v_facts,
    v_starters;
END;
$$ LANGUAGE plpgsql;

-- Verificar
SELECT 'Sistema de memoria conversacional creado correctamente' as status;
