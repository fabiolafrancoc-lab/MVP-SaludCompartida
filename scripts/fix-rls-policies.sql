-- Verificar y actualizar políticas RLS para permitir las nuevas columnas
-- Primero ver las políticas actuales
SELECT * FROM pg_policies WHERE tablename = 'registrations';

-- Desactivar RLS temporalmente para testing (SOLO EN DESARROLLO)
-- ALTER TABLE registrations DISABLE ROW LEVEL SECURITY;

-- O mejor: Crear política que permita INSERT con todas las columnas
DROP POLICY IF EXISTS "Permitir inserción pública" ON registrations;

CREATE POLICY "Permitir inserción pública" 
ON registrations 
FOR INSERT 
WITH CHECK (true);

-- Verificar que la política se creó
SELECT * FROM pg_policies WHERE tablename = 'registrations' AND policyname = 'Permitir inserción pública';
