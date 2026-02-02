-- ════════════════════════════════════════════════════════════════════════════
-- AGREGAR CAMPOS DE SQUARE A LA TABLA REGISTRATIONS
-- ════════════════════════════════════════════════════════════════════════════
-- Ejecuta esto en Supabase SQL Editor
-- ════════════════════════════════════════════════════════════════════════════

ALTER TABLE registrations
ADD COLUMN IF NOT EXISTS square_customer_id TEXT,
ADD COLUMN IF NOT EXISTS square_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS square_card_id TEXT;

-- Crear índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_registrations_square_customer_id 
ON registrations(square_customer_id);

CREATE INDEX IF NOT EXISTS idx_registrations_square_subscription_id 
ON registrations(square_subscription_id);

-- Comentarios
COMMENT ON COLUMN registrations.square_customer_id IS 'ID del Customer en Square (para suscripciones)';
COMMENT ON COLUMN registrations.square_subscription_id IS 'ID de la Subscription en Square';
COMMENT ON COLUMN registrations.square_card_id IS 'ID de la tarjeta guardada en Square';
