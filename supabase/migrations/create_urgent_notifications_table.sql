-- =============================================
-- TABLA: urgent_notifications
-- Alertas que requieren acción inmediata
-- CORREGIDO: registration_id BIGINT
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
    
    -- Estado
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
        'pending', 'acknowledged', 'in_progress', 'resolved', 'escalated'
    )),
    
    -- Acciones
    acknowledged_at TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ,
    resolution_notes TEXT,
    
    -- Notificaciones enviadas
    notified_migrant BOOLEAN DEFAULT false,
    notified_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_urgent_notifications_pending ON public.urgent_notifications(created_at DESC, status)
    WHERE status = 'pending';
CREATE INDEX idx_urgent_notifications_priority ON public.urgent_notifications(priority DESC)
    WHERE status IN ('pending', 'acknowledged');
CREATE INDEX idx_urgent_notifications_registration ON public.urgent_notifications(registration_id);
