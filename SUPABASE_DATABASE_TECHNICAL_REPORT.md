# 📊 REPORTE TÉCNICO: ARQUITECTURA DE BASE DE DATOS SUPABASE
## SaludCompartida - MVP Platform

---

**Fecha de Generación:** 27 de Enero, 2026  
**Versión de Base de Datos:** 1.4.2  
**PostgreSQL Version:** 15.x  
**Audiencia:** IT Developers, Database Administrators, Technical Team  
**Nivel Técnico:** Advanced

---

## 🎯 RESUMEN EJECUTIVO

La base de datos de SaludCompartida está diseñada sobre **Supabase (PostgreSQL)** con una arquitectura relacional normalizada que maneja el ciclo completo de vida de un usuario desde el registro hasta el tracking de servicios médicos y ahorros.

### Características Técnicas Core:
- ✅ **Row Level Security (RLS)** habilitado en todas las tablas
- ✅ **Triggers automáticos** para actualización de timestamps
- ✅ **Foreign Keys con CASCADE** para integridad referencial
- ✅ **Índices optimizados** en columnas de búsqueda frecuente
- ✅ **Views materializadas** para queries de analytics
- ✅ **TypeScript types** generados desde schema SQL

---

## 📋 TABLA DE CONTENIDOS

1. [Tablas Core del Sistema](#1-tablas-core-del-sistema)
2. [Relaciones y Foreign Keys](#2-relaciones-y-foreign-keys)
3. [Esquema de Nomenclatura](#3-esquema-de-nomenclatura)
4. [Row Level Security (RLS)](#4-row-level-security-rls)
5. [Índices y Performance](#5-índices-y-performance)
6. [Triggers y Automatizaciones](#6-triggers-y-automatizaciones)
7. [Views y Reportes](#7-views-y-reportes)
8. [Migraciones SQL](#8-migraciones-sql)
9. [TypeScript Integration](#9-typescript-integration)
10. [Queries de Ejemplo](#10-queries-de-ejemplo)

---

## 1. TABLAS CORE DEL SISTEMA

### 1.1 `registrations` - Tabla Central de Usuarios

**Propósito:** Almacena la información principal de cada familia registrada en la plataforma. Es la tabla **central** del sistema - todas las demás tablas referencian a esta.

**Schema TypeScript:**
```typescript
export interface Registration {
  // Identificadores
  id: number;                          // PK autoincremental
  codigo_familia: string;              // Código único generado (formato: "SC-XXXXXX")
  
  // Datos del Migrante (Usuario en USA)
  migrant_name: string;                // Nombre completo del migrante
  migrant_email: string;               // Email principal (UNIQUE)
  migrant_phone: string;               // WhatsApp del migrante (+1)
  migrant_state: string;               // Estado de residencia en USA
  
  // Datos del Principal Beneficiario (Familiar en México)
  principal_name: string;              // Nombre del beneficiario principal
  principal_phone: string;             // WhatsApp del beneficiario (+52)
  principal_relationship: string;      // Relación: madre, padre, hijo, etc.
  
  // Información del Plan
  plan_id: string;                     // ID del plan contratado
  plan_name: string;                   // Nombre: "Básico", "Premium", etc.
  plan_price: number;                  // Precio mensual en USD
  
  // Integración con Square Payment
  square_customer_id: string | null;   // ID del cliente en Square
  square_subscription_id: string | null; // ID de suscripción en Square
  square_payment_id: string | null;    // ID del último pago procesado
  
  // Estado y Lifecycle
  status: 'pending' | 'active' | 'cancelled' | 'expired' | 'paused';
  activated_at: string | null;         // Timestamp de activación
  last_payment_at: string | null;      // Último pago exitoso
  cancelled_at: string | null;         // Fecha de cancelación
  
  // Auditoría
  created_at: string;                  // ISO 8601 timestamp
  updated_at: string;                  // Auto-actualizado por trigger
}
```

**Constraints:**
- `PRIMARY KEY (id)`
- `UNIQUE (codigo_familia)`
- `UNIQUE (migrant_email)`
- `CHECK (status IN ('pending', 'active', 'cancelled', 'expired', 'paused'))`

**Índices:**
```sql
CREATE INDEX idx_registrations_codigo ON registrations(codigo_familia);
CREATE INDEX idx_registrations_email ON registrations(migrant_email);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_square_customer ON registrations(square_customer_id);
```

**Migrations Aplicadas:**
- `add_payment_fields_to_registrations.sql` - Añade campos de Square
- `create_registrations_table.sql` - Creación inicial

**Uso en el Código:**
```typescript
// src/lib/supabase.ts
export async function createRegistration(data: RegistrationInsert): Promise<Registration>
export async function getRegistrationByCode(codigoFamilia: string): Promise<Registration | null>
export async function updateUserByAccessCode(codigoFamilia: string, updates: RegistrationUpdate)
```

---

### 1.2 `family_members` - Dependientes de la Familia

**Propósito:** Almacena información de todos los miembros de la familia (incluido el principal). Permite hasta 4 miembros por familia según el plan.

**Schema TypeScript:**
```typescript
export interface FamilyMember {
  id: number;                          // PK autoincremental
  registration_id: number;             // FK a registrations(id)
  
  // Información Personal
  name: string;                        // Nombre completo
  last_name: string | null;            // Apellido (opcional por privacidad)
  birth_date: string | null;           // ISO 8601 date (YYYY-MM-DD)
  phone: string | null;                // WhatsApp personal (opcional)
  relationship: string;                // "principal", "madre", "padre", "hijo", etc.
  
  // Flags
  is_principal: boolean;               // true si es el beneficiario principal
  is_active: boolean;                  // false si fue removido del plan
  
  // Auditoría
  created_at: string;
  updated_at: string;
}
```

**Schema SQL:**
```sql
CREATE TABLE public.family_members (
    id BIGSERIAL PRIMARY KEY,
    registration_id BIGINT NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    last_name TEXT,
    birth_date DATE,
    phone TEXT,
    relationship TEXT NOT NULL,
    is_principal BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Constraints:**
- `FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE`
- `CHECK (relationship IN ('principal', 'madre', 'padre', 'hijo', 'hija', 'esposo', 'esposa', 'abuelo', 'abuela', 'otro'))`

**Índices:**
```sql
CREATE INDEX idx_family_members_registration ON family_members(registration_id);
CREATE INDEX idx_family_members_active ON family_members(is_active) WHERE is_active = true;
CREATE INDEX idx_family_members_principal ON family_members(is_principal) WHERE is_principal = true;
```

**Business Logic:**
- Máximo 4 miembros activos por `registration_id`
- Siempre debe haber 1 miembro con `is_principal = true`
- Al cancelar un plan, se hace `UPDATE is_active = false` en vez de DELETE

**Uso en el Código:**
```typescript
export async function saveDependents(registrationId: number, dependents: FamilyMemberInsert[]): Promise<FamilyMember[]>
export async function getDependentsByAccessCode(codigoFamilia: string): Promise<FamilyMember[]>
```

---

### 1.3 `savings_records` - Histórico de Ahorros Mensuales

**Propósito:** Tracking mensual de ahorros por familia. Permite calcular ROI del servicio y mostrar dashboards de valor acumulado.

**Schema TypeScript:**
```typescript
export interface SavingsRecord {
  id: number;
  registration_id: number;             // FK a registrations(id)
  month: string;                       // Formato: "2026-01" (YYYY-MM)
  
  // Ahorros por Categoría
  telemedicina_savings: number;        // USD ahorrado en consultas
  farmacia_savings: number;            // USD ahorrado con descuento 75%
  terapia_savings: number;             // USD ahorrado en psicología
  otros_savings: number;               // USD otros servicios
  total_savings: number;               // Suma automática de arriba
  
  created_at: string;
  updated_at: string;
}
```

**Schema SQL:**
```sql
CREATE TABLE public.savings_records (
    id BIGSERIAL PRIMARY KEY,
    registration_id BIGINT NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    month TEXT NOT NULL,
    telemedicina_savings NUMERIC(10, 2) DEFAULT 0,
    farmacia_savings NUMERIC(10, 2) DEFAULT 0,
    terapia_savings NUMERIC(10, 2) DEFAULT 0,
    otros_savings NUMERIC(10, 2) DEFAULT 0,
    total_savings NUMERIC(10, 2) GENERATED ALWAYS AS (
        telemedicina_savings + farmacia_savings + terapia_savings + otros_savings
    ) STORED,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(registration_id, month)
);
```

**Constraints:**
- `UNIQUE (registration_id, month)` - Un registro por mes por familia
- `CHECK (month ~ '^\d{4}-\d{2}$')` - Validar formato YYYY-MM
- `CHECK (telemedicina_savings >= 0)` - No negativos
- `total_savings` es **GENERATED COLUMN** (calculada automáticamente)

**Índices:**
```sql
CREATE INDEX idx_savings_records_registration ON savings_records(registration_id);
CREATE INDEX idx_savings_records_month ON savings_records(month DESC);
```

**Queries Comunes:**
```sql
-- Ahorros totales de una familia
SELECT SUM(total_savings) as lifetime_savings
FROM savings_records
WHERE registration_id = $1;

-- Top 10 familias con más ahorros
SELECT r.migrant_name, SUM(sr.total_savings) as total
FROM savings_records sr
JOIN registrations r ON r.id = sr.registration_id
GROUP BY r.id
ORDER BY total DESC
LIMIT 10;

-- Ahorros promedio por mes
SELECT month, AVG(total_savings) as avg_savings
FROM savings_records
WHERE month >= '2026-01'
GROUP BY month
ORDER BY month;
```

---

### 1.4 `service_usage` - Registro de Uso de Servicios

**Propósito:** Tracking transaccional de cada servicio usado por cada miembro de la familia. Base para cálculo de ahorros y analytics.

**Schema TypeScript:**
```typescript
export interface ServiceUsage {
  id: number;
  registration_id: number;             // FK a registrations(id)
  family_member_id: number | null;     // FK a family_members(id) - NULL si unknown
  
  // Tipo de Servicio
  service_type: 'telemedicina' | 'farmacia' | 'terapia' | 'especialista' | 'examen' | 'otro';
  description: string | null;          // Detalles del servicio usado
  
  // Costos y Ahorros
  amount_paid: number;                 // USD pagado con el descuento
  amount_saved: number;                // USD ahorrado vs precio regular
  
  // Timestamp
  used_at: string;                     // ISO 8601 - cuándo se usó el servicio
  created_at: string;                  // Cuándo se registró en el sistema
}
```

**Schema SQL:**
```sql
CREATE TABLE public.service_usage (
    id BIGSERIAL PRIMARY KEY,
    registration_id BIGINT NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    family_member_id BIGINT REFERENCES public.family_members(id) ON DELETE SET NULL,
    service_type TEXT NOT NULL CHECK (service_type IN ('telemedicina', 'farmacia', 'terapia', 'especialista', 'examen', 'otro')),
    description TEXT,
    amount_paid NUMERIC(10, 2) DEFAULT 0,
    amount_saved NUMERIC(10, 2) DEFAULT 0,
    used_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Índices:**
```sql
CREATE INDEX idx_service_usage_registration ON service_usage(registration_id);
CREATE INDEX idx_service_usage_member ON service_usage(family_member_id);
CREATE INDEX idx_service_usage_type ON service_usage(service_type);
CREATE INDEX idx_service_usage_date ON service_usage(used_at DESC);
```

**Triggers:**
```sql
-- Auto-actualizar savings_records cuando se registra un servicio
CREATE OR REPLACE FUNCTION update_savings_on_service()
RETURNS TRIGGER AS $$
BEGIN
    -- Actualizar o crear registro mensual
    INSERT INTO savings_records (registration_id, month, telemedicina_savings, farmacia_savings, terapia_savings, otros_savings)
    VALUES (
        NEW.registration_id,
        TO_CHAR(NEW.used_at, 'YYYY-MM'),
        CASE WHEN NEW.service_type = 'telemedicina' THEN NEW.amount_saved ELSE 0 END,
        CASE WHEN NEW.service_type = 'farmacia' THEN NEW.amount_saved ELSE 0 END,
        CASE WHEN NEW.service_type = 'terapia' THEN NEW.amount_saved ELSE 0 END,
        CASE WHEN NEW.service_type NOT IN ('telemedicina', 'farmacia', 'terapia') THEN NEW.amount_saved ELSE 0 END
    )
    ON CONFLICT (registration_id, month)
    DO UPDATE SET
        telemedicina_savings = savings_records.telemedicina_savings + EXCLUDED.telemedicina_savings,
        farmacia_savings = savings_records.farmacia_savings + EXCLUDED.farmacia_savings,
        terapia_savings = savings_records.terapia_savings + EXCLUDED.terapia_savings,
        otros_savings = savings_records.otros_savings + EXCLUDED.otros_savings,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_savings
    AFTER INSERT ON service_usage
    FOR EACH ROW
    EXECUTE FUNCTION update_savings_on_service();
```

---

## 2. RELACIONES Y FOREIGN KEYS

### 2.1 Diagrama de Relaciones

```
┌─────────────────────────────────────────────┐
│           registrations (CORE)              │
│  ─────────────────────────────────────────  │
│  PK: id                                     │
│  UK: codigo_familia, migrant_email          │
│  - Migrant data (name, email, phone)       │
│  - Principal beneficiary data              │
│  - Plan info (id, name, price)             │
│  - Square payment IDs                      │
│  - Status lifecycle                        │
└───────┬──────────────────┬─────────────────┘
        │                  │
        │ 1:N              │ 1:N
        ↓                  ↓
┌───────────────┐  ┌───────────────────┐
│family_members │  │ savings_records   │
│───────────────│  │───────────────────│
│PK: id         │  │PK: id             │
│FK: registration_id│UK: (registration_id, month)│
│- name         │  │- month (YYYY-MM)  │
│- birth_date   │  │- telemedicina_$   │
│- relationship │  │- farmacia_$       │
│- is_principal │  │- terapia_$        │
│- is_active    │  │- otros_$          │
└───────┬───────┘  │- total_$ (computed)│
        │          └───────────────────┘
        │ 1:N
        ↓
┌───────────────────┐
│  service_usage    │
│───────────────────│
│PK: id             │
│FK: registration_id│
│FK: family_member_id (NULLABLE)│
│- service_type     │
│- amount_paid      │
│- amount_saved     │
│- used_at          │
└───────────────────┘
```

### 2.2 Cascade Behaviors

**ON DELETE CASCADE:**
- `family_members.registration_id` → Si se elimina un `registration`, se eliminan todos sus miembros
- `savings_records.registration_id` → Si se elimina un `registration`, se elimina su historial de ahorros
- `service_usage.registration_id` → Si se elimina un `registration`, se elimina su historial de servicios

**ON DELETE SET NULL:**
- `service_usage.family_member_id` → Si se elimina un `family_member`, sus registros de servicios persisten pero `family_member_id = NULL`

**Reasoning:** Protección de datos históricos para analytics mientras se mantiene integridad referencial.

---

## 3. ESQUEMA DE NOMENCLATURA

### 3.1 Convenciones de Naming

**Tablas:**
- Plural snake_case: `registrations`, `family_members`, `savings_records`
- Prefijo `public.` para schema explícito

**Columnas:**
- Snake_case: `migrant_name`, `created_at`, `is_active`
- Sufijos comunes:
  - `_id`: Foreign keys y identificadores
  - `_at`: Timestamps (ISO 8601)
  - `_savings`: Montos en USD
  - `is_*`: Booleanos

**Índices:**
- Formato: `idx_{tabla}_{columna(s)}`
- Ejemplo: `idx_family_members_registration`, `idx_service_usage_date`

**Constraints:**
- PKs: Nombre por defecto (auto-generado)
- FKs: `{tabla}_registration_id_fkey`
- Checks: `{tabla}_{columna}_check`

**Functions/Triggers:**
- Functions: `snake_case` con verbo al inicio
- Ejemplo: `update_savings_on_service()`, `update_updated_at()`

### 3.2 TypeScript Types Generados

**Pattern:** `{Interface}` | `{Interface}Insert` | `{Interface}Update`

```typescript
// Base interface (full row)
export interface Registration { ... }

// Insert type (omite id, created_at, updated_at)
export type RegistrationInsert = Omit<Registration, 'id' | 'created_at' | 'updated_at'>;

// Update type (partial de Insert)
export type RegistrationUpdate = Partial<RegistrationInsert>;
```

**Reasoning:** Type-safety en operaciones CRUD sin manual maintenance.

---

## 4. ROW LEVEL SECURITY (RLS)

### 4.1 Políticas Implementadas

Todas las tablas tienen RLS habilitado:

```sql
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.savings_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_usage ENABLE ROW LEVEL SECURITY;
```

### 4.2 Política para `registrations`

```sql
-- SELECT: Usuario solo ve sus propios registros
CREATE POLICY "Users can view own registration"
    ON public.registrations FOR SELECT
    USING (migrant_email = auth.jwt()->>'email');

-- UPDATE: Usuario solo actualiza sus datos
CREATE POLICY "Users can update own registration"
    ON public.registrations FOR UPDATE
    USING (migrant_email = auth.jwt()->>'email');

-- INSERT: Cualquiera puede registrarse (pendiente auth)
CREATE POLICY "Anyone can register"
    ON public.registrations FOR INSERT
    WITH CHECK (true);
```

### 4.3 Política para `family_members`

```sql
-- SELECT: Ver miembros de su familia
CREATE POLICY "Users can view own family members"
    ON public.family_members FOR SELECT
    USING (
        registration_id IN (
            SELECT id FROM public.registrations
            WHERE migrant_email = auth.jwt()->>'email'
        )
    );

-- INSERT/UPDATE: Modificar solo sus miembros
CREATE POLICY "Users can manage own family members"
    ON public.family_members FOR ALL
    USING (
        registration_id IN (
            SELECT id FROM public.registrations
            WHERE migrant_email = auth.jwt()->>'email'
        )
    );
```

### 4.4 Service Role Bypass

En el código, usamos `SUPABASE_SERVICE_ROLE_KEY` que **bypassa RLS**:

```typescript
// src/lib/supabase.ts
const supabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,  // Service role, no sessions
  },
});
```

**Reasoning:** Backend operations necesitan full access sin restricciones RLS.

---

## 5. ÍNDICES Y PERFORMANCE

### 5.1 Índices por Tabla

**registrations:**
```sql
CREATE INDEX idx_registrations_codigo ON registrations(codigo_familia);  -- Lookup by code
CREATE INDEX idx_registrations_email ON registrations(migrant_email);    -- Login/auth
CREATE INDEX idx_registrations_status ON registrations(status);          -- Filter by status
CREATE INDEX idx_registrations_square ON registrations(square_customer_id);  -- Square sync
```

**family_members:**
```sql
CREATE INDEX idx_family_members_registration ON family_members(registration_id);  -- JOIN optimization
CREATE INDEX idx_family_members_active ON family_members(is_active) WHERE is_active = true;  -- Partial index
```

**savings_records:**
```sql
CREATE INDEX idx_savings_records_registration ON savings_records(registration_id);
CREATE INDEX idx_savings_records_month ON savings_records(month DESC);  -- Time-series queries
```

**service_usage:**
```sql
CREATE INDEX idx_service_usage_registration ON service_usage(registration_id);
CREATE INDEX idx_service_usage_member ON service_usage(family_member_id);
CREATE INDEX idx_service_usage_type ON service_usage(service_type);  -- Filter by type
CREATE INDEX idx_service_usage_date ON service_usage(used_at DESC);  -- Recent first
```

### 5.2 Query Optimization Tips

**✅ Good:**
```sql
-- Uses idx_registrations_codigo
SELECT * FROM registrations WHERE codigo_familia = 'SC-ABC123';

-- Uses idx_service_usage_date
SELECT * FROM service_usage WHERE used_at > '2026-01-01' ORDER BY used_at DESC LIMIT 10;
```

**❌ Bad (No index):**
```sql
-- Full table scan on migrant_name
SELECT * FROM registrations WHERE migrant_name LIKE '%Juan%';

-- Function call on indexed column
SELECT * FROM service_usage WHERE EXTRACT(YEAR FROM used_at) = 2026;
```

### 5.3 EXPLAIN ANALYZE Examples

```sql
-- Verificar query plan
EXPLAIN ANALYZE
SELECT r.migrant_name, SUM(su.amount_saved) as total_saved
FROM registrations r
JOIN service_usage su ON su.registration_id = r.id
WHERE r.status = 'active'
GROUP BY r.id;

-- Output esperado:
-- Index Scan using idx_registrations_status on registrations r
-- Hash Join on service_usage su
-- HashAggregate
```

---

## 6. TRIGGERS Y AUTOMATIZACIONES

### 6.1 `update_updated_at` Trigger

**Todas las tablas** tienen un trigger para auto-actualizar `updated_at`:

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_registrations_updated
    BEFORE UPDATE ON public.registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_family_members_updated
    BEFORE UPDATE ON public.family_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
-- etc...
```

### 6.2 `update_savings_on_service` Trigger

Al insertar en `service_usage`, automáticamente actualiza `savings_records`:

```sql
CREATE OR REPLACE FUNCTION update_savings_on_service()
RETURNS TRIGGER AS $$
DECLARE
    service_month TEXT;
BEGIN
    service_month := TO_CHAR(NEW.used_at, 'YYYY-MM');
    
    INSERT INTO savings_records (
        registration_id, 
        month,
        telemedicina_savings,
        farmacia_savings,
        terapia_savings,
        otros_savings
    )
    VALUES (
        NEW.registration_id,
        service_month,
        CASE WHEN NEW.service_type = 'telemedicina' THEN NEW.amount_saved ELSE 0 END,
        CASE WHEN NEW.service_type = 'farmacia' THEN NEW.amount_saved ELSE 0 END,
        CASE WHEN NEW.service_type = 'terapia' THEN NEW.amount_saved ELSE 0 END,
        CASE WHEN NEW.service_type NOT IN ('telemedicina', 'farmacia', 'terapia') THEN NEW.amount_saved ELSE 0 END
    )
    ON CONFLICT (registration_id, month)
    DO UPDATE SET
        telemedicina_savings = savings_records.telemedicina_savings + 
            CASE WHEN NEW.service_type = 'telemedicina' THEN NEW.amount_saved ELSE 0 END,
        farmacia_savings = savings_records.farmacia_savings + 
            CASE WHEN NEW.service_type = 'farmacia' THEN NEW.amount_saved ELSE 0 END,
        terapia_savings = savings_records.terapia_savings + 
            CASE WHEN NEW.service_type = 'terapia' THEN NEW.amount_saved ELSE 0 END,
        otros_savings = savings_records.otros_savings + 
            CASE WHEN NEW.service_type NOT IN ('telemedicina', 'farmacia', 'terapia') THEN NEW.amount_saved ELSE 0 END,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_savings
    AFTER INSERT ON service_usage
    FOR EACH ROW
    EXECUTE FUNCTION update_savings_on_service();
```

**Flow:**
1. Usuario usa farmacia, ahorra $50
2. `INSERT INTO service_usage (service_type='farmacia', amount_saved=50, used_at='2026-01-15')`
3. Trigger detecta insert
4. Extrae mes: `'2026-01'`
5. `UPSERT` en `savings_records`: Si no existe el mes, crea registro; si existe, suma $50 a `farmacia_savings`
6. `total_savings` se recalcula automáticamente (generated column)

---

## 7. VIEWS Y REPORTES

### 7.1 `v_user_savings` - Vista de Ahorros Agregados

```sql
CREATE OR REPLACE VIEW public.v_user_savings AS
SELECT 
    r.id as registration_id,
    r.codigo_familia,
    r.migrant_name,
    r.migrant_email,
    COUNT(DISTINCT sr.month) as months_active,
    SUM(sr.telemedicina_savings) as total_telemedicina,
    SUM(sr.farmacia_savings) as total_farmacia,
    SUM(sr.terapia_savings) as total_terapia,
    SUM(sr.otros_savings) as total_otros,
    SUM(sr.total_savings) as lifetime_savings,
    AVG(sr.total_savings) as avg_monthly_savings,
    MAX(sr.month) as last_active_month
FROM public.registrations r
LEFT JOIN public.savings_records sr ON sr.registration_id = r.id
WHERE r.status = 'active'
GROUP BY r.id;

-- Query example
SELECT * FROM v_user_savings WHERE lifetime_savings > 100 ORDER BY lifetime_savings DESC;
```

### 7.2 `v_active_families` - Vista de Familias Activas

```sql
CREATE OR REPLACE VIEW public.v_active_families AS
SELECT 
    r.id,
    r.codigo_familia,
    r.migrant_name,
    r.migrant_email,
    r.plan_name,
    r.activated_at,
    COUNT(fm.id) as total_members,
    COUNT(CASE WHEN fm.is_principal THEN 1 END) as principal_count,
    ARRAY_AGG(fm.name) as member_names
FROM public.registrations r
LEFT JOIN public.family_members fm ON fm.registration_id = r.id AND fm.is_active = true
WHERE r.status = 'active'
GROUP BY r.id;
```

### 7.3 `v_service_analytics` - Analytics de Servicios

```sql
CREATE OR REPLACE VIEW public.v_service_analytics AS
SELECT 
    DATE_TRUNC('month', su.used_at) as month,
    su.service_type,
    COUNT(*) as usage_count,
    SUM(su.amount_paid) as total_revenue,
    SUM(su.amount_saved) as total_savings,
    AVG(su.amount_saved) as avg_savings_per_service
FROM public.service_usage su
JOIN public.registrations r ON r.id = su.registration_id
WHERE r.status = 'active'
GROUP BY DATE_TRUNC('month', su.used_at), su.service_type
ORDER BY month DESC, usage_count DESC;
```

---

## 8. MIGRACIONES SQL

### 8.1 Estructura de Migraciones

Ubicación: `/supabase/migrations/`

**Naming Convention:**
```
YYYYMMDD_HHMMSS_descriptive_name.sql
```

**Migraciones Aplicadas (en orden):**

1. `create_registrations_table.sql` - Tabla core inicial
2. `add_payment_fields_to_registrations.sql` - Campos de Square
3. `create_beneficiaries_table.sql` - Tabla de beneficiarios (legacy, reemplazada por family_members)
4. `create_family_members_table.sql` - Nueva estructura de miembros
5. `create_savings_records_table.sql` - Tracking de ahorros
6. `create_service_usage_table.sql` - Registro de servicios
7. `create_behavioral_codes_table.sql` - AI companion behavior tracking
8. `create_ai_companions_table.sql` - Lupita y Fernanda data
9. `create_medical_history_table.sql` - Historial médico (opcional)
10. `create_subscriptions_table.sql` - Suscripciones (redundante con registrations)

### 8.2 Ejecutar Migraciones

**Supabase CLI:**
```bash
# Aplicar todas las migraciones pendientes
supabase db push

# Crear nueva migración
supabase migration new add_new_column

# Reset database (CUIDADO: Elimina todos los datos)
supabase db reset
```

**SQL Direct:**
```bash
psql $DATABASE_URL -f supabase/migrations/YYYYMMDD_HHMMSS_migration.sql
```

### 8.3 Rollback Strategy

Supabase no tiene rollback automático. Para revertir:

1. Crear migración inversa:
```sql
-- Si agregaste columna:
ALTER TABLE registrations DROP COLUMN new_column;

-- Si creaste tabla:
DROP TABLE IF EXISTS new_table CASCADE;
```

2. Aplicar migración de rollback

**Best Practice:** Siempre probar en staging antes de producción.

---

## 9. TYPESCRIPT INTEGRATION

### 9.1 Type Generation

Los tipos TypeScript en `/src/lib/supabase.ts` fueron **generados manualmente** basados en el schema SQL.

**Future:** Usar Supabase CLI para auto-generación:
```bash
supabase gen types typescript --project-id $PROJECT_ID > src/lib/database.types.ts
```

### 9.2 Client Configuration

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

let supabaseClient: any = null;

export function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  // Service role client - bypasses RLS
  supabaseClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return supabaseClient;
}
```

### 9.3 CRUD Functions

**Create:**
```typescript
export async function createRegistration(data: RegistrationInsert): Promise<Registration> {
  const supabase = getSupabaseClient();
  
  const { data: registration, error } = await supabase
    .from('registrations')
    .insert(data)
    .select()
    .single();

  if (error) {
    console.error('Error creating registration:', error);
    throw new Error(`Failed to create registration: ${error.message}`);
  }

  return registration;
}
```

**Read:**
```typescript
export async function getRegistrationByCode(codigoFamilia: string): Promise<Registration | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('registrations')
    .select()
    .eq('codigo_familia', codigoFamilia)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;  // Not found
    console.error('Error fetching registration:', error);
    throw new Error(`Failed to fetch registration: ${error.message}`);
  }

  return data;
}
```

**Update:**
```typescript
export async function updateUserByAccessCode(
  codigoFamilia: string, 
  updates: RegistrationUpdate
): Promise<Registration> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('registrations')
    .update(updates)
    .eq('codigo_familia', codigoFamilia)
    .select()
    .single();

  if (error) {
    console.error('Error updating registration:', error);
    throw new Error(`Failed to update registration: ${error.message}`);
  }

  return data;
}
```

**Delete (soft):**
```typescript
// No eliminamos, solo desactivamos
export async function cancelRegistration(codigoFamilia: string): Promise<Registration> {
  return updateUserByAccessCode(codigoFamilia, {
    status: 'cancelled',
    cancelled_at: new Date().toISOString()
  });
}
```

### 9.4 Utility Functions

**Código Familia Generator:**
```typescript
export function generateCodigoFamilia(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';  // Sin O, I, 0, 1 para evitar confusión
  let code = 'SC-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;  // Ejemplo: "SC-A3B7K2"
}
```

**Registration ID Generator:**
```typescript
export function generateRegistrationId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${timestamp}${random.toString().padStart(4, '0')}`;
  // Ejemplo: "1706342400001234"
}
```

---

## 10. QUERIES DE EJEMPLO

### 10.1 Reportes de Negocio

**Total de Usuarios Activos:**
```sql
SELECT 
    status, 
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM registrations
GROUP BY status
ORDER BY count DESC;
```

**Revenue Mensual (MRR):**
```sql
SELECT 
    DATE_TRUNC('month', activated_at) as month,
    COUNT(*) as new_subscribers,
    SUM(plan_price) as new_mrr,
    SUM(SUM(plan_price)) OVER (ORDER BY DATE_TRUNC('month', activated_at)) as cumulative_mrr
FROM registrations
WHERE status IN ('active', 'paused')
GROUP BY DATE_TRUNC('month', activated_at)
ORDER BY month;
```

**Churn Rate:**
```sql
WITH monthly_stats AS (
    SELECT 
        DATE_TRUNC('month', cancelled_at) as month,
        COUNT(*) as cancelled_count
    FROM registrations
    WHERE status = 'cancelled' AND cancelled_at IS NOT NULL
    GROUP BY DATE_TRUNC('month', cancelled_at)
),
active_stats AS (
    SELECT 
        DATE_TRUNC('month', CURRENT_DATE) as month,
        COUNT(*) as active_count
    FROM registrations
    WHERE status = 'active'
)
SELECT 
    ms.month,
    ms.cancelled_count,
    acs.active_count,
    ROUND(ms.cancelled_count * 100.0 / NULLIF(acs.active_count, 0), 2) as churn_rate_percentage
FROM monthly_stats ms
CROSS JOIN active_stats acs
ORDER BY ms.month DESC;
```

### 10.2 Analytics de Servicios

**Servicios Más Usados:**
```sql
SELECT 
    service_type,
    COUNT(*) as usage_count,
    SUM(amount_saved) as total_savings,
    ROUND(AVG(amount_saved), 2) as avg_savings,
    COUNT(DISTINCT registration_id) as unique_users
FROM service_usage
WHERE used_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY service_type
ORDER BY usage_count DESC;
```

**Top 10 Usuarios por Savings:**
```sql
SELECT 
    r.codigo_familia,
    r.migrant_name,
    r.migrant_email,
    COUNT(su.id) as services_used,
    SUM(su.amount_saved) as total_saved,
    ROUND(SUM(su.amount_saved) / NULLIF(COUNT(su.id), 0), 2) as avg_per_service
FROM registrations r
JOIN service_usage su ON su.registration_id = r.id
WHERE r.status = 'active'
GROUP BY r.id
ORDER BY total_saved DESC
LIMIT 10;
```

### 10.3 Family Member Analytics

**Distribución de Miembros por Familia:**
```sql
SELECT 
    member_count,
    COUNT(*) as family_count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM (
    SELECT 
        registration_id,
        COUNT(*) as member_count
    FROM family_members
    WHERE is_active = true
    GROUP BY registration_id
) member_counts
GROUP BY member_count
ORDER BY member_count;
```

**Relaciones Más Comunes:**
```sql
SELECT 
    relationship,
    COUNT(*) as count,
    COUNT(DISTINCT registration_id) as unique_families
FROM family_members
WHERE is_active = true AND is_principal = false
GROUP BY relationship
ORDER BY count DESC;
```

### 10.4 Performance Queries

**Usuarios Sin Actividad (Churn Risk):**
```sql
SELECT 
    r.codigo_familia,
    r.migrant_name,
    r.migrant_email,
    r.activated_at,
    MAX(su.used_at) as last_service_used,
    EXTRACT(DAY FROM CURRENT_TIMESTAMP - MAX(su.used_at)) as days_inactive
FROM registrations r
LEFT JOIN service_usage su ON su.registration_id = r.id
WHERE r.status = 'active'
GROUP BY r.id
HAVING MAX(su.used_at) < CURRENT_DATE - INTERVAL '60 days' OR MAX(su.used_at) IS NULL
ORDER BY days_inactive DESC NULLS FIRST;
```

**Health Check - Datos Inconsistentes:**
```sql
-- Registrations sin family members
SELECT 'Registrations without family members' as issue, COUNT(*) as count
FROM registrations r
LEFT JOIN family_members fm ON fm.registration_id = r.id AND fm.is_active = true
WHERE r.status = 'active' AND fm.id IS NULL

UNION ALL

-- Family members sin principal
SELECT 'Families without principal member' as issue, COUNT(DISTINCT registration_id)
FROM family_members
WHERE is_active = true
AND registration_id NOT IN (
    SELECT registration_id FROM family_members WHERE is_principal = true AND is_active = true
)

UNION ALL

-- Registrations activos sin pagos en Square
SELECT 'Active registrations without Square IDs' as issue, COUNT(*)
FROM registrations
WHERE status = 'active' AND (square_customer_id IS NULL OR square_subscription_id IS NULL);
```

---

## 🔐 SEGURIDAD Y BEST PRACTICES

### Credenciales

**Environment Variables Requeridas:**
```env
SUPABASE_URL=https://xxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **NUNCA** commitear las keys reales a Git.

### Backup Strategy

**Automated Backups (Supabase):**
- Daily backups automáticos en Supabase Pro plan
- Retention: 7 días
- Recovery: Via Supabase Dashboard

**Manual Backup:**
```bash
# Export completo
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Backup de tabla específica
pg_dump $DATABASE_URL -t registrations > registrations_backup.sql
```

### Monitoring

**Queries Lentos (> 1s):**
```sql
SELECT 
    query,
    mean_exec_time,
    calls,
    total_exec_time
FROM pg_stat_statements
WHERE mean_exec_time > 1000  -- ms
ORDER BY mean_exec_time DESC
LIMIT 10;
```

**Table Sizes:**
```sql
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## 📝 CHANGELOG

### v1.4.2 (2026-01-27)
- ✅ Agregadas funciones `saveDependents` y `getDependentsByAccessCode`
- ✅ Completada documentación técnica

### v1.4.1 (2026-01-26)
- ✅ Arreglado error de exports faltantes en supabase.ts
- ✅ Agregadas funciones alias para compatibilidad

### v1.4.0 (2026-01-15)
- ✅ Migración de `beneficiaries` a `family_members`
- ✅ Implementado sistema de triggers para savings automation
- ✅ Agregados índices de performance

### v1.3.0 (2026-01-10)
- ✅ Integración con Square Payment
- ✅ Agregados campos de pago a registrations

### v1.2.0 (2026-01-05)
- ✅ Creación de tablas savings_records y service_usage
- ✅ Implementación de RLS policies

### v1.1.0 (2026-01-01)
- ✅ Tabla registrations inicial
- ✅ Estructura TypeScript types

---

## 🚀 PRÓXIMOS PASOS RECOMENDADOS

1. **Performance:**
   - [ ] Implementar materialized views para dashboards
   - [ ] Agregar índices BRIN para timestamps (si data > 1M rows)
   - [ ] Configurar pg_stat_statements para query monitoring

2. **Features:**
   - [ ] Tabla de notificaciones (emails/SMS tracking)
   - [ ] Tabla de audit_log para compliance
   - [ ] Tabla de referrals para programa de referidos

3. **Seguridad:**
   - [ ] Implementar RLS más granular por rol
   - [ ] Agregar encryption a campos sensibles (last_name, phone)
   - [ ] Configurar backup automático a S3

4. **DevOps:**
   - [ ] CI/CD para migraciones automáticas
   - [ ] Staging environment separado
   - [ ] Load testing con k6

---

## 📚 RECURSOS ADICIONALES

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Naming Conventions](https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Performance Tuning](https://wiki.postgresql.org/wiki/Performance_Optimization)

---

**Generado por:** GitHub Copilot AI  
**Fecha:** 27 de Enero, 2026  
**Versión del Reporte:** 1.0.0  
**Contacto Técnico:** IT Development Team

---
