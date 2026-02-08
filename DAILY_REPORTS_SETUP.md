# Configuración de Reportes Automáticos Diarios

## 📊 Sistema de Reportes Acumulados

Este sistema envía automáticamente reportes de todas las suscripciones activas a los proveedores de asistencia (Stephania Cárdenas) **2 veces al día**.

---

## ⏰ Horarios Programados

### Cron Jobs Configurados (Hora UTC):

1. **Reporte de la Mañana**: `0 12 * * *` → 7:00 AM (Hora México)
2. **Reporte de la Tarde**: `0 0 * * *` → 7:00 PM (Hora México)

**Días**: Lunes a Domingo (todos los días)  
**Fecha de Inicio**: Lunes 27 de Enero 2025

> **Nota**: Vercel Cron usa horario UTC. México (CST/CDT) = UTC-6

---

## 📧 Destinatarios

Los reportes se envían automáticamente a:
- `stephania.cardenas@anevent.com.mx`
- `stephania.cardenas@auramultiasistencias.com`

---

## 🔧 Variables de Entorno Requeridas en Vercel

Debes agregar esta variable en **Vercel Dashboard → Settings → Environment Variables**:

```env
CRON_SECRET=tu_token_secreto_aleatorio_aqui
```

### Generar Token Seguro:

Puedes generar un token aleatorio con este comando:

```bash
openssl rand -base64 32
```

O usar este ejemplo:
```
CRON_SECRET=a8f3b2c9d1e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0
```

---

## 📁 Archivos del Sistema

### 1. **Cron Job Handler**
- **Ubicación**: `api/cron/send-daily-reports.js`
- **Función**: Ejecuta el envío automático de reportes
- **Seguridad**: Validación con `CRON_SECRET`

### 2. **Generador de Reportes**
- **Ubicación**: `api/report-accumulated.js`
- **Función**: Consulta Supabase y genera reporte HTML
- **Parámetros**: `startDate`, `endDate`, `sendEmail`

### 3. **Configuración Vercel**
- **Ubicación**: `vercel.json`
- **Crons configurados**:
  ```json
  {
    "path": "/api/cron/send-daily-reports",
    "schedule": "0 12 * * *"  // 7:00 AM México
  },
  {
    "path": "/api/cron/send-daily-reports",
    "schedule": "0 0 * * *"   // 7:00 PM México
  }
  ```

---

## 📋 Contenido del Reporte

Cada reporte incluye:

### Resumen Ejecutivo:
- Total de usuarios registrados
- Ingresos totales del período

### Tabla Detallada:
- Nombre completo
- Sexo
- Fecha de nacimiento
- Fecha de activación (pago)
- Email
- Teléfono
- Monto pagado

### Período:
- Por defecto: últimas 24 horas
- Se puede personalizar con parámetros `startDate` y `endDate`

---

## 🧪 Pruebas Manuales

### Enviar reporte de prueba:

```bash
curl -X POST https://saludcompartida.app/api/cron/send-daily-reports \
  -H "Authorization: Bearer TU_CRON_SECRET" \
  -H "Content-Type: application/json"
```

### Consultar reporte sin enviar email:

```bash
curl "https://saludcompartida.app/api/report-accumulated?sendEmail=false"
```

### Reporte de período específico:

```bash
curl "https://saludcompartida.app/api/report-accumulated?startDate=2025-01-01&endDate=2025-01-31"
```

---

## 🚀 Despliegue

### Paso 1: Agregar Variable en Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto: **MVP-SaludCompartida**
3. Ve a: **Settings → Environment Variables**
3. Agrega:
   - **Key**: `CRON_SECRET`
   - **Value**: (genera con `openssl rand -base64 32`)
   - **Environments**: Production, Preview, Development

### Paso 2: Desplegar Cambios

```bash
git add vercel.json api/cron/send-daily-reports.js api/report-accumulated.js
git commit -m "feat: add automatic daily reports (7am & 7pm Mexico time)"
git push origin main
```

### Paso 3: Verificar Cron Jobs

1. Ve a Vercel Dashboard → tu proyecto
2. Click en **Cron Jobs** en el menú lateral
3. Verifica que aparezcan los 2 cron jobs programados
4. Status debe ser: **Active**

---

## 📊 Monitoreo

### Ver Logs de Ejecución:

1. Vercel Dashboard → tu proyecto
2. **Deployments** → selecciona el último deployment
3. **Functions** → busca `send-daily-reports`
4. Click para ver logs de ejecución

### Logs Esperados:

```
🕐 Ejecutando cron job de reportes diarios...
✅ Reporte enviado exitosamente: 5 usuarios
```

---

## ⚠️ Troubleshooting

### ❌ Error 401 "No autorizado"
- **Causa**: `CRON_SECRET` no configurado o incorrecto
- **Solución**: Verifica la variable en Vercel Dashboard

### ❌ Error 500 al generar reporte
- **Causa**: Problema con Supabase o Resend
- **Solución**: Verifica que `SUPABASE_SERVICE_KEY` y `RESEND_API_KEY` estén configurados

### ❌ Emails no llegan
- **Causa**: Límite de Resend alcanzado o emails inválidos
- **Solución**: Verifica en Resend Dashboard los logs de envío

---

## 📅 Calendario de Ejecución

| Día       | Reporte Mañana (7:00 AM) | Reporte Tarde (7:00 PM) |
|-----------|--------------------------|-------------------------|
| Lunes     | ✅                       | ✅                      |
| Martes    | ✅                       | ✅                      |
| Miércoles | ✅                       | ✅                      |
| Jueves    | ✅                       | ✅                      |
| Viernes   | ✅                       | ✅                      |
| Sábado    | ✅                       | ✅                      |
| Domingo   | ✅                       | ✅                      |

**Total**: 14 reportes por semana (2 por día × 7 días)

---

## 🔐 Seguridad

- ✅ Autenticación con token secreto
- ✅ Solo Vercel Cron puede ejecutar el endpoint
- ✅ Logs de auditoría en cada ejecución
- ✅ Variables sensibles en environment variables (no en código)

---

## 📞 Contacto

Si hay problemas con los reportes, los proveedores pueden contactar:
- **Email**: support@saludcompartida.app
- **Sistema**: Salud Compartida - Reportes Automáticos
