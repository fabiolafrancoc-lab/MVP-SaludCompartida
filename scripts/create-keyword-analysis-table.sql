-- Tabla para captura y análisis de palabras clave
-- Objetivo: Identificar patrones de comportamiento del segmento base de la pirámide en LATAM
-- Esta data NO EXISTE y es extremadamente valiosa para entender necesidades reales

CREATE TABLE IF NOT EXISTS keyword_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES ai_companions(user_id) ON DELETE CASCADE,
  
  -- Mensaje original
  message_text TEXT NOT NULL,
  
  -- Palabras clave detectadas (JSONB para flexibilidad)
  detected_keywords JSONB NOT NULL,
  -- Estructura: [{ category: 'salud_sintomas', keywords: ['dolor', 'cansancio'], importance: 'high', detectedAt: '...' }]
  
  -- Métricas rápidas
  total_categories INTEGER DEFAULT 0,
  has_high_importance BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para consultas rápidas
CREATE INDEX idx_keyword_analysis_user ON keyword_analysis(user_id);
CREATE INDEX idx_keyword_analysis_created ON keyword_analysis(created_at DESC);
CREATE INDEX idx_keyword_analysis_importance ON keyword_analysis(has_high_importance) WHERE has_high_importance = true;

-- Índice GIN para búsquedas dentro del JSONB (muy poderoso)
CREATE INDEX idx_keyword_analysis_keywords ON keyword_analysis USING GIN (detected_keywords);

-- Vista materializada para análisis agregado rápido
CREATE MATERIALIZED VIEW IF NOT EXISTS keyword_patterns_summary AS
SELECT 
  ka.user_id,
  ac.user_gender,
  ac.user_age,
  ac.user_region,
  jsonb_object_keys(ka.detected_keywords::jsonb) as category,
  COUNT(*) as frequency,
  MAX(ka.created_at) as last_detected
FROM keyword_analysis ka
JOIN ai_companions ac ON ka.user_id = ac.user_id
GROUP BY ka.user_id, ac.user_gender, ac.user_age, ac.user_region, category;

-- Índice en la vista materializada
CREATE INDEX idx_keyword_patterns_user ON keyword_patterns_summary(user_id);
CREATE INDEX idx_keyword_patterns_demo ON keyword_patterns_summary(user_gender, user_age, user_region);

-- Función para refrescar la vista (ejecutar periódicamente)
COMMENT ON MATERIALIZED VIEW keyword_patterns_summary IS 
'Vista agregada de patrones. Refrescar cada 24h con: REFRESH MATERIALIZED VIEW keyword_patterns_summary;';

-- RLS (Row Level Security)
ALTER TABLE keyword_analysis ENABLE ROW LEVEL SECURITY;

-- Policy: Los usuarios solo pueden ver su propio análisis
CREATE POLICY "Users can view own keyword analysis"
  ON keyword_analysis
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Sistema puede insertar análisis
CREATE POLICY "Service can insert keyword analysis"
  ON keyword_analysis
  FOR INSERT
  WITH CHECK (true);

-- Comentarios para documentación
COMMENT ON TABLE keyword_analysis IS 
'Captura palabras clave de conversaciones para identificar patrones de comportamiento de la base de la pirámide en LATAM. Data valiosa para análisis demográfico y desarrollo de productos.';

COMMENT ON COLUMN keyword_analysis.detected_keywords IS 
'JSONB array con estructura: [{ category: string, keywords: string[], importance: string, detectedAt: timestamp }]. Categorías: salud, económico, emocional, social, cultural, migración.';

-- Verificar creación
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name = 'keyword_analysis' 
ORDER BY ordinal_position;
