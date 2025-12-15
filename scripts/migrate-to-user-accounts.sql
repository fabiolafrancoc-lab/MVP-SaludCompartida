-- Script para migrar registros existentes a user_accounts
-- Ejecutar DESPUÉS de crear la tabla user_accounts

-- Función para crear cuentas de usuario desde registros existentes
CREATE OR REPLACE FUNCTION migrate_registrations_to_accounts()
RETURNS INTEGER AS $$
DECLARE
  reg RECORD;
  migrant_account_id BIGINT;
  family_account_id BIGINT;
  total_created INTEGER := 0;
BEGIN
  -- Iterar sobre todos los registros
  FOR reg IN SELECT * FROM public.registrations ORDER BY created_at
  LOOP
    -- Crear cuenta para MIGRANTE
    INSERT INTO public.user_accounts (
      registration_id,
      access_code,
      user_type,
      first_name,
      last_name,
      mother_last_name,
      email,
      country_code,
      phone,
      country,
      subscription_status,
      trial_end_date,
      created_at
    ) VALUES (
      reg.id,
      reg.migrant_access_code,
      'migrant',
      reg.migrant_first_name,
      reg.migrant_last_name,
      reg.migrant_mother_last_name,
      reg.migrant_email,
      reg.migrant_country_code,
      reg.migrant_phone,
      'US', -- Migrante en USA
      'trial', -- Estado inicial
      reg.created_at + INTERVAL '30 days', -- 30 días de trial
      reg.created_at
    )
    ON CONFLICT (access_code) DO NOTHING
    RETURNING id INTO migrant_account_id;
    
    IF FOUND THEN
      total_created := total_created + 1;
    END IF;
    
    -- Crear cuenta para FAMILIAR
    INSERT INTO public.user_accounts (
      registration_id,
      access_code,
      user_type,
      first_name,
      last_name,
      mother_last_name,
      email,
      country_code,
      phone,
      country,
      subscription_status,
      trial_end_date,
      created_at
    ) VALUES (
      reg.id,
      reg.family_access_code,
      'family',
      reg.family_first_name,
      reg.family_last_name,
      reg.family_mother_last_name,
      reg.family_email,
      reg.family_country_code,
      reg.family_phone,
      reg.family_country,
      'trial',
      reg.created_at + INTERVAL '30 days',
      reg.created_at
    )
    ON CONFLICT (access_code) DO NOTHING
    RETURNING id INTO family_account_id;
    
    IF FOUND THEN
      total_created := total_created + 1;
    END IF;
    
  END LOOP;
  
  RETURN total_created;
END;
$$ LANGUAGE plpgsql;

-- Ejecutar migración
SELECT migrate_registrations_to_accounts() as cuentas_creadas;

-- Verificar resultados
SELECT 
  user_type,
  COUNT(*) as total_cuentas,
  COUNT(CASE WHEN subscription_status = 'trial' THEN 1 END) as en_trial,
  COUNT(CASE WHEN subscription_status = 'active' THEN 1 END) as activas
FROM public.user_accounts
GROUP BY user_type;

-- Ver muestra de cuentas creadas
SELECT 
  access_code,
  user_type,
  first_name,
  last_name,
  email,
  phone,
  subscription_status,
  created_at
FROM public.user_accounts
ORDER BY created_at DESC
LIMIT 10;
