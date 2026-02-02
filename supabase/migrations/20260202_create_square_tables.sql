-- ════════════════════════════════════════════════════════════════════════════
-- TABLAS DE SQUARE - MISMA NOMENCLATURA QUE REGISTRATIONS
-- ════════════════════════════════════════════════════════════════════════════
-- Propósito: Mantener historial completo de clientes, suscripciones y pagos
-- Nomenclatura: migrant_* (suscriptor en USA), family_* (beneficiario en México)
-- ════════════════════════════════════════════════════════════════════════════

-- ════════════════════════════════════════════════════════════════════════════
-- 1. TABLA: square_customers
-- ════════════════════════════════════════════════════════════════════════════
-- Descripción: Clientes creados en Square (uno por registration)
-- Relación: 1 registration = 1 square_customer
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS square_customers (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Relación con registrations
  registration_id BIGINT NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
  
  -- IDs de Square
  square_customer_id TEXT NOT NULL UNIQUE,
  square_card_id TEXT,
  
  -- ════════════════════════════════════════════════════════════
  -- DATOS DEL MIGRANTE (SUSCRIPTOR - USA)
  -- ════════════════════════════════════════════════════════════
  migrant_email TEXT NOT NULL,
  migrant_first_name TEXT,
  migrant_last_name TEXT,
  migrant_phone TEXT,
  migrant_code TEXT,
  
  -- ════════════════════════════════════════════════════════════
  -- DATOS DE LA FAMILIA (BENEFICIARIO - MÉXICO)
  -- ════════════════════════════════════════════════════════════
  family_primary_email TEXT,
  family_first_name TEXT,
  family_code TEXT,
  
  -- ════════════════════════════════════════════════════════════
  -- COMPAÑERA ASIGNADA
  -- ════════════════════════════════════════════════════════════
  assigned_companion_id BIGINT REFERENCES ai_companions(id)
);

CREATE INDEX idx_square_customers_registration ON square_customers(registration_id);
CREATE INDEX idx_square_customers_square_id ON square_customers(square_customer_id);
CREATE INDEX idx_square_customers_migrant_email ON square_customers(migrant_email);

-- ════════════════════════════════════════════════════════════════════════════
-- 2. TABLA: square_subscriptions
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS square_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  registration_id BIGINT NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
  square_customer_id TEXT NOT NULL,
  
  square_subscription_id TEXT NOT NULL UNIQUE,
  square_plan_variation_id TEXT NOT NULL,
  
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  start_date DATE NOT NULL,
  canceled_date DATE,
  paused_date DATE,
  
  next_billing_date DATE,
  
  cancellation_reason TEXT,
  pause_reason TEXT
);

CREATE INDEX idx_square_subscriptions_registration ON square_subscriptions(registration_id);
CREATE INDEX idx_square_subscriptions_customer ON square_subscriptions(square_customer_id);
CREATE INDEX idx_square_subscriptions_square_id ON square_subscriptions(square_subscription_id);
CREATE INDEX idx_square_subscriptions_status ON square_subscriptions(status);

-- ════════════════════════════════════════════════════════════════════════════
-- 3. TABLA: square_payments
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS square_payments (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  subscription_id BIGINT REFERENCES square_subscriptions(id) ON DELETE CASCADE,
  square_subscription_id TEXT NOT NULL,
  square_customer_id TEXT NOT NULL,
  
  square_payment_id TEXT,
  square_invoice_id TEXT,
  
  amount_cents INTEGER NOT NULL,
  status TEXT NOT NULL,
  payment_date DATE NOT NULL,
  
  billing_period_start DATE NOT NULL,
  billing_period_end DATE,
  
  error_code TEXT,
  error_message TEXT,
  
  attempt_number INTEGER DEFAULT 1,
  
  square_raw_response JSONB
);

CREATE INDEX idx_square_payments_subscription ON square_payments(subscription_id);
CREATE INDEX idx_square_payments_square_subscription ON square_payments(square_subscription_id);
CREATE INDEX idx_square_payments_customer ON square_payments(square_customer_id);
CREATE INDEX idx_square_payments_status ON square_payments(status);
CREATE INDEX idx_square_payments_date ON square_payments(payment_date);
CREATE INDEX idx_square_payments_billing_period ON square_payments(billing_period_start);

-- ════════════════════════════════════════════════════════════════════════════
-- RLS POLICIES
-- ════════════════════════════════════════════════════════════════════════════

ALTER TABLE square_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE square_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE square_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only" ON square_customers FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role only" ON square_subscriptions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role only" ON square_payments FOR ALL USING (auth.role() = 'service_role');
