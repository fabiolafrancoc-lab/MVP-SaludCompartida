-- Ver el último registro con todos los datos demográficos
SELECT 
  id,
  migrant_first_name,
  migrant_gender,
  migrant_date_of_birth,
  family_first_name,
  family_gender,
  family_date_of_birth,
  family_phone,
  created_at
FROM registrations
ORDER BY created_at DESC
LIMIT 1;
