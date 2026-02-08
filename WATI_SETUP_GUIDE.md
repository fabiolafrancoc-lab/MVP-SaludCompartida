# 🚀 GUÍA: Configurar WhatsApp con WATI.io (10 minutos)

## ✅ POR QUÉ WATI ES MEJOR QUE TWILIO

| Característica | Twilio | WATI.io |
|---------------|--------|---------|
| **Setup Time** | ❌ Semanas | ✅ 10 minutos |
| **Aprobación Meta** | ❌ Compleja | ✅ Automática (24-48h) |
| **Dashboard Visual** | ❌ Básico | ✅ Completo y fácil |
| **Soporte** | ❌ Email en inglés | ✅ Chat + español |
| **Precio inicial** | $15 crédito | $39/mes (1,000 chats) |
| **Templates** | ❌ Manual | ✅ Pre-aprobados |

---

## 📋 PASO 1: Crear Cuenta en WATI (2 minutos)

1. Ve a: https://www.wati.io
2. Click en **"Start Free Trial"** o **"Get Started"**
3. Regístrate con:
   - Email de negocio
   - Nombre de tu empresa: "Salud Compartida"
   - País: México

---

## 📱 PASO 2: Conectar WhatsApp Business (3 minutos)

### Opción A: Si YA tienes WhatsApp Business
1. En WATI dashboard → **"Connect WhatsApp"**
2. Escanea el QR code con tu WhatsApp Business
3. ✅ ¡Listo! Ya está conectado

### Opción B: Si NO tienes WhatsApp Business
1. WATI te ayuda a crear uno
2. Click en **"I don't have a WhatsApp Business number"**
3. Siguen instrucciones paso a paso
4. WATI gestiona la aprobación con Meta por ti

**IMPORTANTE:** Usa un número diferente al que usas personalmente

---

## 🔑 PASO 3: Obtener API Credentials (1 minuto)

1. En WATI dashboard → **Settings** (⚙️)
2. Click en **"API Docs"** o **"Integration"**
3. Copia estos 2 valores:

```
WATI Endpoint: https://live-server-XXXXX.wati.io
WATI API Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
```

---

## ⚙️ PASO 4: Configurar en Vercel (2 minutos)

1. Ve a: https://vercel.com/dashboard
2. Selecciona tu proyecto: **saludcompartida**
3. **Settings** → **Environment Variables**
4. Agrega estas 2 variables:

### Variable 1:
```
Name: WATI_ENDPOINT
Value: https://live-server-XXXXX.wati.io
Apply to: Production, Preview, Development
```

### Variable 2:
```
Name: WATI_API_TOKEN
Value: (pega tu token completo aquí)
Apply to: Production, Preview, Development
```

5. Click **Save**
6. **Redeploy** tu sitio (importante para que tome las nuevas variables)

---

## 📝 PASO 5: Crear Templates de Mensajes (2 minutos)

En WATI dashboard → **Templates** → **Create Template**

### Template 1: Códigos de Acceso
```
Name: access_codes
Category: UTILITY
Language: Spanish

Message:
¡Hola {{1}}! 🎉

Bienvenido a Salud Compartida.

🔑 Tu código de acceso: {{2}}
👤 Código del familiar: {{3}}

Para usar el servicio:
1. Guarda estos códigos
2. Llámanos cuando necesites atención
3. Proporciona tu código al doctor

¿Tienes dudas? Responde a este mensaje.
```

### Template 2: Confirmación de Pago
```
Name: payment_confirmation
Category: UTILITY
Language: Spanish

Message:
✅ ¡Pago confirmado!

Hola {{1}}, tu pago de {{2}} fue procesado exitosamente.

Tu membresía está activa. Ya puedes:
• Llamar a telemedicina 24/7
• Agendar terapia psicológica
• Acceder a descuentos en farmacias

Código: {{3}}

¡Gracias por confiar en nosotros! 💚
```

**NOTA:** Los templates deben ser aprobados por Meta (tarda 24-48 horas). Mientras tanto, puedes enviar mensajes de texto normal en las primeras 24 horas después de que el usuario te escriba.

---

## 🧪 PASO 6: Probar Integración (2 minutos)

### Opción A: Prueba Manual desde Dashboard
1. En WATI → **Broadcast** → **New Broadcast**
2. Selecciona tu número personal de prueba
3. Escribe un mensaje: "Prueba de Salud Compartida"
4. Envía
5. ✅ Deberías recibir el WhatsApp en tu teléfono

### Opción B: Prueba desde tu API
```bash
# En tu terminal local:
curl -X POST https://saludcompartida.app/api/send-whatsapp-wati \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "5512345678",
    "message": "🧪 Prueba de integración WATI desde API"
  }'
```

---

## 🔄 PASO 7: Actualizar el Código de Registro

Cambiar de Twilio a WATI en tu archivo de registro:

```javascript
// En src/lib/supabase.js o donde envías WhatsApp

// ANTES (Twilio):
await fetch('/api/send-whatsapp', { ... });

// AHORA (WATI):
await fetch('/api/send-whatsapp-wati', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: familyPhone,
    message: `¡Hola ${familyName}! 
    
Tu código de acceso a Salud Compartida es: ${familyAccessCode}

Guárdalo para cuando necesites atención médica 🏥`,
    template_name: 'access_codes' // Opcional: usar template pre-aprobado
  })
});
```

---

## 📊 MONITOREO Y ESTADÍSTICAS

En WATI Dashboard puedes ver:
- ✅ Mensajes enviados/entregados/leídos
- 👥 Conversaciones activas
- 📈 Estadísticas de respuesta
- 🤖 Integración con chatbots (si quieres)

---

## 💰 PRECIOS WATI

- **Starter:** $39 USD/mes - 1,000 conversaciones
- **Growth:** $99 USD/mes - 5,000 conversaciones
- **Pro:** $249 USD/mes - 20,000 conversaciones

**Incluye:**
- WhatsApp Business API
- Dashboard completo
- Multi-agente (varios usuarios)
- Templates ilimitados
- Soporte prioritario

---

## 🆘 TROUBLESHOOTING

### ❌ "Template not found"
- Espera 24-48 horas para aprobación de Meta
- Mientras tanto, envía mensajes de texto simple (sin template_name)

### ❌ "Number not registered"
- El usuario debe haber iniciado conversación contigo primero
- O usa templates pre-aprobados (no requieren conversación previa)

### ❌ "API Token invalid"
- Verifica que copiaste el token completo
- Revisa que las variables estén en Vercel
- Redeploy después de agregar variables

---

## ✅ VENTAJAS DE WATI VS TWILIO

1. **Setup en 10 minutos** (vs semanas)
2. **Aprobación automática** de Meta
3. **Dashboard visual** fácil de usar
4. **Soporte en español** por chat
5. **Templates pre-aprobados** listos
6. **Sin código complicado** de Twilio
7. **Estadísticas detalladas** incluidas
8. **Multi-agente** (varias personas pueden responder)

---

## 🎯 SIGUIENTES PASOS

Una vez que WATI esté funcionando:

1. ✅ Prueba enviar códigos de acceso
2. ✅ Configura respuestas automáticas
3. ✅ Integra con tu sistema de AI agents
4. ✅ Activa notificaciones de pagos
5. ✅ Configura mensajes de seguimiento

---

## 🚀 ¿LISTO PARA IMPLEMENTAR?

Dime cuando tengas tu cuenta de WATI y te ayudo a:
1. Integrar con tu código existente
2. Crear los templates necesarios
3. Probar el flujo completo

**¡Adiós Twilio! 🎉**
