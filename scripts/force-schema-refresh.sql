-- Forzar actualización del schema agregando un comentario a la tabla
COMMENT ON TABLE registrations IS 'User registrations with demographic data - updated Jan 2026';

-- Notificar de nuevo
NOTIFY pgrst, 'reload schema';

-- Verificar que las columnas existen
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'registrations' 
AND column_name IN ('family_birthdate', 'family_gender', 'migrant_birthdate', 'migrant_gender');
