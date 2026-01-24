-- =============================================
-- TABLA: service_usage
-- Registro de uso de servicios
-- CORREGIDO: registration_id BIGINT, sin user_id
-- =============================================

CREATE TABLE IF NOT EXISTS public.service_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id BIGINT NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    beneficiary_id UUID NOT NULL REFERENCES public.beneficiaries(id) ON DELETE CASCADE,
    
    -- Tipo de servicio
    service_type VARCHAR(50) NOT NULL CHECK (service_type IN (
        'telemedicina', 'farmacia', 'consulta_presencial', 
        'especialista', 'laboratorio', 'terapia_psicologica',
        'urgencia', 'receta_electronica'
    )),
    
    -- Detalles del servicio
    service_provider VARCHAR(255),
    service_date TIMESTAMPTZ NOT NULL,
    
    -- Para telemedicina
    duration_minutes INTEGER,
    doctor_name VARCHAR(255),
    diagnosis TEXT,
    prescriptions JSONB,
    
    -- Para farmacia
    pharmacy_name VARCHAR(255),
    pharmacy_location VARCHAR(255),
    productos JSONB,
    total_sin_descuento DECIMAL(10,2),
    total_con_descuento DECIMAL(10,2),
    ahorro DECIMAL(10,2),
    porcentaje_descuento DECIMAL(5,2),
    
    -- Para consultas presenciales
    appointment_type VARCHAR(50),
    clinic_name VARCHAR(255),
    clinic_address TEXT,
    
    -- Estado del servicio
    status VARCHAR(30) DEFAULT 'completado' CHECK (status IN (
        'agendado', 'en_proceso', 'completado', 'cancelado', 'no_show'
    )),
    
    -- Satisfacción
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    feedback TEXT,
    
    -- Notas
    notes TEXT,
    notes_companion TEXT,
    
    -- Metadatos
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_service_usage_registration ON public.service_usage(registration_id);
CREATE INDEX idx_service_usage_beneficiary ON public.service_usage(beneficiary_id);
CREATE INDEX idx_service_usage_type ON public.service_usage(service_type);
CREATE INDEX idx_service_usage_date ON public.service_usage(service_date DESC);
CREATE INDEX idx_service_usage_status ON public.service_usage(status);

-- Trigger para updated_at
CREATE TRIGGER trigger_service_usage_updated
    BEFORE UPDATE ON public.service_usage
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Vista para calcular ahorros totales
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

-- RLS
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
