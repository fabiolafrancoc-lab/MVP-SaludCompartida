# 🆘 SOLUCIÓN RÁPIDA: WhatsApp y Email NO Funcionan

## ⚡ ACCIÓN INMEDIATA (5 minutos)

### 1️⃣ Verificar Variables de Entorno (Causa #1 en 90% de casos)

**Abre tu navegador en:**
```
https://saludcompartida.app/api/check-env.js
```

Verás algo como:
```json
{
  "variables": {
    "TWILIO_ACCOUNT_SID": "✅ Definida" o "❌ NO DEFINIDA",
    "TWILIO_AUTH_TOKEN": "✅ Definida" o "❌ NO DEFINIDA",
    "TWILIO_WHATSAPP_NUMBER": "✅ Definida" o "❌ NO DEFINIDA",
    "RESEND_API_KEY": "✅ Definida" o "❌ NO DEFINIDA"
  }
}
```

**¿Ves alguna "❌ NO DEFINIDA"?**

👉 **Ve al Paso 2**

**¿Todas tienen "✅ Definida"?**

👉 **Ve al Paso 3** (problema es otro)

---

### 2️⃣ Agregar Variables Faltantes en Vercel

1. **Ve a:** https://vercel.com/dashboard

2. **Selecciona tu proyecto:** `MVP-SaludCompartida`

3. **Ve a:** Settings → Environment Variables

4. **Agrega CADA una de estas:**

#### Variable 1: TWILIO_ACCOUNT_SID
```
Name: TWILIO_ACCOUNT_SID
Value: ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (copia de Twilio Console)
Apply to: Production, Preview, Development
```

#### Variable 2: TWILIO_AUTH_TOKEN
```
Name: TWILIO_AUTH_TOKEN
Value: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (copia de Twilio Console)
Apply to: Production, Preview, Development
```

#### Variable 3: TWILIO_WHATSAPP_NUMBER
```
Name: TWILIO_WHATSAPP_NUMBER
Value: whatsapp:+14155238886 (copia de Twilio WhatsApp Sandbox)
Apply to: Production, Preview, Development
```

#### Variable 4: RESEND_API_KEY
```
Name: RESEND_API_KEY
Value: re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (copia de Resend Dashboard)
Apply to: Production, Preview, Development
```

5. **IMPORTANTE:** Después de agregar las variables:
   - Ve a: **Deployments**
   - Click en los 3 puntos (...) del último deployment
   - Click en **Redeploy**
   - Espera que termine (1-2 minutos)

6. **Verificar:**
   - Recarga: https://saludcompartida.app/api/check-env.js
   - Todas deben decir "✅ Definida"

---

### 3️⃣ Twilio WhatsApp Sandbox (Si ya tienes las variables)

**Problema:** Los usuarios deben unirse al sandbox antes de recibir mensajes

1. **Ve a:** https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn

2. **Verás algo como:**
   ```
   To connect your sandbox, send "join [código]" to +1 415 523 8886
   ```

3. **Desde tu WhatsApp:**
   - Abre WhatsApp
   - Envía mensaje a: `+1 415 523 8886`
   - Escribe: `join [tu-codigo-sandbox]`
   - Debes recibir confirmación

4. **Repite para AMBOS números:**
   - El número USA del migrante
   - El número México del familiar

5. **Verificar en Twilio Console:**
   - Debe aparecer "Sandbox Participants" con ambos números

**💡 Para producción sin sandbox:**
- Necesitas activar WhatsApp Business API
- Costo: ~$0.005 por mensaje
- Proceso: https://console.twilio.com/us1/develop/sms/whatsapp

---

### 4️⃣ Resend Domain Verification (Si emails no llegan)

1. **Ve a:** https://resend.com/domains

2. **Busca:** `saludcompartida.com`

3. **¿Dice "Verified" ✅?**
   - ✅ SÍ → Pasa al Paso 5
   - ❌ NO → Continúa abajo

4. **Si NO está verificado:**
   - Click en el dominio
   - Verás 3 registros DNS:
     * SPF Record
     * DKIM Record
     * DMARC Record
   - Ve a tu proveedor de DNS (GoDaddy, Namecheap, etc.)
   - Agrega CADA registro exactamente como lo muestra Resend
   - Espera 24-48h para propagación

5. **Solución temporal (mientras verificas):**
   - Edita: `/api/send-email.js`
   - Línea ~98, cambia:
     ```javascript
     from: 'SaludCompartida <noreply@saludcompartida.com>',
     ```
     Por:
     ```javascript
     from: 'SaludCompartida <onboarding@resend.dev>',
     ```
   - Commit y push
   - Los emails saldrán desde el dominio sandbox de Resend

---

### 5️⃣ Prueba Manual Rápida

1. **Abre tu sitio:** https://saludcompartida.app

2. **Abre la consola del navegador:**
   - Chrome/Edge: F12 o Cmd+Option+I (Mac)
   - Pestaña "Console"

3. **Pega y ejecuta (WhatsApp):**
   ```javascript
   fetch('/api/send-whatsapp.js', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       to: '+5215551234567', // TU número de prueba
       message: 'TEST desde consola',
       userName: 'Test'
     })
   }).then(r => r.json()).then(d => console.log('WHATSAPP:', d))
   ```

4. **Pega y ejecuta (Email):**
   ```javascript
   fetch('/api/send-email.js', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       to: 'tu-email@gmail.com', // TU email de prueba
       subject: 'TEST desde consola',
       message: 'Prueba de email',
       type: 'migrant',
       userName: 'Test',
       accessCode: '123456'
     })
   }).then(r => r.json()).then(d => console.log('EMAIL:', d))
   ```

5. **Respuestas esperadas:**
   ```javascript
   // ✅ WhatsApp OK:
   WHATSAPP: { success: true, messageSid: "SM...", status: "queued" }

   // ✅ Email OK:
   EMAIL: { success: true, data: { id: "..." } }

   // ❌ Error:
   WHATSAPP: { error: "Configuración de WhatsApp incompleta", success: false }
   ```

---

## 📊 TABLA DE ERRORES COMUNES

| Error | Causa | Solución |
|-------|-------|----------|
| `❌ NO DEFINIDA` en check-env | Variables faltantes en Vercel | Paso 2 |
| `"Configuración de WhatsApp incompleta"` | Variables mal configuradas | Paso 2 |
| `401 Unauthorized` | TWILIO_AUTH_TOKEN incorrecto | Verificar en Twilio Console |
| WhatsApp no llega pero API responde OK | No hiciste "join" al sandbox | Paso 3 |
| Email no llega pero API responde OK | Domain no verificado | Paso 4 |
| `Invalid API key` | RESEND_API_KEY incorrecto | Regenerar en Resend |

---

## ✅ VERIFICACIÓN FINAL

**Cuando TODO funcione, debes ver:**

1. **En check-env.js:** 4 variables con "✅ Definida"

2. **En consola del navegador (después de un pago):**
   ```
   📱 WhatsApp migrante enviado: { success: true, messageSid: "SM..." }
   📱 WhatsApp familiar enviado: { success: true, messageSid: "SM..." }
   📧 Email migrante enviado: { success: true, data: {...} }
   📧 Email familiar enviado: { success: true, data: {...} }
   ```

3. **En tu WhatsApp:** Mensaje con códigos de acceso

4. **En tu Email:** Email con códigos de acceso

---

## 🆘 SI NADA FUNCIONA

**Revisa Vercel Function Logs:**

1. Ve a: https://vercel.com/dashboard
2. Tu proyecto → Functions
3. Click en: `send-whatsapp` o `send-email`
4. Revisa los logs de las últimas ejecuciones
5. Busca líneas con "❌" o "error"
6. Comparte esos logs para ayuda específica

**O ejecuta:**
```bash
node scripts/test-communications.js
```

Y comparte el output completo.
