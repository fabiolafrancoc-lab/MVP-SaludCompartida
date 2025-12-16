-- Agregar columnas de fecha de nacimiento a la tabla registrations
-- Ejecutar en Supabase SQL Editor

-- Agregar columna date_of_birth para el migrante
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS migrant_date_of_birth DATE;

-- Agregar columna date_of_birth para el familiar
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS family_date_of_birth DATE;

-- Agregar comentarios
COMMENT ON COLUMN public.registrations.migrant_date_of_birth IS 'Fecha de nacimiento del migrante (USA)';
COMMENT ON COLUMN public.registrations.family_date_of_birth IS 'Fecha de nacimiento del familiar (México)';

-- Verificar que se agregaron correctamente
SELECT 
  '✅ Columnas de fecha de nacimiento agregadas exitosamente' as mensaje,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'registrations'
  AND column_name IN ('migrant_date_of_birth', 'family_date_of_birth')
ORDER BY column_name;
