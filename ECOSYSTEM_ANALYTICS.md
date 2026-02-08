# 🧠 SISTEMA DE ANALYTICS DEL ECOSISTEMA

## Filosofía: "La Máquina Aprende de TODO"

Este sistema **NO solo aprende de los éxitos** (sticky features), sino de **TODO el espectro de comportamientos**:

✅ **Positivos**: Retención, engagement, referidos, upgrades
❌ **Negativos**: Cancelaciones, quejas, falta de uso, problemas de pago
🔍 **Neutros**: Patrones temporales, preferencias, contextos

---

## 📊 Variables que el Sistema Registra

### 1. 👤 Demográficas
- **Edad**: Rangos 18-25, 26-35, 36-45, 46-60, 60+
- **Género**: Masculino, femenino, otro, no especificado
- **Estado civil**: Casado, soltero, viudo, divorciado
- **Dependientes**: Tiene/no tiene dependientes

### 2. 🌎 Geográficas
- **Ubicación usuario**: Ciudad/estado en México (e.g., Guadalajara, CDMX, Monterrey)
- **Ubicación migrante**: Ciudad/estado en USA/Canadá (e.g., Texas, California, Toronto)
- **País migrante**: USA, Canadá, otro
- **Zona horaria**: Diferencia horaria con el migrante

### 3. 💰 Económicas
- **Nivel de ingreso**: Bajo, medio, alto (inferido)
- **Sensibilidad a precio**: Alta, media, baja (detectado por frases como "caro", "no puedo pagar")
- **Método de pago**: Tarjeta, OXXO, transferencia
- **Historial de pagos**: Puntual, tardío, con problemas

### 4. 🏥 Médicas
- **Condiciones**: Diabetes, hipertensión, ninguna, múltiples
- **Frecuencia de uso**: Alta (>4 llamadas/mes), media (2-4), baja (<2)
- **Tipo de consultas**: Preventivas, emergencias, seguimiento

### 5. ⏰ Temporales
- **Día de semana**: Lunes-domingo (e.g., "martes compras")
- **Hora del día**: Mañana (6-12), tarde (12-18), noche (18-22)
- **Estacionalidad**: Enero-marzo, abril-junio, julio-sep, oct-dic

### 6. 🗣️ Comunicacionales
- **Tono emocional**: Preocupado, feliz, confundido, enojado, neutro
- **Estilo comunicación**: Formal, informal, directo, indirecto
- **Idioma preferido**: Español MX, español formal, spanglish
- **Temas recurrentes**: Salud, economía, familia, trabajo

---

## 🔍 Tipos de Patrones que Detecta

### ✅ Patrones Positivos (Sticky Features)
**Qué son**: Comportamientos/técnicas que **aumentan retención, engagement, referidos**

**Ejemplos**:
```sql
-- Patrón detectado automáticamente:
{
  "content": "Mencionar 'comunidad' en primeros 30 segundos",
  "outcome_type": "retention",
  "success_rate": 85.3,
  "sample_size": 127,
  "is_sticky_feature": true,
  "context": "Usuarios 35-45 años, CDMX, con migrante en California"
}
```

**Aplicación**: Se aplica **inmediatamente** a todos los usuarios que coincidan con el segmento.

---

### ❌ Patrones Negativos (Warning Signals)
**Qué son**: Señales que **predicen cancelación, churn, insatisfacción**

**Ejemplos**:
```sql
-- Sistema detecta automáticamente:
{
  "content": "Usuario menciona 'caro' y 'confusión' en misma llamada",
  "outcome_type": "cancellation",
  "success_rate": 78.4, -- 78.4% de estos usuarios cancelan
  "sample_size": 52,
  "is_warning_signal": true,
  "risk_level": "high",
  "context": "Guadalajara, >60 años, migrante en Texas"
}
```

**Aplicación**: 
1. **Alerta inmediata** al equipo de retención
2. **Acción preventiva**: Llamada de seguimiento en 24h
3. **Script adaptado**: Ofrecer explicación clara + descuento

---

### 🕒 Patrones Temporales
**Qué son**: Mejores momentos para contactar según segmento

**Ejemplo**:
```sql
{
  "content": "Martes 10am-12pm tiene mejor engagement",
  "outcome_type": "engagement",
  "best_day_of_week": "martes",
  "best_time_of_day": "mañana",
  "avg_quality_rating": 4.2,
  "sample_size": 89,
  "context": "Madres 35-45, trabajo remoto"
}
```

**Aplicación**: Sistema de llamadas automáticamente prioriza martes 10am para este segmento.

---

## 🤖 Cómo Funciona el Análisis Automático

### Paso 1: Recolección Continua
```javascript
// Cada llamada registra:
- Transcripción completa
- Análisis de sentimiento (GPT-4)
- Embedding vectorial (para búsqueda semántica)
- Metadata del usuario (edad, región, etc.)
- Outcome (¿renovó? ¿canceló? ¿refirió?)
```

### Paso 2: Análisis Periódico
```javascript
// Ejecutado diariamente o después de N llamadas nuevas
POST /api/analyze-ecosystem-patterns

// El sistema ejecuta:
1. detect_churn_patterns() -- ¿Qué predice cancelación?
2. find_power_hours() -- ¿Cuándo llamar?
3. find_predictive_phrases() -- ¿Qué palabras importan?
4. cohort_analysis() -- ¿Cómo evolucionan los grupos?
```

### Paso 3: Detección de Patrones
```sql
-- Ejemplo: Sistema encuentra automáticamente
SELECT 
  user_region,
  migrant_location,
  AVG(CASE WHEN renewed = true THEN 1 ELSE 0 END) * 100 as retention_rate,
  COUNT(*) as sample_size
FROM users
WHERE mentions_in_calls @> ARRAY['comunidad']
GROUP BY user_region, migrant_location
HAVING COUNT(*) >= 20
ORDER BY retention_rate DESC;

-- Resultado:
-- CDMX + California + "comunidad" = 87% retention (n=124)
-- Guadalajara + Texas + "comunidad" = 62% retention (n=45)
```

### Paso 4: Validación Estadística
```javascript
// Sistema calcula confianza:
if (sample_size >= 50 && confidence >= 0.85) {
  // Patrón VALIDADO → aplicar a nuevos usuarios
  is_sticky_feature = true;
} else if (sample_size >= 20 && confidence >= 0.70) {
  // Patrón PROMETEDOR → seguir observando
  is_active = true;
} else {
  // Patrón NO CONFIABLE → no aplicar aún
  is_active = false;
}
```

### Paso 5: Síntesis con GPT-4
```javascript
// GPT-4 analiza TODOS los datos y genera:
{
  "key_insights": [
    "Usuarios 60+ en Guadalajara tienen 3x más riesgo de churn",
    "Mencionar 'comunidad' en primeros 30s aumenta retención 22%",
    "Martes 10am tiene 35% más engagement que promedio"
  ],
  "immediate_actions": [
    "Implementar script especial para 60+ Guadalajara con foco en simplicidad",
    "Agregar 'comunidad' a todos los scripts de apertura para CDMX"
  ],
  "hypothesis_to_test": 
    "Llamadas en español formal (usted) funcionan mejor con 60+ que español informal (tú)"
}
```

---

## 🎯 Transfer Learning: Aplicación Inmediata

### Problema que Resuelve
**Antes**: Cada cohorte nueva debe "experimentar" 3 meses para descubrir qué funciona.
**Después**: Cohorte nueva **empieza con todo el conocimiento** del ecosistema desde día 1.

### Ejemplo Real

**Mes 1-3**: Cohorte A descubre que "mencionar comunidad" funciona
- Enero: 60% retention (no saben qué funciona)
- Febrero: 72% retention (empiezan a aprender)
- Marzo: 85% retention (dominan técnica)

**Mes 4**: Cohorte B empieza con conocimiento transferido
- Abril: **84% retention desde día 1** (sistema aplica "comunidad" automáticamente)

**ROI**: 
- Sin transfer learning: 3 meses × 100 usuarios × 40% churn = $12,000 perdidos
- Con transfer learning: 0 meses experimentación = $12,000 ahorrados

---

## 📈 Ejemplo de Query Analítica Real

```sql
-- ¿Qué predice cancelación en próximos 14 días?
WITH user_signals AS (
  SELECT 
    u.id,
    u.age_range,
    u.region,
    u.migrant_location,
    -- Señales de riesgo
    CASE WHEN c.transcription ILIKE '%caro%' THEN 1 ELSE 0 END as mentions_price,
    CASE WHEN c.transcription ILIKE '%confus%' THEN 1 ELSE 0 END as mentions_confusion,
    CASE WHEN c.analysis_quality_score < 3 THEN 1 ELSE 0 END as low_quality,
    CASE WHEN c.analysis_emotional_tone = 'frustrado' THEN 1 ELSE 0 END as frustrated,
    -- Outcome real
    CASE WHEN s.cancelled_at IS NOT NULL THEN 1 ELSE 0 END as did_cancel
  FROM users u
  JOIN call_recordings c ON c.user_phone = u.phone
  LEFT JOIN subscriptions s ON s.user_id = u.id
  WHERE c.created_at > NOW() - INTERVAL '30 days'
)
SELECT 
  age_range,
  region,
  migrant_location,
  SUM(mentions_price) as price_concerns,
  SUM(mentions_confusion) as confusion_signals,
  SUM(low_quality) as poor_calls,
  AVG(did_cancel) * 100 as actual_churn_rate,
  COUNT(*) as sample_size
FROM user_signals
GROUP BY age_range, region, migrant_location
HAVING COUNT(*) >= 20
ORDER BY actual_churn_rate DESC;
```

**Resultado ejemplo**:
```
age_range | region       | migrant_location | price | confusion | churn_rate | n
----------|--------------|------------------|-------|-----------|------------|---
60+       | Guadalajara  | Texas, USA       | 18    | 15        | 78.3%      | 46
45-60     | Guadalajara  | Texas, USA       | 12    | 8         | 62.1%      | 29
60+       | CDMX         | California, USA  | 5     | 3         | 24.5%      | 53
```

**Acción automática del sistema**:
1. **Crea patrón** en `collective_knowledge_base`:
```json
{
  "knowledge_type": "churn_predictor",
  "content": "60+ Guadalajara + migrante Texas = alto riesgo churn",
  "outcome_type": "cancellation",
  "age_range": "60+",
  "user_region": "Guadalajara",
  "migrant_location": "Texas, USA",
  "success_rate": 78.3,
  "is_warning_signal": true,
  "risk_level": "high"
}
```

2. **Alerta en tiempo real**: Cuando Lupita llame a usuario 60+ en Guadalajara con migrante en Texas:
```javascript
GET /api/get-call-context?phone=+525512345678

// Response incluye:
{
  "risk_assessment": {
    "level": "high",
    "reason": "User matches churn pattern: 60+ Guadalajara + Texas migrant",
    "probability": 78.3,
    "recommended_actions": [
      "Use simplified language (avoid confusion)",
      "Emphasize value over price",
      "Offer personalized support call",
      "Consider retention discount"
    ]
  }
}
```

---

## 🚀 Implementación

### 1. Ejecutar SQL
```bash
# En Supabase SQL Editor:
# 1. scripts/step6-add-user-memory.sql
# 2. scripts/step7-collective-learning.sql
```

### 2. Deploy Endpoints
```bash
git add .
git commit -m "Add ecosystem analytics system"
git push origin main
```

### 3. Ejecutar Análisis Inicial
```bash
curl -X POST https://www.saludcompartida.app/api/analyze-ecosystem-patterns
```

### 4. Automatizar (Vercel Cron)
```json
// vercel.json
{
  "crons": [{
    "path": "/api/analyze-ecosystem-patterns",
    "schedule": "0 2 * * *"  // Diario a las 2am
  }]
}
```

---

## 💡 Ejemplo de Uso End-to-End

### Escenario: Nueva Usuaria "María"
- 👤 María, 62 años, Guadalajara
- 🌎 Su hija está en Houston, Texas
- 💰 Mencionó "caro" en llamada inicial
- 🗣️ Tono: confundido

### Sistema detecta automáticamente:
```javascript
// 1. Buscar usuarios similares
const similar = await search_similar_calls(
  "mujer 60+ guadalajara migrante texas preocupada por precio"
);

// 2. Encontrar patrón de riesgo
const risk_pattern = {
  churn_probability: 78.3,
  sample_size: 46,
  confidence: 0.92
};

// 3. Cargar técnicas exitosas para este segmento
const successful_approaches = [
  "Usar 'usted' (formal)",
  "Enfatizar seguridad y confianza",
  "Mencionar testimonios de otros en Guadalajara",
  "Explicar paso a paso con paciencia",
  "Ofrecer acompañamiento personalizado"
];

// 4. Generar script personalizado
const opening = `
Buenos días, Señora María, ¿cómo está usted?
Le habla Lupita de Salud Compartida.
Sé que su hija está en Houston y quiere asegurarse 
de que usted tenga el mejor cuidado de salud aquí en Guadalajara.
Me gustaría explicarle con calma cómo funciona nuestro servicio...
`;
```

### Resultado:
- ✅ María entiende el servicio
- ✅ No cancela (patrón de riesgo evitado)
- ✅ Sistema aprende que este approach funciona
- ✅ Próxima usuaria similar recibe mismo tratamiento desde día 1

---

## 📊 Métricas de Éxito del Sistema

### KPIs a monitorear:
1. **Precisión de predicción churn**: ¿Qué % de usuarios "alto riesgo" cancelan realmente?
2. **Reducción de churn**: ¿Baja el churn global con transfer learning?
3. **Time to value**: ¿Cuánto tarda nueva cohorte en alcanzar retention óptima?
4. **Pattern discovery rate**: ¿Cuántos patrones nuevos descubre el sistema por semana?
5. **Intervention success**: ¿Qué % de usuarios "alto riesgo" se salvan con acción preventiva?

---

## 🎓 Conclusión

Este sistema transforma cada llamada en **aprendizaje acumulativo** que beneficia a:
- ✅ **Usuarios actuales**: Mejor experiencia personalizada
- ✅ **Usuarios futuros**: Empiezan con conocimiento transferido
- ✅ **Equipo operativo**: Alertas tempranas de riesgo
- ✅ **Negocio**: Mayor retención, menor churn, crecimiento sostenible

**La máquina NO solo replica éxitos, aprende de TODO el espectro de comportamientos para optimizar continuamente.**
