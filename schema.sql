-- =============================================
-- SALUDCOMPARTIDA MVP DATABASE SCHEMA
-- PostgreSQL / Supabase
-- SIMPLE VERSION - NO AUTH REQUIRED
-- =============================================

-- Drop existing tables if they exist (clean slate)
DROP TABLE IF EXISTS savings_records CASCADE;
DROP TABLE IF EXISTS service_usage CASCADE;
DROP TABLE IF EXISTS family_members CASCADE;
DROP TABLE IF EXISTS registrations CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Registrations Table (Main)
CREATE TABLE registrations (
  id BIGSERIAL PRIMARY KEY,
  codigo_familia VARCHAR(10) UNIQUE NOT NULL,
  
  -- Suscriptor (Migrant in USA)
  migrant_name VARCHAR(100) NOT NULL,
  migrant_email VARCHAR(255) NOT NULL,
  migrant_phone VARCHAR(20) NOT NULL,
  migrant_state VARCHAR(2) NOT NULL,
  
  -- Usuario Principal (Family in Mexico)
  principal_name VARCHAR(100) NOT NULL,
  principal_phone VARCHAR(20) NOT NULL,
  principal_relationship VARCHAR(20) NOT NULL,
  
  -- Plan
  plan_id VARCHAR(20) NOT NULL,
  plan_name VARCHAR(50) NOT NULL,
  plan_price DECIMAL(10, 2) NOT NULL,
  
  -- Square Payment Info
  square_customer_id VARCHAR(100),
  square_subscription_id VARCHAR(100),
  square_payment_id VARCHAR(100),
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending' NOT NULL,
  activated_at TIMESTAMPTZ,
  last_payment_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  CONSTRAINT valid_status CHECK (status IN ('pending', 'active', 'cancelled', 'expired', 'paused')),
  CONSTRAINT valid_plan CHECK (plan_id IN ('basic', 'premium'))
);

-- Family Members Table
CREATE TABLE family_members (
  id BIGSERIAL PRIMARY KEY,
  registration_id BIGINT NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
  
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  relationship VARCHAR(20) NOT NULL,
  is_principal BOOLEAN DEFAULT FALSE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Service Usage Table
CREATE TABLE service_usage (
  id BIGSERIAL PRIMARY KEY,
  registration_id BIGINT NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
  family_member_id BIGINT REFERENCES family_members(id) ON DELETE SET NULL,
  
  service_type VARCHAR(20) NOT NULL,
  description TEXT,
  amount_paid DECIMAL(10, 2) DEFAULT 0,
  amount_saved DECIMAL(10, 2) DEFAULT 0,
  
  used_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  CONSTRAINT valid_service_type CHECK (service_type IN ('telemedicina', 'farmacia', 'terapia', 'especialista', 'examen', 'otro'))
);

-- Savings Records Table
CREATE TABLE savings_records (
  id BIGSERIAL PRIMARY KEY,
  registration_id BIGINT NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
  
  month VARCHAR(7) NOT NULL,
  telemedicina_savings DECIMAL(10, 2) DEFAULT 0,
  farmacia_savings DECIMAL(10, 2) DEFAULT 0,
  terapia_savings DECIMAL(10, 2) DEFAULT 0,
  otros_savings DECIMAL(10, 2) DEFAULT 0,
  total_savings DECIMAL(10, 2) DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  UNIQUE(registration_id, month)
);

-- Indexes
CREATE INDEX idx_registrations_email ON registrations(migrant_email);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_codigo ON registrations(codigo_familia);
CREATE INDEX idx_family_members_registration ON family_members(registration_id);
CREATE INDEX idx_service_usage_registration ON service_usage(registration_id);
CREATE INDEX idx_savings_registration_month ON savings_records(registration_id, month DESC);

-- RLS Policies (Disabled for MVP - we use service_role key)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_records ENABLE ROW LEVEL SECURITY;

-- Allow service_role full access
CREATE POLICY "Service role full access registrations" ON registrations FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access family_members" ON family_members FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access service_usage" ON service_usage FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access savings_records" ON savings_records FOR ALL USING (auth.role() = 'service_role');

-- Triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON registrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_family_members_updated_at BEFORE UPDATE ON family_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_savings_records_updated_at BEFORE UPDATE ON savings_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
