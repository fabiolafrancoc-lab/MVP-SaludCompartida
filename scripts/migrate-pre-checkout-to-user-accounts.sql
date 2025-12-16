-- Migrar datos de pre_checkout_customers a user_accounts
-- Este script crea cuentas de usuario SOLO para migrantes que YA PAGARON
-- Ejecutar DESPUÉS de crear la tabla user_accounts

CREATE OR REPLACE FUNCTION migrate_pre_checkout_to_accounts()
RETURNS TABLE(
  total_migrated INTEGER,
  migrant_accounts_created INTEGER
) AS $$
DECLARE
  v_migrant_count INTEGER := 0;
BEGIN
  -- Insertar cuentas de migrantes desde pre_checkout_customers
  -- Solo migramos los que ya completaron el pago
  INSERT INTO public.user_accounts (
    -- Información básica
    user_type,
    first_name,
    last_name,
    email,
    phone,
    country_code,
    country,
    
    -- Access code (generamos uno temporal basado en el email)
    access_code,
    
    -- Estado de suscripción
    subscription_status,
    subscription_start_date,
    trial_end_date,
    
    -- Referencias de pago
    stripe_customer_id,
    stripe_subscription_id,
    
    -- Notificaciones (habilitamos email por defecto)
    email_notifications_enabled,
    sms_notifications_enabled,
    whatsapp_notifications_enabled,
    
    -- Timestamps
    created_at,
    updated_at
  )
  SELECT 
    -- user_type
    'migrant' as user_type,
    
    -- Información básica del migrante
    pc.first_name,
    pc.last_name,
    pc.email,
    pc.phone,
    '+1' as country_code, -- USA
    COALESCE(pc.country, 'USA') as country,
    
    -- Access code temporal (basado en primeras letras + timestamp)
    UPPER(
      SUBSTRING(pc.first_name FROM 1 FOR 2) || 
      SUBSTRING(pc.last_name FROM 1 FOR 2) || 
      TO_CHAR(pc.created_at, 'DDMMHH24MI')
    ) as access_code,
    
    -- Estado de suscripción
    CASE 
      WHEN pc.status = 'payment_completed' THEN 'trial'
      ELSE 'inactive'
    END as subscription_status,
    
    pc.payment_completed_at as subscription_start_date,
    
    -- 30 días de trial desde el pago
    (pc.payment_completed_at + INTERVAL '30 days') as trial_end_date,
    
    -- Referencias de Stripe
    pc.stripe_customer_id,
    pc.stripe_subscription_id,
    
    -- Notificaciones (solo email habilitado)
    true as email_notifications_enabled,
    false as sms_notifications_enabled,
    false as whatsapp_notifications_enabled,
    
    -- Timestamps
    pc.created_at,
    NOW() as updated_at
    
  FROM public.pre_checkout_customers pc
  WHERE pc.status = 'payment_completed'
    AND pc.stripe_customer_id IS NOT NULL
  ON CONFLICT (access_code) DO NOTHING; -- Evitar duplicados
  
  GET DIAGNOSTICS v_migrant_count = ROW_COUNT;
  
  -- Retornar resultados
  RETURN QUERY SELECT v_migrant_count, v_migrant_count;
  
END;
$$ LANGUAGE plpgsql;

-- Ejecutar la migración
SELECT * FROM migrate_pre_checkout_to_accounts();

-- Verificar resultados
SELECT 
  '=== RESUMEN DE MIGRACIÓN ===' as titulo,
  '' as valor
UNION ALL
SELECT 
  'Total de migrantes migrados:' as titulo,
  COUNT(*)::TEXT as valor
FROM public.user_accounts
WHERE user_type = 'migrant'
UNION ALL
SELECT 
  'Cuentas activas en trial:' as titulo,
  COUNT(*)::TEXT as valor
FROM public.user_accounts
WHERE user_type = 'migrant' 
  AND subscription_status = 'trial'
UNION ALL
SELECT 
  'Con Stripe Customer ID:' as titulo,
  COUNT(*)::TEXT as valor
FROM public.user_accounts
WHERE user_type = 'migrant' 
  AND stripe_customer_id IS NOT NULL;

-- Mostrar algunas cuentas creadas
SELECT 
  user_type,
  first_name,
  last_name,
  email,
  phone,
  access_code,
  subscription_status,
  trial_end_date,
  created_at
FROM public.user_accounts
WHERE user_type = 'migrant'
ORDER BY created_at DESC
LIMIT 10;
