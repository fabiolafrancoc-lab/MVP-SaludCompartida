# 🚀 PLAN DE ACCIÓN INMEDIATO - MIGRACIÓN AWS

**Fecha:** Enero 28, 2026  
**Estado:** LISTO PARA EJECUTAR

---

## ✅ LO QUE YA TIENES

1. ✅ **40 tablas verificadas** en Supabase
2. ✅ **Documentación completa** de 1,200+ líneas
3. ✅ **Scripts automatizados** listos para usar
4. ✅ **Plan de migración** paso a paso
5. ✅ **Checklist de validación** completo

---

## 📋 ACCIÓN INMEDIATA (5 minutos)

### PASO 1: Confirmar el inventario completo

Ejecuta esto en **Supabase SQL Editor**:

1. Ve a: https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/sql/new

2. Copia y pega:

```sql
SELECT 
    table_name AS "Tabla",
    (SELECT COUNT(*) FROM information_schema.columns c
     WHERE c.table_schema = t.table_schema 
     AND c.table_name = t.table_name) AS "Columnas",
    COALESCE(
        (SELECT n_live_tup FROM pg_stat_user_tables 
         WHERE schemaname = t.table_schema 
         AND relname = t.table_name), 0
    ) AS "Registros",
    pg_size_pretty(pg_total_relation_size('"public"."' || table_name || '"')) AS "Tamaño"
FROM information_schema.tables t
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

3. Haz clic en **RUN** ▶️

4. Copia el resultado y pégalo en un archivo nuevo: `database-inventory-complete.txt`

**Esto te dará el listado EXACTO de tus 53 tablas.**

---

## 🎯 PLAN DE EJECUCIÓN (7 días)

### DÍA 1-2: PREPARACIÓN AWS

#### Checklist AWS RDS Setup

- [ ] Crear cuenta AWS (si no la tienes)
- [ ] Configurar AWS CLI en tu máquina
- [ ] Crear VPC y Subnets
- [ ] Configurar Security Groups
- [ ] Crear AWS RDS PostgreSQL 15.x instance:
  ```bash
  Tipo: db.t3.medium
  Storage: 100 GB gp3
  Multi-AZ: Sí
  Backup: 7 días
  Encriptación: Habilitada
  ```
- [ ] Anotar el endpoint de RDS
- [ ] Guardar el password de forma segura (1Password, LastPass, etc.)
- [ ] Probar conexión desde tu máquina:
  ```bash
  psql -h tu-instance.rds.amazonaws.com -U admin -d postgres
  ```

**Tiempo estimado:** 3-4 horas

---

### DÍA 2-3: EXPORTACIÓN DESDE SUPABASE

#### Opción A: Script Automatizado (RECOMENDADO)

```bash
cd /Users/fabiolafranco/Desktop/MVP-SaludCompartida

# Ejecutar script de exportación
./export-database.sh
```

**El script hará:**
1. ✅ Verificar herramientas (pg_dump, psql)
2. ✅ Exportar schema completo
3. ✅ Exportar datos de 40+ tablas
4. ✅ Exportar funciones y triggers
5. ✅ Crear script de importación
6. ✅ Generar reporte de exportación

**Salida:** Directorio `database-export-YYYYMMDD-HHMMSS/` con todos los archivos

#### Opción B: Manual (si el script falla)

1. **Obtener password de Supabase:**
   - Ve a: https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/settings/database
   - Copia el password

2. **Exportar schema:**
   ```bash
   pg_dump -h rzmdekjegbdgitqekjee.supabase.co \
           -U postgres \
           -d postgres \
           --schema-only \
           --no-owner \
           --no-privileges \
           --schema=public \
           -f schema.sql
   ```

3. **Exportar datos por tabla:**
   ```bash
   # Ver lista en: AWS_MIGRATION_DATABASE_COMPLETE_DOCUMENTATION.md
   # Sección "FASE 2: EXPORTACIÓN"
   ```

**Tiempo estimado:** 2-3 horas

---

### DÍA 3-4: IMPORTACIÓN A AWS RDS

#### Checklist de Importación

- [ ] Verificar que AWS RDS está en estado "available"
- [ ] Conectar a AWS RDS
- [ ] Crear database `saludcompartida`
- [ ] Instalar extensiones:
  ```sql
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE EXTENSION IF NOT EXISTS "pgvector";
  ```
- [ ] Ejecutar script de importación:
  ```bash
  cd database-export-YYYYMMDD-HHMMSS/
  ./import-to-aws.sh
  ```
- [ ] Verificar conteo de tablas (debe ser 40+)
- [ ] Verificar conteo de registros por tabla
- [ ] Verificar Foreign Keys
- [ ] Verificar índices

**Tiempo estimado:** 3-4 horas

---

### DÍA 4-5: VALIDACIÓN

#### Script de Validación (ejecutar en AWS RDS)

```sql
-- 1. Conteo de tablas
SELECT COUNT(*) AS total_tables
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE';
-- Esperado: 40+

-- 2. Conteo de registros
SELECT 
    table_name,
    (xpath('/row/cnt/text()', 
           query_to_xml(format('SELECT COUNT(*) AS cnt FROM %I.%I', 
                              table_schema, table_name), false, true, '')))[1]::text::int AS row_count
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE'
ORDER BY row_count DESC;

-- 3. Verificar Foreign Keys
SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_schema = 'public';

-- 4. Verificar que NO hay registros huérfanos
SELECT 
    'beneficiaries' AS tabla,
    COUNT(*) AS huerfanos
FROM beneficiaries b
WHERE NOT EXISTS (SELECT 1 FROM registrations r WHERE r.id = b.registration_id);
-- Debe ser 0
```

**Checklist de Validación:**

- [ ] Total de tablas coincide (Supabase vs AWS)
- [ ] Total de registros por tabla coincide
- [ ] No hay registros huérfanos
- [ ] Foreign keys funcionan correctamente
- [ ] Índices están creados
- [ ] Triggers están activos
- [ ] Funciones están creadas
- [ ] Prueba de INSERT/UPDATE/DELETE funciona
- [ ] Query de ejemplo funciona correctamente

**Tiempo estimado:** 2-3 horas

---

### DÍA 5: ACTUALIZAR APLICACIÓN

#### 1. Actualizar Variables de Entorno

Crea `.env.production` con:

```bash
# AWS RDS Configuration
AWS_RDS_HOST=tu-instance.xxxxx.us-east-1.rds.amazonaws.com
AWS_RDS_PORT=5432
AWS_RDS_DATABASE=saludcompartida
AWS_RDS_USER=admin
AWS_RDS_PASSWORD=tu_password_seguro
AWS_RDS_MAX_CONNECTIONS=20
AWS_RDS_SSL=true
```

#### 2. Actualizar Código

Archivo: `src/lib/aws-rds.js` (ya está en la documentación)

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.AWS_RDS_HOST,
  port: parseInt(process.env.AWS_RDS_PORT || '5432'),
  database: process.env.AWS_RDS_DATABASE,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD,
  max: 20,
  ssl: { rejectUnauthorized: false }
});

module.exports = { pool };
```

#### 3. Actualizar Endpoints

Reemplaza todas las llamadas de:
```javascript
// ANTES
import { supabase } from '@/lib/supabase';
const { data } = await supabase.from('registrations').select('*');

// DESPUÉS
import { pool } from '@/lib/aws-rds';
const result = await pool.query('SELECT * FROM registrations');
const data = result.rows;
```

#### 4. Probar Localmente

```bash
npm run dev
# Verificar que todo funciona
```

#### 5. Deploy a Producción

```bash
# Actualizar variables de entorno en Vercel
vercel env add AWS_RDS_HOST production
vercel env add AWS_RDS_PASSWORD production
# ... resto de variables

# Deploy
vercel --prod
```

**Tiempo estimado:** 4-5 horas

---

### DÍA 6-7: MONITOREO

#### Configurar CloudWatch Alarms

```bash
# CPU > 80%
aws cloudwatch put-metric-alarm \
  --alarm-name saludcompartida-cpu-high \
  --metric-name CPUUtilization \
  --namespace AWS/RDS \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold

# Connections > 80
aws cloudwatch put-metric-alarm \
  --alarm-name saludcompartida-connections-high \
  --metric-name DatabaseConnections \
  --namespace AWS/RDS \
  --threshold 80

# Storage < 20GB
aws cloudwatch put-metric-alarm \
  --alarm-name saludcompartida-storage-low \
  --metric-name FreeStorageSpace \
  --namespace AWS/RDS \
  --threshold 21474836480
```

#### Habilitar Performance Insights

```bash
aws rds modify-db-instance \
  --db-instance-identifier saludcompartida-prod \
  --enable-performance-insights \
  --apply-immediately
```

#### Monitorear por 48 horas

- [ ] CPU usage < 70%
- [ ] Connections < 50
- [ ] Query response time < 100ms
- [ ] No errores en logs
- [ ] Backups automáticos funcionando

**Tiempo estimado:** 1-2 horas setup + monitoreo continuo

---

## 🆘 TROUBLESHOOTING

### Problema 1: No puedo conectarme a RDS

**Solución:**
1. Verifica Security Group permite tu IP
2. Verifica que RDS es "Publicly Accessible" (temporalmente para migración)
3. Prueba: `telnet tu-instance.rds.amazonaws.com 5432`

### Problema 2: El script de exportación falla

**Solución:**
1. Instala PostgreSQL client: `brew install postgresql`
2. Verifica password de Supabase
3. Prueba conexión manual: `psql -h rzmdekjegbdgitqekjee.supabase.co -U postgres`

### Problema 3: Error de Foreign Key en importación

**Solución:**
1. Importa tablas en orden correcto (ver documentación)
2. Desactiva temporalmente FK checks:
   ```sql
   SET session_replication_role = 'replica';
   -- hacer imports
   SET session_replication_role = 'origin';
   ```

### Problema 4: Queries lentos en AWS

**Solución:**
1. Verifica que índices están creados
2. Ejecuta `ANALYZE` en todas las tablas:
   ```sql
   ANALYZE;
   ```
3. Revisa query plan: `EXPLAIN ANALYZE SELECT ...`

---

## 📊 COSTOS ESTIMADOS

### AWS RDS (db.t3.medium)
- **Compute:** $50/mes
- **Storage (100 GB):** $12/mes
- **Backup:** $3/mes
- **Data Transfer:** $5/mes
- **TOTAL:** ~$70/mes

### Optimización
- Reserved Instance (1 año): -40% = $42/mes
- Reserved Instance (3 años): -60% = $28/mes

---

## ✅ CHECKLIST FINAL

### Pre-Migración
- [ ] Backup completo de Supabase descargado
- [ ] AWS RDS instance creada y probada
- [ ] Scripts de migración probados en staging
- [ ] Equipo notificado de ventana de mantenimiento

### Durante Migración
- [ ] Modo mantenimiento activado
- [ ] Exportación completada sin errores
- [ ] Importación completada sin errores
- [ ] Validación pasada 100%

### Post-Migración
- [ ] Aplicación actualizada y funcionando
- [ ] Monitoreo activo
- [ ] Backups automáticos configurados
- [ ] Equipo notificado de finalización exitosa
- [ ] Documentación actualizada

---

## 📞 RECURSOS DE AYUDA

### Documentación
- **Completa:** `AWS_MIGRATION_DATABASE_COMPLETE_DOCUMENTATION.md`
- **Resumen:** `DATABASE_SUMMARY.md`
- **Este Plan:** `MIGRATION_ACTION_PLAN.md`

### Scripts
- **Exportación:** `./export-database.sh`
- **Verificación:** `node get-all-tables.js`
- **SQL Queries:** `scripts/list-all-tables.sql`

### Links Útiles
- [AWS RDS Console](https://console.aws.amazon.com/rds)
- [Supabase Dashboard](https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee)
- [PostgreSQL Docs](https://www.postgresql.org/docs/15/)

---

## 🚀 COMENZAR AHORA

### Comando inmediato:

```bash
# 1. Verificar tablas en Supabase
# Ejecuta el SQL en: https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/sql/new

# 2. Exportar base de datos
cd /Users/fabiolafranco/Desktop/MVP-SaludCompartida
./export-database.sh

# 3. Seguir el plan día por día
```

---

**¿Listo para comenzar la migración?** 🎯

Tienes TODO lo necesario:
- ✅ Documentación completa
- ✅ Scripts automatizados
- ✅ Plan paso a paso
- ✅ Troubleshooting guide
- ✅ Checklist de validación

**¡Éxito con tu migración a AWS!** 🚀
