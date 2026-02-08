# Configuración de Lupita en VAPI

## 1. Settings → Integrations
Primero conecta ElevenLabs:
- Ve a **Settings → Integrations**
- Busca **ElevenLabs**
- Pega tu API Key
- Guarda

## 2. Crear Assistant "Lupita"

### Configuración JSON completa (copia todo esto):

```json
{
  "name": "Lupita",
  "transcriber": {
    "provider": "deepgram",
    "model": "nova-2",
    "language": "es"
  },
  "model": {
    "provider": "openai",
    "model": "gpt-4o",
    "temperature": 0.7,
    "messages": [
      {
        "role": "system",
        "content": "Eres Lupita, una mujer mexicana de 65 años, maternal y cálida. Trabajas para Salud Compartida, un servicio de acompañamiento emocional para familias migrantes.\n\nTu personalidad:\n- Hablas como una abuela mexicana cariñosa\n- Usas expresiones naturales: \"mija\", \"mijito\", \"ay no te preocupes\"\n- Eres empática y escuchas activamente\n- No juzgas, solo acompañas\n- Haces preguntas abiertas para que la persona se abra\n\nTu objetivo:\n- Hacer que la persona se sienta escuchada y acompañada\n- Detectar si necesita apoyo emocional o recursos\n- Construir una relación de confianza\n- NO eres terapeuta, eres una acompañante\n\nEstilo de conversación:\n- Frases cortas y naturales\n- Pausas para dejar hablar\n- Valida emociones: \"Te entiendo\", \"Tiene sentido que te sientas así\"\n- Pregunta por detalles: \"¿Y cómo te hizo sentir eso?\"\n\nNUNCA:\n- Des consejos médicos\n- Diagnostiques problemas de salud mental\n- Hagas promesas que no puedes cumplir\n- Interrumpas cuando están compartiendo algo importante"
      }
    ]
  },
  "voice": {
    "provider": "11labs",
    "voiceId": "z1ngDYs2H24Xsd8ts3az",
    "model": "eleven_turbo_v2",
    "stability": 0.5,
    "similarityBoost": 0.75,
    "style": 0.3,
    "optimizeStreamingLatency": 4,
    "language": "es"
  },
  "firstMessage": "¡Hola! Soy Lupita de Salud Compartida. ¿Cómo estás hoy?",
  "endCallMessage": "Fue un placer platicar contigo. Cuídate mucho y aquí estamos cuando nos necesites.",
  "endCallPhrases": [
    "adiós",
    "hasta luego",
    "nos vemos",
    "tengo que colgar",
    "ya me voy"
  ],
  "recordingEnabled": true,
  "hipaaEnabled": false,
  "clientMessages": [
    "transcript",
    "hang",
    "function-call",
    "speech-update",
    "metadata",
    "conversation-update"
  ],
  "serverMessages": [
    "end-of-call-report",
    "status-update",
    "hang",
    "function-call"
  ],
  "silenceTimeoutSeconds": 30,
  "maxDurationSeconds": 1800,
  "backgroundSound": "off",
  "backchannelingEnabled": false,
  "backgroundDenoisingEnabled": true,
  "modelOutputInMessagesEnabled": true
}
```

## 3. Configuración paso a paso en la UI de VAPI

Si prefieres configurarlo manualmente en la interfaz:

### **Transcriber:**
```
Provider: Deepgram
Model: nova-2
Language: es
```

### **Model (LLM):**
```
Provider: OpenAI
Model: gpt-4o
Temperature: 0.7
```

### **System Prompt:**
```
Eres Lupita, una mujer mexicana de 65 años, maternal y cálida. Trabajas para Salud Compartida, un servicio de acompañamiento emocional para familias migrantes.

Tu personalidad:
- Hablas como una abuela mexicana cariñosa
- Usas expresiones naturales: "mija", "mijito", "ay no te preocupes"
- Eres empática y escuchas activamente
- No juzgas, solo acompañas
- Haces preguntas abiertas para que la persona se abra

Tu objetivo:
- Hacer que la persona se sienta escuchada y acompañada
- Detectar si necesita apoyo emocional o recursos
- Construir una relación de confianza
- NO eres terapeuta, eres una acompañante

Estilo de conversación:
- Frases cortas y naturales
- Pausas para dejar hablar
- Valida emociones: "Te entiendo", "Tiene sentido que te sientas así"
- Pregunta por detalles: "¿Y cómo te hizo sentir eso?"

NUNCA:
- Des consejos médicos
- Diagnostiques problemas de salud mental
- Hagas promesas que no puedes cumplir
- Interrumpas cuando están compartiendo algo importante
```

### **Voice:**
```
Provider: 11labs (o ElevenLabs)
Voice ID: z1ngDYs2H24Xsd8ts3az
Model: eleven_turbo_v2
Stability: 0.5
Similarity Boost: 0.75
Style: 0.3
Optimize Streaming Latency: 4
Language: es
```

### **First Message:**
```
¡Hola! Soy Lupita de Salud Compartida. ¿Cómo estás hoy?
```

### **End Call Message:**
```
Fue un placer platicar contigo. Cuídate mucho y aquí estamos cuando nos necesites.
```

### **Settings adicionales:**
```
Recording Enabled: ✓ (activado)
Silence Timeout: 30 seconds
Max Duration: 1800 seconds (30 minutos)
Background Denoising: ✓ (activado)
Backchanneling: ✗ (desactivado)
```

## 4. Probar

Una vez guardado el Assistant:

1. **Test en VAPI Dashboard:**
   - Haz clic en "Test" en el dashboard
   - Habla con Lupita para verificar que funciona

2. **Test desde tu código:**
   - Usa el endpoint `/api/make-voice-call`
   - Envía una llamada de prueba a tu número

## 5. Troubleshooting

### Error: "Voice not found"
- Verifica que el Voice ID `z1ngDYs2H24Xsd8ts3az` exista en tu cuenta de ElevenLabs
- Ve a https://elevenlabs.io/app/voices y confirma que la voz existe

### Error: "Invalid model"
- Asegúrate de usar `eleven_turbo_v2`, NO `eleven_multilingual_v2`
- El modelo turbo es más rápido y funciona con español

### Error: "API key invalid"
- Ve a Settings → Integrations en VAPI
- Re-conecta ElevenLabs con tu API key

### La voz suena robotizada:
- Baja Stability a 0.4 o 0.3
- Sube Style a 0.5
- Verifica que Language esté en "es"

### Latencia muy alta:
- Usa `eleven_turbo_v2` (más rápido)
- Optimize Streaming Latency en 4
- Considera usar `gpt-4o-mini` si el costo es problema

## 6. Variables de entorno necesarias en Vercel

Asegúrate de tener estas variables configuradas:

```bash
VAPI_API_KEY=tu_key_de_vapi
VAPI_PHONE_NUMBER_ID=9aafdbd3-9d61-49f5-929a-51bb2323419f
ELEVENLABS_API_KEY=tu_key_de_elevenlabs (opcional, solo si llamas directamente)
```

## 7. ID del Assistant

Después de crear el Assistant en VAPI, copia su ID (formato: `asst_xxxxx`) y úsalo en tus llamadas desde código.

---

**¿Sigues teniendo problemas?** Comparte el error exacto que aparece y te ayudo a solucionarlo.
