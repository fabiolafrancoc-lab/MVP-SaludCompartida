-- Migración: Cambiar message_count a conversation_count
-- Usar si la tabla ai_companions ya existe con message_count

-- 1. Renombrar la columna
ALTER TABLE ai_companions 
RENAME COLUMN message_count TO conversation_count;

-- 2. Actualizar el comentario
COMMENT ON COLUMN ai_companions.conversation_count IS 'Contador de conversaciones completas (intercambios usuario+AI) para determinar etapa de relación';

-- 3. Eliminar índice antiguo y crear nuevo
DROP INDEX IF EXISTS idx_ai_companions_message_count;
CREATE INDEX IF NOT EXISTS idx_ai_companions_conversation_count ON ai_companions(conversation_count);

-- 4. Verificar cambio
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'ai_companions' 
AND column_name = 'conversation_count';
