-- ============================================================================
-- TABLA: Priority Queue Cache
-- ============================================================================
-- Guarda la cola de prioridades calculada cada hora
-- para acceso rápido sin recalcular

CREATE TABLE IF NOT EXISTS priority_queue_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  queue_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsqueda rápida por fecha
CREATE INDEX IF NOT EXISTS idx_priority_queue_date 
ON priority_queue_cache(date DESC);

-- ============================================================================
-- TABLA: Escalations (para tracking de escalaciones)
-- ============================================================================

CREATE TABLE IF NOT EXISTS escalations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_phone TEXT NOT NULL,
  user_name TEXT,
  
  -- Tipo de escalación
  escalation_type TEXT NOT NULL CHECK (escalation_type IN (
    'churn_risk',
    'frustrated_user',
    'complex_payment',
    'user_requested',
    'ai_confidence_low'
  )),
  
  -- Prioridad
  priority TEXT NOT NULL CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  
  -- Estado
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending',
    'assigned',
    'in_progress',
    'resolved',
    'cancelled'
  )),
  
  -- Detalles
  reason TEXT NOT NULL,
  full_context JSONB,
  
  -- Asignación
  assigned_to TEXT,
  assigned_at TIMESTAMPTZ,
  
  -- Resolución
  resolved_at TIMESTAMPTZ,
  resolution_notes TEXT,
  outcome TEXT, -- 'retained', 'lost', 'upgraded', etc.
  
  -- Deadline
  deadline TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para consultas comunes
CREATE INDEX IF NOT EXISTS idx_escalations_status 
ON escalations(status) WHERE status IN ('pending', 'assigned');

CREATE INDEX IF NOT EXISTS idx_escalations_priority 
ON escalations(priority DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_escalations_user 
ON escalations(user_phone);

-- ============================================================================
-- TABLA: AI Brain Metrics (métricas del sistema)
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_brain_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_date DATE NOT NULL,
  
  -- Prediction accuracy
  churn_predictions_made INTEGER DEFAULT 0,
  churn_predictions_accurate INTEGER DEFAULT 0,
  churn_false_positives INTEGER DEFAULT 0,
  churn_false_negatives INTEGER DEFAULT 0,
  
  -- Script effectiveness
  scripts_generated INTEGER DEFAULT 0,
  avg_script_quality_score DECIMAL(3,2),
  scripts_requiring_escalation INTEGER DEFAULT 0,
  
  -- System utilization
  calls_prioritized_auto INTEGER DEFAULT 0,
  calls_prioritized_manual INTEGER DEFAULT 0,
  automation_rate DECIMAL(5,2),
  
  -- Experiments
  experiments_running INTEGER DEFAULT 0,
  experiments_completed INTEGER DEFAULT 0,
  experiments_with_winner INTEGER DEFAULT 0,
  
  -- Overall health
  system_health_score DECIMAL(3,2), -- 0-5
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice por fecha
CREATE INDEX IF NOT EXISTS idx_brain_metrics_date 
ON ai_brain_metrics(metric_date DESC);

-- ============================================================================
-- FUNCIÓN: Actualizar updated_at automáticamente
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_priority_queue_cache_updated_at
  BEFORE UPDATE ON priority_queue_cache
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_escalations_updated_at
  BEFORE UPDATE ON escalations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VISTA: Escalations Summary
-- ============================================================================

CREATE OR REPLACE VIEW escalations_summary AS
SELECT 
  status,
  priority,
  COUNT(*) as count,
  AVG(EXTRACT(EPOCH FROM (COALESCE(resolved_at, NOW()) - created_at)) / 3600) as avg_hours_to_resolve
FROM escalations
GROUP BY status, priority
ORDER BY 
  CASE priority
    WHEN 'CRITICAL' THEN 1
    WHEN 'HIGH' THEN 2
    WHEN 'MEDIUM' THEN 3
    WHEN 'LOW' THEN 4
  END,
  status;

-- ============================================================================
-- FUNCIÓN: Get System Health Metrics
-- ============================================================================

CREATE OR REPLACE FUNCTION get_system_health()
RETURNS TABLE (
  metric_name TEXT,
  metric_value DECIMAL,
  status TEXT,
  description TEXT
) AS $$
BEGIN
  RETURN QUERY
  WITH latest_metrics AS (
    SELECT * FROM ai_brain_metrics
    ORDER BY metric_date DESC
    LIMIT 1
  )
  SELECT 
    'Automation Rate'::TEXT,
    m.automation_rate,
    CASE 
      WHEN m.automation_rate >= 90 THEN 'EXCELLENT'
      WHEN m.automation_rate >= 75 THEN 'GOOD'
      WHEN m.automation_rate >= 60 THEN 'FAIR'
      ELSE 'NEEDS IMPROVEMENT'
    END::TEXT,
    'Percentage of calls prioritized automatically'::TEXT
  FROM latest_metrics m
  UNION ALL
  SELECT 
    'Churn Prediction Accuracy'::TEXT,
    CASE 
      WHEN m.churn_predictions_made > 0 
      THEN (m.churn_predictions_accurate::DECIMAL / m.churn_predictions_made * 100)
      ELSE 0 
    END,
    CASE 
      WHEN m.churn_predictions_made = 0 THEN 'NO DATA'
      WHEN (m.churn_predictions_accurate::DECIMAL / m.churn_predictions_made) >= 0.8 THEN 'EXCELLENT'
      WHEN (m.churn_predictions_accurate::DECIMAL / m.churn_predictions_made) >= 0.65 THEN 'GOOD'
      ELSE 'NEEDS IMPROVEMENT'
    END::TEXT,
    'Accuracy of churn risk predictions'::TEXT
  FROM latest_metrics m
  UNION ALL
  SELECT 
    'Escalation Rate'::TEXT,
    CASE 
      WHEN m.scripts_generated > 0 
      THEN (m.scripts_requiring_escalation::DECIMAL / m.scripts_generated * 100)
      ELSE 0 
    END,
    CASE 
      WHEN m.scripts_generated = 0 THEN 'NO DATA'
      WHEN (m.scripts_requiring_escalation::DECIMAL / m.scripts_generated) <= 0.1 THEN 'EXCELLENT'
      WHEN (m.scripts_requiring_escalation::DECIMAL / m.scripts_generated) <= 0.2 THEN 'GOOD'
      ELSE 'HIGH'
    END::TEXT,
    'Percentage of calls requiring human intervention'::TEXT
  FROM latest_metrics m;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- COMENTARIOS
-- ============================================================================

COMMENT ON TABLE priority_queue_cache IS 
'Cache de la cola de prioridades calculada por el AI Brain. Se actualiza cada hora.';

COMMENT ON TABLE escalations IS 
'Tracking de todas las escalaciones a humanos. Incluye razón, prioridad, estado y resolución.';

COMMENT ON TABLE ai_brain_metrics IS 
'Métricas diarias del rendimiento del AI Brain para monitoreo y auto-tuning.';

COMMENT ON VIEW escalations_summary IS 
'Resumen de escalaciones por estado y prioridad con tiempo promedio de resolución.';

COMMENT ON FUNCTION get_system_health IS 
'Obtiene métricas clave de salud del sistema con interpretación de estado.';
