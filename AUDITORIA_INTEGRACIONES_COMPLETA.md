# 🔌 AUDITORÍA COMPLETA DE INTEGRACIONES - SaludCompartida
**Fecha:** Enero 22, 2026  
**Estado:** Todas las conexiones verificadas y documentadas

---

## 📊 RESUMEN EJECUTIVO

| # | Servicio | Estado | Configurado | Necesita Acción |
|---|----------|--------|-------------|-----------------|
| 1 | **Vercel** | ✅ ACTIVO | Sí | No |
| 2 | **Supabase** | ✅ ACTIVO | Sí | No |
| 3 | **Resend** | ⚠️ FALTA KEY | NO | **SÍ - CRÍTICO** |
| 4 | **WATI.io** | ✅ ACTIVO | Sí | No |
| 5 | **VAPI.ai** | ✅ ACTIVO | Sí | No |
| 6 | **Meta Pixel** | ✅ ACTIVO | Sí | No |
| 7 | **Meta WhatsApp** | ⚠️ FALTA KEY | NO | **SÍ - IMPORTANTE** |
| 8 | **ElevenLabs** | ⚠️ FALTA KEY | NO | SÍ - Opcional |
| 9 | **Weaviate** | ✅ ACTIVO | Sí | No |
| 10 | **Sentry.io** | ✅ ACTIVO | Sí | No |
| 11 | **Telnyx** | ✅ ACTIVO | Sí | No |
| 12 | **Claude/Anthropic** | ⚠️ FALTA KEY | NO | **SÍ - NUEVO** |
| 13 | **Tailwind CSS** | ✅ ACTIVO | Sí | No |
| 14 | **Turbopack** | ✅ ACTIVO | Sí | No |
| 15 | **Cron Jobs** | ✅ ACTIVO | Sí | No |

---

## 1️⃣ VERCEL (Hosting & Deployment)

### ✅ Estado: ACTIVO Y FUNCIONANDO

**URL:** https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida

**Configuración:**
- ✅ Auto-deploy desde GitHub (rama `main`)
- ✅ Build time: ~2 minutos
- ✅ Dominio: saludcompartida.app
- ✅ Environment variables configuradas (19 variables)

**Framework:** Next.js 16.1.3

**Variables de Entorno en Vercel:**
```bash
# Ya configuradas:
SUPABASE_URL
SUPABASE_SERVICE_KEY
VAPI_API_KEY
VAPI_PHONE_NUMBER_ID
TELNYX_API_KEY
WEAVIATE_URL
WEAVIATE_API_KEY
WATI_ENDPOINT
WATI_API_TOKEN
SENTRY_DSN
NEXT_PUBLIC_SENTRY_DSN
# ... y más
```

**Acciones Necesarias:** Ninguna

---

## 2️⃣ SUPABASE (Base de Datos PostgreSQL)

### ✅ Estado: ACTIVO Y FUNCIONANDO

**URL:** https://rzmdekjegbdgitqekjee.supabase.co

**Configuración Local:**
```bash
SUPABASE_URL=https://rzmdekjegbdgitqekjee.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Tablas Activas:**
1. ✅ `registrations` - Datos de usuarios y códigos de acceso
2. ✅ `dependents` - Dependientes/familiares
3. ✅ `call_transcripts` - Transcripciones de Lupita
4. ✅ `scheduled_voice_calls` - Llamadas programadas
5. ✅ `lupita_conversations` - Historial de conversaciones

**Archivos de Integración:**
- `/src/lib/supabase.js` - Cliente y funciones helper

**Funciones Disponibles:**
- `getUserByAccessCode(code)` - Buscar usuario por código
- `createRegistration(data)` - Crear nuevo registro
- `updateUserByAccessCode(code, data)` - Actualizar usuario
- `saveDependents(code, dependents)` - Guardar dependientes
- `getDependentsByAccessCode(code)` - Cargar dependientes

**Acciones Necesarias:** Ninguna

---

## 3️⃣ RESEND (Email Service)

### ⚠️ Estado: CONFIGURACIÓN INCOMPLETA

**URL:** https://resend.com/

**Problema:** API Key NO está en `.env` ni en Vercel

**Configuración Necesaria:**
```bash
# FALTA AGREGAR:
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=noreply@saludcompartida.app
```

**Archivos que usan Resend:**
- `/api/send-email.js` - Envío de emails principal
- `/api/send-access-codes.js` - Enviar códigos por email

**Pasos para Configurar:**

1. **Obtener API Key:**
   - Ve a: https://resend.com/api-keys
   - Crea una nueva key: "SaludCompartida-Production"
   - Copia la key (empieza con `re_`)

2. **Verificar Dominio:**
   - Ve a: https://resend.com/domains
   - Agrega `saludcompartida.app`
   - Configura registros DNS (TXT, CNAME, MX)
   - Espera verificación (24-48 horas)

3. **Agregar a Vercel:**
   ```bash
   Name: RESEND_API_KEY
   Value: re_xxxxx
   Environment: Production, Preview, Development
   ```

4. **Agregar a `.env`:**
   ```bash
   RESEND_API_KEY=re_xxxxx
   RESEND_FROM_EMAIL=noreply@saludcompartida.app
   ```

**Impacto sin Resend:**
- ❌ Códigos de acceso NO se envían por email
- ❌ Emails de confirmación NO funcionan
- ⚠️ Backup: Códigos se envían por WhatsApp (WATI)

**Prioridad:** 🔴 CRÍTICA

---

## 4️⃣ WATI.IO (WhatsApp Business API)

### ✅ Estado: ACTIVO Y FUNCIONANDO

**URL:** https://app.wati.io/

**Configuración Local:**
```bash
WATI_ENDPOINT=https://live-server-1079185.wati.io
WATI_API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
WATI_WHATSAPP_NUMBER=+15558420346
```

**Número WhatsApp:**
- +1 555 842 0346 (WATI Connected)
- Account ID: 1433651735097334
- Status: In Review

**Archivos de Integración:**
- `/api/send-whatsapp.js` - Envío de mensajes
- `/api/send-access-codes.js` - Envío de códigos

**Uso Principal:**
- ✅ Envío de códigos de acceso después del pago
- ✅ Notificaciones a usuarios
- ✅ Confirmaciones

**Dashboard:** https://app.wati.io/dashboard

**Acciones Necesarias:** Ninguna

---

## 5️⃣ VAPI.AI (Voice AI - Lupita)

### ✅ Estado: ACTIVO Y FUNCIONANDO

**URL:** https://dashboard.vapi.ai/

**Configuración Local:**
```bash
VAPI_API_KEY=e4c6a7c4-203c-455f-ae23-cc46e5ed6bee
VAPI_PHONE_NUMBER_ID=9aafdbd3-9d61-49f5-929a-51bb2323419f
```

**Lupita Assistant ID:**
```bash
LUPITA_ASSISTANT_ID=e313a305-254b-4cb8-808b-3a1b79e5fdea
```

**Archivos de Integración:**
- `/api/vapi-webhook.js` - Recibe eventos de llamadas
- `/api/make-voice-call.js` - Iniciar llamadas
- `/api/test-lupita-call.js` - Pruebas
- `/ai-brain/lupita-brain.js` - Cerebro de Lupita
- `/ai-brain/lupita-agent-weaviate.js` - Memoria vectorial
- `/ai-brain/lupita-scripts-relacionales.js` - Scripts

**Prompts:**
- `LUPITA_PROMPT_V3.md` - Prompt actual optimizado

**Modelo:** Claude 3.5 Sonnet (configurado en VAPI Dashboard)

**Webhook Configurado:**
- URL: `https://saludcompartida.app/api/vapi-webhook`
- Eventos: call-start, call-end, function-call

**Dashboard:** https://dashboard.vapi.ai/assistants

**Acciones Necesarias:** Ninguna

---

## 6️⃣ META PIXEL (Facebook Analytics)

### ✅ Estado: ACTIVO Y FUNCIONANDO

**Pixel ID:** `35350289364`

**Configuración:**
- ✅ Inicializado en `index.html`
- ✅ Hook: `/src/hooks/useMetaPixel.js`
- ✅ Tracking en toda la app

**Eventos Trackeados:**
1. **PageView** - Cada cambio de página
2. **Lead** - Completa registro (página 3)
3. **InitiateCheckout** - Entra a página de pago
4. **Purchase** - Completa pago con Square
5. **CompleteRegistration** - Activa código de acceso

**Archivos que usan Meta Pixel:**
- `src/main.jsx` - Inicialización
- `src/LoginCodigo.jsx` - Track CompleteRegistration
- `src/views/Registro.jsx` - Track Lead
- `src/page-components/Pago.jsx` - Track InitiateCheckout
- `src/views/Confirmacion.jsx` - Track Purchase

**Dashboard:** https://business.facebook.com/events_manager2

**Acciones Necesarias:** Ninguna

---

## 7️⃣ META WHATSAPP BUSINESS API

### ⚠️ Estado: CONFIGURACIÓN INCOMPLETA

**URL:** https://business.facebook.com/

**Problema:** API Keys NO están configuradas

**Configuración Necesaria:**
```bash
# FALTA AGREGAR:
META_WHATSAPP_ACCESS_TOKEN=EAAG...
META_WHATSAPP_PHONE_NUMBER_ID=123456789012345
META_WHATSAPP_BUSINESS_ACCOUNT_ID=tu_business_account_id
```

**Archivos Preparados (listos para usar):**
- `/api/send-whatsapp-meta.js` - Cliente Meta API
- `/api/send-whatsapp-codes-meta.js` - Envío de códigos

**Documentación Completa:**
- `META_WHATSAPP_SETUP_COMPLETE.md` - Guía paso a paso

**Pasos para Configurar:**

1. **Ve a Meta Business Suite:**
   - https://business.facebook.com/settings/whatsapp-business-accounts

2. **Obtén Credentials:**
   - Phone Number ID: Ve a WhatsApp → API Setup
   - Access Token: Ve a System Users → Generate Token
   - Business Account ID: En la URL de tu WhatsApp Business

3. **Crear Message Templates:**
   - Template: `codigo_migrante`
   - Template: `codigo_familiar`
   - Esperar aprobación de Meta (24-48 horas)

4. **Agregar a Vercel:**
   ```bash
   META_WHATSAPP_ACCESS_TOKEN=EAAG...
   META_WHATSAPP_PHONE_NUMBER_ID=123456789012345
   META_WHATSAPP_BUSINESS_ACCOUNT_ID=tu_id
   ```

**Beneficio:**
- Envío de WhatsApp más confiable
- Templates pre-aprobados
- Mejor deliverability

**Prioridad:** 🟡 IMPORTANTE (pero WATI funciona como backup)

---

## 8️⃣ ELEVENLABS (Voice Synthesis)

### ⚠️ Estado: NO CONFIGURADO

**URL:** https://elevenlabs.io/

**Uso:** VAPI.ai usa ElevenLabs internamente para la voz de Lupita

**Configuración Actual:**
- ✅ Voz configurada en VAPI Dashboard
- ✅ Voice ID: Se configura en el Assistant de VAPI
- ⚠️ API Key NO está en variables de entorno (no es necesaria)

**¿Necesitas ElevenLabs API Key?**
- **NO** si solo usas VAPI (VAPI maneja ElevenLabs por ti)
- **SÍ** si quieres generar audio fuera de VAPI

**Si decides configurarla:**
```bash
# Opcional:
ELEVENLABS_API_KEY=sk_xxxxx
ELEVENLABS_VOICE_ID=tu_voice_id
```

**Dashboard:** https://elevenlabs.io/app/speech-synthesis

**Acciones Necesarias:** Ninguna (opcional)

**Prioridad:** ⚪ OPCIONAL

---

## 9️⃣ WEAVIATE (Vector Database)

### ✅ Estado: ACTIVO Y FUNCIONANDO

**URL:** https://console.weaviate.cloud/

**Configuración Local:**
```bash
WEAVIATE_URL=62hwk50s3cnpffte41fdq.c0.us-east1.gcp.weaviate.cloud
WEAVIATE_API_KEY=NkdOWW4vQUpnNWo1UUdETl9UQzg1TGNOclA5TXgvZlUxUUZWSGtiUHJwQVc5aEtQOFNDY0hoN3NoUjVVPV92MjAw
```

**Uso:**
- 🧠 Memoria de largo plazo para Lupita
- 🔍 Búsqueda semántica de conversaciones
- 📊 Análisis de patrones colectivos
- 🎯 Recomendaciones personalizadas

**Schemas Configurados:**
1. `Conversation` - Transcripciones completas
2. `CallSummary` - Resúmenes ejecutivos
3. `UserProfile` - Perfiles de usuarios
4. `EcosystemInsights` - Insights colectivos

**Archivos de Integración:**
- `/src/lib/weaviate-client.js` - Cliente principal
- `/ai-brain/lupita-agent-weaviate.js` - Agente con memoria
- `/scripts/setup-weaviate-schema.js` - Setup inicial
- `/scripts/migrate-to-weaviate.js` - Migración de datos

**Dashboard:** https://console.weaviate.cloud/

**Acciones Necesarias:** Ninguna

---

## 🔟 SENTRY.IO (Error Monitoring)

### ✅ Estado: ACTIVO Y FUNCIONANDO

**URL:** https://sentry.io/organizations/salud-compartida/

**Configuración Local:**
```bash
SENTRY_DSN=https://7424291d4047ffdeba57b9d6d9665ad9@o4510726860177408.ingest.us.sentry.io/4510727032406016
NEXT_PUBLIC_SENTRY_DSN=https://7424291d4047ffdeba57b9d6d9665ad9@o4510726860177408.ingest.us.sentry.io/4510727032406016
SENTRY_ORG=salud-compartida
SENTRY_PROJECT=mvp-saludcompartida
SENTRY_AUTH_TOKEN=[pendiente]
```

**Archivos de Configuración:**
- `sentry.client.config.ts` - Cliente browser
- `sentry.server.config.ts` - Servidor Next.js
- `sentry.edge.config.ts` - Edge functions
- `next.config.ts` - Integración con build

**Configuración:**
- ✅ Traces habilitado (100% sample rate)
- ✅ Session Replay habilitado (10% sample rate)
- ✅ Error tracking en tiempo real
- ✅ Performance monitoring

**Instalado:**
```json
"@sentry/nextjs": "^10.34.0"
```

**Dashboard:** https://sentry.io/organizations/salud-compartida/projects/mvp-saludcompartida/

**Uso:**
- 🐛 Captura automática de errores
- 📊 Monitoreo de performance
- 🎥 Session Replay para debugging
- 📈 Alertas en tiempo real

**Acciones Necesarias:** 
- ⚠️ Agregar `SENTRY_AUTH_TOKEN` para upload de source maps

---

## 1️⃣1️⃣ TELNYX (Phone Provider)

### ✅ Estado: ACTIVO Y FUNCIONANDO

**URL:** https://portal.telnyx.com/

**Configuración Local:**
```bash
TELNYX_API_KEY=KEY019BC93F6844CB50992CA02D896CB213_SrTiY0U82u95qwffhyLVjb
TELNYX_CONNECTION_ID=2874463422819338156
TELNYX_PHONE_NUMBER=+525599906900
```

**Uso:**
- 📞 Provee número de teléfono mexicano para VAPI
- 🇲🇽 +52 559 990 6900
- 🔗 Conectado a VAPI.ai para llamadas de Lupita

**Configuración en VAPI:**
- ✅ Telnyx API Key configurada en VAPI Dashboard
- ✅ Número asociado al Assistant de Lupita
- ✅ Permisos: Voice, SMS

**Dashboard:** https://portal.telnyx.com/

**Acciones Necesarias:** Ninguna

---

## 1️⃣2️⃣ ANTHROPIC (Claude API)

### ⚠️ Estado: INTEGRACIÓN LISTA, FALTA API KEY

**URL:** https://console.anthropic.com/

**Problema:** API Key NO configurada

**Configuración Necesaria:**
```bash
# FALTA AGREGAR:
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
```

**Archivos Creados:**
- ✅ `/src/lib/claude-client.js` - Cliente completo
- ✅ `/api/test-claude.js` - Endpoint de prueba
- ✅ `/api/analyze-conversation.js` - Análisis de conversaciones
- ✅ `/api/detect-emotion.js` - Detección de emociones

**Funciones Disponibles:**
- `chatWithClaude()` - Chat directo
- `analyzeConversation()` - Análisis completo
- `detectEmotion()` - Detección emocional
- `generateExecutiveSummary()` - Resúmenes
- `improveSystemPrompt()` - Optimización de prompts

**Documentación:**
- `CLAUDE_INTEGRATION_SETUP.md` - Guía completa
- `CLAUDE_INTEGRATION_STATUS.md` - Estado actual
- `RESTAURACION_CLAUDE_COMPLETADA.md` - Resumen

**Pasos para Configurar:**

1. **Obtener API Key:**
   - Ve a: https://console.anthropic.com/settings/keys
   - Crea key: "SaludCompartida-Production"
   - Copia key (empieza con `sk-ant-api03-`)

2. **Agregar a Vercel:**
   ```bash
   Name: ANTHROPIC_API_KEY
   Value: sk-ant-api03-xxxxx
   Environment: Production, Preview, Development
   ```

3. **Agregar a `.env`:**
   ```bash
   ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
   ```

4. **Probar:**
   ```bash
   curl https://saludcompartida.app/api/test-claude
   ```

**Prioridad:** 🔴 CRÍTICA (nueva integración)

---

## 1️⃣3️⃣ TAILWIND CSS

### ✅ Estado: ACTIVO Y FUNCIONANDO

**Versión:** 4.1.18 (PostCSS)

**Configuración:**
```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**PostCSS:**
```javascript
// postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

**Instalado:**
```json
"@tailwindcss/postcss": "^4.1.18",
"autoprefixer": "^10.4.23",
```

**Uso en el Proyecto:**
- ✅ Todas las páginas usan Tailwind
- ✅ Utilidades responsive
- ✅ Gradientes personalizados
- ✅ Animaciones

**Acciones Necesarias:** Ninguna

---

## 1️⃣4️⃣ TURBOPACK (Next.js Bundler)

### ✅ Estado: ACTIVO (Incluido en Next.js 16)

**Versión:** Incluido en Next.js 16.1.3

**Configuración:**
```json
// package.json
"scripts": {
  "dev": "next dev",           // Usa Turbopack automáticamente
  "build": "next build",        // Producción
  "start": "next start"
}
```

**Características:**
- ⚡ Compilación incremental ultra-rápida
- 🔥 Hot Module Replacement (HMR) instantáneo
- 📦 Tree-shaking automático
- 🎯 Code splitting optimizado

**Beneficios:**
- Desarrollo: ~10x más rápido que Webpack
- Build: Optimización automática
- Producción: Bundles más pequeños

**Acciones Necesarias:** Ninguna (ya activado)

---

## 1️⃣5️⃣ CRON JOBS (Vercel Cron)

### ✅ Estado: ACTIVO Y FUNCIONANDO

**Configuración:** `vercel.json`

**Cron Jobs Activos:**

```json
{
  "crons": [
    {
      "path": "/api/cron/execute-voice-calls",
      "schedule": "*/5 * * * *"
    },
    {
      "path": "/api/cron/send-follow-up-messages",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

**Jobs:**

1. **Execute Voice Calls** (Cada 5 minutos)
   - Archivo: `/api/cron/execute-voice-calls.js`
   - Ejecuta llamadas programadas
   - Verifica scheduled_voice_calls en Supabase

2. **Send Follow-up Messages** (Cada 6 horas)
   - Archivo: `/api/cron/send-follow-up-messages.js`
   - Envía mensajes de seguimiento
   - Recordatorios automáticos

**Logs:** https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida/logs

**Acciones Necesarias:** Ninguna

---

## 🎯 RESUMEN DE ACCIONES REQUERIDAS

### 🔴 CRÍTICAS (Hacer Ahora)

1. **RESEND (Email):**
   - [ ] Obtener API key: https://resend.com/api-keys
   - [ ] Verificar dominio: saludcompartida.app
   - [ ] Agregar `RESEND_API_KEY` en Vercel
   - [ ] Agregar en `.env` local

2. **ANTHROPIC (Claude):**
   - [ ] Obtener API key: https://console.anthropic.com/settings/keys
   - [ ] Agregar `ANTHROPIC_API_KEY` en Vercel
   - [ ] Agregar en `.env` local
   - [ ] Probar: `curl https://saludcompartida.app/api/test-claude`

### 🟡 IMPORTANTES (Hacer Pronto)

3. **META WHATSAPP:**
   - [ ] Obtener Access Token y Phone Number ID
   - [ ] Crear Message Templates en Meta
   - [ ] Esperar aprobación (24-48 horas)
   - [ ] Agregar variables en Vercel
   - Lee: `META_WHATSAPP_SETUP_COMPLETE.md`

4. **SENTRY AUTH TOKEN:**
   - [ ] Generar token en: https://sentry.io/settings/account/api/auth-tokens/
   - [ ] Agregar `SENTRY_AUTH_TOKEN` en Vercel
   - [ ] Permitir upload de source maps

### ⚪ OPCIONALES

5. **ELEVENLABS:**
   - Solo si quieres generar audio fuera de VAPI
   - No necesario actualmente

---

## 📚 DOCUMENTACIÓN DISPONIBLE

**Guías de Configuración:**
1. `CLAUDE_INTEGRATION_SETUP.md` - Claude API
2. `META_WHATSAPP_SETUP_COMPLETE.md` - Meta WhatsApp
3. `WEAVIATE_SETUP_GUIDE.md` - Weaviate Vector DB
4. `SENTRY_VERCEL_SETUP.md` - Sentry monitoring
5. `RESEND_SETUP.md` - Resend emails

**Documentación Técnica:**
- `TECHNICAL_STRUCTURE.md` - Arquitectura completa
- `PROJECT_MEMORY.md` - Historial de fixes
- `SYSTEM_OVERVIEW.md` - Visión general del sistema

---

## 🔐 SEGURIDAD - VARIABLES DE ENTORNO

**✅ Configuradas en Vercel (19 variables):**
- SUPABASE_URL, SUPABASE_SERVICE_KEY
- VAPI_API_KEY, VAPI_PHONE_NUMBER_ID
- TELNYX_API_KEY, TELNYX_CONNECTION_ID, TELNYX_PHONE_NUMBER
- WEAVIATE_URL, WEAVIATE_API_KEY
- WATI_ENDPOINT, WATI_API_TOKEN
- SENTRY_DSN, NEXT_PUBLIC_SENTRY_DSN
- SENTRY_ORG, SENTRY_PROJECT

**❌ FALTAN en Vercel:**
- RESEND_API_KEY 🔴
- ANTHROPIC_API_KEY 🔴
- META_WHATSAPP_ACCESS_TOKEN 🟡
- META_WHATSAPP_PHONE_NUMBER_ID 🟡
- SENTRY_AUTH_TOKEN 🟡
- ELEVENLABS_API_KEY ⚪ (opcional)

---

## 🚀 PRÓXIMOS PASOS

1. **Lee este documento completo**
2. **Sigue el orden de prioridades** (🔴 → 🟡 → ⚪)
3. **Consulta las guías específicas** para cada servicio
4. **Verifica en Vercel** después de cada cambio
5. **Prueba los endpoints** de cada servicio

---

## 💰 COSTOS MENSUALES ESTIMADOS

| Servicio | Plan | Costo/Mes |
|----------|------|-----------|
| Vercel | Pro | $20 |
| Supabase | Free → Pro | $0 → $25 |
| Resend | Free → Pro | $0 → $20 |
| WATI.io | Starter | $39 |
| VAPI.ai | Pay-as-you-go | ~$100-300 |
| Weaviate | Sandbox | $0 |
| Sentry | Developer | $29 |
| Telnyx | Pay-as-you-go | ~$20 |
| Anthropic | Pay-as-you-go | ~$40-200 |
| **TOTAL** | | **~$268-653/mes** |

**Nota:** Costos variables dependen del volumen de uso.

---

## 🆘 SOPORTE

**Si algo no funciona:**

1. **Vercel Logs:** https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida/logs
2. **Sentry Errors:** https://sentry.io/organizations/salud-compartida/
3. **Environment Variables:** Verifica en Vercel Settings
4. **Redeploy:** Siempre redeploy después de cambiar variables

---

**Última actualización:** Enero 22, 2026  
**Versión:** 2.0  
**Estado:** 80% Completo - Faltan 3 API keys críticas
