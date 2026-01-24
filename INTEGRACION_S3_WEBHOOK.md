# 🔌 INTEGRACIÓN AWS S3 CON VAPI WEBHOOK

**Archivo a modificar:** `api/vapi-webhook.js`

---

## PASO 1: Agregar import al inicio del archivo

**Buscar las líneas al inicio:**
```javascript
import { createClient } from '@supabase/supabase-js';
import { CODIGOS_COMPORTAMIENTO } from '../ai-brain/lupita-scripts-relacionales.js';
```

**Agregar justo después:**
```javascript
import { backupVapiRecordingToS3 } from '../src/lib/aws-s3-client.js';
```

---

## PASO 2: Buscar la función handleCallEnd()

Buscar esta sección (aproximadamente línea 130-170):

```javascript
const { data: transcriptData, error: transcriptError } = await supabase
  .from('call_transcripts')
  .insert({
    call_id: call.id,
    access_code: accessCode,
    phone_number: phoneNumber,
    // ... más campos ...
  })
  .select()
  .single();
```

---

## PASO 3: Agregar backup a S3

**JUSTO DESPUÉS** del bloque anterior, agregar este código:

```javascript
// ============================================================
// ✨ NUEVO: Backup a S3 para precaución legal (conversaciones generales)
// ============================================================
let awsS3Url = null;

if (recording && recording.url && phoneNumber && phoneNumber !== 'unknown') {
  try {
    console.log('🪣 Starting S3 backup for legal purposes...');
    console.log('   Phone:', phoneNumber);
    console.log('   User:', userName || 'Unknown');
    
    awsS3Url = await backupVapiRecordingToS3(recording.url, {
      phoneNumber: phoneNumber,           // +525599906900 o +15558420346
      nombreApellido: userName || 'Unknown User',
      vapiCallId: call.id,
      duration: Math.round(call.duration || 0),
      callDate: call.startedAt || new Date().toISOString()
    });
    
    console.log('✅ S3 backup completed successfully');
    console.log('   → URL:', awsS3Url);
    console.log('   → Organizadas en: recordings/' + phoneNumber.replace('+', '') + '/');
    console.log('   → Límite automático: Últimas 4 conversaciones');
    console.log('   → Eliminación automática: 1 año');
    
    // Actualizar registro en Supabase con URL de S3
    if (transcriptData && transcriptData.id) {
      await supabase
        .from('call_transcripts')
        .update({ 
          aws_s3_url: awsS3Url,
          recording_backed_up: true,
          backup_completed_at: new Date().toISOString()
        })
        .eq('id', transcriptData.id);
      
      console.log('✅ Supabase updated with S3 URL');
    }
      
  } catch (s3Error) {
    console.error('⚠️ S3 backup failed (recording still available in VAPI)');
    console.error('   Error:', s3Error.message);
    // No lanzar error - la grabación ya está guardada en VAPI
    // S3 es solo precaución legal adicional
  }
}

console.log('✅ Call processing completed');
// ============================================================
```

---

## METADATA GUARDADA EN S3

Cada grabación en S3 tendrá esta metadata:

```javascript
{
  "nombre-apellido": "María González López",
  "telefono": "+525599906900",
  "fecha-llamada": "2026-01-24T14:30:45.123Z",
  "vapi-call-id": "call_abc123xyz456",
  "duracion-segundos": "180"
}
```

---

## ESTRUCTURA EN S3

```
s3://saludcompartida-call-recordings/
  └── recordings/
      ├── 525599906900/              ← Teléfono mexicano
      │   ├── 2026-01-24T10-30-00.opus
      │   ├── 2026-01-24T15-45-00.opus
      │   ├── 2026-01-25T09-20-00.opus
      │   └── 2026-01-25T14-30-00.opus  ← Máximo 4
      │
      └── 15558420346/               ← Teléfono USA
          ├── 2026-01-24T11-00-00.opus
          └── 2026-01-24T16-30-00.opus
```

---

## CARACTERÍSTICAS AUTOMÁTICAS

### 1. Límite de 4 conversaciones
- Después de subir una nueva grabación, automáticamente elimina las más viejas
- Siempre mantiene solo las últimas 4 por usuario
- Función `cleanupOldRecordings()` se ejecuta automáticamente

### 2. Eliminación después de 1 año
- AWS S3 Lifecycle Policy configurada
- Después de 365 días, S3 elimina automáticamente el archivo
- No requiere intervención manual

### 3. Organización por teléfono
- Cada usuario tiene su carpeta
- Llave de acceso: número de teléfono
- Fácil búsqueda y auditoría

---

## TESTING

Una vez modificado el webhook, probar con:

```bash
# 1. Verificar que S3 esté configurado
node -e "
const { checkS3Health } = require('./src/lib/aws-s3-client.js');
checkS3Health().then(console.log);
"

# 2. Hacer una llamada de prueba a Lupita

# 3. Verificar en consola del webhook que aparezca:
# ✅ S3 backup completed successfully
# → URL: https://saludcompartida-call-recordings.s3.us-east-1.amazonaws.com/recordings/...

# 4. Verificar en AWS Console:
# https://s3.console.aws.amazon.com/s3/buckets/saludcompartida-call-recordings
```

---

## NOTAS IMPORTANTES

⚠️ **Contenido de grabaciones:**
- Conversaciones generales con Lupita
- **NO incluye datos de salud** (según tus especificaciones)
- Solo precaución legal personal

🔒 **Seguridad:**
- Bucket privado (no acceso público)
- Encriptación AES-256
- Solo acceso con credenciales IAM

📊 **Metadata mínima:**
- Solo nombre, teléfono, fecha/hora
- Sin información sensible adicional
- Cumple con tus requisitos

🗑️ **Limpieza automática:**
- Máximo 4 conversaciones por usuario
- Eliminación automática después de 1 año
- Sin intervención manual requerida
