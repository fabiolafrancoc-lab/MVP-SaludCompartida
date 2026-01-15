-- Ver todos los usuarios registrados con cálculo de edad y agente asignado
WITH user_ages AS (
  SELECT 
    id,
    family_first_name,
    family_last_name,
    family_phone,
    family_gender,
    family_date_of_birth,
    EXTRACT(YEAR FROM AGE(family_date_of_birth)) as age,
    created_at
  FROM registrations
  WHERE family_date_of_birth IS NOT NULL
)
SELECT 
  family_phone as telefono,
  family_first_name || ' ' || family_last_name as nombre_completo,
  family_gender as genero,
  age as edad,
  CASE 
    -- Hombres mayores de 60
    WHEN family_gender = 'M' AND age >= 60 THEN 
      CASE MOD(ABS(HASHTEXT(family_phone)), 2)
        WHEN 0 THEN 'Don Roberto (67 años)'
        ELSE 'Don Miguel (63 años)'
      END
    -- Mujeres mayores de 60
    WHEN family_gender = 'F' AND age >= 60 THEN 
      CASE MOD(ABS(HASHTEXT(family_phone)), 4)
        WHEN 0 THEN 'Lupita (65 años)'
        WHEN 1 THEN 'Carmen (62 años)'
        WHEN 2 THEN 'Rosa (68 años)'
        ELSE 'Teresa (64 años)'
      END
    -- Mujeres menores de 40
    WHEN family_gender = 'F' AND age < 40 THEN 
      CASE MOD(ABS(HASHTEXT(family_phone)), 4)
        WHEN 0 THEN 'María (32 años)'
        WHEN 1 THEN 'Ana (35 años)'
        WHEN 2 THEN 'Sofía (29 años)'
        ELSE 'Daniela (38 años)'
      END
    -- Hombres menores de 60 -> mujeres jóvenes
    WHEN family_gender = 'M' AND age < 60 THEN 
      CASE MOD(ABS(HASHTEXT(family_phone)), 4)
        WHEN 0 THEN 'María (32 años)'
        WHEN 1 THEN 'Ana (35 años)'
        WHEN 2 THEN 'Sofía (29 años)'
        ELSE 'Daniela (38 años)'
      END
    -- Mujeres entre 40-59 -> cualquier mujer
    WHEN family_gender = 'F' AND age >= 40 AND age < 60 THEN 
      CASE MOD(ABS(HASHTEXT(family_phone)), 8)
        WHEN 0 THEN 'Lupita (65 años)'
        WHEN 1 THEN 'Carmen (62 años)'
        WHEN 2 THEN 'Rosa (68 años)'
        WHEN 3 THEN 'Teresa (64 años)'
        WHEN 4 THEN 'María (32 años)'
        WHEN 5 THEN 'Ana (35 años)'
        WHEN 6 THEN 'Sofía (29 años)'
        ELSE 'Daniela (38 años)'
      END
    ELSE 'Sin asignar'
  END as agente_asignado,
  created_at as fecha_registro
FROM user_ages
ORDER BY created_at DESC;
