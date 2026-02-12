-- ============================================
-- AGREGAR CAMPOS REQUERIDOS PARA LAD API
-- Fecha: Febrero 2026
-- Propósito: Integración con Llamando al Doctor
-- ============================================

-- Agregar campos de sexo y fecha de nacimiento
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS family_sex TEXT CHECK (family_sex IN ('M', 'F')),
ADD COLUMN IF NOT EXISTS family_birthdate DATE,
ADD COLUMN IF NOT EXISTS migrant_sex TEXT CHECK (migrant_sex IN ('M', 'F')),
ADD COLUMN IF NOT EXISTS migrant_birthdate DATE;

-- Comentarios para documentación
COMMENT ON COLUMN registrations.family_sex IS 'Sexo del familiar en México: M (Masculino) o F (Femenino)';
COMMENT ON COLUMN registrations.family_birthdate IS 'Fecha de nacimiento del familiar en México (formato: YYYY-MM-DD)';
COMMENT ON COLUMN registrations.migrant_sex IS 'Sexo del migrante en USA: M (Masculino) o F (Femenino)';
COMMENT ON COLUMN registrations.migrant_birthdate IS 'Fecha de nacimiento del migrante en USA (formato: YYYY-MM-DD)';

-- Verificar que las columnas se agregaron correctamente
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'registrations'
AND column_name IN ('family_sex', 'family_birthdate', 'migrant_sex', 'migrant_birthdate');
