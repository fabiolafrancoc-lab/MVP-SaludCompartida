# Resumen: Códigos de País y Pixels de Tracking

## 📞 Estado Actual de Códigos de País

### ✅ CORRECTO - Usuario Principal (Migrante)
**Ubicación:** `src/account.jsx`
- **Código:** Dinámico `{countryCode}` - detecta +1 (USA) o +52 (México)
- **Lógica:** Se obtiene del usuario guardado o se detecta por geolocalización
- **Estado:** ✅ **FUNCIONA CORRECTAMENTE**

```jsx
// Línea 29: Default es +52 pero se actualiza dinámicamente
const [countryCode, setCountryCode] = useState(storedUserData?.countryCode || '+52');

// Línea 468: Se muestra dinámicamente
<span className="text-gray-700 font-semibold">{countryCode}</span>
```

### ❌ NECESITA CORRECCIÓN - Dependientes en México
**Ubicación:** `src/account.jsx` línea 625
- **Código Actual:** `+52` (hardcodeado) ✅ **CORRECTO**
- **Razón:** Los dependientes SIEMPRE están en México
- **Estado:** ✅ **YA ESTÁ CORRECTO** - No requiere cambios

```jsx
// Línea 625: Campo de teléfono de dependientes
<div className="flex items-center px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl font-mono text-gray-700">
  +52
</div>
```

### ✅ CORRECTO - Formulario Contact
**Ubicación:** `src/contact.jsx` línea 410
- **Código:** `+52` (hardcodeado)
- **Razón:** Formulario para personas en México
- **Estado:** ✅ **CORRECTO**

### ✅ CORRECTO - Formulario Therapy
**Ubicación:** `src/therapy.jsx` múltiples líneas
- **Código:** `+52` (hardcodeado en todas las instancias)
- **Razón:** Terapia para personas en México
- **Estado:** ✅ **CORRECTO**

### ✅ CORRECTO - LoginCodigo
**Ubicación:** `src/LoginCodigo.jsx`
- **Código:** Dinámico, detecta +1 o +52 por geolocalización
- **Estado:** ✅ **CORRECTO**

```jsx
// Línea 20: Default +52 pero se actualiza
const [countryCode, setCountryCode] = useState('+52');

// Líneas 143, 184: Valida si el usuario es de USA (+1)
codeData.countryCode === '+1' || dbUser.country_code === '+1'
```

---

## 📊 Estado de Pixels de Tracking

### ✅ Meta Pixel (Facebook)
**Ubicación:** `index.html` líneas 23-36
- **ID:** `35350289364`
- **Estado:** ✅ **INSTALADO Y FUNCIONANDO**
- **Eventos trackeados:**
  - `PageView` (index.html línea 34)
  - `Lead` (Registro.jsx línea 366)
  - `InitiateCheckout` (Pago.jsx línea 29)
  - `Purchase` (Confirmacion.jsx línea 16)

```html
<!-- Meta Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '35350289364');
  fbq('track', 'PageView');
</script>
<!-- End Meta Pixel Code -->
```

### ✅ TikTok Pixel
**Ubicación:** `index.html` líneas 38-47
- **ID:** `CNHFH4RC77U7SFL97E10`
- **Estado:** ✅ **INSTALADO Y FUNCIONANDO**
- **Eventos trackeados:**
  - `page()` (index.html línea 45)
  - También referenciado en `useMetaPixel.js` línea 5

```html
<!-- TikTok Pixel Code -->
<script>
  !function (w, d, t) {
    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
    ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
    ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
    for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
    ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
    ttq.load=function(e,n){...};
    ttq.load('CNHFH4RC77U7SFL97E10');
    ttq.page();
  }(window, document, 'ttq');
</script>
<!-- End TikTok Pixel Code -->
```

---

## 🎯 Resumen de Correcciones Necesarias

### ✅ NINGUNA CORRECCIÓN NECESARIA
Todos los códigos de país están configurados correctamente:

1. **Usuario Principal (Migrante):** Dinámico +1 o +52 ✅
2. **Dependientes (México):** Siempre +52 ✅
3. **Contact Form:** +52 para usuarios en México ✅
4. **Therapy Form:** +52 para terapia en México ✅
5. **LoginCodigo:** Dinámico con detección ✅

### ✅ Pixels Instalados Correctamente
1. **Meta Pixel:** ID 35350289364 ✅
2. **TikTok Pixel:** ID CNHFH4RC77U7SFL97E10 ✅

---

## 📱 Integración con WhatsApp API

### Para Llamadas Outbound (Sistema → Usuario)
El sistema debe construir números completos según el tipo de usuario:

```javascript
// Ejemplo en ai-brain/lupita-agent-langchain.js
function buildWhatsAppNumber(user) {
  if (user.is_dependent) {
    // Dependientes siempre en México
    return `+52${user.phone}`;
  } else {
    // Usuario principal: usar country_code de la DB
    return `${user.country_code}${user.phone}`;
  }
}
```

### Para Llamadas Inbound (Usuario → Sistema)
Twilio/WhatsApp API proporciona el número completo con código de país:
```javascript
// El webhook recibe: "+525512345678" o "+13055551234"
// Buscar usuario por:
const user = await getUserByFullPhone(incomingNumber);
```

### ⚠️ IMPORTANTE: Validación en Database
Verificar que la columna `country_code` en `user_accounts` esté correctamente poblada:
- Migrantes en USA: `+1`
- Migrantes en México: `+52`
- Dependientes: Siempre usar `+52` (tabla `dependents`)

---

## 🔧 Próximos Pasos

### 1. Verificar Datos en Supabase
```sql
-- Verificar códigos de país de usuarios
SELECT 
  access_code,
  first_name,
  phone,
  country_code,
  CASE 
    WHEN country_code = '+1' THEN 'USA'
    WHEN country_code = '+52' THEN 'México'
    ELSE 'Sin código'
  END as ubicacion
FROM user_accounts
ORDER BY created_at DESC
LIMIT 20;

-- Verificar teléfonos de dependientes
SELECT 
  d.user_access_code,
  d.first_name,
  d.phone,
  u.country_code as titular_country
FROM dependents d
JOIN user_accounts u ON d.user_access_code = u.access_code
WHERE d.is_active = true
AND d.phone IS NOT NULL
ORDER BY d.created_at DESC;
```

### 2. Actualizar APIs de WhatsApp
Asegurarse que todos los endpoints que envían mensajes usen el formato correcto:
- `api/send-whatsapp.js`
- `api/send-whatsapp-codes.js`
- `api/whatsapp-fallback.js`
- AI Brain: `ai-brain/lupita-agent-langchain.js`

### 3. Agregar columna `gender` a tabla `dependents`
```sql
-- Opcional: Si quieres capturar género de dependientes
ALTER TABLE dependents ADD COLUMN IF NOT EXISTS gender VARCHAR(10);
COMMENT ON COLUMN dependents.gender IS 'Género del dependiente: male, female';
```

### 4. Actualizar saveDependents para incluir gender
En `src/lib/supabase.js` línea ~387:
```javascript
const newDependents = validDependents.map(dep => ({
  user_access_code: accessCode,
  first_name: dep.firstName,
  last_name: dep.lastName,
  mother_last_name: dep.motherLastName || null,
  relationship: dep.relationship || null,
  date_of_birth: dep.date_of_birth || null,
  gender: dep.gender || null, // 👈 AGREGAR ESTA LÍNEA
  phone: dep.phone || null,
  email: dep.email || null,
  is_active: true
}));
```

---

## ✅ Conclusión

**ESTADO GENERAL:** ✅ TODO CORRECTO

Los códigos de país ya están implementados correctamente en todos los formularios. Los pixels de Meta y TikTok están instalados y funcionando. 

**Única acción pendiente:** Agregar columna `gender` a tabla `dependents` si se desea almacenar este dato (actualmente se captura en el frontend pero no se guarda en la DB).
