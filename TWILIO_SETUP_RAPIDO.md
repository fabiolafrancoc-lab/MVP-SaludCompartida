# 🚀 GUÍA RÁPIDA: Configurar Twilio en 10 minutos

## ✅ PASO 1: Crear cuenta (3 minutos)

1. **Ir a**: https://www.twilio.com/try-twilio
2. **Llenar el formulario**:
   - Email
   - Contraseña
   - Nombre
3. **Verificar teléfono**: +52 998 492 2702
4. **Recibes**: $15 USD gratis (~1,500 mensajes)

---

## ✅ PASO 2: Obtener credenciales (2 minutos)

Una vez en el Dashboard (https://console.twilio.com):

### Account SID y Auth Token:
En la pantalla principal verás:

```
Account Info
├── Account SID: ACxxxxxxxxxxxxxxxxxx  ← COPIAR ESTO
└── Auth Token: [Show] ← Click "Show" y COPIAR
```

**Guárdalos en un lugar seguro** (los necesitarás en el Paso 4)

---

## ✅ PASO 3: Obtener número de teléfono (3 minutos)

### Opción A: Número de prueba (GRATIS)
1. En el sidebar → **# Phone Numbers** → **Manage** → **Buy a number**
2. **Country**: United States
3. **Capabilities**: Marcar ✅ SMS y ✅ MMS
4. Click **Search**
5. Elige cualquier número
6. Click **Buy** (es gratis para trial)

Tu número será algo como: `+1 415 523 8886`

### Opción B: Ya tienes número de Twilio
Usa el que ya tienes configurado.

---

## ✅ PASO 4: Configurar en Vercel (2 minutos)

1. **Ir a**: https://vercel.com/dashboard
2. **Seleccionar proyecto**: prototipo-saludcompartida
3. **Settings** → **Environment Variables**
4. **Agregar estas 4 variables**:

```env
Name: TWILIO_ACCOUNT_SID
Value: ACxxxxxxxxxxxxxxxxxx (del Paso 2)

Name: TWILIO_AUTH_TOKEN  
Value: xxxxxxxxxxxxxx (del Paso 2)

Name: TWILIO_PHONE_NUMBER
Value: +14155238886 (del Paso 3)

Name: TWILIO_WHATSAPP_NUMBER
Value: whatsapp:+14155238886 (mismo número con "whatsapp:")
```

5. Click **Save** en cada una

---

## ✅ PASO 5: Redeploy (1 minuto)

En Vercel:
1. **Deployments** (tab superior)
2. Click en los **3 puntos (...)** del último deployment
3. **Redeploy**
4. Esperar 2-3 minutos

---

## 🎉 ¡LISTO! Ahora funciona

### ✅ Qué hace automáticamente:

**Cuando alguien se registra:**
- 📱 Envía código de acceso por WhatsApp/SMS al migrante
- 📱 Envía código de acceso por WhatsApp/SMS al familiar en México

**Cuando alguien agenda cita de terapia:**
- 📱 Envía confirmación por WhatsApp/SMS al paciente
- 📋 Incluye: fecha, hora, tipo de sesión
- ⏰ Recuerda que deben contactarlo 24 hrs antes

**Sistema de respaldo:**
- Intenta WhatsApp primero
- Si falla, envía SMS automáticamente
- Nunca pierdes una notificación

---

## 🧪 PROBAR que funciona

### Desde la consola del navegador (Dev Tools):

```javascript
// Ir a tu prototipo en el navegador
// Abrir consola (F12)

// Probar envío de WhatsApp
fetch('/api/send-whatsapp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: '9984922702',
    message: '¡Hola! Prueba de WhatsApp desde SaludCompartida'
  })
}).then(r => r.json()).then(console.log);

// Probar envío de SMS
fetch('/api/send-sms', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: '9984922702',
    message: '¡Hola! Prueba de SMS desde SaludCompartida'
  })
}).then(r => r.json()).then(console.log);
```

Si ves en la consola:
```json
{
  "success": true,
  "messageSid": "SMxxxxxxxxxx",
  "status": "queued"
}
```

**✅ ¡Funcionó!** Revisa tu teléfono.

---

## ⚠️ IMPORTANTE: WhatsApp Sandbox

Para **WhatsApp en desarrollo**, los usuarios deben:

1. **Enviar un mensaje** al número sandbox de Twilio
2. **Texto exacto**: (Twilio te lo dirá en el dashboard)
   Ejemplo: `join <codigo-sandbox>`
3. **A**: +1 415 523 8886 (número sandbox)

**Para producción real de WhatsApp:**
- Necesitas WhatsApp Business API (requiere aprobación de Meta)
- O usar el número +52 998 492 2702 directamente si ya está verificado

Por ahora, **SMS funciona 100% sin restricciones**.

---

## 💰 Costos

Con tu crédito gratis de $15 USD:

| Servicio | Costo | Cantidad con $15 |
|----------|-------|------------------|
| SMS México | ~$0.01 USD | ~1,500 mensajes |
| WhatsApp | ~$0.005 USD | ~3,000 mensajes |

**Nota**: El sistema intenta WhatsApp primero (más barato), luego SMS.

---

## 🆘 ¿Problemas?

### "Unauthorized" o "Auth Token invalid"
- Verifica que copiaste bien el Account SID y Auth Token
- Asegúrate de haber guardado en Vercel
- Haz redeploy después de agregar variables

### "Invalid phone number"
- Verifica formato: +52 seguido de 10 dígitos
- Ejemplo correcto: +529984922702

### "Message not sent"
- Verifica que tu cuenta Twilio tiene crédito
- Revisa en Twilio Console → Monitor → Logs

### WhatsApp no llega
- En desarrollo, usa SMS (funciona sin configuración extra)
- Para WhatsApp, sigue proceso de sandbox o solicita WhatsApp Business API

---

## 📊 Monitorear mensajes enviados

En Twilio Console:
- **Monitor** → **Logs** → **Messaging**
- Ahí ves todos los SMS/WhatsApp enviados
- Status: queued → sent → delivered

---

## 🎯 Próximos pasos

Una vez configurado:
1. **Registra un usuario** en el prototipo
2. **Verifica que llegue el código** por SMS
3. **Agenda una cita** de terapia
4. **Verifica la confirmación** por SMS

**Todo funciona automáticamente**, sin código adicional.

---

## 📞 Soporte

Si algo no funciona:
1. Verifica los logs en: https://vercel.com → Functions → Logs
2. Verifica Twilio logs: https://console.twilio.com → Monitor
3. Abre la consola del navegador y busca errores

**¡Eso es todo! Tu sistema de notificaciones está listo 🎉**
