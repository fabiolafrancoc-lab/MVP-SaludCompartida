# ✅ LIMPIEZA COMPLETADA - TIKTOK ELIMINADO

**Fecha:** 28 enero 2026  
**Cambios:** TikTok Pixel eliminado del sistema

---

## 🗑️ CAMBIOS REALIZADOS

### 1. ✅ TikTok Pixel eliminado: `src/hooks/useMetaPixel.js`

**ANTES:**
```javascript
const TIKTOK_PIXEL_ID = 'CNHFH4RC77U7SFL97E10';
// ... código de inicialización TikTok
window.ttq.track(...)
```

**DESPUÉS:**
```javascript
const META_PIXEL_ID = '35350289364';
// ❌ TikTok Pixel ELIMINADO por solicitud del cliente
// Solo Meta Pixel (Facebook + Instagram)
```

---

## 📊 PIXELS ACTIVOS

### ✅ Meta Pixel (Facebook + Instagram)
- **Pixel ID:** `35350289364`
- **Eventos tracked:**
  - `PageView`
  - `Lead` (pre-checkout)
  - `InitiateCheckout` (registro)
  - `Purchase` (pago completado)
  - `CompleteRegistration`

### ❌ TikTok Pixel - ELIMINADO
- Ya no se trackea
- Código removido completamente
- No se cargan scripts de TikTok

---

## 📱 LANDING PAGES EXISTENTES

### Ruta `/tiktok` sigue existiendo
- **Archivo:** `src/views/LandingBubblesTikTok.jsx`
- **Status:** Activa pero SIN pixel tracking
- **Acción recomendada:** 
  - Si NO hay campañas corriendo → Eliminar
  - Si hay campañas → Mantener hasta finalizar campaña

### Otras rutas:
- `/instagram` → `LandingBubblesSimple.jsx` ✅ Con Meta Pixel
- `/facebook` → `LandingBubblesSimple.jsx` ✅ Con Meta Pixel
- `/` → Landing principal ✅ Con Meta Pixel

---

## 🔍 ARCHIVOS QUE MENCIONAN TIKTOK (No críticos)

```
src/lib/field-mapper.ts (línea 171, 176)
  - Detecta traffic source 'tiktok' desde URL
  - NO es pixel, es analytics interno
  - Mantener para saber de dónde viene tráfico

src/data.js/articles.js/index.js
  - Artículo del blog menciona TikTok
  - Contenido editorial, no código
  - Mantener

src/ClientRouter.tsx
  - Ruta /tiktok activa
  - Decidir si eliminar o mantener
```

---

## ⚠️ DECISIÓN PENDIENTE

### Landing `/tiktok` - ¿Qué hacer?

**Opción A: Eliminar completamente**
```bash
# 1. Eliminar archivo
rm src/views/LandingBubblesTikTok.jsx

# 2. Eliminar ruta en ClientRouter.tsx
# Borrar línea: <Route path="/tiktok" element={<LandingBubblesTikTok />} />
```

**Opción B: Mantener sin pixel**
- Archivo existe pero sin tracking TikTok
- Útil si hay campañas orgánicas o links compartidos
- Solo trackea con Meta Pixel (Facebook/Instagram)

**¿Qué prefieres?**

---

## 📋 STACK TECNOLÓGICO ACTUALIZADO

### Advertising & Tracking:
- ✅ **Meta Business Suite** (Facebook + Instagram)
- ✅ **Meta Pixel** (tracking FB + IG)
- ✅ **YouTube Ads Manager**
- ❌ **TikTok Ads** - NO activo
- ❌ **TikTok Pixel** - ELIMINADO

### Todo lo demás sigue igual:
- ✅ Supabase
- ✅ Weaviate
- ✅ AWS S3 (recordings)
- ✅ Square API
- ✅ Resend (email)
- ✅ WATI (WhatsApp)
- ✅ ElevenLabs (voice)
- ✅ TALYNX (telefonía México)
- ✅ Vapi.io (voice AI)
- ✅ AWS Bedrock (Claude)
- ✅ AWS Lambda
- ✅ Sentry
- ✅ Vercel
- ✅ GitHub

---

## ✅ PRÓXIMOS PASOS

1. **Claude empieza con Landing (Page 1)**
   - Solo Meta Pixel activo
   - No mencionar TikTok en diseño

2. **Decidir sobre `/tiktok` landing**
   - ¿Eliminar o mantener?
   - Confirmar si hay tráfico activo

3. **Continuar con resto de páginas**
   - Registro, Pago, Dashboard, etc.

---

**TikTok Pixel eliminado exitosamente. ✅**
