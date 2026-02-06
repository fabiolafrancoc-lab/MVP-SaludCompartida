# 🔄 FLUJO COMPLETO: Registro → Pago → Códigos → Dashboard

## 📋 Resumen Ejecutivo

**Sistema actual:** Square (NO Stripe)  
**Generación de códigos:** ANTES del pago (en el registro)  
**Facturación México:** Square (NO se usa actualmente)  
**Relación código-suscripción:** `registrations.id` → `square_subscriptions.registration_id`

---

## 🎯 PASO 1: Usuario Llena Formulario de Registro

**Página:** `/landing-jan` o `/registro-jan`

### Datos Capturados:

**Migrante (USA):**
- migrant_first_name
- migrant_last_name
- migrant_mother_last_name
- migrant_sex
- migrant_birthdate (validación 18+)
- migrant_email
- migrant_phone (formato: (555) 123-4567)
- migrant_country_code: +1

**Usuario en México:**
- family_first_name
- family_last_name
- family_mother_last_name
- family_sex
- family_birthdate (validación 18+)
- family_email
- family_phone (formato: 55 1234 5678)
- family_country_code: +52
- family_country: MX

**Aceptación:**
- terms_accepted: true
- terms_accepted_at: timestamp

---

## 🎲 PASO 2: Generación de Códigos ÚNICOS

**Ubicación:** `src/app/landing-jan/page.tsx` (líneas 12-19)

```typescript
function generateFamilyCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Generar 2 códigos DIFERENTES
let migrant_code = generateFamilyCode(); // Ejemplo: "CHXGCF"
let family_code = generateFamilyCode();  // Ejemplo: "A3B7K9"

// Asegurar que son diferentes
while (migrant_code === family_code && attempts < 10) {
  family_code = generateFamilyCode();
  attempts++;
}
```

**Características:**
- ✅ **6 caracteres** alfanuméricos
- ✅ **SIN prefijo** (no hay "M-" ni "F-")
- ✅ Sin caracteres confusos (sin 0, O, 1, I, L)
- ✅ Generado ANTES del pago
- ✅ Se guarda inmediatamente en Supabase con status='pending_payment'

---

## 💾 PASO 3: Guardar en Supabase (ANTES del Pago)

**Ubicación:** `src/app/landing-jan/page.tsx` (líneas 170-209)

```typescript
const { data: registrationData, error: registrationError } = await supabase
  .from('registrations')
  .insert({
    // 🔐 CÓDIGOS ÚNICOS
    migrant_code: 'CHXGCF',     // Código del migrante
    family_code: 'A3B7K9',      // Código de la familia
    
    // 📊 ESTADO INICIAL
    status: 'pending_payment',  // ⚠️ Esperando pago
    
    // 👤 DATOS MIGRANTE
    migrant_first_name: 'Fabiola',
    migrant_last_name: 'Franco',
    migrant_email: 'fabiola@example.com',
    migrant_phone: '5551234567',
    migrant_country_code: '+1',
    migrant_birthdate: '1990-05-15',
    migrant_sex: 'F',
    
    // 🇲🇽 DATOS FAMILIA MÉXICO
    family_first_name: 'María',
    family_last_name: 'García',
    family_email: 'maria@example.com',
    family_phone: '5587654321',
    family_country_code: '+52',
    family_birthdate: '1965-03-20',
    family_sex: 'F',
    
    // 🤖 COMPANION ASIGNADO
    family_companion_assigned: 'lupita', // lupita (55+) o fernanda (25-50)
    
    // 📅 METADATA
    terms_accepted: true,
    terms_accepted_at: '2026-02-05T...',
    created_at: '2026-02-05T...',
  })
  .select()
  .single();

// Guardar en sessionStorage para próxima página
sessionStorage.setItem('registrationData', JSON.stringify({
  registration_id: registrationData.id,  // UUID
  migrant_code: 'CHXGCF',
  family_code: 'A3B7K9',
  family_companion_assigned: 'lupita',
}));

// Redirigir a página de pago
window.location.href = `/pago?id=${registrationData.id}`;
```

**Estado de la BD en este momento:**

```sql
-- Tabla: registrations
| id (UUID)    | migrant_code | family_code | status           | square_subscription_id |
|--------------|--------------|-------------|------------------|------------------------|
| abc123...    | CHXGCF       | A3B7K9      | pending_payment  | NULL                   |
```

**⚠️ CRÍTICO:** Los códigos YA EXISTEN en Supabase, pero **status='pending_payment'** → **NO pueden hacer login aún**

---

## 💳 PASO 4: Página de Pago con Square

**Página:** `/pago?id=abc123...`

### Usuario Ingresa Tarjeta:
- Square Web Payments SDK captura datos de tarjeta
- Se genera `sourceId` (token temporal de tarjeta)
- NO se almacena información de tarjeta en tu servidor

**Cuando usuario presiona "Pagar $12.00 USD":**

```typescript
// Frontend envía a backend
fetch('/api/square-payment', {
  method: 'POST',
  body: JSON.stringify({
    sourceId: 'cnon:card-nonce-ok...',  // Token de tarjeta
    registrationId: 'abc123...',         // UUID del registro
  })
});
```

---

## 🔥 PASO 5: Backend Procesa Pago con Square

**Ubicación:** `src/app/api/square-payment/route.ts`

### Flujo Completo del Backend:

```typescript
// 1️⃣ CARGAR DATOS DE SUPABASE
const { data: registration } = await supabase
  .from('registrations')
  .select('*')
  .eq('id', registrationId)
  .single();

// Datos disponibles:
// - registration.migrant_code = "CHXGCF"
// - registration.family_code = "A3B7K9"
// - registration.migrant_email = "fabiola@example.com"
// - registration.status = "pending_payment"

// 2️⃣ CREAR CUSTOMER EN SQUARE
const customerResponse = await fetch('https://connect.squareup.com/v2/customers', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    idempotency_key: `customer_${registrationId}_${Date.now()}`,
    given_name: registration.migrant_first_name,  // "Fabiola"
    family_name: registration.migrant_last_name,  // "Franco"
    email_address: registration.migrant_email,    // "fabiola@example.com"
    phone_number: registration.migrant_phone,     // "+15551234567"
    reference_id: registrationId,                 // "abc123..."
  }),
});

const { customer } = await customerResponse.json();
const customerId = customer.id; // "cus_xxxxx"

// 3️⃣ GUARDAR TARJETA (Card on File)
const cardResponse = await fetch('https://connect.squareup.com/v2/cards', {
  method: 'POST',
  body: JSON.stringify({
    idempotency_key: `card_${registrationId}_${Date.now()}`,
    source_id: sourceId, // Token de tarjeta del frontend
    card: {
      customer_id: customerId,
    },
  }),
});

const { card } = await cardResponse.json();
const cardId = card.id; // "card_xxxxx"

// 4️⃣ CREAR SUSCRIPCIÓN MENSUAL
const subscriptionResponse = await fetch('https://connect.squareup.com/v2/subscriptions', {
  method: 'POST',
  body: JSON.stringify({
    idempotency_key: `subscription_${registrationId}_${Date.now()}`,
    location_id: SQUARE_LOCATION_ID,
    plan_variation_id: 'VU76FHKSAXPGGJT2MM72WKSZ', // Plan $12 USD/mes
    customer_id: customerId,
    card_id: cardId,
    start_date: '2026-02-05', // YYYY-MM-DD
    timezone: 'America/Mexico_City',
  }),
});

const { subscription } = await subscriptionResponse.json();
const subscriptionId = subscription.id; // "sub_xxxxx"

// 5️⃣ PROCESAR PAGO INICIAL ($12.00 USD)
const paymentResponse = await fetch('https://connect.squareup.com/v2/payments', {
  method: 'POST',
  body: JSON.stringify({
    idempotency_key: `payment_${registrationId}_${Date.now()}`,
    source_id: cardId,
    amount_money: {
      amount: 1200, // $12.00 USD en centavos
      currency: 'USD',
    },
    customer_id: customerId,
    location_id: SQUARE_LOCATION_ID,
    autocomplete: true,
  }),
});

const { payment } = await paymentResponse.json();
const paymentId = payment.id; // "pay_xxxxx"

// 6️⃣ GUARDAR EN SUPABASE
// 6.1 - Tabla square_customers
await supabase
  .from('square_customers')
  .insert({
    registration_id: registrationId,
    square_customer_id: customerId,
    email: registration.migrant_email,
    first_name: registration.migrant_first_name,
    last_name: registration.migrant_last_name,
  });

// 6.2 - Tabla square_subscriptions
await supabase
  .from('square_subscriptions')
  .insert({
    registration_id: registrationId,
    square_subscription_id: subscriptionId,
    square_customer_id: customerId,
    plan_variation_id: 'VU76FHKSAXPGGJT2MM72WKSZ',
    status: 'ACTIVE',
    start_date: new Date().toISOString(),
  });

// 6.3 - Tabla square_payments
await supabase
  .from('square_payments')
  .insert({
    registration_id: registrationId,
    square_payment_id: paymentId,
    square_customer_id: customerId,
    amount_cents: 1200,
    currency: 'USD',
    status: 'COMPLETED',
  });

// 6.4 - 🔥 ACTUALIZAR REGISTRO: ACTIVAR CUENTA
await supabase
  .from('registrations')
  .update({
    status: 'active',                        // ✅ AHORA PUEDEN HACER LOGIN
    payment_completed_at: new Date().toISOString(),
    square_customer_id: customerId,
  })
  .eq('id', registrationId);

// 7️⃣ ENVIAR EMAILS
// 7.1 - Email al migrante (USA)
await sendMigrantWelcomeEmail({
  migrantName: registration.migrant_first_name,
  migrantEmail: registration.migrant_email,
  codigoFamilia: registration.family_code,  // "A3B7K9"
  planName: 'SaludCompartida Familiar',
  planPrice: 12,
});

// 7.2 - Notificación interna a Stephanias
await sendAuraImmediateNotification({
  migrantName: registration.migrant_first_name,
  migrantEmail: registration.migrant_email,
  principalName: registration.family_first_name,
  codigoFamilia: registration.family_code,
  // ... más datos
});

// 8️⃣ RESPUESTA AL FRONTEND
return {
  success: true,
  data: {
    customerId,      // "cus_xxxxx"
    subscriptionId,  // "sub_xxxxx"
    paymentId,       // "pay_xxxxx"
    registrationId,  // "abc123..."
  },
};
```

---

## 📧 PASO 6: Emails de Bienvenida

### Email 1: Al Migrante (USA)

**De:** noreply@saludcompartida.app  
**Para:** fabiola@example.com  
**Asunto:** ¡Bienvenida a SaludCompartida! 🎉

```
Hola Fabiola! 👋

Tu pago ha sido procesado exitosamente.

🔐 TU CÓDIGO DE ACCESO:
┌─────────────┐
│   CHXGCF    │
└─────────────┘

🇲🇽 CÓDIGO PARA TU FAMILIAR EN MÉXICO:
┌─────────────┐
│   A3B7K9    │
└─────────────┘

📱 PRÓXIMOS PASOS:

1. Guarda tu código CHXGCF
2. Comparte el código A3B7K9 con tu familiar en México
3. Entra a tu dashboard: https://saludcompartida.com/dashboard

✅ SERVICIOS INCLUIDOS:
• Telemedicina ilimitada
• Descuentos en farmacias (hasta 75%)
• Terapia psicológica 1 sesión/semana
• Acompañamiento personalizado (Lupita/Fernanda)

¿Dudas? WhatsApp: +52 56 1017 8639
```

### Email 2: Notificación Interna (Stephanias)

**De:** noreply@saludcompartida.app  
**Para:** contact@saludcompartida.app  
**Asunto:** 🎉 Nueva Suscripción Activada

```
NUEVA FAMILIA REGISTRADA

👤 MIGRANTE (USA)
Nombre: Fabiola Franco
Email: fabiola@example.com
Teléfono: +1 (555) 123-4567
Código: CHXGCF

🇲🇽 USUARIO PRINCIPAL (MÉXICO)
Nombre: María García
Teléfono: +52 55 8765 4321
Código: A3B7K9
Companion: Lupita (edad 55+)

💰 SUSCRIPCIÓN
Plan: SaludCompartida Familiar
Precio: $12.00 USD/mes
Fecha activación: 5 de febrero, 2026 3:45 PM

📊 SQUARE IDs
Customer: cus_xxxxx
Subscription: sub_xxxxx
Payment: pay_xxxxx
```

### Email 3: WhatsApp a Familia (México)

**⚠️ NO se envía email a familia** - Se notifica vía WhatsApp usando WATI:

```
Hola María! 👋

Tu familiar Fabiola te ha registrado en SaludCompartida.

🔐 TU CÓDIGO DE ACCESO:
A3B7K9

🎉 COMPANION ASIGNADA: Lupita
(Tu acompañante personal disponible 24/7)

📱 Entra a tu dashboard:
https://saludcompartida.com/dashboard

Usa el código A3B7K9 para ingresar.

¿Dudas? Responde este mensaje.
```

---

## 🎯 PASO 7: Usuario Entra al Dashboard

**Página:** `/dashboard`

### Login con Código:

```typescript
// Usuario ingresa código "CHXGCF"
const code = "CHXGCF";

// Buscar en Supabase
const { data } = await supabase
  .from('registrations')
  .select('*')
  .or(`migrant_code.eq.${code},family_code.eq.${code}`)
  .maybeSingle();

// Validar status
if (!data || data.status !== 'active') {
  return error('Código inválido o cuenta inactiva');
}

// Determinar tipo de usuario
const userType = (data.migrant_code === code) ? 'migrant' : 'mexico';

// Auto-login
localStorage.setItem('dashboardCode', code);
setUserType(userType);
setRegistration(data);
setIsAuthenticated(true);
```

---

## 🗄️ ESTADO FINAL DE LA BASE DE DATOS

### Tabla: `registrations`

```sql
| id (UUID)  | migrant_code | family_code | status  | square_customer_id | payment_completed_at |
|------------|--------------|-------------|---------|--------------------|-----------------------|
| abc123...  | CHXGCF       | A3B7K9      | active  | cus_xxxxx          | 2026-02-05T15:45:30Z  |
```

### Tabla: `square_customers`

```sql
| id | registration_id | square_customer_id | email                | first_name | last_name |
|----|-----------------|--------------------|-----------------------|------------|-----------|
| 1  | abc123...       | cus_xxxxx          | fabiola@example.com  | Fabiola    | Franco    |
```

### Tabla: `square_subscriptions`

```sql
| id | registration_id | square_subscription_id | square_customer_id | status | start_date           |
|----|-----------------|------------------------|-----------------------|--------|----------------------|
| 1  | abc123...       | sub_xxxxx              | cus_xxxxx            | ACTIVE | 2026-02-05T15:45:30Z |
```

### Tabla: `square_payments`

```sql
| id | registration_id | square_payment_id | square_customer_id | amount_cents | currency | status    |
|----|-----------------|-------------------|--------------------|--------------|----------|-----------|
| 1  | abc123...       | pay_xxxxx         | cus_xxxxx          | 1200         | USD      | COMPLETED |
```

---

## 🔍 RELACIÓN CÓDIGO ↔ SUSCRIPCIÓN

### ¿Cómo saber qué código corresponde a qué suscripción?

**Consulta SQL:**

```sql
-- Buscar suscripción por código
SELECT 
  r.migrant_code,
  r.family_code,
  ss.square_subscription_id,
  ss.status AS subscription_status,
  r.status AS registration_status,
  r.payment_completed_at
FROM registrations r
LEFT JOIN square_subscriptions ss ON ss.registration_id = r.id
WHERE r.migrant_code = 'CHXGCF' 
   OR r.family_code = 'CHXGCF';
```

**Resultado:**

```
| migrant_code | family_code | square_subscription_id | subscription_status | registration_status | payment_completed_at |
|--------------|-------------|------------------------|---------------------|---------------------|----------------------|
| CHXGCF       | A3B7K9      | sub_xxxxx              | ACTIVE              | active              | 2026-02-05T15:45:30Z |
```

**Relación:** `registrations.id` → `square_subscriptions.registration_id`

---

## 🚨 WEBHOOK DE SQUARE (Para Renovaciones)

**Ubicación:** `src/app/api/webhooks/square/route.ts`

### ¿Cuándo se usa?

- **Renovación mensual:** Square cobra automáticamente cada mes
- **Cancelación:** Usuario cancela suscripción
- **Falla de pago:** Tarjeta rechazada

### Evento: `payment.completed`

```typescript
export async function POST(request: NextRequest) {
  const body = await request.text();
  const event = JSON.parse(body);

  if (event.type === 'payment.completed') {
    const payment = event.data.object.payment;
    const orderId = payment.order_id;

    // Buscar registro por order_id
    const { data: registration } = await supabase
      .from('registrations')
      .select('*')
      .eq('square_order_id', orderId)
      .single();

    // Actualizar status
    await supabase
      .from('registrations')
      .update({
        subscription_status: 'active',
        square_payment_id: payment.id,
      })
      .eq('registration_id', registration.registration_id);
  }

  return NextResponse.json({ received: true });
}
```

---

## ❓ PREGUNTAS FRECUENTES

### 1. ¿El código se genera en Square o Supabase?

**R:** Se genera en **Supabase** (frontend) ANTES del pago. Square NO conoce los códigos.

### 2. ¿Cuándo se puede hacer login con el código?

**R:** Solo cuando `status='active'` en la tabla `registrations`. Después del pago exitoso.

### 3. ¿Qué pasa si el pago falla?

**R:** El código existe en Supabase con `status='pending_payment'` → NO puede hacer login → Usuario debe intentar pagar nuevamente en `/pago?id=abc123...`

### 4. ¿Cómo cancelo una suscripción?

**R:** 
1. Cancelar en Square (API o Dashboard)
2. Square envía webhook
3. Webhook actualiza `registrations.status='cancelled'`
4. Usuario ya no puede hacer login

### 5. ¿Dónde está la integración con Stripe?

**R:** **NO SE USA STRIPE.** Todo el sistema usa Square para pagos.

### 6. ¿Dónde se genera la factura fiscal (México)?

**R:** **NO SE USA.** Aunque hay código para Square Invoices, actualmente NO se generan facturas fiscales automáticamente.

### 7. ¿Cómo verifico si un código es válido?

**R:**

```typescript
const { data } = await supabase
  .from('registrations')
  .select('status')
  .or(`migrant_code.eq.${code},family_code.eq.${code}`)
  .maybeSingle();

const isValid = data && data.status === 'active';
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

**Sistema actual:**

- [x] Generación de códigos en frontend
- [x] Guardar códigos en Supabase ANTES del pago
- [x] Pago con Square (Customer + Card + Subscription + Payment)
- [x] Actualizar status='active' después del pago
- [x] Enviar emails con códigos (Resend)
- [x] Login con código en dashboard
- [x] Validación status='active' en cada request

**Pendiente:**

- [ ] Webhook Square para renovaciones
- [ ] Facturación fiscal México (Square Invoices)
- [ ] Notificaciones WATI automáticas
- [ ] Cancelación de suscripción (frontend)

---

## 🎯 CONCLUSIÓN

**Flujo simplificado:**

```
1. Usuario registra → 2 códigos generados (CHXGCF, A3B7K9)
                   ↓
2. Códigos guardados en Supabase (status='pending_payment')
                   ↓
3. Usuario paga con Square → Customer + Subscription + Payment
                   ↓
4. Backend actualiza Supabase (status='active')
                   ↓
5. Emails enviados con códigos
                   ↓
6. Usuario entra a dashboard con código → Validación: status='active'
                   ↓
7. Square cobra cada mes → Webhook → Actualizar BD
```

**Relación código-suscripción:**

```
migrant_code "CHXGCF" → registrations.id (UUID) → square_subscriptions.registration_id
                                                  → square_customers.registration_id
                                                  → square_payments.registration_id
```

**Fuente de verdad:** `registrations.status` en Supabase.

---

**Documentación creada:** 5 de febrero, 2026  
**Autor:** AI Assistant  
**Última actualización:** Feb 5, 2026
