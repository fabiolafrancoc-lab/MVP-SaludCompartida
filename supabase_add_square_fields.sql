-- ════════════════════════════════════════════════════════════════════════════
-- MIGRACIÓN: Agregar campos de Square Subscriptions a tabla registrations
-- ════════════════════════════════════════════════════════════════════════════
-- Ejecutar en: Supabase SQL Editor
-- https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/sql
-- ════════════════════════════════════════════════════════════════════════════

-- Agregar columnas para Square Customer, Card y Subscription
ALTER TABLE registrations
ADD COLUMN IF NOT EXISTS square_customer_id TEXT,
ADD COLUMN IF NOT EXISTS square_card_id TEXT,
ADD COLUMN IF NOT EXISTS square_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT;

-- Crear índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_registrations_square_customer_id 
  ON registrations(square_customer_id);

CREATE INDEX IF NOT EXISTS idx_registrations_square_subscription_id 
  ON registrations(square_subscription_id);

-- Comentarios para documentación
COMMENT ON COLUMN registrations.square_customer_id IS 'ID del customer creado en Square';
COMMENT ON COLUMN registrations.square_card_id IS 'ID de la tarjeta guardada en Square';
COMMENT ON COLUMN registrations.square_subscription_id IS 'ID de la suscripción activa en Square';
COMMENT ON COLUMN registrations.subscription_status IS 'Estado de la suscripción: ACTIVE, CANCELED, PAUSED, etc.';
