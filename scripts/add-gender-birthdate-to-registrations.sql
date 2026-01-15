-- Agregar columnas de género y fecha de nacimiento a la tabla registrations
-- Esto permite asignación inteligente de agentes AI basada en demografía

-- Agregar columna de género del migrante (M o F)
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS migrant_gender VARCHAR(1) CHECK (migrant_gender IN ('M', 'F'));

-- Agregar columna de fecha de nacimiento del migrante
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS migrant_birthdate DATE;

-- Agregar columna de género del familiar en México (M o F)
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS family_gender VARCHAR(1) CHECK (family_gender IN ('M', 'F'));

-- Agregar columna de fecha de nacimiento del familiar en México
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS family_birthdate DATE;

-- Crear índice para búsquedas por edad (calculada desde birthdate)
CREATE INDEX IF NOT EXISTS idx_family_birthdate ON registrations(family_birthdate);
CREATE INDEX IF NOT EXISTS idx_family_gender ON registrations(family_gender);

-- Comentarios de documentación
COMMENT ON COLUMN registrations.migrant_gender IS 'Género del migrante: M (Masculino) o F (Femenino)';
COMMENT ON COLUMN registrations.migrant_birthdate IS 'Fecha de nacimiento del migrante para asignación inteligente de agente AI';
COMMENT ON COLUMN registrations.family_gender IS 'Género del familiar en México: M (Masculino) o F (Femenino)';
COMMENT ON COLUMN registrations.family_birthdate IS 'Fecha de nacimiento del familiar para asignación inteligente de agente AI';

-- Vista para calcular edades automáticamente
CREATE OR REPLACE VIEW registrations_with_ages AS
SELECT 
  *,
  EXTRACT(YEAR FROM AGE(CURRENT_DATE, migrant_birthdate)) AS migrant_age,
  EXTRACT(YEAR FROM AGE(CURRENT_DATE, family_birthdate)) AS family_age
FROM registrations;

COMMENT ON VIEW registrations_with_ages IS 'Vista con edades calculadas automáticamente desde las fechas de nacimiento';
