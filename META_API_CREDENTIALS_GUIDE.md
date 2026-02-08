# 📱 CÓMO OBTENER CREDENCIALES DE META WHATSAPP API

## 🎯 NECESITAS 2 COSAS:

1. **Phone Number ID** (ID del número de WhatsApp)
2. **Access Token** (Token de acceso)

---

## 📋 PASO 1: OBTENER PHONE NUMBER ID

### Opción A: Desde WhatsApp Manager
1. Ve a: https://business.facebook.com/wa/manage/phone-numbers/
2. Click en tu número de WhatsApp Business
3. Verás **"Phone number ID"** en la parte superior
4. Copia ese número (ej: 123456789012345)

### Opción B: Desde la App de WhatsApp
1. Ve a: https://developers.facebook.com/apps/
2. Selecciona tu app
3. Click en **"WhatsApp"** → **"API Setup"** en el menú izquierdo
4. En "Phone number" verás el **Phone number ID** debajo del número
5. Cópialo

---

## 🔑 PASO 2: OBTENER ACCESS TOKEN

### Método 1: Token Temporal (Para Pruebas - 24 horas)

1. Ve a: https://developers.facebook.com/apps/
2. Selecciona tu app
3. Click en **"WhatsApp"** → **"API Setup"**
4. En "Temporary access token" verás un token que empieza con **EAA...**
5. Click en **"Copy"**

⚠️ **NOTA:** Este token expira en 24 horas. Úsalo solo para probar.

---

### Método 2: Token Permanente (Para Producción - Recomendado)

#### 2.1 Crear System User

1. Ve a: https://business.facebook.com/settings/system-users
2. Click en **"Add"** (Agregar)
3. Nombre: "SaludCompartida API"
4. Role: **Admin**
5. Click en **"Create System User"**

#### 2.2 Asignar Permisos

1. Click en el System User que acabas de crear
2. Click en **"Assign Assets"** (Asignar Activos)
3. Selecciona **"Apps"**
4. Busca tu app de WhatsApp
5. Marca la casilla y selecciona **"Full Control"**
6. Click en **"Save Changes"**

#### 2.3 Generar Token Permanente

1. Click en tu System User
2. Click en **"Generate New Token"**
3. Selecciona tu app
4. En "Available Permissions" marca:
   - ✅ `whatsapp_business_messaging`
   - ✅ `whatsapp_business_management`
5. Click en **"Generate Token"**
6. **¡IMPORTANTE!** Copia el token AHORA (empieza con EAA...)
7. Guárdalo en un lugar seguro (solo se muestra una vez)

---

## ✅ VERIFICAR QUE FUNCIONAN

### Prueba Rápida con cURL:

```bash
# Reemplaza con tus valores:
PHONE_NUMBER_ID="tu_phone_number_id_aqui"
ACCESS_TOKEN="tu_token_aqui"
TO_NUMBER="5215512345678"  # Tu número de prueba

curl -X POST \
  "https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "messaging_product": "whatsapp",
    "to": "'"${TO_NUMBER}"'",
    "type": "text",
    "text": {
      "body": "Prueba desde Meta API - Salud Compartida"
    }
  }'
```

Si funciona, verás:
```json
{
  "messaging_product": "whatsapp",
  "contacts": [{"input": "5215512345678", "wa_id": "5215512345678"}],
  "messages": [{"id": "wamid.XXX..."}]
}
```

---

## 📝 FORMATO FINAL

Una vez que tengas ambos, dámelos así:

```
META_PHONE_NUMBER_ID=123456789012345
META_ACCESS_TOKEN=EAA...
```

---

## 🆘 PROBLEMAS COMUNES

### ❌ "Invalid OAuth access token"
- Tu token expiró (usa token permanente)
- Copiaste mal el token
- Regenera el token

### ❌ "Invalid phone number"
- Usa formato internacional sin + (ej: 5215512345678)
- No incluyas guiones ni espacios

### ❌ "(#131030) Recipient phone number not in allowed list"
- Tu número no está verificado
- Ve a WhatsApp Manager → Add Phone Number
- O pide a Meta que apruebe tu app para producción

---

## 🎯 UNA VEZ QUE TENGAS LOS 2 VALORES:

Dámelos y yo:
1. ✅ Los agrego a tu .env
2. ✅ Los configuro en Vercel
3. ✅ Pruebo que funcionen
4. ✅ Integro con tu sistema de registro
5. ✅ Desplegamos a producción

**¿Listos los valores?** 🚀
