# ESTRUCTURA TÉCNICA COMPLETA - SALUD COMPARTIDA MVP

**Última actualización:** 17 de Enero, 2026  
**Launch Target:** 8 de Febrero, 2026 (22 días restantes)

---

## 📋 ÍNDICE

1. [Arquitectura General](#arquitectura-general)
2. [Repositorios](#repositorios)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Servicios Externos](#servicios-externos)
5. [Estructura de Archivos](#estructura-de-archivos)
6. [Base de Datos](#base-de-datos)
7. [APIs y Endpoints](#apis-y-endpoints)
8. [Configuración de Entorno](#configuración-de-entorno)
9. [Flujos Críticos](#flujos-críticos)
10. [Credenciales y Accesos](#credenciales-y-accesos)
11. [Tareas Pendientes](#tareas-pendientes)

---

## 🏗️ ARQUITECTURA GENERAL

### Diagrama de Sistemas

```
┌─────────────────────────────────────────────────────────────┐
│                        USUARIO FINAL                         │
│              (Migrante USA + Familiar México)                │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                        │
│  • saludcompartida.app (MVP funcional)                      │
│  • saludcompartida.com (Marketing site)                     │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                 VERCEL (Hosting + API)                       │
│  • Auto-deploy desde GitHub                                 │
│  • Serverless Functions (/api/*)                            │
│  • Environment Variables                                     │
└─────┬────────────────────────────────────┬─────────────────┘
      │                                    │
      ▼                                    ▼
┌──────────────────┐              ┌────────────────────┐
│   SUPABASE       │              │  SERVICIOS PAGO    │
│   (PostgreSQL)   │              │  • Square          │
└──────────────────┘              └────────────────────┘
      │
      ▼
┌──────────────────────────────────────────────────────────────┐
│                  COMUNICACIONES & IA                          │
│  ┌──────────┐  ┌──────────┐  ┌────────┐  ┌──────────┐      │
│  │  Resend  │  │   WATI   │  │ Vapi   │  │ Telnyx   │      │
│  │  Email   │  │ WhatsApp │  │ AI Voice│ │  Phone   │      │
│  └──────────┘  └──────────┘  └────────┘  └──────────┘      │
└──────────────────────────────────────────────────────────────┘
```

---

## 📁 REPOSITORIOS

### 1. MVP-SaludCompartida
- **URL:** github.com/fabiolafrancoc-lab/MVP-SaludCompartida
- **Deploy:** saludcompartida.app (Vercel)
- **Propósito:** Aplicación funcional MVP (registro, pago, acceso a servicios)
- **Framework:** Next.js + Vite + React
- **Rama principal:** `main`
- **Último commit:** `543dd2e` - Fix WhatsApp con WATI y prefijos

### 2. saludcompartida-website
- **URL:** github.com/fabiolafrancoc-lab/saludcompartida-website
- **Deploy:** saludcompartida.com (Vercel)
- **Propósito:** Sitio de marketing para inversores
- **Framework:** Next.js + React
- **Contenido:**
  - Landing page
  - AI Companion explanation
  - Vision & Mission
  - Problem & Solution
  - Why We Built (con video testimonial)
  - Team/Founder
  - One-Pager Investor
  - Request Pitch Deck

---

## 🛠️ STACK TECNOLÓGICO

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Build:** Vite 4.5.14
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Forms:** React Hook Form
- **State:** React useState/useEffect

### Backend
- **Runtime:** Node.js (Vercel Serverless)
- **API Routes:** `/api/*` (Serverless Functions)
- **Database Client:** @supabase/supabase-js

### Deployment
- **Platform:** Vercel
- **Auto-deploy:** GitHub main branch
- **Region:** Washington D.C. (iad1)
- **Build time:** ~42 segundos

---

## 🌐 SERVICIOS EXTERNOS

### 1. Supabase (Base de Datos)
- **Tipo:** PostgreSQL managed
- **URL:** https://rzmdekjegbdgitqekjee.supabase.co
- **Plan:** Free tier
- **Tablas principales:**
  - `registrations` - Registros de usuarios (migrante + familiar)
  - `ai_voice_calls` - Historial de llamadas de IA
  - `scheduled_voice_calls` - Llamadas programadas
  - `user_accounts` - Cuentas de usuario
  - `dependents` - Dependientes adicionales
  - `ai_agents` - Configuración de agentes IA

### 2. Square (Pagos)
- **Modo:** Sandbox (Testing)
- **Plan:** 2.9% + $0.30 por transacción
- **Endpoint:** https://connect.squareupsandbox.com/v2/payments
- **Funcionalidad:** Procesamiento de pagos de $8 USD
- **Nota:** Cambiar a producción antes del launch

### 3. Resend (Email)
- **Plan:** Free (3,000 emails/mes)
- **From:** noreply@saludcompartida.com
- **Funcionalidad:**
  - Códigos de acceso post-registro
  - Confirmaciones de pago
  - Notificaciones internas

### 4. WATI.io (WhatsApp Business)
- **Plan:** $39-99/mes
- **Endpoint:** https://live-mt-server.wati.io/1079185
- **Número:** +1 555 842 0346
- **Estado:** ⏳ In Review (Meta approval pending)
- **WhatsApp Account ID:** 1433651735097334
- **Funcionalidad:**
  - Envío de códigos de acceso
  - Mensajes automáticos
  - Soporte conversacional

### 5. Vapi.ai (AI Voice Calls)
- **Plan:** $0.05/minuto
- **Phone Number ID:** 9aafdbd3-9d61-49f5-929a-51bb2323419f
- **API Key:** 7a98160a-9d78-42ee-b2c2-26ee6e11accb
- **Agentes:** 10 personalidades (Lupita, María, Don Roberto, etc.)
- **Voces:** ElevenLabs (Spanish)
- **Transcription:** Deepgram
- **Model:** GPT-4-turbo

### 6. Telnyx (Phone Number Provider)
- **Plan:** ~$2/mes + $0.02/min
- **Número:** +52 55 9990 6900 (México, CDMX)
- **Estado:** ⏳ Under Review (Mexico telecom approval pending)
- **API Key:** KEY019BC93F6844CB50992CA02D896CB213_SrTiY0U82u95qwffhyLVjb
- **Connection ID:** 2874463422819338156
- **Connection Name:** VAPI_AI_CALLS

### 7. Weaviate (Vector Database)
- **Plan:** Free tier
- **Host:** 62hwk50s3cnpffte41fdq.c0.us-east1.gcp.weaviate.cloud
- **Funcionalidad:** Memoria de llamadas, aprendizaje colectivo
- **Embeddings:** OpenAI text-embedding-3-small (1536 dim)
- **Estado:** Configurado pero no crítico para MVP

### 8. OpenAI
- **Modelo:** GPT-4-turbo (conversaciones)
- **Embeddings:** text-embedding-3-small (Weaviate)
- **Costo:** ~$0.03/llamada

---

## 📂 ESTRUCTURA DE ARCHIVOS

### MVP-SaludCompartida/

```
├── api/
│   ├── check-env.js                    # Verificar variables de entorno
│   ├── create-checkout-session.js       # Crear sesión de pago
│   ├── make-voice-call.js              # ⭐ Llamadas de voz con IA (10 agentes)
│   ├── process-payment.js              # Procesar pagos Square
│   ├── save-pre-checkout.js            # Guardar pre-checkout
│   ├── send-access-codes.js            # Enviar códigos automáticos (cron)
│   ├── send-email.js                   # Enviar emails con Resend
│   ├── send-whatsapp.js                # ⭐ Enviar WhatsApp con WATI (FIX reciente)
│   ├── send-whatsapp-wati.js           # Wrapper de WATI
│   ├── square-payment.js               # API de Square
│   ├── stripe-webhook.js               # Webhook Stripe (no usado)
│   ├── vapi-webhook.js                 # ⭐ Webhook de Vapi (nuevo)
│   ├── verify-session.js               # Verificar sesión de pago
│   ├── whatsapp-incoming.js            # Webhook WhatsApp entrante
│   └── whatsapp-status.js              # Status de WhatsApp
│
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── public/
│   └── founder-testimonial.mp4         # Video local (82.95 MB)
│
├── scripts/
│   ├── create-ai-voice-calls-table.sql # ⭐ Tabla para llamadas IA
│   ├── create-dependents-table.sql
│   ├── create-registrations-table.sql
│   ├── fix-phone-number.sql
│   └── send-access-codes.js            # Script cron
│
├── src/
│   ├── lib/
│   │   ├── supabase.js                 # Cliente Supabase
│   │   ├── weaviate-client.js          # ⭐ Cliente Weaviate (memoria IA)
│   │   └── notifications.js
│   │
│   ├── pages/
│   │   ├── Registro.jsx                # Formulario de registro
│   │   ├── Pago.jsx                    # Página de pago Square
│   │   ├── Confirmacion.jsx            # Confirmación post-pago
│   │   └── privacy.jsx
│   │
│   └── components/
│       └── [varios componentes UI]
│
├── .env                                 # ⭐ Variables locales
├── vercel.json                          # Config Vercel
├── package.json
└── vite.config.js
```

### Archivos Críticos Modificados Recientemente

1. **`/api/make-voice-call.js`** (líneas 8-307)
   - 10 personalidades de IA (AGENT_VOICES)
   - System prompts dinámicos
   - Integración Vapi + ElevenLabs + GPT-4

2. **`/api/send-whatsapp.js`** (cambio crítico)
   - Antes: Twilio ❌
   - Ahora: WATI ✅
   - Respeta prefijos +1 (USA) y +52 (México)

3. **`/api/vapi-webhook.js`** (nuevo)
   - Recibe eventos de Vapi (call-start, call-end)
   - Guarda transcripciones en Supabase

4. **`/src/lib/weaviate-client.js`**
   - Memoria de llamadas
   - Búsqueda semántica
   - Aprendizaje colectivo

---

## 🗄️ BASE DE DATOS (SUPABASE)

### Tabla: `registrations`
```sql
- id (uuid, PK)
- migrant_first_name (text)
- migrant_last_name (text)
- migrant_email (text)
- migrant_country_code (text) -- "+1"
- migrant_phone (text) -- sin prefijo: "3055227150"
- migrant_access_code (text) -- código único
- family_first_name (text)
- family_last_name (text)
- family_email (text)
- family_country_code (text) -- "+52"
- family_phone (text) -- sin prefijo: "5543454567"
- family_access_code (text)
- family_country (text)
- traffic_source (text)
- created_at (timestamp)
```

### Tabla: `ai_voice_calls` (NUEVA)
```sql
- id (uuid, PK)
- vapi_call_id (text, unique)
- phone_number (text)
- agent_id (text) -- "agent_001" a "agent_010"
- user_email (text, FK)
- duration_seconds (integer)
- cost_usd (decimal)
- transcript (jsonb)
- recording_url (text)
- end_reason (text)
- call_reason (text)
- created_at (timestamp)
- updated_at (timestamp)
```

### Índices Importantes
```sql
- idx_registrations_phone
- idx_registrations_email
- idx_ai_voice_calls_phone
- idx_ai_voice_calls_vapi_id
```

---

## 🔌 APIs Y ENDPOINTS

### Endpoints Críticos

#### `/api/make-voice-call` (POST)
**Propósito:** Iniciar llamada de voz con IA  
**Payload:**
```json
{
  "phone": "+13055227150",
  "agentId": "agent_005",
  "callReason": "welcome",
  "userName": "Fabiola"
}
```
**Response:**
```json
{
  "success": true,
  "callId": "019bcc82-0451-7ddf-8855-b8f90de4a11a",
  "agent": { "id": "agent_005", "name": "María", "age": 32 },
  "status": "calling"
}
```

#### `/api/send-whatsapp` (POST)
**Propósito:** Enviar mensaje por WhatsApp  
**Payload:**
```json
{
  "to": "3055227150",
  "message": "Tu código: ABC123",
  "countryCode": "+1"
}
```
**Nota:** Agrega prefijo automáticamente según countryCode

#### `/api/send-whatsapp-wati` (GET/POST)
**GET:** Health check  
**POST:** Enviar mensaje vía WATI

#### `/api/process-payment` (POST)
**Propósito:** Procesar pago con Square  
**Flujo:**
1. Verificar sesión
2. Procesar pago con Square
3. Enviar emails (Resend)
4. Enviar WhatsApp (WATI) - puede fallar si en review
5. Guardar en Supabase

#### `/api/vapi-webhook` (POST)
**Propósito:** Recibir eventos de Vapi.ai  
**Eventos:**
- `call-start` - Llamada iniciada
- `call-end` - Llamada terminada (con transcripción)
- `function-call` - IA solicita función

---

## ⚙️ CONFIGURACIÓN DE ENTORNO

### Variables en Vercel (Production)

#### Base de Datos
```
SUPABASE_URL=https://rzmdekjegbdgitqekjee.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...
```

#### Pagos
```
SQUARE_ACCESS_TOKEN=[sandbox token]
SQUARE_LOCATION_ID=[location ID]
```

#### Email
```
RESEND_API_KEY=re_citjF...
```

#### WhatsApp (WATI)
```
WATI_ENDPOINT=https://live-mt-server.wati.io/1079185
WATI_API_TOKEN=eyJhbGc...
WATI_WHATSAPP_NUMBER=+15558420346
```

#### Voice AI (Vapi + Telnyx)
```
VAPI_API_KEY=7a98160a-9d78-42ee-b2c2-26ee6e11accb
VAPI_PHONE_NUMBER_ID=9aafdbd3-9d61-49f5-929a-51bb2323419f
TELNYX_API_KEY=KEY019BC93F6844CB50992CA02D896CB213_SrTiY0U82u95qwffhyLVjb
TELNYX_CONNECTION_ID=2874463422819338156
TELNYX_PHONE_NUMBER=+525599906900
```

#### AI Memory (Weaviate)
```
WEAVIATE_URL=62hwk50s3cnpffte41fdq.c0.us-east1.gcp.weaviate.cloud
WEAVIATE_API_KEY=NkdOWW4...
```

#### OpenAI
```
OPENAI_API_KEY=[tu key]
```

---

## 🔄 FLUJOS CRÍTICOS

### Flujo 1: Registro + Pago
```
Usuario → Registro.jsx
  ↓ (captura datos)
Pago.jsx (Square)
  ↓ (pago exitoso)
process-payment.js
  ├─→ send-email.js (Resend) ✅
  ├─→ send-whatsapp.js (WATI) ⏳ (en review)
  └─→ Supabase (guardar)
  ↓
Confirmacion.jsx
```

### Flujo 2: Llamada de Voz AI
```
Sistema/Usuario → /api/make-voice-call
  ↓
Vapi.ai API
  ├─→ GPT-4 (conversación)
  ├─→ ElevenLabs (voz en español)
  └─→ Deepgram (transcripción)
  ↓
Telnyx (+52 55 9990 6900)
  ↓
Usuario recibe llamada
  ↓
Vapi webhook → /api/vapi-webhook
  ↓
Supabase (ai_voice_calls)
```

### Flujo 3: WhatsApp Automático
```
Trigger (cron/evento) → send-whatsapp.js
  ↓
Formatear número:
  - Si no tiene "+": agregar countryCode
  - Migrante: +1 + número
  - Familiar: +52 + número
  ↓
WATI API → WhatsApp Business
  ↓
Usuario recibe mensaje
```

---

## 🔐 CREDENCIALES Y ACCESOS

### Números de Contacto
- **Personal:** +1 305 522 7150
- **WhatsApp Business:** +1 555 842 0346 (⏳ en revisión)
- **Telnyx Voice:** +52 55 9990 6900 (⏳ en revisión)

### Dashboards
- **Vercel:** vercel.com/fabiolafrancoc-lab/saludcompartida
- **Supabase:** supabase.com/dashboard/project/rzmdekjegbdgitqekjee
- **Square:** squareup.com/dashboard
- **WATI:** app.wati.io/dashboard
- **Vapi:** vapi.ai/dashboard
- **Telnyx:** portal.telnyx.com

### Emails
- **Personal:** fabiola.franco@bopidea.com
- **Contacto:** ffranco@saludcompartida.com
- **Sistema:** noreply@saludcompartida.com

---

## ✅ TAREAS PENDIENTES

### 🔴 CRÍTICO (Pre-Launch)
- [ ] Esperar aprobación Meta WhatsApp (+1 555 842 0346)
- [ ] Esperar aprobación México Telnyx (+52 55 9990 6900)
- [ ] Cambiar Square de sandbox a producción
- [ ] Definir números de contacto para telemedicina/farmacia/psicología
- [ ] Test end-to-end completo (registro → pago → email → WhatsApp → voice call)

### 🟡 IMPORTANTE (MVP)
- [ ] Desarrollar mensajes automáticos de WhatsApp
  - Recordatorios de medicamentos
  - Confirmaciones de citas
  - Check-ins de seguimiento
- [ ] Desarrollar serie de emails automáticos
  - Bienvenida migrante (3-5 emails)
  - Bienvenida familiar (3-5 emails)
  - Recordatorios de servicios
- [ ] Agregar números de contacto en .app:
  - Telemedicina 24/7
  - Farmacia
  - Consulta Psicológica
- [ ] Optimizar bundle size (1.7MB → target <500KB)

### 🟢 POST-LAUNCH
- [ ] Migrar de WATI a Meta API Direct (más confiable)
- [ ] Implementar sistema de cron jobs para llamadas programadas
- [ ] Activar Weaviate completamente (memoria colectiva)
- [ ] Agregar analytics (Meta Pixel, TikTok Pixel funcionando)
- [ ] Mobile optimization completa
- [ ] A/B testing de landing pages

---

## 📊 MÉTRICAS Y MONITOREO

### KPIs Técnicos
- **Build time:** ~42s
- **Bundle size:** 1.7MB (JavaScript)
- **Uptime target:** 99.9%
- **Response time:** <2s (API endpoints)

### Costos Proyectados (MVP)
- **Vercel:** $0 (free tier)
- **Supabase:** $0 (free tier)
- **Square:** 2.9% + $0.30 por transacción
- **Resend:** $0 hasta 3K emails/mes
- **WATI:** $39-99/mes
- **Vapi:** $0.05/min (~$3-5/100 llamadas)
- **Telnyx:** $2/mes + $0.02/min
- **Total estimado:** ~$50-150/mes (MVP inicial)

---

## 🚀 DEPLOYMENT

### Proceso Actual
1. Commit a `main` branch
2. GitHub trigger webhook a Vercel
3. Vercel build automático (~42s)
4. Deploy a producción
5. URL live: saludcompartida.app

### Rollback
```bash
# Ver deployments
vercel list

# Rollback a deployment anterior
vercel rollback [deployment-url]
```

---

## 📝 NOTAS IMPORTANTES

### Decisiones Arquitectónicas Clave

1. **WhatsApp NO hace voice calls:** Meta API limitation. Por eso Telnyx + Vapi separado.

2. **Números sin prefijos en DB:** Se guardan limpios (3055227150) con country_code separado (+1, +52). El backend agrega prefijos al enviar.

3. **Square sandbox:** Para testing. Cambiar a producción antes del 8 Feb.

4. **10 Agentes IA:** Cada uno con personalidad, voz y tono único (Lupita, María, Don Roberto, etc.)

5. **Voice calls = prioridad #1:** Relaciones requieren voz, no texto. Es el diferenciador clave.

---

## 🔗 ENLACES ÚTILES

- **Documentación Vapi:** docs.vapi.ai
- **Documentación WATI:** docs.wati.io
- **Documentación Telnyx:** developers.telnyx.com
- **Documentación Square:** developer.squareup.com
- **Documentación Resend:** resend.com/docs

---

**Documento mantenido por:** GitHub Copilot + Fabiola Franco  
**Última revisión:** 17 de Enero, 2026  
**Versión:** 1.0
