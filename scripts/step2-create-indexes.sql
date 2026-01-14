-- ============================================================================
-- PARTE 2: Crear índices (ejecutar DESPUÉS de step1)
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_recordings_agent ON call_recordings(agent_id);
CREATE INDEX IF NOT EXISTS idx_recordings_user ON call_recordings(user_id);
CREATE INDEX IF NOT EXISTS idx_recordings_date ON call_recordings(recording_date DESC);
CREATE INDEX IF NOT EXISTS idx_recordings_quality ON call_recordings(analysis_quality_rating DESC) WHERE analysis_quality_rating >= 4;
CREATE INDEX IF NOT EXISTS idx_recordings_category ON call_recordings(analysis_category);
CREATE INDEX IF NOT EXISTS idx_recordings_tags ON call_recordings USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_recordings_training ON call_recordings(is_training_example) WHERE is_training_example = TRUE;

-- Verificar
SELECT 'Índices creados correctamente' as status;
