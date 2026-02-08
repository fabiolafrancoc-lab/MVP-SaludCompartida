# ⚡ CONFIGURACIÓN VARIABLES DE ENTORNO - VERCEL

## 📋 Variables a Configurar

Copia y pega cada una en Vercel Dashboard:

---

### 1. TWILIO_ACCOUNT_SID
```
AC433018d226a16cfde7235a8c577f3c44
```

### 2. TWILIO_AUTH_TOKEN
```
cc87d066dc8b4713ac223e9657f09831
```

### 3. TWILIO_WHATSAPP_NUMBER
```
whatsapp:+15558390419
```

### 4. RESEND_API_KEY
```
re_citjFFac_Jc1PzGUnMSigCV7tCMYxTWa3
```

---

## 🚀 INSTRUCCIONES PASO A PASO

### **PASO 1: Ir a Vercel Dashboard**
1. Abre: https://vercel.com/dashboard
2. Busca y selecciona: **MVP-SaludCompartida**

### **PASO 2: Agregar Variables**
1. Click en: **Settings** (menú izquierdo)
2. Click en: **Environment Variables**
3. Para CADA variable arriba:
   - Click en **"Add New"**
   - **Key:** (nombre de la variable, ej: TWILIO_ACCOUNT_SID)
   - **Value:** (copia el valor de arriba)
   - **Apply to:** ✅ Production ✅ Preview ✅ Development
   - Click en **"Save"**

### **PASO 3: Redeploy** ⚠️ CRÍTICO
1. Ve a: **Deployments** (menú superior)
2. Busca el último deployment (el más reciente)
3. Click en los **3 puntos (...)** a la derecha
4. Click en: **Redeploy**
5. Confirma el redeploy
6. **Espera 1-2 minutos** que termine

### **PASO 4: Verificar**
1. Abre en tu navegador:
   ```
   https://saludcompartida.app/api/check-env.js
   ```

2. Debes ver:
   ```json
   {
     "variables": {
       "TWILIO_ACCOUNT_SID": "✅ Definida (AC4330...)",
       "TWILIO_AUTH_TOKEN": "✅ Definida (cc87...)",
       "TWILIO_WHATSAPP_NUMBER": "✅ Definida (whatsapp:+15558390419)",
       "RESEND_API_KEY": "✅ Definida (re_citjF...)"
     },
     "diagnosis": ["✅ Todas las variables de entorno están configuradas correctamente."]
   }
   ```

---

## 🧪 PRUEBA FINAL

Después de verificar que todas las variables están OK, prueba el sistema:

### Abrir Consola del Navegador
1. Ve a: https://saludcompartida.app
2. Presiona: **F12** (o Cmd+Option+I en Mac)
3. Ve a la pestaña: **Console**

### Prueba WhatsApp
Pega y ejecuta:
```javascript
fetch('/api/send-whatsapp.js', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: '+5215551234567', // Cambia por TU número
    message: '🧪 TEST: Sistema WhatsApp funcionando',
    userName: 'Test User'
  })
}).then(r => r.json()).then(d => {
  console.log('📱 RESULTADO WhatsApp:', d);
  if (d.success) {
    console.log('✅ WhatsApp FUNCIONANDO!');
  } else {
    console.log('❌ Error:', d.error);
  }
})
```

### Prueba Email
Pega y ejecuta:
```javascript
fetch('/api/send-email.js', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'tu-email@gmail.com', // Cambia por TU email
    subject: '🧪 TEST: Sistema Email funcionando',
    message: 'Prueba de envío de email desde SaludCompartida',
    type: 'migrant',
    userName: 'Test User',
    accessCode: '123456'
  })
}).then(r => r.json()).then(d => {
  console.log('📧 RESULTADO Email:', d);
  if (d.success) {
    console.log('✅ Email FUNCIONANDO!');
  } else {
    console.log('❌ Error:', d.error);
  }
})
```

---

## ✅ RESULTADO ESPERADO

Si TODO está correcto verás:

**En consola del navegador:**
```
📱 RESULTADO WhatsApp: { success: true, messageSid: "SM...", status: "queued" }
✅ WhatsApp FUNCIONANDO!

📧 RESULTADO Email: { success: true, data: { id: "..." } }
✅ Email FUNCIONANDO!
```

**En tu WhatsApp:** Recibirás el mensaje de prueba

**En tu Email:** Recibirás el email de prueba

---

## ⚠️ IMPORTANTE: TWILIO SANDBOX

Si el WhatsApp NO llega después de ver "success: true":

1. Ve a: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
2. Desde tu WhatsApp, envía a: **+1 555 839 0419**
3. El mensaje: **join [código-que-aparece-en-twilio]**
4. Debes recibir confirmación
5. Repite la prueba

---

## 🎯 RESUMEN RÁPIDO

```bash
1. ✅ Ir a Vercel Dashboard
2. ✅ Settings → Environment Variables
3. ✅ Agregar las 4 variables
4. ✅ Redeploy el proyecto
5. ✅ Verificar en /api/check-env.js
6. ✅ Probar desde consola del navegador
7. ✅ Si WhatsApp no llega → Join sandbox
```

**Tiempo estimado: 5-10 minutos** ⏱️
