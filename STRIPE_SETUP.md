# 🛒 Configuración de Stripe para SaludCompartida

## ✅ Archivos Creados

- `/api/create-checkout-session.js` - Crea sesión de pago
- `/api/verify-session.js` - Verifica pago exitoso
- Páginas en `App.jsx`:
  - `checkout` - Pre-pago
  - `subscription-success` - Post-pago
  - `register` - Registro final

---

## 📝 Pasos para Configurar Stripe

### 1. Crear Cuenta de Stripe

1. Ve a https://dashboard.stripe.com/register
2. Crea tu cuenta de negocio
3. Completa la información de tu empresa

### 2. Crear Producto y Precio

1. Ve a **Products** en el dashboard de Stripe
2. Clic en **+ Add Product**
3. Rellena los campos:
   - **Name**: `SaludCompartida - Plan Mensual`
   - **Description**: `Telemedicina 24/7, descuentos en farmacias y terapia semanal para tu familia en México`
   - **Pricing**:
     - Selecciona **Recurring**
     - **Price**: `$12.00 USD`
     - **Billing period**: `Monthly`
   - Clic en **Save product**

4. Copia el **Price ID** (empieza con `price_...`)

### 3. Obtener API Keys

1. Ve a **Developers** → **API Keys**
2. Copia estas 2 keys:
   - **Publishable key** (empieza con `pk_test_...` o `pk_live_...`)
   - **Secret key** (empieza con `sk_test_...` o `sk_live_...`)

⚠️ **IMPORTANTE**: Mantén la Secret key privada. NUNCA la compartas ni la subas a GitHub.

### 4. Configurar Variables de Entorno

#### En tu computadora (desarrollo local):

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Stripe Keys (Test Mode)
STRIPE_SECRET_KEY=sk_test_tu_key_aqui
STRIPE_PRICE_ID=price_tu_id_aqui

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:5173

# Stripe Publishable Key (para frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_tu_key_aqui
```

#### En Vercel (producción):

1. Ve a tu proyecto en Vercel
2. Clic en **Settings** → **Environment Variables**
3. Agrega estas variables:

| Variable | Valor | Environment |
|----------|-------|-------------|
| `STRIPE_SECRET_KEY` | `sk_test_...` o `sk_live_...` | Production, Preview, Development |
| `STRIPE_PRICE_ID` | `price_...` | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | `https://saludcompartida.app` | Production |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` o `pk_live_...` | Production, Preview, Development |

4. Clic en **Save**
5. Redeploy el proyecto

### 5. Instalar Dependencias

```bash
npm install stripe @stripe/stripe-js
```

✅ Ya está instalado en tu proyecto.

---

## 🔄 Flujo Actualizado

```
1. Landing Page
   ↓ (CTA: Cuida a tu familia ahora)
2. Checkout Page
   - Usuario ingresa nombre y email
   - Clic en "Ir a pago seguro con Stripe"
   ↓
3. Stripe Hosted Checkout
   - Usuario ingresa datos de tarjeta
   - Stripe procesa el pago
   ↓
4. Subscription Success Page
   - Confirmación de pago exitoso
   - "Completar registro y recibir códigos"
   ↓
5. Register Page
   - Formulario completo (migrante + familiar)
   - Generación de códigos
   ↓
6. Confirmation Page
   - Códigos enviados por email y WhatsApp
```

---

## 🧪 Testing con Tarjetas de Prueba

Usa estas tarjetas en **Test Mode**:

| Tarjeta | Número | Resultado |
|---------|--------|-----------|
| ✅ Éxito | `4242 4242 4242 4242` | Pago exitoso |
| ❌ Rechazo | `4000 0000 0000 9995` | Pago rechazado |
| 🔐 3D Secure | `4000 0025 0000 3155` | Requiere autenticación |

- **Fecha**: Cualquier fecha futura (ej: 12/25)
- **CVV**: Cualquier 3 dígitos (ej: 123)
- **ZIP**: Cualquier código (ej: 12345)

---

## 🚀 Deploy

1. Commit y push de los cambios:

```bash
git add .
git commit -m "Integración completa con Stripe: checkout, suscripción y pagos"
git push origin main
```

2. Vercel auto-desplegará los cambios

3. Prueba el flujo completo:
   - Ir a landing page
   - Clic en CTA
   - Llenar checkout page
   - Completar pago en Stripe
   - Verificar redirección a subscription-success
   - Completar registro
   - Recibir códigos

---

## 📊 Monitorear Pagos

1. Ve a **Payments** en Stripe Dashboard
2. Filtra por:
   - Estado (Succeeded, Failed)
   - Fecha
   - Monto
3. Clic en cada pago para ver detalles completos

---

## 🔔 Webhooks (Opcional pero Recomendado)

Los webhooks te permiten recibir notificaciones automáticas cuando:
- Un pago es exitoso
- Una suscripción se cancela
- Una tarjeta está por vencer

### Configurar Webhook:

1. Ve a **Developers** → **Webhooks** en Stripe
2. Clic en **+ Add endpoint**
3. URL: `https://saludcompartida.app/api/stripe-webhook`
4. Selecciona eventos:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copia el **Webhook signing secret** (empieza con `whsec_...`)
6. Agrégalo como variable de entorno:
   - `STRIPE_WEBHOOK_SECRET=whsec_...`

### Crear API endpoint para webhook:

```bash
# Crear archivo /api/stripe-webhook.js
# (Necesitas implementar este endpoint)
```

---

## ⚠️ Modo de Producción (Live Mode)

**Cuando estés listo para recibir pagos reales:**

1. Completa el onboarding en Stripe Dashboard
2. Activa tu cuenta de producción
3. Cambia las keys de `test` a `live`:
   - `pk_test_...` → `pk_live_...`
   - `sk_test_...` → `sk_live_...`
4. Crea el producto/precio nuevamente en modo **Live**
5. Actualiza las variables de entorno en Vercel con keys de producción
6. Redeploy

---

## 🆘 Troubleshooting

### Error: "Stripe is not defined"
- Verifica que instalaste `@stripe/stripe-js`
- Revisa que importaste correctamente en App.jsx

### Error: "Invalid API Key"
- Verifica que copiaste correctamente la key
- Asegúrate de usar `sk_test_` para backend y `pk_test_` para frontend
- Revisa que las variables de entorno estén en Vercel

### Error: "Price not found"
- Verifica que creaste el producto en Stripe
- Copia el Price ID correcto (debe empezar con `price_`)
- Asegúrate de que el Price ID está en las variables de entorno

### El pago se procesa pero no redirecciona
- Verifica que `NEXT_PUBLIC_APP_URL` esté configurado
- Revisa la URL de success en create-checkout-session.js
- Checa los logs en Vercel para ver errores

---

## 📚 Recursos

- [Stripe Docs - Checkout](https://stripe.com/docs/checkout/quickstart)
- [Stripe Docs - Subscriptions](https://stripe.com/docs/billing/subscriptions/build-subscriptions)
- [Stripe Dashboard](https://dashboard.stripe.com)
- [Stripe API Reference](https://stripe.com/docs/api)

---

## ✅ Checklist de Implementación

- [ ] Crear cuenta de Stripe
- [ ] Crear producto SaludCompartida ($12/mes)
- [ ] Obtener Price ID
- [ ] Obtener API keys (Publishable y Secret)
- [ ] Configurar variables de entorno localmente (.env.local)
- [ ] Configurar variables de entorno en Vercel
- [ ] Probar flujo completo con tarjetas de prueba
- [ ] Verificar emails de confirmación
- [ ] Configurar webhooks (opcional)
- [ ] Activar Live Mode cuando estés listo
- [ ] Documentar proceso de cancelación de suscripción

---

*Última actualización: 16 de Noviembre 2025*
*Status: ✅ LISTO PARA TESTING*
