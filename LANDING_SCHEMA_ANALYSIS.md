# 🚨 ANÁLISIS CRÍTICO - LANDING PAGES & SUPABASE SCHEMA MISMATCH

**Status:** PRE-LANZAMIENTO (Mañana mediodía)  
**Fecha:** 28 enero 2026  
**Prioridad:** CRÍTICA

---

## ⚠️ PROBLEMA PRINCIPAL: MÚLTIPLES LANDING PAGES ACTIVAS

### Landing Pages actuales en producción:

```
1. /src/app/page.jsx                              ← Ruta principal "/"
2. /src/home.jsx                                  ← Ruta "/home" (sistema viejo)
3. /src/views/LandingBubblesSimple.jsx           ← Rutas "/instagram" y "/facebook"
4. /src/views/LandingBubblesTikTok.jsx           ← Ruta "/tiktok"
5. /src/views/LandingBubbles.jsx                 ← SIN RUTA (archivo huérfano)
6. /Downloads/Page1_Landing.jsx                  ← ARCHIVO DE CLAUDE (no integrado)
```

### Estado actual en `ClientRouter.tsx`:

```tsx
<Route path="/" element={<Home />} />                            // home.jsx
<Route path="/home" element={<Home />} />                        // home.jsx
<Route path="/instagram" element={<LandingBubblesSimple />} />
<Route path="/facebook" element={<LandingBubblesSimple />} />
<Route path="/tiktok" element={<LandingBubblesTikTok />} />
```

**PROBLEMA:** Tienes 6 versiones de landing page. Claude va a enviar una 7ª.

---

## 🔴 CAMPOS DE FORMULARIO: DESACOPLE CRÍTICO

### Lo que Claude va a enviar (Page1_Landing.jsx):

```jsx
{
  firstName: '',        // ❌ NO existe en Supabase
  lastName: '',         // ❌ NO existe en Supabase
  email: '',           // ❌ NO existe en Supabase
  phone: '',           // ❌ NO existe en Supabase
  countryCode: '+1'    // ❌ NO existe en Supabase
}
```

### Lo que Supabase `registrations` REALMENTE tiene:

```typescript
interface Registration {
  // MIGRANTE (USA)
  migrant_name: string;              // ✅ Nombre completo migrante
  migrant_email: string;             // ✅ Email migrante
  migrant_phone: string;             // ✅ Teléfono migrante
  migrant_state: string;             // ✅ Estado USA
  
  // FAMILIA (MÉXICO)
  principal_name: string;            // ✅ Nombre beneficiario principal
  principal_phone: string;           // ✅ Teléfono México
  principal_relationship: string;    // ✅ Relación (madre, hermana, etc)
  
  // PLAN Y PAGOS
  plan_id: string;                   // ✅ 'basico' o 'premium'
  plan_name: string;                 // ✅ 'Plan Básico' o 'Plan Premium'
  plan_price: number;                // ✅ 12.00 o 18.00
  
  // SQUARE
  square_customer_id: string | null;
  square_subscription_id: string | null;
  square_payment_id: string | null;
  
  // STATUS
  status: 'pending' | 'active' | 'cancelled' | 'expired' | 'paused';
  codigo_familia: string;            // ✅ Código de 6 dígitos alfanuméricos
}
```

### Tabla `family_members` (hasta 4 beneficiarios):

```typescript
interface FamilyMember {
  registration_id: number;           // FK a registrations
  name: string;
  last_name: string | null;
  birth_date: string | null;
  phone: string | null;
  relationship: string;              // madre, padre, hijo, hermana, etc.
  is_principal: boolean;             // true para el contacto principal
  is_active: boolean;
}
```

---

## 🎯 FLUJO ARQUITECTÓNICO CORRECTO (Según MVP v3.0)

### FASE 1: Landing & Conversion (Page 1 - Claude)

**Objetivo:** Capturar lead inicial con mínima fricción

```
CAMPOS MÍNIMOS:
- firstName (migrante USA)
- lastName (migrante USA)  
- email (migrante USA)
- phone (migrante USA con +1)
```

**Acción:** Guardar en `localStorage` o `pre_checkout` table → Navegar a `/registro`

---

### FASE 2: Registro Completo (Page 2 - Actual Registro.jsx)

**Objetivo:** Completar datos de migrante + familia + plan

```
DATOS MIGRANTE (USA):
- Nombre completo
- Email
- Teléfono (+1)
- Estado USA

DATOS FAMILIA (MÉXICO):
- Nombre beneficiario principal
- Teléfono México
- Relación (madre, hermana, hijo, etc.)
- Opcional: hasta 3 beneficiarios más

SELECCIÓN PLAN:
- Plan Básico ($12/mes)
- Plan Premium ($18/mes)
```

**Acción:** Guardar todo en `localStorage` → Navegar a `/pago`

---

### FASE 3: Pago (Page 3 - Actual Pago.jsx)

**Objetivo:** Procesar pago con Square + crear registro en Supabase

```
1. Square Checkout → square_customer_id + square_subscription_id
2. Insert en registrations (todos los campos)
3. Insert en family_members (4 beneficiarios max)
4. Generar codigo_familia (6 char alfanumérico)
5. Trigger automático: Email + WhatsApp con códigos
```

**Acción:** Navegar a `/confirmacion`

---

### FASE 4: Confirmación (Page 4 - Actual Confirmacion.jsx)

**Objetivo:** Mostrar código de familia + instrucciones de activación

```
- Código de 6 dígitos
- Instrucciones para familia en México
- Links de activación WhatsApp
```

---

## 🔧 SOLUCIÓN: ADAPTADOR DE CAMPOS

### Crear: `/src/lib/field-mapper.ts`

```typescript
/**
 * Mapea campos de landing (Claude) a schema de Supabase
 */
export function mapLandingToRegistration(landingData: any) {
  return {
    // Campos mínimos para pre-checkout
    migrant_name: `${landingData.firstName} ${landingData.lastName}`,
    migrant_email: landingData.email,
    migrant_phone: landingData.countryCode + landingData.phone,
    migrant_state: '', // Se completa en paso 2
    
    // Campos que se llenan después
    principal_name: '',
    principal_phone: '',
    principal_relationship: '',
    
    // Defaults
    plan_id: 'basico',
    plan_name: 'Plan Básico',
    plan_price: 12.00,
    status: 'pending',
    codigo_familia: generateFamilyCode(),
  };
}

function generateFamilyCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
```

---

## 📋 PLAN DE ACCIÓN ANTES DEL LANZAMIENTO

### ✅ PASO 1: Decidir Landing Principal

**Opción A: Nueva landing de Claude (recomendado)**
```bash
1. Integrar /Downloads/Page1_Landing.jsx → /src/app/page.jsx
2. Backup landing actual: mv page.jsx page-backup-jan28.jsx
3. Actualizar ruta "/" en ClientRouter
```

**Opción B: Mantener actual**
```bash
1. Usar /src/app/page.jsx actual
2. Archivo de Claude → /src/app/landing-nueva/page.jsx
3. Testear en /landing-nueva antes de cambiar
```

**MI RECOMENDACIÓN:** Opción B primero. Lanzas con lo que tienes, pruebas la nueva en paralelo.

---

### ✅ PASO 2: Crear Pre-Checkout Table (si no existe)

```sql
CREATE TABLE IF NOT EXISTS pre_checkout (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country_code TEXT DEFAULT '+1',
  traffic_source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  converted BOOLEAN DEFAULT FALSE,
  registration_id BIGINT REFERENCES registrations(id)
);
```

**Propósito:** Capturar leads de Page 1 sin perderlos si abandonan en Page 2.

---

### ✅ PASO 3: Actualizar Page1_Landing.jsx

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // 1. Guardar en pre_checkout (lead capture)
    await fetch('/api/pre-checkout', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    
    // 2. Guardar en localStorage para Page 2
    localStorage.setItem('leadData', JSON.stringify(formData));
    
    // 3. Navegar a registro completo
    navigate('/registro');
    
  } catch (err) {
    console.error('Error:', err);
  }
};
```

---

### ✅ PASO 4: Actualizar Registro.jsx (Page 2)

```jsx
useEffect(() => {
  // Recuperar datos de Page 1
  const leadData = localStorage.getItem('leadData');
  if (leadData) {
    const { firstName, lastName, email, phone } = JSON.parse(leadData);
    
    // Pre-llenar campos de migrante
    setMigrantFirstName(firstName);
    setMigrantLastName(lastName);
    setMigrantEmail(email);
    setMigrantPhone(phone);
  }
}, []);
```

---

### ✅ PASO 5: Eliminar Landing Pages Obsoletas

**DESPUÉS del lanzamiento (no toques nada antes):**

```bash
# Landing Bubbles huérfana (sin ruta)
rm src/views/LandingBubbles.jsx

# Backups viejos
rm src/app/page-old-backup.jsx
rm src/app/page-backup-before-major-changes.jsx
rm src/app/page-old-white.jsx

# Sistema viejo (si ya no se usa)
rm src/home.jsx
```

---

### ✅ PASO 6: Consolidar Rutas en ClientRouter

```tsx
// MANTENER ESTAS (campañas pagadas activas)
<Route path="/instagram" element={<LandingBubblesSimple />} />
<Route path="/facebook" element={<LandingBubblesSimple />} />
<Route path="/tiktok" element={<LandingBubblesTikTok />} />

// LANDING PRINCIPAL
<Route path="/" element={<NewLanding />} />  // Nueva de Claude

// ELIMINAR ESTAS (duplicados)
// <Route path="/home" element={<Home />} />  ← Ya no se usa
```

---

## 🚨 ADVERTENCIAS CRÍTICAS

### 1. NO elimines LandingBubbles (Instagram/Facebook/TikTok) antes del lanzamiento

**Motivo:** Si tienes campañas pagadas corriendo, romperías el flujo de conversión.

**Acción:** Verifica en Meta Ads Manager qué URLs están activas.

---

### 2. NO cambies la ruta "/" sin backup

**Motivo:** Es tu landing principal. Si algo falla, pierdes TODO el tráfico.

**Acción:** 
```bash
# Backup antes de cambiar
cp src/app/page.jsx src/app/page-backup-pre-launch.jsx
```

---

### 3. Claude va a usar nombres de campos diferentes

**Motivo:** Claude no conoce tu schema de Supabase.

**Acción:** Usar `field-mapper.ts` para traducir campos.

---

## 📊 CHECKLIST FINAL

```
[ ] Backup de landing actual (page.jsx → page-backup-jan28.jsx)
[ ] Crear pre_checkout table en Supabase
[ ] Crear /src/lib/field-mapper.ts
[ ] Integrar Page1_Landing.jsx de Claude
[ ] Testear flujo completo: Landing → Registro → Pago → Confirmación
[ ] Verificar que datos lleguen correctamente a Supabase
[ ] Probar generación de codigo_familia (6 char alfanumérico)
[ ] Verificar que emails se envíen (Resend)
[ ] Verificar que WhatsApp se envíe (Business API)
[ ] Monitorear errores en Sentry
```

---

## 🎯 MI RECOMENDACIÓN FINAL

### PARA MAÑANA:

1. **NO integres la nueva landing de Claude aún**
2. **Lanza con lo que tienes funcionando**
3. **Pon la landing de Claude en /landing-nueva** para testear
4. **En 2-3 días, cuando veas que todo funciona, haces el switch**

### DESPUÉS DEL LANZAMIENTO (Semana próxima):

1. Validar que nueva landing convierte mejor
2. Hacer switch de "/" a nueva landing
3. Eliminar archivos obsoletos
4. Consolidar rutas
5. Limpiar código

**No arriesgues el lanzamiento por cambios de último minuto.**

---

**¿Quieres que prepare los archivos específicos que necesitas para integrar la landing de Claude de forma segura?**
