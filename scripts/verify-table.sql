-- Script para verificar si la tabla registrations existe y tiene la estructura correcta

-- 1. Verificar si la tabla existe
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'registrations'
) as table_exists;

-- 2. Si existe, mostrar su estructura
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'registrations'
ORDER BY ordinal_position;

-- 3. Verificar los registros existentes (si la tabla existe)
SELECT COUNT(*) as total_registros
FROM public.registrations;

-- 4. Mostrar algunos registros de ejemplo
SELECT 
  id,
  migrant_first_name,
  migrant_last_name,
  migrant_phone,
  family_first_name,
  family_last_name,
  family_phone,
  created_at
FROM public.registrations
ORDER BY created_at DESC
LIMIT 5;
