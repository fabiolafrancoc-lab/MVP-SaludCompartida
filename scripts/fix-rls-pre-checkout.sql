-- Arreglar RLS para pre_checkout_customers
-- Permitir acceso público para INSERT/SELECT/UPDATE

-- Primero, eliminar políticas existentes
DROP POLICY IF EXISTS "Permitir INSERT desde app" ON pre_checkout_customers;
DROP POLICY IF EXISTS "Permitir SELECT desde app" ON pre_checkout_customers;
DROP POLICY IF EXISTS "Permitir UPDATE desde app" ON pre_checkout_customers;

-- Crear políticas que permiten acceso anónimo (sin autenticación)
CREATE POLICY "Enable insert for anon users" ON pre_checkout_customers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Enable select for anon users" ON pre_checkout_customers
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Enable update for anon users" ON pre_checkout_customers
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- También permitir para usuarios autenticados (por si acaso)
CREATE POLICY "Enable insert for authenticated users" ON pre_checkout_customers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users" ON pre_checkout_customers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable update for authenticated users" ON pre_checkout_customers
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Verificar que RLS está habilitado
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'pre_checkout_customers';

-- Verificar políticas creadas
SELECT 
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE tablename = 'pre_checkout_customers';
