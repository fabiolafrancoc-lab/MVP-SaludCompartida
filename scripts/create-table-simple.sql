-- Script simplificado para crear la tabla registrations
-- Compatible con UUID (basado en el esquema que creaste anteriormente)

CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  
  -- Datos del migrante (USA)
  migrant_first_name TEXT NOT NULL,
  migrant_last_name TEXT NOT NULL,
  migrant_mother_last_name TEXT,
  migrant_email TEXT NOT NULL,
  migrant_country_code TEXT DEFAULT '+1',
  migrant_phone TEXT NOT NULL,
  migrant_access_code TEXT UNIQUE NOT NULL,
  
  -- Datos del familiar (México u otro país)
  family_first_name TEXT NOT NULL,
  family_last_name TEXT NOT NULL,
  family_mother_last_name TEXT,
  family_email TEXT,
  family_country_code TEXT DEFAULT '+52',
  family_phone TEXT NOT NULL,
  family_access_code TEXT UNIQUE NOT NULL,
  family_country TEXT,
  
  -- Datos opcionales de servicio
  service_start_date DATE,
  service_end_date DATE,
  
  -- Control de códigos enviados
  codes_sent BOOLEAN DEFAULT FALSE,
  codes_sent_at TIMESTAMPTZ
);

-- Crear índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_migrant_access_code ON public.registrations(migrant_access_code);
CREATE INDEX IF NOT EXISTS idx_family_access_code ON public.registrations(migrant_access_code);
CREATE INDEX IF NOT EXISTS idx_migrant_phone ON public.registrations(migrant_phone);
CREATE INDEX IF NOT EXISTS idx_family_phone ON public.registrations(family_phone);

-- Habilitar Row Level Security
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso (permitir INSERT, SELECT y UPDATE públicos para el prototipo)
DROP POLICY IF EXISTS "Allow public insert" ON public.registrations;
CREATE POLICY "Allow public insert" ON public.registrations
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select" ON public.registrations;
CREATE POLICY "Allow public select" ON public.registrations
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow public update" ON public.registrations;
CREATE POLICY "Allow public update" ON public.registrations
  FOR UPDATE
  USING (true);

-- Verificar que se creó correctamente
SELECT 
  'Tabla creada exitosamente' as status,
  COUNT(*) as total_columnas
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'registrations';
