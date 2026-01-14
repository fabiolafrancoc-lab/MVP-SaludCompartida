-- ============================================================================
-- PARTE 3: RLS y políticas (ejecutar DESPUÉS de step2)
-- ============================================================================

ALTER TABLE call_recordings ENABLE ROW LEVEL SECURITY;

-- Eliminar política si existe (para evitar error de duplicado)
DROP POLICY IF EXISTS "Service role bypass" ON call_recordings;

-- Crear política nueva
CREATE POLICY "Service role bypass" ON call_recordings
  FOR ALL
  USING (auth.role() = 'service_role');

-- Verificar
SELECT 'RLS configurado correctamente' as status;
