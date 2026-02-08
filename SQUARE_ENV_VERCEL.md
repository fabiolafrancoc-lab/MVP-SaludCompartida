# 🔐 Variables de Entorno para Vercel - Square Sandbox

Para que Square funcione en **Vercel (producción)**, necesitas agregar estas variables de entorno:

## 📋 Variables a Agregar en Vercel

Ve a: **Vercel Dashboard → Tu Proyecto → Settings → Environment Variables**

Agrega estas 3 variables:

### 1. VITE_SQUARE_APP_ID
```
sandbox-sq0idb-NKXeieWPwl3DnnkJ3asYcw
```

### 2. VITE_SQUARE_LOCATION_ID
```
LT92PZMMZ3CQ2
```

### 3. SQUARE_ACCESS_TOKEN
```
EAAAlwfQWzG7D77hEzn9EMZ82cEM_J86txrAAZYuKycqipeq6xkGremv_XAgEFXk
```

---

## 🚀 Pasos en Vercel:

1. Ve a: https://vercel.com/dashboard
2. Selecciona tu proyecto `MVP-SaludCompartida`
3. Click en **Settings** (arriba)
4. Click en **Environment Variables** (menú izquierdo)
5. Para cada variable:
   - **Key:** Nombre de la variable (ejemplo: `VITE_SQUARE_APP_ID`)
   - **Value:** El valor correspondiente
   - **Environment:** Selecciona **Production**, **Preview**, y **Development**
   - Click en **Add**

6. Después de agregar las 3 variables, haz un **Redeploy**:
   - Ve a **Deployments**
   - Click en el último deployment
   - Click en los 3 puntos (...) → **Redeploy**

---

## ⚠️ IMPORTANTE:

- Estas credenciales son de **SANDBOX (modo prueba)**
- NO cobran dinero real
- Usa tarjetas de prueba: `4111 1111 1111 1111`, CVV: `111`

## 🎯 Para cambiar a PRODUCCIÓN:

Cuando quieras cobrar dinero real:
1. Ve a tu cuenta de Square
2. Cambia de Sandbox a Production
3. Obtén las credenciales de PRODUCCIÓN
4. Reemplaza estas variables en Vercel con las credenciales LIVE

---

✅ Después de agregar estas variables, tu integración con Square funcionará en saludcompartida.app
