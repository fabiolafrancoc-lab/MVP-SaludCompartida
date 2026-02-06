-- =============================================
-- MIGRACIÓN COMPLETA: Todas las columnas necesarias
-- =============================================
-- Este script agrega todas las columnas necesarias a la tabla `registrations`
-- para que el flujo de registro y login funcione correctamente.
--
-- INSTRUCCIONES:
-- 1. Ir a https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/sql/new
-- 2. Copiar y pegar este SQL completo
-- 3. Ejecutar (Run o Ctrl/Cmd + Enter)
-- 4. Verificar en Table Editor que todas las columnas se crearon
--
-- SEGURIDAD: Este script usa IF NOT EXISTS para ser idempotente
-- (seguro ejecutarlo múltiples veces sin errores)
-- =============================================

-- 1. CÓDIGOS DE ACCESO
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS migrant_code VARCHAR(6);
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS family_code VARCHAR(6);

-- 2. DATOS DEL MIGRANTE (USA)
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS migrant_first_name VARCHAR(100);
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS migrant_last_name VARCHAR(100);
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS migrant_mother_last_name VARCHAR(100);
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS migrant_sex VARCHAR(1) CHECK (migrant_sex IN ('M', 'F'));
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS migrant_birthdate DATE;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS migrant_email VARCHAR(255);
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS migrant_country_code VARCHAR(5) DEFAULT '+1';
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS migrant_phone VARCHAR(20);

-- 3. DATOS DEL USUARIO EN MÉXICO (FAMILY)
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS family_first_name VARCHAR(100);
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS family_last_name VARCHAR(100);
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS family_mother_last_name VARCHAR(100);
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS family_sex VARCHAR(1) CHECK (family_sex IN ('M', 'F'));
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS family_birthdate DATE;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS family_email VARCHAR(255);
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS family_country_code VARCHAR(5) DEFAULT '+52';
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS family_phone VARCHAR(20);
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS family_country VARCHAR(2) DEFAULT 'MX';

-- 4. COMPANION Y STATUS
-- Renombrar companion_assigned si existe, o crear family_companion_assigned
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'registrations' AND column_name = 'companion_assigned'
  ) THEN
    ALTER TABLE registrations RENAME COLUMN companion_assigned TO family_companion_assigned;
  ELSIF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'registrations' AND column_name = 'family_companion_assigned'
  ) THEN
    ALTER TABLE registrations ADD COLUMN family_companion_assigned VARCHAR(20);
  END IF;
END $$;

ALTER TABLE registrations ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending_payment';
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN DEFAULT false;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMP;

-- 5. PAGOS (SQUARE)
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS square_order_id VARCHAR(100);
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS square_payment_id VARCHAR(100);
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS payment_completed_at TIMESTAMP;

-- 6. TRACKING
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- 7. ÍNDICES (para búsquedas rápidas)
CREATE UNIQUE INDEX IF NOT EXISTS idx_migrant_code ON registrations(migrant_code);
CREATE UNIQUE INDEX IF NOT EXISTS idx_family_code ON registrations(family_code);
CREATE INDEX IF NOT EXISTS idx_migrant_email ON registrations(migrant_email);
CREATE INDEX IF NOT EXISTS idx_family_email ON registrations(family_email);
CREATE INDEX IF NOT EXISTS idx_status ON registrations(status);
CREATE INDEX IF NOT EXISTS idx_family_companion ON registrations(family_companion_assigned);
CREATE INDEX IF NOT EXISTS idx_family_birthdate ON registrations(family_birthdate);

-- 8. COMENTARIOS (documentación)
COMMENT ON COLUMN registrations.migrant_code IS 'Código de acceso único para el MIGRANTE (USA) - 6 caracteres alfanuméricos';
COMMENT ON COLUMN registrations.family_code IS 'Código de acceso único para el USUARIO EN MÉXICO - 6 caracteres alfanuméricos';
COMMENT ON COLUMN registrations.family_companion_assigned IS 'Companion asignado: lupita (55+) o fernanda (<55)';
COMMENT ON COLUMN registrations.status IS 'Estados: pending_payment, active, cancelled, expired';
COMMENT ON COLUMN registrations.family_birthdate IS 'Fecha de nacimiento del usuario en México (para asignar companion)';
COMMENT ON COLUMN registrations.migrant_birthdate IS 'Fecha de nacimiento del migrante';

-- 9. VERIFICACIÓN: Mostrar todas las columnas creadas
SELECT 
  column_name, 
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'registrations'
ORDER BY column_name;
