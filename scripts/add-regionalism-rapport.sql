-- Agregar columnas para regionalismo y rapport building

-- 1. Agregar columna de región mexicana
ALTER TABLE ai_companions 
ADD COLUMN IF NOT EXISTS user_region TEXT DEFAULT 'centro';

COMMENT ON COLUMN ai_companions.user_region IS 'Región de México: norte, centro, occidente, sur';

-- 2. Agregar contador de mensajes para etapas de rapport
ALTER TABLE ai_companions 
ADD COLUMN IF NOT EXISTS message_count INTEGER DEFAULT 0;

COMMENT ON COLUMN ai_companions.message_count IS 'Contador de mensajes para determinar etapa de relación';

-- 3. Agregar columna para preguntas ya hechas (evitar repetir)
ALTER TABLE ai_companions 
ADD COLUMN IF NOT EXISTS asked_questions TEXT[] DEFAULT ARRAY[]::TEXT[];

COMMENT ON COLUMN ai_companions.asked_questions IS 'Array de preguntas clave ya realizadas para evitar repetición';

-- 4. Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_ai_companions_region ON ai_companions(user_region);
CREATE INDEX IF NOT EXISTS idx_ai_companions_message_count ON ai_companions(message_count);

-- 5. Verificar cambios
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'ai_companions' 
AND column_name IN ('user_region', 'message_count', 'asked_questions', 'communication_style');
