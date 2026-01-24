-- =============================================
-- TABLA: beneficiaries
-- Descripción: Familiares en México que reciben el servicio
-- Máximo 4 por suscripción
-- =============================================

CREATE TABLE IF NOT EXISTS public.beneficiaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id BIGINT NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    
    -- Datos personales
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100),
    fecha_nacimiento DATE NOT NULL,
    genero VARCHAR(20) CHECK (genero IN ('masculino', 'femenino', 'otro', 'prefiero_no_decir')),
    
    -- Contacto
    whatsapp VARCHAR(20) NOT NULL, -- Formato: +52 55 XXXX XXXX
    email VARCHAR(255),
    
    -- Relación con el migrante
    parentesco VARCHAR(50) NOT NULL CHECK (parentesco IN (
        'madre', 'padre', 'esposa', 'esposo', 'hijo', 'hija', 
        'hermano', 'hermana', 'abuelo', 'abuela', 'otro'
    )),
    
    -- Orden del beneficiario (1-4)
    orden_beneficiario INTEGER NOT NULL CHECK (orden_beneficiario BETWEEN 1 AND 4),
    
    -- Estado
    is_active BOOLEAN DEFAULT true,
    is_primary BOOLEAN DEFAULT false, -- Beneficiario principal (quien recibe llamadas de Lupita primero)
    
    -- Preferencias de comunicación
    preferred_call_time VARCHAR(50), -- Ej: 'mañana', 'tarde', 'noche'
    timezone VARCHAR(50) DEFAULT 'America/Mexico_City',
    language VARCHAR(10) DEFAULT 'es-MX',
    
    -- Metadatos
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    UNIQUE(registration_id, orden_beneficiario),
    UNIQUE(registration_id, whatsapp)
);

-- Índices
CREATE INDEX idx_beneficiaries_registration ON public.beneficiaries(registration_id);
CREATE INDEX idx_beneficiaries_whatsapp ON public.beneficiaries(whatsapp);
CREATE INDEX idx_beneficiaries_active ON public.beneficiaries(is_active) WHERE is_active = true;

-- Trigger para limitar a 4 beneficiarios por suscripción
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

-- Trigger para updated_at
CREATE TRIGGER trigger_beneficiaries_updated
    BEFORE UPDATE ON public.beneficiaries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security)
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
