-- ════════════════════════════════════════════════════════════════════════════
-- AGREGAR COLUMNAS DE SQUARE A TABLA registrations
-- ════════════════════════════════════════════════════════════════════════════
-- Ejecutar en: Supabase SQL Editor
-- ════════════════════════════════════════════════════════════════════════════

ALTER TABLE registrations
ADD COLUMN IF NOT EXISTS square_customer_id TEXT,
ADD COLUMN IF NOT EXISTS square_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS square_card_id TEXT;

-- Crear índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_registrations_square_customer 
ON registrations(square_customer_id);

CREATE INDEX IF NOT EXISTS idx_registrations_square_subscription 
ON registrations(square_subscription_id);

-- Verificar columnas agregadas
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'registrations'
  AND column_name LIKE 'square%'
ORDER BY column_name;
