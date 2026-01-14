# 🧪 TESTING DEL SISTEMA DE GRABACIONES

## Pre-requisitos

Antes de hacer testing, asegúrate de tener:

1. ✅ Tabla `call_recordings` creada en Supabase
2. ✅ Vercel Blob Storage habilitado
3. ✅ Variable `BLOB_READ_WRITE_TOKEN` en Vercel
4. ✅ Variable `OPENAI_API_KEY` en Vercel
5. ✅ Código desplegado en Vercel

---

## Opción 1: Testing con Script Local (Recomendado)

### Paso 1: Preparar audio de prueba

Graba una llamada de prueba en tu teléfono:
- Duración: 1-3 minutos
- Formato: `.m4a`, `.mp3`, `.opus`, o `.wav`
- Contenido: Conversación simulada en español (agente + usuario)

Ejemplo de conversación de prueba:
```
Agente: "Hola María, ¿cómo te sientes hoy?"
Usuario: "Hola, pues me duele un poco la cabeza pero estoy bien"
Agente: "Entiendo, ¿has tomado tus medicamentos hoy?"
Usuario: "Sí, ya tomé las pastillas en la mañana"
Agente: "Excelente, me da mucho gusto. ¿Y cómo está tu familia?"
Usuario: "Bien, gracias a Dios. Extraño mucho a mis hijos que están en México"
Agente: "Te entiendo perfectamente, sé que es difícil la distancia..."
```

### Paso 2: Ejecutar el script

```bash
# Desde la raíz del proyecto
node scripts/test-upload-recording.js /ruta/a/tu/audio.m4a
```

Ejemplo:
```bash
node scripts/test-upload-recording.js ~/Desktop/test-call.m4a
```

### Paso 3: Observar el progreso

El script mostrará:
```
📂 Reading audio file: ~/Desktop/test-call.m4a
✅ File loaded: { size: '1.2 MB', filename: 'test-call.m4a' }

📤 Uploading to: https://saludcompartida.app/api/test-recording-upload
✅ Upload successful!
Recording ID: 123e4567-e89b-12d3-a456-426614174000
Blob URL: https://...

⏳ Monitoring transcription and analysis...

[10:30:15] Transcription: processing | Analysis: pending
[10:30:20] Transcription: processing | Analysis: pending
[10:30:25] Transcription: completed | Analysis: processing
[10:30:30] Transcription: completed | Analysis: completed

✅ Processing complete!

📝 TRANSCRIPTION:
────────────────────────────────────────────────────────────────────────────────
Hola María, ¿cómo te sientes hoy? Hola, pues me duele un poco la cabeza pero...
────────────────────────────────────────────────────────────────────────────────

🔍 ANALYSIS:
Category: routine_checkin
Quality Rating: 4/5
Emotional Tone: nostálgico, confiado
Outcome: usuario_comprometido

💪 Techniques Used:
  - escucha_activa
  - validacion_emocional
  - preguntas_abiertas

✨ Power Phrases:
  - "Te entiendo perfectamente"
  - "Me da mucho gusto"

📈 Areas for Improvement:
  - Profundizar más en el tema de nostalgia
```

---

## Opción 2: Testing Manual con Postman/Insomnia

### Paso 1: Preparar el audio

1. Graba o descarga un audio de prueba
2. Conviértelo a base64:

```bash
# En Mac/Linux
base64 -i audio.m4a -o audio.txt

# En Windows (PowerShell)
[Convert]::ToBase64String([IO.File]::ReadAllBytes("audio.m4a")) | Out-File audio.txt
```

### Paso 2: Hacer POST request

**Endpoint:** `https://saludcompartida.app/api/test-recording-upload`

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "audioBase64": "<contenido del archivo audio.txt>",
  "userId": "+525512345678",
  "agentId": "agent_test_001",
  "duration": 120,
  "tags": ["test", "demo"],
  "filename": "test-call.m4a"
}
```

### Paso 3: Verificar respuesta

Deberías recibir:
```json
{
  "success": true,
  "message": "Recording uploaded successfully. Transcription and analysis in progress.",
  "recording": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "blobUrl": "https://...",
    "status": {
      "transcription": "pending",
      "analysis": "pending"
    }
  },
  "next": "Check status at: /api/get-recording-status?id=123e4567..."
}
```

### Paso 4: Consultar status

**Endpoint:** `https://saludcompartida.app/api/get-recording-status?id=<RECORDING_ID>`

**Method:** `GET`

Espera 30-60 segundos y consulta. Cuando ambos estén "completed", verás la transcripción y análisis completos.

---

## Opción 3: Verificar en Supabase (Manual)

### Consultar la tabla directamente:

```sql
-- Ver todas las grabaciones
SELECT 
  id,
  user_id,
  agent_id,
  recording_date,
  duration_seconds,
  transcription_status,
  analysis_status,
  analysis_quality_rating,
  analysis_category
FROM call_recordings
ORDER BY recording_date DESC;

-- Ver grabación específica con detalles completos
SELECT * FROM call_recordings 
WHERE id = '123e4567-e89b-12d3-a456-426614174000';

-- Ver mejores llamadas (ya analizadas)
SELECT * FROM best_training_calls;

-- Ver performance por agente
SELECT * FROM agent_performance;

-- Ver técnicas más efectivas
SELECT * FROM most_effective_techniques;
```

---

## 📊 Costos del Testing

### Por grabación de prueba (2-3 minutos):
- **Whisper transcription**: ~$0.02 (2 minutos x $0.006/min)
- **GPT-4 analysis**: ~$0.03 (1 request)
- **Blob storage**: ~$0.001 (2-3 MB)
- **Total por test**: ~$0.05

### 10 tests = $0.50
### 100 tests = $5.00

---

## ✅ Checklist de Verificación

Después del test, verifica:

- [ ] La grabación se subió correctamente a Blob Storage
- [ ] El registro apareció en la tabla `call_recordings`
- [ ] La transcripción se completó (status = 'completed')
- [ ] El texto transcrito es correcto (en español)
- [ ] El análisis se completó (status = 'completed')
- [ ] Las técnicas detectadas son relevantes
- [ ] Las power phrases capturadas son correctas
- [ ] El quality_rating está entre 1-5
- [ ] La categoría asignada tiene sentido

---

## 🚨 Troubleshooting

### Error: "BLOB_READ_WRITE_TOKEN not found"
- Ve a Vercel → Storage → Blob
- Verifica que el Blob Store esté creado
- Redeploy el proyecto

### Error: "OpenAI API error"
- Verifica que `OPENAI_API_KEY` esté configurada en Vercel
- Verifica que tengas créditos en tu cuenta OpenAI
- Revisa los logs en Vercel

### Transcription stuck en "processing"
- Espera hasta 2 minutos (Whisper puede tardar)
- Si pasa de 3 minutos, revisa Vercel logs
- Verifica que el formato de audio sea compatible

### Analysis stuck en "processing"
- GPT-4 puede tardar 30-60 segundos
- Si pasa de 2 minutos, revisa Vercel logs
- Puede haber límite de rate en OpenAI

---

## 🎯 Siguiente Paso

Una vez que el testing funcione:

1. Documenta las primeras grabaciones como ejemplos
2. Identifica patterns en las técnicas que funcionan
3. Empieza a construir library de power phrases
4. Usa los insights para training de agentes reales

---

**¿Listo para tu primer test?** 🚀

Recuerda:
- Empieza con un audio corto (1-2 minutos)
- Usa conversación en español
- Simula una llamada real (agente + usuario)
