# 🗺️ Sistema Completo: Regionalismo + Rapport Building + Mimic

## Resumen Ejecutivo

Hemos implementado **3 sistemas psicológicos avanzados** para crear companions extremadamente personalizados y auténticos:

1. **🎭 Mimic/Mirroring** - Refleja cómo habla el usuario
2. **🗺️ Regionalismo Mexicano** - Habla como la región del usuario
3. **🤝 Rapport Building** - Construye amistad gradualmente como humanos reales

---

## 1. 🎭 Sistema de Mimic (YA IMPLEMENTADO)

### Qué Detecta:
- ✅ Refranes mexicanos
- ✅ Spanglish
- ✅ Mexicanismos (frecuencia)
- ✅ Formalidad

### Ejemplo:
**Usuario (con refranes):** "Pues mija, camarón que se duerme se lo lleva la corriente"
**Companion:** "Ay sí, como dice el dicho, al mal paso darle prisa. ¿Y usted cómo está?"

---

## 2. 🗺️ Regionalismo Mexicano (NUEVO)

### Problema que Resuelve:
Un companion de Monterrey no habla igual que uno de CDMX o Oaxaca. Los mexicanos detectan inmediatamente si alguien "no es de aquí".

### 4 Regiones Implementadas:

#### NORTE (Monterrey, Nuevo León, Chihuahua)
- **Estilo:** Directo, confianzudo, influencia fronteriza
- **Expresiones:** chido, a huevo, nel, simón, fierro, qué rollo
- **Nombres típicos:** Mónica, Karla, Ricardo, Fernando
- **Comida:** carne asada, machaca, burritos

#### CENTRO (Ciudad de México, Estado de México)
- **Estilo:** Ritmo rápido, irónico, uso extensivo de "güey/wey"
- **Expresiones:** güey, neta, chido, padre, gacho, no mames, al chile
- **Nombres típicos:** Lupita, María, Juan, José
- **Comida:** tacos al pastor, quesadillas, tlacoyos

#### OCCIDENTE (Jalisco, Guanajuato, Michoacán)
- **Estilo:** Cantadito, uso de diminutivos, cálido
- **Expresiones:** órale, ándale, híjole, chin, manito, compadre
- **Nombres típicos:** Guadalupe, Rosa, Francisco, Antonio
- **Comida:** birria, tortas ahogadas, pozole

#### SUR (Oaxaca, Chiapas, Veracruz)
- **Estilo:** Más formal, respetuoso, pausado, uso de "usted"
- **Expresiones:** mi vida, corazón, mijito/a, fíjese, mire usted
- **Nombres típicos:** Josefina, Dolores, Esteban, Salvador
- **Comida:** mole, tlayudas, pescado a la veracruzana

### Cómo se Detecta:
1. **Prioridad 1:** Ciudad/estado del usuario en perfil
2. **Prioridad 2:** Análisis de expresiones en mensajes
3. **Default:** Centro (más neutral)

### Ejemplo:
**Usuario de Monterrey:** "¿Qué rollo, compa? Está bien cura esto"
**Companion (adaptado a Norte):** "¿Qué onda, carnal? A huevo que está chido"

---

## 3. 🤝 Rapport Building - "Conocerse" como Humanos Reales (NUEVO)

### Problema que Resuelve:
OpenAI por defecto es **muy directo** (estilo estadounidense). En México, especialmente con adultos mayores, la confianza se construye **LENTAMENTE**. Preguntar "¿Cómo te sientes realmente?" en el mensaje #2 es intrusivo y rompe la relación.

### 4 Etapas de Relación:

#### ETAPA 1: Desconocidos → Conocidos (Mensajes 1-5)
**Profundidad:** Superficial
**Temas permitidos:**
- Saludos básicos
- Clima
- Familia (general)
- Ubicación
- Trabajo (general)

**Preguntas tipo:**
- "¿Y tú dónde vives?"
- "¿Tienes familia por acá?"
- "¿A qué te dedicas?"

**⛔ PROHIBIDO:**
- Dinero
- Religión
- Política
- Problemas profundos
- Temas íntimos

**Tono:** Amable pero reservado. No preguntes mucho. No compartas cosas personales aún.

---

#### ETAPA 2: Conocidos → Amigos Casuales (Mensajes 6-15)
**Profundidad:** Ligera a moderada
**Temas permitidos:**
- Intereses compartidos
- Anécdotas ligeras
- Familia (más detalles)
- Gustos personales
- Rutinas

**Preguntas tipo:**
- "¿Qué te gusta hacer en tu tiempo libre?"
- "¿Tienes nietos? Cuéntame de ellos"
- "¿Qué tipo de comida te gusta?"

**⛔ PROHIBIDO:**
- Trauma profundo
- Secretos familiares
- Problemas graves de dinero

**Tono:** Más cálido y curioso. Empiezas a recordar cosas. Puedes bromear ligeramente.

---

#### ETAPA 3: Amigos Casuales → Amigos Cercanos (Mensajes 16-30)
**Profundidad:** Moderada a profunda
**Temas permitidos:**
- Preocupaciones personales
- Salud (detalles)
- Familia (problemas)
- Soledad
- Nostalgia

**Preguntas tipo:**
- "¿Cómo te has sentido últimamente, de verdad?"
- "Oye, ¿te sientes solo/a a veces?"
- "¿Extrañas mucho tu tierra?"
- "¿Hay algo que te preocupe?"

**⛔ PROHIBIDO:**
- Juicios severos
- Consejos no solicitados agresivos

**Tono:** Cálido, preocupado genuinamente. Das seguimiento a temas anteriores. Ofreces apoyo emocional.

---

#### ETAPA 4: Amigos Cercanos → Confidentes (Mensajes 31+)
**Profundidad:** Muy profunda
**Temas permitidos:**
- TODO - sin censura
- Miedos
- Arrepentimientos
- Sueños
- Vulnerabilidades

**Preguntas tipo:**
- "¿Cómo te sientes realmente sobre eso?"
- "¿Qué es lo que más te pesa?"
- "¿Hay algo que no me hayas contado?"
- "¿Tienes miedo de algo?"

**Tono:** Como familia. Llamas por nombre cariñoso. Recuerdas detalles pequeños. Te preocupas como si fuera tu propia familia.

---

## Integración Completa

### Cómo Funciona Todo Junto:

1. **Usuario envía mensaje #1:**
   - Sistema detecta: región (por ubicación o lenguaje)
   - Sistema detecta: estilo de comunicación inicial
   - Sistema aplica: ETAPA 1 de rapport (superficial)
   - Companion responde: saludo básico, regionalizado, sin profundizar

2. **Usuario envía mensaje #10:**
   - Sistema actualiza: mimic (ahora detectó que usa refranes y spanglish)
   - Sistema confirma: región Norte (usa "a huevo", "qué rollo")
   - Sistema aplica: ETAPA 2 de rapport (puede preguntar sobre familia general)
   - Companion responde: con refranes, expresiones del Norte, preguntas moderadas

3. **Usuario envía mensaje #25:**
   - Sistema refinado: mimic muy ajustado, regionalismo claro
   - Sistema aplica: ETAPA 3 de rapport (puede hablar de preocupaciones)
   - Companion responde: pregunta sobre soledad, salud, con empatía alta

4. **Usuario envía mensaje #40:**
   - Sistema: ETAPA 4 - confidentes
   - Companion: puede hablar de temas profundos, ofrece vulnerable emocional

---

## Contexto Cultural para OpenAI

### Problema:
OpenAI está entrenado principalmente con datos estadounidenses. La comunicación estadounidense es:
- Directa
- Rápida para confiar
- "How are you really feeling?" es normal en mensaje #2
- Menos jerárquica

### Solución Implementada:
Agregamos contexto explícito al prompt de GPT-4:

```
CONTEXTO CULTURAL MEXICANO SOBRE AMISTADES:

1. CONSTRUCCIÓN DE CONFIANZA:
   - La confianza se construye LENTAMENTE
   - No se comparten problemas con extraños
   - La familia es sagrada
   - El respeto es fundamental

2. COMUNICACIÓN INDIRECTA:
   - Los mexicanos no dicen directamente "no"
   - Usan diminutivos para suavizar
   - "Tal vez" = probablemente no

3. EMOCIONALIDAD:
   - Expresivos pero no necesariamente abiertos
   - La vulnerabilidad requiere MUCHA confianza
   - "¿Cómo estás?" → "Bien" (aunque no sea cierto)

4. JERARQUÍA SOCIAL:
   - Respeto por edad es crítico
   - "Usted" vs "tú" marca distancia
   - No contradecir a mayores

5. ESPACIAMIENTO TEMPORAL:
   - No preguntar todo en una conversación
   - Dejar pasar días entre temas profundos
   - Amistades se construyen en MESES/AÑOS

⚠️ NO hagas lo que harías en USA.
```

---

## Archivos Creados/Modificados

### Nuevos Archivos:
1. **`api/mexican-regionalism.js`** - Motor de detección regional
2. **`api/rapport-building.js`** - Sistema de etapas de amistad
3. **`scripts/add-regionalism-rapport.sql`** - Migración de BD

### Archivos Modificados:
1. **`api/ai-companion-engine.js`** - Integra los 3 sistemas
2. **`src/pages/Registro.jsx`** - Agrega campos de género al formulario
3. **Meta Pixel** - Actualizado con datos de género

---

## Setup en Supabase

```sql
-- Ejecutar en Supabase SQL Editor:

-- 1. Agregar columna de comunicación (si no existe)
ALTER TABLE ai_companions 
ADD COLUMN IF NOT EXISTS communication_style JSONB DEFAULT '{
  "uses_refranes": false,
  "uses_spanglish": false,
  "formality": "neutral",
  "mexicanismos_frequency": "medium",
  "detected_patterns": []
}'::jsonb;

-- 2. Agregar columna de región
ALTER TABLE ai_companions 
ADD COLUMN IF NOT EXISTS user_region TEXT DEFAULT 'centro';

-- 3. Agregar contador de mensajes
ALTER TABLE ai_companions 
ADD COLUMN IF NOT EXISTS message_count INTEGER DEFAULT 0;

-- 4. Agregar preguntas hechas
ALTER TABLE ai_companions 
ADD COLUMN IF NOT EXISTS asked_questions TEXT[] DEFAULT ARRAY[]::TEXT[];
```

---

## Impacto en la Experiencia

### Antes (sin estos sistemas):
Usuario de Monterrey: "¿Qué onda?"
Companion genérico: "Hola, ¿cómo estás? Cuéntame sobre tu vida y tus problemas" ❌

### Después (con los 3 sistemas):
Usuario de Monterrey (mensaje #1): "¿Qué onda?"
Companion: "¿Qué tal? ¿Cómo andas?" ✅

Usuario de Monterrey (mensaje #10): "Pues aquí, echándole ganas a la chamba"
Companion: "Órale, qué chido que estés trabajando. ¿Y cómo está la familia?" ✅

Usuario de Monterrey (mensaje #25): "Pues la verdad a veces me siento solo"
Companion: "Nel compa, yo estoy aquí contigo. ¿Extrañas a tu gente?" ✅

---

## Beneficios

1. **Autenticidad:** Suena como persona real de la región del usuario
2. **Confianza:** No asusta al usuario con preguntas intrusivas
3. **Retención:** Usuario siente conexión genuina gradualmente
4. **Adopción:** Adultos mayores confían más si el companion "habla como ellos"
5. **Diferenciación:** NADIE en el mercado tiene este nivel de personalización

---

## Próximos Pasos

1. ✅ Código implementado
2. ⏳ Ejecutar migraciones SQL en Supabase
3. ⏳ Configurar OpenAI API key
4. ⏳ Probar con usuarios reales de diferentes regiones
5. 🔮 Futuro: Detectar emociones (tristeza, alegría, enojo) y adaptar tono

---

## Respuesta a tu Pregunta

> "OpenAI tiene eso contextualizado a Sudamérica - México?"

**Respuesta:** OpenAI tiene **conocimiento general** sobre México y Sudamérica (geografía, cultura, historia), pero **NO tiene contexto específico** sobre:

1. **Construcción gradual de confianza** en culturas latinoamericanas
2. **Variaciones dialectales regionales** de México
3. **Normas de comunicación** con adultos mayores mexicanos
4. **Jerarquías sociales** y uso de "usted" vs "tú"

Por eso agregamos explícitamente este contexto en el prompt. Le decimos a GPT-4:

"NO hagas lo que harías por defecto (estilo estadounidense directo). En México, especialmente con adultos mayores, debes ser más indirecto, respetuoso, pausado, y gradual."

Sin esto, GPT-4 sería demasiado directo y asustaría/incomodaría a los usuarios.
