# ✅ Checklist para Producción - SaludCompartida

## 🔐 Variables de Entorno en Vercel (CRÍTICO)

Ve a: https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida/settings/environment-variables

### Twilio (WhatsApp)
- [ ] `TWILIO_ACCOUNT_SID` = AC433018d226a16cfde7235a8c577f3c44
- [ ] `TWILIO_AUTH_TOKEN` = cc87d066dc8b4713ac223e9657f09831
- [ ] `TWILIO_WHATSAPP_NUMBER` = whatsapp:+14155238886

### Resend (Email)
- [ ] `RESEND_API_KEY` = [tu API key de saludcompartida.com]

---

## 📱 Configuración de WhatsApp Sandbox (Twilio)

⚠️ **IMPORTANTE**: Para que WhatsApp funcione, cada número debe unirse al sandbox primero.

### Paso 1: Obtener el código de sandbox
1. Ve a: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
2. Busca el mensaje que dice: "Send `join [palabra]` to +1 415 523 8886"
3. Copia esa **palabra** (ejemplo: "join shadow-army")

### Paso 2: Unir números al sandbox

**Tu número (USA):**
1. Abre WhatsApp
2. Envía mensaje a: `+1 415 523 8886`
3. Mensaje: `join [palabra]` (usar la palabra de tu sandbox)
4. Deberías recibir confirmación

**Números de prueba (México):**
- Repetir el mismo proceso con cada número que quieras probar

### Paso 3: WhatsApp Business API (Producción Real)
Para ventas masivas sin restricciones de sandbox:
1. Ve a: https://console.twilio.com/us1/develop/sms/whatsapp/senders
2. Solicita aprobación para WhatsApp Business API
3. Proceso toma 1-2 semanas
4. Costo: ~$5/mes + $0.005 por mensaje

---

## 📧 Configuración de Emails (Resend)

### Verificar dominio saludcompartida.com
1. Ve a: https://resend.com/domains
2. Verifica que `saludcompartida.com` tenga status: ✅ **Verified**
3. Si no está verificado:
   - Agrega registros DNS (te los da Resend)
   - Espera 24-48 horas para propagación

### Crear emails de recepción
Si quieres recibir en `contact@` y `ffranco@`:
1. Configura forwarding en tu proveedor de dominio (GoDaddy, Namecheap, etc.)
2. O usa Gmail/Outlook con dominio personalizado

---

## 🧪 Flujo de Prueba Completo

### Antes de hacer ventas reales:

1. **Prueba de registro:**
   - [ ] Completa registro con datos reales
   - [ ] Verifica que llegue a página de pago

2. **Prueba de pago:**
   - [ ] Ingresa tarjeta de prueba o real
   - [ ] Completa el pago
   - [ ] Verifica página de confirmación

3. **Verificar códigos generados:**
   - [ ] Abre consola del navegador (F12)
   - [ ] Busca logs que digan:
     ```
     📱 Enviando WhatsApp a migrante: +1XXXXXXXXXX
     ✅ WhatsApp migrante: { success: true, ... }
     📱 Enviando WhatsApp a familiar: +52XXXXXXXXXX
     ✅ WhatsApp familiar: { success: true, ... }
     📧 Enviando email a migrante: usuario@email.com
     ✅ Email migrante: { success: true, ... }
     📧 Enviando notificaciones internas...
     ✅ Notificación a contact@: { success: true, ... }
     ✅ Notificación a ffranco@: { success: true, ... }
     ```

4. **Verificar recepción:**
   - [ ] WhatsApp llegó al migrante (USA)
   - [ ] WhatsApp llegó al familiar (México)
   - [ ] Email llegó al migrante
   - [ ] Email llegó a contact@saludcompartida.com
   - [ ] Email llegó a ffranco@saludcompartida.com

5. **Probar activación de código:**
   - [ ] Click en "¿Tienes tu Código?" en landing
   - [ ] Ingresar código recibido
   - [ ] Verifica auto-fill de datos
   - [ ] Completa activación
   - [ ] Accede al dashboard (page4)

6. **Probar servicios:**
   - [ ] Click en Telemedicina → verifica funciona
   - [ ] Click en Farmacias → verifica mapa
   - [ ] Click en Terapia → verifica agenda
   - [ ] Click en Mis Ahorros → verifica cálculo

---

## 🚨 Problemas Comunes y Soluciones

### WhatsApp no llega

**Problema 1: Variables de entorno**
- Verifica en Vercel que las 3 variables de Twilio estén configuradas
- Haz un redeploy después de agregar variables

**Problema 2: Sandbox no configurado**
- Los números deben enviar "join [palabra]" primero
- Verifica en Twilio Console → Messaging → Logs

**Problema 3: Formato de número incorrecto**
- USA: debe ser `+1XXXXXXXXXX` (10 dígitos)
- México: debe ser `+52XXXXXXXXXX` (10 dígitos)
- Sin espacios ni guiones

### Emails no llegan

**Problema 1: Dominio no verificado**
- Verifica status en Resend
- Revisa registros DNS

**Problema 2: Emails van a spam**
- Pide al usuario revisar spam
- Marca como "No spam" para futuros emails

**Problema 3: Rate limit**
- Free tier: 100 emails/día
- Si excedes, actualiza plan en Resend

### Errores en consola

**Si ves errores 401/403:**
- API keys incorrectas o no configuradas
- Verifica variables de entorno en Vercel

**Si ves errores 500:**
- Error en el servidor de Twilio/Resend
- Verifica logs de Functions en Vercel

---

## 📊 Monitoreo en Producción

### Vercel Function Logs
https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida/logs

Filtra por:
- `send-whatsapp` → Ver intentos de envío de WhatsApp
- `send-email` → Ver intentos de envío de email

### Twilio Console
https://console.twilio.com/us1/monitor/logs/messages

- Ver todos los WhatsApp enviados
- Status: delivered, failed, undelivered
- Códigos de error si fallan

### Resend Dashboard
https://resend.com/emails

- Ver todos los emails enviados
- Opens, clicks, bounces
- Errores de entrega

---

## 💰 Costos Estimados (Mensual)

### Free Tier (Primeros meses)
- Vercel: $0 (hasta 100GB bandwidth)
- Resend: $0 (hasta 100 emails/día = 3,000/mes)
- Twilio Sandbox: $0 (ilimitado pero con restricciones)

### Producción Real (100 suscripciones/mes)
- Vercel: $0 (aún bajo el límite)
- Resend: $20/mes (hasta 50,000 emails)
- Twilio WhatsApp API: $5/mes + $1 (200 mensajes × $0.005)
- **Total: ~$26/mes**

### Escala (1,000 suscripciones/mes)
- Vercel: $20/mes (Pro plan)
- Resend: $20/mes
- Twilio: $5 + $10 (2,000 mensajes)
- **Total: ~$55/mes**

---

## 🎯 Próximos Pasos

1. [ ] **Verificar variables de entorno** en Vercel
2. [ ] **Configurar WhatsApp sandbox** con tu número
3. [ ] **Hacer prueba completa** de pago
4. [ ] **Verificar recepción** de todos los mensajes
5. [ ] **Solicitar WhatsApp Business API** (1-2 semanas)
6. [ ] **Configurar Stripe real** (cuando estés listo)
7. [ ] **Crear dominio personalizado** para emails

---

## 📞 Soporte

Si algo no funciona:
1. Revisa consola del navegador (F12)
2. Revisa Vercel Function Logs
3. Revisa Twilio/Resend dashboards
4. Comparte screenshots de errores

---

## ✅ Listo para Producción

Cuando hayas verificado:
- ✅ Variables de entorno configuradas
- ✅ WhatsApp sandbox activo y funcionando
- ✅ Emails llegando a usuarios
- ✅ Notificaciones llegando a contact@ y ffranco@
- ✅ Códigos funcionando en page3
- ✅ Dashboard accesible

**¡Estás listo para hacer ventas reales!** 🚀
