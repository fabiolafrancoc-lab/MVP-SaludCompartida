-- ════════════════════════════════════════════════════════════════════════════
-- TABLAS PARA INTEGRACIÓN CON SQUARE
-- ════════════════════════════════════════════════════════════════════════════
-- Propósito: Mantener historial completo de subscripciones y pagos de Square
-- Separado de registrations para tener un registro limpio de transacciones
-- ════════════════════════════════════════════════════════════════════════════

-- ┌────────────────────────────────────────────────────────────────────────┐
-- │ TABLA: square_customers                                                 │
-- │ Propósito: Mapeo entre usuarios de Supabase y Customers de Square      │
-- └────────────────────────────────────────────────────────────────────────┘
CREATE TABLE IF NOT EXISTS square_customers (
  id BIGSERIAL PRIMARY KEY,
  
  -- Referencia a registration
  registration_id BIGINT REFERENCES registrations(id) ON DELETE CASCADE,
  
  -- IDs de Square
  square_customer_id TEXT UNIQUE NOT NULL,
  square_card_id TEXT,
  
  -- Datos del customer
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_square_customers_registration ON square_customers(registration_id);
CREATE INDEX idx_square_customers_square_id ON square_customers(square_customer_id);
CREATE INDEX idx_square_customers_email ON square_customers(email);

-- ┌────────────────────────────────────────────────────────────────────────┐
-- │ TABLA: square_subscriptions                                            │
-- │ Propósito: Registro de todas las suscripciones creadas en Square       │
-- └────────────────────────────────────────────────────────────────────────┘
CREATE TABLE IF NOT EXISTS square_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  
  -- Relaciones
  registration_id BIGINT REFERENCES registrations(id) ON DELETE CASCADE,
  square_customer_id TEXT REFERENCES square_customers(square_customer_id) ON DELETE CASCADE,
  
  -- IDs de Square
  square_subscription_id TEXT UNIQUE NOT NULL,
  square_plan_variation_id TEXT NOT NULL,
  
  -- Estado de la suscripción
  status TEXT NOT NULL, -- ACTIVE, PAUSED, CANCELED, etc.
  
  -- Fechas importantes
  start_date DATE NOT NULL,
  canceled_date DATE,
  paused_date DATE,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_square_subscriptions_registration ON square_subscriptions(registration_id);
CREATE INDEX idx_square_subscriptions_customer ON square_subscriptions(square_customer_id);
CREATE INDEX idx_square_subscriptions_square_id ON square_subscriptions(square_subscription_id);
CREATE INDEX idx_square_subscriptions_status ON square_subscriptions(status);

-- ┌────────────────────────────────────────────────────────────────────────┐
-- │ TABLA: square_payments                                                  │
-- │ Propósito: Historial COMPLETO de todos los pagos (mensuales)          │
-- │ IMPORTANTE: Aquí se registran aprobaciones Y rechazos cada mes         │
-- └────────────────────────────────────────────────────────────────────────┘
CREATE TABLE IF NOT EXISTS square_payments (
  id BIGSERIAL PRIMARY KEY,
  
  -- Relaciones
  subscription_id BIGINT REFERENCES square_subscriptions(id) ON DELETE CASCADE,
  square_subscription_id TEXT NOT NULL,
  square_customer_id TEXT NOT NULL,
  
  -- IDs de Square
  square_payment_id TEXT,
  square_invoice_id TEXT,
  
  -- Detalles del pago
  amount_cents INTEGER NOT NULL, -- En centavos (ej: 1200 = $12.00)
  currency TEXT DEFAULT 'USD',
  
  -- Estado del pago
  status TEXT NOT NULL, -- COMPLETED, FAILED, PENDING, CANCELED
  payment_date DATE NOT NULL,
  
  -- Información de error (si falló)
  error_code TEXT,
  error_message TEXT,
  
  -- Metadata
  billing_period_start DATE,
  billing_period_end DATE,
  attempt_number INTEGER DEFAULT 1, -- Intento de cobro (1, 2, 3...)
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_square_payments_subscription ON square_payments(subscription_id);
CREATE INDEX idx_square_payments_square_subscription ON square_payments(square_subscription_id);
CREATE INDEX idx_square_payments_customer ON square_payments(square_customer_id);
CREATE INDEX idx_square_payments_status ON square_payments(status);
CREATE INDEX idx_square_payments_date ON square_payments(payment_date);
CREATE INDEX idx_square_payments_square_payment ON square_payments(square_payment_id);

-- ┌────────────────────────────────────────────────────────────────────────┐
-- │ TABLA: square_webhooks                                                  │
-- │ Propósito: Log de todos los webhooks recibidos de Square               │
-- └────────────────────────────────────────────────────────────────────────┘
CREATE TABLE IF NOT EXISTS square_webhooks (
  id BIGSERIAL PRIMARY KEY,
  
  -- Datos del webhook
  event_type TEXT NOT NULL, -- subscription.created, payment.updated, etc.
  square_event_id TEXT UNIQUE NOT NULL,
  
  -- Payload completo (para auditoría)
  payload JSONB NOT NULL,
  
  -- Estado de procesamiento
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMPTZ,
  processing_error TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_square_webhooks_event_type ON square_webhooks(event_type);
CREATE INDEX idx_square_webhooks_processed ON square_webhooks(processed);
CREATE INDEX idx_square_webhooks_created ON square_webhooks(created_at);

-- ┌────────────────────────────────────────────────────────────────────────┐
-- │ TRIGGERS: Actualizar updated_at automáticamente                        │
-- └────────────────────────────────────────────────────────────────────────┘
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_square_customers_updated_at
  BEFORE UPDATE ON square_customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_square_subscriptions_updated_at
  BEFORE UPDATE ON square_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_square_payments_updated_at
  BEFORE UPDATE ON square_payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ┌────────────────────────────────────────────────────────────────────────┐
-- │ VIEWS: Vistas útiles para consultas                                    │
-- └────────────────────────────────────────────────────────────────────────┘

-- Vista: Resumen de suscripciones activas con último pago
CREATE OR REPLACE VIEW active_subscriptions_summary AS
SELECT 
  s.id AS subscription_id,
  s.square_subscription_id,
  s.registration_id,
  r.migrant_email,
  r.migrant_first_name,
  r.migrant_last_name,
  s.status,
  s.start_date,
  c.square_customer_id,
  (
    SELECT p.status 
    FROM square_payments p 
    WHERE p.subscription_id = s.id 
    ORDER BY p.payment_date DESC 
    LIMIT 1
  ) AS last_payment_status,
  (
    SELECT p.payment_date 
    FROM square_payments p 
    WHERE p.subscription_id = s.id 
    ORDER BY p.payment_date DESC 
    LIMIT 1
  ) AS last_payment_date
FROM square_subscriptions s
LEFT JOIN registrations r ON s.registration_id = r.id
LEFT JOIN square_customers c ON s.square_customer_id = c.square_customer_id
WHERE s.status = 'ACTIVE';

-- Vista: Pagos fallidos que requieren atención
CREATE OR REPLACE VIEW failed_payments AS
SELECT 
  p.id,
  p.square_payment_id,
  p.payment_date,
  p.amount_cents,
  p.error_code,
  p.error_message,
  p.attempt_number,
  s.square_subscription_id,
  c.email,
  r.migrant_first_name,
  r.migrant_last_name
FROM square_payments p
LEFT JOIN square_subscriptions s ON p.subscription_id = s.id
LEFT JOIN square_customers c ON p.square_customer_id = c.square_customer_id
LEFT JOIN registrations r ON s.registration_id = r.id
WHERE p.status = 'FAILED'
ORDER BY p.payment_date DESC;

-- ════════════════════════════════════════════════════════════════════════════
-- COMENTARIOS
-- ════════════════════════════════════════════════════════════════════════════
COMMENT ON TABLE square_customers IS 'Mapeo entre registrations y Square Customers';
COMMENT ON TABLE square_subscriptions IS 'Registro de suscripciones activas/canceladas en Square';
COMMENT ON TABLE square_payments IS 'Historial COMPLETO de pagos mensuales (aprobados y rechazados)';
COMMENT ON TABLE square_webhooks IS 'Log de webhooks recibidos de Square para auditoría';
COMMENT ON VIEW active_subscriptions_summary IS 'Vista resumen de suscripciones activas con estado de último pago';
COMMENT ON VIEW failed_payments IS 'Pagos fallidos que requieren seguimiento';
