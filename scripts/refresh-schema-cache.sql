-- Refrescar el schema cache de Supabase
-- Esto fuerza a Supabase a recargar la estructura de las tablas

NOTIFY pgrst, 'reload schema';
