# Variables de Entorno Requeridas para Producción

## ⚠️ IMPORTANTE: Configurar en Vercel

Para que los códigos de acceso se envíen automáticamente por WhatsApp y Email, necesitas configurar las siguientes variables de entorno en tu proyecto de Vercel.

### 📍 Dónde Configurar
1. Ve a: https://vercel.com/dashboard
2. Selecciona tu proyecto `MVP-SaludCompartida`
3. Settings → Environment Variables
4. Agrega cada variable con su valor correspondiente
5. Aplica a: **Production, Preview, and Development**

---

## 🔐 Variables Requeridas

### 1. Twilio (WhatsApp)

```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- **Dónde obtenerla**: https://console.twilio.com
- **Descripción**: Account SID de tu cuenta Twilio
- **Formato**: Empieza con "AC" seguido de 32 caracteres

```bash
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- **Dónde obtenerla**: https://console.twilio.com
- **Descripción**: Auth Token de tu cuenta Twilio
- **Formato**: 32 caracteres alfanuméricos

```bash
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```
- **Dónde obtenerla**: https://console.twilio.com → WhatsApp Sandbox
- **Descripción**: Tu número de WhatsApp de Twilio
- **Formato**: `whatsapp:+1XXXXXXXXXX`
- **Nota**: Si usas sandbox, los usuarios deben enviar "join [código]" primero

---

### 2. Resend (Email)

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- **Dónde obtenerla**: https://resend.com/api-keys
- **Descripción**: API Key de Resend para enviar emails
- **Formato**: Empieza con "re_" seguido de caracteres alfanuméricos

---

## ✅ Verificación

### Después de configurar las variables:

1. **Redeploy el proyecto**:
   - En Vercel: Deployments → Click en los 3 puntos del último deploy → Redeploy
   - O haz un push a tu repositorio para trigger auto-deploy

2. **Verifica las variables**:
   ```bash
   # En Vercel Function Logs, deberías ver:
   - TWILIO_ACCOUNT_SID: Definido ✅
   - TWILIO_AUTH_TOKEN: Definido ✅
   - TWILIO_WHATSAPP_NUMBER: Definido ✅
   - RESEND_API_KEY: Definido ✅
   ```

3. **Prueba el flujo completo**:
   - Completa un pago en www.saludcompartida.app
   - Verifica que recibes WhatsApp en ambos números
   - Verifica que recibes Email en ambas direcciones
   - Revisa la consola del navegador para logs:
     ```
     📱 WhatsApp migrante enviado: { success: true, messageSid: "..." }
     📱 WhatsApp familiar enviado: { success: true, messageSid: "..." }
     📧 Email migrante enviado: { success: true, data: "..." }
     📧 Email familiar enviado: { success: true, data: "..." }
     ```

---

## 🚨 Troubleshooting

### WhatsApp no llega:

1. **Sandbox de Twilio**:
   - Si usas sandbox, el número debe enviar primero:
     ```
     join [tu-sandbox-name]
     ```
   - Para producción, activa WhatsApp Business API

2. **Formato de número**:
   - USA: `+1XXXXXXXXXX` (10 dígitos después del +1)
   - México: `+52XXXXXXXXXX` (10 dígitos después del +52)
   - Verifica que `phoneId` en localStorage tenga el formato correcto

3. **Vercel Function Logs**:
   - Ve a Vercel → Functions → send-whatsapp
   - Revisa errores 400/401/500

### Email no llega:

1. **Domain Verification**:
   - Ve a Resend dashboard
   - Verifica que el dominio `saludcompartida.com` esté verificado
   - Si no, agrega los registros DNS

2. **Spam Folder**:
   - Revisa carpeta de spam
   - Marca como "No spam" para futuros emails

3. **Rate Limits**:
   - Free tier de Resend: 100 emails/día
   - Si excedes, actualiza plan

---

## 📋 Checklist Final

- [ ] Variables configuradas en Vercel
- [ ] Proyecto redeployado
- [ ] Twilio sandbox configurado (si aplica)
- [ ] Resend domain verificado
- [ ] Prueba de pago completada
- [ ] WhatsApp recibido en ambos números
- [ ] Email recibido en ambas direcciones
- [ ] Console logs muestran success: true
- [ ] Códigos funcionan en page3.jsx

---

## 📞 Soporte

Si después de configurar todo sigues sin recibir los mensajes:

1. Revisa Vercel Function Logs
2. Revisa Twilio Console → Logs
3. Revisa Resend Dashboard → Logs
4. Comparte los logs para debug
