# ✅ CONFIGURACIÓN WHATSAPP META - PASOS FINALES

## Estado Actual
✅ Endpoint `/api/whatsapp-incoming` está correctamente configurado  
✅ Responde a verificación de webhook (GET)  
✅ Procesa mensajes entrantes (POST)  
✅ Conectado con AI Companion engine  

## Lo que necesitas hacer:

### 1. Variables de Entorno en Vercel

Ve a: https://vercel.com/fabiolafrancoc-lab/mvp-salud-compartida/settings/environment-variables

Agrega estas 3 variables:

#### a) WHATSAPP_VERIFY_TOKEN
```
Clave: WHATSAPP_VERIFY_TOKEN
Valor: cualquier string secreto (ejemplo: "SaludCompartida2026_Webhook_Secret")
```
**Nota**: Tú eliges este token, debe ser el mismo que uses en Meta

#### b) META_WHATSAPP_ACCESS_TOKEN
```
Clave: META_WHATSAPP_ACCESS_TOKEN
Valor: [Tu System User Token de Meta Business]
```
**Dónde conseguirlo**:
1. Ve a Meta Business Suite → Settings
2. System Users → Create System User
3. Assign Assets → WhatsApp Business Account
4. Generate Token → Scope: `whatsapp_business_messaging`

#### c) META_WHATSAPP_PHONE_NUMBER_ID
```
Clave: META_WHATSAPP_PHONE_NUMBER_ID
Valor: [Phone Number ID de tu WABA]
```
**Dónde conseguirlo**:
1. Meta Business Suite → WhatsApp Accounts
2. Click en tu número de teléfono
3. Copia el "Phone Number ID" (diferente al número de teléfono visible)

---

### 2. Configurar Webhook en Meta

#### Paso 1: Ir a Meta App Dashboard
https://developers.facebook.com/apps/

#### Paso 2: Configurar Webhook URL
1. WhatsApp → Configuration
2. Edit Webhook
3. **Callback URL**: `https://saludcompartida.app/api/whatsapp-incoming`
4. **Verify Token**: [el mismo que pusiste en WHATSAPP_VERIFY_TOKEN]
5. Click "Verify and Save"

#### Paso 3: Suscribir eventos
Selecciona estos eventos:
- ✅ `messages` (mensajes entrantes)
- ✅ `message_status` (estado de envío - opcional)

---

### 3. Suscribir tu App al WABA (Lo que Meta te pidió)

Ejecuta este comando en terminal (reemplaza los valores):

```bash
curl -X POST \
  "https://graph.facebook.com/v18.0/<TU_WABA_ID>/subscribed_apps" \
  -H "Authorization: Bearer <TU_ACCESS_TOKEN>"
```

**Reemplaza**:
- `<TU_WABA_ID>`: Tu WhatsApp Business Account ID (número largo)
- `<TU_ACCESS_TOKEN>`: El token que generaste en paso 1b

**Respuesta esperada**:
```json
{
  "success": true
}
```

---

### 4. Verificar que Funciona

#### Opción A: Desde Meta Dashboard
1. Meta Business Suite → WhatsApp → Test Number
2. Envía mensaje de prueba a tu número
3. Verifica en Vercel Logs que llegó el webhook

#### Opción B: Envía mensaje real desde tu WhatsApp
1. Envía mensaje al número de WhatsApp Business
2. Debe responder automáticamente con AI Companion

---

## Troubleshooting

### Error: "Webhook verification failed"
**Causa**: `WHATSAPP_VERIFY_TOKEN` no coincide  
**Solución**: Verifica que sea el mismo token en Vercel y en Meta

### Error: "Messages not receiving"
**Causa**: App no está suscrita al WABA  
**Solución**: Ejecuta el curl del paso 3

### Error: "Cannot send messages"
**Causa**: Tokens incorrectos o permisos faltantes  
**Solución**: 
1. Verifica `META_WHATSAPP_ACCESS_TOKEN` tenga scope `whatsapp_business_messaging`
2. Verifica que `META_WHATSAPP_PHONE_NUMBER_ID` sea correcto

---

## Logs Útiles

Para ver qué está pasando:
1. Ve a Vercel → MVP-SaludCompartida → Logs
2. Filtra por `/api/whatsapp-incoming`
3. Verás:
   - `✅ Webhook verificado` → Configuración correcta
   - `📨 Mensaje de WhatsApp recibido` → Mensajes llegando
   - `✅ Respuesta enviada al usuario` → AI respondiendo

---

## Checklist Final

- [ ] WHATSAPP_VERIFY_TOKEN agregado en Vercel
- [ ] META_WHATSAPP_ACCESS_TOKEN agregado en Vercel
- [ ] META_WHATSAPP_PHONE_NUMBER_ID agregado en Vercel
- [ ] Webhook URL configurado en Meta: `https://saludcompartida.app/api/whatsapp-incoming`
- [ ] Webhook verificado exitosamente (✅ en Meta)
- [ ] Eventos `messages` suscritos
- [ ] App suscrita al WABA (curl ejecutado)
- [ ] Mensaje de prueba enviado y respondido

---

## Estado de Integración Completa

Una vez completado:
- ✅ Usuario envía WhatsApp → llega a `/api/whatsapp-incoming`
- ✅ AI Companion procesa mensaje → genera respuesta empática
- ✅ Respuesta enviada automáticamente por WhatsApp
- ✅ Conversación continúa 24/7

**Todo el código ya está listo. Solo faltan las credenciales de Meta.**

---

## Próximos Pasos Después de Esto

1. **Twilio** → Para voice calls (cuando termine el registro)
2. **Testing completo** → Flujo payment → codes → AI companion
3. **Launch** → February 08, 2026 🚀

---

**Fecha de este documento**: Enero 16, 2026 - 1:00 AM  
**Estado**: Código listo, esperando credenciales Meta
