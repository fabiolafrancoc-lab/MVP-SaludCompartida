-- Crear tabla para guardar datos ANTES del pago con Stripe
-- Esta tabla almacena la información del migrante en USA antes de procesar el pago

CREATE TABLE IF NOT EXISTS pre_checkout_customers (
  id BIGSERIAL PRIMARY KEY,
  
  -- Información del migrante (USA)
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL, -- Formato: +15551234567
  country TEXT DEFAULT 'USA',
  
  -- Estado del proceso
  status TEXT DEFAULT 'pending_payment', -- pending_payment, payment_completed, payment_failed
  
  -- Tracking
  traffic_source TEXT,
  stripe_session_id TEXT, -- Se actualiza después del pago
  stripe_customer_id TEXT, -- Se actualiza después del pago
  stripe_subscription_id TEXT, -- Se actualiza después del pago
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  payment_completed_at TIMESTAMP WITH TIME ZONE
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_pre_checkout_email ON pre_checkout_customers(email);
CREATE INDEX IF NOT EXISTS idx_pre_checkout_phone ON pre_checkout_customers(phone);
CREATE INDEX IF NOT EXISTS idx_pre_checkout_status ON pre_checkout_customers(status);
CREATE INDEX IF NOT EXISTS idx_pre_checkout_stripe_session ON pre_checkout_customers(stripe_session_id);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_pre_checkout_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS trigger_update_pre_checkout_updated_at ON pre_checkout_customers;
CREATE TRIGGER trigger_update_pre_checkout_updated_at
  BEFORE UPDATE ON pre_checkout_customers
  FOR EACH ROW
  EXECUTE FUNCTION update_pre_checkout_updated_at();

-- Habilitar Row Level Security (RLS)
ALTER TABLE pre_checkout_customers ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT desde la app (usando anon key)
CREATE POLICY "Permitir INSERT desde app" ON pre_checkout_customers
  FOR INSERT
  WITH CHECK (true);

-- Política para permitir SELECT desde la app
CREATE POLICY "Permitir SELECT desde app" ON pre_checkout_customers
  FOR SELECT
  USING (true);

-- Política para permitir UPDATE desde la app (para actualizar con datos de Stripe)
CREATE POLICY "Permitir UPDATE desde app" ON pre_checkout_customers
  FOR UPDATE
  USING (true);

-- Comentarios en la tabla
COMMENT ON TABLE pre_checkout_customers IS 'Almacena datos del migrante ANTES de procesar pago con Stripe';
COMMENT ON COLUMN pre_checkout_customers.status IS 'pending_payment, payment_completed, payment_failed';
COMMENT ON COLUMN pre_checkout_customers.stripe_session_id IS 'ID de la sesión de Stripe Checkout';
COMMENT ON COLUMN pre_checkout_customers.stripe_customer_id IS 'ID del customer en Stripe';
COMMENT ON COLUMN pre_checkout_customers.stripe_subscription_id IS 'ID de la suscripción en Stripe';

-- Verificar que todo se creó correctamente
SELECT 
  'Tabla pre_checkout_customers creada exitosamente' as mensaje,
  COUNT(*) as total_registros
FROM pre_checkout_customers;
