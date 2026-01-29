# 🎯 STACK TECNOLÓGICO COMPLETO - SALUDCOMPARTIDA MVP v3.0

**Fecha:** 28 enero 2026  
**Status:** Producción  
**Arquitectura:** Multi-cloud (AWS + Vercel + Supabase + Weaviate)

---

## 1️⃣ FRONTEND & HOSTING

### Next.js 16 (App Router)
- **Propósito:** Framework React server-side
- **Ubicación:** `/src/app/`
- **Deploy:** Vercel
- **Features:** SSR, ISR, Edge Functions

### Tailwind CSS
- **Propósito:** Utility-first CSS framework
- **Config:** `tailwind.config.js`
- **Colores:**
  - `--cyan: #06B6D4` (Telemedicina)
  - `--magenta: #EC4899` (Terapia)
  - `--orange: #F97316` (Urgencia)
  - `--green: #10B981` (Farmacias)
  - `--purple: #A855F7` (AI Companions)

### Vercel
- **Propósito:** Hosting, CI/CD, Edge Functions
- **Repo:** GitHub → Vercel auto-deploy
- **Dominios:**
  - `saludcompartida.app` (principal)
  - `www.saludcompartida.app`
- **Environment Variables:** `.env.local`

### GitHub
- **Propósito:** Control de versiones
- **Repo:** `MVP-SaludCompartida`
- **Branch Strategy:**
  - `main` → Producción (Vercel)
  - `develop` → Staging
  - `feature/*` → Desarrollo

---

## 2️⃣ BASE DE DATOS & STORAGE

### Supabase (PostgreSQL)
- **Propósito:** Base de datos principal
- **Tablas:**
  - `registrations` - Suscripciones y migrantes
  - `family_members` - Hasta 4 beneficiarios por familia
  - `pre_checkout` - Leads de landing page
  - `service_usage` - Uso de servicios (telemedicina, farmacias, terapia)
  - `savings_records` - Ahorros mensuales por familia
  - `companion_calls` - Registro de llamadas Lupita/Fernanda
  - `behavioral_codes` - 16 códigos de comportamiento emocional
- **Security:** Row Level Security (RLS) policies
- **Backups:** Automáticos diarios

### Weaviate (Vector Database)
- **Propósito:** ML embeddings para AI Companions
- **Arquitectura:** 3-tier privacy
  1. **Legal Layer (AWS S3 México):** Transcripciones completas (1 año)
  2. **Global Layer (Weaviate):** Embeddings anónimos, patterns grupales
  3. **Individual Layer (Supabase):** Últimas 4 interacciones + behavioral codes
- **Schemas:**
  - `EmotionalPattern` - Patrones emocionales detectados
  - `ConversationContext` - Contexto conversacional
  - `GroupLearning` - Aprendizaje cross-user (sin PII)

### AWS S3
- **Propósito:** Storage de grabaciones de llamadas
- **Buckets:**
  - `saludcompartida-recordings-prod` - Grabaciones MP3/WAV
  - `saludcompartida-transcriptions-prod` - Transcripciones JSON
- **Región:** `us-east-1` (Virginia) + `us-west-2` (réplica)
- **Lifecycle:** 1 año retención, después archive a Glacier
- **Security:** IAM roles, encryption at rest (AES-256)

---

## 3️⃣ PAGOS & SUSCRIPCIONES

### Square API
- **Propósito:** Procesamiento de pagos recurrentes
- **Productos:**
  - Plan Básico: $12 USD/mes
  - Plan Premium: $18 USD/mes
- **Features:**
  - Customer creation
  - Subscription management
  - Webhook notifications
  - PCI DSS compliant
- **Endpoints:**
  - `/api/square-payment` - Crear pago
  - `/api/webhooks/square` - Recibir eventos
- **Webhook Events:**
  - `payment.created`
  - `subscription.created`
  - `subscription.updated`
  - `subscription.cancelled`

---

## 4️⃣ COMUNICACIONES

### Resend
- **Propósito:** Email transaccional
- **Emails enviados:**
  1. **Welcome Email** - Post-pago inmediato
     - Código de 6 dígitos alfanumérico
     - Instrucciones de activación para familia
     - Links de soporte
  2. **Monthly Savings Statement** - Fin de mes
     - Ahorros acumulados por servicio
     - Comparativa vs. costos sin plan
  3. **Service Reminders** - Recordatorios de uso
- **Templates:** React Email components
- **Tracking:** Open rates, click rates

### WhatsApp Business API (WATI)
- **Propósito:** Mensajería con familia en México
- **Estrategia A:** Service Utilization (10+ contactos/mes)
  - Recordatorios de farmacias
  - Prompts de telemedicina
  - Agendamiento de terapia
  - Estados de ahorro mensuales
- **Estrategia B:** AI Companion Emotional Support (2+ llamadas/mes)
  - Lupita (55+): Acompañamiento adultos mayores
  - Fernanda (25-55): Apoyo a madres solas
- **Message Types:**
  - Text messages
  - Media messages (images, PDFs)
  - Template messages (pre-aprobados por Meta)
  - Interactive buttons

### Meta Business Suite
- **Propósito:** Gestión de campañas Facebook + Instagram
- **Campaigns:**
  - Facebook Ads (40% budget)
  - Instagram Ads (30% budget)
  - Advantage+ campaigns
  - Lookalike audiences (family-oriented Hispanic USA 25-55)
- **Meta Pixel:**
  - ✅ Facebook tracking
  - ✅ Instagram tracking
  - ❌ TikTok Pixel ELIMINADO
- **Events tracked:**
  - `PageView`
  - `Lead` (pre-checkout)
  - `InitiateCheckout` (registro)
  - `Purchase` (pago completado)

### YouTube Ads
- **Propósito:** Video advertising
- **Formats:**
  - TrueView in-stream (pre-roll)
  - Bumper ads (6 segundos)
  - YouTube Shorts
- **Budget:** 30% total ad spend
- **Content:** Testimoniales reales + storytelling emocional
- **Production:** Fuentes Audiovisuales (cinema-quality)

---

## 5️⃣ AI & VOICE

### ElevenLabs
- **Propósito:** Text-to-speech para AI Companions
- **Voces:**
  - **Lupita** (55+): Voz cálida, maternal, formal (usted)
  - **Fernanda** (25-55): Voz amigable, cercana, informal (tú)
- **Features:**
  - Emociones en voz (empatía, alegría, preocupación)
  - Pronunciación mexicana auténtica
  - Latency optimizada (<500ms)

### TALYNX (México)
- **Propósito:** Telefonía mexicana para llamadas AI
- **Features:**
  - Números locales México (+52)
  - Outbound calling
  - Inbound webhook support
  - Recording automático → AWS S3

### Vapi.io
- **Propósito:** Voice AI orchestration
- **Workflow:**
  1. Usuario recibe llamada de Lupita/Fernanda
  2. Vapi.io maneja conversación en tiempo real
  3. Speech-to-text (STT)
  4. Claude 3.5 Sonnet genera respuesta
  5. ElevenLabs convierte a voz
  6. Respuesta al usuario
- **Functions:**
  - `/api/vapi-webhook` - Eventos de llamada
  - `/api/vapi-functions/verify-eligibility` - Verificar usuario activo

### AWS Bedrock (Claude 3.5 Sonnet)
- **Propósito:** Motor de IA conversacional
- **Model:** `anthropic.claude-3-5-sonnet-20241022-v2:0`
- **Context Window:** 200k tokens
- **Prompts:**
  - Lupita: Acompañamiento adultos mayores
  - Fernanda: Apoyo madres solas con hijos
- **Features:**
  - 16 behavioral codes (loneliness, stress, grief, etc.)
  - Mexican regionalism (modismos, dichos)
  - Rapport building (confianza, empatía)
  - Ethical boundaries (no medical advice, no crisis intervention)

### Weaviate ML
- **Propósito:** Embeddings y aprendizaje grupal
- **Features:**
  - Embeddings de conversaciones (anónimos)
  - Pattern detection cross-user
  - Mejora continua de respuestas
  - Zero PII en global layer

---

## 6️⃣ SERVERLESS & COMPUTE

### Vercel Edge Functions
- **Propósito:** API routes Next.js
- **Ubicación:** `/src/app/api/`
- **Endpoints:**
  - `/api/pre-checkout` - Captura leads landing
  - `/api/registro` - Registro completo
  - `/api/square-payment` - Pago Square
  - `/api/webhooks/square` - Webhooks Square
  - `/api/lupita-call` - Iniciar llamada Lupita
  - `/api/vapi-webhook` - Eventos Vapi

### AWS Lambda
- **Propósito:** Procesamiento asíncrono
- **Functions:**
  - `process-transcription` - Procesar transcripción de llamada
  - `analyze-emotions` - Detectar 16 behavioral codes
  - `generate-embeddings` - Crear embeddings para Weaviate
  - `send-daily-reports` - Enviar reportes diarios
  - `cleanup-old-recordings` - Limpiar grabaciones >1 año
- **Runtime:** Node.js 20
- **Triggers:**
  - S3 events (nueva grabación)
  - EventBridge (cron jobs)
  - API Gateway (webhooks externos)

### AWS Compute Optimizer
- **Propósito:** Optimización de costos Lambda
- **Features:**
  - Recomendaciones de memory/CPU
  - Análisis de uso
  - Rightsizing automático

---

## 7️⃣ RECORDING & TRANSCRIPTION

### AWS S3 (Recordings)
- **Propósito:** Storage de grabaciones
- **Formato:** MP3 (128kbps) o WAV (16kHz mono)
- **Naming:** `{call_id}_{timestamp}_{user_id}.mp3`
- **Metadata:**
  - `user_id`
  - `companion_type` (lupita/fernanda)
  - `duration_seconds`
  - `call_date`
- **Security:**
  - Encryption at rest (SSE-S3)
  - IAM roles (no public access)
  - Pre-signed URLs (1 hora expiración)

### AWS Transcribe (Opcional)
- **Propósito:** Speech-to-text para análisis
- **Language:** Spanish (México) `es-MX`
- **Features:**
  - Custom vocabulary (modismos mexicanos)
  - Speaker diarization (Lupita vs Usuario)
  - Punctuation automática

### ❌ NO USAMOS:
- **BLOB Storage** - Solo S3
- **Client-side recording libraries** - Todo server-side
- **Local file storage** - Todo en cloud

---

## 8️⃣ SECURITY & ACCESS

### AWS IAM
- **Propósito:** Gestión de permisos AWS
- **Roles:**
  - `SaludCompartida-Lambda-Execution` - Para funciones Lambda
  - `SaludCompartida-S3-Access` - Leer/escribir S3
  - `SaludCompartida-Bedrock-Invoke` - Llamar Claude
- **Policies:**
  - Least privilege principle
  - MFA required para console access
  - Audit logging (CloudTrail)

### Supabase RLS
- **Propósito:** Row Level Security en database
- **Policies:**
  - Usuarios solo ven sus propios datos
  - Service role tiene acceso completo
  - Anonymous users pueden insertar pre_checkout
  - Familia en México accede por `codigo_familia`

---

## 9️⃣ MONITORING & ANALYTICS

### Sentry
- **Propósito:** Error tracking y performance monitoring
- **Features:**
  - Error alerts (Slack/Email)
  - Performance monitoring (Web Vitals)
  - Release tracking
  - User feedback
- **Environments:**
  - Production
  - Staging
  - Development

### Meta Pixel
- **Propósito:** Facebook + Instagram tracking
- **Events:**
  - `PageView`
  - `Lead`
  - `InitiateCheckout`
  - `Purchase`
- **Pixel ID:** `META_PIXEL_ID` (env variable)
- ❌ **TikTok Pixel:** ELIMINADO

### YouTube Analytics
- **Propósito:** Video campaign tracking
- **Metrics:**
  - View rate
  - Click-through rate (CTR)
  - Conversions
  - Cost per acquisition (CPA)

---

## 🔟 SOCIAL MEDIA MANAGEMENT

### Meta Business Suite
- **Propósito:** Unified dashboard Facebook + Instagram
- **Features:**
  - Campaign creation
  - Ad creative management
  - Audience targeting
  - Budget optimization
  - Analytics dashboard

### YouTube Ads Manager
- **Propósito:** Video campaign management
- **Features:**
  - TrueView campaign setup
  - Bumper ads
  - Shorts placement
  - Audience targeting (Hispanic USA 25-55)

### Fuentes Audiovisuales
- **Propósito:** Producción de contenido testimonial
- **Content:**
  - Testimoniales reales de familias
  - Storytelling emocional
  - Cinema-quality video
  - Subtítulos español/inglés

---

## 📊 ARQUITECTURA DE DATOS

### Flujo de Información

```
Landing → Pre-Checkout (Supabase)
   ↓
Registro → Registrations + Family Members (Supabase)
   ↓
Pago Square → Webhook → Update Status (Supabase)
   ↓
Email (Resend) + WhatsApp (WATI) → Familia en México
   ↓
AI Companion Call → TALYNX + Vapi + Bedrock
   ↓
Recording → AWS S3 → Lambda Transcription
   ↓
Embeddings → Weaviate (Global Learning)
   ↓
Behavioral Codes → Supabase (Individual Profile)
```

---

## 🚀 DEPLOYMENT WORKFLOW

```
1. Git Push → GitHub
2. GitHub → Vercel Auto-Deploy
3. Vercel Build → Next.js
4. Environment Variables → Secrets
5. Edge Functions → Production
6. Sentry Release Tracking
7. Monitor Errors & Performance
```

---

## 🔐 SECRETS & ENVIRONMENT VARIABLES

```bash
# Supabase
SUPABASE_URL=
SUPABASE_SERVICE_KEY=

# Square
SQUARE_ACCESS_TOKEN=
SQUARE_LOCATION_ID=
SQUARE_WEBHOOK_SIGNATURE_KEY=

# Resend
RESEND_API_KEY=

# WATI (WhatsApp)
WATI_API_KEY=
WATI_INSTANCE_ID=

# ElevenLabs
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID_LUPITA=
ELEVENLABS_VOICE_ID_FERNANDA=

# TALYNX
TALYNX_API_KEY=
TALYNX_PHONE_NUMBER=

# Vapi.io
VAPI_API_KEY=
VAPI_PHONE_NUMBER_ID=

# AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_S3_BUCKET_RECORDINGS=

# AWS Bedrock
AWS_BEDROCK_MODEL_ID=anthropic.claude-3-5-sonnet-20241022-v2:0

# Weaviate
WEAVIATE_URL=
WEAVIATE_API_KEY=

# Meta Pixel
META_PIXEL_ID=
META_PIXEL_ACCESS_TOKEN=

# Sentry
SENTRY_DSN=
SENTRY_AUTH_TOKEN=

# YouTube
YOUTUBE_API_KEY=
```

---

## ✅ STACK CONFIRMADO Y LISTO

**Todo claro. Claude puede empezar a diseñar con confianza. 🚀**
