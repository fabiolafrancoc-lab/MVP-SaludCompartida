# 🎨 GUÍA DE INTEGRACIÓN PARA CLAUDE

**Proyecto:** SaludCompartida MVP v3.0  
**Fecha:** 28 enero 2026  
**Objetivo:** Diseño emocional/testimonial de páginas principales

---

## 📋 RESPONSABILIDADES

### ✅ CLAUDE diseña (UI/UX):
- Landing (Page 1)
- Registro (Page 2)
- Pago/Confirmación Square (Page 3)
- Dashboard (Page 4)
- Pharmacy
- Therapy
- Mis Ahorros
- Mi Cuenta
- Mis Companions (Lupita + Fernanda)
- Blog

### ✅ COPILOT maneja (Backend/Legal):
- Privacy Policy
- Terms & Conditions
- Footer + navegación
- Integración Supabase
- Integración Square
- WhatsApp Business API
- Email (Resend)
- AI Companions backend

---

## 🔧 NOMBRES DE CAMPOS OBLIGATORIOS

### LANDING (Page 1) - `/`

**Formulario mínimo:**

```tsx
interface LandingForm {
  firstName: string;      // ⚠️ NO "name" - debe ser "firstName"
  lastName: string;       // ⚠️ NO "surname" - debe ser "lastName"
  email: string;          // ⚠️ lowercase, trimmed
  phone: string;          // ⚠️ solo números (sin guiones ni paréntesis)
  countryCode?: string;   // Default: '+1'
}
```

**Acción del botón:**

```tsx
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  
  // 1. Guardar lead en backend
  const response = await fetch('/api/pre-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  
  if (!response.ok) {
    // Manejar error
    return;
  }
  
  // 2. Guardar en localStorage para Page 2
  localStorage.setItem('leadData', JSON.stringify(formData));
  
  // 3. Navegar a registro completo
  router.push('/registro');
};
```

---

### REGISTRO (Page 2) - `/registro`

**Pre-llenar datos de Page 1:**

```tsx
useEffect(() => {
  // Recuperar datos de landing
  const leadData = localStorage.getItem('leadData');
  if (leadData) {
    const { firstName, lastName, email, phone } = JSON.parse(leadData);
    
    // Pre-llenar campos de migrante
    setMigrantFirstName(firstName);
    setMigrantLastName(lastName);
    setMigrantEmail(email);
    setMigrantPhone(phone);
  }
}, []);
```

**Formulario completo:**

```tsx
interface RegistroForm {
  // MIGRANTE (USA) - Pre-llenados de Page 1
  migrantFirstName: string;    // ⚠️ Nombres exactos
  migrantLastName: string;
  migrantEmail: string;
  migrantPhone: string;
  migrantState: string;        // Dropdown: CA, TX, NY, FL, etc.
  
  // FAMILIA (MÉXICO)
  familyFirstName: string;
  familyLastName: string;
  familyPhone: string;         // 10 dígitos
  familyRelationship: string;  // madre, padre, hermana, hijo, etc.
  
  // PLAN
  planId: 'basico' | 'premium';
  planName: string;            // "Plan Básico" o "Plan Premium"
  planPrice: number;           // 12.00 o 18.00
}
```

**Acción del botón:**

```tsx
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  
  // 1. Guardar en localStorage
  localStorage.setItem('registroData', JSON.stringify(formData));
  
  // 2. Navegar a pago
  router.push('/pago');
};
```

---

### PAGO (Page 3) - `/pago`

**Recuperar todos los datos:**

```tsx
useEffect(() => {
  const leadData = JSON.parse(localStorage.getItem('leadData') || '{}');
  const registroData = JSON.parse(localStorage.getItem('registroData') || '{}');
  
  // Combinar datos para mostrar resumen
  setFullData({ ...leadData, ...registroData });
}, []);
```

**Integración con Square:**

```tsx
// COPILOT maneja la integración completa con Square
// Claude solo diseña el UI del formulario de pago
```

**Acción después de pago exitoso:**

```tsx
// Navegar a confirmación
router.push('/confirmacion');
```

---

## 🎨 GUÍAS DE DISEÑO

### Colores principales:

```css
--cyan: #06B6D4;          /* Telemedicina, acciones primarias */
--magenta: #EC4899;       /* Terapia, emocional */
--orange: #F97316;        /* Urgencia, contadores */
--green: #10B981;         /* Farmacias, ahorros */
--purple: #A855F7;        /* AI Companions */
```

### Tipografía:

```css
font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
```

### Estilo general:

- ✅ Background CLARO (white/gray-50)
- ✅ Testimoniales reales con fotos
- ✅ Contadores de familias protegidas (naranja)
- ✅ Emotivo, humano, cercano
- ❌ NO background oscuro (era sistema viejo)
- ❌ NO muy corporativo/frío

---

## 📱 RESPONSIVE

Todas las páginas deben ser:
- Mobile-first
- Desktop optimizado
- Tablet compatible

---

## 🔗 NAVEGACIÓN

### Header (Copilot maneja):
```
- Logo
- Inicio
- Cómo Funciona
- Quiénes Somos
- Blog
- Login
```

### Footer (Copilot maneja):
```
- Privacy Policy
- Terms & Conditions
- Contacto
- Redes sociales
- Copyright
```

---

## 📦 ESTRUCTURA DE ARCHIVOS

Claude debe entregar archivos con esta estructura:

```
src/
├── app/
│   ├── page.tsx                    ← Landing (Page 1)
│   ├── registro/
│   │   └── page.tsx                ← Registro (Page 2)
│   ├── pago/
│   │   └── page.tsx                ← Pago (Page 3)
│   ├── confirmacion/
│   │   └── page.tsx                ← Confirmación (Page 4)
│   ├── dashboard/
│   │   └── page.tsx                ← Dashboard principal
│   ├── farmacia/
│   │   └── page.tsx                ← Pharmacy
│   ├── terapia/
│   │   └── page.tsx                ← Therapy
│   ├── mis-ahorros/
│   │   └── page.tsx                ← Savings
│   ├── mi-cuenta/
│   │   └── page.tsx                ← Account
│   ├── lupita/
│   │   └── page.tsx                ← AI Companion Lupita
│   ├── fernanda/
│   │   └── page.tsx                ← AI Companion Fernanda
│   └── blog/
│       └── page.tsx                ← Blog
└── components/
    └── (componentes compartidos)
```

---

## ⚠️ REGLAS CRÍTICAS

### 1. Nombres de campos
❌ NO uses: `name`, `surname`, `firstName`, `familyName`  
✅ USA: `firstName`, `lastName`, `email`, `phone`

### 2. Navegación entre páginas
✅ USA: `router.push('/registro')`  
❌ NO uses: `window.location.href`, `<a href>`

### 3. Guardado de datos
✅ USA: `localStorage.setItem()` + API call  
❌ NO uses: Solo localStorage o solo API

### 4. Validaciones
✅ Validación en frontend + backend  
❌ Solo validación frontend

### 5. Loading states
✅ Siempre mostrar loading durante API calls  
❌ Botones sin feedback

---

## 🚀 PROCESO DE ENTREGA

1. Claude diseña página por página
2. Envía archivo .tsx con comentarios
3. Copilot integra con backend
4. Testing conjunto
5. Deploy

---

## 📞 CONTACTO

Si tienes dudas sobre:
- **Campos de formulario** → Preguntar a Copilot
- **Integración backend** → Copilot maneja
- **Diseño/UX** → Claude decide

---

**¿Listo para empezar? Empieza con Landing (Page 1) cuando quieras.**
