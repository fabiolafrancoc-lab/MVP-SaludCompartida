# 🔧 CONFIGURAR SQUARE SANDBOX EN VERCEL

**Urgente:** Necesitas configurar estas variables en Vercel para que Square funcione.

---

## 📋 VARIABLES A CONFIGURAR EN VERCEL

Ve a: **https://vercel.com/fabiolafrancoc-labs-projects/mvp-saludcompartida/settings/environment-variables**

### ✅ Variables de Sandbox (TESTING):

```bash
# Backend (Private)
SQUARE_ACCESS_TOKEN=EAAAEq4u-EL8m8fQg3Ll-8oKUwDM6W5kB8Hc0P3zfWHG-kMT1uPHqXNOJFXpCMgN
SQUARE_LOCATION_ID=LMPFAQBQ05B0R

# Frontend (Public)
NEXT_PUBLIC_SQUARE_APP_ID=sandbox-sq0idb-pNX5Tq5lR_PmqEVeNXu3VQ
NEXT_PUBLIC_SQUARE_LOCATION_ID=LMPFAQBQ05B0R
```

---

## 🧪 CÓMO PROBAR (Después de configurar en Vercel):

### 1. Espera el deploy (1-2 minutos)

### 2. Accede al diagnóstico:
```
https://saludcompartida.app/api/square-diagnostics
```

Deberías ver:
```json
{
  "validation": {
    "allVariablesPresent": true,
    "locationIdsMatch": true
  },
  "apiTest": {
    "success": true,
    "locations": [...]
  },
  "recommendations": [
    "✅ Configuración de Square parece correcta"
  ]
}
```

### 3. Prueba un pago:
```
URL: https://saludcompartida.app/registro-jan

Tarjeta de prueba (SANDBOX):
- Número: 4111 1111 1111 1111
- CVV: 111
- Fecha: 12/28
- Código postal: cualquiera
```

### 4. Verifica los logs en Vercel:
```
✅ [SQUARE] Modo: SANDBOX
✅ [SQUARE] Payment successful!
✅ [RESEND] Emails enviados exitosamente
```

---

## 🔄 CUANDO ESTÉ LISTO PARA PRODUCCIÓN:

### Cambiar a Production en Vercel:

```bash
# Backend (Private)
SQUARE_ACCESS_TOKEN=EAAAlw3HBOvZk9JPObBSZ4eQkEJnK8VkHoiY4ybMFXfyZKVysKAGaBjXjjHVXgvp
SQUARE_LOCATION_ID=L9W263XHC7876

# Frontend (Public)
NEXT_PUBLIC_SQUARE_APP_ID=sq0idp-TDgOgQ1CmhJqDdCqulhnIw
NEXT_PUBLIC_SQUARE_LOCATION_ID=L9W263XHC7876
```

El sistema detecta automáticamente el modo:
- Access Token empieza con `EAAAE` → **SANDBOX**
- Access Token empieza con `EAAA` → **PRODUCTION**

---

## ❌ SOLUCIÓN DE PROBLEMAS

### Si /api/square-diagnostics muestra errores:

**Error: "No se pudo conectar con Square API"**
- ✅ Verifica que Access Token sea correcto
- ✅ Revisa que Location ID coincida

**Error: "Faltan variables de entorno"**
- ✅ Asegúrate de agregar TODAS las variables en Vercel
- ✅ Redeploy después de agregar variables

**Error: "Location IDs no coinciden"**
- ✅ NEXT_PUBLIC_SQUARE_LOCATION_ID debe ser igual a SQUARE_LOCATION_ID

---

## 📧 FLUJO COMPLETO ESPERADO:

```
1. Usuario ingresa datos en /registro-jan
2. Continúa a /pago
3. Ingresa tarjeta de prueba: 4111 1111 1111 1111
4. Square procesa pago (SANDBOX o PRODUCTION)
5. Supabase actualiza payment_status = 'completed'
6. Resend envía 2 emails automáticamente:
   ✉️ Email 1: Migrante (USA) - "El Que Nunca Olvida"
   ✉️ Email 2: Usuario México - "El Regalo de Amor"
7. Redirige a /confirmacion con confetti 🎊
```

---

## ✅ CHECKLIST RÁPIDO:

- [ ] Configurar 4 variables en Vercel
- [ ] Esperar deploy (1-2 min)
- [ ] Probar /api/square-diagnostics
- [ ] Hacer un registro de prueba
- [ ] Verificar que lleguen los 2 emails
- [ ] Revisar Supabase (payment_status = 'completed')

---

**🚀 UNA VEZ CONFIGURADO, TODO FUNCIONA AUTOMÁTICAMENTE**

Cualquier pago exitoso → Emails enviados → Usuario feliz
