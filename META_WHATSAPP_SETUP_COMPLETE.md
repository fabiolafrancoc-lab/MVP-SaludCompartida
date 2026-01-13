# 📱 CONFIGURACIÓN META WHATSAPP BUSINESS API - GUÍA COMPLETA

## ✅ ¿Qué NO es Meta Automations?

Las "Automations" que ves en Meta Business Suite son **solo para respuestas automáticas** cuando un usuario te escribe primero:
- Usuario escribe "Hola" → Bot responde "Bienvenido"
- Usuario escribe "Ayuda" → Bot muestra menú

❌ **NO sirven** para enviar mensajes proactivos (códigos después del pago)

---

## ✅ Lo que SÍ necesitas: Message Templates

Para enviar códigos después del pago, necesitas **Message Templates aprobados por Meta**.

---

## 📋 PASO 1: Obtener Credenciales de Meta

### 1.1 Ve a Meta Business Suite
https://business.facebook.com/

### 1.2 Configurar WhatsApp Business
1. En el menú lateral: **Configuración** (⚙️)
2. Click en **WhatsApp** (sección Cuentas)
3. Si no tienes cuenta, click en **Agregar cuenta de WhatsApp**

### 1.3 Obtener Phone Number ID
1. En WhatsApp → **Números de teléfono**
2. Copia el **Phone Number ID** (número largo, ej: 123456789012345)
3. Guárdalo, lo necesitarás

### 1.4 Obtener Access Token
1. Ve a **Configuración** → **Herramientas del sistema** → **Configuración de API**
2. O directo: https://developers.facebook.com/apps/
3. Selecciona tu App (o crea una nueva)
4. En el panel lateral: **WhatsApp** → **Configuración**
5. Copia el **Access Token temporario**

⚠️ **IMPORTANTE**: El token temporario expira en 24 horas. Necesitas crear uno permanente:

#### Crear Access Token Permanente:
1. Ve a: https://developers.facebook.com/apps/
2. Selecciona tu app
3. **Configuración** → **Básica**
4. Copia **App ID** y **App Secret**
5. Ve a **WhatsApp** → **Configuración**
6. En "Tokens de acceso del sistema de usuario", click en **Generar token**
7. Selecciona permisos:
   - `whatsapp_business_messaging`
   - `whatsapp_business_management`
8. Copia el token (empieza con `EAAG...`)
9. Este token NO expira mientras la app esté activa

---

## 📋 PASO 2: Crear Message Templates

### 2.1 Ve a Message Templates
1. Meta Business Suite → **WhatsApp** → **Plantillas de mensajes**
2. O directo: https://business.facebook.com/wa/manage/message-templates/

### 2.2 Crear Template: Código Migrante

Click en **Crear plantilla** y usa esta configuración:

**Información básica:**
- **Nombre:** `codigo_migrante`
- **Categoría:** Utility (Utilidad)
- **Idiomas:** Spanish

**Contenido del mensaje:**
```
¡Bienvenido a SaludCompartida, {{1}}!

Tu código de acceso es: *{{2}}*

Ingresa en: https://saludcompartida.app/page3

Con este código podrás:
✅ Acceder a telemedicina 24/7
✅ Gestionar la salud de tu ser querido en México
✅ Ahorrar en medicamentos

¡Gracias por cuidar la salud de tu familia! 💙
```

**Variables:**
- `{{1}}` = Nombre del migrante
- `{{2}}` = Código de acceso

**Botones (opcional):**
- Tipo: URL
- Texto: "Ingresar ahora"
- URL: https://saludcompartida.app/page3

### 2.3 Crear Template: Código Familiar

Click en **Crear plantilla** y usa:

**Información básica:**
- **Nombre:** `codigo_familiar`
- **Categoría:** Utility
- **Idiomas:** Spanish

**Contenido:**
```
¡Hola {{1}}!

{{2}} te ha inscrito en SaludCompartida.

Tu código de acceso es: *{{3}}*

Ingresa en: https://saludcompartida.app/page3

Ahora tienes acceso a:
✅ Telemedicina 24/7
✅ Descuentos en farmacias
✅ Terapia psicológica

¡Tu familia está cuidando de tu salud! 💙
```

**Variables:**
- `{{1}}` = Nombre del familiar
- `{{2}}` = Nombre del migrante
- `{{3}}` = Código de acceso

### 2.4 Enviar para Aprobación

- Click en **Enviar** en cada template
- Meta los revisará en 24-48 horas
- Recibirás notificación cuando sean aprobados
- Estado: **Pending** → **Approved**

---

## 📋 PASO 3: Configurar Variables de Entorno

### 3.1 En Vercel

Ve a tu proyecto en Vercel → **Settings** → **Environment Variables**

Agrega estas variables:

```bash
# Meta WhatsApp Business API
META_WHATSAPP_ACCESS_TOKEN=EAAG...tu_token_aqui
META_WHATSAPP_PHONE_NUMBER_ID=123456789012345
```

### 3.2 En Local (.env.local)

Crea/edita el archivo `.env.local`:

```bash
# Meta WhatsApp Business API
META_WHATSAPP_ACCESS_TOKEN=EAAG...tu_token_aqui
META_WHATSAPP_PHONE_NUMBER_ID=123456789012345

# URL de tu app
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📋 PASO 4: Actualizar el Código

### 4.1 Cambiar send-whatsapp-codes.js

Ya creamos el nuevo archivo `send-whatsapp-codes-meta.js` que usa Meta API en vez de Twilio.

### 4.2 Actualizar process-payment.js

Cambia la referencia de:
```javascript
/api/send-whatsapp-codes
```

A:
```javascript
/api/send-whatsapp-codes-meta
```

---

## 📋 PASO 5: Probar el Sistema

### 5.1 Modo de Prueba (Development Mode)

Meta te da **5 números de prueba gratis**. Para agregar números de prueba:

1. Meta Business Suite → **WhatsApp** → **Configuración**
2. **Números de teléfono para pruebas**
3. Click en **Agregar número**
4. Introduce el número (con código de país)
5. Enviarán código de verificación por WhatsApp
6. Ingresa el código

### 5.2 Probar el Envío

1. Haz un pago de prueba en tu sitio
2. Verifica que lleguen los mensajes de WhatsApp
3. Revisa los logs en Vercel → **Functions** → Busca `send-whatsapp-codes-meta`

### 5.3 Verificar en Meta

1. Meta Business Suite → **WhatsApp** → **Información general**
2. Verás estadísticas de mensajes enviados
3. **Conversaciones** → Verás los chats enviados

---

## 📋 PASO 6: Pasar a Producción

### 6.1 Verificar Cuenta de Negocio

Meta requiere verificación para enviar a números no registrados:

1. Meta Business Suite → **Configuración de seguridad**
2. **Verificación de negocio**
3. Sube documentos:
   - Licencia comercial o registro de negocio
   - Documento de identidad del representante
   - Comprobante de domicilio del negocio

⏱️ Verificación toma 1-3 días hábiles

### 6.2 Solicitar Límites Más Altos

Por defecto empiezas con **50 conversaciones únicas/día**:

1. Meta Business Suite → **WhatsApp** → **Información general**
2. **Límites de mensajería**
3. Click en **Solicitar aumento**
4. Justifica tu uso (envío de códigos de acceso a clientes)

Con buen historial, Meta aumenta automáticamente:
- Nivel 1: 1,000 conversaciones/día
- Nivel 2: 10,000 conversaciones/día
- Nivel 3: 100,000 conversaciones/día

---

## 🎯 Resumen de lo que NO necesitas

❌ **Automations en Meta Suite** - Solo para respuestas cuando usuario escribe primero
❌ **Twilio** - Ya no lo usas
❌ **Chatbot complicado** - Solo necesitas templates aprobados
❌ **Configuración manual** - Todo automatizado con el código

---

## ✅ Checklist Final

- [ ] Obtener Phone Number ID de Meta
- [ ] Generar Access Token permanente
- [ ] Crear template `codigo_migrante` 
- [ ] Crear template `codigo_familiar`
- [ ] Esperar aprobación de templates (24-48h)
- [ ] Agregar variables de entorno en Vercel
- [ ] Actualizar `process-payment.js` para usar `send-whatsapp-codes-meta`
- [ ] Probar con números de prueba
- [ ] Verificar cuenta de negocio (para producción)
- [ ] Solicitar aumento de límites si necesario

---

## 🆘 Solución de Problemas

### Error: "Template not approved"
- Espera 24-48 horas para aprobación
- Verifica en Meta Business Suite → Templates → Estado

### Error: "Invalid phone number"
- Números deben estar en formato internacional: `+1234567890`
- Sin espacios, guiones ni paréntesis
- Incluye código de país

### Error: "Insufficient permissions"
- Verifica que el Access Token tenga permisos `whatsapp_business_messaging`
- Regenera el token si es necesario

### No llegan los mensajes
- Verifica que los templates estén aprobados
- Revisa logs en Vercel Functions
- Verifica que el número destino esté registrado (en modo desarrollo)
- Verifica límites de mensajería en Meta

---

## 📞 Soporte

**Meta Support:**
- https://developers.facebook.com/support/

**Documentación Meta WhatsApp API:**
- https://developers.facebook.com/docs/whatsapp/cloud-api/

**Tu implementación:**
- `/api/send-whatsapp-meta.js` - Endpoint base
- `/api/send-whatsapp-codes-meta.js` - Envío de códigos
