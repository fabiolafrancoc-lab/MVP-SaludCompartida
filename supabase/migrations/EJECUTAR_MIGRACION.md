# 🔧 EJECUTAR MIGRACIÓN EN SUPABASE

## Opción 1: SQL Editor (Recomendado)

1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Click en **SQL Editor** (menú izquierdo)
4. Click en **New Query**
5. Copia y pega el contenido de `add_lad_required_fields.sql`
6. Click en **Run** (o presiona Cmd/Ctrl + Enter)

## Opción 2: Desde Terminal

```bash
# Asegúrate de tener Supabase CLI instalado
supabase db push

# O ejecuta directamente el archivo
psql "postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres" -f supabase/migrations/add_lad_required_fields.sql
```

## ✅ Verificación

Después de ejecutar, verifica que las columnas existen:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'registrations'
AND column_name IN ('family_sex', 'family_birthdate', 'migrant_sex', 'migrant_birthdate');
```

Deberías ver 4 filas con las nuevas columnas.

## 📝 Siguiente Paso

Una vez ejecutado, actualiza el formulario de registro para capturar estos datos.
