# 🚀 Guía Rápida: Activar Envío Automático de Códigos

## ✅ Paso 1: Actualizar Base de Datos (Supabase)

1. Abre Supabase Dashboard: https://supabase.com
2. Ve a tu proyecto → **SQL Editor**
3. Copia y pega el contenido de `scripts/supabase-add-columns.sql`
4. Clic en **Run** (o Ctrl/Cmd + Enter)
5. Verifica que aparezca: "Success. No rows returned"

**¿Qué hace esto?**
Agrega 2 columnas nuevas a tu tabla:
- `codes_sent` (para marcar si ya se envió el código)
- `codes_sent_at` (fecha de envío)

---

## ✅ Paso 2: Agregar Variable de Seguridad (Vercel)

1. Abre Vercel Dashboard: https://vercel.com
2. Ve a tu proyecto → **Settings** → **Environment Variables**
3. Agrega una nueva variable:
   - **Name:** `CRON_SECRET`
   - **Value:** `saludcompartida-cron-2025-secure`
   - **Environment:** Production ✅
4. Clic en **Save**

**¿Por qué?**
Protege el endpoint de accesos no autorizados.

---

## ✅ Paso 3: Instalar Dependencias

```bash
npm install
```

Esto instalará:
- `@supabase/supabase-js` (para consultar la base de datos)
- `node-fetch` (para hacer requests HTTP)

---

## ✅ Paso 4: Hacer Deploy

```bash
git add .
git commit -m "feat: Sistema automático de envío de códigos después de 3 días"
git push origin main
```

Vercel detectará automáticamente `vercel.json` y configurará el cron job.

---

## ✅ Paso 5: Verificar Configuración en Vercel

1. Ve a Vercel → Tu proyecto
2. **Settings** → **Cron Jobs**
3. Deberías ver:
   - Path: `/api/send-access-codes`
   - Schedule: `0 10 * * *` (todos los días a las 10:00 AM UTC)

**Nota:** Vercel Cron requiere plan **Pro** ($20/mes)

---

## 🆓 Alternativa GRATUITA (sin Vercel Pro)

Si no tienes plan Pro, puedes usar **Cron-job.org** (100% gratis):

### Setup en Cron-job.org:

1. Ve a https://cron-job.org y crea cuenta gratis
2. Clic en **Create cronjob**
3. Configuración:
   - **Title:** SaludCompartida - Envío Códigos
   - **URL:** `https://prototype.saludcompartida.com/api/send-access-codes`
   - **Schedule:** Todos los días a las 10:00 AM
   - **Request method:** GET
   - **Headers:**
     ```
     Authorization: Bearer saludcompartida-cron-2025-secure
     ```
4. Guarda y activa el cron job

---

## 🧪 Prueba Manual (Recomendado)

Antes de esperar 3 días, prueba que funciona:

```bash
npm run send-codes
```

O prueba el API endpoint:

```bash
curl -X GET https://prototype.saludcompartida.com/api/send-access-codes \
  -H "Authorization: Bearer saludcompartida-cron-2025-secure"
```

**Resultado esperado:**
```json
{
  "message": "No hay usuarios elegibles para enviar códigos hoy",
  "processed": 0
}
```

Esto es normal si no tienes registros de hace 3 días.

---

## 📅 Cómo Probar con un Registro Real

1. Crea un registro de prueba
2. En Supabase, edita manualmente el campo `created_at`:
   ```sql
   UPDATE registrations 
   SET created_at = NOW() - INTERVAL '3 days'
   WHERE migrant_email = 'tu-email-de-prueba@ejemplo.com';
   ```
3. Ejecuta: `npm run send-codes`
4. Verifica que lleguen los 2 emails (migrante + familiar)

---

## ✅ Checklist Final

- [ ] Columnas agregadas en Supabase
- [ ] Variable `CRON_SECRET` en Vercel
- [ ] Dependencias instaladas (`npm install`)
- [ ] Deploy completado
- [ ] Cron job visible en Vercel (o configurado en cron-job.org)
- [ ] Prueba manual exitosa

---

## 🎉 ¡Listo!

Ahora el sistema enviará automáticamente los códigos cada día a las 10:00 AM a todos los usuarios que se registraron hace exactamente 3 días.

**¿Necesitas ayuda?**
- Revisa logs en Vercel → Deployments → Functions
- Ejecuta `npm run send-codes` para ver errores detallados
- Verifica que todas las variables de entorno estén configuradas
