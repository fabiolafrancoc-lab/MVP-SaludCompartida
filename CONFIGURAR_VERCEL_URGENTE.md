# 🚨 CONFIGURACIÓN URGENTE DE VERCEL

## EL PROBLEMA

El formulario de pago funciona, Square genera el token correctamente (✅ Token generado), pero cuando intenta procesar el pago en el backend, falla porque **las variables de entorno NO están en Vercel**.

## SOLUCIÓN: AGREGAR VARIABLES EN VERCEL (5 MINUTOS)

### PASO 1: Ve a Vercel
1. Abre: https://vercel.com
2. Login con tu cuenta
3. Busca tu proyecto "MVP-SaludCompartida" (o como se llame)
4. Click en el proyecto

### PASO 2: Ve a Settings → Environment Variables
1. Click en "Settings" (arriba)
2. Click en "Environment Variables" (menú izquierdo)

### PASO 3: Agrega estas 6 variables UNA POR UNA

**IMPORTANTE:** Copia EXACTAMENTE como están aquí:

#### Variable 1:
```
Name: NEXT_PUBLIC_SQUARE_APP_ID
Value: sq0idp-PM-rngX8E8LPCUr9iqsbyg
```
✅ Production ✅ Preview ✅ Development

#### Variable 2:
```
Name: NEXT_PUBLIC_SQUARE_LOCATION_ID
Value: L9W263XHC7876
```
✅ Production ✅ Preview ✅ Development

#### Variable 3:
```
Name: SQUARE_ACCESS_TOKEN
Value: EAAAl5N2b-Neiglcuco29GBn1BJkHjwP2wdWKeOgElk-CWFQGnrTXcLTiltdy7oj
```
✅ Production ✅ Preview ✅ Development

#### Variable 4:
```
Name: SQUARE_LOCATION_ID
Value: L9W263XHC7876
```
✅ Production ✅ Preview ✅ Development

#### Variable 5:
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://rzmdekjegbdgitqekjee.supabase.co
```
✅ Production ✅ Preview ✅ Development

#### Variable 6:
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bWRla2plZ2JkZ2l0cWVramVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2ODY4NTgsImV4cCI6MjA1MjI2Mjg1OH0.wUMLWc97WMJW0Q6KgDO-x10Klu8FrXKk_M0bUmX1QTg
```
✅ Production ✅ Preview ✅ Development

---

### PASO 4: Redesplegar (CRUCIAL)

**Después de agregar TODAS las variables:**

1. Ve a "Deployments" (arriba)
2. Busca el deployment más reciente
3. Click en los 3 puntos (···) al lado derecho
4. Click en "Redeploy"
5. Confirma "Redeploy"

**ESPERA 2-3 MINUTOS** para que termine el build.

---

## VERIFICACIÓN

### ¿Cómo saber si funcionó?

1. Espera a que termine el build en Vercel
2. Ve a: https://saludcompartida.app/registro-jan
3. Llena el formulario
4. Click "Continuar al pago"
5. Ingresa una tarjeta de prueba:
   - **Número:** 4111 1111 1111 1111
   - **CVV:** 111
   - **Fecha:** Cualquier fecha futura
6. Click "Pagar $12.00 USD / mes"

**SI FUNCIONA:** Verás "¡Pago Exitoso!" y te redirigirá a confirmación.

**SI SIGUE FALLANDO:** Avísame y revisamos los logs de Vercel.

---

## SCREENSHOT DE CÓMO SE VE EN VERCEL

Debería verse así:

```
Environment Variables

NEXT_PUBLIC_SQUARE_APP_ID          sq0idp-PM-rngX8E8L...  Production, Preview, Development
NEXT_PUBLIC_SQUARE_LOCATION_ID     L9W263XHC7876          Production, Preview, Development
SQUARE_ACCESS_TOKEN                EAAAl5N2b-Neiglcu...   Production, Preview, Development
SQUARE_LOCATION_ID                 L9W263XHC7876          Production, Preview, Development
NEXT_PUBLIC_SUPABASE_URL           https://rzmdekje...    Production, Preview, Development
NEXT_PUBLIC_SUPABASE_ANON_KEY      eyJhbGciOiJIUzI1...    Production, Preview, Development
```

---

## ¿POR QUÉ PASÓ ESTO?

- `.env.local` **NO se sube a GitHub** (por seguridad, está en .gitignore)
- Vercel **NO lee .env.local** automáticamente
- **Debes configurar las variables manualmente en Vercel**

---

## DESPUÉS DE CONFIGURAR

Una vez que agregues las variables y redespliegues:

✅ El token se generará (ya funciona)
✅ El backend podrá conectarse a Square
✅ El pago se procesará correctamente
✅ La base de datos se actualizará
✅ Todo funcionará

**AVÍSAME CUANDO HAYAS AGREGADO LAS VARIABLES Y REDESPLEGADO.**
