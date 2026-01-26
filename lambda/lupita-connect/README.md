# 🚀 Lupita Lambda v2.0.0 - AWS Connect + Bedrock + ElevenLabs

## ⚠️ CAMBIOS CRÍTICOS vs. Versión 1.0

| Parámetro | v1.0 (ANTES) | v2.0 (AHORA) | Motivo |
|-----------|--------------|--------------|--------|
| `max_tokens` | **200** | **500** | 200 era muy limitado (~50 palabras). Imposible tener conversaciones naturales. |
| System Prompt | Simplificado | **Completo con 16 códigos conductuales** | Migrado íntegro de VAPI. Incluye técnicas de conversación y manejo de emociones. |
| Historial | ❌ No tenía | **✅ Implementado** | Lupita NO recordaba lo dicho hace 30 segundos. Ahora sí. |
| ElevenLabs | ❌ No integrado | **✅ Integrado** | Mantiene la voz natural de Lupita (z1ngDYs2H24Xsd8ts3az). |

---

## 🔴 El Problema que Resolvimos

### Issue 1: max_tokens: 200
**Síntoma:** Lupita solo podía decir ~50 palabras por respuesta.  
**Impacto:** Conversaciones robóticas, cortas, poco naturales.  
**Solución:** Aumentado a 500 tokens (~125 palabras). Suficiente para respuestas empáticas.

### Issue 2: System Prompt Simplificado
**Síntoma:** Faltaban los 16 códigos conductuales, técnicas de conversación, manejo de emociones.  
**Impacto:** Lupita no sabía cómo manejar llanto, soledad, confusión.  
**Solución:** System prompt completo migrado de VAPI (800+ líneas).

### Issue 3: Sin Historial
**Síntoma:** Lupita no recordaba lo que el usuario dijo 30 segundos antes.  
**Impacto:** Conversaciones desconectadas, repetitivas.  
**Solución:** Historial de conversación implementado (últimos 20 turnos).

---

## 📋 Requisitos Previos

1. **AWS Account** con acceso a Bedrock en us-west-2 (Oregon)
2. **Claude 3 Sonnet** habilitado en Bedrock Model Access
3. **ElevenLabs API Key** (obligatorio para voz)
4. **Voice ID de Lupita** (z1ngDYs2H24Xsd8ts3az)

---

## 🔧 Variables de Entorno (AWS Lambda Console)

```bash
ELEVENLABS_API_KEY=tu-api-key-de-elevenlabs
ELEVENLABS_VOICE_ID=z1ngDYs2H24Xsd8ts3az
```

### Cómo configurar:

1. AWS Lambda Console → **lupita-voice-handler**
2. **Configuration** → **Environment variables**
3. **Edit** → **Add environment variable**
4. Agregar las dos variables arriba

---

## 🚀 Despliegue

### Paso 1: Instalar Dependencias

```bash
cd lambda/lupita-connect
npm install
```

### Paso 2: Crear ZIP de Deployment

```bash
zip -r lupita-lambda.zip  package.json node_modules/
```

### Paso 3: Subir a AWS Lambda

**Opción A: AWS CLI**
```bash
aws lambda update-function-code \
  --function-name lupita-voice-handler \
  --zip-file fileb://lupita-lambda.zip \
  --region us-west-2
```

**Opción B: AWS Console**
1. Lambda → **lupita-voice-handler**
2. **Code** → **Upload from** → **.zip file**
3. Seleccionar `lupita-lambda.zip`

---

## 🧪 Testing

### Test en AWS Console:

1. Lambda → **lupita-voice-handler** → **Test**
2. Crear evento de prueba:

```json
{
  "Details": {
    "ContactData": {
      "ContactId": "test-contact-123",
      "Attributes": {
        "userMessage": "Hola Lupita, buenos días. Me siento un poco sola hoy.",
        "userContext": "Usuario: María, 68 años, vive sola en Guadalajara. Hijos en Los Ángeles."
      }
    }
  }
}
```

3. Click **Test**

### Respuesta Esperada:

```json
{
  "statusCode": 200,
  "lupitaResponse": "¡Hola María! Buenos días, ¿cómo amaneció? La entiendo, a veces los días se ponen pesados cuando uno está solo. Pero aquí estoy yo para platicar con usted. Cuénteme, ¿qué hizo ayer?",
  "audioBase64": "UklGRi4AAABXQVZFZm10IBAAAAABA...",
  "contactId": "test-contact-123",
  "metadata": {
    "tokensUsed": 89,
    "historyLength": 2
  }
}
```

**Notas:**
- `lupitaResponse`: Texto de Lupita (2-3 oraciones, natural)
- `audioBase64`: Audio MP3 generado por ElevenLabs (si configurado)
- `historyLength`: Número de turnos en la conversación

---

## 📊 Monitoreo

### Ver logs en tiempo real:

```bash
aws logs tail /aws/lambda/lupita-voice-handler --follow --region us-west-2
```

### En CloudWatch:
1. CloudWatch → **Log groups**
2. Buscar `/aws/lambda/lupita-voice-handler`
3. Ver logs de invocaciones

---

## ⚡ Notas Técnicas

### Sobre los 500 tokens:
- 200 tokens = ~50 palabras (muy corto)
- 500 tokens = ~125 palabras (suficiente para Lupita)
- Costo: ~$0.0015 por respuesta (Claude Sonnet)
- Total llamada 5 min: ~$0.015 (vs $0.070 con VAPI)

### Sobre el historial:
- Se guarda en memoria durante la llamada (Map en Lambda)
- Límite: últimos 20 turnos (10 mensajes usuario + 10 respuestas)
- Se limpia automáticamente con `cleanupHandler`
- **Para producción:** migrar a DynamoDB para persistencia

### Sobre ElevenLabs:
- Si NO configuras las variables de entorno, Lambda funciona igual pero sin audio
- Audio retornado en Base64 para AWS Connect
- Costo: ~$0.15 por 1,000 caracteres
- Modelo: `eleven_multilingual_v2` (optimizado para español)

---

## 🔄 Arquitectura: VAPI vs AWS

```
ANTES (VAPI):
Llamada → TELNYX → VAPI → Claude → ElevenLabs → Voz
                    ↑
              (VAPI orquesta todo, $0.070/min)

AHORA (AWS):
Llamada → Connect → Lambda → Bedrock → ElevenLabs → Voz
                     ↑
              (Lambda orquesta, $0.003/min)
```

**Ahorro:** ~95% en costos de inferencia

---

## 📞 Próximos Pasos

1. ✅ **Lambda creada con v2.0** (código corregido)
2. ⏳ **Configurar variables de entorno** (ElevenLabs)
3. ⏳ **Número +52 México** (AWS Connect - Lunes)
4. ⏳ **Contact Flow** (flujo de llamadas)
5. ⏳ **Primera llamada de prueba completa**

---

## 🚨 Troubleshooting

### Error: "max_tokens must be between 1 and 4096"
**Causa:** Bedrock no acepta el parámetro  
**Solución:** Asegúrate de usar v2.0.0 con `max_tokens: 500`

### Error: "ElevenLabs API error: 401"
**Causa:** API Key incorrecta  
**Solución:** Verificar variable de entorno `ELEVENLABS_API_KEY`

### Error: "Context length exceeded"
**Causa:** Historial muy largo  
**Solución:** Reducir límite de 20 a 10 turnos en línea 141

### Respuestas muy cortas (aún con 500 tokens)
**Causa:** System prompt no aplicado correctamente  
**Solución:** Verificar que `systemPromptWithContext` se pasa a Bedrock

---

## 📝 Changelog

### v2.0.0 (25 Enero 2026)
- ✅ `max_tokens` aumentado de 200 a 500
- ✅ System prompt completo migrado de VAPI
- ✅ Historial de conversación implementado
- ✅ Integración ElevenLabs agregada
- ✅ Función `cleanupHandler` para limpiar memoria
- ✅ Manejo de contexto de usuario
- ✅ Error handling mejorado con respuesta de fallback

### v1.0.0 (23 Enero 2026)
- ✅ Lambda básica con Bedrock
- ⚠️ max_tokens: 200 (muy limitado)
- ⚠️ Sin historial
- ⚠️ Sin ElevenLabs

---

**Fecha:** 25 Enero 2026  
**Autor:** Claude + Fabiola Franco  
**Versión:** 2.0.0  
**Lanzamiento:** Lunes 27 Enero 2026
