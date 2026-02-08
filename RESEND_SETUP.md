# 🔧 Configuración de Resend para Envío de Emails

## ❌ Problema Actual

Los emails NO se están enviando porque **falta la API KEY de Resend**.

## ✅ Solución

### Paso 1: Obtener API Key de Resend

1. Ve a [https://resend.com](https://resend.com)
2. Crea una cuenta o inicia sesión
3. Ve a **API Keys** en el dashboard
4. Crea una nueva API Key
5. Copia la key (empieza con `re_...`)

### Paso 2: Configurar en Local

Abre el archivo `.env.local` y reemplaza:

```bash
RESEND_API_KEY=re_123456789_placeholder_key
```

Por tu key real:

```bash
RESEND_API_KEY=re_TU_KEY_REAL_AQUI
```

### Paso 3: Configurar en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Settings → Environment Variables
3. Agrega una nueva variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_TU_KEY_REAL_AQUI`
   - **Environment**: Production, Preview, Development
4. Guarda y haz redeploy del proyecto

### Paso 4: Verificar Dominio (Opcional pero Recomendado)

Para emails profesionales desde `@saludcompartida.com`:

1. En Resend Dashboard → Domains
2. Agrega tu dominio `saludcompartida.com`
3. Configura los registros DNS según las instrucciones
4. Actualiza `/api/send-email.js`:

```javascript
from: 'SaludCompartida <noreply@saludcompartida.com>',
```

## 📧 Emails que se Envían

Una vez configurado, el sistema enviará automáticamente:

### Al Registrarse:
1. **Email con código de acceso** al migrante (USA)
2. **Email con código de acceso** al familiar (México)
3. **Email de confirmación de registro** a ambos
4. **Email de notificación** a admin (ffranco@saludcompartida.com)

### Al Agendar Terapia:
1. **Confirmación al paciente**
2. **Confirmación al familiar** (si aplica)

## 🔍 Verificar que Funciona

1. Completa un registro de prueba
2. Revisa la consola del navegador (F12)
3. Busca mensajes como:
   - `✅ Email enviado al migrante`
   - `✅ Email enviado al familiar`
4. Revisa el inbox de los emails de prueba

## ⚠️ Problemas Comunes

### Error: "Missing API key"
- La variable `RESEND_API_KEY` no está configurada
- Revisa `.env.local` y Vercel Environment Variables

### Error: "Invalid API key"
- La key es incorrecta o está vencida
- Genera una nueva key en Resend Dashboard

### Emails no llegan:
- Revisa spam/junk
- Verifica que el email del destinatario sea válido
- Checa Resend Dashboard → Logs para ver el estado

## 📝 Estado Actual

- ✅ Código de envío implementado
- ✅ Registro en Supabase funcional
- ❌ **FALTA: API Key de Resend configurada**
- ❌ **FALTA: Variable de entorno en Vercel**

## 🚀 Próximos Pasos

1. Obtén API Key de Resend
2. Configura en `.env.local` 
3. Configura en Vercel
4. Redeploy el proyecto
5. Prueba el registro completo

---

**Documentación completa de Resend**: https://resend.com/docs
