-- =============================================
-- TABLA: subscriptions
-- Descripción: Suscripciones activas de usuarios
-- =============================================

CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Información de la suscripción
    plan_type VARCHAR(50) NOT NULL DEFAULT 'monthly' CHECK (plan_type IN ('monthly', 'quarterly', 'annual')),
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'suspended', 'trial')),
    
    -- Precio y moneda
    amount DECIMAL(10, 2) NOT NULL DEFAULT 12.00,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    
    -- Información de pago
    payment_method VARCHAR(50) DEFAULT 'Square', -- 'Square', 'stripe', 'paypal', etc.
    payment_id VARCHAR(255), -- ID del pago en Square/Stripe
    last_payment_date TIMESTAMPTZ,
    next_billing_date TIMESTAMPTZ,
    
    -- Fechas
    trial_start_date TIMESTAMPTZ,
    trial_end_date TIMESTAMPTZ,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    cancelled_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    
    -- Límites del plan
    max_beneficiaries INTEGER NOT NULL DEFAULT 4,
    max_calls_per_month INTEGER DEFAULT 12, -- 3 llamadas por beneficiario (4 beneficiarios)
    
    -- Metadatos
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Índice único por usuario activo
    CONSTRAINT unique_active_subscription_per_user UNIQUE(user_id, status)
);

-- Índices
CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_subscriptions_next_billing ON public.subscriptions(next_billing_date) WHERE status = 'active';

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_subscriptions_updated
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security)
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscriptions"
    ON public.subscriptions FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own subscriptions"
    ON public.subscriptions FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own subscriptions"
    ON public.subscriptions FOR UPDATE
    USING (user_id = auth.uid());
