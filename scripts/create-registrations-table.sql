-- Script para crear la tabla registrations en Supabase
-- Ejecutar en Supabase SQL Editor

-- 1. Crear la tabla principal
CREATE TABLE IF NOT EXISTS public.registrations (
  -- Columna ID principal
  id BIGSERIAL PRIMARY KEY,
  
  -- Datos del MIGRANTE (USA)
  migrant_first_name VARCHAR(100) NOT NULL,
  migrant_last_name VARCHAR(100) NOT NULL,
  migrant_mother_last_name VARCHAR(100),
  migrant_email VARCHAR(255) NOT NULL,
  migrant_country_code VARCHAR(5) DEFAULT '+1',
  migrant_phone VARCHAR(20) NOT NULL,
  migrant_access_code VARCHAR(20) UNIQUE NOT NULL,
  
  -- Datos del FAMILIAR (México)
  family_first_name VARCHAR(100) NOT NULL,
  family_last_name VARCHAR(100) NOT NULL,
  family_mother_last_name VARCHAR(100),
  family_email VARCHAR(255),
  family_country_code VARCHAR(5) DEFAULT '+52',
  family_phone VARCHAR(20) NOT NULL,
  family_access_code VARCHAR(20) UNIQUE NOT NULL,
  family_country VARCHAR(3) DEFAULT 'MX',
  
  -- Columnas de control de envío de códigos
  codes_sent BOOLEAN DEFAULT NULL,
  codes_sent_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear índices para mejorar el rendimiento de búsquedas
CREATE INDEX IF NOT EXISTS idx_registrations_migrant_access_code 
ON public.registrations(migrant_access_code);

CREATE INDEX IF NOT EXISTS idx_registrations_family_access_code 
ON public.registrations(family_access_code);

CREATE INDEX IF NOT EXISTS idx_registrations_migrant_phone 
ON public.registrations(migrant_phone);

CREATE INDEX IF NOT EXISTS idx_registrations_family_phone 
ON public.registrations(family_phone);

CREATE INDEX IF NOT EXISTS idx_registrations_migrant_email 
ON public.registrations(migrant_email);

CREATE INDEX IF NOT EXISTS idx_registrations_codes_sent 
ON public.registrations(codes_sent, created_at);

CREATE INDEX IF NOT EXISTS idx_registrations_created_at 
ON public.registrations(created_at DESC);

-- 3. Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Crear trigger para updated_at
DROP TRIGGER IF EXISTS update_registrations_updated_at ON public.registrations;
CREATE TRIGGER update_registrations_updated_at
    BEFORE UPDATE ON public.registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Habilitar Row Level Security (RLS)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- 6. Crear políticas de seguridad
-- Política para INSERT: permitir a usuarios autenticados y anónimos
DROP POLICY IF EXISTS "Enable insert for all users" ON public.registrations;
CREATE POLICY "Enable insert for all users" 
ON public.registrations FOR INSERT 
WITH CHECK (true);

-- Política para SELECT: permitir a todos leer
DROP POLICY IF EXISTS "Enable read access for all users" ON public.registrations;
CREATE POLICY "Enable read access for all users" 
ON public.registrations FOR SELECT 
USING (true);

-- Política para UPDATE: permitir actualizaciones (para codes_sent)
DROP POLICY IF EXISTS "Enable update for all users" ON public.registrations;
CREATE POLICY "Enable update for all users" 
ON public.registrations FOR UPDATE 
USING (true);

-- 7. Verificar que la tabla se creó correctamente
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'registrations'
ORDER BY ordinal_position;

-- 8. Mostrar resumen
SELECT 
  'Tabla creada exitosamente' AS status,
  COUNT(*) AS total_columns
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'registrations';
