-- =============================================
-- SCRIPT: Inventario Completo de Base de Datos
-- Ejecutar en: Supabase SQL Editor
-- Propósito: Obtener listado de TODAS las tablas para migración AWS
-- =============================================

-- 1. LISTAR TODAS LAS TABLAS CON CONTEO
SELECT 
    t.table_name AS "Nombre Tabla",
    (
        SELECT COUNT(*) 
        FROM information_schema.columns c
        WHERE c.table_schema = t.table_schema 
        AND c.table_name = t.table_name
    ) AS "Num Columnas",
    COALESCE(
        (SELECT n_live_tup 
         FROM pg_stat_user_tables 
         WHERE schemaname = t.table_schema 
         AND relname = t.table_name), 0
    ) AS "Registros Aprox",
    pg_size_pretty(pg_total_relation_size('"' || t.table_schema || '"."' || t.table_name || '"')) AS "Tamaño Disco"
FROM information_schema.tables t
WHERE t.table_schema = 'public'
AND t.table_type = 'BASE TABLE'
ORDER BY t.table_name;

-- 2. CONTEO TOTAL
SELECT 
    COUNT(*) AS "TOTAL DE TABLAS"
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE';
