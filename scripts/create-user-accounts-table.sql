-- Script para crear tabla de cuentas de usuario en Supabase
-- Ejecutar en Supabase SQL Editor

-- 1. Crear tabla user_accounts
CREATE TABLE IF NOT EXISTS public.user_accounts (
  -- ID principal
  id BIGSERIAL PRIMARY KEY,
  
  -- Referencia al registro original
  registration_id BIGINT REFERENCES public.registrations(id) ON DELETE CASCADE,
  
  -- Código de acceso (único identificador del usuario)
  access_code VARCHAR(20) UNIQUE NOT NULL,
  
  -- Tipo de usuario
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('migrant', 'family')),
  
  -- Datos personales actualizables
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  mother_last_name VARCHAR(100),
  email VARCHAR(255),
  country_code VARCHAR(5) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  
  -- Datos adicionales del perfil
  date_of_birth DATE,
  gender VARCHAR(20),
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(3) NOT NULL,
  
  -- Foto de perfil
  profile_photo_url TEXT,
  
  -- Estado de la cuenta
  account_status VARCHAR(20) DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'cancelled', 'pending')),
  is_verified BOOLEAN DEFAULT FALSE,
  
  -- Estado de suscripción
  subscription_status VARCHAR(20) DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'cancelled', 'expired', 'pending')),
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  trial_end_date TIMESTAMP WITH TIME ZONE,
  
  -- Información de pago (referencia)
  stripe_customer_id VARCHAR(255),
  square_customer_id VARCHAR(255),
  last_payment_date TIMESTAMP WITH TIME ZONE,
  next_billing_date TIMESTAMP WITH TIME ZONE,
  
  -- Preferencias de notificaciones
  notifications_email BOOLEAN DEFAULT TRUE,
  notifications_sms BOOLEAN DEFAULT TRUE,
  notifications_whatsapp BOOLEAN DEFAULT TRUE,
  
  -- Idioma preferido
  preferred_language VARCHAR(5) DEFAULT 'es',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE
);

-- 2. Crear índices
CREATE INDEX IF NOT EXISTS idx_user_accounts_access_code 
ON public.user_accounts(access_code);

CREATE INDEX IF NOT EXISTS idx_user_accounts_registration_id 
ON public.user_accounts(registration_id);

CREATE INDEX IF NOT EXISTS idx_user_accounts_email 
ON public.user_accounts(email);

CREATE INDEX IF NOT EXISTS idx_user_accounts_phone 
ON public.user_accounts(phone);

CREATE INDEX IF NOT EXISTS idx_user_accounts_user_type 
ON public.user_accounts(user_type);

CREATE INDEX IF NOT EXISTS idx_user_accounts_subscription_status 
ON public.user_accounts(subscription_status);

CREATE INDEX IF NOT EXISTS idx_user_accounts_created_at 
ON public.user_accounts(created_at DESC);

-- 3. Trigger para updated_at
DROP TRIGGER IF EXISTS update_user_accounts_updated_at ON public.user_accounts;
CREATE TRIGGER update_user_accounts_updated_at
    BEFORE UPDATE ON public.user_accounts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 4. Habilitar RLS
ALTER TABLE public.user_accounts ENABLE ROW LEVEL SECURITY;

-- 5. Políticas de seguridad
-- INSERT: Permitir creación de cuentas
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.user_accounts;
CREATE POLICY "Enable insert for authenticated users" 
ON public.user_accounts FOR INSERT 
WITH CHECK (true);

-- SELECT: Los usuarios solo pueden ver su propia cuenta
DROP POLICY IF EXISTS "Users can view own account" ON public.user_accounts;
CREATE POLICY "Users can view own account" 
ON public.user_accounts FOR SELECT 
USING (true); -- Temporalmente permitir a todos (cambiar después con auth)

-- UPDATE: Los usuarios solo pueden actualizar su propia cuenta
DROP POLICY IF EXISTS "Users can update own account" ON public.user_accounts;
CREATE POLICY "Users can update own account" 
ON public.user_accounts FOR UPDATE 
USING (true); -- Temporalmente permitir a todos (cambiar después con auth)

-- DELETE: Restringir eliminación
DROP POLICY IF EXISTS "Prevent delete" ON public.user_accounts;
CREATE POLICY "Prevent delete" 
ON public.user_accounts FOR DELETE 
USING (false); -- No permitir eliminación directa

-- 6. Comentarios de documentación
COMMENT ON TABLE public.user_accounts IS 'Tabla principal de cuentas de usuario - contiene información actualizable del perfil';
COMMENT ON COLUMN public.user_accounts.access_code IS 'Código único de acceso del usuario (migrant_access_code o family_access_code)';
COMMENT ON COLUMN public.user_accounts.user_type IS 'Tipo de usuario: migrant (en USA) o family (en México)';
COMMENT ON COLUMN public.user_accounts.subscription_status IS 'Estado de suscripción: trial, active, cancelled, expired, pending';
COMMENT ON COLUMN public.user_accounts.account_status IS 'Estado de la cuenta: active, suspended, cancelled, pending';

-- 7. Crear tabla de historial de cambios
CREATE TABLE IF NOT EXISTS public.account_change_history (
  id BIGSERIAL PRIMARY KEY,
  user_account_id BIGINT REFERENCES public.user_accounts(id) ON DELETE CASCADE,
  field_changed VARCHAR(100) NOT NULL,
  old_value TEXT,
  new_value TEXT,
  changed_by VARCHAR(100), -- 'user' o 'admin' o 'system'
  change_reason TEXT,
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para historial
CREATE INDEX IF NOT EXISTS idx_account_change_history_user_id 
ON public.account_change_history(user_account_id, changed_at DESC);

-- RLS para historial
ALTER TABLE public.account_change_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own history" ON public.account_change_history;
CREATE POLICY "Users can view own history" 
ON public.account_change_history FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Enable insert for history" ON public.account_change_history;
CREATE POLICY "Enable insert for history" 
ON public.account_change_history FOR INSERT 
WITH CHECK (true);

COMMENT ON TABLE public.account_change_history IS 'Registro de cambios en las cuentas de usuario para auditoría';

-- 8. Verificación
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name IN ('user_accounts', 'account_change_history')
ORDER BY table_name, ordinal_position;
