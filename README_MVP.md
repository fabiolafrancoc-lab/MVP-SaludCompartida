# 🏥 SaludCompartida MVP

**Transforma tus remesas en acceso a salud de calidad para tu familia en México**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)

---

## 📋 Descripción del Proyecto

SaludCompartida es una plataforma que permite a migrantes en USA contratar servicios de salud para sus familiares en México por solo **$12-18 USD/mes**.

### ✨ Servicios Incluidos:
- 🩺 **Telemedicina 24/7** ilimitada
- 💊 **Descuentos en farmacias** (hasta 80%)
- 🧠 **Terapia psicológica** (plan Premium)
- 👨‍⚕️ **Red de especialistas**
- 📋 **Exámenes de laboratorio**
- 📱 **Chat médico por WhatsApp**

---

## 🚀 Stack Tecnológico

### Frontend:
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** con diseño personalizado
- **Lucide React** para iconos

### Backend:
- **Supabase** (PostgreSQL + Auth + RLS)
- **Square Payments** para suscripciones
- **Resend** para emails transaccionales
- **WATI** para WhatsApp Business API

### Dependencias:
```json
{
  "@supabase/supabase-js": "^2.39.0",
  "square": "^35.1.0",
  "resend": "^3.2.0",
  "lucide-react": "^0.312.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.0",
  "zod": "^3.22.4",
  "nanoid": "^5.0.4"
}
```

---

## 📁 Estructura del Proyecto

```
MVP-SaludCompartida/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Layout principal
│   │   ├── globals.css                   # Estilos Tailwind
│   │   ├── page.tsx                      # Landing page
│   │   ├── registro/
│   │   │   ├── datos-migrante/page.tsx   # Paso 2: Datos USA
│   │   │   ├── datos-familia/page.tsx    # Paso 3: Familia México
│   │   │   └── plan/page.tsx             # Paso 4: Selección plan
│   │   ├── dashboard/
│   │   │   └── page.tsx                  # Dashboard principal
│   │   └── api/
│   │       ├── registro/route.ts         # API registro
│   │       ├── webhooks/square/route.ts  # Webhook pagos
│   │       └── notificaciones/route.ts   # Email + WhatsApp
│   ├── components/
│   │   ├── Header.tsx                    # Header reutilizable
│   │   ├── Footer.tsx                    # Footer
│   │   └── ServiceCard.tsx               # Card de servicios
│   └── lib/
│       ├── supabase.ts                   # Cliente Supabase
│       ├── square.ts                     # Integración Square
│       ├── utils.ts                      # Utilidades
│       └── validations.ts                # Schemas Zod
├── schema.sql                            # Schema PostgreSQL
├── .env.example                          # Variables de entorno
└── README.md                             # Este archivo
```

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/fabiolafrancoc-lab/MVP-SaludCompartida.git
cd MVP-SaludCompartida
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://rzmdekjegbdgitqekjee.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key

# Square
SQUARE_ACCESS_TOKEN=tu-token
SQUARE_ENVIRONMENT=sandbox
SQUARE_LOCATION_ID=tu-location-id

# Resend
RESEND_API_KEY=tu-resend-key

# WATI
WATI_API_URL=https://live-server-1079185.wati.io
WATI_API_TOKEN=tu-wati-token
WATI_WHATSAPP_NUMBER=+15558420346

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Configurar Base de Datos

Ve a [Supabase Dashboard](https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee) → SQL Editor:

```sql
-- Copia y pega el contenido completo de schema.sql
-- Esto creará 4 tablas + índices + RLS policies
```

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Base de Datos

### Tablas:

#### `registrations`
- Registro principal del suscriptor (USA)
- Información de pago de Square
- Estado de suscripción

#### `family_members`
- Miembros de familia en México (1-4 personas)
- Relación con registration via FK

#### `service_usage`
- Registro de uso de servicios
- Cálculo de ahorros

#### `savings_records`
- Ahorros mensuales agregados
- Reportes automáticos

---

## 🔄 Flujo de Usuario

1. **Landing Page** (`/`)
   - Usuario ingresa nombre + email
   - Ve servicios y trust badges

2. **Datos Migrante** (`/registro/datos-migrante`)
   - Nombre completo
   - Email, teléfono USA (+1)
   - Estado de residencia

3. **Datos Familia** (`/registro/datos-familia`)
   - Usuario principal en México (+52)
   - Hasta 3 familiares adicionales
   - Parentesco de cada uno

4. **Selección de Plan** (`/registro/plan`)
   - Basic ($12/mes) o Premium ($18/mes)
   - Resumen de pedido
   - Pago con Square

5. **Webhook Square**
   - Confirma pago exitoso
   - Activa suscripción
   - Dispara notificaciones

6. **Notificaciones**
   - Email HTML al suscriptor (USA)
   - WhatsApp al suscriptor
   - WhatsApp al usuario principal (México)

7. **Dashboard** (`/dashboard`)
   - Welcome modal con código familiar
   - 8 servicios disponibles
   - Stats de uso y ahorros

---

## 🎨 Diseño

### Colores de Marca:

```css
--sc-cyan: #06B6D4     /* Primary */
--sc-magenta: #EC4899  /* Accent */
--sc-gray: #1F2937     /* Text */
--sc-green: #22c55e    /* Success */
--sc-orange: #f97316   /* Badges */
```

### Componentes Personalizados:

- `.input-sc` - Input con focus cyan
- `.btn-primary` - Botón principal
- `.btn-secondary` - Botón secundario
- `.btn-outline` - Botón con borde
- `.card-sc` - Card blanco con sombra
- `.counter-badge` - Badge naranja animado
- `.service-icon-{color}` - Iconos de servicios

---

## 🔗 Integraciones

### Square Payments:
- Webhook: `/api/webhooks/square`
- Eventos: `payment.completed`
- Test mode: Sandbox

### Resend Email:
- From: `noreply@saludcompartida.app`
- Templates: HTML con gradientes cyan

### WATI WhatsApp:
- Numbers: Demo (+14798024855), Paid (+15558420346)
- API: Session messages (no templates needed)

---

## 📊 Estado de Implementación

### ✅ Completado (17 archivos):

- ✅ Layout + global styles
- ✅ Landing page
- ✅ 3 páginas de registro (migrante, familia, plan)
- ✅ Dashboard con modal de bienvenida
- ✅ API de registro (POST/GET)
- ✅ Webhook de Square
- ✅ Sistema de notificaciones
- ✅ Cliente Supabase con tipos
- ✅ Utilidades (formateo, cn)
- ✅ Componentes (Header, Footer, ServiceCard)
- ✅ Librerías (square.ts, validations.ts)
- ✅ Schema SQL completo
- ✅ Documentación

### ⏳ Pendiente:

- ⏳ Integrar Square checkout real
- ⏳ Páginas de servicios individuales
- ⏳ Perfil de usuario
- ⏳ Admin dashboard
- ⏳ Tests unitarios
- ⏳ Tests E2E

---

## 🚢 Deployment

### Vercel (Recomendado):

```bash
# Push a GitHub (ya configurado)
git push origin main

# Vercel detecta automáticamente Next.js
# Configura las environment variables en:
# https://vercel.com/dashboard/settings/environment-variables
```

### Variables de Entorno en Vercel:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega todas las variables de `.env.example`
4. Redeploy

---

## 📞 Contacto

- **Teléfono USA:** +1 (305) 522-7150
- **Email:** soporte@saludcompartida.com
- **GitHub:** [fabiolafrancoc-lab/MVP-SaludCompartida](https://github.com/fabiolafrancoc-lab/MVP-SaludCompartida)

---

## 📝 Licencia

Este proyecto es propiedad privada de SaludCompartida.

---

## 🎯 Próximos Pasos

1. **Configurar credenciales** en `.env.local`
2. **Ejecutar schema.sql** en Supabase
3. **Probar flujo completo** en localhost
4. **Configurar Square webhook** en producción
5. **Deploy a Vercel**

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@/lib/utils'"
- Verifica que `tsconfig.json` tenga `"@/*": ["./src/*"]`
- Reinicia el servidor: `npm run dev`

### Error: Square API
- Verifica que `SQUARE_ACCESS_TOKEN` sea correcto
- Usa `sandbox` environment para desarrollo

### Error: Supabase
- Verifica que el schema esté ejecutado
- Comprueba que `SERVICE_ROLE_KEY` esté configurado

### Error: WhatsApp no envía
- Verifica que `WATI_API_TOKEN` sea válido
- Comprueba el formato del teléfono (+52 para México)

---

**🎉 ¡Listo para transformar remesas en salud!**
