# Sistema de Envío Automático de Códigos de Acceso

Este sistema envía automáticamente los códigos de acceso a los usuarios que se registraron hace exactamente 3 días.

## 🚀 Cómo funciona

1. **Registro del usuario** → Recibe email de confirmación (sin código)
2. **Espera 3 días** → Sistema automático verifica registros
3. **Envío automático** → Emails con códigos de acceso a migrante y familiar

## 📁 Archivos creados

### 1. `/api/send-access-codes.js`
API endpoint que se ejecuta automáticamente cada día a las 10:00 AM.

**Funcionalidades:**
- Consulta Supabase para registros de hace 3 días
- Filtra usuarios que NO han recibido códigos (`codes_sent = null`)
- Envía emails con códigos usando Resend
- Marca registros como procesados
- Incluye seguridad con token de autorización

### 2. `/scripts/send-access-codes.js`
Script manual para ejecutar localmente si necesitas enviar códigos fuera del horario automático.

**Uso:**
```bash
node scripts/send-access-codes.js
```

### 3. `/vercel.json`
Configuración de Vercel Cron para ejecutar automáticamente.

**Horario:** Todos los días a las 10:00 AM (UTC)

## ⚙️ Configuración en Vercel

### Paso 1: Agregar variable de entorno
Necesitas agregar una variable de seguridad:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega:
   - **Name:** `CRON_SECRET`
   - **Value:** Genera un token secreto (ejemplo: `sc-cron-2025-secure-token-xyz`)
   - **Environment:** Production

### Paso 2: Habilitar Vercel Cron (Plan Pro)
El cron automático requiere plan Vercel Pro. Si tienes plan hobby/free, puedes:

**Opción A - Actualizar columna en Supabase:**
Agrega estas columnas a tu tabla `registrations`:
```sql
ALTER TABLE registrations 
ADD COLUMN codes_sent BOOLEAN DEFAULT NULL,
ADD COLUMN codes_sent_at TIMESTAMP;
```

**Opción B - Ejecutar manualmente:**
Puedes ejecutar el script cada día:
```bash
node scripts/send-access-codes.js
```

**Opción C - Usar servicio externo gratuito:**
Configura un cron job gratuito en:
- **Cron-job.org** (gratuito)
- **EasyCron** (gratuito)
- **GitHub Actions**

URL a llamar:
```
GET https://prototype.saludcompartida.com/api/send-access-codes
Header: Authorization: Bearer TU_CRON_SECRET
```

## 🔐 Seguridad

El endpoint está protegido con un token de autorización. Solo las peticiones con el header correcto funcionarán:

```bash
Authorization: Bearer sc-cron-2025-secure-token-xyz
```

## 📊 Logs y Monitoreo

El script genera logs completos:
- ✅ Emails enviados exitosamente
- ❌ Errores (con detalles)
- 📧 Total de registros procesados
- 📊 Resumen final con estadísticas

## 🧪 Prueba Manual

Para probar el sistema:

```bash
# 1. Asegúrate de tener las variables de entorno
export VITE_SUPABASE_URL="tu-url"
export VITE_SUPABASE_ANON_KEY="tu-key"

# 2. Ejecuta el script
node scripts/send-access-codes.js
```

O prueba el API endpoint:

```bash
curl -X GET https://prototype.saludcompartida.com/api/send-access-codes \
  -H "Authorization: Bearer TU_CRON_SECRET"
```

## 📋 Checklist de Implementación

- [ ] Agregar columnas `codes_sent` y `codes_sent_at` a Supabase
- [ ] Agregar variable `CRON_SECRET` en Vercel
- [ ] Verificar que `vercel.json` esté en el repositorio
- [ ] Hacer commit y push de los archivos
- [ ] Esperar despliegue en Vercel
- [ ] Verificar en Vercel → Settings → Cron Jobs
- [ ] Probar con un registro de hace 3 días

## 🎯 Mensajes que se envían

### Email al Migrante:
- **Subject:** 🎉 ¡Felicidades! Has sido seleccionado - SaludCompartida
- **Contenido:** Código de acceso + link + beneficios + instrucciones

### Email al Familiar:
- **Subject:** 🎉 ¡Felicidades! Has sido seleccionado - SaludCompartida
- **Contenido:** Quién lo registró + código + link + beneficios + call to action

## 🐛 Troubleshooting

**El cron no se ejecuta:**
- Verifica que tengas plan Vercel Pro
- Revisa Vercel → Settings → Cron Jobs
- Verifica que `vercel.json` esté en la raíz del proyecto

**Los emails no se envían:**
- Verifica variables de entorno (RESEND_API_KEY)
- Revisa logs en Vercel → Deployments → Functions
- Verifica que el dominio esté verificado en Resend

**No encuentra usuarios:**
- Verifica que los registros tengan `codes_sent = null`
- Revisa las fechas: debe ser exactamente hace 3 días
- Ejecuta el script manualmente para ver logs detallados

## 📅 Cronograma

| Día | Acción |
|-----|--------|
| Día 0 | Usuario se registra → Email de confirmación |
| Día 1-2 | Espera (sin acción) |
| Día 3 | Sistema envía códigos automáticamente a las 10:00 AM |

## 🔄 Mantenimiento

El sistema es automático y no requiere intervención. Puedes:
- Ver logs en Vercel
- Ejecutar script manualmente si necesitas enviar fuera de horario
- Modificar horario en `vercel.json` (formato cron)

## 📞 Soporte

Si tienes dudas sobre la configuración, revisa:
- Documentación de Vercel Cron: https://vercel.com/docs/cron-jobs
- Logs del sistema en Vercel
- Ejecuta el script manualmente para debugging
