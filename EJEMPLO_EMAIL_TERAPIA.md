# 📧 EJEMPLO: EMAIL DE CONFIRMACIÓN DE CITA PSICOLÓGICA

## 📬 DATOS DEL EMAIL

**De:** noreply@saludcompartida.app  
**Para:** 
- stephania.cardenas@auramultiasistencias.com
- administracion@auramultiasistencias.com

**Asunto:** 🧠 Nueva Sesión de Terapia Agendada - SC-ABC123

---

## 📋 VISUALIZACIÓN DEL EMAIL

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│              🧠 Nueva Sesión de Terapia                       │
│                 ⏰ Acción Requerida                           │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ⚡ NOTIFICACIÓN INMEDIATA                                   │
│  Un usuario ha agendado una sesión de terapia psicológica.  │
└─────────────────────────────────────────────────────────────┘

📋 Detalles de la Sesión
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│ Campo                      │ Valor                           │
├────────────────────────────┼─────────────────────────────────┤
│ 👤 Nombre del Paciente     │ María González López            │
│                            │ (destacado en rosa)             │
├────────────────────────────┼─────────────────────────────────┤
│ 📱 Teléfono Móvil          │ +52 55 1234 5678                │
│                            │ (destacado en negro)            │
├────────────────────────────┼─────────────────────────────────┤
│ 📧 Email                   │ maria.gonzalez@email.com        │
│                            │ (destacado en negro)            │
├────────────────────────────┼─────────────────────────────────┤
│ 📅 Fecha                   │ lunes, 30 de enero de 2026      │
│                            │ (destacado en verde)            │
├────────────────────────────┼─────────────────────────────────┤
│ ⏰ Hora                     │ 3:00 PM                         │
│                            │ (destacado en verde)            │
├────────────────────────────┼─────────────────────────────────┤
│ 🔑 Código Familia          │ SC-ABC123                       │
├────────────────────────────┼─────────────────────────────────┤
│ 🧠 Tipo de Terapia         │ Terapia Individual              │
└────────────────────────────┴─────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 📞 Acción Requerida:                                         │
│                                                               │
│ 1. Confirmar disponibilidad del terapeuta                   │
│ 2. Contactar al paciente:                                    │
│    • 📱 Teléfono: +52 55 1234 5678                           │
│    • 📧 Email: maria.gonzalez@email.com                      │
│ 3. Enviar link de la sesión virtual                          │
│ 4. Confirmar la cita 24 horas antes                          │
└─────────────────────────────────────────────────────────────┘

──────────────────────────────────────────────────────────────
                     SaludCompartida
       Este email es automático. Responda para coordinar.
          © 2026 SaludCompartida. Todos los derechos reservados.
──────────────────────────────────────────────────────────────
```

---

## ✅ DATOS INCLUIDOS (COMO SOLICITASTE)

| Campo | ✅ Incluido | Detalles |
|-------|------------|----------|
| **Nombre del Paciente** | ✅ SÍ | Destacado en rosa con icono 👤 |
| **Teléfono Móvil** | ✅ SÍ | Formato completo: +52 55 1234 5678 |
| **Email** | ✅ SÍ | Obtenido de `registrations.migrant_email` |
| **Fecha Completa** | ✅ SÍ | Formato español: "lunes, 30 de enero de 2026" |
| **Hora** | ✅ SÍ | Formato 12 horas: "3:00 PM" |

---

## 🔧 CÓMO FUNCIONA

### 1. Usuario Agenda la Cita
El usuario llena el formulario con:
- Nombre del paciente
- Teléfono móvil
- Código de familia
- Fecha (YYYY-MM-DD)
- Hora (HH:MM AM/PM)
- Tipo de terapia

### 2. Sistema Valida
```typescript
// Validación automática:
✅ Código de familia existe
✅ Suscripción está activa
✅ Plan incluye terapia (solo Premium)
```

### 3. Sistema Obtiene Email
```typescript
// Query a la base de datos:
const { data: registration } = await supabase
  .from('registrations')
  .select('migrant_email')
  .eq('codigo_familia', codigoFamilia)
  .single();

// Email obtenido: registration.migrant_email
```

### 4. Sistema Formatea la Fecha
```typescript
// JavaScript convierte la fecha a español:
const formattedDate = new Date(sessionDate).toLocaleDateString('es-MX', {
  weekday: 'long',    // "lunes"
  year: 'numeric',    // "2026"
  month: 'long',      // "enero"
  day: 'numeric'      // "30"
});

// Resultado: "lunes, 30 de enero de 2026"
```

### 5. Sistema Envía Email
```typescript
await sendTherapySessionNotification({
  patientName: 'María González López',
  patientPhone: '+52 55 1234 5678',
  patientEmail: 'maria.gonzalez@email.com', // ✅ NUEVO
  codigoFamilia: 'SC-ABC123',
  sessionDate: '2026-01-30',
  sessionTime: '3:00 PM',
  therapyType: 'Terapia Individual'
});
```

---

## 🧪 TESTING

### Comando cURL para Probar:
```bash
curl -X POST http://localhost:3000/api/terapia/agendar \
  -H "Content-Type: application/json" \
  -d '{
    "codigoFamilia": "SC-ABC123",
    "patientName": "María González López",
    "patientPhone": "+52 55 1234 5678",
    "sessionDate": "2026-01-30",
    "sessionTime": "3:00 PM",
    "therapyType": "Terapia Individual"
  }'
```

### Respuesta Esperada:
```json
{
  "success": true,
  "message": "Sesión agendada correctamente. Recibirás confirmación por WhatsApp.",
  "session": {
    "patientName": "María González López",
    "sessionDate": "2026-01-30",
    "sessionTime": "3:00 PM",
    "therapyType": "Terapia Individual"
  }
}
```

### Email Enviado a:
- ✅ stephania.cardenas@auramultiasistencias.com
- ✅ administracion@auramultiasistencias.com

---

## 📝 NOTAS TÉCNICAS

### Formato de Fecha
- **Input:** `"2026-01-30"` (YYYY-MM-DD)
- **Output:** `"lunes, 30 de enero de 2026"` (español completo)

### Formato de Hora
- Se mantiene como viene del frontend
- Recomendado: `"3:00 PM"` o `"15:00"`

### Email del Paciente
- Se obtiene de `registrations.migrant_email`
- Es el email del migrante que pagó la suscripción
- Si necesitas el email del beneficiario, deberías:
  1. Agregar campo `email` a la tabla `family_members`
  2. Actualizar el query para obtenerlo

---

**Fecha de Actualización:** 24 de enero de 2026  
**Estado:** ✅ Completamente implementado y funcional
