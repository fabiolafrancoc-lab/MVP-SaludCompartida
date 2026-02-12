# 🏥 INTEGRACIÓN LLAMANDO AL DOCTOR (LAD) - WHITE LABEL

**Proveedor:** Llamando al Doctor  
**Documentación:** https://llamandoaldoctor.com/developers/#/token  
**Marca White Label:** SaludCompartida  
**Fecha:** Febrero 2026

---

## 📋 SERVICIOS A INTEGRAR

### 1️⃣ TELEMEDICINA (Prioridad 1)
- Consultas médicas 24/7 por videollamada
- Endpoint: `/api/telemedicine/create-consultation`

### 2️⃣ TERAPIA PSICOLÓGICA SEMANAL (Prioridad 2)
- Sesiones de terapia programadas
- Endpoint: `/api/therapy/schedule-session`

---

## 🔑 AUTENTICACIÓN LAD

### Obtener Token de Acceso

```bash
POST https://api.llamandoaldoctor.com/auth/token
Content-Type: application/json

{
  "client_id": "TU_CLIENT_ID",
  "client_secret": "TU_CLIENT_SECRET",
  "grant_type": "client_credentials"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

**Variables de Entorno Necesarias:**
```env
LAD_CLIENT_ID=tu_client_id_aqui
LAD_CLIENT_SECRET=tu_client_secret_aqui
LAD_API_URL=https://api.llamandoaldoctor.com
```

---

## 🗺️ MAPEO DE CAMPOS: SUPABASE ↔ LAD

### CAMPOS SUPABASE (tabla `registrations`)

```typescript
// Datos del paciente en México (quien usa el servicio)
family_first_name: string          // Nombre
family_last_name: string           // Apellido paterno
family_mother_last_name: string    // Apellido materno
family_primary_email: string       // Email
family_phone: string               // Teléfono formato: "55 1234 5678"
family_sex: string                 // "M" o "F"
family_birthdate: string           // "1985-03-15" (YYYY-MM-DD)

// Datos del migrante (quien paga)
migrant_first_name: string
migrant_last_name: string
migrant_email: string
migrant_phone: string

// Códigos de acceso
family_code: string                // "A3B7K9"
migrant_code: string               // "M2025ABC"

// Suscripción
subscription_status: string        // "ACTIVE"
square_subscription_id: string     // ID Square
```

### CAMPOS LAD (API Request)

Según documentación de LAD, necesitan:

```typescript
{
  // PACIENTE
  "patient": {
    "first_name": string,          // ← family_first_name
    "last_name": string,           // ← family_last_name + " " + family_mother_last_name
    "email": string,               // ← family_primary_email
    "phone": string,               // ← family_phone (limpiar formato)
    "gender": string,              // ← family_sex ("M" → "male", "F" → "female")
    "birth_date": string,          // ← family_birthdate (formato ISO)
    "country_code": "MX"           // ← Fijo "MX" (México)
  },
  
  // SERVICIO
  "service_type": string,          // "telemedicine" o "therapy"
  "consultation_type": string,     // "video" | "chat" | "phone"
  "specialty": string,             // "general" | "psychology" | etc.
  
  // METADATA (para tracking)
  "external_id": string,           // ← family_code (tu código interno)
  "partner_name": "SaludCompartida",
  "notes": string                  // Info adicional
}
```

---

## 🔄 FUNCIÓN DE MAPEO

### `/src/lib/lad-mapper.ts`

```typescript
import { Registration } from './supabase';

export interface LADPatientData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  birth_date: string;
  country_code: 'MX';
}

export interface LADConsultationRequest {
  patient: LADPatientData;
  service_type: 'telemedicine' | 'therapy';
  consultation_type: 'video' | 'chat' | 'phone';
  specialty?: string;
  external_id: string;
  partner_name: 'SaludCompartida';
  notes?: string;
}

/**
 * Mapea datos de Supabase a formato LAD
 */
export function mapSupabaseToLAD(
  registration: Registration,
  serviceType: 'telemedicine' | 'therapy',
  consultationType: 'video' | 'chat' | 'phone' = 'video'
): LADConsultationRequest {
  
  // Limpiar teléfono: "55 1234 5678" → "5512345678"
  const cleanPhone = registration.family_phone.replace(/\s+/g, '').replace(/[^\d]/g, '');
  
  // Mapear género: "M" → "male", "F" → "female"
  const gender = registration.family_sex === 'M' ? 'male' : 'female';
  
  // Combinar apellidos: "García López" (paterno + materno)
  const lastName = registration.family_mother_last_name
    ? `${registration.family_last_name} ${registration.family_mother_last_name}`
    : registration.family_last_name;
  
  return {
    patient: {
      first_name: registration.family_first_name,
      last_name: lastName,
      email: registration.family_primary_email,
      phone: cleanPhone,
      gender: gender,
      birth_date: registration.family_birthdate, // Ya está en formato ISO
      country_code: 'MX'
    },
    service_type: serviceType,
    consultation_type: consultationType,
    specialty: serviceType === 'therapy' ? 'psychology' : 'general',
    external_id: registration.family_code, // Tu código interno para tracking
    partner_name: 'SaludCompartida',
    notes: `Migrante: ${registration.migrant_first_name} ${registration.migrant_last_name} (${registration.migrant_email})`
  };
}

/**
 * Valida que los datos requeridos estén presentes
 */
export function validateRegistrationForLAD(registration: Registration): {
  valid: boolean;
  missing: string[];
} {
  const missing: string[] = [];
  
  if (!registration.family_first_name) missing.push('family_first_name');
  if (!registration.family_last_name) missing.push('family_last_name');
  if (!registration.family_primary_email) missing.push('family_primary_email');
  if (!registration.family_phone) missing.push('family_phone');
  if (!registration.family_sex) missing.push('family_sex');
  if (!registration.family_birthdate) missing.push('family_birthdate');
  
  return {
    valid: missing.length === 0,
    missing
  };
}
```

---

## 🔌 API ENDPOINTS A CREAR

### 1. Telemedicina

**Archivo:** `/src/app/api/lad/telemedicine/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import { mapSupabaseToLAD, validateRegistrationForLAD } from '@/lib/lad-mapper';

export async function POST(request: NextRequest) {
  try {
    const { familyCode, consultationType = 'video' } = await request.json();
    
    // 1. Obtener datos de Supabase
    const supabase = getSupabaseClient();
    const { data: registration, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('family_code', familyCode)
      .eq('subscription_status', 'ACTIVE')
      .single();
    
    if (error || !registration) {
      return NextResponse.json(
        { error: 'Código no encontrado o suscripción inactiva' },
        { status: 404 }
      );
    }
    
    // 2. Validar datos requeridos
    const validation = validateRegistrationForLAD(registration);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Datos incompletos', missing: validation.missing },
        { status: 400 }
      );
    }
    
    // 3. Mapear a formato LAD
    const ladRequest = mapSupabaseToLAD(registration, 'telemedicine', consultationType);
    
    // 4. Obtener token LAD
    const tokenResponse = await fetch(`${process.env.LAD_API_URL}/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.LAD_CLIENT_ID,
        client_secret: process.env.LAD_CLIENT_SECRET,
        grant_type: 'client_credentials'
      })
    });
    
    if (!tokenResponse.ok) {
      throw new Error('Error obteniendo token LAD');
    }
    
    const { access_token } = await tokenResponse.json();
    
    // 5. Crear consulta en LAD
    const consultationResponse = await fetch(`${process.env.LAD_API_URL}/consultations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify(ladRequest)
    });
    
    if (!consultationResponse.ok) {
      const errorData = await consultationResponse.json();
      throw new Error(`Error LAD: ${JSON.stringify(errorData)}`);
    }
    
    const consultation = await consultationResponse.json();
    
    // 6. Guardar en service_usage (opcional)
    await supabase.from('service_usage').insert({
      registration_id: registration.id,
      service_type: 'telemedicina',
      description: `Consulta ${consultationType} - LAD ID: ${consultation.id}`,
      amount_paid: 0,
      amount_saved: 50, // Valor estimado de consulta
      used_at: new Date().toISOString()
    });
    
    return NextResponse.json({
      success: true,
      consultation: {
        id: consultation.id,
        status: consultation.status,
        video_url: consultation.video_url,
        scheduled_at: consultation.scheduled_at
      }
    });
    
  } catch (error: any) {
    console.error('Error en telemedicina LAD:', error);
    return NextResponse.json(
      { error: error.message || 'Error interno' },
      { status: 500 }
    );
  }
}
```

### 2. Terapia Psicológica

**Archivo:** `/src/app/api/lad/therapy/route.ts`

```typescript
// Similar a telemedicine pero con:
// - service_type: 'therapy'
// - specialty: 'psychology'
// - Permite agendar fecha/hora específica
```

---

## 🎯 INTEGRACIÓN EN DASHBOARD

### Componente Telemedicina

**Archivo:** `/src/components/dashboard/Telemedicina.jsx`

```jsx
'use client';

import { useState } from 'react';

export default function Telemedicina({ familyCode }) {
  const [loading, setLoading] = useState(false);
  const [consultation, setConsultation] = useState(null);
  
  const startConsultation = async (type = 'video') => {
    setLoading(true);
    try {
      const response = await fetch('/api/lad/telemedicine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ familyCode, consultationType: type })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al crear consulta');
      }
      
      setConsultation(data.consultation);
      
      // Redirigir a videollamada
      if (data.consultation.video_url) {
        window.open(data.consultation.video_url, '_blank');
      }
      
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="telemedicina-card">
      <h2>Consulta Médica 24/7</h2>
      <p>Habla con un doctor ahora mismo</p>
      
      <button 
        onClick={() => startConsultation('video')}
        disabled={loading}
      >
        {loading ? 'Conectando...' : 'Iniciar Videollamada'}
      </button>
      
      <button 
        onClick={() => startConsultation('chat')}
        disabled={loading}
      >
        Chat con Doctor
      </button>
      
      {consultation && (
        <div className="consultation-info">
          <p>✅ Consulta creada: {consultation.id}</p>
          <p>Estado: {consultation.status}</p>
        </div>
      )}
    </div>
  );
}
```

---

## ⚠️ CAMPOS FALTANTES EN SUPABASE

Actualmente tu tabla `registrations` **NO tiene** estos campos que LAD requiere:

```sql
-- AGREGAR A TABLA registrations:
ALTER TABLE registrations ADD COLUMN family_sex TEXT; -- "M" o "F"
ALTER TABLE registrations ADD COLUMN family_birthdate DATE; -- Fecha nacimiento
```

**SOLUCIÓN TEMPORAL:** Si no tienes estos datos aún:

```typescript
// En lad-mapper.ts
export function mapSupabaseToLAD(registration: Registration, ...) {
  return {
    patient: {
      // ...
      gender: registration.family_sex || 'female', // Default si no existe
      birth_date: registration.family_birthdate || '1980-01-01', // Default
      // ...
    }
  };
}
```

---

## 📝 CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Setup
- [ ] Obtener credenciales LAD (client_id, client_secret)
- [ ] Agregar variables de entorno en Vercel
- [ ] Agregar campos `family_sex` y `family_birthdate` a Supabase
- [ ] Actualizar formulario de registro para capturar estos datos

### Fase 2: Telemedicina
- [ ] Crear `/src/lib/lad-mapper.ts`
- [ ] Crear `/src/app/api/lad/telemedicine/route.ts`
- [ ] Integrar en componente Dashboard
- [ ] Probar con usuario real

### Fase 3: Terapia
- [ ] Crear `/src/app/api/lad/therapy/route.ts`
- [ ] Agregar calendario para agendar sesiones
- [ ] Integrar en componente Dashboard
- [ ] Probar con usuario real

### Fase 4: Monitoreo
- [ ] Logging de consultas en `service_usage`
- [ ] Dashboard admin para ver uso
- [ ] Alertas si LAD API falla

---

## 🚀 PRÓXIMOS PASOS

1. **Contacta a LAD** para obtener:
   - `client_id`
   - `client_secret`
   - Confirmar endpoints exactos de su API
   - Confirmar campos requeridos

2. **Actualiza Supabase:**
   ```sql
   ALTER TABLE registrations ADD COLUMN family_sex TEXT;
   ALTER TABLE registrations ADD COLUMN family_birthdate DATE;
   ```

3. **Actualiza formulario de registro** para capturar sexo y fecha de nacimiento

4. **Implementa el mapper** y endpoints API

¿Quieres que empiece a crear los archivos de código ahora o prefieres primero confirmar las credenciales con LAD?
