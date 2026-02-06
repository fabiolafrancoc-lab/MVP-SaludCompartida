# 🔗 DASHBOARD ↔ SUPABASE - MAPEO COMPLETO

**Fecha:** 3 febrero 2026  
**Revisión:** Claude + Fabiola  
**Estado:** ✅ VALIDADO

---

## 📊 TABLA SUPABASE: `registrations`

### Campos Relevantes Dashboard

```sql
-- CÓDIGOS DE ACCESO (para login)
migrant_code TEXT NOT NULL UNIQUE    -- Código migrante (ej: "M2025ABC")
family_code TEXT NOT NULL UNIQUE     -- Código familia (ej: "A3B7K9")

-- INFORMACIÓN MIGRANTE (USA)
migrant_first_name TEXT NOT NULL     -- Nombre migrante
migrant_last_name TEXT NOT NULL      -- Apellido paterno
migrant_mother_last_name TEXT        -- Apellido materno
migrant_email TEXT NOT NULL          -- Email migrante
migrant_phone TEXT NOT NULL          -- Teléfono USA formato: (305) 522-7150
migrant_sex TEXT                     -- M/F
migrant_birthdate DATE               -- Fecha nacimiento

-- INFORMACIÓN FAMILIA (MÉXICO)
family_first_name TEXT NOT NULL      -- Nombre titular familia
family_last_name TEXT NOT NULL       -- Apellido paterno
family_mother_last_name TEXT         -- Apellido materno
family_primary_email TEXT NOT NULL   -- Email familia México
family_phone TEXT NOT NULL           -- Teléfono MX formato: 55 1234 5678
family_sex TEXT                      -- M/F
family_birthdate DATE                -- Fecha nacimiento

-- SUSCRIPCIÓN
subscription_status TEXT             -- 'ACTIVE', 'CANCELED', 'PAUSED'
square_subscription_id TEXT          -- ID suscripción Square
created_at TIMESTAMP WITH TIME ZONE  -- Fecha registro
```

---

## 🎯 FLUJO DE AUTENTICACIÓN DASHBOARD

### 1. Usuario Ingresa Código

```typescript
// En /dashboard page
const code = userInput.trim().toUpperCase(); // Ej: "M2025ABC" o "A3B7K9"

// Query Supabase
const { data, error } = await supabase
  .from('registrations')
  .select('*')
  .or(`migrant_code.eq.${code},family_code.eq.${code}`)
  .eq('subscription_status', 'ACTIVE')
  .single();

if (!data) {
  // Código inválido o suscripción no activa
  showError('Código no encontrado o suscripción inactiva');
  return;
}

// Determinar userType automáticamente
let userType: 'migrant' | 'mexico';
if (data.migrant_code === code) {
  userType = 'migrant';
} else if (data.family_code === code) {
  userType = 'mexico';
} else {
  showError('Código inválido');
  return;
}

// Guardar en estado/sesión
const session = {
  registrationId: data.id,
  userType: userType,
  userName: userType === 'migrant' ? data.migrant_first_name : data.family_first_name,
  userEmail: userType === 'migrant' ? data.migrant_email : data.family_primary_email,
  userPhone: userType === 'migrant' ? data.migrant_phone : data.family_phone,
  migrantName: data.migrant_first_name,  // Para personalización
  familyName: data.family_first_name     // Para personalización
};
```

### 2. Routing Automático

```typescript
// NO SELECTOR SCREEN - código define todo automáticamente
if (userType === 'migrant') {
  // Dashboard USA - mensajes: "tu familia en México", WhatsApp +1
} else {
  // Dashboard México - mensajes: "para ti y tu familia", WhatsApp +52
}
```

---

## 🧩 COMPONENTES Y DATOS SUPABASE

### **QuienesSomos.jsx**

**Props:** `{ userType: 'migrant' | 'mexico' }`  
**Datos Supabase:** ❌ No requiere  
**Función:** Solo diferencia copy según userType

```jsx
// userType = 'migrant' → "Nacimos para que puedas cuidarlos aunque estés lejos"
// userType = 'mexico' → "Salud accesible para ti y tu familia"
```

---

### **Terapia.jsx**

**Props:** `{ userType: 'migrant' | 'mexico' }`  
**Datos Supabase:** ✅ Requiere para booking

```typescript
// Para agendar terapia
const registration = {
  id: session.registrationId,
  migrant_first_name: session.migrantName,
  family_first_name: session.familyName,
  migrant_phone: userType === 'migrant' ? session.userPhone : null,
  family_phone: userType === 'mexico' ? session.userPhone : null
};

// Mensaje WhatsApp booking
const bookingMessage = userType === 'migrant'
  ? `Hola, soy ${session.userName} (código: ${data.migrant_code}). Quiero agendar terapia.`
  : `Hola, soy ${session.userName} (código: ${data.family_code}). Quiero agendar terapia.`;
```

---

### **MiCuenta.jsx**

**Props:** `{ userType: 'migrant' | 'mexico', registration: RegistrationData }`  
**Datos Supabase:** ✅ CRÍTICO - Requiere todos los campos

```typescript
interface RegistrationData {
  // Campos display
  id: number;
  migrant_code: string;
  family_code: string;
  
  // Datos titular (quien ingresó)
  userName: string;            // migrant_first_name o family_first_name
  userEmail: string;           // migrant_email o family_primary_email
  userPhone: string;           // migrant_phone o family_phone
  
  // Datos adicionales para contexto
  migrantName: string;         // migrant_first_name
  familyName: string;          // family_first_name
  
  // Miembros familia (FUTURO)
  // member_1_name?: string;
  // member_1_relation?: string;
  // member_2_name?: string;
  // member_2_relation?: string;
  // member_3_name?: string;
  // member_3_relation?: string;
  
  // Suscripción
  subscription_status: string;  // 'ACTIVE'
  created_at: string;           // Fecha registro
}

// Componente muestra:
{
  titular: {
    name: userType === 'migrant' ? data.migrant_first_name : data.family_first_name,
    phone: userType === 'migrant' ? data.migrant_phone : data.family_phone,
    email: userType === 'migrant' ? data.migrant_email : data.family_primary_email,
  },
  plan: 'SaludCompartida Familiar',
  status: data.subscription_status === 'ACTIVE' ? 'Activo' : 'Inactivo',
  nextBilling: '15 febrero 2026' // TODO: Calcular desde created_at + 1 mes
}
```

---

### **Contactanos.jsx**

**Props:** `{ userType: 'migrant' | 'mexico', registration: RegistrationData }`  
**Datos Supabase:** ✅ Requiere para pre-rellenar formulario

```typescript
// Pre-rellenar formulario contacto
const contactForm = {
  name: userType === 'migrant' ? data.migrant_first_name : data.family_first_name,
  email: userType === 'migrant' ? data.migrant_email : data.family_primary_email,
  phone: userType === 'migrant' ? data.migrant_phone : data.family_phone,
  category: '', // 8 opciones dropdown
  message: ''
};

// WhatsApp directo soporte
const supportPhone = userType === 'migrant' ? '+13055227150' : '+525512345678';
const supportMessage = `Hola, soy ${data.migrant_first_name || data.family_first_name}, código ${userType === 'migrant' ? data.migrant_code : data.family_code}. Necesito ayuda.`;
```

---

### **TerminosPrivacidad.jsx**

**Props:** ❌ Ninguno  
**Datos Supabase:** ❌ No requiere  
**Función:** Solo muestra legal estático

---

## 🔐 QUERY PRINCIPAL DASHBOARD

### GET Registration Data

```typescript
// En /dashboard page.tsx después de validar código
const { data: registration, error } = await supabase
  .from('registrations')
  .select(`
    id,
    migrant_code,
    family_code,
    migrant_first_name,
    migrant_last_name,
    migrant_mother_last_name,
    migrant_email,
    migrant_phone,
    migrant_sex,
    migrant_birthdate,
    family_first_name,
    family_last_name,
    family_mother_last_name,
    family_primary_email,
    family_phone,
    family_sex,
    family_birthdate,
    subscription_status,
    square_subscription_id,
    created_at
  `)
  .eq('id', registrationId)
  .single();

if (error || !registration) {
  console.error('Error cargando datos:', error);
  router.push('/'); // Redirect a home
  return;
}

// Pasar a componentes
<QuienesSomos userType={userType} />
<Terapia userType={userType} registration={registration} />
<MiCuenta userType={userType} registration={registration} />
<Contactanos userType={userType} registration={registration} />
<TerminosPrivacidad />
```

---

## ✅ VALIDACIONES CRÍTICAS

### 1. Código debe existir y estar activo

```typescript
if (!data || data.subscription_status !== 'ACTIVE') {
  return { error: 'Código inválido o suscripción no activa' };
}
```

### 2. userType se determina automáticamente

```typescript
// SI ingresa migrant_code → userType = 'migrant'
// SI ingresa family_code → userType = 'mexico'
// NO hay selector manual
```

### 3. Nombres SIEMPRE requeridos

```typescript
// Dashboard necesita MÍNIMO:
- migrant_first_name (para personalización)
- family_first_name (para personalización)
- Email correspondiente (migrant_email o family_primary_email)
- Phone correspondiente (migrant_phone o family_phone)
```

### 4. Campos opcionales en tabla pero REQUERIDOS en landing

```typescript
// Estos campos son NOT NULL en tabla registrations:
✅ migrant_code
✅ family_code
✅ migrant_first_name
✅ migrant_last_name
✅ migrant_email
✅ migrant_phone
✅ family_first_name
✅ family_last_name
✅ family_primary_email
✅ family_phone

// Landing-jan page.tsx YA mapea correctamente estos campos
```

---

## 🚦 ESTADOS SUBSCRIPTION

```typescript
type SubscriptionStatus = 
  | 'ACTIVE'      // ✅ Puede acceder dashboard
  | 'CANCELED'    // ❌ Bloqueado
  | 'PAUSED'      // ❌ Bloqueado
  | 'PENDING'     // ❌ Pago no procesado aún
  | null;         // ❌ Sin suscripción
```

---

## 📝 RESUMEN INTEGRACIÓN

| Componente | Requiere Supabase | Campos Necesarios |
|------------|-------------------|-------------------|
| **Dashboard Main** | ✅ Sí (validar código) | `migrant_code`, `family_code`, `subscription_status` |
| **QuienesSomos** | ❌ No | Solo `userType` (prop) |
| **Terapia** | ✅ Sí (booking) | `migrant_first_name`, `family_first_name`, `migrant_phone`, `family_phone` |
| **MiCuenta** | ✅ Sí (display data) | TODOS los campos personales + suscripción |
| **Contactanos** | ✅ Sí (pre-rellenar) | `migrant_first_name`, `family_first_name`, emails, phones |
| **TerminosPrivacidad** | ❌ No | Ninguno (estático) |

---

## 🔥 CAMPOS FALTANTES (FUTURO)

**Para agregar después del MVP:**

```sql
-- Miembros adicionales familia
ALTER TABLE registrations ADD COLUMN member_1_name TEXT;
ALTER TABLE registrations ADD COLUMN member_1_relation TEXT; -- ej: "Hijo"
ALTER TABLE registrations ADD COLUMN member_1_birthdate DATE;
ALTER TABLE registrations ADD COLUMN member_2_name TEXT;
ALTER TABLE registrations ADD COLUMN member_2_relation TEXT;
ALTER TABLE registrations ADD COLUMN member_2_birthdate DATE;
ALTER TABLE registrations ADD COLUMN member_3_name TEXT;
ALTER TABLE registrations ADD COLUMN member_3_relation TEXT;
ALTER TABLE registrations ADD COLUMN member_3_birthdate DATE;

-- Billing info
ALTER TABLE registrations ADD COLUMN next_billing_date DATE;
ALTER TABLE registrations ADD COLUMN billing_amount DECIMAL(10,2);
```

**Mientras tanto:**
- Miembros en MiCuenta.jsx serán campos editables (sin persistencia inicial)
- Next billing date se calcula: `created_at + 1 mes`

---

## ✅ CONCLUSIÓN

**Todo el código de Claude ya está alineado con Supabase:**

1. ✅ Landing pages (`landing-jan/`, `registro-jan/`) usan nombres EXACTOS de Supabase
2. ✅ Email templates (`email-templates.ts`) mapean correctamente
3. ✅ Square payment flow (`square-payment/route.ts`) guarda en registrations
4. ✅ Webhook post-pago (`send-notifications/route.ts`) lee de registrations

**Lo único que falta es el Dashboard principal que:**
- Lee código ingresado
- Query a `registrations` con ese código
- Detecta `userType` automático
- Pasa datos a componentes

**SIGUIENTE PASO:** Crear `/src/app/dashboard/page.tsx` con query y routing.

---

**Validado por:** Fabiola Franco  
**Aprobado para desarrollo:** ✅ SÍ
