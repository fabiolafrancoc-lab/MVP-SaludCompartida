-- =============================================
-- PRE-CHECKOUT TABLE (ACTUALIZADO PARA SQUARE)
-- Captura leads de Landing (Page 1) antes de registro completo
-- Permite remarketing a usuarios que abandonan
-- =============================================

CREATE TABLE IF NOT EXISTS pre_checkout (
  id BIGSERIAL PRIMARY KEY,
  
  -- Datos mínimos de Page 1 (Landing)
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country_code TEXT DEFAULT '+1',
  
  -- Tracking
  traffic_source TEXT,  -- 'facebook', 'instagram', 'tiktok', 'google', 'organic'
  landing_page TEXT,    -- URL de donde vino
  utm_campaign TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  
  -- Conversion tracking
  converted BOOLEAN DEFAULT FALSE,
  registration_id BIGINT REFERENCES registrations(id) ON DELETE SET NULL,
  converted_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_pre_checkout_email ON pre_checkout(email);
CREATE INDEX IF NOT EXISTS idx_pre_checkout_converted ON pre_checkout(converted, created_at);
CREATE INDEX IF NOT EXISTS idx_pre_checkout_traffic ON pre_checkout(traffic_source, created_at);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_pre_checkout_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS trigger_update_pre_checkout_updated_at ON pre_checkout;
CREATE TRIGGER trigger_update_pre_checkout_updated_at
  BEFORE UPDATE ON pre_checkout
  FOR EACH ROW
  EXECUTE FUNCTION update_pre_checkout_updated_at();

-- RLS Policies (Row Level Security)
ALTER TABLE pre_checkout ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (landing page es pública)
CREATE POLICY "Anyone can insert pre_checkout" ON pre_checkout
  FOR INSERT
  WITH CHECK (true);

-- Policy: Solo service role puede leer/actualizar
CREATE POLICY "Service role can read pre_checkout" ON pre_checkout
  FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can update pre_checkout" ON pre_checkout
  FOR UPDATE
  USING (auth.role() = 'service_role');

-- Comentarios para documentación
COMMENT ON TABLE pre_checkout IS 'Captura leads de landing page antes de registro completo. Permite remarketing.';
COMMENT ON COLUMN pre_checkout.converted IS 'TRUE cuando el lead completa registro y pago';
COMMENT ON COLUMN pre_checkout.registration_id IS 'FK a registrations cuando convierte';
COMMENT ON COLUMN pre_checkout.traffic_source IS 'Canal de adquisición: facebook, instagram, tiktok, google, organic';

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
