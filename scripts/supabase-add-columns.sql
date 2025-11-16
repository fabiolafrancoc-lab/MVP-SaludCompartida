-- Script SQL para agregar columnas de tracking de códigos enviados
-- Ejecutar en Supabase SQL Editor

-- 1. Agregar columna para marcar si los códigos fueron enviados
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS codes_sent BOOLEAN DEFAULT NULL;

-- 2. Agregar columna para registrar la fecha de envío
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS codes_sent_at TIMESTAMP;

-- 3. Crear índice para mejorar performance de las consultas
CREATE INDEX IF NOT EXISTS idx_registrations_codes_sent 
ON registrations(codes_sent, created_at);

-- 4. Verificar que las columnas se crearon correctamente
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'registrations' 
  AND column_name IN ('codes_sent', 'codes_sent_at')
ORDER BY column_name;

-- 5. Ver ejemplo de registros (opcional)
SELECT 
  id,
  migrant_first_name,
  migrant_last_name,
  created_at,
  codes_sent,
  codes_sent_at
FROM registrations 
ORDER BY created_at DESC 
LIMIT 5;
