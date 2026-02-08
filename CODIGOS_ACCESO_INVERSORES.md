# 🔑 Códigos de Acceso para Inversores y Demos

## 📋 Códigos Especiales Activos

### Para Inversores
```
INVESTOR2025
```
- **Tipo**: Acceso completo de inversores
- **Usuario Demo**: María González Rodríguez
- **Teléfono**: +52 551 234 5678
- **Email**: demo@saludcompartida.com
- **Ruta**: Dashboard México (vista familiar)

---

### Para Demo - Usuario México (Familia)
```
DEMO-MX
```
- **Tipo**: Demo familiar en México
- **Usuario Demo**: Carlos Martínez López
- **Teléfono**: +52 558 765 4321
- **Email**: demo-mx@saludcompartida.com
- **Ruta**: Dashboard México
- **Servicios disponibles**: 
  - Telemedicina
  - Terapia Psicológica
  - Ahorros en Medicamentos
  - Farmacia

---

### Para Demo - Usuario USA (Migrante)
```
DEMO-US
```
- **Tipo**: Demo migrante en Estados Unidos
- **Usuario Demo**: John Smith
- **Teléfono**: +1 310 555 1234
- **Email**: demo-us@saludcompartida.com
- **Ruta**: Dashboard USA
- **Servicios disponibles**:
  - Vista de beneficios del familiar
  - Panel de control migrante

---

## 🎯 Cómo Usar los Códigos

### Opción 1: Desde la Landing Page
1. Ve a: https://prototipo-saludcompartida-git-main-salud-compartida.vercel.app/
2. Click en "¿Ya te registraste? ¡Ingresa con tu teléfono!"
3. Click en el botón "🔑 Código Especial"
4. Ingresa uno de los códigos: `INVESTOR2025`, `DEMO-MX`, o `DEMO-US`
5. Click en "Ingresar con Código Especial"

### Opción 2: Acceso Directo
1. Ve directamente a: https://prototipo-saludcompartida-git-main-salud-compartida.vercel.app/page3
2. Sigue los pasos 3-5 de la Opción 1

---

## 🎬 Journey del Usuario Demo

### INVESTOR2025 / DEMO-MX (Vista México - Familiar)
```
1. Ingresa con código → Dashboard México
2. Servicios disponibles:
   ├── 🏥 Telemedicina (consultas ilimitadas 24/7)
   ├── 🧠 Terapia Psicológica (agendar sesión)
   ├── 💰 Ahorros en Medicamentos (calcular descuentos)
   └── 💊 Farmacia (buscar medicamentos)
3. Formularios pre-llenados con datos demo
4. Sistema de contacto con WhatsApp integrado
5. Blog con votación de temas
```

### DEMO-US (Vista USA - Migrante)
```
1. Ingresa con código → Dashboard USA
2. Vista de beneficios del familiar en México
3. Panel de control y gestión
4. Contacto y soporte
```

---

## 🛠️ Para Agregar Nuevos Códigos

Si necesitas crear códigos personalizados para inversores específicos, edita el archivo:
`src/page3.jsx` en la sección `SPECIAL_ACCESS_CODES`

### Ejemplo de nuevo código:
```javascript
'INV-GARCIA': {
  type: 'investor',
  route: '/page4',
  demoUser: {
    firstName: 'Nombre',
    lastName: 'Apellido',
    motherLastName: 'ApellidoMaterno',
    phone: '5512345678',
    email: 'email@example.com',
    countryCode: '+52'
  }
}
```

---

## 📊 Tracking de Códigos

Los códigos usados se registran en `localStorage` bajo la clave `usedSpecialCodes` con:
- Código usado
- Tipo de código
- Timestamp de uso

Esto permite analytics básicos de qué inversores están probando el prototipo.

---

## ⚠️ Notas Importantes

1. **Los códigos NO son case-sensitive** (se convierten automáticamente a mayúsculas)
2. **Los códigos NO expiran** (configuración actual para el pitch)
3. **Los datos demo son ficticios** y se cargan automáticamente
4. **Cada código tiene su propio usuario demo** con nombre y datos únicos
5. **Los códigos pueden usarse ilimitadamente** (no hay límite de usos)

---

## 🚀 Para Producción (Post-Pitch)

Cuando pases a producción con Supabase:
- Los códigos se almacenarán en la tabla `access_codes`
- Podrás configurar:
  - Límite de usos por código
  - Fecha de expiración
  - Restricciones de IP
  - Analytics avanzados
- Dashboard admin para generar/revocar códigos en tiempo real

---

**Última actualización**: Noviembre 10, 2025
**Contacto**: SaludCompartida Team
