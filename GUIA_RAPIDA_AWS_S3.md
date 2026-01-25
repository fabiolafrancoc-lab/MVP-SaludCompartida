# 🚀 GUÍA RÁPIDA: CREAR BUCKET AWS S3 (5 MINUTOS)

## 📋 PASO 1: CREAR BUCKET S3

### 1.1 Abrir AWS Console
```
https://s3.console.aws.amazon.com/s3/buckets
```

### 1.2 Crear Bucket
1. **Click en botón naranja:** "Create bucket"

2. **Configuración básica:**
   ```
   Bucket name: saludcompartida-call-recordings
   AWS Region: US East (N. Virginia) us-east-1
   ```

3. **Object Ownership:**
   - Dejar marcado: ✅ "ACLs disabled (recommended)"

4. **Block Public Access settings:**
   - Dejar TODO marcado: ✅✅✅✅ (Block ALL public access)
   - ⚠️ CRÍTICO: No desmarcar nada aquí

5. **Bucket Versioning:**
   - Dejar en: "Disable" (no necesario)

6. **Tags (opcional pero recomendado):**
   - Click "Add tag"
   - Key: `Project` → Value: `SaludCompartida`
   - Key: `Environment` → Value: `Production`

7. **Default encryption:**
   - ✅ Marcar: "Enable"
   - Encryption type: "Server-side encryption with Amazon S3 managed keys (SSE-S3)"
   - ✅ Marcar: "Bucket Key" (para reducir costos)

8. **Advanced settings:**
   - Dejar todo por defecto

9. **Click botón naranja:** "Create bucket"

✅ **Bucket creado!**

---

## 🔧 PASO 2: CONFIGURAR LIFECYCLE RULE (ELIMINACIÓN 1 AÑO)

### 2.1 Ir al bucket
1. En la lista de buckets, **click en:** `saludcompartida-call-recordings`

### 2.2 Crear regla de lifecycle
1. Click en tab: **"Management"**
2. Scroll a "Lifecycle rules"
3. Click botón: **"Create lifecycle rule"**

### 2.3 Configurar regla
1. **Rule name:** `auto-delete-after-1-year`

2. **Choose a rule scope:**
   - Marcar: ✅ "Apply to all objects in the bucket"
   - Click checkbox: ✅ "I acknowledge..."

3. **Lifecycle rule actions:**
   - Marcar SOLO: ✅ "Expire current versions of objects"
   - NO marcar: ⬜ "Permanently delete noncurrent versions"
   - NO marcar: ⬜ "Delete expired object delete markers"
   - NO marcar: ⬜ Transitions

4. **Expire current versions of objects:**
   - Days after object creation: `365`

5. **Timeline summary (revisar):**
   ```
   Day 0: Object uploaded
   Day 365: Object expires and is deleted
   ```

6. Click botón: **"Create rule"**

✅ **Lifecycle rule creada!** Ahora los archivos se eliminarán automáticamente después de 1 año.

---

## 🔑 PASO 3: CREAR IAM USER

### 3.1 Abrir IAM Console
```
https://console.aws.amazon.com/iam/home#/users
```

### 3.2 Crear usuario
1. Click botón: **"Add users"** (o "Create user")

2. **User name:** `saludcompartida-s3-uploader`

3. **Select AWS credential type:**
   - Marcar: ✅ "Access key - Programmatic access"
   - NO marcar: ⬜ "Password - AWS Management Console access"

4. Click: **"Next: Permissions"**

---

## 📜 PASO 4: CREAR POLICY PERSONALIZADA

### 4.1 En la página de permisos
1. Click: **"Attach existing policies directly"**
2. Click botón: **"Create policy"**

### 4.2 En la nueva ventana (Policy Editor)
1. Click en tab: **"JSON"**

2. **Borrar todo** y pegar este JSON:

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

3. Click: **"Next: Tags"** (o skip)

4. Click: **"Next: Review"**

5. **Policy name:** `SaludCompartida-S3-Recordings-Access`

6. **Description (opcional):** `Permite subir, leer y eliminar grabaciones en bucket de SaludCompartida`

7. Click: **"Create policy"**

8. **Cerrar esta ventana** y volver a la ventana de creación de usuario

---

## 🔗 PASO 5: ASIGNAR POLICY AL USUARIO

### 5.1 Volver a página de creación de usuario
1. Click en 🔄 botón de refresh junto a "Filter policies"

2. En el buscador, escribir: `SaludCompartida`

3. Marcar checkbox: ✅ `SaludCompartida-S3-Recordings-Access`

4. Click: **"Next: Tags"** (skip)

5. Click: **"Next: Review"**

6. Revisar que todo esté correcto:
   ```
   User name: saludcompartida-s3-uploader
   AWS access type: Programmatic access
   Permissions: SaludCompartida-S3-Recordings-Access
   ```

7. Click: **"Create user"**

---

## 🔐 PASO 6: GUARDAR CREDENCIALES

### ⚠️ MUY IMPORTANTE - SOLO SE MUESTRAN UNA VEZ

En la pantalla de confirmación verás:

```
Access key ID:     AKIAXXXXXXXXXX
Secret access key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

### 6.1 Copiar credenciales
1. **Click en:** "Download .csv" (recomendado como backup)
2. **O copiar manualmente:**
   - Access key ID → Guardar en notas
   - Click "Show" en Secret access key → Copiar y guardar

3. Click: **"Close"**

⚠️ **CRÍTICO:** No podrás volver a ver el Secret Access Key. Si lo pierdes, tendrás que crear uno nuevo.

---

## 📝 PASO 7: AGREGAR A .ENV.LOCAL

En tu archivo `.env.local`, agregar:

```bash
# AWS S3 Configuration (Call Recordings)
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_S3_BUCKET=saludcompartida-call-recordings
AWS_REGION=us-east-1
```

---

## ✅ VERIFICACIÓN RÁPIDA

### Verificar que todo esté correcto:

**Checklist:**
- [x] Bucket `saludcompartida-call-recordings` existe
- [x] Bucket es PRIVADO (Block all public access)
- [x] Encriptación habilitada (SSE-S3)
- [x] Lifecycle rule: elimina después de 365 días
- [x] IAM user `saludcompartida-s3-uploader` creado
- [x] Policy `SaludCompartida-S3-Recordings-Access` asignada
- [x] Credenciales guardadas en .env.local

---

## 🧪 PASO 8: PROBAR CONEXIÓN

Una vez agregadas las credenciales a `.env.local`:

```bash
cd /Users/fabiolafranco/Desktop/MVP-SaludCompartida

# Instalar SDK de AWS
npm install @aws-sdk/client-s3 @aws-sdk/lib-storage

# Probar conexión
node -e "
const { checkS3Health } = require('./src/lib/aws-s3-client.js');
checkS3Health().then(result => {
  console.log(result);
  if (result.healthy) {
    console.log('✅ TODO FUNCIONANDO!');
  } else {
    console.log('❌ Error:', result.error);
  }
});
"
```

Si ves: **✅ S3 health check passed** → ¡Todo listo!

---

## 🎯 SIGUIENTE PASO

Una vez probado que funciona:
1. Agregar las credenciales a **Vercel** (variables de entorno en producción)
2. Modificar `api/vapi-webhook.js` según `INTEGRACION_S3_WEBHOOK.md`
3. Hacer una llamada de prueba y verificar que se guarde en S3

---

## 💰 COSTOS ESTIMADOS

Para tu caso (100 llamadas/mes × 3 min):
```
- Storage: ~360 MB/mes × $0.023/GB = $0.008/mes
- PUT requests: 100 × $0.005/1000 = $0.0005/mes
- GET requests: Mínimo

TOTAL: ~$0.10/mes (¡casi gratis!)
```

---

## 🆘 ¿PROBLEMAS?

### Error: "Access Denied" al crear bucket
- Verifica que tu usuario de AWS tenga permisos de administrador
- O que tenga el permiso `s3:CreateBucket`

### Error: "Bucket name already exists"
- Los nombres de bucket son únicos globalmente
- Prueba: `saludcompartida-recordings-2026` o similar

### No encuentras IAM en el menú
- Usa la barra de búsqueda superior
- Escribe: "IAM" y presiona Enter

---

## 📞 LISTO PARA AYUDARTE

Cuando hagas estos pasos, avísame y te ayudo con el siguiente:
1. Instalar el SDK de AWS
2. Probar la conexión
3. Integrar con el webhook de VAPI

¡Esto te tomará literalmente 5 minutos! 🚀
