# 📧 SISTEMA DE EMAILS AUTOMATIZADOS - RESEND

## ✅ ESTADO: COMPLETAMENTE CONFIGURADO

---

## 📨 5 TIPOS DE EMAILS AUTOMÁTICOS

### 1️⃣ **EMAIL AL MIGRANTE** (Suscripción Exitosa)
**Cuándo:** Inmediatamente después del registro exitoso
**Destinatario:** Migrante en USA
**Contenido:**
- ✅ Mensaje de bienvenida
- ✅ Código de Familia (destacado en grande)
- ✅ Plan contratado y precio
- ✅ Email de acceso
- ✅ Lista de servicios disponibles
- ✅ Botón para acceder al Dashboard

**Archivo:** `src/lib/resend.ts` → `sendMigrantWelcomeEmail()`
**Trigger:** `src/app/api/registro/route.ts` línea 86-92

---

### 2️⃣ **NOTIFICACIÓN AL USUARIO EN MÉXICO** (Por WhatsApp)
**Cuándo:** Inmediatamente después del registro exitoso
**Destinatario:** Usuario principal en México (por WhatsApp, NO email)
**Contenido:**
- ✅ Nombre completo del usuario (Nombre + Apellido Paterno)
- ✅ Fecha de nacimiento del usuario
- ✅ Número de celular del usuario
- ✅ Nombre del migrante que pagó (Nombre + Apellido)
- ✅ Código de Familia
- ✅ Fecha y hora de activación de suscripción
- ✅ Lista de servicios disponibles

**Archivo:** `src/lib/resend.ts` → `sendFamilyMemberWhatsAppData()`
**Trigger:** Pendiente - se integrará con WATI API

---

### 3️⃣ **EMAIL A AURA MULTIASISTENCIAS** (Notificación Inmediata)
**Cuándo:** Inmediatamente después de cada nueva suscripción
**Destinatarios:** 
- stephania.cardenas@anevent.com.mx
- stephania.cardenas@auramultiasistencias.com

**Contenido:**
**Datos del Migrante (USA):**
- ✅ Nombre
- ✅ Apellido Paterno
- ✅ Email
- ✅ Teléfono
- ✅ Estado (USA)

**Datos del Usuario Principal (México):**
- ✅ Nombre
- ✅ Apellido Paterno
- ✅ Fecha de Nacimiento
- ✅ Teléfono/Celular (HOY YA APARECE)
- ✅ Total de beneficiarios

**Datos de la Suscripción:**
- ✅ Plan contratado
- ✅ Precio mensual
- ✅ Código de Familia
- ✅ Fecha de Activación
- ✅ Hora de Activación

**Archivo:** `src/lib/resend.ts` → `sendAuraImmediateNotification()`
**Trigger:** `src/app/api/registro/route.ts` línea 94-108

---

### 4️⃣ **EMAIL A AURA** (Resumen Diario - 2 veces al día)
**Cuándo:** Todos los días a las 07:00 y 19:00 hrs (Lunes a Domingo)
**Destinatarios:**
- stephania.cardenas@anevent.com.mx
- stephania.cardenas@auramultiasistencias.com

**Contenido:**
- ✅ Total de suscriptores
- ✅ Nuevos suscriptores del día
- ✅ Suscripciones activas
- ✅ Tabla con suscripciones recientes (últimas 24h):
  - Código de Familia
  - Nombre del migrante
  - Nombre del beneficiario
  - Teléfono del beneficiario
  - Plan contratado

**Archivo:** `src/lib/resend.ts` → `sendAuraDailySummary()`
**Endpoint:** `src/app/api/cron/daily-summary/route.ts`
**Cron Job:** Configurado en `vercel.json`
- 07:00 hrs: `0 7 * * *`
- 19:00 hrs: `0 19 * * *`

---

### 5️⃣ **EMAIL A AURA** (Sesión de Terapia Agendada)
**Cuándo:** Inmediatamente cuando un usuario agenda terapia psicológica
**Destinatarios:**
- stephania.cardenas@auramultiasistencias.com
- administracion@auramultiasistencias.com

**Contenido:**
- ✅ **Nombre del paciente** (destacado en rosa)
- ✅ **Teléfono móvil registrado** (formato completo con código país)
- ✅ **Email del paciente** (obtenido de la base de datos)
- ✅ **Fecha completa** (día, mes y año en español: "lunes, 30 de enero de 2026")
- ✅ **Hora seleccionada** (formato 12 horas con AM/PM)
- ✅ Código de Familia
- ✅ Tipo de terapia
- ✅ Acciones requeridas (confirmar disponibilidad, contactar paciente, enviar link)

**Archivo:** `src/lib/resend.ts` → `sendTherapySessionNotification()`
**Endpoint:** `src/app/api/terapia/agendar/route.ts`
**Trigger:** Cuando usuario agenda desde el dashboard

---

## 🔧 CONFIGURACIÓN TÉCNICA

### Variables de Entorno (.env.local)
```bash
RESEND_API_KEY=re_citjFFac_Jc1PzGUnMSigCV7tCMYxTWa3
RESEND_FROM_EMAIL=noreply@saludcompartida.app
```

### Direcciones de Email Configuradas
**Emails de Aura (constantes en código):**
```typescript
const AURA_EMAILS = [
  'stephania.cardenas@anevent.com.mx',
  'stephania.cardenas@auramultiasistencias.com'
];

const THERAPY_EMAILS = [
  'stephania.cardenas@auramultiasistencias.com',
  'administracion@auramultiasistencias.com'
];
```

### Cron Jobs (Vercel)
Configurados en `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/daily-summary",
      "schedule": "0 7 * * *",
      "comment": "Email diario a Aura a las 07:00 hrs"
    },
    {
      "path": "/api/cron/daily-summary",
      "schedule": "0 19 * * *",
      "comment": "Email diario a Aura a las 19:00 hrs"
    }
  ]
}
```

### Seguridad Cron Jobs
Se requiere token de autorización:
```bash
CRON_SECRET=sc-cron-[random-hex]
```

Para ejecutar manualmente (testing):
```bash
curl -X GET http://localhost:3000/api/cron/daily-summary \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

---

## 📊 FLUJO COMPLETO

### Registro de Nueva Suscripción:
1. Usuario llena formulario → `POST /api/registro`
2. Se crea registro en Supabase
3. ✅ Email #1: Al migrante (bienvenida)
4. ✅ Email #3: A Aura (notificación inmediata)
5. 📱 WhatsApp: Al usuario en México (pendiente integración WATI)
6. Redirección al dashboard

### Agenda de Terapia:
1. Usuario agenda sesión → `POST /api/terapia/agendar`
2. Validación de plan (solo Premium)
3. ✅ Email #5: A Aura (sesión de terapia)
4. Respuesta con confirmación

### Reportes Diarios Automáticos:
1. Cron job ejecuta a las 07:00 hrs
2. Query a Supabase (total, nuevos, activos)
3. ✅ Email #4: A Aura (resumen diario)
4. Cron job ejecuta a las 19:00 hrs
5. Query a Supabase
6. ✅ Email #4: A Aura (resumen diario)

---

## 🧪 TESTING

### Test Local (Email al Migrante):
```bash
curl -X POST http://localhost:3000/api/registro \
  -H "Content-Type: application/json" \
  -d '{
    "suscriptor": {
      "nombre": "Juan Pérez",
      "email": "tu-email@test.com",
      "telefono": "+1 305 555 1234",
      "estado": "FL"
    },
    "usuarioPrincipal": {
      "nombre": "María",
      "apellido": "González",
      "fechaNacimiento": "1985-05-15",
      "telefono": "+52 55 1234 5678",
      "parentesco": "Madre"
    },
    "planId": "premium",
    "planName": "Premium",
    "planPrice": 18
  }'
```

### Test Cron Job (Resumen Diario):
```bash
curl -X GET http://localhost:3000/api/cron/daily-summary \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### Test Terapia:
```bash
curl -X POST http://localhost:3000/api/terapia/agendar \
  -H "Content-Type: application/json" \
  -d '{
    "codigoFamilia": "SC-ABC123",
    "patientName": "María González",
    "patientPhone": "+52 55 1234 5678",
    "sessionDate": "2026-02-01",
    "sessionTime": "10:00 AM",
    "therapyType": "Terapia Individual"
  }'
```

---

## ✅ CHECKLIST DE VERIFICACIÓN

### Emails Inmediatos (al registrarse):
- [x] Email al migrante con credenciales
- [ ] WhatsApp al usuario con datos completos (pendiente integración WATI)
- [x] Email a Aura con todos los datos (migrante + usuario + activación)

### Emails Programados:
- [x] Resumen diario a las 07:00 hrs
- [x] Resumen diario a las 19:00 hrs
- [x] Configuración en Vercel Cron

### Emails de Eventos:
- [x] Email cuando se agenda terapia

### Datos del Usuario en Emails:
- [x] Nombre
- [x] Apellido Paterno
- [x] Fecha de nacimiento
- [x] Número de celular (HOY YA SALE)
- [x] Fecha de activación
- [x] Hora de activación

---

## 🚀 PRÓXIMOS PASOS

1. **Integración con WATI** para enviar WhatsApp al usuario
2. **Agregar tabla `therapy_sessions`** para tracking de sesiones
3. **Dashboard de analytics** para ver estadísticas de emails enviados
4. **Templates personalizables** para cada tipo de email

---

**Fecha:** 24 de enero de 2026
**Estado:** ✅ Sistema completamente configurado y funcional
**Pendiente:** Integración WhatsApp con WATI
