# 🔥 USAR META DIRECTA - ABANDONAR WATI.IO

## Por qué abandonar WATI:
- ❌ WATI muestra "not connected" aunque Meta está aprobado
- ❌ Bug conocido de WATI con WhatsApp Business API
- ❌ Costo adicional innecesario ($39-99/mes)
- ✅ Meta API funciona directo (ya tienes aprobación)

---

## 🎯 PASO 1: Obtener Credenciales de Meta

### 1. Ve a Meta Business Suite
https://business.facebook.com/

### 2. Obtén tu ACCESS TOKEN

#### a) Crear System User
1. Business Settings → System Users
2. "Add" → Nombre: "SaludCompartida API"
3. Role: Admin

#### b) Asignar Assets
1. Click en el System User recién creado
2. "Add Assets" → WhatsApp Accounts
3. Selecciona tu WABA (el que ya está aprobado)
4. Permissions: "Full control"

#### c) Generate Token
1. Click "Generate New Token"
2. App: [Tu app de WhatsApp]
3. Permissions: Selecciona:
   - ✅ `whatsapp_business_messaging`
   - ✅ `whatsapp_business_management`
4. Token Duration: "Never expire"
5. **COPIA EL TOKEN** (solo se muestra una vez)

**Guárdalo aquí**:
```
META_WHATSAPP_ACCESS_TOKEN: EAAxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### 3. Obtén tu PHONE NUMBER ID

#### Opción A: Desde Meta Dashboard
1. WhatsApp Manager → Phone Numbers
2. Click en tu número
3. Busca "Phone Number ID" (número largo, diferente al número visible)

#### Opción B: Via API
```bash
curl -X GET "https://graph.facebook.com/v18.0/me/phone_numbers" \
  -H "Authorization: Bearer TU_ACCESS_TOKEN"
```

**Guárdalo aquí**:
```
META_WHATSAPP_PHONE_NUMBER_ID: 123456789012345
```

---

### 4. Obtén tu WABA ID (WhatsApp Business Account ID)

1. WhatsApp Manager → Settings
2. Copia el "WhatsApp Business Account ID"

**Guárdalo aquí**:
```
WABA_ID: 987654321098765
```

---

## 🎯 PASO 2: Configurar Vercel Environment Variables

Ve a: https://vercel.com/fabiolafrancoc-lab/mvp-salud-compartida/settings/environment-variables

### Agregar estas 4 variables:

#### 1. WHATSAPP_VERIFY_TOKEN
```
Key: WHATSAPP_VERIFY_TOKEN
Value: SaludCompartida_Webhook_2026_Secret
Environment: Production, Preview, Development
```
*(Tú eliges este valor, puede ser cualquier string secreto)*

#### 2. META_WHATSAPP_ACCESS_TOKEN
```
Key: META_WHATSAPP_ACCESS_TOKEN
Value: [El token que copiaste del System User]
Environment: Production, Preview, Development
```

#### 3. META_WHATSAPP_PHONE_NUMBER_ID
```
Key: META_WHATSAPP_PHONE_NUMBER_ID
Value: [El Phone Number ID que copiaste]
Environment: Production, Preview, Development
```

#### 4. META_WABA_ID
```
Key: META_WABA_ID
Value: [El WABA ID que copiaste]
Environment: Production, Preview, Development
```

**IMPORTANTE**: Después de agregar, haz "Redeploy" en Vercel para que las variables se carguen.

---

## 🎯 PASO 3: Configurar Webhook en Meta

### 1. Ve a tu App en Meta Developers
https://developers.facebook.com/apps/

### 2. WhatsApp → Configuration

#### a) Webhook URL
```
Callback URL: https://saludcompartida.app/api/whatsapp-incoming
Verify Token: SaludCompartida_Webhook_2026_Secret
```
*(El mismo que pusiste en WHATSAPP_VERIFY_TOKEN)*

#### b) Click "Verify and Save"
Debería mostrar ✅ "Verified"

#### c) Subscribe to Webhook Events
Selecciona:
- ✅ `messages`
- ✅ `messaging_postbacks` (opcional)

---

## 🎯 PASO 4: Suscribir App al WABA

Ejecuta este comando (reemplaza los valores):

```bash
curl -X POST \
  "https://graph.facebook.com/v18.0/TU_WABA_ID/subscribed_apps" \
  -H "Authorization: Bearer TU_ACCESS_TOKEN"
```

**Respuesta esperada**:
```json
{
  "success": true
}
```

---

## 🎯 PASO 5: Probar que Funciona

### Test 1: Verificar Webhook
Ve a Vercel Logs y busca:
```
✅ Webhook verificado
```

### Test 2: Enviar Mensaje de Prueba
Desde tu WhatsApp personal, envía mensaje a tu número de WhatsApp Business.

**Debería**:
1. Llegar a `/api/whatsapp-incoming`
2. AI Companion procesar mensaje
3. Responder automáticamente

### Test 3: Verificar en Logs
En Vercel → Logs:
```
📨 Mensaje de WhatsApp recibido: {...}
✅ Respuesta enviada al usuario
```

---

## 🔧 Troubleshooting

### Error: "Invalid access token"
**Causa**: Token expiró o no tiene permisos  
**Solución**: Genera nuevo token con permisos `whatsapp_business_messaging`

### Error: "Phone number not found"
**Causa**: PHONE_NUMBER_ID incorrecto  
**Solución**: Verifica en WhatsApp Manager → Phone Numbers → Phone Number ID

### Error: "Webhook verification failed"
**Causa**: WHATSAPP_VERIFY_TOKEN no coincide  
**Solución**: Usa el mismo valor en Vercel y Meta

### Mensajes no llegan
**Causa**: App no suscrita al WABA  
**Solución**: Ejecuta el curl del PASO 4 nuevamente

---

## ✅ VENTAJAS de Meta Directa vs WATI

| Característica | WATI.io | Meta Directa |
|---------------|---------|--------------|
| **Costo** | $39-99/mo | $0 (solo mensajes) |
| **Confiabilidad** | ❌ Bugs de conexión | ✅ Estable |
| **Voice Calls** | ⚠️ Limitado | ✅ Full support |
| **Control** | ❌ Dashboard only | ✅ Código completo |
| **AI Integration** | ⚠️ Via API | ✅ Nativo |

---

## 📋 Checklist Final

- [ ] Access Token obtenido de System User
- [ ] Phone Number ID copiado
- [ ] WABA ID copiado
- [ ] 4 variables agregadas en Vercel
- [ ] Vercel redeployado
- [ ] Webhook configurado en Meta (✅ Verified)
- [ ] App suscrita al WABA (curl ejecutado)
- [ ] Mensaje de prueba enviado y respondido

---

## 🎉 Resultado Final

Una vez completado:
- ✅ WhatsApp conectado directo a Meta (sin WATI)
- ✅ AI Companion responde automáticamente
- ✅ Voice calls habilitadas
- ✅ $0 costo mensual (vs $39-99 de WATI)
- ✅ Sin bugs de conexión

---

**IMPORTANTE**: Puedes **desactivar WATI.io completamente**. Ya no lo necesitas.

---

**Fecha**: Enero 16, 2026 - 1:30 AM  
**Estado**: Listo para configurar (10 minutos)
