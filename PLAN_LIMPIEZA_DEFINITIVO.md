# 🗑️ PLAN DE LIMPIEZA DEFINITIVO - PRE LANZAMIENTO
**Fecha:** 28 enero 2026 | **Lanzamiento:** Mañana mediodía  
**Sistema viejo:** Background oscuro, 3 servicios simples  
**Sistema nuevo:** Background claro, 4 pilares únicos, testimoniales

---

## ✅ ARCHIVOS A ELIMINAR INMEDIATAMENTE

### 1️⃣ PÁGINAS "PRE" DEL SISTEMA VIEJO (Background oscuro)

```bash
❌ src/views/FarmaciasPre.jsx          # Sistema viejo: tarjetas descuento
❌ src/views/TelemedicinaPre.jsx       # Sistema viejo: solo doctores  
❌ src/views/TerapiaPre.jsx            # Sistema viejo: terapia semanal
❌ src/views/MisAhorrosPre.jsx         # Sistema viejo: seguimiento gastos
```

**Motivo:** Estas eran landing pages individuales del sistema antiguo de 3 servicios. Ya NO se usan porque migraste a los 4 pilares con nueva narrativa emocional.

**Ruta activa:** Solo `/mis-ahorros-pre` está en `ClientRouter.tsx` línea 101
- Las otras 3 ni siquiera tienen rutas activas

---

### 2️⃣ BACKUPS OBSOLETOS DE PÁGINA PRINCIPAL

```bash
❌ src/app/page-backup-before-major-changes.jsx
❌ src/app/page-old-backup.jsx
❌ src/app/page-old-white.jsx
```

**Motivo:** Backups del sistema viejo. Git ya tiene el historial.

---

### 3️⃣ LANDING PAGES DUPLICADAS

```bash
❌ src/views/LandingBubbles.jsx            # Versión original
❌ src/views/LandingBubblesSimple.jsx      # Para Instagram/Facebook
❌ src/views/LandingBubblesTikTok.jsx      # Para TikTok
```

**Rutas activas:**
- `/instagram` y `/facebook` → LandingBubblesSimple
- `/tiktok` → LandingBubblesTikTok

**Pregunta crítica:** ¿Sigues usando estas para campañas pagadas? ¿O ya migraste todo a la nueva landing que Claude está diseñando?

---

### 4️⃣ SISTEMA ANTIGUO DE PÁGINAS INDIVIDUALES EN `/src/`

Estos archivos eran del sistema viejo ANTES de migrar a Next.js `/app`:

```bash
❌ src/home.jsx                 # → Migrado a src/app/page.jsx
❌ src/contact.jsx              # → Migrado a src/views/Contacto.jsx
❌ src/savings.jsx              # Dashboard viejo
❌ src/terms.jsx                # → Migrado a src/views/Terms.jsx
❌ src/privacy.jsx              # → Migrado a src/views/Privacy.jsx
❌ src/account.jsx              # Dashboard viejo
❌ src/page4.jsx                # ¿Qué es esto?
❌ src/migrant.jsx              # ¿Funcionalidad migrante activa?
❌ src/migrantcontact.jsx       # ¿Funcionalidad migrante activa?
❌ src/therapy.jsx              # Dashboard viejo
❌ src/telemedicine.jsx         # Dashboard viejo
❌ src/pharmacy.jsx             # Dashboard viejo
❌ src/rating.jsx               # ¿Se usa?
❌ src/therapy-dashboard.jsx    # Dashboard viejo
❌ src/savings-dashboard.jsx    # Dashboard viejo
❌ src/LoginCodigo.jsx          # ¿Se usa?
```

**PERO:** Estos archivos TODAVÍA están importados en `ClientRouter.tsx` (líneas 8-49)

**Acción necesaria:** Confirmar si estas rutas siguen activas o ya migraste todo a `/app`.

---

### 5️⃣ CONFIGURACIONES DUPLICADAS

```bash
❌ eslint.config.js      # Duplicado
✅ eslint.config.mjs     # Este es el que se usa

❌ next.config.js        # Duplicado
✅ next.config.ts        # Este es el que TypeScript usa
```

---

### 6️⃣ ARCHIVOS DE TEST EN ROOT (Mover a /scripts/)

```bash
/test-square-import.js       → scripts/tests/
/test-elevenlabs-voice.js    → scripts/tests/
/test-whatsapp.js            → scripts/tests/
/test-mobile-flow.js         → scripts/tests/
/test-lupita-system.js       → scripts/tests/
/test-codes-urgent.js        → scripts/tests/
/get-all-tables.js           → scripts/database/
/execute-migrations.js       → scripts/database/
/execute-migrations.py       → scripts/database/
/execute-migrations.sh       → scripts/database/
/export-database.sh          → scripts/database/
```

---

## 🟡 ARCHIVOS QUE NECESITAN REVISIÓN

### Páginas "Internal" duplicadas:

```
src/views/NuestrosPilares.jsx → src/views/NuestrosPilaresInternal.jsx
src/views/Privacy.jsx → src/views/PrivacyInternal.jsx
src/views/QuienesSomos.jsx → src/views/QuienesSomosInternal.jsx
src/views/Terms.jsx → src/views/TermsInternal.jsx
src/views/VisionMision.jsx → src/views/VisionMisionInternal.jsx
```

**Pregunta:** ¿Las versiones "Internal" son para usuarios loggeados? ¿O son duplicados del sistema viejo?

---

## ❓ PREGUNTAS CRÍTICAS ANTES DE ELIMINAR

### 1. Funcionalidad Migrante
```
❓ src/migrant.jsx
❓ src/migrantcontact.jsx
```
¿Esta funcionalidad sigue activa? ¿O era parte del sistema viejo?

### 2. Landing Bubbles para Redes Sociales
```
❓ LandingBubblesSimple (Instagram/Facebook)
❓ LandingBubblesTikTok (TikTok)
```
¿Sigues corriendo campañas pagadas que apuntan a estas URLs? ¿O ya migraste todo?

### 3. Dashboards Viejos
```
❓ src/therapy-dashboard.jsx
❓ src/savings-dashboard.jsx
```
¿Ya migraste los dashboards a `/app/dashboard`?

---

## 🚀 SCRIPT DE ELIMINACIÓN AUTOMÁTICA

Una vez que confirmes, ejecuto este script:

```bash
#!/bin/bash

# 1. Eliminar páginas PRE del sistema viejo
rm src/views/FarmaciasPre.jsx
rm src/views/TelemedicinaPre.jsx
rm src/views/TerapiaPre.jsx
rm src/views/MisAhorrosPre.jsx

# 2. Eliminar backups obsoletos
rm src/app/page-backup-before-major-changes.jsx
rm src/app/page-old-backup.jsx
rm src/app/page-old-white.jsx

# 3. Eliminar configs duplicados
rm eslint.config.js
rm next.config.js

# 4. Crear directorio de tests y mover archivos
mkdir -p scripts/tests
mkdir -p scripts/database

mv test-*.js scripts/tests/
mv get-all-tables.js scripts/database/
mv execute-migrations.* scripts/database/
mv export-database.sh scripts/database/

echo "✅ Limpieza completada"
```

---

## 📊 IMPACTO ESTIMADO

- **Archivos a eliminar:** ~25 archivos
- **Espacio liberado:** ~50-100KB código
- **Tiempo:** 5 minutos
- **Riesgo:** BAJO (son archivos del sistema viejo)

---

## ⚠️ ANTES DE EJECUTAR

**Respóndeme estas 3 preguntas:**

1. **¿La funcionalidad "migrant" sigue activa?** (migrant.jsx, migrantcontact.jsx)
2. **¿Sigues usando las landing "Bubbles" para campañas pagadas?** (Instagram/Facebook/TikTok)
3. **¿Ya migraste los dashboards viejos?** (therapy-dashboard.jsx, savings-dashboard.jsx)

**Una vez que confirmes, ejecuto el script y limpio todo en 5 minutos.**
