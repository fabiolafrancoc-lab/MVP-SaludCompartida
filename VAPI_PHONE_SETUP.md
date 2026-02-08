# 📞 VAPI Phone Number Setup

## Problema Actual
Para hacer llamadas salientes con Vapi, necesitas registrar tu número de Twilio en el dashboard de Vapi primero.

## ✅ Solución (5 minutos)

### 1. Ve a Vapi Dashboard
```
https://vapi.ai/dashboard
```

### 2. Registra tu número de Twilio
- Click en **"Phone Numbers"** en el menú
- Click en **"Add Phone Number"**
- Selecciona **"Twilio"**
- Ingresa:
  - **Twilio Phone Number**: `+14155238886` (tu TWILIO_PHONE_NUMBER)
  - **Account SID**: (tu TWILIO_ACCOUNT_SID)
  - **Auth Token**: (tu TWILIO_AUTH_TOKEN)

### 3. Copia el Phone Number ID
- Una vez registrado, verás tu número en la lista
- Copia el **Phone Number ID** (ejemplo: `ph_abc123xyz...`)

### 4. Agrega a Vercel
```bash
# En Vercel Dashboard → Settings → Environment Variables
VAPI_PHONE_NUMBER_ID=ph_abc123xyz...
```

### 5. Redeploy
El próximo deploy usará automáticamente tu número registrado.

## 🧪 Probar después
```bash
curl -X POST https://saludcompartida.app/api/make-voice-call \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+13055227150",
    "agentId": "agent_005",
    "callReason": "welcome",
    "userName": "Fabiola"
  }'
```

## Variables de entorno necesarias
```env
VAPI_API_KEY=7a98160a-9d78-42ee-b2c2-26ee6e11accb
VAPI_PHONE_NUMBER_ID=ph_abc123xyz...  # ← AGREGAR ESTA
TWILIO_PHONE_NUMBER=+14155238886
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
```

## Notas
- El número de Twilio debe estar verificado y activo
- Vapi usará este número como "Caller ID" para todas las llamadas
- Una vez configurado, no necesitas cambiarlo
