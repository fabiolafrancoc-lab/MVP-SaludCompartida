-- Ver TODOS los registros (sin límite de columnas)
SELECT * FROM registrations ORDER BY created_at DESC LIMIT 3;

-- Si no hay nada, verificar si la tabla existe
SELECT COUNT(*) as total_registros FROM registrations;
