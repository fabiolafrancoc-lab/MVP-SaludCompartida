# 🚀 ACTIVAR WHATSAPP BUSINESS API - GUÍA COMPLETA

## ✅ Beneficios de WhatsApp Business API

- ✅ **Sin sandbox**: Los mensajes llegan a CUALQUIER número
- ✅ **Sin "join"**: Los clientes reciben mensajes inmediatamente
- ✅ **Profesional**: Número verificado de negocio
- ✅ **Escalable**: Sin límite de destinatarios
- ✅ **Cumple tu promesa**: Códigos por WhatsApp al instante

---

## 📋 REQUISITOS PREVIOS

1. **Cuenta de Twilio** ✅ (Ya la tienes)
2. **Número de teléfono para el negocio**
   - Puede ser un número nuevo
   - O un número existente (se migrará a Twilio)
3. **Perfil de negocio verificado**
   - Nombre del negocio: SaludCompartida
   - Sitio web: https://saludcompartida.app
   - Descripción del servicio
4. **Facebook Business Manager** (Twilio te ayuda a crear)

---

## 🔧 PROCESO DE ACTIVACIÓN

### **OPCIÓN 1: Twilio WhatsApp Business API (RECOMENDADA)**

#### Paso 1: Solicitar Acceso
1. Ve a: https://console.twilio.com/us1/develop/sms/whatsapp
2. Click en: **"Request Access to WhatsApp Business API"**
3. O busca: **"Upgrade from Sandbox"**

#### Paso 2: Información del Negocio
Completa el formulario con:

```
Business Name: SaludCompartida
Business Website: https://saludcompartida.app
Business Description: 
  "Plataforma de telemedicina que conecta familias en USA con 
  sus seres queridos en México. Ofrecemos acceso a doctores 24/7, 
  descuentos en farmacias y terapia psicológica."

Industry: Healthcare / Telemedicine

Use Case: 
  "Envío de códigos de acceso, confirmaciones de citas médicas, 
  recordatorios de medicamentos y notificaciones de servicio."

Monthly Volume: 100-1,000 mensajes/mes (para empezar)

Business Address: [Tu dirección de negocio]

Business Phone: [Tu número de contacto]
```

#### Paso 3: Verificación de Identidad
- Twilio puede pedir:
  - Documento de identidad (ID/Pasaporte)
  - Comprobante de domicilio del negocio
  - Business registration (si aplica)

#### Paso 4: Facebook Business Manager
- Twilio te guiará para:
  - Crear cuenta de Facebook Business Manager (si no tienes)
  - Conectar con WhatsApp Business API
  - Verificar perfil de negocio

#### Paso 5: Plantillas de Mensajes (Message Templates)
Debes crear y aprobar plantillas para:

**Template 1: Código de Acceso Migrante**
```
Name: codigo_acceso_migrante
Category: UTILITY
Language: Español

Message:
🎉 ¡Bienvenido a SaludCompartida, {{1}}!

Tu código de acceso es: *{{2}}*

Ingresa en: https://saludcompartida.app/registro

Con este código podrás:
✅ Acceder a telemedicina 24/7
✅ Gestionar la salud de tu ser querido en México
✅ Ahorrar en medicamentos

¡Gracias por cuidar la salud de tu familia! 💙

Variables: {{1}} = Nombre, {{2}} = Código
```

**Template 2: Código de Acceso Familiar**
```
Name: codigo_acceso_familiar
Category: UTILITY
Language: Español

Message:
🎉 ¡Hola {{1}}!

{{2}} te ha inscrito en SaludCompartida.

Tu código de acceso es: *{{3}}*

Ingresa en: https://saludcompartida.app/registro

Ahora tienes acceso a:
✅ Telemedicina 24/7
✅ Descuentos en farmacias
✅ Terapia psicológica

¡Tu familia está cuidando de tu salud! 💙

Variables: {{1}} = Nombre, {{2}} = Nombre Migrante, {{3}} = Código
```

#### Paso 6: Aprobación
- **Tiempo**: 1-3 días hábiles
- Facebook revisa y aprueba las plantillas
- Twilio activa tu cuenta de WhatsApp Business API

#### Paso 7: Configuración en Código
Una vez aprobado, Twilio te dará un nuevo número de WhatsApp.

Actualizar en Vercel:
```bash
TWILIO_WHATSAPP_NUMBER = whatsapp:+[tu-nuevo-numero]
```

---

### **OPCIÓN 2: Twilio Conversations API (Alternativa)**

Si WhatsApp Business API tarda mucho o es rechazado:

1. **Twilio Conversations**: Integra SMS, WhatsApp y otros canales
2. **Más flexible**: Menos restricciones
3. **Setup**: Similar a WhatsApp Business API

---

### **OPCIÓN 3: Proveedor Alternativo (Meta/360dialog)**

Si Twilio no aprueba o quieres más control:

**360dialog** (Partner oficial de Meta):
- https://www.360dialog.com
- Proceso similar
- Integración con Twilio
- ~$0.005 por mensaje

**Meta WhatsApp Business API Direct**:
- https://business.facebook.com/wa/manage/home
- Requiere más setup técnico
- Gratis (solo pagas por mensajes)

---

## 💰 COSTOS

### Twilio WhatsApp Business API:
- **Setup**: Gratis
- **Mensajes entrantes**: Gratis
- **Mensajes salientes**:
  - Utility messages (como códigos): $0.005 USD/mensaje
  - Marketing messages: $0.013 USD/mensaje
  - Authentication (OTP): $0.005 USD/mensaje

### Ejemplo de Costos:
- 100 clientes/mes = 200 mensajes (migrante + familiar)
- Costo: 200 × $0.005 = **$1 USD/mes**
- 1,000 clientes/mes = 2,000 mensajes
- Costo: 2,000 × $0.005 = **$10 USD/mes**

¡Muy económico! 🎉

---

## 🔄 ACTUALIZAR EL CÓDIGO

Una vez aprobado, solo necesitas actualizar las plantillas:

### Archivo: `/api/send-whatsapp-codes.js`

```javascript
// ANTES (texto libre - solo sandbox):
const migrantMessage = await client.messages.create({
  from: whatsappFrom,
  to: `whatsapp:${migrantPhone}`,
  body: `🎉 ¡Bienvenido a SaludCompartida, ${migrantName}!...`
});

// DESPUÉS (con template aprobado - Business API):
const migrantMessage = await client.messages.create({
  from: whatsappFrom,
  to: `whatsapp:${migrantPhone}`,
  contentSid: 'HX...',  // Template SID de Twilio
  contentVariables: JSON.stringify({
    '1': migrantName,
    '2': migrantCode
  })
});
```

---

## 📱 MIENTRAS ESPERAS APROBACIÓN

### Solución Temporal: Solo Email (100% funcional)

Desactiva WhatsApp temporalmente:

1. **Comentar código** en `/api/send-whatsapp-codes.js`:
```javascript
// DESHABILITAR WHATSAPP TEMPORALMENTE
// const migrantMessage = await client.messages.create({...});
console.log('WhatsApp deshabilitado - Usando solo email');
```

2. **Actualizar mensaje de confirmación**:
```javascript
"✅ Códigos enviados por email. Revisa tu bandeja de entrada."
```

3. **Emails funcionan al 100%**: Los clientes reciben códigos por email

---

## ⏱️ TIMELINE

| Etapa | Tiempo |
|-------|--------|
| Solicitar acceso | 5 minutos |
| Revisión de Twilio | 24-48 horas |
| Crear plantillas | 15 minutos |
| Aprobación de Facebook | 1-3 días |
| Configurar código | 30 minutos |
| **TOTAL** | **3-5 días hábiles** |

---

## 🎯 ACCIÓN INMEDIATA

### **HOY (5 minutos):**
1. Ve a: https://console.twilio.com/us1/develop/sms/whatsapp
2. Click en: **"Request Access to WhatsApp Business API"**
3. Completa formulario con info de SaludCompartida
4. Envía solicitud

### **MIENTRAS ESPERAS:**
- Desactiva WhatsApp temporalmente
- Usa solo email (funciona perfecto)
- En 3-5 días: WhatsApp Business API listo ✅

---

## 📞 SOPORTE

**Twilio Support:**
- https://support.twilio.com
- Chat en vivo en el console
- Email: support@twilio.com

**Documentación:**
- https://www.twilio.com/docs/whatsapp
- https://www.twilio.com/docs/whatsapp/api

---

## ✅ CHECKLIST

- [ ] Solicitar acceso a WhatsApp Business API en Twilio
- [ ] Preparar información del negocio (nombre, sitio, descripción)
- [ ] Crear cuenta Facebook Business Manager (si no tienes)
- [ ] Crear plantillas de mensajes (códigos de acceso)
- [ ] Esperar aprobación (3-5 días)
- [ ] Actualizar TWILIO_WHATSAPP_NUMBER en Vercel
- [ ] Actualizar código para usar templates
- [ ] Probar con cliente real
- [ ] ¡Lanzar! 🚀

---

¿Quieres que te ayude a:
1. Llenar el formulario de solicitud
2. Crear las plantillas de mensaje
3. Desactivar WhatsApp temporalmente mientras esperas
