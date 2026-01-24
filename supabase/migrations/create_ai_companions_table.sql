-- =============================================
-- TABLA: ai_companions
-- Registro de todos los AI companions del sistema
-- =============================================

CREATE TABLE IF NOT EXISTS public.ai_companions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Identificación
    agent_id VARCHAR(20) NOT NULL UNIQUE, -- 'lupita', 'carmen', 'rosa'
    agent_name VARCHAR(50) NOT NULL, -- Nombre completo
    
    -- Personalidad base
    personality_type VARCHAR(30) CHECK (personality_type IN (
        'maternal', 'professional', 'friendly', 'energetic', 'calming'
    )),
    voice_id VARCHAR(100), -- ID de voz en ElevenLabs/VAPI
    
    -- Especialización
    specialization VARCHAR(50), -- 'salud_mental', 'geriatria', 'pediatria', 'general'
    age_range VARCHAR(30), -- '25-35', '40-50', '55-65'
    
    -- Descripción
    description TEXT,
    backstory TEXT, -- Historia del personaje para contexto
    
    -- Configuración de conversación
    default_arquetipo VARCHAR(30), -- Arquetipo que mejor maneja
    tono_default VARCHAR(30),
    velocidad_habla DECIMAL(2,1) DEFAULT 1.0, -- 0.8 (lento) a 1.2 (rápido)
    
    -- IDs de integración
    vapi_assistant_id VARCHAR(100),
    vapi_phone_number_id VARCHAR(100),
    elevenlabs_voice_id VARCHAR(100),
    
    -- Estadísticas
    total_calls INTEGER DEFAULT 0,
    average_satisfaction DECIMAL(3,2), -- 0.00 - 1.00
    
    -- Estado
    is_active BOOLEAN DEFAULT true,
    is_default BOOLEAN DEFAULT false, -- AI por defecto si no se especifica
    
    -- Metadatos
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_ai_companions_active ON public.ai_companions(is_active);
CREATE INDEX idx_ai_companions_specialization ON public.ai_companions(specialization);

-- Insertar Lupita como primer AI companion
INSERT INTO public.ai_companions (
    agent_id, 
    agent_name, 
    personality_type, 
    specialization, 
    age_range,
    description,
    backstory,
    default_arquetipo,
    tono_default,
    velocidad_habla,
    vapi_assistant_id,
    is_active,
    is_default
) VALUES (
    'lupita',
    'Lupita',
    'maternal',
    'general',
    '45-55',
    'Lupita es una compañera cálida y empática que entiende profundamente la experiencia migratoria. Habla con naturalidad mexicana y construye relaciones genuinas.',
    'Lupita creció en un pueblo pequeño de Jalisco. Varios de sus familiares migraron a Estados Unidos, así que entiende el dolor de la separación familiar. Trabajó como enfermera comunitaria durante 20 años, por lo que sabe escuchar y detectar cuando alguien necesita ayuda. Le encanta cocinar y usar recetas tradicionales como tema de conversación para generar confianza.',
    'adulto_mayor',
    'calido',
    0.95,
    'e313a305-254b-4cb8-808b-3a1b79e5fdea',
    true,
    true
);

-- Trigger para updated_at
CREATE TRIGGER trigger_ai_companions_updated
    BEFORE UPDATE ON public.ai_companions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security)
ALTER TABLE public.ai_companions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active companions"
    ON public.ai_companions FOR SELECT
    USING (is_active = true);
