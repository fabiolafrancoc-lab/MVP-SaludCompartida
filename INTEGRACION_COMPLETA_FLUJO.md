# 🎯 INTEGRACIÓN COMPLETA: RESEND + SUPABASE + SQUARE

**Fecha:** 2 de febrero de 2026  
**Commit:** 1b2652b  
**Status:** ✅ DESPLEGADO Y FUNCIONAL

---

## 📊 FLUJO COMPLETO DEL SISTEMA

```
┌──────────────────────────────────────────────────────────────────────┐
│                         USUARIO EN PAGO                               │
│                    (https://saludcompartida.app/pago)                │
└────────────────────────────┬─────────────────────────────────────────┘
                             │
                             │ 1. Completa formulario Square
                             │    - Nombre en tarjeta
                             │    - Número de tarjeta
                             │    - CVV, Fecha exp.
                             ▼
┌──────────────────────────────────────────────────────────────────────┐
│                          🟦 SQUARE SDK                                │
│                       (Web Payments SDK)                              │
├──────────────────────────────────────────────────────────────────────┤
│  • Tokeniza tarjeta                                                   │
│  • Procesa pago de $12 USD                                            │
│  • Retorna payment_id                                                 │
└────────────────────────────┬─────────────────────────────────────────┘
                             │
                             │ 2. Pago exitoso
                             ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    📝 ACTUALIZAR SUPABASE                             │
│                  (tabla: registrations)                               │
├──────────────────────────────────────────────────────────────────────┤
│  UPDATE registrations SET                                             │
│    payment_status = 'completed',                                      │
│    payment_id = '[square_payment_id]',                                │
│    updated_at = NOW()                                                 │
│  WHERE id = registrationId                                            │
└────────────────────────────┬─────────────────────────────────────────┘
                             │
                             │ 3. Llamar a endpoint de emails
                             ▼
┌──────────────────────────────────────────────────────────────────────┐
│              📧 /api/send-notifications                               │
│                    (Endpoint Next.js)                                 │
├──────────────────────────────────────────────────────────────────────┤
│  POST /api/send-notifications                                         │
│  Body: {                                                              │
│    type: 'payment_success',                                           │
│    registrationId: 123                                                │
│  }                                                                    │
└────────────────────────────┬─────────────────────────────────────────┘
                             │
                             │ 4. Query con JOIN a Supabase
                             ▼
┌──────────────────────────────────────────────────────────────────────┐
│                   🗄️ SUPABASE (PostgreSQL)                           │
│              Obtener datos completos del registro                     │
├──────────────────────────────────────────────────────────────────────┤
│  SELECT                                                               │
│    registrations.*,                                                   │
│    ai_companions.companion_name                                       │
│  FROM registrations                                                   │
│  LEFT JOIN ai_companions                                              │
│    ON registrations.assigned_companion_id = ai_companions.id          │
│  WHERE registrations.id = 123                                         │
│                                                                       │
│  ✅ Datos obtenidos:                                                  │
│    • migrant_email                                                    │
│    • migrant_code (6 dígitos)                                         │
│    • migrant_first_name                                               │
│    • family_primary_email                                             │
│    • family_first_name                                                │
│    • family_code (6 dígitos)                                          │
│    • companion_name ("Lupita" o "Fernanda")                           │
└────────────────────────────┬─────────────────────────────────────────┘
                             │
                             │ 5. Enviar emails con templates
                             ▼
┌──────────────────────────────────────────────────────────────────────┐
│              📮 RESEND (Servicio de Email)                            │
│              sendPostPaymentEmails() en paralelo                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐ │
│  │   EMAIL 1: MIGRANTE (USA)    │  │ EMAIL 2: USUARIO MÉXICO      │ │
│  │ "El Que Nunca Olvida"         │  │ "El Regalo de Amor"          │ │
│  ├──────────────────────────────┤  ├──────────────────────────────┤ │
│  │ To: migrant@email.com        │  │ To: familia@email.com        │ │
│  │ Subject: "Hoy Cambiaste..."  │  │ Subject: "¡Tienes regalo!"   │ │
│  │                               │  │                               │ │
│  │ 💚 Gradiente azul/cyan        │  │ 🎁 Gradiente rosa/magenta     │ │
│  │ 🇺🇸 Bandera USA               │  │ 🇲🇽 Bandera México            │ │
│  │ 🔐 Código: A3K9M2             │  │ 🔐 Código: B7L4X9             │ │
│  │ 👩‍⚕️ Compañera: Lupita         │  │ 👩‍⚕️ Compañera: Lupita         │ │
│  │ ✅ Beneficios listados        │  │ ✅ Grid de 4 beneficios       │ │
│  │ 🎯 CTA: Ver Dashboard         │  │ 🎯 CTA: Agradecer migrante    │ │
│  └──────────────────────────────┘  └──────────────────────────────┘ │
│                                                                       │
│  ✅ Promise.allSettled → Ambos enviados independientemente            │
└────────────────────────────┬─────────────────────────────────────────┘
                             │
                             │ 6. Respuesta de éxito
                             ▼
┌──────────────────────────────────────────────────────────────────────┐
│               ✅ CONFIRMACIÓN AL USUARIO                              │
│          router.push('/confirmacion?id=123')                          │
├──────────────────────────────────────────────────────────────────────┤
│  Página de confirmación muestra:                                     │
│  • Confetti animation 🎊                                              │
│  • Códigos de acceso (migrante + familia)                            │
│  • Nombre de compañera asignada                                      │
│  • Firmas emocionales de familia                                     │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🔗 CONEXIONES ENTRE SISTEMAS

### 1️⃣ **SQUARE → SUPABASE**

**¿Por qué?**  
Necesitamos guardar que el pago fue exitoso y obtener el `payment_id` de Square.

**Código:**
```typescript
// En: src/app/pago/page.tsx (línea ~180)
await supabase
  .from('registrations')
  .update({
    payment_status: 'completed',
    payment_id: result.data.id,  // ← ID de Square
    updated_at: new Date().toISOString()
  })
  .eq('id', registrationId);
```

**Campos actualizados:**
- `payment_status`: 'pending' → 'completed'
- `payment_id`: null → 'sq0idp-xxx...'
- `updated_at`: timestamp actual

---

### 2️⃣ **SUPABASE → RESEND**

**¿Por qué?**  
Los emails necesitan datos personalizados (nombres, códigos, compañera) que están en Supabase.

**Query con JOIN:**
```typescript
// En: src/app/api/send-notifications/route.ts (línea ~35)
const { data: registration } = await supabase
  .from('registrations')
  .select(`
    *,
    ai_companions:assigned_companion_id (
      companion_name
    )
  `)
  .eq('id', registrationId)
  .single();
```

**Datos obtenidos:**
| Campo | Tabla | Uso en Email |
|-------|-------|-------------|
| `migrant_email` | registrations | Destinatario Email 1 |
| `migrant_code` | registrations | Código destacado Email 1 |
| `migrant_first_name` | registrations | Personalización Email 1 |
| `family_primary_email` | registrations | Destinatario Email 2 |
| `family_first_name` | registrations | Personalización Email 2 |
| `family_code` | registrations | Código destacado Email 2 |
| `companion_name` | ai_companions | "Lupita" o "Fernanda" en ambos |

---

### 3️⃣ **RESEND → EMAILS**

**¿Por qué?**  
Resend es el servicio que envía los emails con alta entregabilidad.

**Función principal:**
```typescript
// En: src/lib/email-templates.ts
export async function sendPostPaymentEmails(
  migrantData: MigrantEmailData,
  familyData: FamilyEmailData
) {
  const results = await Promise.allSettled([
    sendMigrantEmail(migrantData),    // Email USA
    sendFamilyEmail(familyData),      // Email México
  ]);
  
  return {
    migrant: results[0],
    family: results[1],
  };
}
```

**Templates incluidos:**
- `getMigrantEmailTemplate()`: HTML completo con diseño "El Que Nunca Olvida"
- `getFamilyEmailTemplate()`: HTML completo con diseño "El Regalo de Amor"

---

## 🎨 DISEÑO DE LOS EMAILS

### Email Migrante (USA) - "El Que Nunca Olvida"

**Paleta de colores:**
- Primary: `#06B6D4` (Cyan)
- Secondary: `#f59e0b` (Amber)
- Gradiente header: `linear-gradient(90deg, #06B6D4, #0891b2, #f59e0b, #EC4899)`

**Secciones:**
1. **Quote emocional:** Fondo oscuro con texto "La distancia se mide en kilómetros..."
2. **Success icon:** Corazón en círculo cyan con sombra
3. **Gratitud:** Mensajes de familia simulados ("Grasias papá", "te kiero mamá")
4. **Badge tiempo real:** "EN ESTE MOMENTO" - familia recibiendo su código
5. **Código destacado:** Border dashed, monospace, 2.2rem
6. **Beneficios:** 4 items con iconos (videollamadas, descuentos, terapia, seguimiento)
7. **Compañera:** Quote de Lupita/Fernanda con fondo amber
8. **CTA:** Botón gradient "Seguimiento Mensual de Ahorro y Bienestar"

---

### Email Usuario México - "El Regalo de Amor"

**Paleta de colores:**
- Primary: `#EC4899` (Rosa)
- Secondary: `#10b981` (Verde)
- Gradiente header: `linear-gradient(135deg, #EC4899 0%, #be185d 50%, #9d174d 100%)`

**Secciones:**
1. **Header regalo:** Ícono de regalo con "¡Tienes un Regalo Especial!"
2. **De parte de:** Nombre del migrante con mensaje emocional
3. **Banderas USA/México:** Con línea de gradiente conectándolas
4. **Código verde:** Badge "Tu código personal" con border verde
5. **Grid beneficios:** 4 tarjetas (Médico 24/7, Farmacias, Terapia, Bienestar)
6. **Compañera:** "Muy pronto te llamará Lupita" con quote personalizado
7. **Sorpresa:** CTA para agradecer al migrante via WhatsApp
8. **Footer:** Tagline "¿dónde está tu corazón?"

---

## 🔐 SEGURIDAD Y MEJORES PRÁCTICAS

### ✅ Variables de entorno requeridas

```env
# Resend
RESEND_API_KEY=re_citjFFac_Jc1PzGUnMSigCV7tCMYxTWa3

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://rzmdekjegbdgitqekjee.supabase.co
SUPABASE_SERVICE_ROLE_KEY=[tu_service_role_key]

# Square
NEXT_PUBLIC_SQUARE_APP_ID=sq0idp-TDgOgQ1CmhJqDdCqulhnIw
NEXT_PUBLIC_SQUARE_LOCATION_ID=L9W263XHC7876
SQUARE_ACCESS_TOKEN=EAAAlw3HBOvZk9JPObBSZ4eQkEJnK8VkHoiY4ybMFXfyZKVysKAGaBjXjjHVXgvp
```

### ✅ Logs detallados para debugging

Todos los logs incluyen prefijos para fácil identificación:

```typescript
console.log('📧 [RESEND] ...');     // Operaciones de Resend
console.log('✅ [SUPABASE] ...');   // Queries de Supabase
console.log('🟦 [SQUARE] ...');     // Operaciones de Square
console.log('❌ [ERROR] ...');      // Errores generales
```

### ✅ Manejo de errores sin bloqueo

El flujo de pago **NUNCA** se bloquea si los emails fallan:

```typescript
try {
  await fetch('/api/send-notifications', { ... });
} catch (emailError) {
  console.error('⚠️ [RESEND] Error (no crítico):', emailError);
  // ← Usuario sigue siendo redirigido a /confirmacion
}
```

### ✅ Fallbacks automáticos

```typescript
const companionName = registration.ai_companions?.companion_name || 'Lupita';
```

Si no hay compañera asignada, usa "Lupita" por defecto.

---

## 🧪 TESTING

### 1. Preview de emails (sin enviar):

```bash
# Acceder a:
https://saludcompartida.app/mail-resend-migrante.html
https://saludcompartida.app/mail-resend-usuario.html
```

### 2. Test end-to-end completo:

```bash
# 1. Ir a registro
https://saludcompartida.app/registro-jan

# 2. Completar formulario
#    - Migrante (USA): Tu email personal
#    - Usuario México: Otro email donde puedas recibir

# 3. Continuar a pago
#    Card: 4111 1111 1111 1111
#    Exp: 12/28
#    CVV: 123

# 4. Verificar logs en Vercel:
#    📧 [RESEND] Iniciando envío...
#    ✅ [SUPABASE] Datos obtenidos...
#    ✅ [RESEND] Emails enviados...

# 5. Revisar bandeja de entrada:
#    ✅ Email 1: "Hoy Cambiaste Su Vida"
#    ✅ Email 2: "¡Tienes un Regalo Especial!"
```

### 3. Verificar en Supabase:

```sql
SELECT 
  id,
  migrant_email,
  family_primary_email,
  migrant_code,
  family_code,
  payment_status,
  payment_id,
  assigned_companion_id,
  created_at,
  updated_at
FROM registrations
WHERE payment_status = 'completed'
ORDER BY created_at DESC
LIMIT 5;
```

---

## 📊 MÉTRICAS Y MONITOREO

### Logs a revisar en Vercel:

```
✅ [SUPABASE] Datos obtenidos correctamente
✅ [RESEND] Resultado Email Migrante: ✓ Enviado exitosamente
✅ [RESEND] Resultado Email Usuario México: ✓ Enviado exitosamente
```

### Dashboard de Resend:

Acceder a: https://resend.com/emails

Verificar:
- ✅ Emails entregados
- ✅ Tasa de apertura
- ✅ Tasa de clicks
- ⚠️ Emails rechazados o en spam

---

## 🚀 PRÓXIMOS PASOS

- [ ] Integrar WhatsApp con Twilio (diseñado, no implementado)
- [ ] Agregar tracking de emails (opens, clicks)
- [ ] A/B testing de subject lines
- [ ] Personalización avanzada según edad de usuario
- [ ] Email de recordatorio si no abren en 24h

---

## ✅ CHECKLIST FINAL

- [x] Templates copiados y actualizados
- [x] Nomenclatura de campos corregida (family_first_name)
- [x] Endpoint /api/send-notifications reescrito
- [x] Integración con pago/page.tsx simplificada
- [x] JOIN con ai_companions implementado
- [x] Logs detallados con prefijos
- [x] Manejo de errores sin bloqueo
- [x] Fallbacks automáticos (companion_name)
- [x] Commit y push a GitHub
- [x] Variables de entorno documentadas
- [x] Flujo completo documentado

---

**✅ INTEGRACIÓN COMPLETA Y FUNCIONAL**

Todo está conectado: **SQUARE → SUPABASE → RESEND → EMAILS**

Cuando un usuario paga con Square, automáticamente recibe 2 emails hermosos con datos reales de Supabase.
