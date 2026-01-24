-- =============================================
-- TABLA: medical_history
-- Historial médico de cada beneficiario
-- CORREGIDO: sin user_id, usa beneficiary → registration
-- =============================================

CREATE TABLE IF NOT EXISTS public.medical_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    beneficiary_id UUID NOT NULL REFERENCES public.beneficiaries(id) ON DELETE CASCADE,
    
    -- Tipo de registro
    record_type VARCHAR(50) NOT NULL CHECK (record_type IN (
        'condicion_cronica', 'alergia', 'cirugia', 'hospitalizacion',
        'vacuna', 'medicamento_actual', 'antecedente_familiar',
        'consulta', 'estudio', 'receta'
    )),
    
    -- Detalles del registro
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_evento DATE,
    fecha_diagnostico DATE,
    
    -- Para condiciones crónicas
    is_chronic BOOLEAN DEFAULT false,
    severity VARCHAR(20) CHECK (severity IN ('leve', 'moderado', 'severo', 'controlado')),
    
    -- Medicamentos relacionados
    medicamentos JSONB,
    
    -- Doctor/Institución
    doctor_nombre VARCHAR(255),
    institucion VARCHAR(255),
    
    -- Documentos adjuntos
    documentos_urls TEXT[],
    
    -- Notas de Lupita
    notas_companion TEXT,
    
    -- Estado
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    
    -- Metadatos
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by VARCHAR(50) DEFAULT 'user',
    source VARCHAR(50) DEFAULT 'manual'
);

-- Índices
CREATE INDEX idx_medical_history_beneficiary ON public.medical_history(beneficiary_id);
CREATE INDEX idx_medical_history_type ON public.medical_history(record_type);
CREATE INDEX idx_medical_history_chronic ON public.medical_history(is_chronic) WHERE is_chronic = true;
CREATE INDEX idx_medical_history_date ON public.medical_history(fecha_evento DESC);

-- Trigger para updated_at
CREATE TRIGGER trigger_medical_history_updated
    BEFORE UPDATE ON public.medical_history
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS: acceso basado en email de registrations
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
