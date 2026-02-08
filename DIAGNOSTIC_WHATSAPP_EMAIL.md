# 🚨 DIAGNÓSTICO URGENTE: WhatsApp y Email

## Estado Actual
- ❌ WhatsApp (Twilio) NO funciona
- ❌ Emails NO llegan a todos los destinatarios

## 🔍 CHECKLIST DE VERIFICACIÓN

### 1️⃣ VARIABLES DE ENTORNO EN VERCEL (MÁS PROBABLE)

**📍 Ir a:** https://vercel.com/dashboard → Tu Proyecto → Settings → Environment Variables

**Verificar que EXISTAN estas 4 variables:**

```bash
✅ TWILIO_ACCOUNT_SID = ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
✅ TWILIO_AUTH_TOKEN = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
✅ TWILIO_WHATSAPP_NUMBER = whatsapp:+14155238886
✅ RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**¿Faltan o están mal configuradas?**
- [ ] Agregar/corregir las variables
- [ ] Aplicar a: Production, Preview, Development
- [ ] **IMPORTANTE:** Hacer REDEPLOY después de agregar variables
  - Ve a: Deployments → Click en "..." → Redeploy

---

### 2️⃣ TWILIO WHATSAPP SANDBOX (SI USAS SANDBOX)

**📍 Ir a:** https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn

**Problema:** Los números destinatarios deben unirse al sandbox primero

**✅ Solución:**
- [ ] Desde WhatsApp, envía al número de Twilio:
  ```
  join [tu-sandbox-code]
  ```
- [ ] Verificar que ambos números (USA y MEX) hayan hecho join
- [ ] Para producción: Solicitar activación de WhatsApp Business API

**💡 Cómo verificar:**
- En Twilio Console → Messaging → Try it out → WhatsApp
- Debe aparecer "Sandbox Participants" con tus números

---

### 3️⃣ RESEND DOMAIN VERIFICATION

**📍 Ir a:** https://resend.com/domains

**Problema:** Si el dominio `saludcompartida.com` no está verificado, los emails no salen

**✅ Solución:**
- [ ] Verificar que el dominio esté marcado como "Verified" ✅
- [ ] Si NO está verificado:
  - [ ] Agregar registros DNS (SPF, DKIM, DMARC) que Resend te muestra
  - [ ] Esperar propagación (puede tardar 24-48h)
- [ ] **Solución temporal:** Usa el dominio sandbox:
  ```javascript
  from: 'SaludCompartida <onboarding@resend.dev>'
  ```

**💡 Cómo verificar:**
- En Resend dashboard debe decir: ✅ saludcompartida.com (Verified)
- Si dice "Pending" o "Failed", los emails no saldrán

---

### 4️⃣ VERCEL FUNCTION LOGS

**📍 Ir a:** https://vercel.com/dashboard → Tu Proyecto → Functions

**Buscar errores en:**
- [ ] `send-whatsapp` function
- [ ] `send-email` function

**Errores comunes:**
```
❌ 500: "Configuración de WhatsApp incompleta" → Faltan variables de entorno
❌ 401: Twilio authentication failed → TWILIO_AUTH_TOKEN incorrecto
❌ 400: Resend error → Domain no verificado o API key incorrecta
```

**💡 Cómo verificar:**
- Click en la función → Ver logs recientes
- Buscar timestamps que coincidan con intentos de envío

---

### 5️⃣ PRUEBA RÁPIDA EN PRODUCCIÓN

**Desde la consola del navegador en saludcompartida.app:**

```javascript
// Prueba WhatsApp
fetch('/api/send-whatsapp.js', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: '+521234567890',
    message: 'TEST',
    userName: 'Test'
  })
}).then(r => r.json()).then(console.log)

// Prueba Email
fetch('/api/send-email.js', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'test@example.com',
    subject: 'TEST',
    message: 'TEST',
    type: 'migrant'
  })
}).then(r => r.json()).then(console.log)
```

**Respuestas esperadas:**
```javascript
// ✅ Success WhatsApp:
{ success: true, messageSid: "SM...", status: "queued" }

// ✅ Success Email:
{ success: true, data: { id: "..." } }

// ❌ Error:
{ error: "Configuración de WhatsApp incompleta", success: false }
```

---

## 🎯 ORDEN DE ACCIÓN RECOMENDADO

1. **PRIMERO:** Verificar variables de entorno en Vercel (#1)
   - Si faltan → Agregar → Redeploy
   - **Esto soluciona el 90% de los problemas**

2. **SEGUNDO:** Si WhatsApp sigue fallando → Verificar Twilio Sandbox (#2)
   - Hacer "join" desde ambos números

3. **TERCERO:** Si emails siguen fallando → Verificar Resend Domain (#3)
   - Si no está verificado, usar dominio sandbox temporal

4. **CUARTO:** Revisar logs de Vercel para ver errores específicos (#4)

5. **QUINTO:** Hacer prueba manual desde consola (#5)

---

## 🆘 SI NADA FUNCIONA

1. **Captura de pantalla de:**
   - Variables de entorno en Vercel
   - Twilio Console (ocultar tokens)
   - Resend Domain status
   - Vercel Function Logs

2. **Ejecuta el script de diagnóstico:**
   ```bash
   node scripts/test-communications.js
   ```

3. **Comparte los resultados** para debug avanzado

---

## ✅ CUANDO FUNCIONE

**Deberías ver en la consola del navegador:**
```
📱 WhatsApp migrante enviado: { success: true, messageSid: "SM..." }
📱 WhatsApp familiar enviado: { success: true, messageSid: "SM..." }
📧 Email migrante enviado: { success: true, data: {...} }
📧 Email familiar enviado: { success: true, data: {...} }
```

**Y recibir:**
- 2 mensajes de WhatsApp (uno en cada número)
- 2 emails (uno en cada dirección)
- Ambos con los códigos de acceso
