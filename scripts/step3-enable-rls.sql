-- ============================================================================
-- PARTE 3: RLS y políticas (ejecutar DESPUÉS de step2)
-- ============================================================================

ALTER TABLE call_recordings ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Service role bypass" ON call_recordings
  FOR ALL
  USING (auth.role() = 'service_role');

-- Verificar
SELECT 'RLS configurado correctamente' as status;
