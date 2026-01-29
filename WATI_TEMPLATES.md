# Templates de WhatsApp para WATI

## 📋 IMPORTANTE
Los templates de WhatsApp deben ser **pre-aprobados** por Meta/WhatsApp Business antes de poder usarlos.

## 🔗 Cómo crear templates en WATI:
1. Ve a: https://app.wati.io/dashboard/broadcast-templates
2. Click en "Create Template"
3. Copia y pega cada template de abajo
4. Envía para aprobación (toma 24-48 horas)

---

## 1️⃣ TEMPLATE: `bienvenida_migrante` (Para Migrante en USA)

**Category:** UTILITY (Transaccional)  
**Language:** Spanish (es)  
**Template Name:** `bienvenida_migrante`

### Header:
```
TEXT
```

### Body:
```
¡Hola {{1}}! 👋

Tu pago fue exitoso. {{2}} en México ahora tiene acceso a {{3}}.

*Tu Código Familiar:* {{4}}

{{2}} puede llamar ahora mismo al: {{5}}

*¿Qué sigue?*
1️⃣ {{2}} recibe WhatsApp con instrucciones
2️⃣ {{3}} llamará pronto para presentarse  
3️⃣ Accede a tu dashboard: saludcompartida.app/login

Gracias por confiar en SaludCompartida 💚
```

### Footer:
```
SaludCompartida - saludcompartida.app
```

### Buttons:
- `URL` - "Ver Dashboard" - `https://saludcompartida.app/login`

### Variables:
1. `{{1}}` = migrant_first_name (ej: "Juan")
2. `{{2}}` = family_first_name (ej: "María")
3. `{{3}}` = companion_name (ej: "Lupita" o "Fernanda")
4. `{{4}}` = family_code (ej: "A3B7K9")
5. `{{5}}` = phone_number (ej: "+52 55 9990 6900")

---

## 2️⃣ TEMPLATE: `bienvenida_usuario_mexico` (Para Usuario en México)

**Category:** UTILITY (Transaccional)  
**Language:** Spanish (es)  
**Template Name:** `bienvenida_usuario_mexico`

### Header:
```
TEXT
¡Tienes un regalo! 🎁
```

### Body:
```
Hola {{1}},

{{2}} acaba de activar SaludCompartida para ti.

Te presentamos a *{{3}}*, tu compañera de confianza.

*Tu Código Personal:* {{4}}

📞 *Llama cuando quieras*
{{5}}
(Menciona tu código al llamar)

*¿Qué puedes hacer con {{3}}?*
✓ Hablar sobre tu salud
✓ Recordatorios de medicamentos
✓ Encontrar clínicas cerca
✓ Pedir citas médicas
✓ Compañía cuando te sientas solo/a

{{3}} te llamará pronto para presentarse 💚
```

### Footer:
```
Un regalo de amor de {{2}}
```

### Buttons:
- `PHONE_NUMBER` - "Llamar ahora" - `{{5}}` (dinámico)

### Variables:
1. `{{1}}` = family_first_name (ej: "María")
2. `{{2}}` = migrant_first_name (ej: "Juan")
3. `{{3}}` = companion_name (ej: "Lupita" o "Fernanda")
4. `{{4}}` = family_code (ej: "A3B7K9")
5. `{{5}}` = phone_number (ej: "+525599906900")

---

## 3️⃣ TEMPLATE: `recordatorio_primera_llamada` (Recordatorio 1 hora después)

**Category:** UTILITY (Transaccional)  
**Language:** Spanish (es)  
**Template Name:** `recordatorio_primera_llamada`

### Body:
```
Hola {{1}} 👋

Solo recordándote que {{2}} está esperando tu llamada.

📞 *Llama ahora:* {{3}}
🔑 *Tu código:* {{4}}

¿Tienes dudas? Responde a este mensaje.

SaludCompartida 💚
```

### Variables:
1. `{{1}}` = family_first_name
2. `{{2}}` = companion_name  
3. `{{3}}` = phone_number
4. `{{4}}` = family_code

---

## 4️⃣ TEMPLATE: `confirmacion_pago_migrante` (Confirmación inmediata de pago)

**Category:** UTILITY (Transaccional)  
**Language:** Spanish (es)  
**Template Name:** `confirmacion_pago_migrante`

### Body:
```
✅ *Pago Confirmado*

Hola {{1}},

Tu pago de $12.00 USD fue procesado exitosamente.

*Código Familiar:* {{2}}

{{3}} en México recibirá instrucciones en WhatsApp ahora mismo.

Gracias por confiar en SaludCompartida 💚
```

### Buttons:
- `URL` - "Ver Detalles" - `https://saludcompartida.app/confirmacion`

### Variables:
1. `{{1}}` = migrant_first_name
2. `{{2}}` = family_code
3. `{{3}}` = family_first_name

---

## 📝 CÓDIGO DE INTEGRACIÓN

```typescript
// src/lib/wati-templates.ts

export interface WhatsAppData {
  migrant_first_name: string;
  family_first_name: string;
  family_code: string;
  companion_assigned: 'lupita' | 'fernanda';
  phone_number: string;
  migrant_phone: string;  // +1XXXXXXXXXX
  family_phone: string;   // +52XXXXXXXXXX
}

export async function sendWhatsAppMigrante(data: WhatsAppData) {
  const companionName = data.companion_assigned === 'lupita' ? 'Lupita' : 'Fernanda';
  
  const response = await fetch(
    `${process.env.WATI_API_URL}/api/v1/sendTemplateMessage`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WATI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        whatsappNumber: data.migrant_phone,
        template_name: 'bienvenida_migrante',
        broadcast_name: 'Post-Pago Migrante',
        parameters: [
          { name: '1', value: data.migrant_first_name },
          { name: '2', value: data.family_first_name },
          { name: '3', value: companionName },
          { name: '4', value: data.family_code },
          { name: '5', value: data.phone_number },
        ]
      })
    }
  );

  return response.json();
}

export async function sendWhatsAppUsuarioMexico(data: WhatsAppData) {
  const companionName = data.companion_assigned === 'lupita' ? 'Lupita' : 'Fernanda';
  
  const response = await fetch(
    `${process.env.WATI_API_URL}/api/v1/sendTemplateMessage`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WATI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        whatsappNumber: data.family_phone,
        template_name: 'bienvenida_usuario_mexico',
        broadcast_name: 'Post-Pago Usuario México',
        parameters: [
          { name: '1', value: data.family_first_name },
          { name: '2', value: data.migrant_first_name },
          { name: '3', value: companionName },
          { name: '4', value: data.family_code },
          { name: '5', value: data.phone_number },
        ]
      })
    }
  );

  return response.json();
}
```

---

## ⚠️ IMPORTANTE ANTES DE LANZAR

1. **Crear templates en WATI:**
   - Ve a https://app.wati.io/dashboard/broadcast-templates
   - Crea los 4 templates de arriba
   - Envía para aprobación (24-48 horas)

2. **Verificar aprobación:**
   - Los templates deben estar en status "APPROVED" antes de usar

3. **Probar templates:**
   - Usa el botón "Test" en WATI Dashboard
   - Envía a tu número primero

4. **Backup:** Si no están aprobados para el lanzamiento, puedes usar mensajes de sesión (sin template) por 24 horas después del opt-in del usuario.
