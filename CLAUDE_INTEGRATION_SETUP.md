# 🤖 INTEGRACIÓN DIRECTA CON CLAUDE API

## 🎯 OBJETIVO
Conectar tu aplicación directamente con Claude (Anthropic) para procesar conversaciones, análisis de texto y respuestas inteligentes.

---

## 📝 PASO 1: Obtener API Key de Anthropic

### 1.1 Crear Cuenta en Anthropic Console

1. **Ve a:** https://console.anthropic.com/
2. **Inicia sesión** con tu cuenta de Google o email
3. **Si no tienes cuenta:** Haz clic en "Sign Up"

### 1.2 Obtener API Key

1. Una vez dentro, ve a: **Settings** → **API Keys**
   - URL directa: https://console.anthropic.com/settings/keys
2. Haz clic en **"Create Key"**
3. Dale un nombre: `SaludCompartida-Production`
4. **COPIA LA KEY** (empieza con `sk-ant-...`)
   - ⚠️ Solo se muestra UNA VEZ
5. Guárdala en lugar seguro

---

## ⚙️ PASO 2: Agregar API Key a Vercel

### 2.1 Ir a Vercel Environment Variables

1. **Ve a:** https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida/settings/environment-variables
2. Haz clic en **"Add New"**

### 2.2 Agregar Variable

```
Name: ANTHROPIC_API_KEY
Value: sk-ant-api03-[tu-key-aqui]
Environment: Production, Preview, Development (selecciona las 3)
```

3. Haz clic en **"Save"**
4. **Re-deploy** tu aplicación:
   - Ve a: Deployments → Latest deployment → "..." → Redeploy

---

## 💻 PASO 3: Agregar al .env Local

Abre tu archivo `.env` y agrega:

```bash
# ============================================
# ANTHROPIC (CLAUDE) CONFIGURATION
# ============================================
# API Key para Claude 3.5 Sonnet
# Obtén tu key en: https://console.anthropic.com/settings/keys
ANTHROPIC_API_KEY=sk-ant-api03-tu-key-aqui
```

---

## 🧪 PASO 4: Instalar SDK de Anthropic

Ejecuta en tu terminal:

```bash
npm install @anthropic-ai/sdk
```

---

## 📦 PASO 5: Crear Helper para Claude

Ya creé el archivo `/src/lib/claude-client.js` que incluye:

- ✅ Cliente de Anthropic configurado
- ✅ Funciones para chat completion
- ✅ Análisis de conversaciones
- ✅ Detección de emociones
- ✅ Generación de resúmenes

---

## 🎯 CASOS DE USO

### 1. Analizar Transcripciones de Lupita
```javascript
import { analyzeConversation } from '@/lib/claude-client';

const result = await analyzeConversation(transcript);
// Retorna: { sentiment, topics, summary, urgency }
```

### 2. Chat Directo con Claude
```javascript
import { chatWithClaude } from '@/lib/claude-client';

const response = await chatWithClaude([
  { role: 'user', content: 'Hola, ¿cómo estás?' }
]);
```

### 3. Detectar Emociones en Texto
```javascript
import { detectEmotion } from '@/lib/claude-client';

const emotion = await detectEmotion(userMessage);
// Retorna: 'joy', 'sadness', 'anger', 'fear', 'neutral'
```

---

## 🔐 MODELOS DISPONIBLES

### Recomendados para SaludCompartida:

1. **claude-3-5-sonnet-20241022** (RECOMENDADO)
   - Más rápido y económico
   - Perfecto para chat y análisis
   - $3 por millón de tokens input
   - $15 por millón de tokens output

2. **claude-3-opus-20240229**
   - Más poderoso pero más caro
   - Solo si necesitas razonamiento complejo
   - $15 por millón de tokens input
   - $75 por millón de tokens output

---

## 💰 COSTOS ESTIMADOS

Con **Claude 3.5 Sonnet**:

### Ejemplo: 100 conversaciones/día
- Cada conversación: ~2000 tokens (input) + ~500 tokens (output)
- Costo por conversación: ~$0.0075
- Costo diario: ~$0.75
- **Costo mensual: ~$22.50**

### Ejemplo: 1000 conversaciones/día
- **Costo mensual: ~$225**

---

## ✅ CHECKLIST DE CONFIGURACIÓN

- [ ] Cuenta creada en Anthropic Console
- [ ] API Key obtenida
- [ ] Variable `ANTHROPIC_API_KEY` agregada en Vercel
- [ ] Variable agregada en `.env` local
- [ ] SDK instalado: `npm install @anthropic-ai/sdk`
- [ ] Vercel re-deployed
- [ ] Test ejecutado: `/api/test-claude`

---

## 🧪 PASO 6: Probar la Integración

Una vez configurado todo, ejecuta:

```bash
curl https://saludcompartida.app/api/test-claude
```

O visita: https://saludcompartida.app/api/test-claude

Deberías ver:
```json
{
  "success": true,
  "model": "claude-3-5-sonnet-20241022",
  "response": "¡Hola! Soy Claude..."
}
```

---

## 🆘 TROUBLESHOOTING

### Error: "Invalid API Key"
- ✅ Verifica que copiaste la key completa
- ✅ Debe empezar con `sk-ant-api03-`
- ✅ No debe tener espacios al inicio/final

### Error: "Rate limit exceeded"
- ✅ Espera 1 minuto
- ✅ Anthropic tiene límites por minuto

### Error: "Model not found"
- ✅ Usa: `claude-3-5-sonnet-20241022`
- ✅ NO uses versiones antiguas

---

## 📚 RECURSOS

- **Anthropic Console:** https://console.anthropic.com/
- **API Docs:** https://docs.anthropic.com/
- **Pricing:** https://www.anthropic.com/pricing
- **SDK GitHub:** https://github.com/anthropics/anthropic-sdk-typescript

---

## 🎯 PRÓXIMOS PASOS

Una vez configurado Claude:

1. ✅ Analizar transcripciones de Lupita automáticamente
2. ✅ Detectar crisis emocionales en tiempo real
3. ✅ Generar resúmenes para el equipo médico
4. ✅ Crear reportes de análisis de conversaciones
5. ✅ Mejorar prompts de Lupita con A/B testing

---

**¿LISTO PARA CONFIGURAR?** 🚀

Dame tu API Key de Anthropic y la configuro en Vercel por ti.
