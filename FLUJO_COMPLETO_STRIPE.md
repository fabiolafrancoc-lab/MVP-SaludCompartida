# 🎯 Flujo Completo de SaludCompartida con Stripe

## 📊 Diagrama del Flujo

```
┌─────────────────────────────────────────────────────────────────┐
│                     1. LANDING PAGE                              │
│  - Mensaje emocional: "Ya no tienes que sentirte culpable"      │
│  - Precio: $12/mes destacado                                     │
│  - Beneficios: Doctor 24/7, Descuentos, Terapia                 │
│  - FOMO: "Solo 100 familias"                                    │
│  - 3 CTAs: Todos llevan a CHECKOUT                              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ↓ [CTA: Cuida a tu familia ahora]
                           │
┌──────────────────────────┴──────────────────────────────────────┐
│                     2. CHECKOUT PAGE                             │
│  - Resumen del plan: $12/mes                                     │
│  - Lista de beneficios incluidos                                 │
│  - Formulario simple:                                            │
│    • Nombre completo                                             │
│    • Email                                                       │
│  - CTA: "Ir a pago seguro con Stripe"                           │
│  - Badge: "100% seguro con Stripe"                              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ↓ [Submit → /api/create-checkout-session]
                           │
┌──────────────────────────┴──────────────────────────────────────┐
│              3. STRIPE HOSTED CHECKOUT                           │
│  (Página de Stripe, fuera de saludcompartida.app)               │
│  - Ingreso de datos de tarjeta                                   │
│  - Stripe procesa el pago                                        │
│  - 3D Secure si es necesario                                     │
│  - Pago exitoso: redirección automática                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                 ┌─────────┴─────────┐
                 │                   │
        ✅ Éxito │                   │ ❌ Error/Cancelado
                 │                   │
                 ↓                   ↓
┌────────────────────────┐  ┌──────────────────────┐
│ subscription-success?  │  │   Landing Page       │
│ session_id={CHECKOUT}  │  │   ?checkout=cancelled│
└────────┬───────────────┘  └──────────────────────┘
         │
         ↓ [Verificar con /api/verify-session]
         │
┌────────┴───────────────────────────────────────────────────────┐
│             4. SUBSCRIPTION SUCCESS PAGE                         │
│  - ✅ Icono de éxito animado                                     │
│  - "¡Suscripción Activada! 🎉"                                   │
│  - "Tu familia ya está protegida"                               │
│  - Confirmación: "Pago de $12/mes confirmado"                   │
│  - Lista de servicios incluidos                                 │
│  - CTA: "Completar registro y recibir códigos"                  │
└────────────────────────┬───────────────────────────────────────┘
                         │
                         ↓ [CTA: Completar registro]
                         │
┌────────────────────────┴───────────────────────────────────────┐
│                     5. REGISTER PAGE                             │
│  - Formulario completo:                                          │
│    MIGRANTE (USA):                                               │
│      • Nombre, Apellidos, Email, Teléfono                        │
│    FAMILIAR (México):                                            │
│      • País, Nombre, Apellidos, Email, Teléfono                  │
│  - Generación automática de códigos:                             │
│    • Código migrante: SC-XXXXX                                   │
│    • Código familiar: SC-XXXXX                                   │
│  - CTA: "Registrar y Obtener Códigos"                           │
└────────────────────────┬───────────────────────────────────────┘
                         │
                         ↓ [Submit → handleRegister()]
                         │
         ┌───────────────┴───────────────┐
         │                               │
         ↓                               ↓
   [Supabase]                      [Resend API]
   Guardar en DB                   Enviar emails
   - Códigos                       - Migrante
   - Datos familia                 - Familiar
                                   - Bienvenida
         │                               │
         └───────────────┬───────────────┘
                         │
                         ↓
┌────────────────────────┴───────────────────────────────────────┐
│                  6. CONFIRMATION PAGE                            │
│  - Confetti animation                                            │
│  - "¡Registro Completado! 🎉"                                    │
│  - "Tu familia está en la lista de espera"                      │
│  - Próximos pasos:                                               │
│    1. Revisión 48 horas                                          │
│    2. WhatsApp con código migrante                               │
│    3. WhatsApp con código familiar                               │
│    4. Activar servicios                                          │
│  - Testimonios rotando                                           │
│  - CTA: "Volver al inicio"                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Estados de Página (currentPage)

| Estado | Descripción |
|--------|-------------|
| `landing` | Landing page de ventas emocional |
| `checkout` | Pre-pago: recopila email y nombre |
| `subscription-success` | Post-pago: confirma suscripción activa |
| `register` | Registro completo de migrante + familiar |
| `confirmation` | Confirmación final con códigos enviados |

---

## 💳 Integración con Stripe

### Backend (Vercel Serverless Functions)

1. **`/api/create-checkout-session.js`**
   - Recibe: `{ email, migrantName }`
   - Crea: Stripe Checkout Session para suscripción $12/mes
   - Retorna: `{ sessionId, url }` (URL de Stripe Checkout)
   - Redirecciona: Usuario a Stripe hosted page

2. **`/api/verify-session.js`**
   - Recibe: `session_id` (query param)
   - Verifica: Estado del pago en Stripe
   - Retorna: `{ success, customer, subscription }`
   - Valida: payment_status === 'paid'

### Frontend (React)

1. **`handleCheckout()` en App.jsx**
   - Valida email y nombre
   - Llama a `/api/create-checkout-session`
   - Redirecciona a Stripe Checkout URL

2. **Stripe Hosted Checkout**
   - Usuario ingresa datos de tarjeta
   - Stripe procesa pago
   - Success: redirecciona a `/subscription-success?session_id={ID}`
   - Cancel: redirecciona a `/?checkout=cancelled`

---

## 📧 Emails Automáticos

### Después del Registro (página 5)

1. **Email al Migrante**:
   - Asunto: "¡Tu familia ya está protegida con SaludCompartida!"
   - Contenido:
     - Confirmación de suscripción $12/mes
     - Código de acceso: SC-XXXXX
     - Instrucciones para activar
     - Link a prototype.saludcompartida.com

2. **Email al Familiar**:
   - Asunto: "¡Bienvenido a SaludCompartida!"
   - Contenido:
     - Explicación del servicio
     - Código de acceso: SC-XXXXX
     - Instrucciones en español
     - Contacto de soporte

---

## 🔐 Variables de Entorno Necesarias

### Producción (Vercel)

```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_ID=price_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...

# App
NEXT_PUBLIC_APP_URL=https://saludcompartida.app

# Supabase (ya configuradas)
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

# Resend (ya configuradas)
RESEND_API_KEY=...
```

---

## ✅ Checklist de Testing

- [ ] Landing page se ve correctamente
- [ ] Clic en cualquier CTA lleva a /checkout
- [ ] Formulario de checkout valida email y nombre
- [ ] Clic en "Ir a pago" redirecciona a Stripe
- [ ] Completar pago con tarjeta de prueba (4242 4242 4242 4242)
- [ ] Redirección exitosa a /subscription-success
- [ ] Ver confirmación de suscripción activa
- [ ] Clic en "Completar registro" lleva a /register
- [ ] Formulario de registro funciona correctamente
- [ ] Códigos se generan automáticamente
- [ ] Emails se envían correctamente
- [ ] Página de confirmación muestra códigos
- [ ] Testimonios rotan correctamente

---

## 🚀 Próximos Pasos

1. **Configurar Stripe** (seguir STRIPE_SETUP.md)
   - Crear cuenta
   - Crear producto $12/mes
   - Obtener API keys
   - Configurar variables de entorno

2. **Testing completo**
   - Probar flujo end-to-end
   - Verificar emails
   - Validar códigos en Supabase

3. **Activar Live Mode**
   - Cuando estés listo para producción
   - Cambiar keys de test a live

4. **Webhooks** (Opcional)
   - Configurar notificaciones automáticas
   - Manejar cancelaciones
   - Actualizar estado de suscripción

---

## 📊 Métricas a Monitorear

| Métrica | Objetivo |
|---------|----------|
| **Landing → Checkout** | > 20% |
| **Checkout → Stripe** | > 80% |
| **Stripe → Success** | > 90% |
| **Success → Register** | > 95% |
| **Register → Complete** | > 85% |

---

## 💡 Notas Importantes

- **NO recaudar información sensible**: Stripe maneja todos los datos de tarjeta
- **HTTPS requerido**: Stripe solo funciona en HTTPS (Vercel ya lo provee)
- **Test Mode vs Live Mode**: Siempre prueba primero en test mode
- **Webhooks**: Implementar para producción (manejo de cancelaciones)
- **Refunds**: Manejar desde Stripe Dashboard o implementar API

---

*Última actualización: 16 de Noviembre 2025*
*Status: ✅ CÓDIGO LISTO - PENDIENTE CONFIGURACIÓN STRIPE*
