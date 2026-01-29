# ✅ INFRAESTRUCTURA LISTA PARA CLAUDE

**Status:** COMPLETADO  
**Fecha:** 28 enero 2026  
**Próximo paso:** Claude puede empezar a diseñar

---

## �️ STACK TECNOLÓGICO COMPLETO

### Frontend & Hosting
- **Next.js 16** - Framework React
- **Tailwind CSS** - Estilos
- **Vercel** - Hosting y deploy
- **GitHub** - Control de versiones

### Base de Datos & Storage
- **Supabase** - PostgreSQL database principal
- **Weaviate** - Vector database para ML patterns (AI Companions)
- **AWS S3** - Almacenamiento de grabaciones de llamadas

### Pagos & Suscripciones
- **Square API** - Procesamiento de pagos ($12/$18 mensual)

### Comunicaciones
- **Resend** - Email transaccional (confirmaciones, códigos)
- **WhatsApp Business API (WATI)** - Mensajería con familia en México
- **Meta Business Suite** - Facebook Ads + Instagram Ads
- **YouTube Ads** - Video advertising

### AI & Voice
- **ElevenLabs** - Text-to-speech (voces Lupita & Fernanda)
- **TALYNX (México)** - Telefonía mexicana para llamadas
- **Vapi.io** - Voice AI orchestration
- **AWS Bedrock** - Claude 3.5 Sonnet (conversaciones AI)
- **Weaviate** - ML embeddings y aprendizaje grupal

### Serverless & Compute
- **Vercel Edge Functions** - API routes Next.js
- **AWS Lambda** - Funciones serverless (procesamiento transcripciones, webhooks)
- **AWS Compute Optimizer** - Optimización de recursos

### Recording & Transcription
- **AWS S3** - Storage de grabaciones MP3/WAV
- **AWS Transcribe** - Speech-to-text (opcional)
- ❌ **NO usamos BLOB** - Solo S3 directo
- ❌ **NO usamos librerías de recording locales** - Todo server-side

### Security & Access
- **AWS IAM** - Roles y permisos para servicios AWS
- **Supabase RLS** - Row Level Security en database

### Monitoring & Analytics
- **Sentry** - Error tracking y performance monitoring
- **Meta Pixel** - Facebook + Instagram tracking
- **YouTube Analytics** - Video campaign tracking
- ❌ **NO TikTok Pixel** - Eliminado por solicitud

### Social Media Management
- **Meta Business Suite** - Facebook + Instagram campaigns
- **YouTube Ads Manager** - Video campaigns
- **Fuentes Audiovisuales** - Producción de contenido testimonial

---

## �📦 ARCHIVOS CREADOS

### 1. ✅ Base de datos: `scripts/create-pre-checkout-table.sql`
**Propósito:** Tabla para capturar leads de landing antes de completar registro

**Campos:**
```sql
- first_name, last_name, email, phone
- traffic_source (facebook, instagram, tiktok, etc.)
- utm_campaign, utm_source, utm_medium
- converted (boolean), registration_id (FK)
```

**Ejecutar:**
```bash
# Conectar a Supabase y ejecutar:
psql -h [tu-supabase-url] -U postgres -d postgres -f scripts/create-pre-checkout-table.sql
```

---

### 2. ✅ Mapper de campos: `src/lib/field-mapper.ts`
**Propósito:** Traduce campos de Claude → Schema de Supabase

**Funciones principales:**
- `mapLandingToPreCheckout()` - Landing → pre_checkout table
- `mapRegistroToSupabase()` - Registro → registrations table
- `generateFamilyCode()` - Código 6 dígitos alfanumérico
- `formatPhoneNumber()` - Formato +1 (USA) o +52 (MX)

**Uso en Landing:**
```tsx
import { mapLandingToPreCheckout } from '@/lib/field-mapper';

const data = mapLandingToPreCheckout(formData);
// Ahora data tiene nombres correctos para Supabase
```

---

### 3. ✅ API Endpoint: `src/app/api/pre-checkout/route.ts`
**Propósito:** Guardar leads de landing + tracking

**Endpoint:** `POST /api/pre-checkout`

**Request body:**
```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan@example.com",
  "phone": "5551234567",
  "countryCode": "+1"
}
```

**Response:**
```json
{
  "success": true,
  "leadId": 123,
  "message": "Lead captured successfully"
}
```

**Features:**
- ✅ Guarda en Supabase
- ✅ Detecta traffic source automáticamente
- ✅ Trackea UTM params
- ✅ Integración con Meta Pixel (opcional)
- ✅ Maneja duplicados sin error

---

### 4. ✅ Guía para Claude: `CLAUDE_INTEGRATION_GUIDE.md`
**Propósito:** Instrucciones completas para que Claude diseñe correctamente

**Contenido:**
- ✅ Nombres EXACTOS de campos a usar
- ✅ Estructura de formularios
- ✅ Flujo de navegación entre páginas
- ✅ Cómo guardar datos en localStorage
- ✅ Cómo llamar API endpoints
- ✅ Guías de diseño (colores, fonts, responsive)

---

## 🎯 FLUJO COMPLETO IMPLEMENTADO

### Landing (Page 1) - Claude diseña
```
1. Usuario llena: firstName, lastName, email, phone
2. Click en "Continuar"
3. → POST /api/pre-checkout (guarda lead)
4. → localStorage.setItem('leadData')
5. → router.push('/registro')
```

### Registro (Page 2) - Claude diseña
```
1. useEffect: recupera leadData de localStorage
2. Pre-llena: migrantFirstName, migrantLastName, migrantEmail, migrantPhone
3. Usuario completa: migrantState, familia, plan
4. Click en "Continuar al pago"
5. → localStorage.setItem('registroData')
6. → router.push('/pago')
```

### Pago (Page 3) - Claude diseña UI, Copilot integra Square
```
1. Recupera leadData + registroData
2. Muestra resumen
3. Procesa pago con Square
4. → Crea registro en registrations table
5. → Marca pre_checkout.converted = true
6. → Envía email + WhatsApp
7. → router.push('/confirmacion')
```

### Confirmación (Page 4) - Claude diseña
```
1. Muestra código de familia
2. Instrucciones de activación
3. Links de WhatsApp para familia en México
```

---

## 🚀 CÓMO CLAUDE DEBE USAR ESTO

### En Landing (Page 1):
```tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Landing() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+1'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Guardar lead en backend
    const response = await fetch('/api/pre-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      alert('Error. Por favor intenta de nuevo.');
      return;
    }
    
    // 2. Guardar en localStorage
    localStorage.setItem('leadData', JSON.stringify(formData));
    
    // 3. Navegar a registro
    router.push('/registro');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Diseño de Claude aquí */}
    </form>
  );
}
```

### En Registro (Page 2):
```tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Registro() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    migrantFirstName: '',
    migrantLastName: '',
    migrantEmail: '',
    migrantPhone: '',
    migrantState: '',
    familyFirstName: '',
    familyLastName: '',
    familyPhone: '',
    familyRelationship: '',
    planId: 'basico',
    planName: 'Plan Básico',
    planPrice: 12.00
  });

  // Pre-llenar con datos de landing
  useEffect(() => {
    const leadData = localStorage.getItem('leadData');
    if (leadData) {
      const { firstName, lastName, email, phone } = JSON.parse(leadData);
      setFormData(prev => ({
        ...prev,
        migrantFirstName: firstName,
        migrantLastName: lastName,
        migrantEmail: email,
        migrantPhone: phone
      }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Guardar en localStorage
    localStorage.setItem('registroData', JSON.stringify(formData));
    
    // 2. Navegar a pago
    router.push('/pago');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Diseño de Claude aquí */}
    </form>
  );
}
```

---

## ⚠️ REGLAS CRÍTICAS PARA CLAUDE

### ❌ NO USAR:
- `name` (usar `firstName` + `lastName`)
- `surname` (usar `lastName`)
- `window.location.href` (usar `router.push()`)
- Solo localStorage sin API call
- Validación solo frontend

### ✅ USAR:
- `firstName`, `lastName`, `email`, `phone`
- `router.push('/ruta')`
- localStorage + API call
- Validación frontend + backend
- Loading states en botones

---

## 📊 CHECKLIST PRE-LANZAMIENTO

```
[ ] Ejecutar create-pre-checkout-table.sql en Supabase
[ ] Verificar que API /api/pre-checkout funciona
[ ] Testear flujo: Landing → Registro → Pago → Confirmación
[ ] Verificar que datos se guardan correctamente en Supabase
[ ] Probar en mobile, tablet, desktop
[ ] Configurar Meta Pixel (opcional pero recomendado)
[ ] Monitorear errores en Sentry
```

---

## 🎨 PRÓXIMOS PASOS

1. **Claude empieza con Landing (Page 1)**
   - Diseño emocional con foto + formulario
   - Contador de familias protegidas
   - Testimoniales reales

2. **Copilot integra y prueba**
   - Verifica que API funciona
   - Testing de flujo completo

3. **Claude continúa con Page 2, 3, 4...**
   - Diseño consistente
   - Mismo estilo emocional

4. **Lanzamiento**
   - Deploy a Vercel
   - Monitoreo en producción

---

## 📞 COORDINACIÓN

**Claude envía:** Archivos .tsx con diseño  
**Copilot integra:** Backend, API, database  
**Testing:** Conjunto antes de cada deploy

---

**INFRAESTRUCTURA LISTA. Claude puede empezar cuando quiera. 🚀**
