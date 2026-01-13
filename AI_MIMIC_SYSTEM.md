# 🎭 Sistema de Mimic/Mirroring - AI Companion

## Concepto Psicológico

El **mirroring** o **mimic** es una técnica de psicología de comunicación donde una persona refleja subconscientemente el lenguaje, tono y patrones de comunicación de otra para crear **rapport** y conexión emocional.

### ¿Por qué es crítico?

En el mercado mexicano, especialmente con usuarios mayores, la **forma de hablar** es tan importante como el contenido. Si el usuario habla con refranes y el companion habla "formal", se siente desconexión. Si el usuario usa spanglish y el companion solo español puro, no hay alineación de frecuencias.

## Implementación Técnica

### 1. Detección Automática de Patrones

El sistema analiza **cada mensaje** del usuario y detecta:

#### 🗣️ **Uso de Refranes Mexicanos**
- Ejemplos detectados:
  - "Camarón que se duerme se lo lleva la corriente"
  - "Al mal paso darle prisa"
  - "No por mucho madrugar amanece más temprano"
  - "De tal palo tal astilla"
  - "Cada quien habla de cómo le va en la feria"

**Acción del AI:** Si detecta refranes, el companion **también** usa refranes en sus respuestas.

#### 🇺🇸🇲🇽 **Uso de Spanglish**
- Ejemplos detectados:
  - "Voy a textear a mi hijo"
  - "Fuimos al shopping"
  - "Okay, bye"
  - "Me mandó un email"
  - "Necesito parkear el carro"

**Acción del AI:** El companion mezcla inglés y español naturalmente.

#### 🌮 **Frecuencia de Mexicanismos**
- **Alta:** órale, ándale, qué padre, chido, no manches, híjole, al chile, neta
- **Media:** ahorita, pues, fíjate, mira, qué padre
- **Baja:** español estándar con pocos modismos

**Acción del AI:** Ajusta su densidad de mexicanismos para coincidir.

#### 👔 **Nivel de Formalidad**
- **Formal:** usted, señor/señora, disculpe, permiso, favor
- **Informal:** tú, compa, wey, órale, qué onda
- **Neutral:** balance entre ambos

**Acción del AI:** Refleja el nivel de formalidad del usuario.

### 2. Base de Datos

Agregamos columna `communication_style` a la tabla `ai_companions`:

```sql
communication_style JSONB DEFAULT '{
  "uses_refranes": false,
  "uses_spanglish": false,
  "formality": "neutral",
  "mexicanismos_frequency": "medium",
  "detected_patterns": []
}'
```

### 3. Flujo de Análisis

```
1. Usuario envía mensaje: "Órale compadre, cómo le va? Ya sabe que al mal paso darle prisa"

2. Sistema detecta:
   ✅ Refranes: true ("al mal paso darle prisa")
   ✅ Mexicanismos: high ("órale", "compadre")
   ✅ Formalidad: informal
   ✅ Spanglish: false

3. Sistema actualiza communication_style en BD

4. AI recibe instrucciones de mimic:
   "- El usuario USA REFRANES frecuentemente
    - Tú también debes usar refranes mexicanos
    - El usuario usa MUCHOS MEXICANISMOS
    - Usa expresiones como: órale, ándale, qué padre"

5. AI responde con mirroring:
   "¡Órale compadre! Pues ahí la llevamos, ya sabe que el que nace para tamal del cielo le caen las hojas. ¿Y usted cómo ha estado?"
```

## Ejemplos de Mimic en Acción

### Ejemplo 1: Usuario con Refranes

**Usuario:** "Pues mija, como dice el dicho, camarón que se duerme se lo lleva la corriente. Por eso me levanto temprano siempre."

**Companion SIN mimic:** "Qué bien que madrugas. Eso es muy saludable."

**Companion CON mimic:** "Ay sí, tiene toda la razón. Como dice el dicho, no por mucho madrugar amanece más temprano, pero sí ayuda a aprovechar el día. ¿A qué hora se despierta usted?"

### Ejemplo 2: Usuario con Spanglish

**Usuario:** "Tengo que ir al shopping ahorita porque mi hijo me va a textear para saber si ya compré las cosas."

**Companion SIN mimic:** "Ah, vas a ir de compras. Avísame cuando regreses."

**Companion CON mimic:** "Órale, va de shopping. Sí, mejor vaya de volada para que cuando su hijo le textee ya le pueda decir que ya está todo listo. Luego me platica cómo le fue, ¿sale?"

### Ejemplo 3: Usuario Formal

**Usuario:** "Disculpe señora, quisiera preguntarle si usted podría ayudarme con un favor."

**Companion SIN mimic:** "Claro compa, dime qué necesitas."

**Companion CON mimic:** "Con mucho gusto señor. Dígame en qué le puedo ayudar, estoy para servirle."

## Beneficios del Sistema

1. **Conexión Emocional:** El usuario siente "habla como yo, me entiende"
2. **Adopción:** Reduce fricción en la comunicación
3. **Retención:** Usuarios sienten que el companion es "de su mundo"
4. **Autenticidad:** No parece robot genérico, sino persona real de su cultura
5. **Diferenciación:** Competidores no tienen este nivel de personalización

## Archivos Involucrados

- `api/communication-analyzer.js` - Motor de análisis de patrones
- `api/ai-companion-engine.js` - Integración con GPT-4
- `scripts/add-communication-style.sql` - Migración de BD
- `scripts/create-ai-companion-tables.sql` - Schema completo

## Configuración

### 1. Ejecutar Migración en Supabase

```sql
ALTER TABLE ai_companions 
ADD COLUMN IF NOT EXISTS communication_style JSONB DEFAULT '{
  "uses_refranes": false,
  "uses_spanglish": false,
  "formality": "neutral",
  "mexicanismos_frequency": "medium",
  "detected_patterns": []
}'::jsonb;
```

### 2. El Análisis es Automático

No requiere configuración adicional. El sistema:
- Analiza cada mensaje automáticamente
- Actualiza el perfil progresivamente
- Ajusta el AI en tiempo real

## Evolución del Mimic

El sistema **aprende y evoluciona**:

- **Día 1:** Usuario dice "órale" una vez → Sistema detecta, pero no confirma patrón
- **Día 3:** Usuario usa "órale", "ándale", "no manches" → Sistema confirma: mexicanismos_frequency = "high"
- **Día 5:** Usuario empieza a usar refranes → Sistema activa uses_refranes = true
- **Día 7:** AI ya habla exactamente como el usuario

## Próximos Pasos

1. ✅ Sistema implementado
2. ⏳ Ejecutar migración SQL en Supabase
3. ⏳ Configurar OpenAI API key
4. ⏳ Probar con usuarios reales
5. 🔮 Futuro: Detectar humor, sarcasmo, nostalgia para mimic emocional

---

**Nota Cultural:** Este sistema es especialmente poderoso en México donde el lenguaje tiene MUCHA variación regional, generacional y cultural. Un mismo mensaje puede sonar cálido o frío dependiendo de cómo se dice.
