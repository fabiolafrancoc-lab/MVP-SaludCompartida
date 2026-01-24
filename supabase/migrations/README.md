-- =============================================
-- ORDEN DE EJECUCIÓN DE MIGRACIONES
-- =============================================
-- Ejecuta estos archivos en este orden exacto:

-- 1. create_subscriptions_table.sql (primero)
-- 2. create_beneficiaries_table.sql (segundo, depende de subscriptions)

-- =============================================
-- NOTAS:
-- =============================================
-- - auth.users ya existe en Supabase (tabla de autenticación)
-- - No necesitas crear la tabla users manualmente
-- - subscriptions referencia a auth.users(id)
-- - beneficiaries referencia a subscriptions(id) y auth.users(id)
