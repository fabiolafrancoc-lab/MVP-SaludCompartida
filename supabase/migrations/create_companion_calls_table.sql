-- =============================================
-- TABLA: companion_calls
-- Registro de llamadas del AI Companion Lupita
-- CORREGIDO: registration_id BIGINT, sin user_id
-- =============================================

CREATE TABLE IF NOT EXISTS public.companion_calls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    beneficiary_id UUID NOT NULL REFERENCES public.beneficiaries(id) ON DELETE CASCADE,
    registration_id BIGINT NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    
    -- Identificadores externos
    vapi_call_id VARCHAR(255),
    telnyx_call_id VARCHAR(255),
    elevenlabs_voice_id VARCHAR(255),
    
    -- Timing
    scheduled_at TIMESTAMPTZ,
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    duration_seconds INTEGER,
    
    -- Tipo de llamada
    call_type VARCHAR(30) NOT NULL CHECK (call_type IN (
        'bienvenida', 'seguimiento_diario', 'post_consulta',
        'recordatorio_medicamento', 'chequeo_salud', 'crisis',
        'cumpleanos', 'callback_solicitado', 'manual'
    )),
    
    -- Estado
    status VARCHAR(30) DEFAULT 'scheduled' CHECK (status IN (
        'scheduled', 'calling', 'in_progress', 'completed', 
        'no_answer', 'busy', 'failed', 'cancelled', 'voicemail'
    )),
    attempt_number INTEGER DEFAULT 1,
    max_attempts INTEGER DEFAULT 3,
    
    -- Contenido de la llamada
    behavioral_codes_used UUID[],
    topics_discussed TEXT[],
    sentiment_detected VARCHAR(20) CHECK (sentiment_detected IN (
        'muy_positivo', 'positivo', 'neutral', 'negativo', 'muy_negativo', 'crisis'
    )),
    
    -- Transcripción
    transcript_url TEXT,
    transcript_text TEXT,
    transcript_summary TEXT,
    
    -- Información de salud detectada
    health_mentions JSONB,
    medication_mentions JSONB,
    symptoms_reported JSONB,
    mood_assessment VARCHAR(50),
    
    -- Acciones derivadas
    follow_up_required BOOLEAN DEFAULT false,
    follow_up_reason TEXT,
    urgency_level INTEGER CHECK (urgency_level BETWEEN 0 AND 5),
    
    -- Próxima llamada / Callback
    next_call_scheduled_at TIMESTAMPTZ,
    next_call_reason TEXT,
    callback_requested BOOLEAN DEFAULT false,
    callback_requested_at TIMESTAMPTZ,
    callback_delay_minutes INTEGER,
    
    -- Calidad
    call_quality_score DECIMAL(3,2),
    audio_quality VARCHAR(20),
    
    -- Para Weaviate
    embeddings_stored BOOLEAN DEFAULT false,
    weaviate_id VARCHAR(255),
    
    -- Notas
    notes TEXT,
    reviewed_at TIMESTAMPTZ,
    
    -- Metadatos
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_companion_calls_beneficiary ON public.companion_calls(beneficiary_id);
CREATE INDEX idx_companion_calls_registration ON public.companion_calls(registration_id);
CREATE INDEX idx_companion_calls_scheduled ON public.companion_calls(scheduled_at);
CREATE INDEX idx_companion_calls_status ON public.companion_calls(status);
CREATE INDEX idx_companion_calls_type ON public.companion_calls(call_type);
CREATE INDEX idx_companion_calls_followup ON public.companion_calls(follow_up_required) WHERE follow_up_required = true;
CREATE INDEX idx_companion_calls_callback ON public.companion_calls(callback_requested, callback_requested_at) WHERE callback_requested = true;
CREATE INDEX idx_companion_calls_next ON public.companion_calls(next_call_scheduled_at) WHERE next_call_scheduled_at IS NOT NULL;

-- Trigger para updated_at
CREATE TRIGGER trigger_companion_calls_updated
    BEFORE UPDATE ON public.companion_calls
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS
ALTER TABLE public.companion_calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their calls"
    ON public.companion_calls FOR SELECT
    USING (
        registration_id IN (
            SELECT id FROM public.registrations
            WHERE migrant_email = current_setting('request.jwt.claims', true)::json->>'email'
        )
    );
