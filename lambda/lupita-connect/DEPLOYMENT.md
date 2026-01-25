# 🚀 DEPLOYMENT COMPLETO - Lupita Lambda

## ✅ **ARCHIVO LISTO:**
`lambda/lupita-connect/lupita-lambda.zip` (3.2 MB)

---

## 📋 **PASOS PARA DESPLEGAR EN AWS:**

### **1. Ve a AWS Lambda Console:**
```
https://console.aws.amazon.com/lambda
```

### **2. Crear función:**
- Click **"Create function"**
- Nombre: `LupitaConnectHandler`
- Runtime: **Node.js 20.x**
- Architecture: **arm64** (más eficiente y barato)
- Click **"Create function"**

### **3. Subir el ZIP:**
- En la sección **"Code source"**
- Click **"Upload from"** → **".zip file"**
- Selecciona: `lupita-lambda.zip`
- Click **"Save"**

### **4. Configurar permisos (IAM):**

Ve a **Configuration → Permissions → Role name**

Agrega esta política (inline policy):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel"
      ],
      "Resource": "arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

### **5. Configurar timeout:**
- Configuration → General configuration → Edit
- **Timeout:** 30 segundos (default 3s es poco)
- **Memory:** 256 MB
- Click **"Save"**

### **6. Test:**

Crear test event:
```json
{
  "Details": {
    "ContactData": {
      "Attributes": {
        "userMessage": "Hola Lupita, ¿cómo estás?"
      }
    }
  }
}
```

Click **"Test"** → Deberías ver respuesta de Lupita

---

## 🔗 **CONECTAR CON AMAZON CONNECT:**

### **1. Ir a Amazon Connect Console:**
```
https://console.aws.amazon.com/connect/
```

### **2. Contact Flow:**
- Ve a **Routing → Contact flows**
- Agrega bloque **"Invoke AWS Lambda function"**
- Selecciona: `LupitaConnectHandler`
- Configura atributo: `userMessage` con input del usuario

### **3. Reclamar número mexicano:**
- Ve a **Channels → Phone numbers → Claim number**
- Country: **Mexico (+52)**
- Asocia al Contact Flow que creaste

---

## 💰 **COSTOS ESTIMADOS:**

Por llamada de 3 minutos:
- Lambda: ~$0.0002
- Bedrock (Claude 3 Sonnet): ~$0.004
- Amazon Connect: ~$0.018 (llamada entrante México)
- **TOTAL: ~$0.022 por llamada**

**Para 1000 llamadas/mes: ~$22**

Comparado con TELNYX: **~70% más barato**

---

## 📊 **VERIFICAR DEPLOYMENT:**

```bash
# Ver logs en CloudWatch
aws logs tail /aws/lambda/LupitaConnectHandler --follow

# Invocar desde CLI
aws lambda invoke \
  --function-name LupitaConnectHandler \
  --payload '{"Details":{"ContactData":{"Attributes":{"userMessage":"Hola"}}}}' \
  response.json

cat response.json
```

---

## ✅ **CHECKLIST:**

- [ ] Lambda creada y ZIP subido
- [ ] Permisos Bedrock configurados
- [ ] Timeout ajustado a 30s
- [ ] Test exitoso con mensaje de prueba
- [ ] Amazon Connect configurado
- [ ] Número mexicano reclamado
- [ ] Contact Flow conectado a Lambda

---

## 🎯 **PRÓXIMO PASO:**

Una vez desplegado, haz una llamada de prueba al número de Amazon Connect y verifica que Lupita responde correctamente.

**¿Necesitas ayuda con algún paso específico?** 🚀
