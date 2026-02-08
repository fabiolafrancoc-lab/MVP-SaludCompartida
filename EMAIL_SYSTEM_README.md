# 📧 Sistema de Emails - SaludCompartida

## 🎯 Descripción
Una sola API KEY de Resend maneja TODOS los emails del prototipo, diferenciados por tipo.

---

## 📊 Tipos de Email Configurados

### 1️⃣ **Contacto México** (`type: 'mexico'`)
- **Asunto**: `[📞 CONTACTO] Nombre Usuario`
- **Color**: Magenta (#E91E63)
- **Usado en**: `/contact` (formulario de contacto México)
- **Estado**: ✅ IMPLEMENTADO
- **Campos**: nombre, apellido, teléfono, email (opcional), categoría, mensaje

**Ejemplo de uso:**
```javascript
fetch('/api/send-email', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '5512345678',
    message: 'Categoría: Telemedicina\n\nQuiero información sobre...',
    type: 'mexico'
  })
});
```

---

### 2️⃣ **Contacto USA/Migrantes** (`type: 'migrant'`)
- **Asunto**: `[🇺🇸 USA] Contacto Migrante - Nombre Usuario`
- **Color**: Cyan (#06B6D4)
- **Usado en**: `/migrantcontact` (formulario para usuarios en USA)
- **Estado**: ✅ IMPLEMENTADO
- **Campos**: nombre, mensaje

**Ejemplo de uso:**
```javascript
fetch('/api/send-email', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Maria Garcia',
    message: 'I need help with...',
    type: 'migrant'
  })
});
```

---

### 3️⃣ **Calificación de Servicio** (`type: 'rating'`)
- **Asunto**: `[⭐ CALIFICACIÓN] Nombre Usuario`
- **Color**: Amber (#F59E0B)
- **Usado en**: `/rating` (sistema de calificaciones)
- **Estado**: ✅ IMPLEMENTADO
- **Campos**: nombre, calificación (estrellas), motivos, comentario, info de contacto (si rating ≤ 3)

**Ejemplo de uso:**
```javascript
fetch('/api/send-email', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Pedro López',
    message: 'Calificación: ⭐⭐⭐⭐⭐ (5 estrellas)\n\nComentario: Excelente servicio, muy rápido...',
    type: 'rating'
  })
});
```

---

### 4️⃣ **Sugerencia de Tema para Blog** (`type: 'blog-topic'`)
- **Asunto**: `[💡 SUGERENCIA BLOG] Nombre Usuario`
- **Color**: Purple (#8B5CF6)
- **Usado en**: `/blog` (sugerencias de temas)
- **Estado**: 🔜 PENDIENTE (API lista, falta formulario en blog)
- **Campos**: nombre, email (opcional), tema sugerido

---

### 5️⃣ **Agendamiento de Terapia** (`type: 'therapy'`) ⭐ NUEVO
- **Asunto**: `[🧠 CITA TERAPIA] Nombre Usuario`
- **Color**: Green (#10B981)
- **Usado en**: `/therapy` (agendamiento de citas psicológicas)
- **Estado**: ✅ IMPLEMENTADO
- **Campos**: nombre completo, teléfono, fecha, hora, motivos de consulta

**Ejemplo de uso:**
```javascript
fetch('/api/send-email', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Pedro López',
    message: 'Calificación: ⭐⭐⭐⭐⭐ (5 estrellas)\n\nMotivos: Excelente servicio, Rápida atención\n\nComentario: Todo fue perfecto...',
    type: 'rating'
  })
});
```

---

### 5️⃣ **Agendamiento de Terapia** (`type: 'therapy'`) ⭐ NUEVO
**Ejemplo de uso:**
```javascript
fetch('/api/send-email', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Carlos Ramírez',
    phone: '+525512345678',
    message: `
📅 NUEVA CITA DE TERAPIA AGENDADA

Nombre: Carlos Ramírez
Teléfono: +525512345678
Fecha: Lunes, 15 de noviembre de 2025
Hora: 14:00 hrs
Tipo: Individual - Videollamada

Motivos: Manejo de ansiedad y estrés laboral
    `,
    type: 'therapy'
  })
});
```

---

### 6️⃣ **Sugerencia de Tema para Blog** (`type: 'blog-topic'`)
**Ejemplo de uso:**
```javascript
fetch('/api/send-email', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Ana Martínez',
    email: 'ana@example.com',
    message: 'Me gustaría leer sobre: Cómo manejar el estrés laboral...',
    type: 'blog-topic'
  })
});
```

---

## 🎨 Diferenciación Visual en tu Inbox

Cuando recibas los emails en `ffranco@saludcompartida.com`, los verás así:

```
📥 Inbox
├─ [📞 CONTACTO] Juan Pérez               ← Magenta
├─ [🇺🇸 USA] Contacto Migrante - Maria    ← Cyan
├─ [⭐ CALIFICACIÓN] Pedro López          ← Amber
├─ [🧠 CITA TERAPIA] Carlos Ramírez      ← Green 🆕
└─ [💡 SUGERENCIA BLOG] Ana Martínez     ← Purple
```

### Ventajas:
✅ **Iconos en el asunto**: Identificación visual rápida
✅ **Etiquetas claras**: `[CONTACTO]`, `[USA]`, `[CALIFICACIÓN]`, etc.
✅ **Colores en el email**: Cada tipo tiene su color en el header
✅ **Filtros automáticos**: Puedes crear reglas en Gmail/Outlook por asunto

---

## 🔧 Configuración en Gmail (Opcional)

Puedes crear **filtros automáticos** para organizar mejor:

### Para Contactos México:
1. Busca: `subject:[📞 CONTACTO]`
2. Aplicar etiqueta: `📞 Contacto-México`
3. Color: Magenta

### Para Contactos USA:
1. Busca: `subject:[🇺🇸 USA]`
2. Aplicar etiqueta: `🇺🇸 Migrantes`
3. Color: Cyan

### Para Calificaciones:
1. Busca: `subject:[⭐ CALIFICACIÓN]`
2. Aplicar etiqueta: `⭐ Reviews`
3. Color: Amarillo
4. Marcar como importante (opcional)

### Para Sugerencias Blog:
1. Busca: `subject:[💡 SUGERENCIA BLOG]`
2. Aplicar etiqueta: `💡 Blog-Ideas`
3. Color: Morado

---

## 📝 Implementación en Nuevos Formularios

### Ejemplo: Agregar Rating al sistema

```javascript
// En src/rating.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: userName,
      email: userEmail, // opcional
      message: `Calificación: ${'⭐'.repeat(rating)} (${rating} estrellas)\\n\\nComentario: ${comment}`,
      type: 'rating' // ← IMPORTANTE: Define el tipo
    })
  });
  
  if (response.ok) {
    alert('¡Gracias por tu calificación!');
  }
};
```

---

## 🔐 Seguridad y API KEY

### Una sola API KEY para todo:
- ✅ **Más fácil de mantener**: No necesitas múltiples keys
- ✅ **Mismo límite de envíos**: Resend te da 100 emails/día gratis (o el plan que tengas)
- ✅ **Segura**: La API KEY está en variables de entorno de Vercel
- ✅ **Diferenciada**: Cada tipo de email se identifica claramente

### Límites de Resend:
- **Plan gratuito**: 100 emails/día, 3,000/mes
- **Plan Pro**: 50,000 emails/mes ($20/mes)

---

## ⚠️ Importante

### Cuando cambies de dominio:
Actualmente usando: `onboarding@resend.dev` (dominio de prueba)

Cuando tengas verificado `saludcompartida.com` en Resend, cambia en `api/send-email.js`:
```javascript
from: 'SaludCompartida <noreply@saludcompartida.com>',
```

---

## 🧪 Testing

Puedes probar cada tipo enviando requests:

```bash
# Test Contacto México
curl -X POST https://tu-proyecto.vercel.app/api/send-email \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Test User","message":"Test message","type":"mexico"}'

# Test Calificación
curl -X POST https://tu-proyecto.vercel.app/api/send-email \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Test User","message":"⭐⭐⭐⭐⭐ Excelente!","type":"rating"}'
```

---

## 📞 Resumen

**Pregunta**: ¿Cómo vienen diferenciados los emails?

**Respuesta**:
1. ✅ **Por asunto** con iconos y etiquetas
2. ✅ **Por color** del header en el email
3. ✅ **Por contenido** del footer indicando origen
4. ✅ **Por tipo** en el parámetro `type` que envías

**Una sola API KEY lo maneja todo** 🎉

---

Última actualización: Noviembre 10, 2025
