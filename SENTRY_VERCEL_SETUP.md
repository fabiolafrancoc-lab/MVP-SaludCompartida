# 🔧 CONFIGURACIÓN DE SENTRY EN VERCEL

## Variables que DEBES agregar en Vercel

Ve a: **https://vercel.com/fabiolafrancoc-lab/saludcompartida/settings/environment-variables**

Agrega estas 3 variables:

### 1. NEXT_PUBLIC_SENTRY_DSN
```
https://7424291d4047ffdeba57b9d6d9665ad9@o4510726860177408.ingest.us.sentry.io/4510727032406016
```
**Environment:** Production, Preview, Development

### 2. SENTRY_DSN
```
https://7424291d4047ffdeba57b9d6d9665ad9@o4510726860177408.ingest.us.sentry.io/4510727032406016
```
**Environment:** Production, Preview, Development

### 3. SENTRY_AUTH_TOKEN
```
(Déjala vacía por ahora - opcional para source maps)
```
**Environment:** Production

---

## ✅ Después de agregar las variables:

1. Haz clic en **"Redeploy"** en Vercel
2. Espera ~2 minutos a que termine el build
3. Visita tu app: https://saludcompartida.app
4. Ve a Sentry: https://sentry.io/organizations/salud-compartida/issues/
5. Verás los errores en tiempo real ✨

---

## 🎯 ¿QUÉ HACE SENTRY?

- ✅ Captura errores automáticamente en frontend y backend
- ✅ Stack traces completos para debugging
- ✅ Performance monitoring (velocidad de APIs)
- ✅ Alertas por email cuando hay errores
- ✅ Session replay (graba las sesiones de usuarios)

---

## 🚀 PRÓXIMO PASO

Después de configurar Sentry en Vercel, ve a Supabase y ejecuta el SQL para crear las tablas de funciones propietarias.
