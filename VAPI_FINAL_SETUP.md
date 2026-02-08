# ✅ CONFIGURACIÓN FINAL - VAPI.AI

## 🎯 PASO 1: AGREGAR API KEY EN VERCEL (2 minutos)

1. Ve a: https://vercel.com/fabiolafrancoc-lab/saludcompartida/settings/environment-variables

2. Click en **"Add New"**

3. Agrega esta variable:

```
Name: VAPI_API_KEY
Value: e4c6a7c4-203c-455f-ae23-cc46e5ed6bee
Apply to: ✅ Production ✅ Preview ✅ Development
```

4. Click **"Save"**

5. **IMPORTANTE:** Necesitas una variable más para el cron job:

```
Name: CRON_SECRET
Value: (genera un password aleatorio, ej: vapi_cron_2026_secure_xyz)
Apply to: ✅ Production ✅ Preview ✅ Development
```

6. **Redeploy** el proyecto:
   - Ve a Deployments
   - Click en "..." del último deployment
   - Click "Redeploy"

---

## 🗄️ PASO 2: CREAR TABLA EN SUPABASE (1 minuto)

1. Ve a: https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/editor

2. Click en **"SQL Editor"** (menú izquierdo)

3. Click en **"New Query"**

4. Copia y pega este SQL:

```sql
-- Tabla para programar llamadas de voz automáticas
CREATE TABLE IF NOT EXISTS scheduled_voice_calls (
  id BIGSERIAL PRIMARY KEY,
  user_phone VARCHAR(20) NOT NULL,
  user_name VARCHAR(200) NOT NULL,
  user_type VARCHAR(20),
  agent_id VARCHAR(20) NOT NULL,
  agent_name VARCHAR(100),
  call_reason VARCHAR(50) NOT NULL,
  scheduled_for TIMESTAMPTZ NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  vapi_call_id VARCHAR(100),
  call_started_at TIMESTAMPTZ,
  call_ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  transcript TEXT,
  summary TEXT,
  sentiment VARCHAR(20),
  appointment_scheduled BOOLEAN DEFAULT FALSE,
  escalated_to_human BOOLEAN DEFAULT FALSE,
  next_action TEXT,
  cost_usd DECIMAL(10, 4),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scheduled_calls_pending 
ON scheduled_voice_calls(scheduled_for, status)
WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_scheduled_calls_user 
ON scheduled_voice_calls(user_phone);

CREATE INDEX IF NOT EXISTS idx_scheduled_calls_agent 
ON scheduled_voice_calls(agent_id);
```

5. Click **"Run"** (abajo a la derecha)

6. Deberías ver: "Success. No rows returned"

---

## 🧪 PASO 3: HACER LLAMADA DE PRUEBA (3 minutos)

Espera 2 minutos a que Vercel termine de desplegar, luego:

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

**¡Tu teléfono debería sonar en ~10 segundos!** 📞

Contestas y escuchas a María diciendo:
"¡Hola Fabiola! Soy María de Salud Compartida. ¿Cómo estás? Esta es una prueba del sistema..."

---

## ✅ CHECKLIST:

- [ ] Variable VAPI_API_KEY agregada en Vercel
- [ ] Variable CRON_SECRET agregada en Vercel
- [ ] Redeploy hecho en Vercel (esperar 2 min)
- [ ] Tabla scheduled_voice_calls creada en Supabase
- [ ] Llamada de prueba ejecutada
- [ ] Llamada recibida y conversación exitosa

---

## 📊 SI TODO FUNCIONA:

Verás en el dashboard de Vapi.ai:
- ✅ Call created
- ✅ Duration: XX seconds
- ✅ Transcription disponible
- ✅ Cost: ~$0.08 por minuto

---

**¡Avísame cuando hayas completado estos pasos!** 🚀
