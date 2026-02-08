# Reporte Técnico: Arquitectura MVP Salud Compartida

**Fecha:** 17 de Enero, 2026  
**Proyecto:** Salud Compartida - Plataforma de Telemedicina para Familias Transfronterizas  
**Stack:** Next.js 16.1.3 + Supabase + Vapi.ai + Telnyx + Square/Stripe + WATI/Meta WhatsApp

---

## 1. ARQUITECTURA GENERAL DEL SISTEMA

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                          │
│  Next.js 16.1.3 App Router + React + TailwindCSS               │
│  Domain: https://www.saludcompartida.app                       │
│  Hosting: Vercel (Production)                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND/API LAYER                          │
│  Serverless Functions (Vercel API Routes)                       │
│  - /api/square-payment.js                                       │
│  - /api/send-whatsapp.js                                        │
│  - /api/send-email.js                                           │
│  - /api/send-sms.js                                             │
│  - /api/stripe-webhook.js                                       │
│  - /api/vapi/*.js (proprietary functions)                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────┬────────────────┬────────────────┬──────────────┐
│   DATABASE     │   PAYMENTS     │   COMMS        │   AI VOICE   │
│   Supabase     │   Square       │   WATI/Meta    │   Vapi.ai    │
│   PostgreSQL   │   Stripe       │   Resend       │   +Telnyx    │
└────────────────┴────────────────┴────────────────┴──────────────┘
```

---

## 2. COMPONENTES PRINCIPALES

### 2.1 Frontend (Next.js)
**Ubicación:** `/src/` y `/app/`

```
src/
├── views/
│   ├── Pago.jsx              # Flujo de pago con Square
│   ├── Registro.jsx          # Registro de migrante + familiar
│   └── RegistroExitoso.jsx   # Confirmación post-pago
├── components/
│   └── [UI Components]
└── lib/
    └── supabaseClient.js     # Cliente Supabase singleton
```

**Flujo de Registro y Pago:**
1. Usuario llena formulario de registro (migrante + familiar)
2. Datos se pre-guardan en `pre_checkout` (Supabase)
3. Usuario procede a pago (Square Web Payments SDK)
4. Post-pago exitoso → migración a `registrations` + `dependents`
5. Envío automático de códigos de acceso (WhatsApp + Email + SMS)

### 2.2 Base de Datos (Supabase)
**Provider:** Supabase PostgreSQL  
**Proyecto:** mvp-salud-compartida

**Tablas Principales:**
```sql
-- Usuarios registrados
registrations (
  id UUID PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone_number TEXT,
  country TEXT,
  birthdate DATE,
  access_code TEXT UNIQUE,
  payment_status TEXT,
  payment_method TEXT,
  created_at TIMESTAMP
)

-- Dependientes/Familiares
dependents (
  id UUID PRIMARY KEY,
  registration_id UUID REFERENCES registrations,
  full_name TEXT,
  phone_number TEXT,
  relationship TEXT,
  access_code TEXT UNIQUE,
  created_at TIMESTAMP
)

-- Pre-checkout temporal
pre_checkout (
  id UUID PRIMARY KEY,
  email TEXT,
  migrant_data JSONB,
  family_data JSONB,
  created_at TIMESTAMP
)

-- Cuentas de usuario
user_accounts (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  password_hash TEXT,
  access_codes TEXT[],
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP
)
```

**Tablas para Funciones Propietarias Vapi.ai:**
```sql
-- Citas de telemedicina
telemedicine_appointments (
  id UUID,
  phone_number TEXT,
  preferred_date DATE,
  preferred_time TIME,
  reason TEXT,
  urgency_level TEXT,
  status TEXT,
  created_via TEXT DEFAULT 'ai_voice_call'
)

-- Consultas de farmacia
pharmacy_queries (
  id UUID,
  phone_number TEXT,
  medication_name TEXT,
  medication_found BOOLEAN,
  pharmacy_recommended TEXT,
  price_quoted DECIMAL
)

-- Catálogo de medicamentos
medication_catalog (
  id UUID,
  generic_name TEXT,
  brand_names TEXT[],
  price_regular DECIMAL,
  price_discounted DECIMAL,
  pharmacy TEXT,
  requires_prescription BOOLEAN
)

-- Verificaciones de elegibilidad
eligibility_checks (
  id UUID,
  phone_number TEXT,
  service_type TEXT,
  eligible BOOLEAN,
  account_status TEXT
)
```

### 2.3 Pagos
**Proveedor Principal:** Square (Web Payments SDK)  
**Fallback:** Stripe Checkout

**API Endpoints:**
- `POST /api/square-payment.js` - Procesa pagos con Square
- `POST /api/stripe-webhook.js` - Webhook para eventos de Stripe
- `POST /api/create-checkout-session.js` - Crea sesión de Stripe

**Flujo de Pago:**
```javascript
// src/views/Pago.jsx
1. Inicializar Square Payment Form
2. Capturar datos de tarjeta → Square tokeniza
3. POST /api/square-payment con token
4. Backend procesa pago en Square
5. Si exitoso → guarda en Supabase + envía notificaciones
6. Redirige a /registro-exitoso
```

### 2.4 Comunicaciones
**Canales:**
- WhatsApp Business (WATI API - Meta)
- Email (Resend API)
- SMS (Twilio/Telnyx)

**API Endpoints:**
- `/api/send-whatsapp.js`
- `/api/send-email.js`
- `/api/send-sms.js`

---

## 3. INTEGRACIÓN META (WhatsApp) ↔ VAPI.AI

### 3.1 Arquitectura de WhatsApp Business API

```
┌──────────────────────────────────────────────────────────────┐
│                     META WHATSAPP CLOUD API                  │
│                 (WhatsApp Business Platform)                 │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│                    WATI (WhatsApp API Tool)                  │
│  Tenant ID: 1079185                                          │
│  Endpoint: https://live-server-1079185.wati.io              │
│  Version: API v1 (Tenant-specific, not multi-tenant)        │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│              SALUD COMPARTIDA BACKEND                        │
│  /api/send-whatsapp.js                                       │
│  Environment Variables:                                      │
│  - WATI_ENDPOINT=https://live-server-1079185.wati.io       │
│  - WATI_API_TOKEN=Bearer eyJhbGci...                        │
│  - WATI_WHATSAPP_NUMBER=[business number]                   │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 Flujo de Envío de WhatsApp

**POST /api/send-whatsapp.js:**
```javascript
// Estructura de la llamada
const url = `${WATI_ENDPOINT}/api/v1/sendSessionMessage/${formattedPhone}`;
const headers = {
  'Content-Type': 'application/json',
  'Authorization': WATI_API_TOKEN  // Incluye "Bearer " prefix
};
const body = {
  parameters: [
    { name: 'name', value: userName },
    { name: 'access_code', value: accessCode }
  ]
};

// WATI API Response
{
  "result": "success",
  "message_id": "wamid.XXX"
}
```

**Estructura del Token:**
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImZmcmFuY29Ac2FsdWRjb21wYXJ0aWRhLmNvbSIsInRlbmFudF9pZCI6IjEwNzkxODUiLCJleHAiOjI1MzQwMjMwMDgwMH0.itw7Db3grymbcZX5es-YDANZPsDdNewP06Blqp_le2A
```
- **Importante:** Exactamente UN espacio entre "Bearer" y el token
- Token expira: 2534023008000 (muy largo plazo)

**Endpoint Structure Discovery:**
- ❌ `https://live-mt-server.wati.io` → 404 (Version 3 endpoint, no funciona)
- ✅ `https://live-server-1079185.wati.io` → 401/200 (Version 2, funciona)
- ❌ `https://live-server-1079185.wati.io/1079185/...` → 404 (tenant_id duplicado)

### 3.3 Estado Actual de WATI
**Problema Identificado:** Error 401 Unauthorized

**Causa Probable:**
1. Bearer token mal formateado (espacios extra, falta prefijo)
2. Token expirado o regenerado sin actualizar en Vercel
3. Endpoint incorrecto (debe ser live-server-1079185, no live-mt-server)

**Solución Pendiente:**
1. Regenerar token en WATI Dashboard → Settings → API
2. Actualizar `WATI_API_TOKEN` en Vercel con formato: `Bearer [token]`
3. Redeploy en Vercel
4. Test con: `https://www.saludcompartida.app/api/debug-wati?phone=+13055227150`

### 3.4 Relación Meta ↔ Vapi.ai
**IMPORTANTE:** Meta/WhatsApp y Vapi.ai son **sistemas independientes**:

- **Meta/WATI:** Solo mensajes de WhatsApp (texto, plantillas)
- **Vapi.ai:** Solo llamadas de voz con IA
- **NO hay integración directa** entre estos dos sistemas

Si se requiere integración futura:
```
Usuario → WhatsApp (WATI) → Webhook → Backend → Trigger Vapi.ai Call
```

---

## 4. INTEGRACIÓN TELNYX ↔ VAPI.AI

### 4.1 Arquitectura de Telefonía con IA

```
┌──────────────────────────────────────────────────────────────┐
│                    TELNYX (CPaaS Provider)                   │
│  Tipo: Call Control API                                      │
│  Número: +52 (55) 9990 6900                                 │
│  Estado: ACTIVE ✅                                           │
│  Messaging Profile: Configurado                              │
└──────────────────────────────────────────────────────────────┘
                            ↕ SIP/WebRTC
┌──────────────────────────────────────────────────────────────┐
│              VAPI.AI (Voice AI Platform)                     │
│  AI Agents: María, Lupita, Rosa (7 total)                   │
│  LLM: GPT-4 Turbo                                            │
│  TTS: ElevenLabs (voces en español)                          │
│  STT: Deepgram Nova-2 (español)                              │
└──────────────────────────────────────────────────────────────┘
                            ↕ Webhooks
┌──────────────────────────────────────────────────────────────┐
│         SALUD COMPARTIDA PROPRIETARY FUNCTIONS               │
│  /api/vapi/schedule-appointment.js                           │
│  /api/vapi/check-pharmacy.js                                 │
│  /api/vapi/verify-eligibility.js                             │
│  → Conectan con Supabase                                     │
└──────────────────────────────────────────────────────────────┘
```

### 4.2 Flujo de Llamadas

#### INBOUND Call (Cliente llama al sistema)
```
1. Usuario marca +52 55 9990 6900
2. Telnyx recibe llamada → SIP signaling
3. Telnyx webhook → Vapi.ai endpoint
4. Vapi.ai asigna AI Assistant (según configuración)
5. ElevenLabs TTS genera voz: "¡Hola! Soy María..."
6. Usuario habla → Deepgram STT transcribe
7. GPT-4 procesa → genera respuesta
8. Loop 5-7 hasta que termina llamada
9. Vapi.ai envía call.hangup → Telnyx cierra conexión
```

#### OUTBOUND Call (Sistema llama al usuario)
```
1. Trigger desde backend: POST /api/vapi/make-call
2. Vapi.ai API → POST https://api.vapi.ai/call
   Body: {
     assistantId: "maria-id",
     customer: { number: "+525543456787" },
     phoneNumberId: "telnyx-number-id"
   }
3. Vapi.ai → Telnyx API: Iniciar llamada saliente
4. Telnyx marca al número del cliente
5. Cliente contesta → Flujo igual que INBOUND
```

### 4.3 Webhooks de Telnyx

**Eventos Recibidos (Ejemplo del 17/01/2026):**
```
call.initiated     → Llamada iniciada por Telnyx
call.answered      → Cliente contestó
call.speak.started → IA empezó a hablar
call.speak.ended   → IA terminó de hablar
call.hangup        → Llamada finalizada
```

**Configuración en Telnyx:**
```
Connection Application → Vapi Integration
Webhook URL: https://api.vapi.ai/inbound/{account-id}
Authentication: API Key V2
```

### 4.4 Error Actual: 403 Forbidden

**Logs de Vapi.ai:**
```
call.start.error-get-transport
Couldn't Make Telnyx Call. Error: Request failed with status code 403
```

**Diagnóstico:**
- ✅ Telnyx número ACTIVO
- ✅ Vapi.ai tiene configuración de Telnyx
- ❌ API Key de Telnyx no tiene permisos correctos
- ❌ O la API Key está expirada/inválida

**Causa Raíz:**
La API Key de Telnyx configurada en Vapi.ai no tiene los **scopes/permisos** necesarios para:
- Hacer llamadas salientes (outbound calls)
- Controlar sesiones de voz (call control)

**Solución Requerida:**
1. Ir a Telnyx Portal → https://portal.telnyx.com/#/app/api-keys
2. Verificar/crear API Key con permisos:
   - ✅ Voice (Call Control)
   - ✅ Phone Numbers
   - ✅ Messaging (opcional)
3. En Vapi.ai → Settings → Providers → Telnyx
4. Actualizar/regenerar conexión con nueva API Key
5. Test: Hacer llamada OUTBOUND desde Vapi.ai dashboard

---

## 5. AI AGENTS CONFIGURADOS

### 5.1 María (Agente Principal)
**Archivo:** Configuración en Vapi.ai Dashboard

```json
{
  "name": "María",
  "age": 32,
  "personality": "energética y moderna",
  "objective": "Dar bienvenida, confirmar código de acceso, explicar servicio",
  "model": {
    "provider": "openai",
    "model": "gpt-4-turbo",
    "temperature": 0.7
  },
  "voice": {
    "provider": "11labs",
    "voiceId": "pNInz6obpgDQGcFmaJgB",
    "stability": 0.6,
    "similarityBoost": 0.85
  },
  "transcriber": {
    "provider": "deepgram",
    "model": "nova-2",
    "language": "es"
  },
  "firstMessage": "¡Hola! Soy María de Salud Compartida. ¿Cómo estás?",
  "maxDurationSeconds": 600,
  "functions": [
    "schedule_appointment",
    "escalate_to_human"
  ]
}
```

**System Prompt:**
```
Eres María, agente de Salud Compartida de 32 años.
Personalidad energética y moderna.

SOBRE SALUD COMPARTIDA:
- Servicio de telemedicina para familias con migrantes
- $500-1000 MXN/mes
- Atención 24/7
- Descuentos en farmacias

TU OBJETIVO: Dar bienvenida, confirmar código, explicar servicio

IMPORTANTE:
- Habla natural y humana
- Usa "mija", "mi amor" si eres mayor
- Usa "amiga", "compa" si eres joven
- Pregunta cómo está la familia
- Duración ideal: 3-5 minutos
```

### 5.2 Otros AI Agents
- **Lupita** - Atención general
- **Rosa** - Consultas de farmacia
- **Dr. Carlos** - Consultas médicas
- **Psicóloga Ana** - Terapia emocional
- **Agent Urgencias** - Casos de emergencia
- **Agent Farmacia** - Localización de medicamentos

---

## 6. FUNCIONES PROPIETARIAS (VAPI ↔ SUPABASE)

### 6.1 Schedule Appointment
**Endpoint:** `/api/vapi/schedule-appointment.js`

```javascript
// Vapi.ai llama a esta función cuando el usuario solicita cita
export default async function handler(req, res) {
  const { phone_number, date, time, reason, urgency } = req.body;
  
  // Guarda en Supabase
  const { data, error } = await supabase
    .from('telemedicine_appointments')
    .insert({
      phone_number,
      preferred_date: date,
      preferred_time: time,
      reason,
      urgency_level: urgency,
      status: 'pending',
      created_via: 'ai_voice_call'
    });
  
  return res.json({
    success: true,
    appointment_id: data.id,
    message: "Cita agendada exitosamente"
  });
}
```

### 6.2 Check Pharmacy
**Endpoint:** `/api/vapi/check-pharmacy.js`

```javascript
// Busca medicamento en catálogo
export default async function handler(req, res) {
  const { medication_name, location } = req.body;
  
  const { data: medications } = await supabase
    .from('medication_catalog')
    .select('*')
    .ilike('generic_name', `%${medication_name}%`)
    .eq('stock_status', 'available')
    .limit(3);
  
  return res.json({
    found: medications.length > 0,
    medications: medications.map(m => ({
      name: m.generic_name,
      price: m.price_discounted,
      pharmacy: m.pharmacy
    }))
  });
}
```

### 6.3 Verify Eligibility
**Endpoint:** `/api/vapi/verify-eligibility.js`

```javascript
// Verifica si el usuario tiene acceso activo
export default async function handler(req, res) {
  const { phone_number, access_code } = req.body;
  
  const { data: user } = await supabase
    .from('registrations')
    .select('*, dependents(*)')
    .or(`phone_number.eq.${phone_number},access_code.eq.${access_code}`)
    .single();
  
  return res.json({
    eligible: !!user && user.payment_status === 'completed',
    account_status: user?.payment_status || 'not_found',
    services_available: ['telemedicina', 'terapia', 'farmacia']
  });
}
```

---

## 7. VARIABLES DE ENTORNO (VERCEL)

```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci... # Backend only

# Payments
SQUARE_APPLICATION_ID=sandbox-sq0...
SQUARE_ACCESS_TOKEN=EAAA...
SQUARE_LOCATION_ID=L...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Communications
WATI_ENDPOINT=https://live-server-1079185.wati.io
WATI_API_TOKEN=Bearer eyJhbGci... # INCLUDE "Bearer " prefix
WATI_WHATSAPP_NUMBER=+52...
RESEND_API_KEY=re_...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# Vapi.ai (si se usa desde backend)
VAPI_API_KEY=... # Para trigger programático de llamadas
VAPI_PHONE_NUMBER_ID=... # ID del número de Telnyx en Vapi

# Telnyx (usado por Vapi.ai, no directamente)
TELNYX_API_KEY=KEY... # Configurado en Vapi.ai dashboard
```

---

## 8. PROBLEMAS IDENTIFICADOS Y SOLUCIONES

### 8.1 WhatsApp (WATI) - Error 401
**Problema:** Mensajes no llegan, API responde 401 Unauthorized

**Diagnóstico:**
- Endpoint correcto: `https://live-server-1079185.wati.io`
- Token Bearer mal formateado o expirado
- Tests muestran: 401 en endpoint correcto (existe pero falla auth)

**Solución:**
1. WATI Dashboard → Settings → API → Regenerate Token
2. Copiar token COMPLETO
3. Vercel env var: `WATI_API_TOKEN=Bearer [token]` (un espacio)
4. Redeploy
5. Test: `https://www.saludcompartida.app/api/debug-wati?phone=+13055227150`

### 8.2 Vapi.ai + Telnyx - Error 403
**Problema:** Llamadas OUTBOUND fallan con 403 Forbidden

**Diagnóstico:**
- Telnyx número ACTIVO ✅
- Conexión existe en Vapi.ai ✅
- API Key sin permisos correctos ❌
- Error: `call.start.error-get-transport`

**Solución:**
1. Telnyx Portal → API Keys
2. Crear nueva API Key con permisos:
   - Voice (Call Control)
   - Phone Numbers
3. Vapi.ai → Settings → Providers → Telnyx
4. Actualizar API Key
5. Test: Llamada OUTBOUND desde Vapi.ai dashboard

### 8.3 Llamadas INBOUND vs OUTBOUND
**INBOUND (funciona):**
- Usuario marca +52 55 9990 6900
- Telnyx → Vapi.ai webhook funciona
- Webhooks delivered ✅

**OUTBOUND (falla):**
- Vapi.ai → Telnyx API falla con 403
- No puede iniciar llamadas salientes
- Necesita API Key con permisos correctos

---

## 9. PRÓXIMOS PASOS TÉCNICOS

### Prioridad 1: Arreglar Comunicaciones
- [ ] Regenerar token WATI y actualizar en Vercel
- [ ] Verificar/crear API Key Telnyx con permisos completos
- [ ] Actualizar API Key en Vapi.ai
- [ ] Test end-to-end de WhatsApp + Llamadas

### Prioridad 2: Conectar Funciones Propietarias
- [ ] Desplegar endpoints `/api/vapi/*.js` en Vercel
- [ ] Configurar webhooks en Vapi.ai para cada función
- [ ] Test de cada función con AI agents
- [ ] Verificar escritura en Supabase

### Prioridad 3: Monitoreo
- [ ] Configurar Sentry para error tracking
- [ ] Dashboard de métricas de llamadas (Vapi.ai logs)
- [ ] Monitoreo de costos (Telnyx, Vapi.ai, Supabase)

### Prioridad 4: Optimización
- [ ] Reducir latencia de llamadas (ajustar ElevenLabs settings)
- [ ] Mejorar prompts de AI agents basado en transcripts reales
- [ ] Implementar fallback automático si Vapi.ai falla

---

## 10. MÉTRICAS Y COSTOS

### Costos Mensuales Estimados
```
Vapi.ai:         ~$50-100 (según minutos de llamadas)
Telnyx:          ~$5-20 (número + minutos)
ElevenLabs TTS:  Incluido en Vapi.ai
Deepgram STT:    Incluido en Vapi.ai
OpenAI GPT-4:    ~$30-60 (según uso)
Supabase:        $0 (Free tier) o $25/mes (Pro)
Vercel:          $0 (Hobby) o $20/mes (Pro)
Square:          2.9% + $0.30 por transacción
WATI:            ~$39/mes (plan básico)
Resend:          $0 (Free tier 3k/mes) o $20/mes

TOTAL ESTIMADO:  $150-250/mes para MVP
```

### Latencia Objetivo
```
Llamada INBOUND:  < 2s para primer mensaje
Respuesta IA:     < 1s entre user speech → AI response
TTS Generation:   < 500ms
Función Backend:  < 300ms (Supabase query)
```

---

## 11. CONTACTOS Y RECURSOS

**Proyecto:**
- Sitio: https://www.saludcompartida.app
- Repo: MVP-SaludCompartida (GitHub)
- Owner: fabiolafrancoc-lab

**Dashboards:**
- Vapi.ai: https://dashboard.vapi.ai
- Telnyx: https://portal.telnyx.com
- WATI: https://app.wati.io
- Supabase: https://supabase.com/dashboard
- Vercel: https://vercel.com/dashboard

**Documentación:**
- Vapi.ai Docs: https://docs.vapi.ai
- Telnyx Call Control: https://developers.telnyx.com/docs/api/v2/call-control
- WATI API: https://docs.wati.io
- Supabase Docs: https://supabase.com/docs

---

**Fin del Reporte Técnico**

---

## APÉNDICE A: Comandos Útiles

### Deploy
```bash
git add -A
git commit -m "message"
git push
# Vercel auto-deploys from main branch
```

### Test Endpoints Localmente
```bash
npm run dev
# Test: http://localhost:3000/api/[endpoint]
```

### Supabase Migrations
```bash
# Ejecutar SQL en Supabase Dashboard → SQL Editor
# O usar CLI:
supabase db push
```

### Verificar Logs
```bash
# Vercel logs
vercel logs

# O en dashboard: https://vercel.com/[project]/deployments/[id]
```

---

**Autor:** GitHub Copilot  
**Fecha Generación:** 17 de Enero, 2026  
**Versión:** 1.0
