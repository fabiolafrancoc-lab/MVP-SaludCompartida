# 🔄 CAMBIOS IMPORTANTES EN SCHEMA.SQL

## ✅ Cambios Realizados

### **1. Nombres de Columnas Simplificados (Inglés)**

Para evitar conflictos con las migraciones existentes y facilitar el desarrollo, todos los nombres están ahora en inglés:

| Tabla | Columna Anterior | Columna Nueva |
|-------|------------------|---------------|
| `registrations` | `suscriptor_nombre` | `migrant_name` |
| `registrations` | `suscriptor_email` | `migrant_email` |
| `registrations` | `suscriptor_telefono` | `migrant_phone` |
| `registrations` | `suscriptor_estado_usa` | `migrant_state` |
| `registrations` | `usuario_principal_nombre` | `principal_name` |
| `registrations` | `usuario_principal_telefono` | `principal_phone` |
| `registrations` | `usuario_principal_parentesco` | `principal_relationship` |
| `registrations` | `subscription_status` | `status` |
| `family_members` | `nombre` | `name` |
| `family_members` | `telefono` | `phone` |
| `family_members` | `parentesco` | `relationship` |

### **2. Campo `registration_id` ELIMINADO**

La tabla `registrations` ya no tiene el campo `registration_id` (tipo VARCHAR). Ahora solo usa:
- `id` (BIGSERIAL) - PRIMARY KEY numérica
- `codigo_familia` (VARCHAR) - Código legible tipo "SC-123456"

### **3. DROP TABLES Agregado**

El schema ahora **elimina las tablas existentes** antes de crearlas de nuevo:

```sql
DROP TABLE IF EXISTS savings_records CASCADE;
DROP TABLE IF EXISTS service_usage CASCADE;
DROP TABLE IF EXISTS family_members CASCADE;
DROP TABLE IF EXISTS registrations CASCADE;
```

⚠️ **CUIDADO**: Esto borrará todos los datos de prueba. Es ideal para desarrollo limpio.

### **4. Foreign Keys Corregidas**

Todas las foreign keys ahora apuntan correctamente a `registrations(id)`:

```sql
-- family_members
registration_id BIGINT NOT NULL REFERENCES registrations(id)

-- service_usage  
registration_id BIGINT NOT NULL REFERENCES registrations(id)

-- savings_records
registration_id BIGINT NOT NULL REFERENCES registrations(id)
```

### **5. Políticas RLS con Nombres Únicos**

Para evitar conflictos con políticas existentes:

```sql
CREATE POLICY "Service role full access registrations" ON registrations ...
CREATE POLICY "Service role full access family_members" ON family_members ...
CREATE POLICY "Service role full access service_usage" ON service_usage ...
CREATE POLICY "Service role full access savings_records" ON savings_records ...
```

---

## 📝 ACTUALIZAR CÓDIGO DE API

### **Archivo: `src/app/api/registro/route.ts`**

Cambiar los nombres de columnas al insertar en Supabase:

```typescript
// ❌ ANTES
const { data: registration, error } = await supabase
  .from('registrations')
  .insert({
    registration_id: registrationId,
    codigo_familia: codigoFamilia,
    suscriptor_nombre: suscriptor.nombreCompleto,
    suscriptor_email: suscriptor.email,
    suscriptor_telefono: suscriptor.telefonoUS,
    suscriptor_estado_usa: suscriptor.estadoUS,
    usuario_principal_nombre: usuarioPrincipal.nombre,
    usuario_principal_telefono: usuarioPrincipal.telefono,
    usuario_principal_parentesco: usuarioPrincipal.parentesco,
    plan_id: plan.id,
    plan_name: plan.name,
    plan_price: plan.price,
    subscription_status: 'pending'
  })

// ✅ DESPUÉS
const { data: registration, error } = await supabase
  .from('registrations')
  .insert({
    codigo_familia: codigoFamilia,
    migrant_name: suscriptor.nombreCompleto,
    migrant_email: suscriptor.email,
    migrant_phone: suscriptor.telefonoUS,
    migrant_state: suscriptor.estadoUS,
    principal_name: usuarioPrincipal.nombre,
    principal_phone: usuarioPrincipal.telefono,
    principal_relationship: usuarioPrincipal.parentesco,
    plan_id: plan.id,
    plan_name: plan.name,
    plan_price: plan.price,
    status: 'pending'
  })
  .select()
  .single();

// Obtener el ID numérico
const registrationId = registration.id; // Este es el BIGINT
```

### **Archivo: `src/app/api/registro/route.ts` (family_members)**

```typescript
// ❌ ANTES
await supabase.from('family_members').insert({
  registration_id: registrationId, // VARCHAR
  nombre: member.nombre,
  telefono: member.telefono,
  parentesco: member.parentesco,
  is_principal: isPrincipal
})

// ✅ DESPUÉS
await supabase.from('family_members').insert({
  registration_id: registration.id, // BIGINT
  name: member.nombre,
  phone: member.telefono,
  relationship: member.parentesco,
  is_principal: isPrincipal
})
```

---

## 🎯 PASOS PARA APLICAR

1. **Ejecutar en Supabase SQL Editor:**
   - Copia todo el contenido de `schema.sql`
   - Pega en: https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/sql/new
   - Click en **RUN**
   - Verifica: "Success. No rows returned"

2. **Actualizar API:**
   - Abre `src/app/api/registro/route.ts`
   - Cambia todos los nombres de columnas según la tabla arriba
   - Elimina referencias a `registration_id` VARCHAR
   - Usa `registration.id` (el BIGINT) para foreign keys

3. **Verificar en Table Editor:**
   - Ve a: https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/editor
   - Deberías ver 4 tablas:
     - `registrations` (con columnas en inglés)
     - `family_members`
     - `service_usage`
     - `savings_records`

---

## 🐛 Si tienes errores

**Error: "relation already exists"**
→ Ya ejecutaste el schema antes. Las políticas RLS ahora tienen nombres únicos, debería funcionar.

**Error: "column does not exist"**
→ Verifica que estás usando los nuevos nombres (inglés) en tu código de API.

**Error: "foreign key constraint"**
→ Asegúrate de usar `registration.id` (BIGINT) y no `registrationId` (VARCHAR).

---

## 📊 Estructura Final

```
registrations (id: BIGINT, codigo_familia: VARCHAR)
    ├── family_members (registration_id → registrations.id)
    ├── service_usage (registration_id → registrations.id)
    └── savings_records (registration_id → registrations.id)
```

---

**Fecha:** Enero 24, 2026
**Versión:** MVP v1.0 - Schema Limpio
