-- Crear tabla para dependientes/familiares en México
-- Esta tabla permite guardar hasta 3-4 familiares por cada migrante
-- Ejecutar en Supabase SQL Editor

-- 1. Crear tabla de dependientes
CREATE TABLE IF NOT EXISTS public.dependents (
  id BIGSERIAL PRIMARY KEY,
  
  -- Relación con el usuario (migrante)
  user_access_code VARCHAR(20) NOT NULL,
  
  -- Datos del dependiente
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  mother_last_name VARCHAR(100),
  
  -- Relación con el titular
  relationship VARCHAR(50), -- Mamá, Papá, Hijo/a, etc.
  
  -- Datos de contacto (opcional)
  phone VARCHAR(20),
  email VARCHAR(255),
  
  -- Control
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear índices
CREATE INDEX IF NOT EXISTS idx_dependents_user_code 
ON public.dependents(user_access_code);

CREATE INDEX IF NOT EXISTS idx_dependents_active 
ON public.dependents(user_access_code, is_active);

CREATE INDEX IF NOT EXISTS idx_dependents_created 
ON public.dependents(created_at DESC);

-- 3. Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Trigger para updated_at
DROP TRIGGER IF EXISTS update_dependents_updated_at ON public.dependents;
CREATE TRIGGER update_dependents_updated_at
    BEFORE UPDATE ON public.dependents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Habilitar RLS
ALTER TABLE public.dependents ENABLE ROW LEVEL SECURITY;

-- 6. Políticas de seguridad
-- INSERT: Permitir inserción
DROP POLICY IF EXISTS "Enable insert for all users" ON public.dependents;
CREATE POLICY "Enable insert for all users" 
ON public.dependents FOR INSERT 
WITH CHECK (true);

-- SELECT: Permitir lectura
DROP POLICY IF EXISTS "Enable read for all users" ON public.dependents;
CREATE POLICY "Enable read for all users" 
ON public.dependents FOR SELECT 
USING (true);

-- UPDATE: Permitir actualización
DROP POLICY IF EXISTS "Enable update for all users" ON public.dependents;
CREATE POLICY "Enable update for all users" 
ON public.dependents FOR UPDATE 
USING (true);

-- DELETE: Permitir eliminación (soft delete preferible)
DROP POLICY IF EXISTS "Enable delete for all users" ON public.dependents;
CREATE POLICY "Enable delete for all users" 
ON public.dependents FOR DELETE 
USING (true);

-- 7. Comentarios
COMMENT ON TABLE public.dependents IS 'Dependientes/familiares en México asociados a cada migrante';
COMMENT ON COLUMN public.dependents.user_access_code IS 'Código de acceso del migrante titular';
COMMENT ON COLUMN public.dependents.relationship IS 'Relación familiar: Mamá, Papá, Hijo/a, Hermano/a, etc.';
COMMENT ON COLUMN public.dependents.is_active IS 'Indica si el dependiente está activo (soft delete)';

-- 8. Verificación
SELECT 
  '✅ Tabla dependents creada exitosamente' as mensaje,
  COUNT(*) as total_columnas
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'dependents';
