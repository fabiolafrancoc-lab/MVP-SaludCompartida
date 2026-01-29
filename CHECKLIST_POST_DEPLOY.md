# ✅ CHECKLIST POST-DEPLOY - VERIFICACIÓN MANUAL

## 📋 PASO 1: VERIFICAR VERCEL DASHBOARD

### A. Ir a Vercel Dashboard
1. Abrir: https://vercel.com/dashboard
2. Seleccionar proyecto: `MVP-SaludCompartida`
3. Verificar que el último deployment esté "Ready" ✅

### B. Verificar Build Logs
- Click en el último deployment
- Ver "Build Logs" → Debe decir "Build Completed" ✅
- Ver "Runtime Logs" → No debe tener errores críticos

---

## 🔐 PASO 2: VERIFICAR VARIABLES DE ENTORNO

### Ir a: Project Settings → Environment Variables

**Verificar que existan:**

#### Supabase (3 variables)
```
✅ NEXT_PUBLIC_SUPABASE_URL
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
✅ SUPABASE_SERVICE_KEY
```

#### Square Payment - PRODUCCIÓN (3 variables)
```
✅ SQUARE_APP_ID
✅ SQUARE_LOCATION_ID
✅ SQUARE_ACCESS_TOKEN
```

#### Resend Email (2 variables)
```
✅ RESEND_API_KEY
✅ RESEND_FROM_EMAIL
```

#### WATI WhatsApp (3 variables)
```
✅ WATI_API_URL
✅ WATI_API_TOKEN
✅ WATI_WHATSAPP_NUMBER
```

#### Meta Pixel (1 variable)
```
✅ NEXT_PUBLIC_META_PIXEL_ID
```

### ⚠️ SI FALTA ALGUNA:
1. Click "Add New"
2. Copiar de tu archivo `.env` local
3. Seleccionar environments: Production, Preview, Development
4. Save
5. **IMPORTANTE:** Redeploy para que tomen efecto
   - Click "Deployments" → Menú (…) → "Redeploy"

---

## 🧪 PASO 3: TESTING DE RUTAS

### Obtener tu URL de producción
- En Vercel Dashboard → Copy "Domain"
- Ejemplo: `https://mvp-salud-compartida.vercel.app`

### Probar cada ruta:

#### 1. Landing Page
```
URL: https://tu-dominio.vercel.app/landing-jan
✅ Debe cargar página completa
✅ Video debe reproducirse
✅ Formulario debe aparecer
✅ Botón "Continuar" debe funcionar
```

#### 2. Registro
```
URL: https://tu-dominio.vercel.app/registro-jan
✅ Formulario paso 1 (Migrante) debe aparecer
✅ Al llenar → mostrar paso 2 (Familiar)
✅ Botón "Continuar al Pago" debe funcionar
✅ Verificar en browser console (F12) → No errores de Supabase
```

#### 3. Payment
```
URL: https://tu-dominio.vercel.app/payment
✅ Square payment form debe cargar
✅ Al pagar con tarjeta de prueba → debe procesar
✅ Debe redirigir a /confirmacion
```

#### 4. Confirmación
```
URL: https://tu-dominio.vercel.app/confirmacion
✅ Confetti animation debe aparecer
✅ Códigos de familia deben mostrarse
✅ Botones "Ya Tengo Mi Código" deben funcionar
```

#### 5. Dashboard V2 (Staging)
```
URL: https://tu-dominio.vercel.app/dashboard-v2
✅ Debe cargar con diseño nuevo
✅ Logo debe aparecer
✅ Botones de WhatsApp deben funcionar
⚠️ Esta es la versión de prueba, NO activar hasta mañana
```

---

## 🔍 PASO 4: VERIFICAR INTEGRACIONES

### A. Supabase (Base de Datos)
1. Ir a: https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee
2. Click en "Table Editor"
3. Seleccionar tabla: `registrations`
4. **Hacer una prueba de registro en /registro-jan**
5. Verificar que aparezca nuevo row en tabla ✅
6. Verificar campos:
   - `family_code` debe ser 6 caracteres alfanuméricos (ej: "A3B7K9")
   - `companion_assigned` debe ser "lupita" o "fernanda"
   - `status` debe ser "pending_payment"

### B. Square Payment (Pagos)
1. Ir a: https://squareup.com/dashboard
2. Click en "Payments"
3. **Hacer prueba con tarjeta de prueba:**
   - Número: `4111 1111 1111 1111`
   - CVV: `111`
   - Fecha: Cualquier futura
4. Verificar que aparezca transacción ✅
5. **⚠️ IMPORTANTE:** Esto cobra dinero REAL en producción
   - Solo usar en testing controlado

### C. Meta Pixel (Analytics)
1. Ir a: https://business.facebook.com/events_manager2
2. Seleccionar tu Pixel ID: `35350289364`
3. Abrir /landing-jan en tu browser
4. En Events Manager → Ver evento "PageView" en tiempo real ✅
5. Llenar formulario → Ver evento "Lead" ✅
6. Ir a payment → Ver evento "InitiateCheckout" ✅

### D. Resend (Emails)
⚠️ **NO probar hasta que esté listo el endpoint completo**
- El código está listo en `/api/send-notifications`
- Falta testear end-to-end

### E. WATI (WhatsApp)
⚠️ **PENDIENTE:** Crear templates en WATI dashboard
1. Ir a: https://app.wati.io/dashboard
2. Click "Broadcast Templates"
3. Crear 4 templates según `WATI_TEMPLATES.md`
4. Submit for approval → Esperar 24-48h

---

## 🚨 PASO 5: VERIFICAR ERRORES

### Browser Console (F12)
1. Abrir cada ruta con DevTools abierto
2. Tab "Console" → No debe haber errores rojos críticos
3. Tab "Network" → Verificar que APIs respondan 200 OK

### Errores Comunes:
```javascript
❌ "NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined"
   → Falta variable en Vercel → Añadir y redeploy

❌ "Failed to fetch" en API calls
   → CORS issue o endpoint mal configurado
   → Verificar que API routes existan en /api/*

❌ "Square not loaded"
   → Script de Square no cargó
   → Verificar internet del usuario

❌ "Cannot read property 'family_code' of null"
   → sessionStorage vacío
   → Usuario llegó directo a /confirmacion sin pasar por registro
```

### Vercel Runtime Logs
1. En Vercel Dashboard → Deployments → Latest
2. Click "View Function Logs"
3. Filtrar por errores
4. Revisar stack traces

---

## 🔐 PASO 6: SEGURIDAD INMEDIATA

### CRÍTICO - Hacer AHORA:

#### A. Verificar .env NO esté en GitHub
```bash
# En tu terminal local:
cd /Users/fabiolafranco/Desktop/MVP-SaludCompartida

# Buscar si .env alguna vez se committeó:
git log --all --full-history -- .env

# Si aparece algo:
# 1. Rotar TODOS los tokens inmediatamente
# 2. Hacer git filter-branch para eliminar historial
```

#### B. Habilitar RLS en Supabase (30 minutos)
1. Ir a Supabase Dashboard
2. Click "Authentication" → "Policies"
3. Seleccionar tabla: `registrations`
4. Click "Enable RLS"
5. Click "New Policy" → "Create policy from template"
6. Seleccionar: "Enable read access for users based on user_id"
7. Modificar policy:
```sql
CREATE POLICY "Users can only see their own registrations"
ON registrations
FOR SELECT
USING (auth.uid() = user_id);
```

8. Repetir para tablas:
   - `service_usage`
   - `telemedicine_appointments`
   - `pharmacy_queries`
   - `companion_calls`

#### C. Verificar Square Credentials
1. Ir a: https://squareup.com/dashboard/account/credentials
2. Verificar que tu `ACCESS_TOKEN` sea válido
3. Si alguna vez se expuso en GitHub → **ROTAR INMEDIATAMENTE**
4. Generar nuevo token → Actualizar en Vercel

---

## 📊 PASO 7: MÉTRICAS INICIALES

### Establecer baseline antes del launch:

#### Supabase
- Número de registros actuales: _______
- Storage usado: _______
- API calls este mes: _______

#### Square
- Balance actual: $_______ USD
- Transacciones este mes: _______

#### Vercel
- Bandwidth usado: _______
- Function invocations: _______
- Build minutes: _______

**Anotar estos números para comparar post-launch**

---

## ✅ CHECKLIST FINAL

### Antes de lanzar mañana 12:00 PM:

- [ ] Vercel build: ✅ Success
- [ ] Todas las variables de entorno configuradas
- [ ] Landing page carga correctamente
- [ ] Registro guarda en Supabase
- [ ] Payment procesa con Square (PRODUCCIÓN)
- [ ] Confirmación muestra datos correctos
- [ ] Meta Pixel tracking eventos
- [ ] Browser console sin errores críticos
- [ ] RLS habilitado en Supabase
- [ ] .env verificado NO está en GitHub
- [ ] Square credentials seguras
- [ ] WATI templates creados (o usar fallback)
- [ ] Testing end-to-end completo
- [ ] Plan de rollback definido
- [ ] Número de soporte publicado

---

## 🚑 PLAN DE ROLLBACK

### Si algo falla después del launch:

#### Opción 1: Rollback en Vercel
1. Vercel Dashboard → Deployments
2. Buscar deployment anterior: `15a240f`
3. Click menú (…) → "Promote to Production"

#### Opción 2: Git Revert
```bash
git revert 9bb4382
git push origin main
# Vercel auto-deploys el revert
```

#### Opción 3: Pause incoming traffic
```bash
# Temporalmente redirigir todo a página de mantenimiento
# Añadir a vercel.json:
{
  "redirects": [
    {
      "source": "/(.*)",
      "destination": "/maintenance.html",
      "permanent": false
    }
  ]
}
```

---

## 📞 CONTACTOS DE EMERGENCIA

### Servicios:
- **Vercel Support:** https://vercel.com/support
- **Supabase Support:** https://supabase.com/support
- **Square Support:** 1-855-700-6000
- **Resend Support:** support@resend.com
- **WATI Support:** https://wati.io/support

### Monitoreo:
- **Vercel Status:** https://www.vercel-status.com/
- **Supabase Status:** https://status.supabase.com/
- **Square Status:** https://www.issquareup.com/

---

**Checklist creado:** January 29, 2026 - 12:10 PM
**Última actualización:** January 29, 2026 - 12:10 PM
**Próxima revisión:** January 30, 2026 - 9:00 AM

---

🎯 **OBJETIVO:** Sistema 100% funcional para launch 12:00 PM mañana
