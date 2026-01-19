# Guía de Reparación Paso a Paso
## WhatsApp + AI Companions - Sin Necesidad de Developer

**Fecha:** 17 de Enero, 2026  
**Duración estimada:** 20-30 minutos  
**Nivel técnico requerido:** Básico (solo copiar/pegar)

---

## 🎯 Objetivo

Arreglar:
1. ❌ WhatsApp (WATI) - Error 401
2. ❌ Llamadas AI Companion (Vapi + Telnyx) - Error 403

---

## 📋 CHECKLIST PRE-INICIO

Necesitas tener acceso a:
- [ ] WATI Dashboard (https://app.wati.io)
- [ ] Telnyx Portal (https://portal.telnyx.com)
- [ ] Vapi.ai Dashboard (https://dashboard.vapi.ai)
- [ ] Vercel Dashboard (https://vercel.com/dashboard)
- [ ] 20-30 minutos sin interrupciones

---

## PARTE 1: ARREGLAR WHATSAPP (WATI)

### Paso 1.1: Regenerar Token WATI

1. **Abre:** https://app.wati.io
2. **Login** con tu cuenta
3. **Haz clic** en el ícono de engrane ⚙️ (arriba derecha)
4. **Selecciona:** "Settings"

**Captura de pantalla:** Toma foto de lo que ves y compártela.

---

### Paso 1.2: Ir a API Settings

1. En el menú lateral izquierdo, busca **"API"**
2. **Haz clic** en "API"
3. Deberías ver algo como "API Access Token"

**¿Qué ves?** Descríbelo o toma captura.

---

### Paso 1.3: Regenerar el Token

1. Busca un botón que diga **"Regenerate Token"** o **"Generate New Token"**
2. **Haz clic** en ese botón
3. Te mostrará un token MUY largo (como 300+ caracteres)

**IMPORTANTE:** 
- ❌ NO cierres esta ventana todavía
- ✅ El token solo se muestra UNA VEZ

---

### Paso 1.4: Copiar el Token

1. **Selecciona TODO el token** (desde la primera letra hasta la última)
2. **Copia** (Ctrl+C o Cmd+C)
3. **Pégalo en una nota temporal** (Notepad, Notes, etc.)

**Verifica:**
- ¿El token empieza con "eyJ..."?
- ¿Tiene puntos (.) en el medio?
- ¿Es muy largo (200+ caracteres)?

✅ Si sí → Continúa  
❌ Si no → Toma captura y comparte

---

### Paso 1.5: Agregar "Bearer" al Token

En tu nota temporal, **AL INICIO** del token, escribe:

```
Bearer eyJhbGciOiJIUzI...
```

**CRÍTICO:**
- ✅ Escribe "Bearer" (con B mayúscula)
- ✅ Luego UN SOLO ESPACIO
- ✅ Luego tu token completo

**Ejemplo correcto:**
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFt...
```

**Ejemplos INCORRECTOS:**
```
❌ bearer eyJ...        (b minúscula)
❌ Bearer  eyJ...       (dos espacios)
❌ BearereyJ...         (sin espacio)
❌ eyJ...               (sin Bearer)
```

---

### Paso 1.6: Actualizar en Vercel

1. **Abre:** https://vercel.com/fabiolafrancoc-labs-projects/mvp-salud-compartida
2. **Haz clic** en "Settings" (arriba)
3. **Haz clic** en "Environment Variables" (menú lateral)
4. **Busca** la variable llamada `WATI_API_TOKEN`
5. **Haz clic** en los 3 puntos ⋯ a la derecha
6. **Selecciona** "Edit"

---

### Paso 1.7: Pegar el Nuevo Token

1. **Borra** el valor viejo completo
2. **Pega** tu nuevo token (el que tiene "Bearer " al inicio)
3. **Verifica** que NO haya espacios extra al inicio o al final
4. **Haz clic** en "Save"

**¿Te apareció un checkmark verde?**
- ✅ Sí → Perfecto, continúa
- ❌ No → Toma captura del error

---

### Paso 1.8: Redeploy

1. **Ve a** la pestaña "Deployments" (arriba)
2. **Busca** el deployment más reciente (el primero de la lista)
3. **Haz clic** en los 3 puntos ⋯ a la derecha
4. **Selecciona** "Redeploy"
5. **Confirma** haciendo clic en "Redeploy" de nuevo

**Espera 1-2 minutos** mientras se redeploya.

---

### Paso 1.9: Probar WhatsApp

1. **Abre** este link en tu navegador:
```
https://www.saludcompartida.app/api/debug-wati?phone=+13055227150
```

2. **Espera** 5-10 segundos

**¿Qué resultado ves?**

**OPCIÓN A - ÉXITO:**
```json
{
  "success": true,
  "message": "Test enviado"
}
```
✅ **¡FUNCIONA!** WhatsApp arreglado.

**OPCIÓN B - TODAVÍA ERROR 401:**
```json
{
  "error": "401 Unauthorized"
}
```
❌ Token mal copiado. Repite desde Paso 1.3

**OPCIÓN C - OTRO ERROR:**
Copia el error completo y compártelo.

---

## PARTE 2: ARREGLAR LLAMADAS AI (TELNYX + VAPI)

### Paso 2.1: Crear API Key en Telnyx

1. **Abre:** https://portal.telnyx.com/#/app/api-keys
2. **Login** con tu cuenta
3. **Haz clic** en el botón **"Create API Key"** (arriba derecha)

**¿Lo ves?**
- ✅ Sí → Haz clic
- ❌ No → Toma captura de pantalla

---

### Paso 2.2: Configurar Permisos

Vas a ver un formulario. Llénalo así:

**Name:** `Vapi AI Integration`

**Key Type:** Selecciona **"API Key V2"**

**Permissions:** (CRÍTICO - selecciona ESTAS opciones)
- ✅ **Voice** (o "Call Control")
- ✅ **Phone Numbers**
- ✅ **Messaging** (opcional pero recomendado)

**⚠️ MUY IMPORTANTE:**
Si no ves opción de permisos, busca un checkbox o dropdown que diga "Customize Permissions" o "Advanced"

---

### Paso 2.3: Crear y Copiar API Key

1. **Haz clic** en "Create" o "Save"
2. Te mostrará la API Key **UNA SOLA VEZ**
3. Empieza con "KEY..." (ejemplo: `KEY019BC93F...`)
4. **Copia TODO** el key completo
5. **Pégalo** en tu nota temporal

**IMPORTANTE:**
- ❌ NO cierres esta ventana hasta haber copiado
- ✅ La API Key es LARGA (tipo 60+ caracteres)

---

### Paso 2.4: Agregar API Key a Vapi.ai

1. **Abre:** https://dashboard.vapi.ai
2. **Login** con tu cuenta
3. **Haz clic** en "Settings" (menú lateral o arriba)
4. **Busca** sección "Providers" o "Phone Providers"
5. **Busca** "Telnyx"

**¿Qué ves?**
- **Opción A:** Ya hay configuración de Telnyx → Haz clic en "Edit"
- **Opción B:** No hay nada de Telnyx → Haz clic en "Add Provider"

---

### Paso 2.5: Pegar API Key en Vapi

1. En el campo "API Key" o "Telnyx API Key"
2. **Pega** tu API Key (la que copiaste de Telnyx, empieza con KEY...)
3. **Verifica** que NO haya espacios extra
4. **Haz clic** en "Save" o "Connect"

**¿Te apareció un mensaje de éxito?**
- ✅ Sí → Continúa
- ❌ No → Comparte el error que ves

---

### Paso 2.6: Verificar Número Conectado

1. En Vapi.ai Dashboard, **ve a** "Phone Numbers"
2. **Busca** tu número: `+52 (55) 9990 6900`
3. **Verifica** que diga "Connected" o "Active"

**¿Qué status tiene?**
- ✅ Connected/Active → Perfecto
- ❌ Disconnected/Error → Toma captura

---

### Paso 2.7: Probar Llamada OUTBOUND

1. En Vapi.ai, **ve a** "Assistants"
2. **Selecciona** "María" (o cualquier assistant)
3. **Busca** botón "Test" o "Make Test Call"
4. **Ingresa** tu número: `+13055227150`
5. **Haz clic** en "Call" o "Start Call"

**Espera 10-20 segundos**

---

### Paso 2.8: Resultado Final

**¿Recibiste la llamada en tu celular?**

**OPCIÓN A - ÉXITO:**
- ✅ Llamada entró
- ✅ Escuchaste voz de IA
- ✅ **¡FUNCIONA!** Todo arreglado.

**OPCIÓN B - NO ENTRÓ LLAMADA:**
1. Ve a "Call Logs" en Vapi.ai
2. Busca la última llamada
3. ¿Qué error muestra?
   - "403" → API Key todavía sin permisos correctos
   - "404" → Número no conectado bien
   - Otro error → Compártelo

**OPCIÓN C - ENTRÓ PERO NO SE ESCUCHA:**
- IA funciona, es problema de audio (menos crítico)
- Reporta qué se escucha exactamente

---

## ✅ CHECKLIST FINAL

### WhatsApp (WATI):
- [ ] Token regenerado
- [ ] "Bearer " agregado correctamente
- [ ] Actualizado en Vercel
- [ ] Redeployado
- [ ] Test endpoint: OK (no error 401)

### Llamadas AI (Vapi + Telnyx):
- [ ] API Key creada en Telnyx
- [ ] Permisos Voice + Phone Numbers activados
- [ ] API Key agregada a Vapi.ai
- [ ] Número +52 55 9990 6900 conectado
- [ ] Test call: Recibiste llamada

---

## 🆘 SI ALGO NO FUNCIONA

**Para cada paso que falle:**

1. **Toma captura de pantalla** de lo que ves
2. **Copia el error exacto** (si aparece texto de error)
3. **Dime en qué paso estás** (ej: "Paso 1.4")
4. **Describe qué esperabas vs. qué pasó**

**Yo te responderé con:**
- Interpretación del error
- Qué salió mal
- Cómo arreglarlo
- Próximo paso específico

---

## 🎉 UNA VEZ FUNCIONE TODO

**Registra esto para el futuro:**

### Tokens que funcionan (guárdalos seguros):
```
WATI_API_TOKEN: Bearer eyJ... (del Paso 1.4)
TELNYX_API_KEY: KEY019BC... (del Paso 2.3)
```

### Links importantes:
```
WATI Dashboard:    https://app.wati.io
Telnyx Portal:     https://portal.telnyx.com
Vapi.ai:           https://dashboard.vapi.ai
Vercel:            https://vercel.com/dashboard
```

### Test URLs:
```
WhatsApp test:     https://www.saludcompartida.app/api/debug-wati?phone=+13055227150
Llamar a Lupita:   +52 55 9990 6900
```

---

**¿Lista para empezar?** 🚀

Dime **"Empiezo con Paso 1.1"** y te guío en tiempo real.
