# ✅ LANDING NUEVA DE CLAUDE - LISTA PARA TESTEAR

**Fecha:** 28 enero 2026, 23:15  
**Ubicación:** `/src/app/landing-jan/page.jsx`  
**URL:** `http://localhost:3000/landing-jan`

---

## 📦 ARCHIVO INTEGRADO

### Source:
```
/Users/fabiolafranco/Downloads/Page1_Landing.jsx (16KB)
  ↓
/Users/fabiolafranco/Desktop/MVP-SaludCompartida/src/app/landing-jan/page.jsx
```

### Cambios aplicados:
1. ✅ Cambio de `useNavigate` (React Router) → `useRouter` (Next.js)
2. ✅ Integración con API `/api/pre-checkout` para guardar leads
3. ✅ Guardado en localStorage como `leadData` (en vez de `registrationData`)
4. ✅ Navegación a `/registro` después de submit

---

## 🎨 DISEÑO (De Claude)

### Layout:
- **Izquierda:** Foto emocional de familia
- **Derecha:** Formulario de captura
- **Arriba:** Header con logo + navegación
- **Centro:** Contador naranja "847 familias protegidas"

### Campos del formulario:
```jsx
{
  firstName: '',      // ✅ Nombre
  lastName: '',       // ✅ Apellido
  email: '',          // ✅ Email
  phone: '',          // ✅ Teléfono
  countryCode: '+1'   // ✅ Código país (default USA)
}
```

### Colores:
```css
bg-gradient-to-br from-cyan-50 via-white to-pink-50  /* Background */
border-orange-500  /* Contador */
bg-cyan-600        /* Botón primario */
```

---

## 🔗 FLUJO INTEGRADO

```
1. Usuario llena formulario
   ↓
2. Click "Continuar" → handleSubmit()
   ↓
3. POST /api/pre-checkout
   ↓ (guarda lead en Supabase)
4. localStorage.setItem('leadData')
   ↓
5. router.push('/registro')
   ↓
6. Registro.jsx pre-llena campos con leadData
```

---

## 🚀 CÓMO TESTEAR

### 1. Iniciar servidor de desarrollo:
```bash
cd /Users/fabiolafranco/Desktop/MVP-SaludCompartida
npm run dev
# o
yarn dev
```

### 2. Abrir en navegador:
```
http://localhost:3000/landing-jan
```

### 3. Testear flujo completo:
- ✅ Llenar formulario
- ✅ Click "Continuar"
- ✅ Verificar que guarda en Supabase (tabla `pre_checkout`)
- ✅ Verificar que navega a `/registro`
- ✅ Verificar que `/registro` pre-llena campos

### 4. Verificar en Supabase:
```sql
SELECT * FROM pre_checkout 
ORDER BY created_at DESC 
LIMIT 10;
```

---

## ⚠️ ANTES DE HACER SWITCH A PRODUCCIÓN

### Checklist:
```
[ ] Landing se ve bien en desktop
[ ] Landing se ve bien en mobile
[ ] Landing se ve bien en tablet
[ ] Formulario valida campos correctamente
[ ] API /api/pre-checkout funciona
[ ] Datos se guardan en Supabase
[ ] Navegación a /registro funciona
[ ] Registro pre-llena campos correctamente
[ ] Meta Pixel trackea correctamente
[ ] No hay errores en consola
```

---

## 🔄 HACER SWITCH A PRODUCCIÓN

Cuando estés lista para reemplazar la landing principal:

```bash
# 1. Backup de landing actual
cp src/app/page.jsx src/app/page-backup-before-landing-jan.jsx

# 2. Copiar nueva landing
cp src/app/landing-jan/page.jsx src/app/page.jsx

# 3. Verificar
git diff src/app/page.jsx

# 4. Commit y deploy
git add src/app/page.jsx
git commit -m "feat: nueva landing emocional de Claude"
git push origin main
```

---

## 📁 ESTRUCTURA ACTUAL

```
src/app/
├── page.jsx                              ← Landing ACTUAL (vieja)
├── landing-jan/
│   └── page.jsx                          ← Landing NUEVA de Claude ✅
├── page-backup-before-major-changes.jsx ← Backup 1
├── page-old-backup.jsx                   ← Backup 2
├── page-old-white.jsx                    ← Backup 3
└── ... (otras rutas)
```

---

## 🎯 PRÓXIMOS PASOS

1. **Testear `/landing-jan` ahora**
2. **Verificar que todo funciona**
3. **Cuando estés segura, hacer switch a `/`**
4. **Eliminar backups viejos después**

---

## 📞 SI ALGO FALLA

### Error común: "Cannot find module 'next/navigation'"
```bash
npm install next@latest
# o
yarn add next@latest
```

### Error: "fetch is not defined"
- Ya está solucionado (Next.js 13+ tiene fetch global)

### Error: localStorage en server-side
- Ya está solucionado (usamos 'use client')

---

**Landing nueva lista para testear en: `http://localhost:3000/landing-jan` 🚀**
