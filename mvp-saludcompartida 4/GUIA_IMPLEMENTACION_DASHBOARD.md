# SaludCompartida — Guía de Implementación Dashboard
## Sección por sección para Next.js (saludcompartida.app)

---

## ARQUITECTURA GENERAL

```
saludcompartida.app/
├── public/
│   └── saludcompartida-dark-no-tagline.png    ← LOGO (obligatorio)
│
├── src/ (o app/)
│   ├── components/
│   │   ├── QuienesSomos.jsx          ← Quiénes Somos (3 tabs)
│   │   ├── Terapia.jsx               ← Terapia + Tips (booking flow)
│   │   ├── MiCuenta.jsx              ← Mi Cuenta (1 titular + 3 miembros)
│   │   ├── Contactanos.jsx           ← Contáctanos (8 categorías)
│   │   └── TerminosPrivacidad.jsx    ← T&C + Privacidad (2 tabs)
│   │
│   └── utils/
│       └── waE164.js                 ← WhatsApp E.164 utility (shared)
```

---

## LOGO — INSTRUCCIÓN GLOBAL

**Archivo:** `saludcompartida-dark-no-tagline.png`
**Ubicación:** `/public/saludcompartida-dark-no-tagline.png`
**Uso en código:**
```jsx
<img src="/saludcompartida-dark-no-tagline.png" alt="SaludCompartida" style={{ height: 40 }} />
```
**Todos los componentes** ya referencian este archivo. Solo necesitas colocarlo en `/public/`.

---

## PROPS GLOBALES

Todos los componentes (excepto Términos/Privacidad) reciben un prop `userType`:

```jsx
userType = 'migrant'  // Dashboard del migrante (código generado por Supabase post-pago Square)
userType = 'mexico'   // Dashboard de México (código generado por Supabase post-pago Square)
```

Esto controla:
- Mensajes emocionales diferenciados (migrant vs mexico)
- Prefijo WhatsApp (+1 para migrant, +52 para mexico)
- Copy del tagline y CTAs

---

## SECCIÓN 1: QUIÉNES SOMOS

**Archivo fuente:** `pantalla_quienes_somos.jsx`
**Componente:** `QuienesSomos`
**Props:** `userType = 'mexico'` (default)

### Contenido
3 tabs:
1. **Nosotros** — Hero emocional, 4 servicios en lenguaje simple, precio, historia de Fabiola (migrante desde 1999)
2. **Nuestra Promesa** — 5 promesas en primera persona
3. **Lo Que Nos Mueve** — 5 valores humanos (no corporativos)

### Integración
```jsx
import QuienesSomos from '@/components/QuienesSomos';

// En el dashboard o router:
<QuienesSomos userType={currentUserType} />
```

### Notas
- Copy completamente diferenciado migrant vs mexico
- Historia de Fabiola: "Migrante desde 1999" + narrativa de culpa
- Tagline: "SaludCompartida, donde está tu corazón"
- NO contiene datos de inversionista ni métricas (todo user-facing)

---

## SECCIÓN 2: TERAPIA

**Archivo fuente:** `pantalla_terapia.jsx`
**Componente:** `Terapia`
**Props:** `userType = 'mexico'` (default)

### Contenido
3 views en secuencia:
1. **Tips de Salud Mental** — 3 categorías (Ansiedad, Autoestima, Relaciones), 72 tips totales en subpáginas
2. **Agenda tu Sesión** — Formulario paso a paso (nombre → fecha → hora → confirmar)
3. **Confirmación** — Resumen con botones de calendario y WhatsApp

### Integración
```jsx
import Terapia from '@/components/Terapia';

<Terapia userType={currentUserType} />
```

### Notas
- Tips son navegables (3 cards → subpágina con todos los tips de esa categoría)
- WhatsApp link dinámico según userType (+1 vs +52)
- Frases de neurociencia integradas para normalizar terapia
- Los horarios disponibles están hardcodeados — conectar con backend real

---

## SECCIÓN 3: MI CUENTA

**Archivo fuente:** `pantalla_mi_cuenta.jsx`
**Componente:** `MiCuenta`
**Props:** `userType = 'mexico'` (default)

### Contenido
- Datos del titular (nombre, teléfono, email, foto/avatar)
- 3 miembros adicionales (expandibles, editables)
- Cambio de contraseña
- Cerrar sesión

### Integración
```jsx
import MiCuenta from '@/components/MiCuenta';

<MiCuenta userType={currentUserType} />
```

### Notas
- Los datos vienen precargados del registro (conectar con Supabase)
- El "avatar" es un placeholder — conectar con upload real
- WhatsApp para soporte usa prefijo dinámico por userType
- El titular define quiénes son los 3 miembros adicionales

---

## SECCIÓN 4: CONTÁCTANOS

**Archivo fuente:** `pantalla_contactanos.jsx`
**Componente:** `Contactanos`
**Props:** `userType = 'mexico'` (default)

### Contenido
2 vistas:
1. **Formulario** — 8 categorías de asunto, nombre, email, teléfono, mensaje, botón WhatsApp directo
2. **Confirmación** — Mensaje de agradecimiento con tiempo de respuesta

### Las 8 categorías:
1. Tengo un problema con mi servicio
2. Necesito ayuda con mi cuenta
3. Quiero cambiar mis datos
4. Tengo una duda sobre los descuentos
5. Quiero dar de baja mi servicio
6. Quiero agregar o quitar un familiar
7. Tengo una sugerencia
8. Otro tema

### Integración
```jsx
import Contactanos from '@/components/Contactanos';

<Contactanos userType={currentUserType} />
```

### Notas
- Email de destino: contact@saludcompartida.com
- WhatsApp directo: +1 305 522 7150 (migrant) / +52 número (mexico)
- El formulario captura categoría + datos — conectar con Resend o backend
- Teléfono y email se muestran como texto plano (no clickable links)

---

## SECCIÓN 5: TÉRMINOS Y CONDICIONES + POLÍTICA DE PRIVACIDAD

**Archivo fuente:** `pantalla_terminos_privacidad.jsx`
**Componente:** `TerminosPrivacidad`
**Props:** `initialTab = 0` (0 = Términos, 1 = Privacidad)

### Contenido

**Tab 1 — Términos y Condiciones (14 secciones):**
1. ¿Qué es SaludCompartida? → Plataforma electrónica, NO seguro, NO responsable por empresas prestadoras
2. Lupita y Fernanda — tu compañía → Tecnología propiedad de SC, no son doctores
3. ¿Qué incluye? → 5 servicios (doctor, farmacia, psicología, Lupita, 4 personas)
4. ¿Qué NO incluye? → Emergencias, hospitalización, controlados
5. ¿Cuánto cuesta? → $12-18/mes, 4 personas, cancelación libre
6. Consultas médicas → Doctores titulados MX, receta electrónica, no reemplaza presencial
7. Descuentos farmacias → Tarjeta digital, farmacias afiliadas
8. Psicología → 1 sesión/semana, 50 min, sin receta medicamentos
9. ¿Quién puede usar? → Migrante + hasta 3 familiares
10. Tus responsabilidades → Info verdadera, no compartir código
11. Testimoniales → Ubicación para historias de éxito, nombre nunca se muestra
12. Cambios → Aviso por app/WhatsApp
13. Limitaciones → No garantiza disponibilidad, telemedicina tiene limitaciones
14. ¿Tienes dudas? → contact@saludcompartida.com

**Tab 2 — Aviso de Privacidad (13 secciones) — Cumple LFPDPPP:**
1. Responsable del tratamiento → SC SAPI de CV, conforme LFPDPPP
2. Datos que recabamos → Identificación + salud (sensibles) + uso (estadísticos)
3. Finalidades → Primarias (servicio) + secundarias (mejora)
4. Tu info solo se usa para lo que te dijimos → No vende, perfiles solo agregados
5. Confidencialidad médica y psicológica → Protegida por ley mexicana
6. ¿Con quién compartimos? → Solo doctores, farmacias, tech (con confidencialidad), autoridades
7. Seguridad → Encriptación nivel bancario, servidores US/MX
8. Derechos ARCO → Acceso, Rectificación, Cancelación, Oposición (20 días, gratuito)
9. Consentimiento → Expreso para datos sensibles, revocable
10. Menores de edad → Adulto autoriza
11. Cookies → Solo funcionalidad, no publicidad
12. Cambios → Notificación por app/email/WhatsApp
13. ¿Tienes dudas? → contact@saludcompartida.com

### Integración
```jsx
import TerminosPrivacidad from '@/components/TerminosPrivacidad';

// Desde un link "Términos y Condiciones":
<TerminosPrivacidad initialTab={0} />

// Desde un link "Política de Privacidad":
<TerminosPrivacidad initialTab={1} />
```

### Notas
- Banner verde de cumplimiento legal al inicio de Privacidad
- Footer legal cita LFPDPPP DOF 20 marzo 2025
- Sin número telefónico — solo email contact@saludcompartida.com
- Lenguaje accesible pero con terminología legal precisa

---

## SECCIÓN 6: UTILIDAD COMPARTIDA — WhatsApp E.164

**Archivo fuente:** `wa_e164_spec.js`
**Export:** `WA_CONFIG`, `formatE164`, `formatDisplay`, `isValidWa`, `parseE164`

### Qué hace
Maneja la validación y formateo de números WhatsApp según el país del usuario:
- **Migrant (US):** +1, 10 dígitos, formato (305) 522-7150
- **Mexico:** +52, 10 dígitos, formato 55 1234 5678

### Integración
```jsx
import { WA_CONFIG, formatE164, formatDisplay, isValidWa } from '@/utils/waE164';

// En cualquier componente que necesite WhatsApp:
const cfg = WA_CONFIG[userType]; // { cc: '1', len: 10, ... }
const e164 = formatE164(phoneDigits, userType); // '+13055227150'
const display = formatDisplay(phoneDigits, userType); // '(305) 522-7150'
const valid = isValidWa(phoneDigits, userType); // true/false
```

### Notas
- Todos los componentes (Terapia, MiCuenta, Contactanos) ya usan esta lógica inline
- Para producción, extraer a este archivo compartido y hacer import

---

## DESIGN SYSTEM — REFERENCIA RÁPIDA

### Colores
| Variable | Hex | Uso |
|----------|-----|-----|
| Background | `#111827` | Fondo principal (todas las pantallas) |
| Cyan | `#06B6D4` | Acciones primarias, links, CTA |
| Magenta | `#EC4899` | Acentos, highlights emocionales |
| Amber | `#F59E0B` | Warnings, "importante", sección NO incluye |
| Purple | `#8B5CF6` | Privacidad, datos, ARCO |
| Green | `#10B981` | Status activo, checks, cumplimiento legal |

### Tipografía
| Fuente | Uso |
|--------|-----|
| `Plus Jakarta Sans` | Body text, UI, botones |
| `DM Serif Display` | Headlines, títulos de sección |

### Cargar fuentes (añadir en `<head>` o layout):
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap" rel="stylesheet">
```

### Ancho máximo
```
maxWidth: 430px (mobile-first, 375px target)
```

### Patrones de UI
- **Cards:** `background: rgba(255,255,255,0.04)`, `border: 1px solid rgba(255,255,255,0.06)`, `borderRadius: 16px`
- **Tabs activos:** Gradiente `linear-gradient(135deg, rgba(6,182,212,0.15), rgba(236,72,153,0.1))`
- **Iconos:** SVG inline (no emojis, nunca)
- **Status indicator:** Punto verde pulsante + "Activo"

---

## ORDEN DE IMPLEMENTACIÓN RECOMENDADO

| Paso | Componente | Prioridad | Dependencia |
|------|-----------|-----------|-------------|
| 1 | Logo en `/public/` | PRIMERO | Todos lo necesitan |
| 2 | Fuentes Google en layout | PRIMERO | Todos lo necesitan |
| 3 | `TerminosPrivacidad.jsx` | ALTA | Legal — debe estar antes de launch |
| 4 | `Contactanos.jsx` | ALTA | Soporte — crítico para usuarios |
| 5 | `MiCuenta.jsx` | ALTA | Gestión de cuenta — conectar con Supabase |
| 6 | `Terapia.jsx` | MEDIA | Booking flow — conectar con proveedor |
| 7 | `QuienesSomos.jsx` | MEDIA | Informativo — funciona standalone |
| 8 | `waE164.js` | BAJA | Refactor — los componentes ya tienen la lógica inline |

---

## CHECKLIST PRE-LAUNCH

- [ ] Logo `saludcompartida-dark-no-tagline.png` en `/public/`
- [ ] Fuentes Plus Jakarta Sans + DM Serif Display cargadas
- [ ] Todos los componentes reciben `userType` correcto del auth/session
- [ ] Email contact@saludcompartida.com funcionando (Resend)
- [ ] WhatsApp links verificados (+1 y +52)
- [ ] Términos y Privacidad accesibles desde dashboard y footer
- [ ] Datos de MiCuenta conectados a Supabase
- [ ] Formulario Contáctanos enviando a backend/Resend
- [ ] Terapia booking conectado a proveedor real
- [ ] Testeado en móvil 375px ancho
- [ ] Códigos de acceso generándose correctamente en Supabase tras pago exitoso en Square
