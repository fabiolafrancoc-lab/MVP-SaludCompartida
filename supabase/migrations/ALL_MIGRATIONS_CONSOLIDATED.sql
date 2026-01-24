-- =============================================
-- EJECUCIÓN CONSOLIDADA DE TODAS LAS MIGRACIONES
-- Sistema completo de AI Companions para Salud Compartida
-- 
-- INSTRUCCIONES:
-- 1. Copia TODO este archivo
-- 2. Ve a: https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/sql/new
-- 3. Pega todo el contenido
-- 4. Haz clic en "Run" / "Ejecutar"
-- 5. ¡Listo! Lupita tiene su base de datos completa
-- 
-- Total: 9 tablas + 4 triggers + 1 vista
-- Tiempo estimado: 2-3 minutos
-- =============================================

-- =============================================
-- FUNCIÓN AUXILIAR: update_updated_at_column
-- Solo crear si no existe (probablemente ya existe)
-- =============================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public' AND p.proname = 'update_updated_at_column'
    ) THEN
        CREATE FUNCTION public.update_updated_at_column()
        RETURNS TRIGGER AS $func$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $func$ LANGUAGE plpgsql;
    END IF;
END $$;

-- =============================================
-- MIGRACIÓN 1: ai_companions
-- =============================================

CREATE TABLE IF NOT EXISTS public.ai_companions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Identificación
    agent_id VARCHAR(20) NOT NULL UNIQUE,
    agent_name VARCHAR(50) NOT NULL,
    
    -- Personalidad base
    personality_type VARCHAR(30) CHECK (personality_type IN (
        'maternal', 'professional', 'friendly', 'energetic', 'calming'
    )),
    voice_id VARCHAR(100),
    
    -- Especialización
    specialization VARCHAR(50),
    age_range VARCHAR(30),
    
    -- Descripción
    description TEXT,
    backstory TEXT,
    
    -- Configuración de conversación
    default_arquetipo VARCHAR(30),
    tono_default VARCHAR(30),
    velocidad_habla DECIMAL(2,1) DEFAULT 1.0,
    
    -- IDs de integración
    vapi_assistant_id VARCHAR(100),
    vapi_phone_number_id VARCHAR(100),
    elevenlabs_voice_id VARCHAR(100),
    
    -- Estadísticas
    total_calls INTEGER DEFAULT 0,
    average_satisfaction DECIMAL(3,2),
    
    -- Estado
    is_active BOOLEAN DEFAULT true,
    is_default BOOLEAN DEFAULT false,
    
    -- Metadatos
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_companions_active ON public.ai_companions(is_active);
CREATE INDEX idx_ai_companions_specialization ON public.ai_companions(specialization);

INSERT INTO public.ai_companions (
    agent_id, agent_name, personality_type, specialization, age_range,
    description, backstory, default_arquetipo, tono_default, velocidad_habla,
    vapi_assistant_id, is_active, is_default
) VALUES (
    'lupita', 'Lupita', 'maternal', 'general', '45-55',
    'Lupita es una compañera cálida y empática que entiende profundamente la experiencia migratoria. Habla con naturalidad mexicana y construye relaciones genuinas.',
    'Lupita creció en un pueblo pequeño de Jalisco. Varios de sus familiares migraron a Estados Unidos, así que entiende el dolor de la separación familiar. Trabajó como enfermera comunitaria durante 20 años, por lo que sabe escuchar y detectar cuando alguien necesita ayuda. Le encanta cocinar y usar recetas tradicionales como tema de conversación para generar confianza.',
    'adulto_mayor', 'calido', 0.95, 'e313a305-254b-4cb8-808b-3a1b79e5fdea', true, true
);

CREATE TRIGGER trigger_ai_companions_updated
    BEFORE UPDATE ON public.ai_companions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.ai_companions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active companions"
    ON public.ai_companions FOR SELECT
    USING (true);

-- =============================================
-- MIGRACIÓN 2: behavioral_codes
-- =============================================

CREATE TABLE IF NOT EXISTS public.behavioral_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    agent_id VARCHAR(20) NOT NULL,
    agent_name VARCHAR(50),
    
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN (
        'saludo', 'despedida', 'empatia', 'crisis', 'salud', 
        'familia', 'emocional', 'seguimiento', 'recordatorio',
        'celebracion', 'duelo', 'motivacion', 'educacion', 'urgencia',
        'confianza', 'transicion'
    )),
    
    description TEXT NOT NULL,
    trigger_conditions JSONB,
    
    response_adulto_mayor TEXT,
    response_mujer_joven TEXT,
    response_default TEXT NOT NULL,
    
    variaciones_regionales JSONB,
    frases_mexicanas TEXT[],
    frases_evitar TEXT[],
    
    tono VARCHAR(30) CHECK (tono IN (
        'calido', 'profesional', 'urgente', 'celebratorio', 
        'empatico', 'motivador', 'tranquilizador'
    )),
    nivel_formalidad INTEGER CHECK (nivel_formalidad BETWEEN 1 AND 5),
    
    embeddings_vector VECTOR(1536),
    ejemplos_uso JSONB,
    
    is_active BOOLEAN DEFAULT true,
    version INTEGER DEFAULT 1,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(agent_id, code)
);

CREATE INDEX idx_behavioral_codes_agent ON public.behavioral_codes(agent_id);
CREATE INDEX idx_behavioral_codes_category ON public.behavioral_codes(category);
CREATE INDEX idx_behavioral_codes_active ON public.behavioral_codes(is_active) WHERE is_active = true;
CREATE INDEX idx_behavioral_codes_agent_category ON public.behavioral_codes(agent_id, category);

INSERT INTO public.behavioral_codes (agent_id, agent_name, code, name, category, description, response_adulto_mayor, response_mujer_joven, response_default, tono, nivel_formalidad) VALUES
('lupita', 'Lupita', 'BC001', 'Saludo Cálido', 'saludo', 'Inicio de conversación con calidez', '¡Buenos días! ¿Cómo amaneció usted hoy?', '¡Hola! ¿Cómo amaneciste hoy?', '¡Hola! ¿Cómo amaneciste hoy?', 'calido', 2),
('lupita', 'Lupita', 'BC002', 'Transición Usted-Tú', 'transicion', 'Pasar de formal a informal gradualmente', 'Ya que nos conocemos mejor, ¿me permite tutearle?', 'Ya somos amigas, ¿no crees?', 'Ya que nos conocemos mejor, ¿te puedo tutear?', 'calido', 3),
('lupita', 'Lupita', 'BC003', 'Chequeo Salud', 'salud', 'Preguntar por estado de salud', '¿Cómo se ha sentido? ¿Ha tomado sus medicinas?', '¿Cómo te has sentido? ¿Ya tomaste tus medicinas?', '¿Cómo te has sentido? ¿Has tomado tus medicinas?', 'empatico', 2),
('lupita', 'Lupita', 'BC004', 'Duelo Migratorio', 'emocional', 'Reconocer el duelo migratorio ambiguo', 'Extrañar a su familia es normal, no está solo/a', 'Extrañar a tu familia es normal, no estás sola', 'Extrañar a tu familia es normal, no estás solo/a', 'empatico', 2),
('lupita', 'Lupita', 'BC005', 'Recordatorio Cita', 'recordatorio', 'Recordar citas médicas o toma de medicinas', 'No olvide su cita mañana a las...', 'Oye, no olvides tu cita mañana a las...', 'No olvides tu cita mañana a las...', 'profesional', 3),
('lupita', 'Lupita', 'BC006', 'Crisis Emocional', 'crisis', 'Detectar y responder a crisis emocional', 'Le escucho, cuénteme qué está pasando', 'Te escucho amiga, cuéntame qué está pasando', 'Te escucho, cuéntame qué está pasando', 'empatico', 2),
('lupita', 'Lupita', 'BC007', 'Celebración', 'celebracion', 'Celebrar logros o fechas especiales', '¡Qué gusto! Eso hay que celebrarlo', '¡Ay qué padre! Eso hay que celebrarlo', '¡Qué gusto! Eso hay que celebrarlo', 'celebratorio', 1),
('lupita', 'Lupita', 'BC008', 'Motivación', 'motivacion', 'Motivar cuando hay desánimo', 'Cada día es una oportunidad nueva, usted puede', 'Ánimo, cada día es una oportunidad nueva', 'Cada día es una oportunidad nueva', 'motivador', 2),
('lupita', 'Lupita', 'BC009', 'Despedida Cálida', 'despedida', 'Cerrar conversación dejando puerta abierta', 'Fue un gusto platicar con usted, aquí estoy para lo que necesite', 'Me encantó platicar contigo, aquí ando para lo que ocupes', 'Fue un gusto platicar contigo, aquí estoy para lo que necesites', 'calido', 2),
('lupita', 'Lupita', 'BC010', 'Urgencia Médica', 'urgencia', 'Detectar urgencia médica', 'Esto suena importante, ¿quiere que le conecte con un doctor ahora?', 'Oye, esto suena importante, ¿quieres que te conecte con un doctor ahorita?', 'Esto suena importante, ¿quieres que te conecte con un doctor ahora?', 'urgente', 4),
('lupita', 'Lupita', 'BC011', 'Receta y Farmacia', 'salud', 'Hablar de medicamentos y descuentos', '¿Ya fue a surtir su receta? Recuerde el descuento en farmacia', '¿Ya fuiste por tus medicinas? Acuérdate del descuento en la farmacia', '¿Ya fuiste a surtir tu receta? Recuerda el descuento en farmacia', 'profesional', 3),
('lupita', 'Lupita', 'BC012', 'Familia Lejana', 'familia', 'Hablar sobre familia en USA', '¿Cómo está su hijo/a allá? ¿Han podido hablar?', '¿Cómo está tu hijo/a allá? ¿Han podido hablar?', '¿Cómo está tu hijo/a allá? ¿Han podido hablar?', 'empatico', 2),
('lupita', 'Lupita', 'BC013', 'Comida y Recetas', 'confianza', 'Tema seguro para construir confianza', '¿Qué cocinó hoy? Me encanta conocer recetas', '¿Qué cocinaste hoy? Me encantan las recetas', '¿Qué cocinaste hoy? Me encanta conocer recetas', 'calido', 1),
('lupita', 'Lupita', 'BC014', 'Memoria y Nostalgia', 'confianza', 'Conectar a través de recuerdos', '¿Cómo era antes su pueblo/ciudad?', '¿Cómo era tu pueblo cuando eras chica?', '¿Cómo era antes tu pueblo/ciudad?', 'calido', 2),
('lupita', 'Lupita', 'BC015', 'Educación Salud', 'educacion', 'Educar sobre temas de salud', '¿Sabía usted que es importante tomar suficiente agua?', '¿Sabías que es súper importante tomar agua?', '¿Sabías que es importante tomar agua?', 'profesional', 3),
('lupita', 'Lupita', 'BC016', 'Seguimiento Post-Consulta', 'seguimiento', 'Dar seguimiento después de consulta médica', '¿Cómo le fue en su consulta? ¿Qué le dijo el doctor?', '¿Cómo te fue en tu consulta? ¿Qué te dijo el doc?', '¿Cómo te fue en tu consulta? ¿Qué te dijo el doctor?', 'empatico', 2);

CREATE TRIGGER trigger_behavioral_codes_updated
    BEFORE UPDATE ON public.behavioral_codes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.behavioral_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read behavioral codes"
    ON public.behavioral_codes FOR SELECT
    USING (true);

-- =============================================
-- MIGRACIÓN 3: beneficiaries
-- =============================================

CREATE TABLE IF NOT EXISTS public.beneficiaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id BIGINT NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100),
    fecha_nacimiento DATE NOT NULL,
    genero VARCHAR(20) CHECK (genero IN ('masculino', 'femenino', 'otro', 'prefiero_no_decir')),
    
    whatsapp VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    
    parentesco VARCHAR(50) NOT NULL CHECK (parentesco IN (
        'madre', 'padre', 'esposa', 'esposo', 'hijo', 'hija', 
        'hermano', 'hermana', 'abuelo', 'abuela', 'otro'
    )),
    
    orden_beneficiario INTEGER NOT NULL CHECK (orden_beneficiario BETWEEN 1 AND 4),
    
    is_active BOOLEAN DEFAULT true,
    is_primary BOOLEAN DEFAULT false,
    
    preferred_call_time VARCHAR(50),
    timezone VARCHAR(50) DEFAULT 'America/Mexico_City',
    language VARCHAR(10) DEFAULT 'es-MX',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(registration_id, orden_beneficiario),
    UNIQUE(registration_id, whatsapp)
);

CREATE INDEX idx_beneficiaries_registration ON public.beneficiaries(registration_id);
CREATE INDEX idx_beneficiaries_whatsapp ON public.beneficiaries(whatsapp);
CREATE INDEX idx_beneficiaries_active ON public.beneficiaries(is_active) WHERE is_active = true;

CREATE OR REPLACE FUNCTION check_max_beneficiaries()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM public.beneficiaries 
        WHERE registration_id = NEW.registration_id AND is_active = true) >= 4 THEN
        RAISE EXCEPTION 'Máximo 4 beneficiarios por suscripción';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_max_beneficiaries
    BEFORE INSERT ON public.beneficiaries
    FOR EACH ROW
    EXECUTE FUNCTION check_max_beneficiaries();

CREATE TRIGGER trigger_beneficiaries_updated
    BEFORE UPDATE ON public.beneficiaries
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.beneficiaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their beneficiaries"
    ON public.beneficiaries FOR SELECT
    USING (
        registration_id IN (SELECT id FROM public.registrations WHERE email = auth.jwt()->>'email')
    );

CREATE POLICY "Users can insert beneficiaries"
    ON public.beneficiaries FOR INSERT
    WITH CHECK (
        registration_id IN (SELECT id FROM public.registrations WHERE email = auth.jwt()->>'email')
    );

CREATE POLICY "Users can update their beneficiaries"
    ON public.beneficiaries FOR UPDATE
    USING (
        registration_id IN (SELECT id FROM public.registrations WHERE email = auth.jwt()->>'email')
    );

-- =============================================
-- MIGRACIÓN 4: medical_history
-- =============================================

CREATE TABLE IF NOT EXISTS public.medical_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    beneficiary_id UUID NOT NULL REFERENCES public.beneficiaries(id) ON DELETE CASCADE,
    
    record_type VARCHAR(50) NOT NULL CHECK (record_type IN (
        'condicion_cronica', 'alergia', 'cirugia', 'hospitalizacion',
        'vacuna', 'medicamento_actual', 'antecedente_familiar',
        'consulta', 'estudio', 'receta'
    )),
    
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_evento DATE,
    fecha_diagnostico DATE,
    
    is_chronic BOOLEAN DEFAULT false,
    severity VARCHAR(20) CHECK (severity IN ('leve', 'moderado', 'severo', 'controlado')),
    
    medicamentos JSONB,
    
    doctor_nombre VARCHAR(255),
    institucion VARCHAR(255),
    
    documentos_urls TEXT[],
    
    notas_companion TEXT,
    
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by VARCHAR(50) DEFAULT 'user',
    source VARCHAR(50) DEFAULT 'manual'
);

CREATE INDEX idx_medical_history_beneficiary ON public.medical_history(beneficiary_id);
CREATE INDEX idx_medical_history_type ON public.medical_history(record_type);
CREATE INDEX idx_medical_history_chronic ON public.medical_history(is_chronic) WHERE is_chronic = true;
CREATE INDEX idx_medical_history_date ON public.medical_history(fecha_evento DESC);

CREATE TRIGGER trigger_medical_history_updated
    BEFORE UPDATE ON public.medical_history
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.medical_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their beneficiaries medical history"
    ON public.medical_history FOR SELECT
    USING (
        beneficiary_id IN (
            SELECT b.id FROM public.beneficiaries b
            JOIN public.registrations r ON r.id = b.registration_id
            WHERE r.migrant_email = current_setting('request.jwt.claims', true)::json->>'email'
        )
    );

CREATE POLICY "Users can insert medical history"
    ON public.medical_history FOR INSERT
    WITH CHECK (
        beneficiary_id IN (
            SELECT b.id FROM public.beneficiaries b
            JOIN public.registrations r ON r.id = b.registration_id
            WHERE r.migrant_email = current_setting('request.jwt.claims', true)::json->>'email'
        )
    );

CREATE POLICY "Users can update their medical history"
    ON public.medical_history FOR UPDATE
    USING (
        beneficiary_id IN (
            SELECT b.id FROM public.beneficiaries b
            JOIN public.registrations r ON r.id = b.registration_id
            WHERE r.migrant_email = current_setting('request.jwt.claims', true)::json->>'email'
        )
    );

-- =============================================
-- MIGRACIÓN 5: service_usage
-- =============================================

CREATE TABLE IF NOT EXISTS public.service_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id BIGINT NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    beneficiary_id UUID NOT NULL REFERENCES public.beneficiaries(id) ON DELETE CASCADE,
    
    service_type VARCHAR(50) NOT NULL CHECK (service_type IN (
        'telemedicina', 'farmacia', 'consulta_presencial', 
        'especialista', 'laboratorio', 'terapia_psicologica',
        'urgencia', 'receta_electronica'
    )),
    
    service_provider VARCHAR(255),
    service_date TIMESTAMPTZ NOT NULL,
    
    duration_minutes INTEGER,
    doctor_name VARCHAR(255),
    diagnosis TEXT,
    prescriptions JSONB,
    
    pharmacy_name VARCHAR(255),
    pharmacy_location VARCHAR(255),
    productos JSONB,
    total_sin_descuento DECIMAL(10,2),
    total_con_descuento DECIMAL(10,2),
    ahorro DECIMAL(10,2),
    porcentaje_descuento DECIMAL(5,2),
    
    appointment_type VARCHAR(50),
    clinic_name VARCHAR(255),
    clinic_address TEXT,
    
    status VARCHAR(30) DEFAULT 'completado' CHECK (status IN (
        'agendado', 'en_proceso', 'completado', 'cancelado', 'no_show'
    )),
    
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    feedback TEXT,
    
    notes TEXT,
    notes_companion TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_service_usage_registration ON public.service_usage(registration_id);
CREATE INDEX idx_service_usage_beneficiary ON public.service_usage(beneficiary_id);
CREATE INDEX idx_service_usage_type ON public.service_usage(service_type);
CREATE INDEX idx_service_usage_date ON public.service_usage(service_date DESC);
CREATE INDEX idx_service_usage_status ON public.service_usage(status);

CREATE TRIGGER trigger_service_usage_updated
    BEFORE UPDATE ON public.service_usage
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE VIEW public.v_user_savings AS
SELECT 
    registration_id,
    COUNT(*) as total_usos,
    SUM(ahorro) as ahorro_total,
    AVG(porcentaje_descuento) as descuento_promedio,
    SUM(CASE WHEN service_type = 'telemedicina' THEN 1 ELSE 0 END) as consultas_telemedicina,
    SUM(CASE WHEN service_type = 'farmacia' THEN 1 ELSE 0 END) as compras_farmacia,
    SUM(CASE WHEN service_type = 'terapia_psicologica' THEN 1 ELSE 0 END) as sesiones_terapia
FROM public.service_usage
WHERE status = 'completado'
GROUP BY registration_id;

ALTER TABLE public.service_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their service usage"
    ON public.service_usage FOR SELECT
    USING (
        registration_id IN (
            SELECT id FROM public.registrations
            WHERE migrant_email = current_setting('request.jwt.claims', true)::json->>'email'
        )
    );

CREATE POLICY "Users can insert service usage"
    ON public.service_usage FOR INSERT
    WITH CHECK (
        registration_id IN (
            SELECT id FROM public.registrations
            WHERE migrant_email = current_setting('request.jwt.claims', true)::json->>'email'
        )
    );

-- =============================================
-- MIGRACIÓN 6: companion_calls
-- =============================================

CREATE TABLE IF NOT EXISTS public.companion_calls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    beneficiary_id UUID NOT NULL REFERENCES public.beneficiaries(id) ON DELETE CASCADE,
    registration_id BIGINT NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    
    vapi_call_id VARCHAR(255),
    telnyx_call_id VARCHAR(255),
    elevenlabs_voice_id VARCHAR(255),
    
    scheduled_at TIMESTAMPTZ,
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    duration_seconds INTEGER,
    
    call_type VARCHAR(30) NOT NULL CHECK (call_type IN (
        'bienvenida', 'seguimiento_diario', 'post_consulta',
        'recordatorio_medicamento', 'chequeo_salud', 'crisis',
        'cumpleanos', 'callback_solicitado', 'manual'
    )),
    
    status VARCHAR(30) DEFAULT 'scheduled' CHECK (status IN (
        'scheduled', 'calling', 'in_progress', 'completed', 
        'no_answer', 'busy', 'failed', 'cancelled', 'voicemail'
    )),
    attempt_number INTEGER DEFAULT 1,
    max_attempts INTEGER DEFAULT 3,
    
    behavioral_codes_used UUID[],
    topics_discussed TEXT[],
    sentiment_detected VARCHAR(20) CHECK (sentiment_detected IN (
        'muy_positivo', 'positivo', 'neutral', 'negativo', 'muy_negativo', 'crisis'
    )),
    
    transcript_url TEXT,
    transcript_text TEXT,
    transcript_summary TEXT,
    
    health_mentions JSONB,
    medication_mentions JSONB,
    symptoms_reported JSONB,
    mood_assessment VARCHAR(50),
    
    follow_up_required BOOLEAN DEFAULT false,
    follow_up_reason TEXT,
    urgency_level INTEGER CHECK (urgency_level BETWEEN 0 AND 5),
    
    next_call_scheduled_at TIMESTAMPTZ,
    next_call_reason TEXT,
    callback_requested BOOLEAN DEFAULT false,
    callback_requested_at TIMESTAMPTZ,
    callback_delay_minutes INTEGER,
    
    call_quality_score DECIMAL(3,2),
    audio_quality VARCHAR(20),
    
    embeddings_stored BOOLEAN DEFAULT false,
    weaviate_id VARCHAR(255),
    
    notes TEXT,
    reviewed_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_companion_calls_beneficiary ON public.companion_calls(beneficiary_id);
CREATE INDEX idx_companion_calls_registration ON public.companion_calls(registration_id);
CREATE INDEX idx_companion_calls_scheduled ON public.companion_calls(scheduled_at);
CREATE INDEX idx_companion_calls_status ON public.companion_calls(status);
CREATE INDEX idx_companion_calls_type ON public.companion_calls(call_type);
CREATE INDEX idx_companion_calls_followup ON public.companion_calls(follow_up_required) WHERE follow_up_required = true;
CREATE INDEX idx_companion_calls_callback ON public.companion_calls(callback_requested, callback_requested_at) WHERE callback_requested = true;
CREATE INDEX idx_companion_calls_next ON public.companion_calls(next_call_scheduled_at) WHERE next_call_scheduled_at IS NOT NULL;

CREATE TRIGGER trigger_companion_calls_updated
    BEFORE UPDATE ON public.companion_calls
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.companion_calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their calls"
    ON public.companion_calls FOR SELECT
    USING (
        registration_id IN (
            SELECT id FROM public.registrations
            WHERE migrant_email = current_setting('request.jwt.claims', true)::json->>'email'
        )
    );

-- =============================================
-- MIGRACIÓN 7: scheduled_callbacks
-- =============================================

CREATE TABLE IF NOT EXISTS public.scheduled_callbacks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    companion_call_id UUID NOT NULL REFERENCES public.companion_calls(id) ON DELETE CASCADE,
    beneficiary_id UUID NOT NULL REFERENCES public.beneficiaries(id) ON DELETE CASCADE,
    registration_id BIGINT NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    
    scheduled_for TIMESTAMPTZ NOT NULL,
    reason TEXT,
    
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
        'pending', 'processing', 'completed', 'failed', 'cancelled'
    )),
    
    processed_at TIMESTAMPTZ,
    error_message TEXT,
    resulting_call_id UUID REFERENCES public.companion_calls(id),
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_scheduled_callbacks_pending ON public.scheduled_callbacks(scheduled_for, status) 
    WHERE status = 'pending';
CREATE INDEX idx_scheduled_callbacks_registration ON public.scheduled_callbacks(registration_id);

-- =============================================
-- MIGRACIÓN 8: urgent_notifications
-- =============================================

CREATE TABLE IF NOT EXISTS public.urgent_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    type VARCHAR(50) NOT NULL CHECK (type IN (
        'health_emergency', 'crisis_emotional', 'medication_issue',
        'missed_appointment', 'callback_failed', 'system_alert'
    )),
    
    reference_id UUID,
    reference_type VARCHAR(50),
    beneficiary_id UUID REFERENCES public.beneficiaries(id) ON DELETE SET NULL,
    registration_id BIGINT REFERENCES public.registrations(id) ON DELETE SET NULL,
    
    message TEXT NOT NULL,
    priority INTEGER NOT NULL CHECK (priority BETWEEN 1 AND 5),
    
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
        'pending', 'acknowledged', 'in_progress', 'resolved', 'escalated'
    )),
    
    acknowledged_at TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ,
    resolution_notes TEXT,
    
    notified_migrant BOOLEAN DEFAULT false,
    notified_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_urgent_notifications_pending ON public.urgent_notifications(created_at DESC, status)
    WHERE status = 'pending';
CREATE INDEX idx_urgent_notifications_priority ON public.urgent_notifications(priority DESC)
    WHERE status IN ('pending', 'acknowledged');
CREATE INDEX idx_urgent_notifications_registration ON public.urgent_notifications(registration_id);

-- =============================================
-- MIGRACIÓN 9: TRIGGERS AUTOMÁTICOS
-- =============================================

-- TRIGGER 1: Callback automático
CREATE OR REPLACE FUNCTION create_callback_from_call()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.callback_requested = true AND NEW.callback_delay_minutes IS NOT NULL THEN
        INSERT INTO public.scheduled_callbacks (
            companion_call_id, beneficiary_id, registration_id, scheduled_for, reason
        ) VALUES (
            NEW.id, NEW.beneficiary_id, NEW.registration_id,
            COALESCE(NEW.callback_requested_at, NOW()) + (NEW.callback_delay_minutes || ' minutes')::INTERVAL,
            NEW.next_call_reason
        );
    END IF;
    
    IF NEW.next_call_scheduled_at IS NOT NULL THEN
        INSERT INTO public.scheduled_callbacks (
            companion_call_id, beneficiary_id, registration_id, scheduled_for, reason
        ) VALUES (
            NEW.id, NEW.beneficiary_id, NEW.registration_id,
            NEW.next_call_scheduled_at, NEW.next_call_reason
        )
        ON CONFLICT DO NOTHING;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_create_callback ON public.companion_calls;
CREATE TRIGGER trigger_create_callback
    AFTER INSERT OR UPDATE ON public.companion_calls
    FOR EACH ROW
    WHEN (NEW.callback_requested = true OR NEW.next_call_scheduled_at IS NOT NULL)
    EXECUTE FUNCTION create_callback_from_call();

-- TRIGGER 2: Detectar urgencia y notificar
CREATE OR REPLACE FUNCTION notify_urgency()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.urgency_level >= 4 THEN
        INSERT INTO public.urgent_notifications (
            type, reference_id, reference_type, beneficiary_id, registration_id, message, priority
        ) VALUES (
            'health_emergency', NEW.id, 'companion_call', NEW.beneficiary_id, NEW.registration_id,
            'Urgencia detectada en llamada: ' || COALESCE(NEW.follow_up_reason, 'Sin especificar'),
            NEW.urgency_level
        );
        
        PERFORM pg_notify('urgent_health_alert', json_build_object(
            'call_id', NEW.id,
            'beneficiary_id', NEW.beneficiary_id,
            'registration_id', NEW.registration_id,
            'urgency_level', NEW.urgency_level,
            'reason', NEW.follow_up_reason
        )::text);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_notify_urgency ON public.companion_calls;
CREATE TRIGGER trigger_notify_urgency
    AFTER INSERT OR UPDATE ON public.companion_calls
    FOR EACH ROW
    WHEN (NEW.urgency_level >= 4)
    EXECUTE FUNCTION notify_urgency();

-- TRIGGER 3: Auto-actualizar historial médico
CREATE OR REPLACE FUNCTION auto_update_medical_history()
RETURNS TRIGGER AS $$
DECLARE
    symptom JSONB;
BEGIN
    IF NEW.symptoms_reported IS NOT NULL AND jsonb_array_length(NEW.symptoms_reported) > 0 THEN
        FOR symptom IN SELECT * FROM jsonb_array_elements(NEW.symptoms_reported)
        LOOP
            INSERT INTO public.medical_history (
                beneficiary_id, record_type, titulo, descripcion, fecha_evento,
                notas_companion, created_by, source
            ) VALUES (
                NEW.beneficiary_id, 'consulta',
                'Síntoma reportado: ' || (symptom->>'nombre'),
                symptom->>'descripcion',
                COALESCE(NEW.started_at, NOW())::DATE,
                'Detectado en llamada de Lupita ID: ' || NEW.id,
                'companion', 'companion_call'
            );
        END LOOP;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_auto_medical_history ON public.companion_calls;
CREATE TRIGGER trigger_auto_medical_history
    AFTER INSERT ON public.companion_calls
    FOR EACH ROW
    WHEN (NEW.symptoms_reported IS NOT NULL)
    EXECUTE FUNCTION auto_update_medical_history();

-- TRIGGER 4: Notificar WATI cuando termina llamada
CREATE OR REPLACE FUNCTION notify_wati_call_complete()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
        PERFORM pg_notify('wati_send_summary', json_build_object(
            'call_id', NEW.id,
            'beneficiary_id', NEW.beneficiary_id,
            'registration_id', NEW.registration_id,
            'summary', NEW.transcript_summary,
            'next_call', NEW.next_call_scheduled_at,
            'action_items', NEW.health_mentions
        )::text);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_wati_notification ON public.companion_calls;
CREATE TRIGGER trigger_wati_notification
    AFTER UPDATE ON public.companion_calls
    FOR EACH ROW
    EXECUTE FUNCTION notify_wati_call_complete();

-- =============================================
-- FIN DE MIGRACIONES
-- =============================================

-- Verificación rápida
SELECT 
    'ai_companions' as tabla, COUNT(*) as registros FROM public.ai_companions
UNION ALL
SELECT 'behavioral_codes', COUNT(*) FROM public.behavioral_codes
UNION ALL
SELECT 'beneficiaries', COUNT(*) FROM public.beneficiaries
UNION ALL
SELECT 'medical_history', COUNT(*) FROM public.medical_history
UNION ALL
SELECT 'service_usage', COUNT(*) FROM public.service_usage
UNION ALL
SELECT 'companion_calls', COUNT(*) FROM public.companion_calls
UNION ALL
SELECT 'scheduled_callbacks', COUNT(*) FROM public.scheduled_callbacks
UNION ALL
SELECT 'urgent_notifications', COUNT(*) FROM public.urgent_notifications;
