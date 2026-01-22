# ✅ CHECKLIST: COMPLETAR INTEGRACIONES FALTANTES

**Fecha de inicio:** Enero 22, 2026  
**Estado actual:** 80% Completo  
**Faltan:** 3 API keys críticas + 2 opcionales

---

## 🎯 PASO 1: RESEND (Email) - 15 MINUTOS

### ⏱️ Tiempo estimado: 15 minutos
### 🔥 Prioridad: CRÍTICA

**¿Por qué es crítico?**
- Sin Resend, los códigos de acceso NO se envían por email
- Los usuarios solo reciben códigos por WhatsApp
- Emails de confirmación no funcionan

**Pasos:**

#### 1.1 Crear cuenta y obtener API Key (5 min)

- [ ] Ve a: https://resend.com/signup
- [ ] Crea cuenta con tu email: `ffranco@saludcompartida.com`
- [ ] Ve a: https://resend.com/api-keys
- [ ] Click en **"Create API Key"**
- [ ] Nombre: `SaludCompartida-Production`
- [ ] **Copia la key** (empieza con `re_`)
- [ ] Guárdala aquí temporalmente: `____________________`

#### 1.2 Verificar dominio (5 min configurar, 24-48h esperar)

- [ ] Ve a: https://resend.com/domains
- [ ] Click **"Add Domain"**
- [ ] Ingresa: `saludcompartida.app`
- [ ] Copia los registros DNS que te dan:

**Registros a agregar en tu proveedor de DNS:**

```
Tipo: TXT
Nombre: _resend
Valor: [lo que te dé Resend]

Tipo: CNAME
Nombre: resend._domainkey
Valor: [lo que te dé Resend]

Tipo: MX (opcional, para recibir emails)
Prioridad: 10
Valor: [lo que te dé Resend]
```

- [ ] Ve a tu proveedor de DNS (GoDaddy, Cloudflare, etc.)
- [ ] Agrega los registros DNS
- [ ] Espera 24-48 horas para verificación

#### 1.3 Agregar a Vercel (2 min)

- [ ] Ve a: https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida/settings/environment-variables
- [ ] Click **"Add New"**
- [ ] Name: `RESEND_API_KEY`
- [ ] Value: `re_[tu-key-aqui]`
- [ ] Environment: ✅ Production, ✅ Preview, ✅ Development
- [ ] Click **"Save"**

#### 1.4 Agregar a .env local (1 min)

- [ ] Abre: `/Users/fabiolafranco/Desktop/MVP-SaludCompartida/.env`
- [ ] Busca: `RESEND_API_KEY=re_tu-key-aqui`
- [ ] Reemplaza con tu key real
- [ ] Busca: `RESEND_FROM_EMAIL=noreply@saludcompartida.app`
- [ ] Verifica que el email sea correcto
- [ ] Guarda el archivo

#### 1.5 Redeploy en Vercel (2 min)

- [ ] Ve a: https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida/deployments
- [ ] Click en el último deployment
- [ ] Click en "..." → **"Redeploy"**
- [ ] Espera 2 minutos

#### 1.6 Probar (1 min)

- [ ] Espera a que termine el redeploy
- [ ] Haz una compra de prueba en: https://saludcompartida.app
- [ ] Verifica que recibiste el email con los códigos
- [ ] Si NO funciona, revisa logs: https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida/logs

**✅ RESEND COMPLETADO**

---

## 🎯 PASO 2: ANTHROPIC (Claude API) - 10 MINUTOS

### ⏱️ Tiempo estimado: 10 minutos
### 🔥 Prioridad: CRÍTICA

**¿Por qué es crítico?**
- Acabamos de integrar Claude para análisis de conversaciones
- Permite detectar crisis emocionales automáticamente
- Mejora las respuestas de Lupita con contexto

**Pasos:**

#### 2.1 Crear cuenta y obtener API Key (5 min)

- [ ] Ve a: https://console.anthropic.com/
- [ ] Inicia sesión con Google (usa tu email de SaludCompartida)
- [ ] Ve a: **Settings** → **API Keys**
  - URL directa: https://console.anthropic.com/settings/keys
- [ ] Click **"Create Key"**
- [ ] Name: `SaludCompartida-Production`
- [ ] **Copia la key** (empieza con `sk-ant-api03-`)
- [ ] ⚠️ Solo se muestra UNA VEZ
- [ ] Guárdala aquí temporalmente: `____________________`

#### 2.2 Agregar a Vercel (2 min)

- [ ] Ve a: https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida/settings/environment-variables
- [ ] Click **"Add New"**
- [ ] Name: `ANTHROPIC_API_KEY`
- [ ] Value: `sk-ant-api03-[tu-key-aqui]`
- [ ] Environment: ✅ Production, ✅ Preview, ✅ Development
- [ ] Click **"Save"**

#### 2.3 Agregar a .env local (1 min)

- [ ] Abre: `/Users/fabiolafranco/Desktop/MVP-SaludCompartida/.env`
- [ ] Busca: `ANTHROPIC_API_KEY=sk-ant-api03-tu-key-aqui`
- [ ] Reemplaza con tu key real
- [ ] Guarda el archivo

#### 2.4 Redeploy en Vercel (2 min)

- [ ] Ve a: https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida/deployments
- [ ] Click en el último deployment
- [ ] Click en "..." → **"Redeploy"**
- [ ] Espera 2 minutos

#### 2.5 Probar (1 min)

- [ ] Espera a que termine el redeploy
- [ ] Visita: https://saludcompartida.app/api/test-claude
- [ ] Deberías ver: `{"success": true, "model": "claude-3-5-sonnet-20241022", ...}`
- [ ] Si ves error, verifica que la key esté correcta en Vercel

**✅ ANTHROPIC COMPLETADO**

---

## 🎯 PASO 3: META WHATSAPP BUSINESS - 30 MINUTOS

### ⏱️ Tiempo estimado: 30 min configurar + 24-48h esperar aprobación
### 🔥 Prioridad: IMPORTANTE (pero opcional, WATI funciona)

**¿Por qué es importante?**
- WhatsApp oficial de Meta es más confiable que WATI
- Mejor deliverability de mensajes
- Templates pre-aprobados
- Sin embargo, WATI funciona como backup

**Pasos:**

#### 3.1 Obtener Credentials de Meta (10 min)

- [ ] Ve a: https://business.facebook.com/settings/whatsapp-business-accounts
- [ ] Selecciona tu WhatsApp Business Account
- [ ] Anota tu **Business Account ID** (en la URL): `____________________`

**Obtener Phone Number ID:**
- [ ] Ve a: WhatsApp → **API Setup**
- [ ] Copia **Phone Number ID**: `____________________`

**Obtener Access Token:**
- [ ] Ve a: **System Users** → Crea un System User si no tienes
- [ ] Name: `SaludCompartida-API`
- [ ] Role: **Admin**
- [ ] Genera **Access Token**
- [ ] Permissions: `whatsapp_business_management`, `whatsapp_business_messaging`
- [ ] Expiration: **Never**
- [ ] Copia el token (empieza con `EAAG...`): `____________________`

#### 3.2 Crear Message Templates (15 min)

**Template 1: codigo_migrante**

- [ ] Ve a: WhatsApp → **Message Templates**
- [ ] Click **"Create Template"**
- [ ] Name: `codigo_migrante`
- [ ] Category: **UTILITY**
- [ ] Language: **Spanish**
- [ ] Body:
```
¡Bienvenido/a a Salud Compartida! 🎉

Tu código de acceso de MIGRANTE es: {{1}}

Úsalo para ingresar desde USA.

¿Tienes dudas? Escríbenos.
```
- [ ] Variables: `{{1}}` = código de acceso
- [ ] Click **"Submit"**

**Template 2: codigo_familiar**

- [ ] Click **"Create Template"** nuevamente
- [ ] Name: `codigo_familiar`
- [ ] Category: **UTILITY**
- [ ] Language: **Spanish**
- [ ] Body:
```
¡Bienvenido/a a Salud Compartida! 🎉

Tu código de acceso de FAMILIAR es: {{1}}

Úsalo para ingresar desde México.

¿Tienes dudas? Escríbenos.
```
- [ ] Variables: `{{1}}` = código de acceso
- [ ] Click **"Submit"**

- [ ] **Espera aprobación de Meta:** 24-48 horas
- [ ] Recibirás email cuando sean aprobados

#### 3.3 Agregar a Vercel (después de aprobación) (5 min)

- [ ] Ve a: https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida/settings/environment-variables
- [ ] Agrega 3 variables:

**Variable 1:**
- [ ] Name: `META_WHATSAPP_ACCESS_TOKEN`
- [ ] Value: `EAAG...` (tu token)
- [ ] Environment: ✅ Production, ✅ Preview, ✅ Development

**Variable 2:**
- [ ] Name: `META_WHATSAPP_PHONE_NUMBER_ID`
- [ ] Value: `123456789012345` (tu phone number ID)
- [ ] Environment: ✅ Production, ✅ Preview, ✅ Development

**Variable 3:**
- [ ] Name: `META_WHATSAPP_BUSINESS_ACCOUNT_ID`
- [ ] Value: tu business account ID
- [ ] Environment: ✅ Production, ✅ Preview, ✅ Development

#### 3.4 Agregar a .env local (2 min)

- [ ] Abre: `/Users/fabiolafranco/Desktop/MVP-SaludCompartida/.env`
- [ ] Busca las variables META_WHATSAPP
- [ ] Reemplaza con tus valores reales
- [ ] Guarda el archivo

#### 3.5 Redeploy y cambiar a Meta API (5 min)

- [ ] Redeploy en Vercel
- [ ] Modifica `/api/send-access-codes.js` para usar Meta en vez de WATI:

```javascript
// Cambiar esta línea:
const whatsappResponse = await fetch(`${baseUrl}/api/send-whatsapp`, ...);

// Por esta:
const whatsappResponse = await fetch(`${baseUrl}/api/send-whatsapp-meta`, ...);
```

**✅ META WHATSAPP COMPLETADO** (después de aprobación)

---

## 🎯 PASO 4 (OPCIONAL): SENTRY AUTH TOKEN - 5 MINUTOS

### ⏱️ Tiempo estimado: 5 minutos
### 🔥 Prioridad: OPCIONAL (mejora source maps)

**¿Por qué es útil?**
- Permite upload de source maps a Sentry
- Mejora el debugging de errores
- Muestra código original en vez de minificado

**Pasos:**

- [ ] Ve a: https://sentry.io/settings/account/api/auth-tokens/
- [ ] Click **"Create New Token"**
- [ ] Name: `SaludCompartida-Vercel`
- [ ] Scopes: `project:releases`, `org:read`
- [ ] Click **"Create Token"**
- [ ] Copia el token: `____________________`
- [ ] Agrégalo en Vercel:
  - Name: `SENTRY_AUTH_TOKEN`
  - Value: tu token
  - Environment: ✅ Production, ✅ Preview, ✅ Development

**✅ SENTRY AUTH TOKEN COMPLETADO**

---

## 🎯 PASO 5 (OPCIONAL): ELEVENLABS API - 5 MINUTOS

### ⏱️ Tiempo estimado: 5 minutos
### 🔥 Prioridad: OPCIONAL (no necesario)

**¿Necesitas esto?**
- **NO** si solo usas VAPI.ai (VAPI ya usa ElevenLabs internamente)
- **SÍ** si quieres generar audio fuera de VAPI

**Si decides configurarlo:**

- [ ] Ve a: https://elevenlabs.io/app/settings/api-keys
- [ ] Click **"Create New Key"**
- [ ] Name: `SaludCompartida`
- [ ] Copia la key: `____________________`
- [ ] Agrégala en Vercel:
  - Name: `ELEVENLABS_API_KEY`
  - Value: `sk_...` (tu key)
- [ ] Agrégala en `.env`:
  - `ELEVENLABS_API_KEY=sk_...`

**✅ ELEVENLABS COMPLETADO**

---

## 📋 CHECKLIST FINAL

### Críticas (Hacer Ahora)
- [ ] RESEND configurado y funcionando
- [ ] ANTHROPIC configurado y `/api/test-claude` funciona
- [ ] Emails de códigos se envían correctamente

### Importantes (Hacer Pronto)
- [ ] META WHATSAPP templates creados
- [ ] Esperando aprobación de Meta (24-48h)
- [ ] Variables META_WHATSAPP agregadas en Vercel

### Opcionales
- [ ] SENTRY_AUTH_TOKEN configurado
- [ ] ELEVENLABS_API_KEY configurado (si decides usarlo)

---

## 🎉 AL COMPLETAR TODO

**Verifica que todo funciona:**

1. **Emails:**
   ```bash
   # Haz una compra de prueba
   # Verifica que recibes email con códigos
   ```

2. **Claude:**
   ```bash
   curl https://saludcompartida.app/api/test-claude
   # Debe retornar: {"success": true, ...}
   ```

3. **WhatsApp (cuando Meta apruebe):**
   ```bash
   # Haz una compra de prueba
   # Verifica que recibes WhatsApp con códigos
   ```

4. **Sentry:**
   ```bash
   # Ve a: https://sentry.io/organizations/salud-compartida/
   # Verifica que los source maps se subieron
   ```

---

## 🆘 AYUDA

**Si algo no funciona:**

1. **Revisa Vercel Logs:**
   - https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida/logs

2. **Verifica Environment Variables:**
   - https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida/settings/environment-variables

3. **Redeploy:**
   - Siempre redeploy después de agregar/cambiar variables

4. **Contacta soporte:**
   - Resend: https://resend.com/docs
   - Anthropic: https://docs.anthropic.com/
   - Meta: https://developers.facebook.com/support

---

**🎯 ¿POR DÓNDE EMPEZAR?**

1. ✅ **PASO 1: RESEND** (15 min) - Hazlo ahora
2. ✅ **PASO 2: ANTHROPIC** (10 min) - Hazlo ahora
3. 🕐 **PASO 3: META WHATSAPP** (30 min) - Hazlo cuando tengas tiempo
4. ⚪ **PASO 4-5: OPCIONALES** - Hazlos si quieres

---

**Última actualización:** Enero 22, 2026  
**Tiempo total estimado:** 30-60 minutos  
**Documentos relacionados:** `AUDITORIA_INTEGRACIONES_COMPLETA.md`
