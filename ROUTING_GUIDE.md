# 🗺️ SaludCompartida - Guía de Routing

## Arquitectura Next.js App Router

Este proyecto usa **Next.js 16 App Router** con routing basado en archivos.

**Regla Simple**: Las carpetas crean URLs automáticamente. Cada carpeta con un `page.jsx` se convierte en una ruta accesible.

---

## 📄 Páginas Activas en Producción

### 🏠 Homepage Principal

- **Archivo**: `/src/app/page.jsx`
- **URL**: https://saludcompartida.app/
- **Descripción**: Landing principal con diseño mobile-first (2,700 líneas)
- **Secciones**: 
  - Header (64px fixed)
  - Hero con imagen + formulario
  - 4 Pilares (Ayuda Médica, Acompañamiento, Ahorros, Compañía)
  - Bridge emocional ("Hay algo que el dinero no puede comprar")
  - Lupita y Fernanda (companions)
  - Testimoniales (3 historias reales)
  - Pricing ($12/mes = 40¢/día)
  - Final FOMO ("Solo 13 lugares")
  - Footer
- **Form Action**: `name` + `email` + `phone` → `localStorage` → `/registro`
- **Responsive**: 375px (mobile) → 768px (tablet) → 1024px (desktop) → 1280px (large)
- **Creado**: 2026-01-27
- **Status**: ✅ **ACTIVO** - Este es el que ve el usuario al entrar

---

### 🎯 Landing Alternativa (Campañas)

- **Archivo**: `/src/app/landing-nueva/page.jsx`
- **URL**: https://saludcompartida.app/landing-nueva
- **Descripción**: Diseño emocional con foto izquierda, formulario derecha (367 líneas)
- **Layout**: 
  - Foto grande de familia mexicana (izquierda)
  - Contador naranja "847 familias protegidas"
  - Formulario blanco (derecha)
- **Form Action**: `firstName` + `lastName` + `email` + `phone` → `/registro-nuevo`
- **Purpose**: Página alternativa para campañas específicas o pruebas A/B
- **Status**: ✅ **ACTIVO** - Accesible en ruta separada
- **Nota**: Diseño aprobado - No cambiar sin autorización

---

### 📝 Registro

- **Archivo**: `/src/app/registro/page.jsx`
- **URL**: https://saludcompartida.app/registro
- **Descripción**: Formulario de registro (wizard de 3 pasos)
- **Recibe datos**: De `localStorage` (registrationData) desde homepage
- **Flow**: Registro → Pago → Confirmación
- **Status**: ✅ **ACTIVO**

---

### 📊 Dashboard

- **Archivo**: `/src/app/dashboard/page.tsx`
- **URL**: https://saludcompartida.app/dashboard
- **Descripción**: Dashboard del usuario después de signup
- **Requiere**: Autenticación (Supabase)
- **Status**: ✅ **ACTIVO**

---

## 🗂️ Archivos de Backup (NO se cargan)

### Backup Homepage Anterior

- **Archivo**: `/src/app/page-old-backup.jsx`
- **URL**: ❌ Ninguna (no se carga)
- **Descripción**: MobileLandingPage anterior con tema oscuro "La distancia duele" (1,072 líneas)
- **Purpose**: Backup en caso de necesitar revertir
- **Status**: ⚠️ **INACTIVO** - Solo referencia
- **Fecha backup**: 2026-01-27

---

## 🔄 Cómo Funciona el Routing en Next.js

### Estructura de Carpetas → URLs

```
/src/app/
├── page.jsx                → / (homepage)
├── layout.tsx             → Layout global (todas las páginas)
├── landing-nueva/
│   └── page.jsx          → /landing-nueva
├── registro/
│   └── page.jsx          → /registro
├── dashboard/
│   └── page.jsx          → /dashboard
└── api/
    └── endpoint/
        └── route.ts      → /api/endpoint
```

### Archivos Especiales en Next.js App Router

- **`page.jsx`**: Define el contenido de la ruta
- **`layout.tsx`**: Envuelve todas las páginas (header, footer globales)
- **`loading.jsx`**: Estado de carga automático
- **`error.jsx`**: Manejo de errores de la ruta
- **`not-found.jsx`**: Página 404 personalizada

---

## 🎯 Entry Point de Producción

### Flujo de Carga del Homepage

1. **Usuario accede**: https://saludcompartida.app/
2. **Next.js carga**: `/app/page.tsx` (root entry point)
3. **`/app/page.tsx` importa**: `/src/app/page.jsx` (dynamic import con SSR disabled)
4. **Resultado**: Usuario ve el nuevo diseño de 2,700 líneas con 10 secciones

### Código en `/app/page.tsx`

```tsx
const MobileLandingPage = dynamic(() => import('../src/app/page'), {
  ssr: false,
  loading: () => <div style={{ opacity: 0 }}>Cargando...</div>
});

export default function Page() {
  return <MobileLandingPage />;
}
```

---

## ✅ Checklist Rápido

Para identificar qué página se usa:

1. **Homepage (/)** → `/src/app/page.jsx` (2700 líneas, 10 secciones)
2. **Landing Alternativa (/landing-nueva)** → `/src/app/landing-nueva/page.jsx` (367 líneas, foto + form)
3. **Backup** → `/src/app/page-old-backup.jsx` (NO se carga)

---

## 🛠️ Cómo Cambiar Entre Diseños

### Opción 1: Revertir al Diseño Anterior (Backup)

```bash
# Backup del diseño actual
mv src/app/page.jsx src/app/page-current-backup.jsx

# Activar backup anterior
mv src/app/page-old-backup.jsx src/app/page.jsx

# Commit y push
git add -A
git commit -m "⏪ Revert to old homepage design"
git push origin main
```

### Opción 2: Probar Diseño Alternativo

No es necesario cambiar nada - solo envía tráfico a `/landing-nueva` en tus campañas.

---

## 📞 Soporte

- **Pregunta**: "¿Por qué hay dos `page.jsx`?"
- **Respuesta**: Están en carpetas diferentes:
  - `/src/app/page.jsx` → Homepage (/)
  - `/src/app/landing-nueva/page.jsx` → Ruta separada (/landing-nueva)
  
En Next.js App Router, cada carpeta es una ruta. No hay conflicto.

---

**Última actualización**: 27 de enero, 2026
