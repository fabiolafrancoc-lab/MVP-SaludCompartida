# 🚨 SOLUCIÓN: Error "Could not find the table 'public.registrations'"

## ❌ Problema
Al intentar registrar un usuario en `src/App.jsx`, aparece el error:
```
Error al registrar: Could not find the table 'public.registrations' in the schema cache
```

**Causa:** La tabla `registrations` no existe en tu base de datos de Supabase.

---

## ✅ Solución Rápida (5 minutos)

### Paso 1: Abrir Supabase SQL Editor
1. Ve a https://supabase.com
2. Inicia sesión
3. Selecciona tu proyecto
4. En el menú lateral, clic en **SQL Editor**

### Paso 2: Ejecutar el Script
1. Clic en **New Query** (botón +)
2. Abre el archivo: `scripts/create-registrations-table.sql`
3. Copia TODO el contenido del archivo
4. Pégalo en el editor SQL de Supabase
5. Clic en **Run** (o presiona `Ctrl/Cmd + Enter`)

### Paso 3: Verificar Creación
Deberías ver al final:
```
✅ status: "Tabla creada exitosamente"
   total_columns: 21
```

### Paso 4: Verificar en Supabase
1. En el menú lateral, clic en **Table Editor**
2. Deberías ver la tabla `registrations` en la lista
3. La tabla debe tener 21 columnas

---

## 📋 Estructura de la Tabla

La tabla `registrations` contiene:

### Datos del Migrante (USA):
- `migrant_first_name` - Nombre
- `migrant_last_name` - Apellido paterno
- `migrant_mother_last_name` - Apellido materno
- `migrant_email` - Email
- `migrant_country_code` - Código país (+1)
- `migrant_phone` - Teléfono
- `migrant_access_code` - Código de acceso (SC-XXXXX)

### Datos del Familiar (México):
- `family_first_name` - Nombre
- `family_last_name` - Apellido paterno
- `family_mother_last_name` - Apellido materno
- `family_email` - Email
- `family_country_code` - Código país (+52)
- `family_phone` - Teléfono
- `family_access_code` - Código de acceso (SC-XXXXX)
- `family_country` - País (MX)

### Control de Sistema:
- `codes_sent` - Si se enviaron los códigos automáticos
- `codes_sent_at` - Fecha de envío de códigos
- `created_at` - Fecha de creación
- `updated_at` - Fecha de última actualización

---

## 🔐 Seguridad Configurada

El script también configura:

✅ **Row Level Security (RLS)** habilitado
✅ **Políticas de acceso:**
  - INSERT permitido para todos (registros)
  - SELECT permitido para todos (consultas)
  - UPDATE permitido (para sistema automático)

✅ **Índices optimizados** para:
  - Búsqueda por códigos de acceso
  - Búsqueda por teléfonos
  - Búsqueda por emails
  - Filtros por fecha

✅ **Triggers automáticos:**
  - `updated_at` se actualiza automáticamente

---

## 🧪 Prueba Rápida

Después de crear la tabla, prueba con este query en SQL Editor:

```sql
-- Insertar registro de prueba
INSERT INTO public.registrations (
  migrant_first_name, migrant_last_name, migrant_email, 
  migrant_phone, migrant_access_code,
  family_first_name, family_last_name, 
  family_phone, family_access_code
) VALUES (
  'Juan', 'Pérez', 'juan@test.com',
  '3051234567', 'SC-TEST1',
  'María', 'González',
  '5551234567', 'SC-TEST2'
);

-- Verificar que se insertó
SELECT * FROM public.registrations WHERE migrant_access_code = 'SC-TEST1';

-- Eliminar registro de prueba
DELETE FROM public.registrations WHERE migrant_access_code = 'SC-TEST1';
```

Si esto funciona, tu tabla está lista. ✅

---

## 🔄 Probar el Registro en la App

Después de crear la tabla:

1. Ve a https://prototype.saludcompartida.com
2. Llena el formulario de registro
3. Completa datos del migrante y familiar
4. Clic en "Registrarme"
5. Deberías ver: ✅ "¡Registro exitoso!"

---

## ❓ Troubleshooting

### Error: "permission denied for schema public"
**Solución:** Verifica que estás usando un proyecto de Supabase con permisos de admin.

### Error: "relation already exists"
**Solución:** La tabla ya existe. Verifica en Table Editor.

### No aparece la tabla después de crearla
**Solución:** Refresca la página de Supabase.

### Los registros no se guardan
**Solución:** Verifica las políticas RLS en: Authentication → Policies

---

## 📞 Siguiente Paso

Después de crear la tabla, ejecuta también:
```sql
-- Agregar columnas para el sistema de envío automático (si no las tiene)
-- (Este script ya está incluido en create-registrations-table.sql)
```

---

## ✅ Checklist Final

- [ ] Script ejecutado en Supabase SQL Editor
- [ ] Tabla `registrations` visible en Table Editor
- [ ] 21 columnas creadas correctamente
- [ ] Políticas RLS configuradas
- [ ] Índices creados
- [ ] Trigger de updated_at funcionando
- [ ] Prueba de INSERT exitosa
- [ ] Registro desde la app funciona

---

**Tiempo estimado:** 5 minutos  
**Dificultad:** Fácil  
**Prerequisito:** Tener cuenta de Supabase activa
