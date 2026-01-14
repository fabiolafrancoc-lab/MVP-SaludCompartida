# WhatsApp API: Guía de Códigos de País

## 🎯 Reglas de Negocio

### Códigos de País por Tipo de Usuario
- **Migrante (usuario principal):** 
  - USA: `+1`
  - México: `+52`
  - **Fuente:** Campo `country_code` en tabla `user_accounts`

- **Dependiente (familiar en México):**
  - Siempre: `+52`
  - **Fuente:** Los dependientes siempre están en México

---

## 📞 Construcción de Números Completos

### Función Helper para Construir Números
```javascript
// src/lib/whatsapp-helpers.js

/**
 * Construye el número completo de WhatsApp con código de país
 * @param {Object} user - Usuario o dependiente
 * @param {string} user.phone - Número de teléfono (10 dígitos)
 * @param {string} user.country_code - Código de país (solo para usuarios principales)
 * @param {boolean} user.is_dependent - Si es dependiente o no
 * @returns {string} - Número completo ej: "+525512345678" o "+13055551234"
 */
export function buildWhatsAppNumber(user) {
  if (!user.phone) {
    throw new Error('Número de teléfono es requerido');
  }

  // Limpiar el número (solo dígitos)
  const cleanPhone = user.phone.replace(/\D/g, '');

  // Si es dependiente, siempre usar +52 (México)
  if (user.is_dependent) {
    return `+52${cleanPhone}`;
  }

  // Si es usuario principal, usar su country_code
  const countryCode = user.country_code || '+52'; // Default a México
  return `${countryCode}${cleanPhone}`;
}

/**
 * Valida formato de número de WhatsApp
 * @param {string} fullNumber - Número completo con código de país
 * @returns {boolean}
 */
export function isValidWhatsAppNumber(fullNumber) {
  // Formato: +1 seguido de 10 dígitos (USA)
  const usaFormat = /^\+1\d{10}$/;
  
  // Formato: +52 seguido de 10 dígitos (México)
  const mexFormat = /^\+52\d{10}$/;

  return usaFormat.test(fullNumber) || mexFormat.test(fullNumber);
}

/**
 * Parsea número completo a componentes
 * @param {string} fullNumber - Número completo ej: "+525512345678"
 * @returns {Object} - {countryCode: "+52", phone: "5512345678"}
 */
export function parseWhatsAppNumber(fullNumber) {
  if (!fullNumber) return null;

  const usaMatch = fullNumber.match(/^(\+1)(\d{10})$/);
  if (usaMatch) {
    return {
      countryCode: usaMatch[1],
      phone: usaMatch[2]
    };
  }

  const mexMatch = fullNumber.match(/^(\+52)(\d{10})$/);
  if (mexMatch) {
    return {
      countryCode: mexMatch[1],
      phone: mexMatch[2]
    };
  }

  return null;
}
```

---

## 📤 Mensajes Outbound (Sistema → Usuario)

### Ejemplo 1: Enviar mensaje a usuario principal
```javascript
// api/send-whatsapp.js

import { getUserByAccessCode } from '../src/lib/supabase.js';
import { buildWhatsAppNumber } from '../src/lib/whatsapp-helpers.js';

export default async function handler(req, res) {
  const { accessCode, message } = req.body;

  try {
    // 1. Obtener usuario de la DB
    const { data: user } = await getUserByAccessCode(accessCode);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // 2. Construir número completo con código de país correcto
    const fullNumber = buildWhatsAppNumber({
      phone: user.phone,
      country_code: user.country_code, // +1 o +52
      is_dependent: false
    });
    // Resultado: "+13055551234" (USA) o "+525512345678" (México)

    // 3. Enviar mensaje vía Twilio
    const twilioMessage = await twilioClient.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${fullNumber}`, // ✅ Número completo con código de país
      body: message
    });

    res.status(200).json({ 
      success: true, 
      messageSid: twilioMessage.sid,
      to: fullNumber
    });
  } catch (error) {
    console.error('Error enviando WhatsApp:', error);
    res.status(500).json({ error: error.message });
  }
}
```

### Ejemplo 2: Enviar mensaje a dependiente
```javascript
// api/send-whatsapp-to-dependent.js

import { supabase } from '../src/lib/supabase.js';
import { buildWhatsAppNumber } from '../src/lib/whatsapp-helpers.js';

export default async function handler(req, res) {
  const { dependentId, message } = req.body;

  try {
    // 1. Obtener dependiente de la DB
    const { data: dependent } = await supabase
      .from('dependents')
      .select('*')
      .eq('id', dependentId)
      .eq('is_active', true)
      .single();
    
    if (!dependent || !dependent.phone) {
      return res.status(404).json({ error: 'Dependiente no encontrado o sin teléfono' });
    }

    // 2. Construir número completo (siempre +52 para dependientes)
    const fullNumber = buildWhatsAppNumber({
      phone: dependent.phone,
      is_dependent: true // ✅ Siempre usar +52
    });
    // Resultado: "+525543218765" (siempre México)

    // 3. Enviar mensaje vía Twilio
    const twilioMessage = await twilioClient.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${fullNumber}`,
      body: message
    });

    res.status(200).json({ 
      success: true, 
      messageSid: twilioMessage.sid,
      to: fullNumber
    });
  } catch (error) {
    console.error('Error enviando WhatsApp:', error);
    res.status(500).json({ error: error.message });
  }
}
```

---

## 📥 Mensajes Inbound (Usuario → Sistema)

### Ejemplo: Webhook de Twilio recibiendo mensajes
```javascript
// api/whatsapp-incoming.js

import { parseWhatsAppNumber } from '../src/lib/whatsapp-helpers.js';
import { supabase } from '../src/lib/supabase.js';

export default async function handler(req, res) {
  const { From, Body } = req.body; // From viene de Twilio
  
  // From example: "whatsapp:+525512345678" o "whatsapp:+13055551234"
  const fullNumber = From.replace('whatsapp:', ''); // "+525512345678"

  try {
    // 1. Parsear número
    const parsed = parseWhatsAppNumber(fullNumber);
    if (!parsed) {
      console.error('Formato de número inválido:', fullNumber);
      return res.status(400).send('Invalid phone number format');
    }

    // 2. Buscar usuario principal por teléfono y código de país
    const { data: user } = await supabase
      .from('user_accounts')
      .select('*')
      .eq('phone', parsed.phone)
      .eq('country_code', parsed.countryCode)
      .single();

    if (user) {
      console.log('✅ Mensaje de usuario principal:', user.first_name);
      // Procesar mensaje de usuario...
      return res.status(200).send('Message processed');
    }

    // 3. Si no es usuario principal, buscar en dependientes
    // Los dependientes solo pueden tener +52
    if (parsed.countryCode === '+52') {
      const { data: dependent } = await supabase
        .from('dependents')
        .select('*, user_accounts!inner(*)')
        .eq('phone', parsed.phone)
        .eq('is_active', true)
        .single();

      if (dependent) {
        console.log('✅ Mensaje de dependiente:', dependent.first_name);
        // Procesar mensaje de dependiente...
        return res.status(200).send('Message processed');
      }
    }

    // 4. Usuario no encontrado
    console.log('⚠️ Número no registrado:', fullNumber);
    res.status(200).send('Number not registered');

  } catch (error) {
    console.error('Error procesando mensaje entrante:', error);
    res.status(500).send('Internal server error');
  }
}
```

---

## 🤖 AI Brain: Llamadas Automáticas

### Ejemplo: Lupita AI generando cola de llamadas
```javascript
// ai-brain/lupita-agent-langchain.js

import { buildWhatsAppNumber, isValidWhatsAppNumber } from '../src/lib/whatsapp-helpers.js';

class LupitaAgent {
  async generatePriorityQueue(capacity = 20) {
    try {
      // 1. Obtener usuarios y dependientes de alta prioridad
      const { data: users } = await supabase
        .from('user_accounts')
        .select(`
          *,
          dependents(*)
        `)
        .order('last_call_date', { ascending: true })
        .limit(capacity);

      // 2. Construir cola con números completos
      const queue = [];

      for (const user of users) {
        // Agregar usuario principal
        const userNumber = buildWhatsAppNumber({
          phone: user.phone,
          country_code: user.country_code, // +1 o +52
          is_dependent: false
        });

        if (isValidWhatsAppNumber(userNumber)) {
          queue.push({
            type: 'user',
            id: user.access_code,
            name: `${user.first_name} ${user.last_name}`,
            phone: userNumber, // "+13055551234" o "+525512345678"
            priority: this.calculatePriority(user),
            churn_risk: user.churn_risk || 0
          });
        }

        // Agregar dependientes activos con teléfono
        if (user.dependents && user.dependents.length > 0) {
          for (const dep of user.dependents) {
            if (dep.is_active && dep.phone) {
              const depNumber = buildWhatsAppNumber({
                phone: dep.phone,
                is_dependent: true // Siempre +52
              });

              if (isValidWhatsAppNumber(depNumber)) {
                queue.push({
                  type: 'dependent',
                  id: dep.id,
                  user_access_code: user.access_code,
                  name: `${dep.first_name} ${dep.last_name}`,
                  phone: depNumber, // "+525543218765"
                  priority: this.calculatePriority(user) * 0.8, // Dependientes menos prioridad
                  relationship: dep.relationship
                });
              }
            }
          }
        }
      }

      // 3. Ordenar por prioridad
      queue.sort((a, b) => b.priority - a.priority);

      console.log(`✅ Cola generada: ${queue.length} contactos`);
      return queue;

    } catch (error) {
      console.error('Error generando cola:', error);
      throw error;
    }
  }

  async makeOutboundCall(contact) {
    console.log(`📞 Llamando a ${contact.name} (${contact.type}) al ${contact.phone}`);
    
    // Aquí se integra con Twilio Voice API o WhatsApp
    // El número ya viene en formato correcto: "+525512345678"
  }
}
```

---

## 🔍 Queries SQL Útiles

### Verificar todos los números con códigos de país
```sql
-- Usuarios principales
SELECT 
  access_code,
  first_name,
  last_name,
  country_code,
  phone,
  CONCAT(country_code, phone) as full_number,
  CASE 
    WHEN country_code = '+1' THEN 'USA 🇺🇸'
    WHEN country_code = '+52' THEN 'México 🇲🇽'
    ELSE 'Sin código'
  END as location
FROM user_accounts
WHERE phone IS NOT NULL
ORDER BY created_at DESC;

-- Dependientes (siempre México)
SELECT 
  d.id,
  d.user_access_code,
  d.first_name,
  d.last_name,
  d.phone,
  CONCAT('+52', d.phone) as full_number,
  'México 🇲🇽' as location,
  u.first_name as titular_name
FROM dependents d
JOIN user_accounts u ON d.user_access_code = u.access_code
WHERE d.is_active = true 
  AND d.phone IS NOT NULL
ORDER BY d.created_at DESC;

-- Consolidado: Todos los contactos con números completos
SELECT 
  'user' as type,
  u.access_code as id,
  u.first_name,
  u.last_name,
  CONCAT(u.country_code, u.phone) as full_whatsapp_number,
  u.country_code,
  NULL as titular
FROM user_accounts u
WHERE u.phone IS NOT NULL

UNION ALL

SELECT 
  'dependent' as type,
  CAST(d.id AS TEXT) as id,
  d.first_name,
  d.last_name,
  CONCAT('+52', d.phone) as full_whatsapp_number,
  '+52' as country_code,
  CONCAT(u.first_name, ' ', u.last_name) as titular
FROM dependents d
JOIN user_accounts u ON d.user_access_code = u.access_code
WHERE d.is_active = true 
  AND d.phone IS NOT NULL

ORDER BY first_name;
```

---

## ✅ Checklist de Implementación

### Frontend
- [x] `account.jsx` - Usuario principal con código dinámico ✅
- [x] `account.jsx` - Dependientes con +52 hardcodeado ✅
- [x] `contact.jsx` - +52 para contacto ✅
- [x] `therapy.jsx` - +52 para terapia ✅
- [x] `LoginCodigo.jsx` - Detección dinámica +1/+52 ✅

### Backend APIs
- [ ] `api/send-whatsapp.js` - Usar buildWhatsAppNumber() ⏳
- [ ] `api/send-whatsapp-codes.js` - Usar buildWhatsAppNumber() ⏳
- [ ] `api/whatsapp-incoming.js` - Usar parseWhatsAppNumber() ⏳
- [ ] `api/whatsapp-fallback.js` - Usar buildWhatsAppNumber() ⏳

### AI Brain
- [ ] `ai-brain/lupita-agent-langchain.js` - Usar buildWhatsAppNumber() ⏳
- [ ] `ai-brain/engines/priority-scheduler.js` - Incluir dependientes con +52 ⏳

### Database
- [x] Tabla `user_accounts` tiene columna `country_code` ✅
- [ ] Ejecutar `scripts/add-gender-to-dependents.sql` ⏳
- [ ] Verificar todos los usuarios tienen `country_code` poblado ⏳

### Testing
- [ ] Probar envío a usuario USA (+1) ⏳
- [ ] Probar envío a usuario México (+52) ⏳
- [ ] Probar envío a dependiente (+52) ⏳
- [ ] Probar recepción de mensaje desde USA ⏳
- [ ] Probar recepción de mensaje desde México ⏳

---

## 📝 Notas Adicionales

### Twilio WhatsApp Format
Twilio requiere el prefijo `whatsapp:` antes del número:
```javascript
// ✅ CORRECTO
to: 'whatsapp:+525512345678'
from: 'whatsapp:+14155238886'

// ❌ INCORRECTO
to: '+525512345678' // Falta prefijo whatsapp:
```

### Variables de Entorno
Asegurarse que estén configuradas:
```bash
TWILIO_ACCOUNT_SID=ACxxx...
TWILIO_AUTH_TOKEN=xxx...
TWILIO_WHATSAPP_NUMBER=+14155238886
```

### Rate Limits de WhatsApp
- **Limit inicial:** 250 conversaciones únicas/24 horas
- **Después de verificación:** 1,000 conversaciones/24 horas
- **Tier 2:** 10,000 conversaciones/24 horas
- **Tier 3:** 100,000 conversaciones/24 horas

Con llamadas diarias a 100-200 usuarios + dependientes, empezarás en el límite. Considera:
1. Priorizar llamadas críticas (alto churn risk)
2. Alternar días para dependientes
3. Solicitar upgrade de tier a WhatsApp temprano
