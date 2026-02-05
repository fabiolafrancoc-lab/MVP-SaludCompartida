# Dashboard Platinum UX — Guía de Integración

## Qué cambió

El dashboard anterior tenía **dos navegaciones apiladas** (tabs horizontales + header repetido). 
El nuevo diseño tiene:

- **1 solo header** arriba (logo + nombre + status)
- **Bottom tab bar** estilo app nativa (Inicio, Médico, Farmacia, Terapia, Más)
- **Drawer "Más"** para opciones secundarias
- **Todo bajo una sola ruta** `/dashboard` (no rutas separadas)

## Archivos nuevos (3)

```
components/DashboardShell.jsx   ← Shell con header + bottom tabs + drawer
components/Inicio.jsx           ← Pantalla principal del dashboard
app/dashboard/page.jsx          ← Página unificada (reemplaza las individuales)
```

## Pasos para subir

### Paso 1: Copiar archivos

En tu terminal, desde la raíz del repo `MVP-SaludCompartida`:

```bash
# Copiar los 2 componentes nuevos a /components
cp DashboardShell.jsx components/
cp Inicio.jsx components/

# Reemplazar el page.jsx del dashboard
cp page.jsx app/dashboard/page.jsx
```

O si descargaste el ZIP, extraer en la raíz del repo — las carpetas se fusionan.

### Paso 2: Borrar las rutas viejas (OPCIONAL por ahora)

Las carpetas individuales ya no se necesitan porque todo vive en `/dashboard`:

```
app/dashboard/telemedicina/page.jsx   ← ya no necesario
app/dashboard/farmacia/page.jsx       ← ya no necesario
app/dashboard/ahorros/page.jsx        ← ya no necesario
... etc
```

Puedes borrarlas o dejarlas — no afectan nada.

### Paso 3: Activar componentes existentes

En `app/dashboard/page.jsx`, descomenta cada import y su case conforme los vayas probando:

```jsx
// Línea 33 — quitar el // del inicio:
import Telemedicina from '../../components/Telemedicina';

// Línea 85 — quitar el // del inicio:
case 'telemedicina':
  return <Telemedicina {...commonProps} />;
```

Repite para cada componente. Si alguno da error, déjalo comentado — el placeholder aparecerá.

### Paso 4: Subir a GitHub → Vercel

```bash
cd MVP-SaludCompartida
git add .
git commit -m "Dashboard Platinum UX: bottom tabs + unified shell"
git push
```

Vercel detecta el push y despliega automáticamente.

### Paso 5: Verificar

Ve a `saludcompartida.app/dashboard` y confirma:
- 1 solo header arriba
- Bottom tabs funcionales
- Drawer "Más" se abre al tocar el último tab
- Navegación fluida entre secciones

## Notas importantes

- Los 11 componentes existentes (Telemedicina, Farmacia, etc.) **no necesitan cambios** — solo se importan dentro del nuevo shell
- El layout.jsx del dashboard puede simplificarse — ya no necesita agregar navegación porque el shell la maneja
- Los datos de usuario (userName, migrantName, userType) están hardcodeados como demo — conectar a Supabase session cuando esté listo
- Mobile-first a 430px max-width, optimizado para 375px
