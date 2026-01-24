-- =============================================
-- MIGRACIONES SEGURAS - SOLO CREA LO QUE NO EXISTE
-- =============================================

-- Crear función solo si no existe
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
-- TABLA: ai_companions
-- =============================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'ai_companions') THEN
        CREATE TABLE public.ai_companions (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            agent_id VARCHAR(20) NOT NULL UNIQUE,
            agent_name VARCHAR(50) NOT NULL,
            personality_type VARCHAR(30) CHECK (personality_type IN (
                'maternal', 'professional', 'friendly', 'energetic', 'calming'
            )),
            voice_id VARCHAR(100),
            specialization VARCHAR(50),
            age_range VARCHAR(30),
            description TEXT,
            backstory TEXT,
            default_arquetipo VARCHAR(30),
            tono_default VARCHAR(30),
            velocidad_habla DECIMAL(2,1) DEFAULT 1.0,
            vapi_assistant_id VARCHAR(100),
            vapi_phone_number_id VARCHAR(100),
            elevenlabs_voice_id VARCHAR(100),
            total_calls INTEGER DEFAULT 0,
            average_satisfaction DECIMAL(3,2),
            is_active BOOLEAN DEFAULT true,
            is_default BOOLEAN DEFAULT false,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE INDEX idx_ai_companions_active ON public.ai_companions(is_active);
        CREATE INDEX idx_ai_companions_specialization ON public.ai_companions(specialization);

        -- Insertar Lupita
        INSERT INTO public.ai_companions (
            agent_id, agent_name, personality_type, specialization, age_range,
            description, backstory, default_arquetipo, tono_default, velocidad_habla,
            vapi_assistant_id, is_active, is_default
        ) VALUES (
            'lupita', 'Lupita', 'maternal', 'general', '45-55',
            'Lupita es una compañera cálida y empática que entiende profundamente la experiencia migratoria.',
            'Lupita creció en un pueblo pequeño de Jalisco. Varios de sus familiares migraron a Estados Unidos.',
            'adulto_mayor', 'calido', 0.95, 'e313a305-254b-4cb8-808b-3a1b79e5fdea', true, true
        );

        -- Trigger
        DROP TRIGGER IF EXISTS trigger_ai_companions_updated ON public.ai_companions;
        CREATE TRIGGER trigger_ai_companions_updated
            BEFORE UPDATE ON public.ai_companions
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();

        -- RLS
        ALTER TABLE public.ai_companions ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Anyone can read active companions" ON public.ai_companions;
        CREATE POLICY "Anyone can read active companions"
            ON public.ai_companions FOR SELECT
            USING (true);
    END IF;
END $$;

-- =============================================
-- TABLA: behavioral_codes
-- =============================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'behavioral_codes') THEN
        CREATE TABLE public.behavioral_codes (
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
            tono VARCHAR(30),
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

        -- Insertar 16 códigos de Lupita (resumido por espacio)
        INSERT INTO public.behavioral_codes (agent_id, agent_name, code, name, category, description, response_default, tono, nivel_formalidad) VALUES
        ('lupita', 'Lupita', 'BC001', 'Saludo Cálido', 'saludo', 'Inicio conversación', '¡Hola! ¿Cómo amaneciste?', 'calido', 2),
        ('lupita', 'Lupita', 'BC002', 'Transición Usted-Tú', 'transicion', 'Pasar a informal', '¿Te puedo tutear?', 'calido', 3),
        ('lupita', 'Lupita', 'BC003', 'Chequeo Salud', 'salud', 'Estado de salud', '¿Cómo te has sentido?', 'empatico', 2);

        -- Trigger
        DROP TRIGGER IF EXISTS trigger_behavioral_codes_updated ON public.behavioral_codes;
        CREATE TRIGGER trigger_behavioral_codes_updated
            BEFORE UPDATE ON public.behavioral_codes
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();

        -- RLS
        ALTER TABLE public.behavioral_codes ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Anyone can read behavioral codes" ON public.behavioral_codes;
        CREATE POLICY "Anyone can read behavioral codes"
            ON public.behavioral_codes FOR SELECT
            USING (true);
    END IF;
END $$;

-- Continúa con las demás tablas...
SELECT 'Primeras 2 tablas creadas exitosamente' as status;
