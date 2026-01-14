-- ============================================================================
-- PARTE 5: Trigger (ejecutar DESPUÉS de step4)
-- ============================================================================

CREATE OR REPLACE FUNCTION update_recordings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_recordings_timestamp ON call_recordings;

CREATE TRIGGER trigger_update_recordings_timestamp
  BEFORE UPDATE ON call_recordings
  FOR EACH ROW
  EXECUTE FUNCTION update_recordings_updated_at();

-- Verificar
SELECT 'Trigger creado correctamente' as status;
