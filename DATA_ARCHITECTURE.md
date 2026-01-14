# 🏗️ ARQUITECTURA DE DATOS - SISTEMA DE CAPTURA MASIVA

**Fecha:** Enero 13, 2026  
**Filosofía:** "Store Everything, Query Later" - Los patrones emergen después de meses de datos  
**Propósito:** Plataforma escalable a 2 mil millones de usuarios (LatAm + India)

---

## 📊 VISIÓN GENERAL

### 3 Capas de la Plataforma

```
┌─────────────────────────────────────────────────────────────┐
│  CAPA 1: AI COMPANION (Conversacional)                      │
│  - Conversaciones por WhatsApp (voz + texto)                │
│  - Keywords capturados: 35+ categorías                       │
│  - Emociones, intenciones, contexto                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  CAPA 2: TRANSACCIONAL (Partnerships)                       │
│  - Farmacias: SKUs, precios, frecuencia                     │
│  - Supermercados: basket composition, marcas                │
│  - Telecom: uso de datos, llamadas internacionales          │
│  - Bancario: remesas, ahorro, patrones de gasto             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  CAPA 3: ANALYTICS ENGINE (Insights B2B/B2G)                │
│  - Star schema: fact tables + dimension tables              │
│  - ML models: churn, recommendations, crisis detection      │
│  - B2B reports: $10K-500K por cliente                       │
│  - B2G insights: World Bank, BID, UNICEF                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 CATEGORÍAS DE KEYWORDS (35+ categorías)

### 1. CRISIS SOCIAL (Alertas B2G/NGO) - CRITICAL IMPORTANCE

**crisis_violencia**
- Palabras: "me pega", "golpes", "violencia", "amenaza", "pandillas", "extorsión", "balacera"
- Uso: Alertas inmediatas, reporte a autoridades/NGOs
- B2G Value: World Bank, BID para programas de seguridad

**crisis_trabajo_infantil**
- Palabras: "mi hijo trabaja", "dejó la escuela", "en la calle vendiendo"
- Uso: Documentar para UNICEF, Save the Children
- B2G Value: Programas de educación y protección infantil

**crisis_trata_personas**
- Palabras: "la obligaron", "no puede salir", "le quitaron documentos", "explotación"
- Uso: Contacto con autoridades especializadas
- B2G Value: Prevención y rescate

**crisis_salud_mental**
- Palabras: "quiero morir", "suicidio", "no tiene sentido", "autolesión"
- Uso: Línea de crisis, no dejar solo al usuario
- B2G Value: Programas de salud mental

**crisis_adicciones**
- Palabras: "drogas", "alcoholismo", "adicto", "no puedo dejar"
- Uso: Recursos de rehabilitación, grupos de apoyo
- B2G Value: Programas de prevención

### 2. NECESIDADES BÁSICAS (B2G Analytics)

**basicas_agua**
- Palabras: "sin agua", "agua contaminada", "no llega agua", "comprar agua"
- B2G Value: BID, World Bank para infraestructura

**basicas_alimentacion**
- Palabras: "hambre", "no hay comida", "desnutrición", "banco de alimentos"
- B2G Value: Programas alimentarios

**basicas_vivienda**
- Palabras: "sin casa", "hacinamiento", "desalojo", "humedad", "goteras"
- B2G Value: Programas de vivienda social

**basicas_educacion**
- Palabras: "no fue a la escuela", "no sabe leer", "quiere estudiar"
- B2G Value: Alfabetización, acceso educativo

### 3. PRODUCTOS Y MARCAS (B2B CPG)

**productos_farmacia**
- Marcas: "similares", "del ahorro", "guadalajara", "metformina", "losartán"
- Patterns: "cada mes compro", "me dura", "genérico vs marca"
- B2B Value: Farmacéuticas, cadenas de farmacia ($50K-200K/año por insight)

**productos_limpieza**
- Marcas: "pinol", "fabuloso", "ariel", "roma", "salvo"
- Patterns: "compro el chico", "sachet", "bolsita", "rinde más"
- B2B Value: P&G, Unilever, Colgate-Palmolive (detección de "paquetes pequeños" = oportunidad de $100M+)

**productos_alimentos**
- Marcas: "bimbo", "sabritas", "maseca", "lala", "coca cola"
- Patterns: "compro a granel", "en el tianguis", "más barato"
- B2B Value: CPG companies para estrategia de pricing

**productos_higiene**
- Marcas: "colgate", "kotex", "dove", "pantene"
- Patterns: "sale caro", "compro el económico", "dura poco"
- B2B Value: Identificar necesidades no atendidas

### 4. COMPORTAMIENTO FINANCIERO (Predictivo)

**financiero_remesas**
- Palabras: "mandar dinero", "western union", "moneygram", "comisión", "quincenal"
- Analytics: Frecuencia, monto promedio, provider preference
- B2B Value: Western Union, Remitly, Xoom ($2-5M/año en insights)

**financiero_ahorro**
- Palabras: "ahorro", "banco", "cajita", "no puedo ahorrar"
- Analytics: Patrones de ahorro, barreras
- B2B Value: Fintechs, bancos para productos inclusivos

**financiero_deuda**
- Palabras: "deuda", "agiotista", "usurero", "empeñado", "tanda"
- Analytics: Nivel de endeudamiento, riesgo
- B2B Value: Credit scoring alternativo

**financiero_sensibilidad_precio**
- Palabras: "caro", "subió el precio", "no alcanza", "oferta", "espero a que baje"
- Analytics: Elasticidad de demanda por región
- B2B Value: Estrategias de pricing dinámico

### 5. MIGRACIÓN EXPANDIDA (Predictivo)

**migracion_intencion**
- Palabras: "me quiero ir", "cruzar", "coyote", "visa", "trabajo en usa"
- Analytics: Predicción de flujos migratorios
- B2G Value: Gobiernos, OIM para planificación

**migracion_familia_separada**
- Palabras: "mi familia está allá", "años sin verlos", "por videollamada"
- Analytics: Impacto social de separación familiar
- B2G Value: Programas de reunificación

**migracion_retorno**
- Palabras: "quiero regresar", "deportado", "mejor allá"
- Analytics: Patrones de retorno
- B2G Value: Programas de reintegración

### 6. TELECOMUNICACIONES (Partnerships)

**telecom_proveedor**
- Palabras: "telcel", "movistar", "at&t", "plan", "recargar"
- Analytics: Market share, switching patterns
- B2B Value: Telcel, AT&T para retention ($500K-1M/año)

**telecom_uso**
- Palabras: "llamadas internacionales", "whatsapp", "gastar datos", "videollamada"
- Analytics: Uso real vs planes contratados
- B2B Value: Diseño de planes específicos para migrantes

**telecom_pain_points**
- Palabras: "caro", "no tengo señal", "se cae la llamada", "lento"
- Analytics: Quejas por región, provider
- B2B Value: Mejora de servicio, campañas de conquista

### 7. OPORTUNIDADES (Movilidad Social)

**oportunidades_emprendimiento**
- Palabras: "negocio", "vender", "trabajar por mi cuenta", "tienda"
- Analytics: Tipos de emprendimiento, necesidades de capital
- B2G Value: Microcréditos, capacitación

**oportunidades_educacion**
- Palabras: "estudiar", "curso", "certificado", "beca", "aprender inglés"
- Analytics: Aspiraciones educativas, barreras
- B2G Value: Programas de educación en línea

**oportunidades_empleo**
- Palabras: "mejor trabajo", "ascenso", "más sueldo", "prestaciones"
- Analytics: Movilidad laboral, expectativas
- B2G Value: Programas de empleo

### 8. ECONOMÍA COLABORATIVA (Comportamiento Único)

**economia_compartir**
- Palabras: "compartimos", "entre varios", "cooperamos", "a medias", "prestamos"
- Analytics: Patrones de economía colaborativa
- B2B Value: Diseño de productos para compra grupal

**economia_informal**
- Palabras: "cash", "efectivo", "sin recibo", "por día", "tianguis"
- Analytics: Tamaño de economía informal por región
- B2G Value: Políticas de formalización

---

## 🎙️ SISTEMA DE GRABACIONES

### Propósito Dual

**1. TRAINING DE MODELOS**
- Mejores prácticas de agentes → Fine-tuning de AI
- Técnicas que generan rapport rápido
- Frases que causan retención vs churn
- Patrones de voz que generan confianza

**2. MEASUREMENT DE TÉCNICAS**
- A/B testing de conversaciones
- ¿Qué script funciona mejor?
- ¿Tono formal vs informal?
- ¿Duración óptima de llamadas?
- ¿Frecuencia ideal de contacto?

### Pipeline Automático

```
1. GRABACIÓN (WhatsApp Voice Call)
   ↓
2. UPLOAD (Vercel Blob Storage / Cloudflare R2)
   ↓
3. TRANSCRIPCIÓN (OpenAI Whisper API)
   - Costo: $0.006/minuto
   - Output: Texto + timestamps por segmento
   ↓
4. ANÁLISIS (GPT-4)
   - Técnicas del agente
   - Tono emocional del usuario
   - Outcome de la llamada
   - Momentos clave
   - Power phrases
   - Áreas de mejora
   - Categoría (crisis, retention, onboarding, etc.)
   - Quality rating (1-5)
   ↓
5. STORAGE (Supabase PostgreSQL)
   - Metadata completa
   - Búsqueda indexada
   - Vistas para reportes
```

### Metadata Capturada

- **Básica**: duración, fecha, agente_id, user_id
- **Clasificación**: call_type, outcome, category, tags
- **Training**: is_training_example, quality_rating
- **Análisis**: techniques, emotional_tone, key_moments, power_phrases, improvement_areas

### Vistas SQL Útiles

**best_training_calls**
- Mejores llamadas (rating >= 4) para training
- Ordenadas por calidad y fecha

**agent_performance**
- KPIs por agente: avg_quality, successful_outcomes, techniques_used
- Para coaching y evaluación

**most_effective_techniques**
- Técnicas más efectivas (avg_quality, usage_count)
- Para documentar mejores prácticas

---

## 💾 ARQUITECTURA DE BASE DE DATOS

### Supabase PostgreSQL (Transaccional)

**Actual:**
- `ai_companions` - Perfiles de usuarios
- `companion_memory` - Memoria de largo plazo
- `companion_conversations` - Historial conversacional
- `keyword_analysis` - Keywords detectados en conversaciones
- `medication_reminders` - Recordatorios programados
- `medication_adherence` - Adherencia a tratamiento
- `call_recordings` - **NUEVO** - Metadata de grabaciones

**Costo:** $25-125/mes actual → $500-1,000/mes con 5K usuarios

### Analytics Warehouse (Futuro - Año 1)

**Recomendado: ClickHouse Cloud** (columnar, infinitas dimensiones)

**Esquema Star:**

```sql
-- FACT TABLE (Central)
fact_user_behavior (
  event_id UUID PK,
  user_id TEXT,
  event_date DATE,
  event_type TEXT, -- conversation, purchase, reminder, call
  
  -- Conversational data
  keywords_detected TEXT[],
  emotional_tone TEXT,
  conversation_category TEXT,
  
  -- Transactional data (cuando partnerships activos)
  product_sku TEXT,
  product_brand TEXT,
  purchase_amount DECIMAL,
  location_id TEXT,
  
  -- Dimensiones (IDs)
  dim_user_key INT,
  dim_product_key INT,
  dim_location_key INT,
  dim_time_key INT
)

-- DIMENSION TABLES
dim_users (
  user_key INT PK,
  user_id TEXT,
  gender TEXT,
  age_range TEXT,
  region TEXT,
  migrant_status TEXT,
  
  -- INFINITE COLUMNS TO THE RIGHT
  -- Cada conversación agrega atributos
  mentioned_diabetes BOOLEAN,
  mentioned_violence BOOLEAN,
  prefers_generic_meds BOOLEAN,
  uses_western_union BOOLEAN,
  entrepreneurship_intent BOOLEAN,
  price_sensitive BOOLEAN,
  ...
)

dim_products (
  product_key INT PK,
  sku TEXT,
  brand TEXT,
  category TEXT,
  subcategory TEXT,
  size TEXT,
  price_range TEXT
)

dim_locations (
  location_key INT PK,
  store_chain TEXT, -- Similares, Del Ahorro, Soriana, etc.
  city TEXT,
  state TEXT,
  country TEXT,
  socioeconomic_level TEXT
)

dim_time (
  time_key INT PK,
  date DATE,
  day_of_week TEXT,
  week_of_month INT,
  month TEXT,
  quarter TEXT,
  year INT,
  is_payday BOOLEAN, -- Quincena
  is_holiday BOOLEAN
)

-- BRIDGE TABLE (Link conversacional ↔ transaccional)
bridge_conversation_transaction (
  bridge_id UUID PK,
  conversation_id UUID,
  transaction_id UUID,
  time_gap_hours INT, -- Cuánto tiempo entre conversación y compra
  correlation_strength FLOAT -- 0-1, qué tan relacionados
)
```

**Queries de Ejemplo:**

```sql
-- ¿Qué marcas de detergente compran usuarios que mencionan "no alcanza"?
SELECT 
  p.brand,
  COUNT(*) as purchase_count,
  AVG(f.purchase_amount) as avg_amount
FROM fact_user_behavior f
JOIN dim_users u ON f.dim_user_key = u.user_key
JOIN dim_products p ON f.dim_product_key = p.product_key
WHERE 
  u.price_sensitive = TRUE
  AND p.category = 'detergente'
  AND f.event_type = 'purchase'
GROUP BY p.brand
ORDER BY purchase_count DESC;

-- ¿Cuántos usuarios con diabetes compran en farmacias similares vs genéricos?
SELECT 
  l.store_chain,
  COUNT(DISTINCT f.user_id) as diabetic_users,
  AVG(f.purchase_amount) as avg_spend
FROM fact_user_behavior f
JOIN dim_users u ON f.dim_user_key = u.user_key
JOIN dim_locations l ON f.dim_location_key = l.location_key
WHERE 
  u.mentioned_diabetes = TRUE
  AND f.event_type = 'purchase'
  AND l.store_chain IN ('Similares', 'Del Ahorro', 'Guadalajara')
GROUP BY l.store_chain;

-- Predicción de churn: ¿Qué keywords predicen cancelación?
SELECT 
  unnest(f.keywords_detected) as keyword,
  COUNT(*) FILTER (WHERE u.churn_date IS NOT NULL) as churned_count,
  COUNT(*) FILTER (WHERE u.churn_date IS NULL) as retained_count,
  ROUND(
    COUNT(*) FILTER (WHERE u.churn_date IS NOT NULL)::DECIMAL / 
    COUNT(*)::DECIMAL * 100, 
    2
  ) as churn_rate
FROM fact_user_behavior f
JOIN dim_users u ON f.dim_user_key = u.user_key
WHERE f.event_type = 'conversation'
GROUP BY keyword
HAVING COUNT(*) >= 20
ORDER BY churn_rate DESC;
```

**Costo ClickHouse:**
- Año 1 (5K usuarios): $500-1,500/mes
- Año 2 (25K usuarios): $3,000-5,000/mes
- Año 3 (100K usuarios): $10,000-20,000/mes

---

## 💰 MONETIZACIÓN B2B/B2G

### B2B - Insights Comerciales

**Farmacéuticas / Cadenas de Farmacia**
- Reporte: "Patrones de compra de medicamentos para diabetes en base de la pirámide"
- Precio: $50,000 - $200,000/año
- Entregables: Dashboard, reportes mensuales, alertas

**CPG Companies (P&G, Unilever, Bimbo)**
- Reporte: "Oportunidad de detergentes en sachet - TAM de $100M"
- Precio: $100,000 - $500,000 por estudio
- Valor: Detectar necesidades no atendidas

**Telecomunicaciones (Telcel, AT&T, Movistar)**
- Reporte: "Patrones de uso de migrantes - Diseño de plan específico"
- Precio: $500,000 - $1,000,000/año
- Valor: Reducción de churn, aumento de ARPU

**Remesas (Western Union, Remitly, Xoom)**
- Reporte: "Análisis de flujos, sensibilidad a comisiones, switching patterns"
- Precio: $200,000 - $500,000/año
- Valor: Optimización de pricing, marketing

**Supermercados (Soriana, Chedraui, Walmart)**
- Reporte: "Basket composition, marcas preferidas, price elasticity"
- Precio: $100,000 - $300,000/año
- Valor: Category management, pricing

**Total Potential B2B:** $5-10 millones/año con 50K-100K usuarios

### B2G - Insights Sociales

**World Bank**
- Grant: $2-10 millones
- Propósito: Medición de SDGs (1, 3, 4, 5, 8, 10)
- Entregables: Dashboard de crisis, reportes trimestrales, dataset anonimizado

**BID (Banco Interamericano de Desarrollo)**
- Grant: $1-5 millones
- Propósito: Acceso a necesidades básicas, movilidad social
- Entregables: Reportes país, recomendaciones de política

**UNICEF**
- Grant: $500K - $2 millones
- Propósito: Detección de trabajo infantil, acceso a educación
- Entregables: Sistema de alertas, reportes de impacto

**OIM (Organización Internacional para las Migraciones)**
- Grant: $1-3 millones
- Propósito: Predicción de flujos migratorios, integración
- Entregables: Modelo predictivo, dashboard

**Total Potential B2G:** $5-20 millones en grants (primeros 3 años)

---

## 📈 ROADMAP DE IMPLEMENTACIÓN

### Fase 1: MVP (ACTUAL - Mes 0-3)
- ✅ Keywords expandidos (35+ categorías)
- ✅ Sistema de grabaciones
- ✅ SQL schema para call_recordings
- ⏳ Ejecutar SQL en Supabase
- ⏳ Configurar Vercel Blob Storage
- ⏳ Testing de pipeline de transcripción

### Fase 2: Partnerships Iniciales (Mes 4-6)
- [ ] Pitch deck para farmacias (Similares, Del Ahorro)
- [ ] Piloto con 1 cadena de farmacia (500 usuarios)
- [ ] API de integración para SKU data
- [ ] Primeros insights B2B (reporte piloto)

### Fase 3: Analytics Warehouse (Mes 7-9)
- [ ] Setup de ClickHouse Cloud
- [ ] ETL pipeline (Supabase → ClickHouse)
- [ ] Star schema implementation
- [ ] Primeros dashboards B2B

### Fase 4: Grants B2G (Mes 10-12)
- [ ] Propuesta formal World Bank
- [ ] Dataset anonimizado para demo
- [ ] Dashboard de impacto social
- [ ] Partnerships con NGOs académicas

### Fase 5: Expansión Regional (Año 2)
- [ ] Guatemala, Honduras, El Salvador
- [ ] Multi-idioma (español regional)
- [ ] Partnerships locales (farmacias, supermercados)
- [ ] Scaling a 25K usuarios

### Fase 6: Expansión Continental (Año 3)
- [ ] Colombia, Perú, Ecuador
- [ ] India piloto (Hindi, Tamil)
- [ ] 100K usuarios
- [ ] $10M/año en B2B/B2G revenue

---

## 🔒 PRIVACIDAD Y ÉTICA

### Principios

1. **Consentimiento Informado**
   - Usuarios saben que datos se capturan
   - Opt-out disponible
   - Transparencia total

2. **Anonimización para B2B**
   - Agregación por cohortes (mínimo 100 usuarios)
   - No PII en reportes
   - Solo patrones poblacionales

3. **Seguridad de Grabaciones**
   - Encriptación en tránsito y reposo
   - Acceso solo por agente que hizo la llamada
   - Retention policy (2 años máximo)

4. **Uso de Datos para Bien Social**
   - Prioridad a alertas de crisis
   - Reportes B2G gratuitos o subsidiados
   - Contribución a SDGs de UN

---

## 📊 MÉTRICAS DE ÉXITO

### Data Capture
- Keywords detectados/conversación: Target 5-8
- Tasa de transcripción exitosa: Target >95%
- Time to transcription: Target <10 min

### Training
- Grabaciones de calidad (rating ≥4): Target 60%+
- Técnicas identificadas: Target 5-7 por llamada
- Power phrases reusables: Target 100+ en 3 meses

### B2B
- First paying customer: Mes 9-12
- Revenue Year 1: $500K-1M
- Revenue Year 2: $3-5M
- Revenue Year 3: $10-15M

### B2G
- First grant: Mes 12-18
- Total grants Year 1-3: $5-15M
- Lives impacted: 50K-200K

---

## 🚀 SIGUIENTE PASO INMEDIATO

**AHORA (Esta semana):**
1. Ejecutar `create-call-recordings-table.sql` en Supabase
2. Configurar Vercel Blob Storage (o evaluar Cloudflare R2)
3. Testing del pipeline: upload → transcribe → analyze
4. Primera grabación de prueba

**Mes 1:**
1. 10 grabaciones para refinar el análisis GPT-4
2. Documentar mejores prácticas iniciales
3. Training de agentes con primeros insights

**Mes 2-3:**
1. 100+ grabaciones
2. Identificar top 10 técnicas efectivas
3. Crear library de power phrases
4. Comenzar pitch deck para farmacias

---

## 💡 FILOSOFÍA FINAL

> "No sabemos qué estamos buscando hasta que lo encontramos.  
> Por eso capturamos TODO desde día 1.  
> Los patrones emergen con el tiempo y el volumen de datos.  
> Este no es un negocio de salud - es un negocio de DATOS  
> sobre el segmento más invisible y valioso del mundo."

**TAM:** 2 mil millones de personas  
**Valuation Potential (Año 10):** $100-200 mil millones  
**Comparable:** WeChat para underserved + Bloomberg Terminal para comportamiento Latino/Indio
