# 🧠 Sistema de Memoria Conversacional

## 🎯 Propósito

**PROBLEMA RESUELTO:** Lupita (AI Companion) necesita **recordar conversaciones anteriores** con cada usuario para:
- No partir de cero en cada llamada
- Retomar temas importantes
- Construir confianza a largo plazo
- Personalizar la conversación

---

## 📊 Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUJO COMPLETO                            │
└─────────────────────────────────────────────────────────────┘

1. ANTES DE LLAMAR
   └─→ GET /api/get-call-context?userId=+525512345678
       ├─ Obtiene perfil del usuario
       ├─ Historial de llamadas
       ├─ Sugerencias de apertura
       └─ Tips personalizados

2. DURANTE LA LLAMADA
   └─→ [Lupita usa el contexto para personalizar]
       ├─ "Hola Señora Lupita, ¿cómo ha seguido de su diabetes?"
       ├─ "¿Cómo está su hijo Juan?"
       └─ [Usuario se siente escuchado y recordado]

3. DESPUÉS DE LLAMAR
   └─→ POST /api/test-recording-upload (subir audio)
       ├─ Transcripción (Whisper)
       ├─ Análisis (GPT-4)
       └─→ POST /api/update-user-profile
           ├─ Extrae nueva información
           ├─ Actualiza perfil del usuario
           └─ Prepara contexto para SIGUIENTE llamada
```

---

## 🗄️ Base de Datos

### Tabla: `user_conversation_profiles`
**Perfil acumulativo de cada usuario**

```sql
CREATE TABLE user_conversation_profiles (
  -- Identificación
  user_id TEXT PRIMARY KEY,
  
  -- Personal
  name TEXT,
  preferred_name TEXT,  -- "Señora Lupita"
  age_range TEXT,
  location TEXT,
  family_members JSONB, -- ["hijo Juan", "esposo Pedro"]
  
  -- Salud
  health_conditions TEXT[], -- ["diabetes", "presión alta"]
  medications TEXT[],
  last_symptoms TEXT[],    -- Síntomas ACTUALES
  health_concerns TEXT[],
  
  -- Emocional
  emotional_state TEXT,     -- "preocupada", "animada"
  support_network TEXT[],   -- ["hija la ayuda"]
  stressors TEXT[],         -- ["dinero", "salud del esposo"]
  
  -- Económico
  income_situation TEXT,
  economic_concerns TEXT[],
  products_interested JSONB,
  
  -- Historial
  total_calls INTEGER,
  first_contact_date TIMESTAMPTZ,
  last_contact_date TIMESTAMPTZ,
  conversation_summary TEXT,  -- Resumen acumulativo
  key_topics JSONB
);
```

### Tabla: `call_extracted_info`
**Información nueva de cada llamada**

```sql
CREATE TABLE call_extracted_info (
  call_recording_id UUID,
  user_id TEXT,
  
  -- Información descubierta en ESTA llamada
  new_personal_info JSONB,
  new_health_info JSONB,
  new_emotional_info JSONB,
  new_economic_info JSONB
);
```

---

## 🔄 Uso Paso a Paso

### **PASO 1: Setup (Una vez)**

```bash
# 1. Ejecuta el SQL en Supabase
node scripts/step6-add-user-memory.sql

# 2. Deploy los nuevos endpoints
git add api/update-user-profile.js api/get-call-context.js
git commit -m "feat: Add user memory system"
git push origin main
```

---

### **PASO 2: Antes de Llamar (Obtener Contexto)**

```bash
# Obtener contexto de Señora Lupita
curl "https://www.saludcompartida.app/api/get-call-context?userId=%2B525512345678" | jq .
```

**Respuesta (Primera Llamada):**
```json
{
  "isFirstCall": true,
  "message": "Primera llamada con este usuario",
  "suggestedOpening": "Hola, le habla Karina de Salud Compartida. ¿Cómo está usted el día de hoy?",
  "tips": [
    "Presentarse claramente",
    "Explicar el propósito de la llamada",
    "Preguntar por su estado de salud general"
  ]
}
```

**Respuesta (Llamada Subsecuente):**
```json
{
  "isFirstCall": false,
  "user": {
    "name": "Señora Lupita",
    "totalCalls": 3,
    "lastCallDate": "2026-01-14",
    "daysSinceLastCall": 5
  },
  "knownInformation": {
    "health": {
      "conditions": ["diabetes", "presión alta"],
      "lastSymptoms": ["dolor de cabeza"],
      "medications": ["metformina"]
    },
    "personal": {
      "family": ["hijo Juan", "esposo Pedro"],
      "location": "Ecatepec"
    },
    "emotional": {
      "lastState": "preocupada",
      "supportNetwork": ["hija la ayuda con medicinas"],
      "stressors": ["dinero apretado", "salud del esposo"]
    }
  },
  "callGuidance": {
    "greeting": "Hola Señora Lupita, le habla Karina de Salud Compartida.",
    "openingQuestions": [
      "¿Cómo ha seguido de su dolor de cabeza?",
      "¿Cómo está su esposo Pedro?"
    ],
    "topicsToExplore": [
      "Seguimiento: control de diabetes",
      "Interés en: medidor de glucosa"
    ],
    "thingsToAvoid": [
      "Tema sensible: dinero apretado"
    ]
  },
  "tips": [
    "✅ Usar: 'Señora Lupita' (así le gusta que le llamen)",
    "💙 Usuario estuvo emotivo en última llamada - usar validación emocional",
    "🏥 Condiciones conocidas: diabetes, presión alta",
    "👥 Red de apoyo: hija la ayuda con medicinas"
  ]
}
```

---

### **PASO 3: Durante la Llamada**

Lupita (AI o humano) usa el contexto:

```
Karina: "Hola Señora Lupita, le habla Karina de Salud Compartida. 
         ¿Cómo ha seguido de su dolor de cabeza?"

Lupita: "Ay Karina, ya mejor gracias. Pero ahora mi esposo Pedro 
         está muy enfermo..."

Karina: [Valida emoción] "Me imagino que debe ser muy difícil verlo así.
         ¿Qué síntomas tiene?"

[Lupita se siente escuchada porque Karina RECORDÓ:]
- Su nombre preferido (Señora Lupita)
- Su esposo (Pedro)
- Su dolor de cabeza anterior
```

---

### **PASO 4: Después de la Llamada (Actualizar Perfil)**

```bash
# 1. Subir y transcribir la grabación
curl -X POST https://www.saludcompartida.app/api/test-recording-upload \
  -H "Content-Type: application/json" \
  -d '{
    "audioBase64": "...",
    "userId": "+525512345678",
    "agentId": "karina_001",
    "duration": 180,
    "filename": "llamada-lupita.m4a"
  }'

# Respuesta: { recordingId: "abc-123" }

# 2. Procesar transcripción
curl -X POST https://www.saludcompartida.app/api/process-transcription \
  -H "Content-Type: application/json" \
  -d '{"recordingId": "abc-123"}'

# 3. Actualizar perfil del usuario
curl -X POST https://www.saludcompartida.app/api/update-user-profile \
  -H "Content-Type: application/json" \
  -d '{"recordingId": "abc-123"}'
```

**Respuesta:**
```json
{
  "success": true,
  "userId": "+525512345678",
  "isFirstCall": false,
  "extractedInfo": {
    "personal": {
      "preferredName": "Señora Lupita",
      "familyMembers": ["esposo Pedro (enfermo)", "hijo Juan (vive lejos)"]
    },
    "health": {
      "conditions": ["diabetes", "presión alta"],
      "symptoms": ["cansancio"],
      "concerns": ["salud del esposo", "no puede pagar medicinas caras"]
    },
    "emotional": {
      "currentState": "preocupada",
      "supportNetwork": ["hija la ayuda", "vecina María la visita"],
      "stressors": ["enfermedad del esposo", "dinero"]
    },
    "conversationSummary": "Lupita reporta mejoría en dolor de cabeza. Preocupada por salud de esposo Pedro (muy enfermo). Mencionó dificultad económica para medicinas. Hija y vecina la apoyan.",
    "keyTopics": ["salud del esposo", "costo de medicinas", "cansancio"]
  },
  "nextCallContext": {
    "totalPreviousCalls": 4,
    "keyFacts": [
      "Llamar: Señora Lupita",
      "Condiciones: diabetes, presión alta",
      "Familia: esposo Pedro (enfermo), hijo Juan, hija"
    ],
    "conversationStarters": [
      "Hola Señora Lupita, ¿cómo ha estado? ¿Cómo sigue su esposo Pedro?",
      "¿Pudieron conseguir las medicinas para su esposo?"
    ]
  }
}
```

---

## 💡 Casos de Uso

### Caso 1: Primera Llamada
```json
GET /api/get-call-context?userId=+525599999999
→ isFirstCall: true
→ Lupita: Presentación estándar, recopilar información básica
```

### Caso 2: Segunda Llamada (1 semana después)
```json
GET /api/get-call-context?userId=+525512345678
→ knownInformation: {health: ["diabetes"], family: ["hijo Juan"]}
→ Lupita: "Hola Señora Lupita, ¿cómo está? ¿Cómo ha seguido de su diabetes?"
```

### Caso 3: Llamada Después de Mucho Tiempo (2 meses)
```json
GET /api/get-call-context?userId=+525512345678
→ daysSinceLastCall: 60
→ Tip: "Hace 60 días desde última llamada - preguntar qué ha pasado"
→ Lupita: "¡Señora Lupita! Hace tiempo que no hablamos. ¿Cómo ha estado todo?"
```

---

## 📈 Beneficios

### Para el Usuario (Lupita - Señora Lupita)
- ✅ **Se siente escuchada:** "Se acuerdan de mí"
- ✅ **Confianza:** "No tengo que repetir mi historia"
- ✅ **Conexión emocional:** "Les importo"
- ✅ **Mejor adherencia:** Más probable que siga recomendaciones

### Para el Agente (Karina)
- ✅ **Conversaciones más naturales:** No parte de cero
- ✅ **Menos tiempo explicando:** Usuario ya confía
- ✅ **Mejores resultados:** Seguimiento efectivo
- ✅ **Satisfacción laboral:** Relaciones genuinas

### Para la Organización
- ✅ **Retención de usuarios:** 3-5x más engagement
- ✅ **Mejores outcomes de salud:** Seguimiento consistente
- ✅ **Datos ricos:** Perfiles completos para análisis
- ✅ **Escalabilidad:** AI puede usar mismo sistema

---

## 🔐 Privacidad

**IMPORTANTE:** Esta información es sensible.

```javascript
// RLS en Supabase
ALTER TABLE user_conversation_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Solo service_role puede acceder"
  ON user_conversation_profiles
  FOR ALL
  USING (auth.role() = 'service_role');
```

- ❌ NO exponer perfiles en frontend
- ❌ NO compartir información entre usuarios
- ✅ Solo accessible vía API con auth
- ✅ Cumplir con GDPR/privacidad mexicana

---

## 🚀 Próximos Pasos

1. **AHORA:** Ejecuta step6 SQL en Supabase
2. **DESPUÉS:** Deploy los endpoints
3. **PRUEBA:** Con la grabación de Señora Lupita existente
4. **INTEGRA:** Con WhatsApp AI Companion cuando Meta desbloquee

---

## 📞 Ejemplo de Flujo Completo

```javascript
// ANTES de llamar
const context = await fetch('/api/get-call-context?userId=+525512345678');
// Lupita ve: "Señora Lupita, 3 llamadas previas, diabetes, hijo Juan"

// DURANTE llamada
// Lupita: "Hola Señora Lupita, ¿cómo está? ¿Cómo ha seguido de su diabetes?"

// DESPUÉS de llamar
const recording = await uploadRecording(audio);
await processTranscription(recording.id);
await updateUserProfile(recording.id);
// Perfil actualizado con nueva información
```

---

**Sistema listo para implementar. ¿Ejecutamos step6 en Supabase?**
