# 🤖 Lupita Lambda para AWS Connect

Lambda function que conecta Amazon Connect con Claude (Bedrock) para Lupita AI.

## 📋 **Prerequisitos**

- ✅ Cuenta AWS con acceso a:
  - Lambda
  - Bedrock (Claude)
  - Amazon Connect
- ✅ AWS CLI configurado
- ✅ Node.js 20+ instalado

---

## 🚀 **Deployment**

### **1. Instalar dependencias:**

```bash
cd lambda/lupita-connect
npm install
```

### **2. Crear archivo ZIP:**

```bash
zip -r lupita-lambda.zip index.mjs package.json node_modules/
```

### **3. Crear Lambda en AWS Console:**

1. Ve a AWS Lambda Console
2. **Create function**
3. Nombre: `LupitaConnectHandler`
4. Runtime: **Node.js 20.x**
5. Architecture: **arm64** (más barato)
6. Upload: `lupita-lambda.zip`

### **4. Configurar permisos (IAM Role):**

La Lambda necesita acceso a Bedrock:

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
    }
  ]
}
```

### **5. Conectar con Amazon Connect:**

En tu Contact Flow de Amazon Connect:

1. Agrega bloque **"Invoke AWS Lambda function"**
2. Selecciona: `LupitaConnectHandler`
3. Pasa atributo: `userMessage` con el input del usuario

---

## 🔧 **Variables de Entorno**

La Lambda usa:
- `AWS_REGION`: us-west-2 (para Bedrock)

---

## 🧪 **Testing Local**

```bash
node -e "
import('./index.mjs').then(m => 
  m.handler({
    Details: {
      ContactData: {
        Attributes: {
          userMessage: 'Hola Lupita, ¿cómo estás?'
        }
      }
    }
  }).then(r => console.log(r))
)
"
```

---

## 💰 **Costos Estimados**

- **Lambda:** ~$0.20 por 1 millón de requests
- **Bedrock (Claude 3 Sonnet):** 
  - Input: $0.003 por 1K tokens (~$0.0006 por llamada)
  - Output: $0.015 por 1K tokens (~$0.003 por llamada)
- **Total por llamada:** ~$0.004

**Para 1000 llamadas/mes:** ~$4.00

---

## 📊 **Logs**

Ver logs en CloudWatch:
```bash
aws logs tail /aws/lambda/LupitaConnectHandler --follow
```

---

## 🔄 **Actualizar**

```bash
# Hacer cambios en index.mjs
zip -r lupita-lambda.zip index.mjs package.json node_modules/
aws lambda update-function-code \
  --function-name LupitaConnectHandler \
  --zip-file fileb://lupita-lambda.zip
```

---

## ⚠️ **Importante**

- La Lambda está en **us-west-2** (Oregon) para acceso a Bedrock
- Claude 3 Sonnet tiene límite de 200 tokens por respuesta (configurado para llamadas telefónicas)
- El system prompt está optimizado para conversaciones mexicanas naturales
