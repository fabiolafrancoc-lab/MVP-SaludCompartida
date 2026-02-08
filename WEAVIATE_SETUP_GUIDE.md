# 🚀 Guía de Setup Completa: Weaviate + Lupita AI

## 📋 Resumen
Esta guía te llevará paso a paso para configurar Weaviate como motor de búsqueda vectorial para Lupita AI Brain, reemplazando pgvector para soportar el alto volumen de llamadas diarias.

---

## ⚡ Por qué Weaviate

### Problema con pgvector:
- **Performance:** 200-300ms con 5,000+ embeddings
- **Tu volumen:** 2,000-4,000 llamadas/mes = ~5,000+ documentos en 2 meses
- **Agentes simultáneos:** 20+ llamadas al mismo tiempo colapsarían el sistema

### Solución Weaviate:
- **Performance:** 30-50ms incluso con 100,000+ embeddings
- **Búsqueda híbrida:** Vector (semántico) + BM25 (keywords)
- **Escalabilidad:** Auto-scaling managed service
- **Costo:** $200/mes Standard (14 días gratis para probar)

---

## 📦 Paso 1: Crear Cuenta en Weaviate Cloud

### 1.1 Registrarse
```bash
# Ir a: https://console.weaviate.cloud
# Crear cuenta gratis (no requiere tarjeta de crédito para trial)
```

### 1.2 Crear Cluster
1. Click en "Create Cluster"
2. Seleccionar:
   - **Plan:** Sandbox (gratis 14 días) → luego upgrade a Standard
   - **Region:** us-west-1 (o la más cercana a tus usuarios)
   - **Name:** salud-compartida-prod

3. Esperar ~2 minutos a que el cluster esté "Ready"

### 1.3 Obtener Credenciales
En el dashboard del cluster:
- **Cluster URL:** Copiar (ej: `salud-compartida-abcd1234.weaviate.network`)
- **API Key:** Click en "API Keys" → "Generate Key" → Copiar

---

## 🔧 Paso 2: Configurar Variables de Entorno

### 2.1 Actualizar .env
Agregar al archivo `.env`:

```bash
# Weaviate Configuration
WEAVIATE_URL=tu-cluster.weaviate.network
WEAVIATE_API_KEY=tu-api-key-aqui

# OpenAI (ya debes tenerlo)
OPENAI_API_KEY=sk-...

# Supabase (ya debes tenerlo)
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=...
```

⚠️ **IMPORTANTE:** El `WEAVIATE_URL` NO lleva `https://`, solo el dominio.

### 2.2 Actualizar .env en Vercel
Si ya tienes el proyecto en Vercel:

```bash
# CLI
vercel env add WEAVIATE_URL
vercel env add WEAVIATE_API_KEY

# O en Vercel Dashboard:
# Settings → Environment Variables → Add New
```

---

## 📦 Paso 3: Instalar Dependencias

```bash
npm install weaviate-ts-client
```

Si aún no has instalado LangChain:
```bash
npm install langchain @langchain/openai @langchain/community @langchain/core zod
```

---

## 🏗️ Paso 4: Crear Schema en Weaviate

### 4.1 Ejecutar Script de Setup
```bash
node scripts/setup-weaviate-schema.js
```

**Output esperado:**
```
🚀 Iniciando creación de schema en Weaviate...

📞 Creando clase CallRecording...
✅ CallRecording creado

🧠 Creando clase CollectiveKnowledge...
✅ CollectiveKnowledge creado

👤 Creando clase UserProfile...
✅ UserProfile creado

🔍 Verificando schema...

✅ Schema creado exitosamente!
📊 Total de clases: 3
   - CallRecording: 14 propiedades
   - CollectiveKnowledge: 15 propiedades
   - UserProfile: 13 propiedades

🎉 ¡Weaviate está listo para usar!
```

### 4.2 Verificar en Console
Ir a Weaviate Console → tu cluster → Schema
Deberías ver las 3 clases creadas.

---

## 📥 Paso 5: Migrar Datos Existentes

⚠️ **Nota:** Solo ejecutar si ya tienes datos en Supabase

### 5.1 Revisar qué hay en Supabase
```bash
# En Supabase SQL Editor:
SELECT COUNT(*) FROM call_recordings;
SELECT COUNT(*) FROM collective_knowledge_base;
SELECT COUNT(*) FROM user_conversation_profiles;
```

### 5.2 Ejecutar Migración
```bash
node scripts/migrate-to-weaviate.js
```

**Output esperado:**
```
🚀 Iniciando migración completa a Weaviate...

✅ Conexión a Weaviate verificada

📞 Iniciando migración de call recordings...
   Total de llamadas a migrar: 147
   Procesando batch 1...
   ✅ Migrados: 50/147 (34%)
   Procesando batch 2...
   ✅ Migrados: 100/147 (68%)
   Procesando batch 3...
   ✅ Migrados: 147/147 (100%)

   ✅ Migración completada!
      - Exitosos: 147
      - Errores: 0

🧠 Iniciando migración de collective knowledge...
   Total de conocimientos a migrar: 23
   Progreso: 10/23
   Progreso: 20/23

   ✅ Migración completada!
      - Exitosos: 23
      - Errores: 0

👤 Iniciando migración de user profiles...
   Total de perfiles a migrar: 89
   Progreso: 10/89
   [...]

   ✅ Migración completada!
      - Exitosos: 89
      - Errores: 0

🔍 Verificando migración...

📊 Estadísticas en Weaviate:
   - CallRecording: 147 objetos
   - CollectiveKnowledge: 23 objetos
   - UserProfile: 89 objetos

🎉 ¡Migración completada!
```

### 5.3 Si hay errores
La migración continúa aunque haya algunos errores individuales. Revisa los logs para ver qué falló.

Causas comunes:
- Embeddings faltantes (se regeneran automáticamente)
- Rate limit de OpenAI (espera 1 minuto y reintenta)
- Datos incompletos (se omiten)

---

## 🧪 Paso 6: Probar Weaviate

### 6.1 Test de Conexión
Crear archivo `scripts/test-weaviate.js`:

```javascript
import { getWeaviateClient } from '../src/lib/weaviate-client.js';

async function test() {
  const weaviate = getWeaviateClient();
  
  console.log('🔍 Probando conexión a Weaviate...\n');
  
  // 1. Health check
  const health = await weaviate.healthCheck();
  console.log('Health:', health);
  
  // 2. Stats
  const stats = await weaviate.getStats();
  console.log('\nStats:', stats);
  
  // 3. Búsqueda de prueba
  console.log('\n🔎 Búsqueda de prueba...');
  const results = await weaviate.searchCollectiveKnowledge(
    'técnicas para usuarios que piensan que es caro',
    'power_phrase',
    3
  );
  
  console.log(`\nEncontrados ${results.length} resultados:`);
  results.forEach((r, i) => {
    console.log(`\n${i + 1}. ${r.content}`);
    console.log(`   Efectividad: ${Math.round(r.effectivenessScore * 100)}%`);
  });
  
  console.log('\n✅ Test completado!');
}

test();
```

Ejecutar:
```bash
node scripts/test-weaviate.js
```

---

## 🤖 Paso 7: Actualizar AI Brain

### 7.1 Cambiar import en APIs
Reemplazar las referencias al antiguo agent:

**Antes:**
```javascript
import LupitaAgent from '../ai-brain/lupita-agent-langchain.js';
```

**Después:**
```javascript
import LupitaAgent from '../ai-brain/lupita-agent-weaviate.js';
```

### 7.2 Archivos a actualizar:
- `api/generate-script.js`
- `api/generate-priority-queue-ai.js`
- `api/run-brain-cycle.js`

### 7.3 Probar generación de script
```bash
# Crear test rápido
node -e "
import LupitaAgent from './ai-brain/lupita-agent-weaviate.js';

const agent = new LupitaAgent();
const script = await agent.generateScript('+525512345678', 'Primera llamada del mes 2');
console.log(script);
"
```

---

## 🚀 Paso 8: Deploy a Producción

### 8.1 Commit y Push
```bash
git add .
git commit -m "feat: Migrate to Weaviate for better performance"
git push origin main
```

### 8.2 Verificar Deploy en Vercel
- Vercel detectará el push automáticamente
- Verificar que las variables de entorno estén configuradas
- Esperar a que termine el deploy (~2-3 min)

### 8.3 Probar en Producción
```bash
# Test de health
curl https://tu-app.vercel.app/api/health-weaviate

# Debería responder:
# { "healthy": true, "stats": {...} }
```

---

## 📊 Paso 9: Monitoreo

### 9.1 Dashboard de Weaviate
- Ir a Weaviate Console
- Ver métricas de:
  - Queries/segundo
  - Latencia promedio
  - Objetos totales
  - Uso de memoria

### 9.2 Crear API de Monitoreo
Archivo `api/weaviate-stats.js`:

```javascript
import { getWeaviateClient } from '../src/lib/weaviate-client.js';

export default async function handler(req, res) {
  try {
    const weaviate = getWeaviateClient();
    
    const health = await weaviate.healthCheck();
    const stats = await weaviate.getStats();
    
    res.status(200).json({
      success: true,
      health,
      stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
```

Acceder en: `https://tu-app.vercel.app/api/weaviate-stats`

---

## 💰 Paso 10: Gestión de Costos

### Trial Period (14 días gratis)
- **Sandbox:** Gratis, sin límites de queries
- **Objetivo:** Validar que todo funciona
- **Data limit:** 1GB

### Después del Trial
Upgrade a **Standard Plan**:
- **Costo:** $200/mes
- **Incluye:** 
  - 100k queries/día
  - 10GB storage
  - Auto-scaling
  - 99.9% uptime SLA

### Optimización de Costos
Si $200/mes es mucho inicialmente:

**Opción 1: Hibernar cuando no se usa**
```bash
# En Weaviate Console:
# Cluster → Settings → Hibernate
# Cobra $0 cuando está hibernado
# Despierta en ~30 segundos cuando lo necesitas
```

**Opción 2: Self-hosted (más barato pero más trabajo)**
```bash
# Docker Compose
# Costo: $50-100/mes en VPS + tu tiempo
```

---

## ✅ Checklist Final

Antes de considerarlo completo:

- [ ] Cuenta de Weaviate creada
- [ ] Cluster funcionando
- [ ] Variables de entorno configuradas (.env local + Vercel)
- [ ] Dependencias instaladas (`weaviate-ts-client`, etc.)
- [ ] Schema creado (3 clases verificadas)
- [ ] Datos migrados (si aplicable)
- [ ] Test de conexión exitoso
- [ ] AI Brain actualizado para usar Weaviate
- [ ] Deploy a Vercel completado
- [ ] Monitoreo configurado
- [ ] Primera llamada generada con éxito

---

## 🐛 Troubleshooting

### Error: "Connection refused"
```bash
# Verificar que WEAVIATE_URL no tenga https://
# Correcto: salud-compartida-xxx.weaviate.network
# Incorrecto: https://salud-compartida-xxx.weaviate.network
```

### Error: "Unauthorized"
```bash
# Verificar WEAVIATE_API_KEY
# Generar nueva key si es necesario en Weaviate Console
```

### Error: "OpenAI rate limit"
```bash
# Durante migración, si hay muchos embeddings:
# 1. Esperar 1 minuto
# 2. Reejecutar: node scripts/migrate-to-weaviate.js
# El script es idempotente, no duplicará datos
```

### Queries lentas (>100ms)
```bash
# Verificar en Weaviate Console → Performance
# Si el cluster está sobrecargado:
# 1. Upgrade a plan superior
# 2. O optimizar queries (reducir limit, agregar filtros)
```

---

## 📚 Recursos Adicionales

- **Weaviate Docs:** https://weaviate.io/developers/weaviate
- **LangChain + Weaviate:** https://js.langchain.com/docs/integrations/vectorstores/weaviate
- **Soporte:** support@weaviate.io o Discord de Weaviate

---

## 🎉 ¡Listo!

Ahora tienes Weaviate configurado y optimizado para manejar:
- ✅ 2,000-4,000 llamadas/mes
- ✅ 20+ agentes simultáneos
- ✅ Búsquedas <50ms
- ✅ Transfer learning entre usuarios
- ✅ Escalabilidad automática

**Próximo paso:** Empezar a llamar usuarios y dejar que Lupita aprenda! 🚀
