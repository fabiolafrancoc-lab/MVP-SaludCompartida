-- Agregar columna gender a tabla dependents
-- Ejecutar en Supabase SQL Editor

-- 1. Agregar columna gender
ALTER TABLE public.dependents 
ADD COLUMN IF NOT EXISTS gender VARCHAR(10);

-- 2. Agregar comentario
COMMENT ON COLUMN public.dependents.gender IS 'Género del dependiente: male, female';

-- 3. Crear índice si se necesita filtrar por género
CREATE INDEX IF NOT EXISTS idx_dependents_gender 
ON public.dependents(gender) WHERE gender IS NOT NULL;

-- 4. Verificación
SELECT 
  column_name, 
  data_type, 
  character_maximum_length,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'dependents'
  AND column_name = 'gender';

SELECT '✅ Columna gender agregada exitosamente a tabla dependents' as mensaje;
