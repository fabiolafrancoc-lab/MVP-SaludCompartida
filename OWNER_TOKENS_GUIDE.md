# 🔑 Guía de Tokens para el Owner - SaludCompartida

## ¿Dónde encuentro mis tokens como owner?

Esta guía consolida **todos los tokens y API keys** que necesitas como dueño/owner de la plataforma SaludCompartida, dónde obtenerlos, y cómo configurarlos.

---

## 📋 Resumen Rápido

| Servicio | Token/Key | Dónde obtenerlo |
|----------|-----------|-----------------|
| Supabase | URL + Anon Key + Service Role Key | [Supabase Dashboard](https://supabase.com/dashboard) |
| Square | Access Token + App ID + Location ID | [Square Developer](https://developer.squareup.com/apps) |
| Resend | API Key | [Resend Dashboard](https://resend.com/api-keys) |
| Twilio | Account SID + Auth Token | [Twilio Console](https://console.twilio.com) |
| WATI | API Token | [WATI Dashboard](https://app.wati.io) → Settings → API |
| Vapi.ai | API Key | [Vapi Dashboard](https://dashboard.vapi.ai) |
| Telnyx | API Key | [Telnyx Portal](https://portal.telnyx.com/#/app/api-keys) |
| OpenAI | API Key | [OpenAI Platform](https://platform.openai.com/api-keys) |
| Anthropic | API Key | [Anthropic Console](https://console.anthropic.com/settings/keys) |
| Google Maps | API Key | [Google Cloud Console](https://console.cloud.google.com/google/maps-apis) |
| Weaviate | URL + API Key | [Weaviate Cloud Console](https://console.weaviate.cloud) |
| Cron Secret | Token personalizado | Creado por ti en Vercel |

---

## 🗄️ 1. Supabase (Base de Datos)

**Dashboard:** https://supabase.com/dashboard

### Pasos para encontrar tus tokens:
1. Inicia sesión en [Supabase](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **API**
4. Ahí encontrarás:

| Variable | Ubicación en Supabase |
|----------|----------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project API keys → `anon` `public` |
| `SUPABASE_SERVICE_KEY` | Project API keys → `service_role` (⚠️ mantener secreto) |

> ⚠️ **IMPORTANTE:** La `service_role` key tiene acceso completo a tu base de datos. Nunca la expongas en el frontend.

---

## 💳 2. Square (Pagos)

**Dashboard:** https://developer.squareup.com/apps

### Pasos para encontrar tus tokens:
1. Inicia sesión en [Square Developer](https://developer.squareup.com/apps)
2. Selecciona tu aplicación
3. Ve a **Credentials**
4. Ahí encontrarás:

| Variable | Ubicación en Square |
|----------|---------------------|
| `NEXT_PUBLIC_SQUARE_APP_ID` | Credentials → Application ID |
| `SQUARE_ACCESS_TOKEN` | Credentials → Access Token (Production o Sandbox) |
| `NEXT_PUBLIC_SQUARE_LOCATION_ID` | Locations → selecciona tu ubicación |
| `SQUARE_LOCATION_ID` | Mismo que el anterior |

> 💡 **Sandbox vs Production:** Usa credenciales Sandbox para pruebas y Production para cobros reales.

---

## 📧 3. Resend (Emails)

**Dashboard:** https://resend.com/api-keys

### Pasos para encontrar tu token:
1. Inicia sesión en [Resend](https://resend.com)
2. Ve a **API Keys** en el menú lateral
3. Crea un nuevo API key o copia el existente

| Variable | Ubicación en Resend |
|----------|---------------------|
| `RESEND_API_KEY` | API Keys → tu key (empieza con `re_`) |
| `RESEND_FROM_EMAIL` | Usar: `noreply@saludcompartida.com` (dominio debe estar verificado en Resend → Domains) |

---

## 📞 4. Twilio (SMS y WhatsApp)

**Dashboard:** https://console.twilio.com

### Pasos para encontrar tus tokens:
1. Inicia sesión en [Twilio Console](https://console.twilio.com)
2. En la página principal del dashboard verás Account SID y Auth Token

| Variable | Ubicación en Twilio |
|----------|---------------------|
| `TWILIO_ACCOUNT_SID` | Dashboard principal → Account SID (empieza con `AC`) |
| `TWILIO_AUTH_TOKEN` | Dashboard principal → Auth Token (clic en "Show") |
| `TWILIO_PHONE_NUMBER` | Phone Numbers → Active Numbers → tu número SMS |
| `TWILIO_WHATSAPP_NUMBER` | Formato: `whatsapp:+14155238886` |

---

## 📱 5. WATI (WhatsApp API)

**Dashboard:** https://app.wati.io

### Pasos para encontrar tu token:
1. Inicia sesión en [WATI](https://app.wati.io)
2. Haz clic en el ícono de engrane ⚙️ (arriba derecha)
3. Selecciona **Settings** → **API**
4. Busca **API Access Token**
5. Si necesitas regenerar: haz clic en **Regenerate Token**

| Variable | Ubicación en WATI |
|----------|-------------------|
| `WATI_API_TOKEN` | Settings → API → Access Token (formato: `eyJ...`) |
| `WATI_ENDPOINT` | URL de tu servidor WATI (ej: `https://live-server-XXXXXX.wati.io`) |

> ⚠️ **IMPORTANTE:** Al agregar el token en tu `.env` o Vercel, **NO incluyas** el prefijo `Bearer`. El código lo agrega automáticamente.

> 📖 Para instrucciones detalladas de regeneración, consulta [`GUIA_REPARACION_PASO_A_PASO.md`](GUIA_REPARACION_PASO_A_PASO.md) (Parte 1).

---

## 🤖 6. Vapi.ai (Llamadas AI - Lupita)

**Dashboard:** https://dashboard.vapi.ai

### Pasos para encontrar tu token:
1. Inicia sesión en [Vapi.ai](https://dashboard.vapi.ai)
2. Ve a **Settings** en el menú lateral
3. Copia tu API Key

| Variable | Ubicación en Vapi |
|----------|-------------------|
| `VAPI_API_KEY` | Settings → API Key |
| `VAPI_PHONE_NUMBER_ID` | Phone Numbers → selecciona tu número → ID |

> 📖 Consulta [`docs/lupita/VOICE_CALLS_AI_SETUP.md`](docs/lupita/VOICE_CALLS_AI_SETUP.md) para configuración completa.

---

## 📡 7. Telnyx (Telefonía México)

**Dashboard:** https://portal.telnyx.com

### Pasos para encontrar tu token:
1. Inicia sesión en [Telnyx Portal](https://portal.telnyx.com)
2. Ve a **API Keys** en el menú lateral
3. Crea o copia tu API Key

| Variable | Ubicación en Telnyx |
|----------|---------------------|
| `TELNYX_API_KEY` | API Keys → tu key (formato: `KEY019BC...`) |
| `TELNYX_CONNECTION_ID` | SIP Connections → tu conexión → ID |
| `TELNYX_PHONE_NUMBER` | Numbers → tu número mexicano (+52...) |

> 📖 Para instrucciones detalladas, consulta [`GUIA_REPARACION_PASO_A_PASO.md`](GUIA_REPARACION_PASO_A_PASO.md) (Parte 2).

---

## 🧠 8. OpenAI (GPT-4 y Embeddings)

**Dashboard:** https://platform.openai.com/api-keys

### Pasos para encontrar tu token:
1. Inicia sesión en [OpenAI Platform](https://platform.openai.com)
2. Ve a **API Keys** en el menú lateral
3. Crea o copia tu API Key

| Variable | Ubicación en OpenAI |
|----------|---------------------|
| `OPENAI_API_KEY` | API Keys → tu key (empieza con `sk-`) |

---

## 🟣 9. Anthropic - Claude (Análisis AI)

**Dashboard:** https://console.anthropic.com/settings/keys

### Pasos para encontrar tu token:
1. Inicia sesión en [Anthropic Console](https://console.anthropic.com)
2. Ve a **Settings** → **API Keys**
3. Crea o copia tu API Key

| Variable | Ubicación en Anthropic |
|----------|------------------------|
| `ANTHROPIC_API_KEY` | Settings → API Keys (empieza con `sk-ant-`) |

---

## 🗺️ 10. Google Maps (Ubicación de Farmacias)

**Dashboard:** https://console.cloud.google.com/google/maps-apis

### Pasos para encontrar tu token:
1. Inicia sesión en [Google Cloud Console](https://console.cloud.google.com)
2. Selecciona tu proyecto
3. Ve a **APIs & Services** → **Credentials**
4. Copia tu API Key

| Variable | Ubicación en Google Cloud |
|----------|---------------------------|
| `VITE_GOOGLE_MAPS_API_KEY` | Credentials → API Keys → tu key |

> 💡 Asegúrate de habilitar las APIs: Maps JavaScript API, Places API, Geocoding API.

---

## 🧬 11. Weaviate (Base de Datos Vectorial - AI Brain)

**Dashboard:** https://console.weaviate.cloud

### Pasos para encontrar tus tokens:
1. Inicia sesión en [Weaviate Cloud](https://console.weaviate.cloud)
2. Selecciona tu cluster
3. En los detalles del cluster encontrarás la URL y API Key

| Variable | Ubicación en Weaviate |
|----------|------------------------|
| `WEAVIATE_URL` | Cluster Details → URL (incluye `https://`) |
| `WEAVIATE_API_KEY` | Cluster Details → API Key |

---

## ⏰ 12. Cron Secret (Tareas Automáticas)

Este token lo creas tú mismo para proteger las tareas automáticas (cron jobs).

### Cómo crear tu CRON_SECRET:
1. Inventa un token seguro (mínimo 32 caracteres)
   - Ejemplo: `sc-cron-2025-secure-token-xyz123abc`
2. Agrégalo como variable de entorno en Vercel (ver sección siguiente)

| Variable | Cómo obtenerlo |
|----------|----------------|
| `CRON_SECRET` | Créalo tú mismo: un string aleatorio seguro |

> 📖 Consulta [`AUTOMATIC_CODES_README.md`](AUTOMATIC_CODES_README.md) para más detalles.

---

## 🚀 Cómo Configurar los Tokens

### Para desarrollo local:
Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_KEY=tu-service-role-key

# Square
NEXT_PUBLIC_SQUARE_APP_ID=tu-app-id
SQUARE_ACCESS_TOKEN=tu-access-token
NEXT_PUBLIC_SQUARE_LOCATION_ID=tu-location-id

# Resend
RESEND_API_KEY=tu-resend-key

# Twilio
TWILIO_ACCOUNT_SID=tu-account-sid
TWILIO_AUTH_TOKEN=tu-auth-token
TWILIO_PHONE_NUMBER=+1XXXXXXXXXX
TWILIO_WHATSAPP_NUMBER=whatsapp:+1XXXXXXXXXX

# WATI
WATI_API_TOKEN=tu-wati-token
WATI_ENDPOINT=https://live-server-XXXXXX.wati.io

# AI
OPENAI_API_KEY=tu-openai-key
ANTHROPIC_API_KEY=tu-anthropic-key
VAPI_API_KEY=tu-vapi-key
TELNYX_API_KEY=tu-telnyx-key

# Maps
VITE_GOOGLE_MAPS_API_KEY=tu-google-maps-key

# Weaviate
WEAVIATE_URL=tu-weaviate-url
WEAVIATE_API_KEY=tu-weaviate-key

# Cron
CRON_SECRET=tu-cron-secret
```

### Para producción (Vercel):
1. Ve a tu [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona el proyecto **mvp-salud-compartida**
3. Ve a **Settings** → **Environment Variables**
4. Agrega cada variable con su valor correspondiente
5. Selecciona los entornos: **Production**, **Preview**, **Development**
6. Haz clic en **Save**

> 💡 Después de agregar o cambiar variables, necesitas hacer un **redeploy** para que tomen efecto.

---

## 🔗 Documentación Relacionada

- [`GUIA_REPARACION_PASO_A_PASO.md`](GUIA_REPARACION_PASO_A_PASO.md) - Regenerar tokens WATI y Telnyx paso a paso
- [`IMPLEMENTATION_GUIDE.md`](IMPLEMENTATION_GUIDE.md) - Guía completa de implementación
- [`PRODUCTION_CHECKLIST.md`](PRODUCTION_CHECKLIST.md) - Checklist para producción
- [`AUTOMATIC_CODES_README.md`](AUTOMATIC_CODES_README.md) - Configuración de cron jobs
- [`.env.example`](.env.example) - Plantilla de variables de entorno
- [`docs/lupita/VOICE_CALLS_AI_SETUP.md`](docs/lupita/VOICE_CALLS_AI_SETUP.md) - Configuración de llamadas AI
