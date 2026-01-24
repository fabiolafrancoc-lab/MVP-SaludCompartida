-- =============================================
-- TABLA: scheduled_callbacks
-- Callbacks programados automáticamente
-- CORREGIDO: registration_id BIGINT
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
    
    -- Para el worker
    processed_at TIMESTAMPTZ,
    error_message TEXT,
    resulting_call_id UUID REFERENCES public.companion_calls(id),
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_scheduled_callbacks_pending ON public.scheduled_callbacks(scheduled_for, status) 
    WHERE status = 'pending';
CREATE INDEX idx_scheduled_callbacks_registration ON public.scheduled_callbacks(registration_id);
