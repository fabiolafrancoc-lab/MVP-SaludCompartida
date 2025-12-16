-- Agregar columna de fecha de nacimiento a la tabla dependents
-- Ejecutar en Supabase SQL Editor

-- Agregar columna date_of_birth
ALTER TABLE public.dependents 
ADD COLUMN IF NOT EXISTS date_of_birth DATE;

-- Agregar comentario
COMMENT ON COLUMN public.dependents.date_of_birth IS 'Fecha de nacimiento del dependiente';

-- Verificar que se agregó correctamente
SELECT 
  '✅ Columna date_of_birth agregada exitosamente' as mensaje,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'dependents'
  AND column_name = 'date_of_birth';
