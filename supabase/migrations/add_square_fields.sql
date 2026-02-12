-- ════════════════════════════════════════════════════════════════════════════
-- Migración: Agregar campos de Square a la tabla registrations
-- ════════════════════════════════════════════════════════════════════════════
-- Fecha: 2026-02-02
-- Propósito: Guardar IDs de Square Customer, Subscription y Card
-- ════════════════════════════════════════════════════════════════════════════

-- Agregar columnas para guardar IDs de Square
ALTER TABLE registrations
ADD COLUMN IF NOT EXISTS square_customer_id TEXT,
ADD COLUMN IF NOT EXISTS square_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS square_card_id TEXT;

-- Crear índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_registrations_square_customer 
ON registrations(square_customer_id);

CREATE INDEX IF NOT EXISTS idx_registrations_square_subscription 
ON registrations(square_subscription_id);

-- Comentarios para documentación
COMMENT ON COLUMN registrations.square_customer_id IS 'Square Customer ID (ej: CUSTOMER123...)';
COMMENT ON COLUMN registrations.square_subscription_id IS 'Square Subscription ID (ej: SUBSCRIPTION123...)';
COMMENT ON COLUMN registrations.square_card_id IS 'Square Card ID (ej: CARD123...)';
