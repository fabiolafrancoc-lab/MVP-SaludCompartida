# 📊 DOCUMENTACIÓN COMPLETA DE BASE DE DATOS - MIGRACIÓN A AWS

**Proyecto:** SaludCompartida MVP  
**Base de Datos Actual:** PostgreSQL en Supabase  
**Fecha:** Enero 2026  
**Estado:** PRODUCCIÓN

---

## 📋 TABLA DE CONTENIDOS

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Inventario Completo de Tablas](#inventario-completo-de-tablas)
3. [Esquemas SQL Detallados](#esquemas-sql-detallados)
4. [Relaciones y Dependencias](#relaciones-y-dependencias)
5. [Plan de Migración a AWS](#plan-de-migración-a-aws)
6. [Configuración de AWS RDS](#configuración-de-aws-rds)
7. [Scripts de Migración](#scripts-de-migración)
8. [Validación Post-Migración](#validación-post-migración)

---

## 🎯 RESUMEN EJECUTIVO

### Información General
- **URL Actual:** `https://rzmdekjegbdgitqekjee.supabase.co`
- **Engine:** PostgreSQL 15.x
- **Schema Principal:** `public`
- **Número de Tablas:** 53+ tablas identificadas
- **Extensiones Requeridas:** `uuid-ossp`, `pgvector` (para embeddings)

### Categorías de Datos

1. **Core Business (Registros y Suscripciones)** - 8 tablas
2. **AI Companions (Lupita System)** - 12 tablas
3. **Medical & Health Services** - 10 tablas
4. **Analytics & Tracking** - 8 tablas
5. **Support & Infrastructure** - 15+ tablas

---

## 📊 INVENTARIO COMPLETO DE TABLAS

### GRUPO 1: CORE BUSINESS (Registros y Suscripciones)

| # | Tabla | Descripción | Registros Est. | Criticidad |
|---|-------|-------------|----------------|------------|
| 1 | `registrations` | Registro principal de suscriptores migrantes | ~500 | 🔴 CRÍTICA |
| 2 | `user_accounts` | Cuentas de usuario actualizables | ~500 | 🔴 CRÍTICA |
| 3 | `family_members` | Familiares/dependientes de cada suscriptor | ~1500 | 🔴 CRÍTICA |
| 4 | `dependents` | Tabla alternativa de dependientes | ~1500 | 🟡 ALTA |
| 5 | `beneficiaries` | Beneficiarios de servicios (4 por familia) | ~2000 | 🔴 CRÍTICA |
| 6 | `subscriptions` | Estado de suscripciones | ~500 | 🔴 CRÍTICA |
| 7 | `account_change_history` | Historial de cambios de cuenta | ~2000 | 🟢 MEDIA |
| 8 | `pre_checkout_customers` | Clientes en proceso de checkout | ~100 | 🟢 BAJA |

### GRUPO 2: AI COMPANIONS (Sistema Lupita)

| # | Tabla | Descripción | Registros Est. | Criticidad |
|---|-------|-------------|----------------|------------|
| 9 | `ai_companions` | Configuración de AI companions | ~5 | 🔴 CRÍTICA |
| 10 | `behavioral_codes` | Códigos de comportamiento conversacional | ~100 | 🔴 CRÍTICA |
| 11 | `companion_calls` | Registro de llamadas realizadas | ~5000 | 🔴 CRÍTICA |
| 12 | `lupita_conversations` | Conversaciones de Lupita | ~3000 | 🔴 CRÍTICA |
| 13 | `companion_memory` | Memoria contextual del companion | ~5000 | 🟡 ALTA |
| 14 | `companion_conversations` | Historial de conversaciones | ~3000 | 🟡 ALTA |
| 15 | `scheduled_callbacks` | Callbacks programados | ~200 | 🔴 CRÍTICA |
| 16 | `scheduled_voice_calls` | Llamadas de voz programadas | ~300 | 🔴 CRÍTICA |
| 17 | `ai_voice_calls` | Registro de llamadas de IA (VAPI) | ~4000 | 🔴 CRÍTICA |
| 18 | `call_recordings` | Grabaciones de llamadas | ~4000 | 🟡 ALTA |
| 19 | `call_transcripts` | Transcripciones de llamadas | ~4000 | 🟡 ALTA |
| 20 | `call_extracted_info` | Información extraída de llamadas | ~4000 | 🟡 ALTA |

### GRUPO 3: MEDICAL & HEALTH SERVICES

| # | Tabla | Descripción | Registros Est. | Criticidad |
|---|-------|-------------|----------------|------------|
| 21 | `medical_history` | Historial médico de beneficiarios | ~3000 | 🔴 CRÍTICA |
| 22 | `service_usage` | Uso de servicios (telemedicina, farmacia) | ~2000 | 🔴 CRÍTICA |
| 23 | `savings_records` | Registro de ahorros mensuales | ~1000 | 🟡 ALTA |
| 24 | `medication_reminders` | Recordatorios de medicamentos | ~500 | 🟡 ALTA |
| 25 | `medication_adherence` | Adherencia a tratamientos | ~500 | 🟡 ALTA |
| 26 | `medication_catalog` | Catálogo de medicamentos | ~1000 | 🟢 MEDIA |
| 27 | `telemedicine_appointments` | Citas de telemedicina | ~800 | 🔴 CRÍTICA |
| 28 | `pharmacy_queries` | Consultas a farmacias | ~1500 | 🟡 ALTA |
| 29 | `eligibility_checks` | Verificación de elegibilidad | ~1000 | 🟢 MEDIA |
| 30 | `urgent_notifications` | Notificaciones urgentes de salud | ~200 | 🔴 CRÍTICA |

### GRUPO 4: ANALYTICS & TRACKING

| # | Tabla | Descripción | Registros Est. | Criticidad |
|---|-------|-------------|----------------|------------|
| 31 | `keyword_analysis` | Análisis de palabras clave | ~5000 | 🟢 MEDIA |
| 32 | `user_conversation_profiles` | Perfiles conversacionales | ~1000 | 🟡 ALTA |
| 33 | `user_facts` | Hechos aprendidos de usuarios | ~3000 | 🟡 ALTA |
| 34 | `user_demographics` | Datos demográficos | ~500 | 🟡 ALTA |
| 35 | `collective_knowledge_base` | Base de conocimiento colectivo | ~2000 | 🟢 MEDIA |
| 36 | `emerging_patterns` | Patrones emergentes detectados | ~500 | 🟢 MEDIA |
| 37 | `ai_brain_metrics` | Métricas del cerebro de IA | ~10000 | 🟢 BAJA |
| 38 | `escalations` | Escalaciones de casos | ~100 | 🟡 ALTA |

### GRUPO 5: SUPPORT & INFRASTRUCTURE

| # | Tabla | Descripción | Registros Est. | Criticidad |
|---|-------|-------------|----------------|------------|
| 39 | `priority_queue_cache` | Cache de cola de prioridad | ~100 | 🟢 BAJA |
| 40 | `scheduled_calls` | Llamadas programadas (general) | ~300 | 🟡 ALTA |
| 41 | `v_user_savings` | Vista de ahorros de usuario | N/A | 🟡 ALTA |

### GRUPO 6: EXTENSIONES Y FUNCIONES

- **Funciones:**
  - `update_updated_at_column()` - Actualización automática de timestamps
  - `check_max_beneficiaries()` - Validación máximo 4 beneficiarios
  - `create_callback_from_call()` - Creación automática de callbacks
  - `notify_urgency()` - Notificaciones de urgencias
  - `auto_update_medical_history()` - Actualización automática de historial
  - `notify_wati_call_complete()` - Notificaciones WhatsApp post-llamada

- **Triggers:**
  - 15+ triggers de actualización automática
  - 4 triggers de notificación
  - 2 triggers de validación

- **Vistas:**
  - `v_user_savings` - Cálculo de ahorros por usuario

---

## 🗂️ ESQUEMAS SQL DETALLADOS

### 1. TABLA: registrations (CRÍTICA)

```sql
CREATE TABLE public.registrations (
  id BIGSERIAL PRIMARY KEY,
  codigo_familia VARCHAR(10) UNIQUE NOT NULL,
  
  -- Suscriptor (Migrante en USA)
  migrant_name VARCHAR(100) NOT NULL,
  migrant_email VARCHAR(255) NOT NULL,
  migrant_phone VARCHAR(20) NOT NULL,
  migrant_state VARCHAR(2) NOT NULL,
  
  -- Usuario Principal (Familia en México)
  principal_name VARCHAR(100) NOT NULL,
  principal_phone VARCHAR(20) NOT NULL,
  principal_relationship VARCHAR(20) NOT NULL,
  
  -- Plan
  plan_id VARCHAR(20) NOT NULL,
  plan_name VARCHAR(50) NOT NULL,
  plan_price DECIMAL(10, 2) NOT NULL,
  
  -- Square/Stripe Payment Info
  square_customer_id VARCHAR(100),
  square_subscription_id VARCHAR(100),
  square_payment_id VARCHAR(100),
  stripe_customer_id VARCHAR(100),
  stripe_subscription_id VARCHAR(100),
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending' NOT NULL,
  activated_at TIMESTAMPTZ,
  last_payment_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  CONSTRAINT valid_status CHECK (status IN ('pending', 'active', 'cancelled', 'expired', 'paused')),
  CONSTRAINT valid_plan CHECK (plan_id IN ('basic', 'premium'))
);

CREATE INDEX idx_registrations_email ON registrations(migrant_email);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_codigo ON registrations(codigo_familia);
```

**Dependencias:** 
- Padre de: `family_members`, `beneficiaries`, `service_usage`, `savings_records`, `companion_calls`

---

### 2. TABLA: beneficiaries (CRÍTICA)

```sql
CREATE TABLE public.beneficiaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id BIGINT NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100),
    fecha_nacimiento DATE NOT NULL,
    genero VARCHAR(20) CHECK (genero IN ('masculino', 'femenino', 'otro', 'prefiero_no_decir')),
    
    whatsapp VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    
    parentesco VARCHAR(50) NOT NULL CHECK (parentesco IN (
        'madre', 'padre', 'esposa', 'esposo', 'hijo', 'hija', 
        'hermano', 'hermana', 'abuelo', 'abuela', 'otro'
    )),
    
    orden_beneficiario INTEGER NOT NULL CHECK (orden_beneficiario BETWEEN 1 AND 4),
    
    is_active BOOLEAN DEFAULT true,
    is_primary BOOLEAN DEFAULT false,
    
    preferred_call_time VARCHAR(50),
    timezone VARCHAR(50) DEFAULT 'America/Mexico_City',
    language VARCHAR(10) DEFAULT 'es-MX',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(registration_id, orden_beneficiario),
    UNIQUE(registration_id, whatsapp)
);

CREATE INDEX idx_beneficiaries_registration ON public.beneficiaries(registration_id);
CREATE INDEX idx_beneficiaries_whatsapp ON public.beneficiaries(whatsapp);
CREATE INDEX idx_beneficiaries_active ON public.beneficiaries(is_active) WHERE is_active = true;
```

**Dependencias:**
- Requiere: `registrations`
- Padre de: `medical_history`, `service_usage`, `companion_calls`

---

### 3. TABLA: ai_companions (CRÍTICA - Sistema Lupita)

```sql
CREATE TABLE public.ai_companions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Identificación
    agent_id VARCHAR(20) NOT NULL UNIQUE,
    agent_name VARCHAR(50) NOT NULL,
    
    -- Personalidad
    personality_type VARCHAR(30) CHECK (personality_type IN (
        'maternal', 'professional', 'friendly', 'energetic', 'calming'
    )),
    voice_id VARCHAR(100),
    
    -- Especialización
    specialization VARCHAR(50),
    age_range VARCHAR(30),
    
    -- Descripción
    description TEXT,
    backstory TEXT,
    
    -- Configuración
    default_arquetipo VARCHAR(30),
    tono_default VARCHAR(30),
    velocidad_habla DECIMAL(2,1) DEFAULT 1.0,
    
    -- IDs de integración
    vapi_assistant_id VARCHAR(100),
    vapi_phone_number_id VARCHAR(100),
    elevenlabs_voice_id VARCHAR(100),
    
    -- Estadísticas
    total_calls INTEGER DEFAULT 0,
    average_satisfaction DECIMAL(3,2),
    
    -- Estado
    is_active BOOLEAN DEFAULT true,
    is_default BOOLEAN DEFAULT false,
    
    -- Metadatos
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_companions_active ON public.ai_companions(is_active);
CREATE INDEX idx_ai_companions_specialization ON public.ai_companions(specialization);
```

**Datos Iniciales:**
- Lupita (agent_id: 'lupita') - Companion principal
- VAPI Assistant ID: `e313a305-254b-4cb8-808b-3a1b79e5fdea`

---

### 4. TABLA: behavioral_codes (CRÍTICA - Sistema Lupita)

```sql
CREATE TABLE public.behavioral_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    agent_id VARCHAR(20) NOT NULL,
    agent_name VARCHAR(50),
    
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN (
        'saludo', 'despedida', 'empatia', 'crisis', 'salud', 
        'familia', 'emocional', 'seguimiento', 'recordatorio',
        'celebracion', 'duelo', 'motivacion', 'educacion', 'urgencia',
        'confianza', 'transicion'
    )),
    
    description TEXT NOT NULL,
    trigger_conditions JSONB,
    
    response_adulto_mayor TEXT,
    response_mujer_joven TEXT,
    response_default TEXT NOT NULL,
    
    variaciones_regionales JSONB,
    frases_mexicanas TEXT[],
    frases_evitar TEXT[],
    
    tono VARCHAR(30) CHECK (tono IN (
        'calido', 'profesional', 'urgente', 'celebratorio', 
        'empatico', 'motivador', 'tranquilizador'
    )),
    nivel_formalidad INTEGER CHECK (nivel_formalidad BETWEEN 1 AND 5),
    
    embeddings_vector VECTOR(1536),
    ejemplos_uso JSONB,
    
    is_active BOOLEAN DEFAULT true,
    version INTEGER DEFAULT 1,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(agent_id, code)
);

CREATE INDEX idx_behavioral_codes_agent ON public.behavioral_codes(agent_id);
CREATE INDEX idx_behavioral_codes_category ON public.behavioral_codes(category);
```

**Datos Iniciales:** 16 códigos de comportamiento (BC001-BC016)

---

### 5. TABLA: companion_calls (CRÍTICA)

```sql
CREATE TABLE public.companion_calls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    beneficiary_id UUID NOT NULL REFERENCES public.beneficiaries(id) ON DELETE CASCADE,
    registration_id BIGINT NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    
    vapi_call_id VARCHAR(255),
    telnyx_call_id VARCHAR(255),
    elevenlabs_voice_id VARCHAR(255),
    
    scheduled_at TIMESTAMPTZ,
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    duration_seconds INTEGER,
    
    call_type VARCHAR(30) NOT NULL CHECK (call_type IN (
        'bienvenida', 'seguimiento_diario', 'post_consulta',
        'recordatorio_medicamento', 'chequeo_salud', 'crisis',
        'cumpleanos', 'callback_solicitado', 'manual'
    )),
    
    status VARCHAR(30) DEFAULT 'scheduled' CHECK (status IN (
        'scheduled', 'calling', 'in_progress', 'completed', 
        'no_answer', 'busy', 'failed', 'cancelled', 'voicemail'
    )),
    
    attempt_number INTEGER DEFAULT 1,
    max_attempts INTEGER DEFAULT 3,
    
    behavioral_codes_used UUID[],
    topics_discussed TEXT[],
    sentiment_detected VARCHAR(20),
    
    transcript_url TEXT,
    transcript_text TEXT,
    transcript_summary TEXT,
    
    health_mentions JSONB,
    medication_mentions JSONB,
    symptoms_reported JSONB,
    mood_assessment VARCHAR(50),
    
    follow_up_required BOOLEAN DEFAULT false,
    follow_up_reason TEXT,
    urgency_level INTEGER CHECK (urgency_level BETWEEN 0 AND 5),
    
    next_call_scheduled_at TIMESTAMPTZ,
    next_call_reason TEXT,
    callback_requested BOOLEAN DEFAULT false,
    callback_requested_at TIMESTAMPTZ,
    callback_delay_minutes INTEGER,
    
    call_quality_score DECIMAL(3,2),
    audio_quality VARCHAR(20),
    
    embeddings_stored BOOLEAN DEFAULT false,
    weaviate_id VARCHAR(255),
    
    notes TEXT,
    reviewed_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_companion_calls_beneficiary ON public.companion_calls(beneficiary_id);
CREATE INDEX idx_companion_calls_registration ON public.companion_calls(registration_id);
CREATE INDEX idx_companion_calls_scheduled ON public.companion_calls(scheduled_at);
CREATE INDEX idx_companion_calls_status ON public.companion_calls(status);
CREATE INDEX idx_companion_calls_followup ON public.companion_calls(follow_up_required) WHERE follow_up_required = true;
```

**Dependencias:**
- Requiere: `beneficiaries`, `registrations`
- Padre de: `scheduled_callbacks`
- Trigger: Crea callbacks automáticos cuando `callback_requested = true`

---

### 6. TABLA: medical_history (CRÍTICA - HIPAA Compliance)

```sql
CREATE TABLE public.medical_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    beneficiary_id UUID NOT NULL REFERENCES public.beneficiaries(id) ON DELETE CASCADE,
    
    record_type VARCHAR(50) NOT NULL CHECK (record_type IN (
        'condicion_cronica', 'alergia', 'cirugia', 'hospitalizacion',
        'vacuna', 'medicamento_actual', 'antecedente_familiar',
        'consulta', 'estudio', 'receta'
    )),
    
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_evento DATE,
    fecha_diagnostico DATE,
    
    is_chronic BOOLEAN DEFAULT false,
    severity VARCHAR(20) CHECK (severity IN ('leve', 'moderado', 'severo', 'controlado')),
    
    medicamentos JSONB,
    
    doctor_nombre VARCHAR(255),
    institucion VARCHAR(255),
    
    documentos_urls TEXT[],
    notas_companion TEXT,
    
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by VARCHAR(50) DEFAULT 'user',
    source VARCHAR(50) DEFAULT 'manual'
);

CREATE INDEX idx_medical_history_beneficiary ON public.medical_history(beneficiary_id);
CREATE INDEX idx_medical_history_type ON public.medical_history(record_type);
CREATE INDEX idx_medical_history_chronic ON public.medical_history(is_chronic) WHERE is_chronic = true;
```

**⚠️ IMPORTANTE:** Esta tabla contiene PHI (Protected Health Information) - requiere encriptación en AWS RDS

---

### 7. TABLA: service_usage (CRÍTICA)

```sql
CREATE TABLE public.service_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id BIGINT NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    beneficiary_id UUID NOT NULL REFERENCES public.beneficiaries(id) ON DELETE CASCADE,
    
    service_type VARCHAR(50) NOT NULL CHECK (service_type IN (
        'telemedicina', 'farmacia', 'consulta_presencial', 
        'especialista', 'laboratorio', 'terapia_psicologica',
        'urgencia', 'receta_electronica'
    )),
    
    service_provider VARCHAR(255),
    service_date TIMESTAMPTZ NOT NULL,
    
    duration_minutes INTEGER,
    doctor_name VARCHAR(255),
    diagnosis TEXT,
    prescriptions JSONB,
    
    pharmacy_name VARCHAR(255),
    pharmacy_location VARCHAR(255),
    productos JSONB,
    total_sin_descuento DECIMAL(10,2),
    total_con_descuento DECIMAL(10,2),
    ahorro DECIMAL(10,2),
    porcentaje_descuento DECIMAL(5,2),
    
    appointment_type VARCHAR(50),
    clinic_name VARCHAR(255),
    clinic_address TEXT,
    
    status VARCHAR(30) DEFAULT 'completado' CHECK (status IN (
        'agendado', 'en_proceso', 'completado', 'cancelado', 'no_show'
    )),
    
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    feedback TEXT,
    
    notes TEXT,
    notes_companion TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_service_usage_registration ON public.service_usage(registration_id);
CREATE INDEX idx_service_usage_beneficiary ON public.service_usage(beneficiary_id);
CREATE INDEX idx_service_usage_type ON public.service_usage(service_type);
CREATE INDEX idx_service_usage_date ON public.service_usage(service_date DESC);
```

---

## 🔗 RELACIONES Y DEPENDENCIAS

### Jerarquía de Dependencias (Orden de Migración)

```
NIVEL 0 (Sin dependencias):
├── ai_companions
├── medication_catalog
└── user_demographics

NIVEL 1 (Dependen de NIVEL 0):
├── registrations
├── behavioral_codes (→ ai_companions)
└── user_accounts

NIVEL 2 (Dependen de NIVEL 1):
├── family_members (→ registrations)
├── beneficiaries (→ registrations)
├── dependents (→ registrations)
└── subscriptions (→ registrations)

NIVEL 3 (Dependen de NIVEL 2):
├── medical_history (→ beneficiaries)
├── service_usage (→ registrations, beneficiaries)
├── companion_calls (→ beneficiaries, registrations)
├── savings_records (→ registrations)
├── medication_reminders (→ beneficiaries)
└── telemedicine_appointments (→ beneficiaries)

NIVEL 4 (Dependen de NIVEL 3):
├── scheduled_callbacks (→ companion_calls)
├── call_recordings (→ companion_calls)
├── call_transcripts (→ companion_calls)
└── urgent_notifications (→ companion_calls)

NIVEL 5 (Tablas de análisis):
├── keyword_analysis
├── user_conversation_profiles
├── collective_knowledge_base
└── ai_brain_metrics
```

---

## 🚀 PLAN DE MIGRACIÓN A AWS

### FASE 1: PREPARACIÓN (Día 1-2)

#### 1.1 Crear AWS RDS PostgreSQL

```bash
# Especificaciones recomendadas
Engine: PostgreSQL 15.x
Instance Type: db.t3.medium (2 vCPU, 4 GB RAM)
Storage: 100 GB gp3 (escalable a 500 GB)
Multi-AZ: Sí (para alta disponibilidad)
Backup: Automated daily, 7 days retention
Encryption: Enabled (AES-256)
```

#### 1.2 Configuración de Seguridad

```hcl
# Security Group
resource "aws_security_group" "rds_sg" {
  name = "saludcompartida-rds-sg"
  
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"] # VPC CIDR
  }
}

# Subnet Group
resource "aws_db_subnet_group" "main" {
  name       = "saludcompartida-subnet-group"
  subnet_ids = [aws_subnet.private_a.id, aws_subnet.private_b.id]
}
```

#### 1.3 Crear Instancia RDS

```bash
aws rds create-db-instance \
  --db-instance-identifier saludcompartida-prod \
  --db-instance-class db.t3.medium \
  --engine postgres \
  --engine-version 15.4 \
  --master-username admin \
  --master-user-password [PASSWORD_SECURE] \
  --allocated-storage 100 \
  --storage-type gp3 \
  --storage-encrypted \
  --backup-retention-period 7 \
  --vpc-security-group-ids sg-xxxxx \
  --db-subnet-group-name saludcompartida-subnet-group \
  --multi-az \
  --publicly-accessible false \
  --tags Key=Environment,Value=production Key=Project,Value=SaludCompartida
```

---

### FASE 2: EXPORTACIÓN DESDE SUPABASE (Día 2-3)

#### 2.1 Exportar Schema

```bash
# Conectar a Supabase y exportar schema
pg_dump -h rzmdekjegbdgitqekjee.supabase.co \
  -U postgres \
  -d postgres \
  --schema-only \
  --no-owner \
  --no-privileges \
  -f saludcompartida_schema.sql
```

#### 2.2 Exportar Datos por Tabla (en orden de dependencias)

```bash
# Script para exportar todas las tablas
#!/bin/bash

TABLES=(
  # Nivel 0
  "ai_companions"
  "medication_catalog"
  "user_demographics"
  
  # Nivel 1
  "registrations"
  "behavioral_codes"
  "user_accounts"
  
  # Nivel 2
  "family_members"
  "beneficiaries"
  "dependents"
  "subscriptions"
  
  # Nivel 3
  "medical_history"
  "service_usage"
  "companion_calls"
  "savings_records"
  
  # Nivel 4
  "scheduled_callbacks"
  "call_recordings"
  "call_transcripts"
  "urgent_notifications"
  
  # Nivel 5
  "keyword_analysis"
  "user_conversation_profiles"
  "collective_knowledge_base"
)

for table in "${TABLES[@]}"; do
  echo "Exportando $table..."
  pg_dump -h rzmdekjegbdgitqekjee.supabase.co \
    -U postgres \
    -d postgres \
    --data-only \
    --table=public.$table \
    -f "exports/${table}.sql"
done
```

#### 2.3 Verificar Conteo de Registros

```sql
-- Ejecutar en Supabase ANTES de migrar
SELECT 
    table_name,
    (xpath('/row/cnt/text()', 
           query_to_xml(format('SELECT COUNT(*) AS cnt FROM %I.%I', 
                              table_schema, table_name), false, true, '')))[1]::text::int AS row_count
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

---

### FASE 3: IMPORTACIÓN A AWS RDS (Día 3-4)

#### 3.1 Preparar AWS RDS

```sql
-- Conectar a AWS RDS
psql -h saludcompartida-prod.xxxxxxxxx.us-east-1.rds.amazonaws.com \
     -U admin \
     -d postgres

-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgvector"; -- Para embeddings

-- Crear database
CREATE DATABASE saludcompartida;
\c saludcompartida
```

#### 3.2 Importar Schema

```bash
psql -h saludcompartida-prod.xxxxxxxxx.us-east-1.rds.amazonaws.com \
     -U admin \
     -d saludcompartida \
     -f saludcompartida_schema.sql
```

#### 3.3 Importar Datos (en orden)

```bash
#!/bin/bash
RDS_HOST="saludcompartida-prod.xxxxxxxxx.us-east-1.rds.amazonaws.com"
RDS_USER="admin"
RDS_DB="saludcompartida"

TABLES=(
  "ai_companions"
  "medication_catalog"
  "registrations"
  "behavioral_codes"
  "user_accounts"
  "family_members"
  "beneficiaries"
  "medical_history"
  "service_usage"
  "companion_calls"
  "scheduled_callbacks"
  "call_recordings"
  "urgent_notifications"
  "keyword_analysis"
)

for table in "${TABLES[@]}"; do
  echo "Importando $table..."
  psql -h $RDS_HOST -U $RDS_USER -d $RDS_DB -f "exports/${table}.sql"
  
  # Verificar conteo
  COUNT=$(psql -h $RDS_HOST -U $RDS_USER -d $RDS_DB -t -c "SELECT COUNT(*) FROM $table")
  echo "✓ $table: $COUNT registros importados"
done
```

---

### FASE 4: VALIDACIÓN POST-MIGRACIÓN (Día 4-5)

#### 4.1 Script de Validación Completa

```sql
-- =============================================
-- VALIDACIÓN POST-MIGRACIÓN AWS RDS
-- =============================================

-- 1. Verificar conteo de tablas
SELECT COUNT(*) AS total_tables
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE';
-- Esperado: 53 tablas

-- 2. Verificar conteo de registros por tabla
SELECT 
    table_name,
    (xpath('/row/cnt/text()', 
           query_to_xml(format('SELECT COUNT(*) AS cnt FROM %I.%I', 
                              table_schema, table_name), false, true, '')))[1]::text::int AS row_count
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE'
ORDER BY row_count DESC;

-- 3. Verificar Foreign Keys
SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_schema = 'public'
ORDER BY tc.table_name;

-- 4. Verificar Índices
SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- 5. Verificar Triggers
SELECT
    trigger_name,
    event_object_table AS table_name,
    action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table;

-- 6. Verificar Extensiones
SELECT * FROM pg_extension;
-- Debe incluir: uuid-ossp, pgvector

-- 7. Verificar Funciones
SELECT
    routine_name,
    routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
ORDER BY routine_name;

-- 8. Verificar Vistas
SELECT
    table_name AS view_name,
    view_definition
FROM information_schema.views
WHERE table_schema = 'public';

-- 9. Prueba de Integridad Referencial
-- Verificar que NO hay registros huérfanos
SELECT 
    'beneficiaries' AS tabla,
    COUNT(*) AS huerfanos
FROM beneficiaries b
WHERE NOT EXISTS (SELECT 1 FROM registrations r WHERE r.id = b.registration_id)
UNION ALL
SELECT 
    'medical_history',
    COUNT(*)
FROM medical_history m
WHERE NOT EXISTS (SELECT 1 FROM beneficiaries b WHERE b.id = m.beneficiary_id)
UNION ALL
SELECT 
    'companion_calls',
    COUNT(*)
FROM companion_calls c
WHERE NOT EXISTS (SELECT 1 FROM beneficiaries b WHERE b.id = c.beneficiary_id);
-- Todos deben ser 0

-- 10. Verificar datos críticos
SELECT 
    'registrations' AS tabla,
    COUNT(*) AS total,
    COUNT(*) FILTER (WHERE status = 'active') AS activos
FROM registrations
UNION ALL
SELECT 
    'beneficiaries',
    COUNT(*),
    COUNT(*) FILTER (WHERE is_active = true)
FROM beneficiaries
UNION ALL
SELECT 
    'companion_calls',
    COUNT(*),
    COUNT(*) FILTER (WHERE status = 'completed')
FROM companion_calls;
```

#### 4.2 Pruebas Funcionales

```javascript
// test-aws-connection.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.AWS_RDS_HOST,
  port: 5432,
  database: 'saludcompartida',
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    // Test 1: Conexión básica
    const client = await pool.connect();
    console.log('✓ Conexión exitosa a AWS RDS');
    
    // Test 2: Query simple
    const result = await client.query('SELECT NOW()');
    console.log('✓ Query exitoso:', result.rows[0]);
    
    // Test 3: Verificar tablas críticas
    const tables = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('registrations', 'beneficiaries', 'companion_calls')
    `);
    console.log('✓ Tablas críticas encontradas:', tables.rows.length);
    
    // Test 4: Datos de prueba
    const registrations = await client.query('SELECT COUNT(*) FROM registrations');
    console.log('✓ Registrations:', registrations.rows[0].count);
    
    const beneficiaries = await client.query('SELECT COUNT(*) FROM beneficiaries');
    console.log('✓ Beneficiaries:', beneficiaries.rows[0].count);
    
    client.release();
    console.log('\n✅ Todas las pruebas pasaron exitosamente');
    
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await pool.end();
  }
}

testConnection();
```

---

### FASE 5: ACTUALIZAR APLICACIÓN (Día 5)

#### 5.1 Variables de Entorno

```bash
# .env.production
# =============================================
# AWS RDS CONFIGURATION
# =============================================
AWS_RDS_HOST=saludcompartida-prod.xxxxxxxxx.us-east-1.rds.amazonaws.com
AWS_RDS_PORT=5432
AWS_RDS_DATABASE=saludcompartida
AWS_RDS_USER=admin
AWS_RDS_PASSWORD=[PASSWORD_SECURE]

# Connection Pool Settings
AWS_RDS_MAX_CONNECTIONS=20
AWS_RDS_MIN_CONNECTIONS=5
AWS_RDS_IDLE_TIMEOUT=30000
AWS_RDS_CONNECTION_TIMEOUT=10000

# SSL Configuration
AWS_RDS_SSL=true
AWS_RDS_SSL_MODE=require
```

#### 5.2 Actualizar Supabase Client

```javascript
// src/lib/aws-rds.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.AWS_RDS_HOST,
  port: parseInt(process.env.AWS_RDS_PORT || '5432'),
  database: process.env.AWS_RDS_DATABASE,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD,
  max: parseInt(process.env.AWS_RDS_MAX_CONNECTIONS || '20'),
  min: parseInt(process.env.AWS_RDS_MIN_CONNECTIONS || '5'),
  idleTimeoutMillis: parseInt(process.env.AWS_RDS_IDLE_TIMEOUT || '30000'),
  connectionTimeoutMillis: parseInt(process.env.AWS_RDS_CONNECTION_TIMEOUT || '10000'),
  ssl: process.env.AWS_RDS_SSL === 'true' ? {
    rejectUnauthorized: false
  } : false
});

// Helper para queries
async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error executing query', { text, error });
    throw error;
  }
}

// Helper para transacciones
async function transaction(callback) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  query,
  transaction,
  pool
};
```

#### 5.3 Migrar Endpoints API

```javascript
// src/app/api/registrations/route.js
import { query } from '@/lib/aws-rds';

export async function GET(request) {
  try {
    const result = await query(
      'SELECT * FROM registrations WHERE status = $1 ORDER BY created_at DESC',
      ['active']
    );
    
    return Response.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

---

### FASE 6: MONITOREO Y OPTIMIZACIÓN (Día 6-7)

#### 6.1 Configurar CloudWatch Alarms

```bash
# Alarm para CPU
aws cloudwatch put-metric-alarm \
  --alarm-name saludcompartida-rds-cpu-high \
  --alarm-description "CPU usage > 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/RDS \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --dimensions Name=DBInstanceIdentifier,Value=saludcompartida-prod

# Alarm para conexiones
aws cloudwatch put-metric-alarm \
  --alarm-name saludcompartida-rds-connections-high \
  --alarm-description "Database connections > 80" \
  --metric-name DatabaseConnections \
  --namespace AWS/RDS \
  --statistic Average \
  --period 60 \
  --evaluation-periods 3 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --dimensions Name=DBInstanceIdentifier,Value=saludcompartida-prod

# Alarm para storage
aws cloudwatch put-metric-alarm \
  --alarm-name saludcompartida-rds-storage-low \
  --alarm-description "Free storage < 20GB" \
  --metric-name FreeStorageSpace \
  --namespace AWS/RDS \
  --statistic Average \
  --period 300 \
  --evaluation-periods 1 \
  --threshold 21474836480 \
  --comparison-operator LessThanThreshold \
  --dimensions Name=DBInstanceIdentifier,Value=saludcompartida-prod
```

#### 6.2 Performance Insights

```sql
-- Habilitar Performance Insights
aws rds modify-db-instance \
  --db-instance-identifier saludcompartida-prod \
  --enable-performance-insights \
  --performance-insights-retention-period 7 \
  --apply-immediately

-- Queries lentos
SELECT 
    substring(query, 1, 100) AS short_query,
    calls,
    total_time,
    mean_time,
    max_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Índices no utilizados
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
AND schemaname = 'public'
ORDER BY pg_relation_size(indexrelid) DESC;

-- Tablas más consultadas
SELECT 
    schemaname,
    tablename,
    seq_scan,
    idx_scan,
    n_tup_ins AS inserts,
    n_tup_upd AS updates,
    n_tup_del AS deletes
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY seq_scan + idx_scan DESC
LIMIT 20;
```

---

## 📋 CHECKLIST DE MIGRACIÓN

### Pre-Migración
- [ ] Backup completo de Supabase realizado
- [ ] AWS RDS instance creada y configurada
- [ ] Security groups y networking configurados
- [ ] Extensiones PostgreSQL instaladas (uuid-ossp, pgvector)
- [ ] Variables de entorno preparadas
- [ ] Scripts de migración probados en staging

### Durante Migración
- [ ] Modo mantenimiento activado
- [ ] Schema exportado e importado
- [ ] Datos exportados en orden de dependencias
- [ ] Datos importados verificados
- [ ] Foreign keys verificadas
- [ ] Índices creados
- [ ] Triggers funcionando
- [ ] Funciones creadas

### Post-Migración
- [ ] Conteo de registros coincide (Supabase vs AWS)
- [ ] No hay registros huérfanos
- [ ] Queries de prueba funcionan
- [ ] API endpoints actualizados
- [ ] Variables de entorno en producción actualizadas
- [ ] CloudWatch alarms configuradas
- [ ] Performance Insights habilitado
- [ ] Backups automáticos configurados
- [ ] Pruebas end-to-end pasadas
- [ ] Monitoreo activo por 48 horas

---

## 🔐 SEGURIDAD Y COMPLIANCE

### Encriptación
- **En reposo:** AES-256 (habilitado en RDS)
- **En tránsito:** TLS 1.2+ (SSL obligatorio)
- **PHI Data:** Tabla `medical_history` requiere acceso restringido

### Backups
- **Automated Backups:** Diarios, retención 7 días
- **Manual Snapshots:** Antes y después de migración
- **Point-in-Time Recovery:** Habilitado
- **Backup a S3:** Exportación semanal a S3 con lifecycle policy

### Acceso
- **IAM Roles:** Configurar para Lambda y EC2
- **Security Groups:** Solo acceso desde VPC privada
- **Master User:** Rotar password post-migración
- **Application User:** Crear usuario limitado para app

---

## 💰 COSTOS ESTIMADOS AWS RDS

### Instancia db.t3.medium
- **Compute:** ~$0.068/hora = ~$50/mes
- **Storage (100 GB gp3):** ~$11.5/mes
- **Backup Storage (50 GB):** ~$2.5/mes
- **Data Transfer:** ~$5-10/mes
- **Performance Insights:** Gratis (7 días retención)

**Total Estimado:** ~$70-80/mes

### Optimizaciones de Costo
- Usar Reserved Instances (descuento 40-60%)
- Auto-scaling storage solo cuando sea necesario
- Revisar índices y queries para reducir IOPS
- Considerar RDS Proxy para connection pooling

---

## 📞 SOPORTE Y TROUBLESHOOTING

### Problemas Comunes

1. **Error de conexión SSL**
```javascript
// Solución: Agregar configuración SSL
ssl: {
  rejectUnauthorized: false
}
```

2. **Too many connections**
```sql
-- Solución: Aumentar max_connections
ALTER SYSTEM SET max_connections = 200;
SELECT pg_reload_conf();
```

3. **Slow queries**
```sql
-- Identificar y crear índices faltantes
SELECT * FROM pg_stat_statements WHERE mean_time > 1000;
```

4. **Foreign key violations**
```bash
# Importar en orden correcto (ver sección de dependencias)
```

---

## 📚 RECURSOS ADICIONALES

### Documentación
- [AWS RDS PostgreSQL](https://docs.aws.amazon.com/rds/latest/postgresql/)
- [PostgreSQL 15 Documentation](https://www.postgresql.org/docs/15/)
- [Supabase Migration Guide](https://supabase.com/docs/guides/migrations)

### Scripts en este Repo
- `scripts/list-all-tables.sql` - Listar tablas
- `get-all-tables.js` - Extraer metadata
- `supabase/migrations/ALL_MIGRATIONS_CONSOLIDATED.sql` - Schema completo

### Contacto
- **Proyecto:** SaludCompartida MVP
- **Owner:** Fabiola Franco
- **Fecha Creación:** Enero 2026

---

## ✅ SIGUIENTE PASO

1. **AHORA:** Ejecuta `scripts/list-all-tables.sql` en Supabase SQL Editor para confirmar las 53 tablas
2. **DÍA 1:** Crear AWS RDS instance
3. **DÍA 2-3:** Exportar de Supabase
4. **DÍA 4:** Importar a AWS RDS
5. **DÍA 5:** Validar y actualizar app
6. **DÍA 6-7:** Monitorear y optimizar

**¿Necesitas ayuda con algún paso específico?** 🚀
