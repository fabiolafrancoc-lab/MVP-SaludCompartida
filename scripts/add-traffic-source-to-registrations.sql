-- ============================================
-- AGREGAR TRACKING DE REDES SOCIALES A REGISTRATIONS
-- ============================================

-- 1. Agregar columna traffic_source si no existe
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS traffic_source TEXT;

-- 2. Agregar columnas UTM si no existen
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS utm_source TEXT,
ADD COLUMN IF NOT EXISTS utm_medium TEXT,
ADD COLUMN IF NOT EXISTS utm_campaign TEXT;

-- 3. Crear índices para queries rápidas
CREATE INDEX IF NOT EXISTS idx_registrations_traffic_source 
ON registrations(traffic_source);

CREATE INDEX IF NOT EXISTS idx_registrations_created_at 
ON registrations(created_at DESC);

-- 4. Comentarios para documentación
COMMENT ON COLUMN registrations.traffic_source IS 'Canal de origen: facebook, instagram, tiktok, google, whatsapp, direct, etc.';
COMMENT ON COLUMN registrations.utm_source IS 'UTM Source parameter from URL';
COMMENT ON COLUMN registrations.utm_medium IS 'UTM Medium parameter from URL';
COMMENT ON COLUMN registrations.utm_campaign IS 'UTM Campaign parameter from URL';

-- ============================================
-- QUERIES PARA ANÁLISIS DE CONVERSIONES
-- ============================================

-- Ver conversiones por red social (últimos 30 días)
SELECT 
  COALESCE(traffic_source, 'unknown') as origen,
  COUNT(*) as total_registros,
  COUNT(CASE WHEN payment_completed_at IS NOT NULL THEN 1 END) as pagos_completados,
  ROUND(
    COUNT(CASE WHEN payment_completed_at IS NOT NULL THEN 1 END)::NUMERIC / 
    NULLIF(COUNT(*), 0) * 100, 
    2
  ) as tasa_conversion_porcentaje
FROM registrations
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY traffic_source
ORDER BY total_registros DESC;

-- Ver conversiones por campaña específica
SELECT 
  utm_campaign,
  utm_source,
  utm_medium,
  COUNT(*) as registros,
  COUNT(CASE WHEN payment_completed_at IS NOT NULL THEN 1 END) as pagos
FROM registrations
WHERE created_at >= NOW() - INTERVAL '7 days'
  AND utm_campaign IS NOT NULL
GROUP BY utm_campaign, utm_source, utm_medium
ORDER BY registros DESC;

-- Dashboard de métricas en tiempo real
SELECT 
  DATE(created_at) as fecha,
  traffic_source,
  COUNT(*) as registros,
  COUNT(CASE WHEN payment_completed_at IS NOT NULL THEN 1 END) as conversiones,
  SUM(CASE WHEN payment_completed_at IS NOT NULL THEN 12 ELSE 0 END) as revenue_usd
FROM registrations
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at), traffic_source
ORDER BY fecha DESC, registros DESC;

-- Top 5 fuentes de tráfico del mes
SELECT 
  traffic_source,
  COUNT(*) as total,
  COUNT(CASE WHEN payment_completed_at IS NOT NULL THEN 1 END) as pagos,
  ROUND(AVG(CASE WHEN payment_completed_at IS NOT NULL THEN 12 ELSE 0 END), 2) as avg_revenue
FROM registrations
WHERE created_at >= DATE_TRUNC('month', NOW())
GROUP BY traffic_source
ORDER BY pagos DESC
LIMIT 5;
