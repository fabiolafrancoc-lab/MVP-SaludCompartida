-- Script para corregir el número de teléfono del migrante en un registro específico
-- ID del registro: 19e721a5-ca42-42b2-8e4b-c6bc1dd2a8bd
-- Teléfono correcto: +1 3055227150

-- Paso 1: Verificar el registro actual (antes de modificar)
SELECT 
  id,
  migrant_first_name,
  migrant_last_name,
  migrant_phone,
  migrant_country_code,
  migrant_access_code,
  created_at
FROM public.registrations
WHERE id = '19e721a5-ca42-42b2-8e4b-c6bc1dd2a8bd';

-- Paso 2: Actualizar el número de teléfono del migrante
-- IMPORTANTE: El teléfono debe estar sin espacios ni guiones (solo dígitos)
UPDATE public.registrations
SET 
  migrant_phone = '3055227150',
  migrant_country_code = '+1'
WHERE id = '19e721a5-ca42-42b2-8e4b-c6bc1dd2a8bd';

-- Paso 3: Verificar que se actualizó correctamente
SELECT 
  id,
  migrant_first_name,
  migrant_last_name,
  migrant_phone,
  migrant_country_code,
  migrant_access_code,
  created_at
FROM public.registrations
WHERE id = '19e721a5-ca42-42b2-8e4b-c6bc1dd2a8bd';
