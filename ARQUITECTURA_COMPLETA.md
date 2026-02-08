# 🏗️ ARQUITECTURA COMPLETA: Cómo funciona todo tu sistema

## 📊 Diagrama de flujo completo

```
Usuario (Navegador)
       ↓
   Visual Studio Code (donde programas)
       ↓
   GitHub (donde guardas el código)
       ↓
   Vercel (donde se publica la app)
       ↓
   [Servicios externos: Supabase, Resend, Twilio]
```

---

## 1️⃣ **VISUAL STUDIO CODE (VS Code)**

### ¿Qué es?
Tu editor de código. Donde escribes y modificas archivos.

### ¿Qué hace en tu proyecto?
- Editas archivos `.jsx`, `.js`, `.css`
- Ejecutas comandos en la terminal (git, npm)
- Ves errores en tiempo real
- Instalas dependencias con `npm install`

### Ejemplo:
```bash
# En VS Code terminal:
npm install twilio          # Instala Twilio
git add -A                  # Prepara cambios
git commit -m "mensaje"     # Guarda cambios localmente
git push origin main        # Envía a GitHub
```

---

## 2️⃣ **GITHUB**

### ¿Qué es?
Un lugar en la nube donde guardas tu código (como Google Drive pero para programadores).

### ¿Qué hace en tu proyecto?
- Guarda TODO tu código de forma segura
- Mantiene historial de cambios (puedes volver atrás)
- Permite trabajar en equipo
- **Conectado automáticamente con Vercel**

### Tu repositorio:
```
https://github.com/fabiolafrancoc-lab/prototipo-saludcompartida
```

### Flujo:
```
1. Editas código en VS Code
2. Haces commit (git commit)
3. Haces push (git push)
4. GitHub recibe tu código
5. Vercel detecta el cambio automáticamente ✨
6. Vercel despliega la nueva versión
```

**Importante**: Cada vez que haces `git push`, Vercel despliega automáticamente en 2-3 minutos.

---

## 3️⃣ **VERCEL**

### ¿Qué es?
Una plataforma que PUBLICA tu app en internet para que cualquiera pueda acceder.

### ¿Qué hace en tu proyecto?
1. **Detecta cambios** en GitHub automáticamente
2. **Construye** tu app (ejecuta `npm run build`)
3. **Despliega** en internet
4. **Asigna URL**: `saludcompartida.com/prototype`
5. **Ejecuta las APIs** (Serverless Functions)

### URLs de tu proyecto:
- **Principal**: `https://www.saludcompartida.com/`
- **Prototipo**: `https://saludcompartida.com/prototype`
- **URL técnica**: `https://prototipo-saludcompartida-git-main-salud-compartida.vercel.app/`

### Variables de entorno en Vercel:
Configuraciones secretas que NO van en el código:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxx      # Credenciales de Twilio
TWILIO_AUTH_TOKEN=xxxxxxxxx         # Para enviar SMS/WhatsApp
SUPABASE_URL=https://xxxx.supabase.co  # Base de datos
SUPABASE_KEY=xxxxxxxxx              # Acceso a Supabase
RESEND_API_KEY=re_xxxxxxxxx         # Para enviar emails
```

### Serverless Functions (APIs):
Vercel ejecuta estas funciones automáticamente cuando alguien las llama:

```
/api/send-sms.js          ← Envía SMS con Twilio
/api/send-whatsapp.js     ← Envía WhatsApp con Twilio
/api/send-email.js        ← Envía emails con Resend
```

---

## 4️⃣ **SUPABASE**

### ¿Qué es?
Tu base de datos en la nube (como Excel pero más poderoso).

### ¿Qué hace en tu proyecto?
Guarda:
- ✅ Usuarios registrados
- ✅ Códigos de acceso
- ✅ Citas agendadas
- ✅ Datos de migrantes y familias
- ✅ Historial de consultas

### Estructura de tu base de datos:
```
Tabla: registrations
├── id (único)
├── migrant_first_name
├── migrant_last_name
├── migrant_phone
├── migrant_access_code   ← Código de 6 dígitos
├── family_first_name
├── family_last_name
├── family_phone
├── family_access_code
├── created_at
└── family_country
```

### Flujo de registro:
```
1. Usuario llena formulario en el prototipo
2. Click "Registrarse"
3. Frontend envía datos a /lib/supabase.js
4. insertRegistration() guarda en Supabase
5. Genera códigos de acceso (ABC123)
6. Retorna los códigos generados
7. App envía códigos por SMS/WhatsApp
```

### Código ejemplo:
```javascript
import { insertRegistration } from './lib/supabase';

const result = await insertRegistration({
  migrantFirstName: 'María',
  migrantLastName: 'García',
  migrantPhone: '5551234567',
  // ... más datos
});

console.log(result.migrantAccessCode);  // ABC123
console.log(result.familyAccessCode);   // XYZ789
```

### Dashboard de Supabase:
```
https://supabase.com/dashboard
```
Aquí puedes ver todos los registros en tiempo real.

---

## 5️⃣ **RESEND**

### ¿Qué es?
Servicio para enviar EMAILS profesionales.

### ¿Qué hace en tu proyecto?
Envía emails cuando:
- ✅ Alguien se registra
- ✅ Alguien agenda una cita
- ✅ Alguien envía mensaje de contacto
- ✅ Alguien califica el servicio

### Configuración:
```env
RESEND_API_KEY=re_xxxxxxxxx
```

### Flujo de email:
```
1. Usuario registra / agenda cita
2. Frontend llama a /api/send-email
3. API de Vercel usa Resend
4. Resend envía el email
5. Email llega a: admin@saludcompartida.com
```

### Ejemplo de email enviado:
```
De: SaludCompartida <noreply@saludcompartida.com>
Para: admin@saludcompartida.com
Asunto: Nueva cita de terapia agendada

Paciente: María García
Fecha: 15 de noviembre, 2025
Hora: 10:00 hrs
Teléfono: +52 998 492 2702
```

### Dashboard de Resend:
```
https://resend.com/dashboard
```
Aquí ves todos los emails enviados.

---

## 6️⃣ **TWILIO**

### ¿Qué es?
Servicio para enviar SMS y mensajes de WhatsApp.

### ¿Qué hace en tu proyecto?
Envía notificaciones automáticas:
- ✅ Código de acceso al registrarse
- ✅ Confirmación de cita (terapia, telemedicina)
- ✅ Recordatorios 24 horas antes
- ✅ Respaldo si WhatsApp falla (envía SMS)

### Configuración:
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxx
TWILIO_PHONE_NUMBER=+14155238886        # Número de Twilio
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

### Flujo de notificación:
```
1. Usuario agenda cita de terapia
2. Frontend llama a sendAppointmentConfirmation()
3. Función intenta enviar WhatsApp primero
4. Si WhatsApp falla → envía SMS automáticamente
5. Usuario recibe mensaje en su celular
```

### Código en tu app:
```javascript
import { sendAppointmentConfirmation } from '../lib/notifications';

await sendAppointmentConfirmation({
  phone: '9984922702',         // 10 dígitos sin +52
  firstName: 'María',
  date: '15 de noviembre',
  time: '10:00 hrs',
  type: 'psicología'
});

// Usuario recibe:
// "Hola María 👋
//  Tu cita de psicología ha sido confirmada...
//  📅 Fecha: 15 de noviembre
//  ⏰ Hora: 10:00 hrs"
```

### Dashboard de Twilio:
```
https://console.twilio.com
```
Aquí ves todos los SMS/WhatsApp enviados y su estado (entregado, fallido, etc.).

---

## 🔄 **FLUJO COMPLETO DE REGISTRO**

### Paso a paso de lo que sucede:

```
1. 👤 Usuario abre: saludcompartida.com/prototype
   └─ Vercel sirve la app desde GitHub

2. 📝 Usuario llena formulario de registro
   └─ React maneja el formulario en App.jsx

3. ✅ Click "Registrarse"
   └─ handleSubmit() se ejecuta

4. 💾 Guardar en Supabase
   └─ insertRegistration() envía datos
   └─ Supabase genera códigos: ABC123, XYZ789
   └─ Retorna códigos generados

5. 📧 Enviar email (Resend)
   └─ fetch('/api/send-email')
   └─ Vercel ejecuta api/send-email.js
   └─ Resend envía email a admin
   └─ Email llega con datos del registro

6. 📱 Enviar SMS/WhatsApp (Twilio)
   └─ sendAccessCode(phone, 'ABC123', 'María')
   └─ fetch('/api/send-whatsapp')
   └─ Vercel ejecuta api/send-whatsapp.js
   └─ Twilio envía mensaje al celular
   └─ Usuario recibe: "Tu código es: ABC123"

7. 🎉 Mostrar confirmación
   └─ Pantalla de éxito en el navegador
   └─ "¡Registro exitoso! Revisa tu WhatsApp"
```

---

## 🔄 **FLUJO COMPLETO DE CITA DE TERAPIA**

```
1. 👤 Usuario entra a /therapy
   └─ Vercel sirve therapy.jsx

2. 📅 Usuario selecciona fecha y hora
   └─ React maneja el estado

3. 📝 Usuario llena datos (nombre, teléfono, email)
   └─ Validación en tiempo real

4. ✅ Click "Confirmar mi sesión"
   └─ handleSubmit() se ejecuta

5. ✉️ Enviar email (Resend)
   └─ fetch('/api/send-email')
   └─ Email llega a admin con detalles de la cita

6. 📲 Enviar notificación (Twilio)
   └─ sendAppointmentConfirmation()
   └─ Intenta WhatsApp primero
   └─ Si falla → envía SMS
   └─ Usuario recibe confirmación

7. 🎊 Mostrar pantalla de éxito
   └─ "¡Cita confirmada! Te contactaremos 24 hrs antes"
```

---

## 🎯 **RESUMEN: ¿Cómo trabajan juntos?**

```
VS Code (programas)
    ↓ git push
GitHub (guarda código)
    ↓ auto-deploy
Vercel (publica app + ejecuta APIs)
    ↓ usa
├─ Supabase (guarda registros)
├─ Resend (envía emails)
└─ Twilio (envía SMS/WhatsApp)
```

### Analogía simple:

**VS Code** = Tu escritorio donde trabajas
**GitHub** = Tu archivero donde guardas documentos
**Vercel** = La tienda que abre al público (tu app en internet)
**Supabase** = Tu base de datos (como un Excel gigante)
**Resend** = Tu cartero que entrega emails
**Twilio** = Tu mensajero que entrega SMS/WhatsApp

---

## 💰 **COSTOS**

| Servicio | Plan | Costo | Límites |
|----------|------|-------|---------|
| **VS Code** | Gratis | $0 | Ilimitado |
| **GitHub** | Gratis | $0 | Repos públicos ilimitados |
| **Vercel** | Hobby | $0 | 100 GB bandwidth/mes |
| **Supabase** | Free | $0 | 500 MB database, 2 GB bandwidth |
| **Resend** | Free | $0 | 100 emails/día, 3,000/mes |
| **Twilio** | Pay as you go | ~$15 iniciales | $0.01/SMS, $0.005/WhatsApp |

**Total mensual estimado**: $0-10 USD (depende del tráfico)

---

## 🔒 **SEGURIDAD**

### Lo que NUNCA va en el código:
- ❌ Contraseñas de Twilio
- ❌ API Keys de Supabase
- ❌ API Keys de Resend
- ❌ Tokens de acceso

### Dónde van las credenciales:
✅ Vercel → Environment Variables
✅ Archivo `.env.local` (solo en tu computadora, no se sube a GitHub)
✅ `.gitignore` incluye `.env*` para no subirlas accidentalmente

---

## 📊 **MONITOREO**

### Dónde ver qué pasa:

**Vercel Dashboard**:
```
https://vercel.com/dashboard
→ Tu proyecto
→ Deployments (ver historial)
→ Functions → Logs (ver errores de APIs)
```

**Supabase Dashboard**:
```
https://supabase.com/dashboard
→ Table Editor (ver registros)
→ SQL Editor (hacer queries)
```

**Twilio Dashboard**:
```
https://console.twilio.com
→ Monitor → Logs → Messaging
→ Ver todos los SMS/WhatsApp enviados
```

**Resend Dashboard**:
```
https://resend.com/emails
→ Ver todos los emails enviados
→ Status: delivered, bounced, etc.
```

---

## 🆘 **DEBUGGING**

### Si algo no funciona:

1. **Ver logs en Vercel**:
   ```
   Vercel Dashboard → Functions → Logs
   ```

2. **Ver errores en el navegador**:
   ```
   F12 → Console
   ```

3. **Ver qué se guardó en Supabase**:
   ```
   Supabase → Table Editor → registrations
   ```

4. **Ver si se envió el mensaje**:
   ```
   Twilio → Monitor → Logs
   ```

---

## 🎓 **GLOSARIO**

| Término | Significado |
|---------|-------------|
| **Deploy** | Publicar tu código en internet |
| **API** | Función que se ejecuta en el servidor |
| **Environment Variables** | Configuraciones secretas |
| **Serverless** | Código que se ejecuta solo cuando se necesita |
| **Webhook** | Notificación automática entre servicios |
| **Database** | Donde se guardan los datos |
| **Repository** | Carpeta de código en GitHub |
| **Commit** | Guardar cambios localmente |
| **Push** | Enviar cambios a GitHub |

---

## ✅ **CHECKLIST DE CONFIGURACIÓN**

### Para que todo funcione:

- [x] VS Code instalado
- [x] Git configurado
- [x] Repositorio en GitHub creado
- [x] Proyecto conectado a Vercel
- [x] Cuenta de Supabase creada
- [x] Variables de Supabase en Vercel
- [ ] Cuenta de Twilio creada (PENDIENTE)
- [ ] Variables de Twilio en Vercel (PENDIENTE)
- [x] Cuenta de Resend creada
- [x] Variables de Resend en Vercel

---

¿Qué parte quieres que explique con más detalle? 🤔
