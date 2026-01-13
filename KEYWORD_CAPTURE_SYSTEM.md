# Sistema de Captura de Palabras Clave y Análisis de Comportamiento

## 🎯 Objetivo Principal

**Problema**: No existe información sobre patrones de comportamiento del segmento base de la pirámide en América Latina.

**Solución**: Sistema automatizado de captura de palabras clave que identifica:
- Problemas de salud reales (síntomas, medicamentos, remedios)
- Situación económica (trabajo, dinero, necesidades)
- Estado emocional (tristeza, alegría, estrés, soledad)
- Dinámicas sociales (familia, conflictos, relaciones)
- Elementos culturales (religión, tradiciones, costumbres)
- Experiencia migrante (nostalgia, documentos, discriminación)

## 🔍 Categorías de Análisis

### 1. SALUD (3 subcategorías)
- **salud_sintomas**: Dolor, cansancio, mareo, presión, diabetes, etc.
- **salud_medicamentos**: Pastillas, doctor, receta, farmacia, etc.
- **salud_remedios_caseros**: Té, hierbas, curandero, remedios de la abuela

### 2. ECONÓMICO (2 subcategorías)
- **economico_trabajo**: Trabajo, chamba, jale, sueldo, desempleo
- **economico_dinero**: Dinero, renta, deuda, no alcanza, remesas

### 3. EMOCIONAL (3 subcategorías)
- **emocional_tristeza**: Tristeza, soledad, llorar, depresión, angustia
- **emocional_alegria**: Feliz, contento, gracias a Dios, bendición
- **emocional_estres**: Estrés, no duermo, presionado, agobiado

### 4. SOCIAL (3 subcategorías)
- **social_familia**: Hijo, esposo, nieto, mamá, hermano, familia
- **social_conflictos**: Pelea, problema, no me habla, violencia
- **social_soledad**: Solo, nadie, no me visitan, sin compañía

### 5. CULTURAL (2 subcategorías)
- **cultural_religion**: Dios, Virgen, rezar, misa, fe, bendición
- **cultural_tradiciones**: Día de muertos, posadas, quinceañera, tamales

### 6. MIGRACIÓN (3 subcategorías)
- **migracion_nostalgia**: Extraño, mi tierra, mi pueblo, quisiera volver
- **migracion_documentos**: Papeles, visa, ilegal, deportación, ICE
- **migracion_discriminacion**: Por ser mexicano, no hablo inglés, racismo

### 7. NECESIDADES
- **necesidades_basicas**: Necesito, me falta, ayuda, cómo consigo

## 📊 Niveles de Importancia

- **HIGH**: Requiere atención inmediata (salud, emocional, conflictos)
- **MEDIUM**: Importante para seguimiento (familia, religión, trabajo)
- **LOW**: Contextual (tradiciones, gustos)

## 🛠️ Implementación Técnica

### Archivos Creados

1. **api/keyword-pattern-analyzer.js**
   - `analyzeKeywords(userId, message)`: Detecta palabras clave en mensaje
   - `getUserBehaviorPatterns(userId)`: Patrones individuales
   - `getPopulationPatterns(filters)`: Patrones agregados poblacionales
   - `generateInsightsFromKeywords()`: Genera recomendaciones para el AI

2. **scripts/create-keyword-analysis-table.sql**
   - Tabla `keyword_analysis`: Almacena cada análisis
   - Vista materializada `keyword_patterns_summary`: Agregados rápidos
   - Índices GIN para búsqueda en JSONB
   - RLS (Row Level Security) configurado

3. **api/behavior-patterns.js**
   - Endpoint GET para consultar patrones
   - Filtros: userId, gender, age, region
   - Respuestas: Individual o poblacional

### Integración con AI Companion

```javascript
// En processUserMessage():
const detectedKeywords = await analyzeKeywords(companion.user_id, userMessage);
const behaviorInsights = generateInsightsFromKeywords(detectedKeywords);

// Se pasan al prompt de GPT-4:
// "El usuario mencionó síntomas de salud. Pregunta cómo se siente sin dar consejos médicos."
```

## 📈 Valor de la Data

### Para el Negocio
- **Desarrollo de producto**: Entender necesidades reales no documentadas
- **Segmentación**: Identificar subgrupos con patrones similares
- **Prevención**: Detectar crisis antes de que escalen
- **Valor comercial**: Esta data NO EXISTE en el mercado

### Para los Usuarios
- **Mejor servicio**: AI responde con mayor empatía contextual
- **Detección temprana**: Identificar problemas de salud/emocionales
- **Personalización**: Respuestas adaptadas a situación real

## 🔐 Privacidad y Ética

- ✅ Data anonimizada para análisis poblacional
- ✅ RLS implementado (usuarios solo ven su propia data)
- ✅ No se comparten mensajes completos, solo categorías
- ✅ Enfoque en patrones agregados, no individuos
- ⚠️ Revisar cumplimiento HIPAA si se expande a USA
- ⚠️ Revisar GDPR si se expande a Europa

## 📊 Ejemplos de Uso

### Análisis Individual
```bash
GET /api/behavior-patterns?userId=abc123

Response:
{
  "totalMessages": 47,
  "topCategories": [
    { "category": "social_familia", "count": 23 },
    { "category": "emocional_tristeza", "count": 15 },
    { "category": "salud_sintomas", "count": 12 }
  ],
  "topKeywords": [
    { "keyword": "hijo", "count": 18 },
    { "keyword": "solo", "count": 12 },
    { "keyword": "dolor", "count": 10 }
  ]
}
```

### Análisis Poblacional
```bash
GET /api/behavior-patterns?gender=female&ageMin=60&ageMax=75&region=norte

Response:
{
  "totalSamples": 234,
  "categoryDistribution": {
    "social_familia": 156,
    "salud_sintomas": 143,
    "emocional_soledad": 98
  },
  "topHealthSymptoms": {
    "dolor": 87,
    "presión": 54,
    "diabetes": 43
  },
  "topEmotionalStates": {
    "solo": 65,
    "triste": 43,
    "preocupado": 38
  }
}
```

## 🚀 Próximos Pasos

1. **Dashboard de visualización**: Gráficas para entender patrones
2. **Alertas automáticas**: Notificar cuando se detecten crisis
3. **Machine Learning**: Predecir necesidades antes de que las expresen
4. **Reportes mensuales**: Insights para mejorar el servicio
5. **API pública**: Monetizar acceso a data anonimizada

## 💡 Apertura Natural de Conversación

### Concepto: Romper la Formalidad Inmediatamente

En lugar de:
```
"Hola, soy Lupita. ¿Cómo estás?"
```

Usamos:
```
"Hola María, ¿cómo estás? Me llamo Lupita de SaludCompartida.
Oye, ¿cómo te dicen en tu casa? ¿Te dicen María o tienes un apodo?"

[Usuario responde: "Me dicen Mary"]

"Ah mira, a mí me dicen Lupe o Lupita. ¡Ay! Espérame tantito 
que mi nieta me acaba de instalar TikTok y no sé cómo bajarle 
el volumen a estos videos 😅"
```

### Por Qué Funciona

1. **Pregunta por apodo**: Genera intimidad inmediata
2. **Auto-revelación rápida**: "A mí me dicen Lupita" (reciprocidad)
3. **Momento humano cotidiano**: TikTok, nietos, tecnología
4. **Derriba formalidad**: Ya no suena como "obtener información"
5. **Abre espacio natural**: "Oye, ¿y tú tienes nietos?"

### Implementación

En `COMPANION_PERSONALITIES`:
```javascript
firstContactOpening: "Hola {userName}, ¿cómo estás? Me llamo Lupita...",
iceBreaker: "Espérame tantito que mi nieta me instaló TikTok..."
```

Se activa automáticamente en conversación #1.

## 📝 Notas Importantes

- **Data única**: No existe información comparable en el mercado
- **Valor exponencial**: Crece con cada conversación
- **Ética primero**: Usar para beneficio del usuario, no explotación
- **Transparencia**: Usuarios deben saber que se captura data anónima
- **Monetización**: Potencial venta a investigadores, ONGs, gobierno

---

**Última actualización**: Enero 2026  
**Status**: ✅ Implementado y listo para pruebas
