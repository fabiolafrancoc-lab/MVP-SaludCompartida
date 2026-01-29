# 🗑️ ARCHIVOS DUPLICADOS Y OBSOLETOS - ELIMINAR HOY

**Fecha:** 28 de enero, 2026  
**Estado:** Pre-lanzamiento (mañana mediodía)  
**Acción:** Revisar y eliminar archivos que NO se usan en nueva landing

---

## ⚠️ CRÍTICO: Páginas Backup Obsoletas en `/src/app/`

Estos son backups antiguos que están ocupando espacio y confundiendo:

```
❌ /src/app/page-backup-before-major-changes.jsx
❌ /src/app/page-old-backup.jsx
❌ /src/app/page-old-white.jsx
```

**Acción:** ELIMINAR todos los backups. Ya tienes git para versiones anteriores.

---

## 🔴 DUPLICADOS DE COMPONENTES

### Headers duplicados:
```
src/components/Header.jsx          ← ¿Cuál usas?
src/components/Header.tsx          ← ¿TypeScript o JavaScript?
src/components/SharedHeader.jsx    ← ¿Este es diferente?
src/components/landing/NewHeader.jsx ← ¿Este es el nuevo?
```

### Footers duplicados:
```
src/components/Footer.jsx                    ← ¿Cuál usas?
src/components/Footer.tsx                    ← ¿TypeScript o JavaScript?
src/components/SharedFooter.jsx              ← ¿Este es diferente?
src/components/landing/NewStickyFooter.jsx   ← ¿Este es el nuevo?
```

### Icons duplicados:
```
src/components/CustomIcons.jsx
src/components/icons/CustomIcons.jsx  ← Mismo archivo en dos lugares
```

**Acción necesaria:** Dime cuál versión de Header y Footer estás usando en la nueva landing que Claude está diseñando.

---

## 🟡 VISTAS DUPLICADAS CON "INTERNAL"

Tienes versiones duplicadas de páginas con sufijo "Internal":

```
src/views/NuestrosPilares.jsx → src/views/NuestrosPilaresInternal.jsx
src/views/Privacy.jsx → src/views/PrivacyInternal.jsx
src/views/QuienesSomos.jsx → src/views/QuienesSomosInternal.jsx
src/views/Terms.jsx → src/views/TermsInternal.jsx
src/views/VisionMision.jsx → src/views/VisionMisionInternal.jsx
```

**Pregunta:** ¿Las versiones "Internal" son para usuarios loggeados? ¿O son duplicados obsoletos?

---

## 🟠 MÚLTIPLES LANDING PAGES

Tienes 3 versiones de landing con burbujas:

```
src/views/LandingBubbles.jsx
src/views/LandingBubblesSimple.jsx
src/views/LandingBubblesTikTok.jsx
```

**Pregunta:** ¿Cuál de estas 3 estás usando? ¿Las otras dos se pueden eliminar?

---

## 🟢 PÁGINAS PRE-CHECKOUT DUPLICADAS

Tienes páginas "Pre" que parecen ser previas al flujo principal:

```
src/views/FarmaciasPre.jsx
src/views/MisAhorrosPre.jsx
src/views/TelemedicinaPre.jsx
src/views/TerapiaPre.jsx
```

**Pregunta:** ¿Estas son landing pages individuales por servicio? ¿O son obsoletas?

---

## 🔵 ARCHIVOS DE CONFIGURACIÓN DUPLICADOS

```
❌ eslint.config.js
❌ eslint.config.mjs  ← Solo necesitas UNO
```

```
❌ next.config.js
❌ next.config.ts  ← Solo necesitas UNO (probablemente el .ts)
```

**Acción:** Eliminar los duplicados (probablemente los `.js` si usas TypeScript)

---

## 📦 ARCHIVOS EN ROOT QUE NO DEBERÍAN ESTAR AHÍ

Estos deberían estar en `/src/` o `/scripts/`:

```
/test-square-import.js
/test-elevenlabs-voice.js
/test-whatsapp.js
/test-mobile-flow.js
/test-lupita-system.js
/test-codes-urgent.js
/get-all-tables.js
/execute-migrations.js
/execute-migrations.py
/execute-migrations.sh
/export-database.sh
```

**Acción:** Mover a `/scripts/tests/` o eliminar si ya no se usan.

---

## 🎯 ARCHIVOS DE PÁGINAS ANTIGUAS EN `/src/`

Estos parecen ser el sistema antiguo antes de migrar a `/app`:

```
/src/home.jsx
/src/contact.jsx
/src/savings.jsx
/src/terms.jsx
/src/privacy.jsx
/src/account.jsx
/src/page4.jsx
/src/migrant.jsx
/src/migrantcontact.jsx
/src/therapy.jsx
/src/telemedicine.jsx
/src/pharmacy.jsx
/src/rating.jsx
/src/therapy-dashboard.jsx
/src/savings-dashboard.jsx
/src/LoginCodigo.jsx
```

**Acción:** Si ya migraste todo a `/src/app/`, estos se pueden ELIMINAR.

---

## ✅ PLAN DE LIMPIEZA ANTES DEL LANZAMIENTO

### Paso 1: Respóndeme estas 3 preguntas críticas

1. **¿Qué Header y Footer usas?** (Header.jsx, Header.tsx, NewHeader.jsx, etc.)
2. **¿Las versiones "Internal" se usan o son duplicados?**
3. **¿Ya migraste todo de `/src/*.jsx` a `/src/app/`?**

### Paso 2: Yo ejecuto la limpieza

Una vez que me confirmes, yo:
1. Elimino los backups obsoletos
2. Elimino duplicados de configuración
3. Muevo tests a `/scripts/tests/`
4. Elimino páginas antiguas si ya no se usan
5. Te dejo solo los archivos que SÍ usas

### Paso 3: Verificación

Corremos un test rápido para confirmar que todo sigue funcionando.

---

## 🚀 IMPACTO

**Archivos a revisar:** ~40-50 archivos  
**Tiempo estimado:** 15 minutos después de que me respondas  
**Beneficio:** Código más limpio, deploy más rápido, menos confusión

---

**¿Listo para limpiar? Respóndeme las 3 preguntas y empiezo.**
