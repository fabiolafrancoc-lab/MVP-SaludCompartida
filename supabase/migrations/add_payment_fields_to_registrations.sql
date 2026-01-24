-- =============================================
-- Agregar campos de pago a registrations si no existen
-- =============================================

-- Campos de pago
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50);

ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS payment_id VARCHAR(255);

ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS plan_type VARCHAR(50) DEFAULT 'monthly';

ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS amount DECIMAL(10, 2);

ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS currency VARCHAR(3) DEFAULT 'USD';

-- Índice para búsquedas por payment_id
CREATE INDEX IF NOT EXISTS idx_registrations_payment_id ON public.registrations(payment_id);

-- Comentarios
COMMENT ON COLUMN public.registrations.payment_method IS 'Método de pago usado: Square, Stripe, etc.';
COMMENT ON COLUMN public.registrations.payment_id IS 'ID del pago en Square/Stripe';
COMMENT ON COLUMN public.registrations.plan_type IS 'Tipo de plan: monthly, quarterly, annual';
COMMENT ON COLUMN public.registrations.amount IS 'Monto pagado';
COMMENT ON COLUMN public.registrations.currency IS 'Moneda del pago';
