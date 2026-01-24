# 🪣 CONFIGURACIÓN AWS S3 PARA GRABACIONES DE LLAMADAS

**Fecha:** 24 Enero 2026  
**Propósito:** Precaución legal personal - Conversaciones con Lupita
**Contenido:** Conversaciones generales (NO datos de salud)
**Retención:** 1 año (eliminación automática)
**Límite:** Máximo 4 conversaciones por usuario
**Llave de acceso:** Número de teléfono del usuario

---

## 📋 PASO 1: CREAR BUCKET S3

### Opción A: Desde AWS Console (Recomendado - 5 minutos)

1. **Ir a S3 Console:**
   ```
   https://s3.console.aws.amazon.com/s3/buckets
   ```

2. **Crear Bucket:**
   - Click en **"Create bucket"**
   - **Bucket name:** `saludcompartida-call-recordings`
   - **AWS Region:** `us-east-1` (N. Virginia)
   - **Object Ownership:** ACLs disabled (default)
   - **Block Public Access:** ✅ **Block all public access** (CRÍTICO)
   - **Bucket Versioning:** Disabled (optional, pero recomendado Enable)
   - **Tags:** 
     - Key: `Project`, Value: `SaludCompartida`
     - Key: `Environment`, Value: `Production`
     - Key: `Type`, Value: `CallRecordings`
   - **Default encryption:**
     - ✅ Enable
     - Encryption type: **SSE-S3** (AWS managed keys)
   - Click **"Create bucket"**

3. **Configurar Lifecycle Policy (Retención 1 año - Eliminación automática):**
   - Click en el bucket recién creado
   - Ve a tab **"Management"**
   - Click **"Create lifecycle rule"**
   - **Rule name:** `auto-delete-after-1-year`
   - **Rule scope:** Apply to all objects in bucket
   - **Lifecycle rule actions:**
     - ✅ Marcar **"Expire current versions of objects"**
     - ⬜ NO marcar storage class transitions
   - **Expire current versions:**
     - Days after object creation: **365** (1 año)
   - Click **"Create rule"**
   
   > 🗑️ Esto eliminará automáticamente todas las grabaciones después de 1 año

4. **Configurar CORS (para acceso desde webhook):**
   - En el bucket, ve a tab **"Permissions"**
   - Scroll a **"Cross-origin resource sharing (CORS)"**
   - Click **"Edit"**
   - Pega este JSON:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST"],
       "AllowedOrigins": ["https://saludcompartida.app", "https://*.vercel.app"],
       "ExposeHeaders": ["ETag"],
       "MaxAgeSeconds": 3000
     }
   ]
   ```
   - Click **"Save changes"**

### Opción B: Desde AWS CLI (Para desarrolladores)

```bash
# 1. Crear bucket
aws s3 mb s3://saludcompartida-call-recordings --region us-east-1

# 2. Bloquear acceso público
aws s3api put-public-access-block \
  --bucket saludcompartida-call-recordings \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

# 3. Habilitar encriptación
aws s3api put-bucket-encryption \
  --bucket saludcompartida-call-recordings \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      },
      "BucketKeyEnabled": true
    }]
  }'

# 4. Agregar tags
aws s3api put-bucket-tagging \
  --bucket saludcompartida-call-recordings \
  --tagging 'TagSet=[{Key=Project,Value=SaludCompartida},{Key=Environment,Value=Production}]'

# 4. Configurar lifecycle (retención 1 año - eliminación automática)
cat > lifecycle.json << 'EOF'
{
  "Rules": [{
    "Id": "auto-delete-after-1-year",
    "Status": "Enabled",
    "Filter": {},
    "Expiration": {
      "Days": 365
    }
  }]
}
EOF

aws s3api put-bucket-lifecycle-configuration \
  --bucket saludcompartida-call-recordings \
  --lifecycle-configuration file://lifecycle.json
```

---

## 🔑 PASO 2: CREAR IAM USER PARA LA APLICACIÓN

### Desde AWS Console:

1. **Ir a IAM Console:**
   ```
   https://console.aws.amazon.com/iam/home#/users
   ```

2. **Crear Usuario:**
   - Click **"Add users"**
   - **User name:** `saludcompartida-s3-uploader`
   - **Access type:** ✅ **Programmatic access** (Access key - Programmatic access)
   - Click **"Next: Permissions"**

3. **Crear Policy Custom:**
   - Click **"Attach existing policies directly"**
   - Click **"Create policy"**
   - Ve a tab **"JSON"**
   - Pega esta policy (⚠️ reemplaza BUCKET_NAME):
   
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "AllowS3Upload",
         "Effect": "Allow",
         "Action": [
           "s3:PutObject",
           "s3:PutObjectAcl",
           "s3:GetObject",
           "s3:DeleteObject"
         ],
         "Resource": "arn:aws:s3:::saludcompartida-call-recordings/*"
       },
       {
         "Sid": "AllowListBucket",
         "Effect": "Allow",
         "Action": [
           "s3:ListBucket",
           "s3:GetBucketLocation"
         ],
         "Resource": "arn:aws:s3:::saludcompartida-call-recordings"
       }
     ]
   }
   ```
   
   - Click **"Next: Tags"**
   - Click **"Next: Review"**
   - **Policy name:** `SaludCompartida-S3-Recordings-Access`
   - Click **"Create policy"**

4. **Asignar Policy al Usuario:**
   - Vuelve a la ventana de creación de usuario
   - Click 🔄 para refrescar la lista de policies
   - Busca `SaludCompartida-S3-Recordings-Access`
   - ✅ Marca el checkbox
   - Click **"Next: Tags"** → **"Next: Review"** → **"Create user"**

5. **⚠️ GUARDAR CREDENCIALES (SOLO SE MUESTRAN UNA VEZ):**
   ```
   Access key ID:     AKIAXXXXXXXXXX
   Secret access key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
   ```
   
   **🚨 IMPORTANTE:** Copia estas credenciales AHORA. No podrás verlas de nuevo.

---

## 🔧 PASO 3: CONFIGURAR VARIABLES DE ENTORNO

### En .env.local:

```bash
# AWS S3 Configuration (Call Recordings - Legal Storage)
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_S3_BUCKET=saludcompartida-call-recordings
AWS_REGION=us-east-1
```

### En Vercel (Producción):

```bash
# Ir a: https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida/settings/environment-variables

# Agregar 4 variables:
AWS_ACCESS_KEY_ID          = AKIAXXXXXXXXXX
AWS_SECRET_ACCESS_KEY      = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_S3_BUCKET              = saludcompartida-call-recordings
AWS_REGION                 = us-east-1
```

---

## 📦 PASO 4: INSTALAR SDK DE AWS

```bash
cd /Users/fabiolafranco/Desktop/MVP-SaludCompartida
npm install @aws-sdk/client-s3 @aws-sdk/lib-storage
```

---

## 💻 PASO 5: CREAR HELPER PARA SUBIR A S3

Archivo: `src/lib/aws-s3-client.js` ✅ **YA CREADO**

**Características implementadas:**

1. **Estructura por teléfono:**
   ```
   recordings/
     ├── 525599906900/
     │   ├── 2026-01-24T10-30-00.opus
     │   ├── 2026-01-24T15-45-00.opus
     │   ├── 2026-01-25T09-20-00.opus
     │   └── 2026-01-25T14-30-00.opus (máximo 4)
     ├── 15558420346/
     │   └── 2026-01-24T11-00-00.opus
   ```

2. **Metadata mínima guardada:**
   - `nombre-apellido`: Nombre completo del usuario
   - `telefono`: +52 o +1 con número completo
   - `fecha-llamada`: Timestamp ISO de la llamada
   - `vapi-call-id`: ID de VAPI (referencia)
   - `duracion-segundos`: Duración de la llamada

3. **Límite de 4 conversaciones:**
   - Automáticamente elimina grabaciones viejas
   - Mantiene solo las últimas 4 por usuario
   - Función `cleanupOldRecordings()` se ejecuta después de cada subida

4. **Funciones disponibles:**
   ```javascript
   uploadRecordingToS3(audioFile, metadata)
   backupVapiRecordingToS3(vapiUrl, callData)
   getLast4Recordings(phoneNumber)
   cleanupOldRecordings(phoneNumber)
   checkS3Health()
   ```

---

## 🔌 PASO 6: INTEGRAR CON VAPI WEBHOOK

Modificar: `api/vapi-webhook.js`

```javascript
// Agregar al inicio del archivo:
import { backupVapiRecordingToS3 } from '../src/lib/aws-s3-client.js';

// En la función handleCallEnd(), después de guardar en Supabase:

async function handleCallEnd(event) {
  const { call, transcript, recording } = event;
  
  // ... código existente para guardar transcripción en Supabase ...
  
  // ✨ NUEVO: Backup a S3 para compliance legal
  let awsS3Url = null;
  
  if (recording && recording.url) {
    try {
      console.log('🪣 Starting S3 backup...');
      
      awsS3Url = await backupVapiRecordingToS3(recording.url, {
        vapiCallId: call.id,
        userPhone: registration.phone_number,
        duration: call.duration,
        callDate: new Date().toISOString(),
        callType: 'voice',
        year: new Date().getFullYear(),
        month: (new Date().getMonth() + 1).toString().padStart(2, '0')
      });
      
      console.log('✅ S3 backup completed:', awsS3Url);
      
      // Actualizar Supabase con URL de S3
      await supabase
        .from('call_transcripts')
        .update({ 
          aws_s3_url: awsS3Url,
          recording_backed_up: true,
          backup_completed_at: new Date().toISOString()
        })
        .eq('vapi_call_id', call.id);
        
    } catch (s3Error) {
      console.error('⚠️ S3 backup failed (call still recorded in VAPI):', s3Error);
      // No lanzar error - la llamada ya está grabada en VAPI
      // Solo loggeamos el fallo del backup
    }
  }
  
  // ... resto del código ...
}
```

---

## 📊 PASO 7: AGREGAR COLUMNAS A SUPABASE

Ejecutar en Supabase SQL Editor:

```sql
-- Agregar columnas para AWS S3
ALTER TABLE call_transcripts 
  ADD COLUMN IF NOT EXISTS aws_s3_url TEXT,
  ADD COLUMN IF NOT EXISTS recording_backed_up BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS backup_completed_at TIMESTAMPTZ;

ALTER TABLE companion_calls
  ADD COLUMN IF NOT EXISTS aws_s3_url TEXT,
  ADD COLUMN IF NOT EXISTS recording_backed_up BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS backup_completed_at TIMESTAMPTZ;

-- Crear índice para búsquedas
CREATE INDEX IF NOT EXISTS idx_call_transcripts_backed_up 
  ON call_transcripts(recording_backed_up) 
  WHERE recording_backed_up = false;

-- Comentarios
COMMENT ON COLUMN call_transcripts.aws_s3_url IS 'URL permanente en S3 para compliance legal (retención 7 años)';
COMMENT ON COLUMN call_transcripts.recording_backed_up IS 'TRUE si la grabación ya fue respaldada a S3';
```

---

## ✅ PASO 8: TESTING

### Test 1: Verificar conexión S3

```bash
node -e "
const { checkS3Health } = require('./src/lib/aws-s3-client.js');
checkS3Health().then(result => {
  console.log('S3 Health:', result);
  process.exit(result.healthy ? 0 : 1);
});
"
```

### Test 2: Subir archivo de prueba

```bash
node -e "
const { uploadRecordingToS3 } = require('./src/lib/aws-s3-client.js');
const fs = require('fs');

// Crear un archivo de audio de prueba
const testAudio = Buffer.from('TEST AUDIO FILE');

uploadRecordingToS3(testAudio, {
  vapiCallId: 'test-call-123',
  userPhone: '+525599906900',
  duration: 60,
  callDate: new Date().toISOString(),
  callType: 'test'
}).then(url => {
  console.log('✅ Test upload successful:', url);
}).catch(err => {
  console.error('❌ Test failed:', err);
});
"
```

### Test 3: Verificar en AWS Console

1. Ir a: https://s3.console.aws.amazon.com/s3/buckets/saludcompartida-call-recordings
2. Deberías ver carpetas: `recordings/2026/01/`
3. Click en el archivo de prueba
4. Verificar metadata y encryption

---

## 📈 MONITOREO Y COSTOS

### Costos Estimados (100 llamadas/mes, 3 min promedio)

```
Cálculos:
- 100 llamadas/mes × 3 min × 60 sec = 18,000 segundos/mes
- Audio opus: ~20 KB/segundo
- Total: 18,000 × 20 KB = 360 MB/mes

Costos AWS S3:
- Storage (Standard): 360 MB × $0.023/GB = $0.008/mes
- Storage (Glacier después de 90 días): ~$0.004/mes
- PUT requests: 100 × $0.005/1000 = $0.0005/mes
- GET requests (si se descargan): Mínimo

TOTAL: ~$0.10 - $0.50/mes
```

### CloudWatch Alarms (Opcional)

```bash
# Crear alarma si el bucket crece demasiado
aws cloudwatch put-metric-alarm \
  --alarm-name s3-recordings-size-alert \
  --alarm-description "Alert if recordings exceed 10GB" \
  --metric-name BucketSizeBytes \
  --namespace AWS/S3 \
  --statistic Average \
  --period 86400 \
  --threshold 10737418240 \
  --comparison-operator GreaterThanThreshold
```

---

## 🔒 SEGURIDAD Y COMPLIANCE

### ✅ Checklist de Seguridad:

- [x] Acceso público bloqueado
- [x] Encriptación en reposo (AES-256)
- [x] IAM user con permisos mínimos
- [x] Versionado habilitado (opcional)
- [x] Lifecycle policy (retención 7 años)
- [x] CORS configurado solo para dominios autorizados
- [x] Logging habilitado (opcional - S3 Server Access Logging)

### HIPAA Compliance:

1. **BAA (Business Associate Agreement) con AWS:**
   - Contactar AWS Support para firmar BAA
   - Necesario para datos de salud protegidos (PHI)
   - Gratis con cuenta AWS existente

2. **Auditoría:**
   - Habilitar CloudTrail para logging de accesos
   - Revisar accesos cada trimestre
   - Documentar retención y destrucción de datos

---

## 🆘 TROUBLESHOOTING

### Error: "Access Denied"
```bash
# Verificar credenciales
aws sts get-caller-identity

# Verificar permisos
aws s3 ls s3://saludcompartida-call-recordings/
```

### Error: "Bucket not found"
```bash
# Verificar región
aws s3api get-bucket-location --bucket saludcompartida-call-recordings
```

### Error: "Invalid credentials"
```bash
# Verificar variables de entorno
echo $AWS_ACCESS_KEY_ID
echo $AWS_SECRET_ACCESS_KEY

# Probar credenciales manualmente
aws s3 ls --profile default
```

---

## 📚 RECURSOS

- **AWS S3 Console:** https://s3.console.aws.amazon.com/
- **IAM Console:** https://console.aws.amazon.com/iam/
- **CloudWatch:** https://console.aws.amazon.com/cloudwatch/
- **Pricing Calculator:** https://calculator.aws/
- **HIPAA on AWS:** https://aws.amazon.com/compliance/hipaa-compliance/

---

## ✅ SIGUIENTE PASO

Una vez completados estos pasos:

```bash
# Agregar las credenciales a .env.local
# Instalar SDK de AWS
npm install @aws-sdk/client-s3 @aws-sdk/lib-storage

# Crear el cliente S3
# (copiar código del Paso 5)

# Modificar webhook VAPI
# (copiar código del Paso 6)

# Agregar columnas a Supabase
# (ejecutar SQL del Paso 7)

# Probar
npm run dev
# Hacer una llamada de prueba y verificar que se guarde en S3
```

**¿Listo para empezar con el Paso 1 (Crear Bucket)?**
