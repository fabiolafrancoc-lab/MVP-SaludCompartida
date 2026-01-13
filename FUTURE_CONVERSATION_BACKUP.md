# BACKUP Y AUDITORÍA DE CONVERSACIONES
## Nota para implementación futura

## 🎯 Objetivo

Almacenar conversaciones completas SIN EDITAR en repositorio en la nube separado de la base de datos principal.

## 📋 Razones

### 1. **Protección Legal**
- En caso de disputa legal, tener registro inmutable de conversaciones
- Demostrar que el AI no dio consejos médicos
- Demostrar que se respetaron límites éticos
- Protección contra reclamos falsos
- Cumplimiento con regulaciones (HIPAA si se expande a USA, GDPR si Europa)

### 2. **Aprendizaje de la Máquina**
- Analizar qué está aprendiendo el modelo
- Detectar patrones que el sistema automático no captura
- Identificar casos extremos (edge cases)
- Mejorar el sistema basado en conversaciones reales
- Entrenar modelos futuros con data real

### 3. **Control de Calidad**
- Auditar calidad de respuestas del AI
- Identificar si el AI se está "desviando" de su personalidad
- Detectar si usuarios intentan manipular al AI
- Monitorear cumplimiento de límites éticos

## 🏗️ Arquitectura Propuesta

### Opción A: AWS S3 + Glacier (Más económico)
```
Flujo:
1. Cada conversación se guarda en Supabase (operacional)
2. Al final del día, script cron exporta conversaciones
3. Se suben a S3 como archivos JSON
4. Después de 30 días, se mueven automáticamente a Glacier (archivo frío)

Estructura de archivo:
/conversations/
  /2026/
    /01/
      /12/
        user-abc123-2026-01-12.json
        user-def456-2026-01-12.json

Formato JSON:
{
  "user_id": "abc123",
  "date": "2026-01-12",
  "conversations": [
    {
      "timestamp": "2026-01-12T14:23:45Z",
      "user_message": "Hola, me duele la cabeza",
      "ai_response": "Ay mi vida, ¿desde cuándo te duele?",
      "metadata": {
        "companion_name": "Lupita",
        "conversation_count": 5,
        "keywords_detected": ["salud_sintomas"],
        "gpt_model": "gpt-4",
        "tokens_used": 234
      }
    }
  ]
}

Costo estimado:
- S3 Standard (primeros 30 días): ~$0.023/GB/mes
- Glacier (archivo): ~$0.004/GB/mes
- Con 10,000 usuarios activos: ~$15-30/mes
```

### Opción B: Google Cloud Storage (Alternativa)
```
Similar a S3 pero con Storage Classes:
- Standard (hot): primeros 30 días
- Nearline (warm): 30-90 días  
- Coldline (cold): 90-365 días
- Archive (coldest): 365+ días

Costo similar a AWS
```

### Opción C: Supabase Storage + Archive (Más simple)
```
- Usar Supabase Storage (basado en S3)
- Aprovechar que ya usamos Supabase
- Más fácil de implementar
- Costo: ~$0.021/GB/mes

Ventaja: Todo en un solo proveedor
Desventaja: Menos control sobre archiving
```

## 🔐 Seguridad y Privacidad

### Encriptación
```javascript
// Antes de subir a cloud
const encrypted = await encryptConversation(conversationData, ENCRYPTION_KEY);
// Usar AES-256-GCM o similar

// Al recuperar
const decrypted = await decryptConversation(encryptedData, ENCRYPTION_KEY);
```

### Anonimización Opcional
```javascript
// Para análisis de ML, crear versión anonimizada
const anonymized = {
  ...conversation,
  user_id: hashUserId(conversation.user_id), // One-way hash
  user_name: "Usuario_" + shortHash(conversation.user_id),
  phone_number: null // Eliminar PII
};
```

### Control de Acceso
- Solo administradores con 2FA pueden acceder
- Logs de quién accede a qué conversaciones
- Expiración automática después de X años (definir política)

## 📜 Consideraciones Legales

### Terms & Conditions debe incluir:
```
"Las conversaciones con tu companion pueden ser almacenadas 
de forma segura y encriptada para:
1. Protección legal mutua
2. Mejora del servicio
3. Cumplimiento regulatorio

Tus datos personales están protegidos y solo se usan de forma 
anonimizada para análisis agregado."
```

### Política de Retención
- **Activo**: Conversaciones recientes en Supabase (últimos 90 días)
- **Tibio**: 90 días - 1 año en S3/Storage
- **Frío**: 1-7 años en Glacier/Archive
- **Eliminación**: Después de 7 años (o según regulación)

### Derecho al Olvido (GDPR)
- Si usuario solicita eliminación de datos:
  - Eliminar de Supabase inmediatamente
  - Marcar archivos en cloud para eliminación
  - Proceso de 30 días para eliminar de backups

## 🤖 Uso para Machine Learning

### Análisis Automatizado
```python
# Script mensual
import json
from collections import Counter

# Cargar conversaciones del mes
conversations = load_month_conversations("2026-01")

# Análisis
topics = Counter()
response_quality = []
user_satisfaction_signals = []

for conv in conversations:
    # ¿Qué temas son más comunes?
    topics.update(conv['metadata']['keywords_detected'])
    
    # ¿Las respuestas son apropiadas?
    if is_response_appropriate(conv):
        response_quality.append('good')
    
    # ¿El usuario sigue conversando? (señal de satisfacción)
    if user_continued_after(conv):
        user_satisfaction_signals.append(1)

print(f"Top topics: {topics.most_common(10)}")
print(f"Quality score: {response_quality.count('good') / len(response_quality)}")
print(f"Engagement rate: {sum(user_satisfaction_signals) / len(user_satisfaction_signals)}")
```

### Fine-tuning de Modelos
```python
# Preparar dataset para fine-tuning
training_data = []

for conv in conversations:
    if conv['metadata']['quality_score'] > 4.0:  # Solo conversaciones buenas
        training_data.append({
            "messages": [
                {"role": "system", "content": conv['system_prompt']},
                {"role": "user", "content": conv['user_message']},
                {"role": "assistant", "content": conv['ai_response']}
            ]
        })

# Subir a OpenAI para fine-tuning
openai.FineTuningJob.create(
    training_file="file-abc123",
    model="gpt-4",
    suffix="saludcompartida-companions-v1"
)
```

## 🚀 Implementación Futura

### Fase 1: Setup Básico (1-2 días)
1. Elegir proveedor cloud (recomiendo AWS S3)
2. Crear bucket con lifecycle policies
3. Configurar encriptación
4. Script de backup diario

### Fase 2: Automatización (2-3 días)
1. Cron job que corre cada noche
2. Exporta conversaciones del día
3. Encripta y sube a S3
4. Verifica integridad
5. Notificación si algo falla

### Fase 3: Análisis (ongoing)
1. Dashboard de métricas
2. Scripts de análisis mensual
3. Reportes de calidad
4. Identificación de mejoras

### Fase 4: ML Pipeline (futuro)
1. Sistema de etiquetado de calidad
2. Preparación de datasets
3. Fine-tuning periódico
4. A/B testing de modelos

## 💰 Costo Estimado

Para 10,000 usuarios activos:
- Cada usuario: ~10 conversaciones/mes
- Cada conversación: ~1KB (texto comprimido)
- Total: 10,000 users × 10 conv × 1KB = 100MB/mes

**Costo mensual**:
- S3 Standard (30 días): ~$0.002
- Glacier (archivo): ~$0.05/año
- Total: **~$5-10/mes** incluyendo transferencias

**ROI**:
- Protección legal: Invaluable
- ML insights: $1,000s en mejoras de producto
- Compliance: Evita multas potenciales de $10,000+

## ✅ Checklist para Implementación

- [ ] Decidir proveedor cloud (AWS S3 recomendado)
- [ ] Configurar bucket con encryption at rest
- [ ] Implementar script de backup diario
- [ ] Configurar lifecycle policies (30d → Glacier)
- [ ] Actualizar Terms & Conditions
- [ ] Implementar encriptación AES-256
- [ ] Crear dashboard de monitoreo
- [ ] Definir política de retención (7 años)
- [ ] Implementar derecho al olvido
- [ ] Documentar proceso de auditoría legal
- [ ] Crear scripts de análisis ML
- [ ] Setup alertas si backup falla

## 📝 Notas Adicionales

- **Prioridad**: MEDIA-ALTA (antes de escalar a 1,000+ usuarios)
- **Tiempo estimado**: 1 semana de desarrollo
- **Dependencias**: Ninguna (puede hacerse en paralelo)
- **Riesgo sin esto**: Exposición legal, pérdida de insights valiosos

---

**Guardado en memoria**: ✅  
**Para implementar**: Cuando tengamos ~100+ usuarios activos o antes de marketing agresivo  
**Recordatorio**: Revisar esto antes de lanzar campañas grandes
