-- Agregar columna para trackear origen de tráfico (Instagram, Facebook, TikTok, etc.)

ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS traffic_source TEXT;

-- Crear índice para reportes rápidos de origen
CREATE INDEX IF NOT EXISTS idx_traffic_source ON public.registrations(traffic_source);

-- Verificar que se agregó correctamente
SELECT 
  column_name, 
  data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'registrations'
AND column_name = 'traffic_source';

-- Ver resumen de registros por origen
SELECT 
  COALESCE(traffic_source, 'directo') as origen,
  COUNT(*) as total_registros
FROM public.registrations
GROUP BY traffic_source
ORDER BY total_registros DESC;
