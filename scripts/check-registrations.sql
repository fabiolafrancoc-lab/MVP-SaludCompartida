-- Ver todos los registros en la tabla
SELECT 
  id,
  migrant_first_name,
  migrant_phone,
  migrant_country_code,
  migrant_access_code,
  family_first_name,
  family_phone,
  family_country_code,
  family_access_code,
  created_at
FROM public.registrations
ORDER BY created_at DESC
LIMIT 10;
