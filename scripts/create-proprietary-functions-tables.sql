-- ============================================
-- TABLAS PARA FUNCIONES PROPIETARIAS VAPI.AI
-- ============================================
-- Estas tablas soportan las funciones custom de los AI agents

-- TABLA 1: Citas de Telemedicina
CREATE TABLE IF NOT EXISTS telemedicine_appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT REFERENCES registrations(migrant_email),
  phone_number TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  reason TEXT NOT NULL,
  urgency_level TEXT DEFAULT 'normal' CHECK (urgency_level IN ('low', 'normal', 'high', 'emergency')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  created_via TEXT DEFAULT 'ai_voice_call',
  doctor_assigned TEXT,
  doctor_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_telemedicine_phone ON telemedicine_appointments(phone_number);
CREATE INDEX IF NOT EXISTS idx_telemedicine_date ON telemedicine_appointments(preferred_date);
CREATE INDEX IF NOT EXISTS idx_telemedicine_status ON telemedicine_appointments(status);
CREATE INDEX IF NOT EXISTS idx_telemedicine_urgency ON telemedicine_appointments(urgency_level);

-- TABLA 2: Consultas de Farmacia
CREATE TABLE IF NOT EXISTS pharmacy_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL,
  medication_name TEXT NOT NULL,
  medication_found BOOLEAN DEFAULT false,
  location TEXT,
  pharmacy_recommended TEXT,
  price_quoted DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_pharmacy_phone ON pharmacy_queries(phone_number);
CREATE INDEX IF NOT EXISTS idx_pharmacy_medication ON pharmacy_queries(medication_name);
CREATE INDEX IF NOT EXISTS idx_pharmacy_date ON pharmacy_queries(created_at);

-- TABLA 3: Catálogo de Medicamentos (para expandir)
CREATE TABLE IF NOT EXISTS medication_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  generic_name TEXT NOT NULL,
  brand_names TEXT[], -- Array de nombres comerciales
  description TEXT,
  price_regular DECIMAL(10,2),
  price_discounted DECIMAL(10,2),
  discount_percentage INTEGER,
  pharmacy TEXT NOT NULL,
  requires_prescription BOOLEAN DEFAULT false,
  generic_available BOOLEAN DEFAULT true,
  stock_status TEXT DEFAULT 'available' CHECK (stock_status IN ('available', 'limited', 'out_of_stock')),
  category TEXT, -- antibiótico, analgésico, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_medication_generic ON medication_catalog(generic_name);
CREATE INDEX IF NOT EXISTS idx_medication_pharmacy ON medication_catalog(pharmacy);
CREATE INDEX IF NOT EXISTS idx_medication_stock ON medication_catalog(stock_status);

-- TABLA 4: Verificaciones de Elegibilidad
CREATE TABLE IF NOT EXISTS eligibility_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL,
  service_type TEXT NOT NULL,
  eligible BOOLEAN,
  account_status TEXT,
  checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_eligibility_phone ON eligibility_checks(phone_number);
CREATE INDEX IF NOT EXISTS idx_eligibility_service ON eligibility_checks(service_type);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS
ALTER TABLE telemedicine_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE pharmacy_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE eligibility_checks ENABLE ROW LEVEL SECURITY;

-- Políticas: Permitir todo para service_role (backend)
CREATE POLICY "Allow all for service role" ON telemedicine_appointments
  FOR ALL USING (true);

CREATE POLICY "Allow all for service role" ON pharmacy_queries
  FOR ALL USING (true);

CREATE POLICY "Allow read for everyone" ON medication_catalog
  FOR SELECT USING (true);

CREATE POLICY "Allow all for service role" ON eligibility_checks
  FOR ALL USING (true);

-- ============================================
-- TRIGGERS PARA UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_telemedicine_updated_at
  BEFORE UPDATE ON telemedicine_appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_medication_updated_at
  BEFORE UPDATE ON medication_catalog
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DATOS INICIALES: Medicamentos Comunes
-- ============================================

INSERT INTO medication_catalog (generic_name, brand_names, description, price_regular, price_discounted, discount_percentage, pharmacy, requires_prescription, category) VALUES
  ('Paracetamol', ARRAY['Tempra', 'Tylenol'], 'Analgésico y antipirético', 45.00, 32.00, 30, 'Farmacia Guadalajara', false, 'analgésico'),
  ('Ibuprofeno', ARRAY['Advil', 'Motrin'], 'Antiinflamatorio no esteroideo', 60.00, 42.00, 30, 'Farmacia del Ahorro', false, 'antiinflamatorio'),
  ('Amoxicilina', ARRAY['Amoxil'], 'Antibiótico de amplio espectro', 180.00, 126.00, 30, 'Farmacias Similares', true, 'antibiótico'),
  ('Losartán', ARRAY['Cozaar'], 'Antihipertensivo', 220.00, 154.00, 30, 'Farmacia San Pablo', true, 'cardiovascular'),
  ('Metformina', ARRAY['Glucophage'], 'Antidiabético oral', 95.00, 67.00, 30, 'Farmacias del Ahorro', true, 'antidiabético'),
  ('Omeprazol', ARRAY['Prilosec'], 'Inhibidor de bomba de protones', 150.00, 105.00, 30, 'Farmacias Benavides', false, 'gastrointestinal'),
  ('Enalapril', ARRAY['Vasotec'], 'Antihipertensivo IECA', 85.00, 60.00, 30, 'Farmacia Guadalajara', true, 'cardiovascular'),
  ('Atorvastatina', ARRAY['Lipitor'], 'Estatina para colesterol', 280.00, 196.00, 30, 'Farmacia San Pablo', true, 'cardiovascular'),
  ('Salbutamol', ARRAY['Ventolin'], 'Broncodilatador para asma', 120.00, 84.00, 30, 'Farmacias del Ahorro', true, 'respiratorio'),
  ('Loratadina', ARRAY['Claritin'], 'Antihistamínico para alergias', 75.00, 53.00, 30, 'Farmacias Similares', false, 'antihistamínico')
ON CONFLICT DO NOTHING;

-- ============================================
-- VISTAS ÚTILES
-- ============================================

-- Vista: Citas pendientes
CREATE OR REPLACE VIEW pending_appointments AS
SELECT 
  id,
  phone_number,
  preferred_date,
  preferred_time,
  reason,
  urgency_level,
  created_at
FROM telemedicine_appointments
WHERE status = 'pending'
ORDER BY urgency_level DESC, preferred_date ASC;

-- Vista: Medicamentos más consultados
CREATE OR REPLACE VIEW popular_medications AS
SELECT 
  medication_name,
  COUNT(*) as query_count,
  COUNT(CASE WHEN medication_found = true THEN 1 END) as found_count
FROM pharmacy_queries
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY medication_name
ORDER BY query_count DESC
LIMIT 20;

COMMIT;
