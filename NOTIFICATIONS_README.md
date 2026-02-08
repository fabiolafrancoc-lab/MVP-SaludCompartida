# 📱 Sistema de Notificaciones SMS y WhatsApp

## 🚀 Configuración Rápida

### 1. Crear cuenta en Twilio
1. Visita: https://www.twilio.com/try-twilio
2. Regístrate gratis (incluye $15 USD de crédito)
3. Verifica tu número de teléfono

### 2. Obtener credenciales
En el Dashboard de Twilio (https://console.twilio.com):
- **Account SID**: Copia el valor
- **Auth Token**: Click en "Show" y copia el valor
- **Phone Number**: Ve a "Phone Numbers" → "Manage" → "Buy a number"

### 3. Configurar WhatsApp
1. En Twilio Console → "Messaging" → "Try it out" → "Send a WhatsApp message"
2. Sigue las instrucciones para habilitar WhatsApp Sandbox
3. El número será: `whatsapp:+14155238886` (número sandbox de Twilio)

### 4. Configurar variables de entorno en Vercel
1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega estas variables:

```
TWILIO_ACCOUNT_SID=AC1234567890abcdef...
TWILIO_AUTH_TOKEN=tu_auth_token_secreto
TWILIO_PHONE_NUMBER=+14155238886
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
WHATSAPP_BUSINESS_NUMBER=5215573860842
```

---

## 💻 Cómo Usar en el Código

### Ejemplo 1: Enviar confirmación de cita de terapia

```javascript
import { sendAppointmentConfirmation } from '../lib/notifications';

// En tu función handleSubmit de therapy.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // ... tu validación existente ...
  
  // Enviar notificación
  const notification = await sendAppointmentConfirmation({
    phone: formData.phone, // Número de 10 dígitos
    firstName: formData.firstName,
    date: selectedDate.toLocaleDateString('es-MX'),
    time: selectedTime,
    type: 'psicología'
  });
  
  if (notification.success) {
    console.log('✅ Notificación enviada por', notification.method);
  } else {
    console.error('❌ Error:', notification.error);
  }
  
  // Continuar con el flujo normal...
};
```

### Ejemplo 2: Enviar código de acceso al registrarse

```javascript
import { sendAccessCode } from '../lib/notifications';

// En App.jsx después de generar códigos
const sendCodes = async () => {
  // Enviar al migrante
  await sendAccessCode(
    migrantPhone,
    migrantAccessCode,
    migrantFirstName
  );
  
  // Enviar al familiar
  await sendAccessCode(
    familyPhone,
    familyAccessCode,
    familyFirstName
  );
};
```

### Ejemplo 3: Enviar SMS directo

```javascript
import { sendSMS } from '../lib/notifications';

await sendSMS('5512345678', '¡Hola! Tu cita ha sido confirmada.');
```

### Ejemplo 4: Enviar WhatsApp directo

```javascript
import { sendWhatsAppMessage } from '../lib/notifications';

await sendWhatsAppMessage('5512345678', '¡Bienvenido a SaludCompartida!');
```

---

## 📊 Funciones Disponibles

### `sendWhatsAppMessage(phoneNumber, message)`
Envía un mensaje de WhatsApp

**Parámetros:**
- `phoneNumber` (string): Teléfono de 10 dígitos sin +52
- `message` (string): Texto del mensaje

**Retorna:** `{success: boolean, messageSid: string, error?: string}`

---

### `sendSMS(phoneNumber, message)`
Envía un SMS

**Parámetros:**
- `phoneNumber` (string): Teléfono de 10 dígitos sin +52
- `message` (string): Texto del mensaje (máximo 160 caracteres recomendado)

**Retorna:** `{success: boolean, messageSid: string, error?: string}`

---

### `sendAppointmentConfirmation(appointmentData)`
Envía confirmación de cita (WhatsApp + SMS de respaldo)

**Parámetros:**
```javascript
{
  phone: string,        // Teléfono
  firstName: string,    // Nombre
  date: string,         // Fecha formato: "11 de noviembre"
  time: string,         // Hora formato: "10:00 hrs"
  type: string          // Tipo: "telemedicina", "psicología", etc.
}
```

---

### `sendAccessCode(phone, accessCode, firstName)`
Envía código de acceso al registrarse

**Parámetros:**
- `phone` (string): Teléfono
- `accessCode` (string): Código de 6 dígitos
- `firstName` (string): Nombre del usuario

---

### `send24HourReminder(appointmentData)`
Envía recordatorio 24 horas antes

**Parámetros:**
```javascript
{
  phone: string,
  firstName: string,
  date: string,
  time: string,
  meetingLink: string   // URL de la videollamada
}
```

---

## 💰 Costos (Twilio)

- **SMS en México**: ~$0.0085 USD por mensaje
- **WhatsApp**: ~$0.005 USD por mensaje
- **Crédito gratis**: $15 USD = ~1,500 mensajes

---

## 🔒 Seguridad

- ✅ Las credenciales están en variables de entorno (nunca en el código)
- ✅ Las APIs validan los datos antes de enviar
- ✅ Logs de errores para debugging
- ✅ Respaldo automático (WhatsApp → SMS si falla)

---

## 🧪 Probar en Desarrollo

1. Crea archivo `.env.local` con tus credenciales
2. Copia las variables del `.env.example`
3. Ejecuta: `npm run dev`
4. Los mensajes se enviarán realmente (consume crédito)

---

## 📝 Notas Importantes

1. **WhatsApp Sandbox**: En desarrollo, los usuarios deben enviar un mensaje específico al número de Twilio para activar el sandbox (Twilio te dará las instrucciones)

2. **Producción**: Para producción real de WhatsApp, necesitas:
   - Cuenta de WhatsApp Business API (proceso de aprobación con Meta)
   - O usar el número sandbox de Twilio (limitado)

3. **Formato de números**:
   - Envías: `5512345678` (10 dígitos)
   - El sistema agrega automáticamente: `+52`

4. **Límites**:
   - SMS: Sin límite de envíos
   - WhatsApp Sandbox: ~200 mensajes/día
   - WhatsApp Producción: Sin límite

---

## 🆘 Soporte

¿Problemas? Verifica:
1. Variables de entorno configuradas en Vercel
2. Twilio account tiene crédito
3. Número de teléfono válido
4. Logs en Vercel Dashboard → Functions → Logs
