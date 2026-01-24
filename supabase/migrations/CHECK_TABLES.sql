-- =============================================
-- VERIFICACIÓN Y CREACIÓN SELECTIVA DE TABLAS
-- Solo crea las tablas que faltan
-- =============================================

-- Verificar qué tablas ya existen
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'ai_companions') 
        THEN '✓ ai_companions ya existe'
        ELSE '✗ ai_companions falta'
    END as ai_companions,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'behavioral_codes') 
        THEN '✓ behavioral_codes ya existe'
        ELSE '✗ behavioral_codes falta'
    END as behavioral_codes,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'beneficiaries') 
        THEN '✓ beneficiaries ya existe'
        ELSE '✗ beneficiaries falta'
    END as beneficiaries,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'medical_history') 
        THEN '✓ medical_history ya existe'
        ELSE '✗ medical_history falta'
    END as medical_history,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'service_usage') 
        THEN '✓ service_usage ya existe'
        ELSE '✗ service_usage falta'
    END as service_usage,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'companion_calls') 
        THEN '✓ companion_calls ya existe'
        ELSE '✗ companion_calls falta'
    END as companion_calls,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'scheduled_callbacks') 
        THEN '✓ scheduled_callbacks ya existe'
        ELSE '✗ scheduled_callbacks falta'
    END as scheduled_callbacks,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'urgent_notifications') 
        THEN '✓ urgent_notifications ya existe'
        ELSE '✗ urgent_notifications falta'
    END as urgent_notifications;
