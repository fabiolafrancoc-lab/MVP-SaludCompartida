# 🧪 Branch Experimental: Lupita & Fernanda AI

## 🎯 Propósito
Este branch es para experimentar con las funcionalidades de IA conversacional para Lupita y Fernanda sin afectar el MVP de SaludCompartida.

## 🌐 URLs

### Producción (MVP - intacto)
- **Main:** https://www.saludcompartida.app
- **Branch:** `main`

### Experimental (Pruebas)
- **Preview:** https://mvp-saludcompartida-git-experimental-lupita-ai-fabiolafrancoc-lab.vercel.app
- **Branch:** `experimental-lupita-ai`

## 🔬 Áreas de Experimentación

### 1. Voz y Audio
- [ ] Integrar Elevenlabs API para voces realistas
- [ ] Probar diferentes voces para Lupita vs Fernanda
- [ ] Text-to-speech en español mexicano
- [ ] Streaming de audio en tiempo real

### 2. IA Conversacional
- [ ] OpenAI GPT-4 para conversaciones empáticas
- [ ] Claude API como alternativa
- [ ] Langchain para orquestación
- [ ] RAG (Retrieval Augmented Generation) con contexto de salud

### 3. Funcionalidad "Soledad"
- [ ] Detector de sentimientos de soledad
- [ ] Conversaciones proactivas
- [ ] Sistema de check-ins automáticos
- [ ] Memoria de conversaciones pasadas

### 4. Integración WhatsApp
- [ ] WhatsApp Business API
- [ ] Webhooks para mensajes entrantes
- [ ] Respuestas automáticas con IA
- [ ] Botones interactivos

## 📦 Librerías a Probar

```json
{
  "openai": "^4.0.0",
  "@anthropic-ai/sdk": "^0.20.0",
  "elevenlabs-node": "^1.0.0",
  "langchain": "^0.1.0",
  "@langchain/openai": "^0.0.14",
  "whatsapp-web.js": "^1.23.0"
}
```

## 🚀 Workflow

### Para trabajar en experimental:
```bash
# Asegurarte de estar en el branch correcto
git checkout experimental-lupita-ai

# Hacer cambios y commit
git add .
git commit -m "🧪 Experimento: [descripción]"
git push origin experimental-lupita-ai
```

### Para volver a main (sin cambios):
```bash
git checkout main
```

### Cuando quieras llevar cambios a producción:
```bash
# Desde main
git merge experimental-lupita-ai
git push origin main
```

## 🔐 Variables de Entorno Adicionales

Agrega estas en Vercel para el branch `experimental-lupita-ai`:

```env
# OpenAI
OPENAI_API_KEY=sk-...

# Elevenlabs (voz)
ELEVENLABS_API_KEY=...

# Anthropic Claude
ANTHROPIC_API_KEY=...

# WhatsApp Business API (opcional)
WHATSAPP_PHONE_NUMBER_ID=...
WHATSAPP_ACCESS_TOKEN=...
```

## 📊 Estado Actual

- ✅ Branch creado
- ✅ Preview URL activo en Vercel
- ⏳ Pendiente: Instalar librerías de IA
- ⏳ Pendiente: Configurar APIs

## 🎨 Páginas de Prueba

Crea páginas específicas para pruebas:
- `/lupita-test` - Interfaz de prueba de Lupita
- `/voice-test` - Prueba de diferentes voces
- `/conversation-test` - Simulador de conversaciones
- `/soledad-detector` - Detector de sentimientos

## ⚠️ Importante

- **NO tocar:** Nada relacionado con pagos, registro, o dashboard principal
- **SÍ experimentar:** Todo lo relacionado con IA, voz, y conversaciones
- **Usar:** Base de datos separada o tablas con prefijo `experimental_`

## 🔄 Sincronización

Para mantener experimental actualizado con main:
```bash
git checkout experimental-lupita-ai
git merge main
git push origin experimental-lupita-ai
```

---

**Última actualización:** Febrero 14, 2026  
**Creado por:** AI Assistant
