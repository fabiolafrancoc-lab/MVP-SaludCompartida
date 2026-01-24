# ORDEN DE EJECUCIÓN DE MIGRACIONES

Ejecuta estos archivos SQL **EN ESTE ORDEN EXACTO** en Supabase:

## 1. PRIMERO: Tablas base (sin dependencias)
- ✅ `create_ai_companions_table.sql` - Registro de AIs (Lupita, Carmen, Rosa)
- ✅ `create_behavioral_codes_table.sql` - Códigos conductuales

## 2. SEGUNDO: Tabla de beneficiarios
- ✅ `create_beneficiaries_table.sql` - Requiere `registrations` (ya existe)

## 3. TERCERO: Tablas que dependen de beneficiaries
- ✅ `create_medical_history_table.sql` - Historial médico
- ✅ `create_service_usage_table.sql` - Uso de servicios (requiere `registrations` + `beneficiaries`)
- ✅ `create_companion_calls_table.sql` - Llamadas de Lupita (requiere `registrations` + `beneficiaries`)

## 4. CUARTO: Tablas que dependen de companion_calls
- ✅ `create_scheduled_callbacks_table.sql` - Requiere `companion_calls` + `beneficiaries` + `registrations`
- ✅ `create_urgent_notifications_table.sql` - Alertas urgentes

## 5. ÚLTIMO: Triggers automáticos
- ✅ `create_triggers.sql` - Ejecutar al final (requiere TODAS las tablas anteriores)

---

## Verificación después de ejecutar:

```sql
-- Ver todas las tablas creadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Verificar triggers
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public';

-- Verificar políticas RLS
SELECT tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public';
```

---

## Notas importantes:

1. **registrations** ya existe en tu base de datos (no crear)
2. Todas las RLS policies usan `migrant_email` de `registrations`
3. Los triggers se activan automáticamente después de cada cambio
4. La vista `v_user_savings` calcula ahorros totales automáticamente
5. Notificaciones de WhatsApp se envían vía `pg_notify` 

## Si algo falla:

1. Verifica el error específico
2. Ejecuta solo hasta donde falló
3. Corrige el problema
4. Continúa desde donde quedaste
