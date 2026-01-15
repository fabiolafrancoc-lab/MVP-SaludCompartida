-- Verificar nombres EXACTOS de las columnas de fecha de nacimiento
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'registrations'
AND column_name LIKE '%birth%'
ORDER BY column_name;
