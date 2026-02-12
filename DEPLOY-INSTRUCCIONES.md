# 🚀 INSTRUCCIONES DE DEPLOY — SaludCompartida Dashboard

## Lo que contiene el ZIP

```
public/
├── dashboard/               ← 9 páginas HTML
│   ├── login.html           ← Página 5: Login con código
│   ├── dashboard-completo.html  ← Página 6: Dashboard principal
│   ├── mi-cuenta.html       ← Mi Cuenta (titular + 3 miembros)
│   ├── ahorros.html         ← Ahorros proyectados
│   ├── pilares.html         ← Nuestros Pilares
│   ├── porque.html          ← Por qué SaludCompartida
│   ├── contacto.html        ← Contáctanos
│   ├── privacidad.html      ← Política de Privacidad (NLFPDPPP 2025)
│   └── terminos.html        ← Términos y Condiciones
│
└── dashboard-imgs/          ← 19 fotos
    ├── logo-saludcompartida.jpg
    ├── abuela-cocinando.jpeg
    ├── nina-mariposa.jpeg
    └── ... (16 más)
```

## Paso 1: Descomprimir el ZIP

```bash
cd ~/Desktop
unzip saludcompartida-dashboard-deploy.zip
```

## Paso 2: Copiar a tu proyecto Next.js

```bash
cd ~/Desktop/MVP-SaludCompartida

# Copiar las carpetas al directorio public de Next.js
cp -r ~/Desktop/public/dashboard public/
cp -r ~/Desktop/public/dashboard-imgs public/
```

## Paso 3: Verificar

```bash
ls public/dashboard/
# Debe mostrar: login.html, dashboard-completo.html, mi-cuenta.html, etc.

ls public/dashboard-imgs/
# Debe mostrar: 19 archivos .jpeg/.jpg
```

## Paso 4: Probar localmente

```bash
npm run dev
```

Abre en el navegador:
- `http://localhost:3000/dashboard/login.html` → Login con código
- Escribe **GLARRM** → aparecen datos → acepta T&C → click Ingresar → Dashboard

## Paso 5: Deploy a Vercel

```bash
git add .
git commit -m "feat: Dashboard completo - login + 8 páginas del usuario México"
git push
```

Vercel hace deploy automático. Las páginas estarán en:
- `saludcompartida.app/dashboard/login.html`
- `saludcompartida.app/dashboard/dashboard-completo.html`
- etc.

## URLs finales

| Página | URL |
|---|---|
| Login | saludcompartida.app/dashboard/login.html |
| Dashboard | saludcompartida.app/dashboard/dashboard-completo.html |
| Mi Cuenta | saludcompartida.app/dashboard/mi-cuenta.html |
| Ahorros | saludcompartida.app/dashboard/ahorros.html |
| Pilares | saludcompartida.app/dashboard/pilares.html |
| Por qué SC | saludcompartida.app/dashboard/porque.html |
| Contáctanos | saludcompartida.app/dashboard/contacto.html |
| Privacidad | saludcompartida.app/dashboard/privacidad.html |
| Términos | saludcompartida.app/dashboard/terminos.html |

## Conexión con el flujo existente (páginas 1-4)

En la **Página 4 (Confirmación)** del migrante, el botón 
"Ya Tengo Mi Código / Login" debe apuntar a:

```
/dashboard/login.html
```

## ⚠️ IMPORTANTE

- Los archivos HTML van en `public/` — Next.js los sirve como archivos estáticos
- NO interfiere con las rutas de React/Next.js existentes
- Las imágenes se cargan desde `/dashboard-imgs/` (ruta absoluta)
- Todos los links entre páginas ya usan `/dashboard/` como prefijo
- Los códigos de prueba son: GLARRM (usuario México) y XC5R2K (migrante)

## Fase 2 (después del lanzamiento)

- Conectar login.html con API de Supabase (validar código real)
- Hacer dinámicos los nombres (María, Carlos) desde Supabase
- Convertir HTMLs a componentes React/Next.js
- Implementar sesión real (cookies/JWT)
