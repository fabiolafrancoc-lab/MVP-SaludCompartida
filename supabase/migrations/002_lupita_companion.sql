-- ============================================
-- TABLAS PARA LUPITA AI COMPANION
-- Sistema de llamadas con VAPI + AWS S3 + Weaviate
-- ============================================

-- Tabla principal: companion_calls
CREATE TABLE IF NOT EXISTS companion_calls (
    id BIGSERIAL PRIMARY KEY,
    call_id TEXT UNIQUE NOT NULL,
    phone_number TEXT NOT NULL,
    companion_type TEXT DEFAULT 'lupita', -- 'lupita' o 'fernanda'
    
    -- Timestamps
    started_at TIMESTAMPTZ NOT NULL,
    ended_at TIMESTAMPTZ,
    hung_up_at TIMESTAMPTZ,
    hung_up_by TEXT, -- 'user', 'system', 'assistant'
    
    -- Duración y estado
    duration_seconds INTEGER,
    status TEXT DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'failed'
    
    -- VAPI data
    vapi_phone_number_id TEXT,
    vapi_recording_url TEXT,
    transcript JSONB,
    
    -- AWS S3 storage
    s3_legal_url TEXT,
    s3_active_url TEXT,
    s3_legal_key TEXT,
    s3_active_key TEXT,
    audio_size_bytes BIGINT,
    
    -- Weaviate ML
    weaviate_id TEXT,
    weaviate_processed BOOLEAN DEFAULT false,
    
    -- Análisis (para futuro con Claude)
    emotions_analysis JSONB,
    call_summary TEXT,
    topics JSONB,
    user_satisfaction_score INTEGER,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsqueda rápida
CREATE INDEX IF NOT EXISTS idx_companion_calls_phone ON companion_calls(phone_number);
CREATE INDEX IF NOT EXISTS idx_companion_calls_status ON companion_calls(status);
CREATE INDEX IF NOT EXISTS idx_companion_calls_started ON companion_calls(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_companion_calls_call_id ON companion_calls(call_id);

-- Tabla: user_facts
-- Información importante extraída de conversaciones
CREATE TABLE IF NOT EXISTS user_facts (
    id BIGSERIAL PRIMARY KEY,
    phone_number TEXT NOT NULL,
    
    -- Tipo y contenido del fact
    fact_type TEXT NOT NULL, -- 'family_member', 'preference', 'health_mention', 'important_date', 'hobby'
    fact_key TEXT NOT NULL,
    fact_value TEXT NOT NULL,
    
    -- Confianza y origen
    confidence_score DECIMAL(3,2) DEFAULT 1.0,
    source_call_id TEXT REFERENCES companion_calls(call_id),
    
    -- Validez temporal
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ, -- algunos facts pueden expirar
    is_active BOOLEAN DEFAULT true
);

-- Índice único para evitar duplicados
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_facts_unique 
    ON user_facts(phone_number, fact_type, fact_key) 
    WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_user_facts_phone ON user_facts(phone_number);
CREATE INDEX IF NOT EXISTS idx_user_facts_type ON user_facts(fact_type);

-- Tabla: scheduled_callbacks
-- Llamadas programadas para Lupita
CREATE TABLE IF NOT EXISTS scheduled_callbacks (
    id BIGSERIAL PRIMARY KEY,
    phone_number TEXT NOT NULL,
    scheduled_for TIMESTAMPTZ NOT NULL,
    
    -- Razón y contexto
    reason TEXT,
    context JSONB, -- información adicional
    companion_type TEXT DEFAULT 'lupita',
    
    -- Estado de ejecución
    status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'cancelled', 'failed'
    attempt_count INTEGER DEFAULT 0,
    last_attempt_at TIMESTAMPTZ,
    completed_call_id TEXT REFERENCES companion_calls(call_id),
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scheduled_callbacks_pending 
    ON scheduled_callbacks(scheduled_for) 
    WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_scheduled_callbacks_phone ON scheduled_callbacks(phone_number);

-- Tabla: behavioral_codes
-- Los 16 códigos de comportamiento de Lupita
CREATE TABLE IF NOT EXISTS behavioral_codes (
    id BIGSERIAL PRIMARY KEY,
    code_name TEXT UNIQUE NOT NULL,
    code_category TEXT NOT NULL, -- 'cultural', 'emotional', 'conversation'
    
    -- Descripción y uso
    description TEXT NOT NULL,
    triggers JSONB, -- qué activa este código
    responses JSONB, -- cómo responder
    examples JSONB,
    
    -- Estado
    is_active BOOLEAN DEFAULT true,
    usage_count INTEGER DEFAULT 0,
    last_used_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar los 16 behavioral codes
INSERT INTO behavioral_codes (code_name, code_category, description, triggers, responses, examples) VALUES

-- CULTURAL CODES (5)
('usted_tu_transition', 'cultural', 'Transición de usted a tú basada en edad y rapport', 
 '{"age_threshold": 60, "rapport_threshold": 3}'::jsonb,
 '{"over_60": "usted", "under_60": "tú", "transition_after_rapport": true}'::jsonb,
 '{"formal": "¿Cómo amaneció usted, doñita?", "informal": "¿Cómo estás hoy?"}'::jsonb),

('regional_accent', 'cultural', 'Adaptación de patrones de habla por región',
 '{"detected_accent": ["oaxaqueño", "norteño", "chilango"]}'::jsonb,
 '{"adapt_vocabulary": true, "adapt_pace": true}'::jsonb,
 '{"oaxaca": "¿Qué hubo pues?", "norte": "¿Qué onda?"}'::jsonb),

('medical_colloquial', 'cultural', 'Uso de terminología médica coloquial mexicana',
 '{"health_topic_detected": true}'::jsonb,
 '{"use_colloquial": true, "avoid_technical": true}'::jsonb,
 '{"formal": "diarrea", "colloquial": "me anda el estómago"}'::jsonb),

('diminutives', 'cultural', 'Uso estratégico de diminutivos para calidez',
 '{"emotional_moment": true, "greeting": true}'::jsonb,
 '{"add_ito_ita": true}'::jsonb,
 '{"standard": "café", "warm": "cafecito"}'::jsonb),

('cultural_references', 'cultural', 'Referencias culturales mexicanas apropiadas',
 '{"conversation_flowing": true}'::jsonb,
 '{"use_references": true, "categories": ["music", "food", "traditions"]}'::jsonb,
 '{"music": "Como dice Juan Gabriel...", "food": "¿Le gustan los tamales de...?"}'::jsonb),

-- EMOTIONAL CODES (5)
('duelo_migratorio', 'emotional', 'Reconocimiento del duelo migratorio ambiguo',
 '{"mentions_family_abroad": true, "expresses_loneliness": true}'::jsonb,
 '{"validate": true, "normalize": true, "avoid_fix": true}'::jsonb,
 '{"response": "Extrañar a la familia es de las cosas más duras. Ese sentimiento es completamente normal."}'::jsonb),

('burden_validation', 'emotional', 'Validación de carga para cuidadoras',
 '{"mentions_caregiving": true, "sounds_tired": true}'::jsonb,
 '{"acknowledge_effort": true, "avoid_suggestions": true}'::jsonb,
 '{"response": "Cuidar a otros es un trabajo enorme. Usted hace mucho más de lo que se nota."}'::jsonb),

('crisis_detection', 'emotional', 'Detección de crisis y escalamiento',
 '{"keywords": ["no quiero vivir", "mejor muerta", "nadie me quiere"]}'::jsonb,
 '{"pause": true, "validate": true, "escalate": true}'::jsonb,
 '{"response": "Lo que me está diciendo es muy importante. ¿Puedo conectarla con alguien que puede ayudarla mejor?"}'::jsonb),

('positive_anchoring', 'emotional', 'Anclaje positivo al final de llamadas',
 '{"call_ending": true}'::jsonb,
 '{"mention_positive": true, "future_hook": true}'::jsonb,
 '{"response": "Qué gusto platicar de Elenita. Mañana me cuenta cómo le fue en su cumpleaños."}'::jsonb),

('loneliness_mitigation', 'emotional', 'Mitigación activa de soledad',
 '{"silence_detected": true, "mentions_alone": true}'::jsonb,
 '{"increase_engagement": true, "plan_callback": true}'::jsonb,
 '{"response": "Aquí estoy yo para platicar cuando quiera. ¿Le parece si la llamo mañana temprano?"}'::jsonb),

-- CONVERSATION CODES (6)
('echo_open_question', 'conversation', 'Repetir última palabra + pregunta abierta',
 '{"user_statement": true}'::jsonb,
 '{"echo_last_word": true, "add_open_question": true}'::jsonb,
 '{"input": "Hice tamales ayer", "response": "¿Tamales? ¡Qué rico! ¿Y de qué los hizo?"}'::jsonb),

('safe_to_personal', 'conversation', 'Progresión de temas seguros a personales',
 '{"call_start": true}'::jsonb,
 '{"sequence": ["weather", "food", "family", "health"]}'::jsonb,
 '{"order": "¿Cómo está el clima? → ¿Qué cocinó? → ¿Cómo está la familia? → ¿Y usted cómo se siente?"}'::jsonb),

('callback_hook', 'conversation', 'Crear razón para siguiente llamada',
 '{"call_ending": true}'::jsonb,
 '{"mention_future_topic": true, "create_anticipation": true}'::jsonb,
 '{"response": "Mañana me tiene que contar cómo le quedó la sopa."}'::jsonb),

('memory_continuity', 'conversation', 'Referencia a conversaciones anteriores',
 '{"has_previous_calls": true}'::jsonb,
 '{"reference_past": true, "show_memory": true}'::jsonb,
 '{"response": "¿Cómo le fue con la receta que me platicó ayer?"}'::jsonb),

('boundary_respect', 'conversation', 'Respetar límites del usuario',
 '{"user_discomfort": true, "topic_change_request": true}'::jsonb,
 '{"change_topic": true, "apologize_gently": true}'::jsonb,
 '{"response": "Tiene toda la razón, mejor platiquemos de otra cosa. Cuénteme..."}'::jsonb),

('graceful_exit', 'conversation', 'Terminar llamada con dignidad',
 '{"user_tired": true, "natural_end": true}'::jsonb,
 '{"summarize_positive": true, "confirm_callback": true}'::jsonb,
 '{"response": "Qué gusto platicar con usted. La dejo descansar y la llamo mañana. ¡Que descanse!"}'::jsonb)

ON CONFLICT (code_name) DO NOTHING;

-- RLS Policies (Row Level Security)
ALTER TABLE companion_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_callbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE behavioral_codes ENABLE ROW LEVEL SECURITY;

-- Policy: Service role tiene acceso total
CREATE POLICY "Service role full access on companion_calls" ON companion_calls
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on user_facts" ON user_facts
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on scheduled_callbacks" ON scheduled_callbacks
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on behavioral_codes" ON behavioral_codes
    FOR ALL USING (auth.role() = 'service_role');

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_companion_calls_updated_at
    BEFORE UPDATE ON companion_calls
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scheduled_callbacks_updated_at
    BEFORE UPDATE ON scheduled_callbacks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_behavioral_codes_updated_at
    BEFORE UPDATE ON behavioral_codes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comentarios para documentación
COMMENT ON TABLE companion_calls IS 'Registro de todas las llamadas de Lupita/Fernanda con usuarios';
COMMENT ON TABLE user_facts IS 'Información importante extraída de conversaciones para personalización';
COMMENT ON TABLE scheduled_callbacks IS 'Llamadas programadas para Lupita';
COMMENT ON TABLE behavioral_codes IS 'Los 16 códigos de comportamiento que guían a Lupita';

COMMENT ON COLUMN companion_calls.s3_legal_url IS 'URL en bucket LEGAL (immutable, 1 año)';
COMMENT ON COLUMN companion_calls.s3_active_url IS 'URL en bucket ACTIVE (para procesamiento)';
COMMENT ON COLUMN companion_calls.weaviate_id IS 'ID del objeto en Weaviate para aprendizaje ML';
