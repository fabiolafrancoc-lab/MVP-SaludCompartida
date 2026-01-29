# 🔒 PLAN DE SEGURIDAD - IMPLEMENTACIÓN URGENTE

## 📅 Timeline: 29 Enero 2026 - Post-Deploy

---

## 🔴 PRIORIDAD 1: CRÍTICA (Hacer AHORA - 2 horas)

### V2. Supabase RLS (Row Level Security)

**Problema Actual:**
- Tablas sin RLS = cualquiera con ANON_KEY puede leer TODOS los datos
- Datos personales expuestos: nombres, teléfonos, emails, códigos
- Violación potencial de GDPR/HIPAA

**Impacto si no se arregla:**
- Leak masivo de datos personales
- Multas regulatorias (hasta $20M USD bajo GDPR)
- Pérdida de confianza de usuarios
- Demandas legales

**Solución Inmediata:**

#### Paso 1: Habilitar RLS en Supabase (15 min)

```bash
# Ve a: https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee
# SQL Editor → New Query
```

```sql
-- 1. HABILITAR RLS EN TODAS LAS TABLAS CRÍTICAS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemedicine_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE pharmacy_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE companion_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;

-- 2. CREAR POLÍTICAS DE SEGURIDAD

-- Registrations: Solo el dueño puede ver sus datos
CREATE POLICY "Users can view own registration"
ON registrations
FOR SELECT
USING (
  -- Opción A: Si implementas auth de Supabase
  -- auth.uid() = user_id
  
  -- Opción B: Mientras tanto, basado en family_code en session
  family_code = current_setting('app.current_family_code', true)
);

-- Service Usage: Solo el dueño puede ver su historial
CREATE POLICY "Users can view own service usage"
ON service_usage
FOR SELECT
USING (
  registration_id IN (
    SELECT registration_id 
    FROM registrations 
    WHERE family_code = current_setting('app.current_family_code', true)
  )
);

-- Telemedicine Appointments: Solo el dueño puede ver sus citas
CREATE POLICY "Users can view own appointments"
ON telemedicine_appointments
FOR SELECT
USING (
  registration_id IN (
    SELECT registration_id 
    FROM registrations 
    WHERE family_code = current_setting('app.current_family_code', true)
  )
);

-- Pharmacy Queries: Solo el dueño puede ver sus consultas
CREATE POLICY "Users can view own pharmacy queries"
ON pharmacy_queries
FOR SELECT
USING (
  registration_id IN (
    SELECT registration_id 
    FROM registrations 
    WHERE family_code = current_setting('app.current_family_code', true)
  )
);

-- Companion Calls: Solo el dueño puede ver su historial
CREATE POLICY "Users can view own companion calls"
ON companion_calls
FOR SELECT
USING (
  registration_id IN (
    SELECT registration_id 
    FROM registrations 
    WHERE family_code = current_setting('app.current_family_code', true)
  )
);

-- 3. POLÍTICAS DE INSERCIÓN (Para registro nuevo)
CREATE POLICY "Anyone can insert new registrations"
ON registrations
FOR INSERT
WITH CHECK (true);
-- Nota: Esto permite registros nuevos, pero solo el backend con SERVICE_KEY
-- debería poder modificar o eliminar

-- 4. POLÍTICAS DE ACTUALIZACIÓN (Solo backend)
CREATE POLICY "Service role can update registrations"
ON registrations
FOR UPDATE
USING (auth.role() = 'service_role');
```

#### Paso 2: Implementar context en cliente (20 min)

```typescript
// Crear: /lib/supabase-context.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function setSupabaseContext(family_code: string) {
  const supabase = createClientComponentClient()
  
  // Set context para RLS
  await supabase.rpc('set_family_code_context', {
    code: family_code
  })
}

// Crear función en Supabase:
```

```sql
-- En Supabase SQL Editor:
CREATE OR REPLACE FUNCTION set_family_code_context(code TEXT)
RETURNS void AS $$
BEGIN
  PERFORM set_config('app.current_family_code', code, true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### Paso 3: Usar en dashboard (10 min)

```typescript
// En /dashboard/page.tsx
import { setSupabaseContext } from '@/lib/supabase-context'

useEffect(() => {
  const sessionData = sessionStorage.getItem('registrationData')
  if (sessionData) {
    const { family_code } = JSON.parse(sessionData)
    setSupabaseContext(family_code)
  }
}, [])
```

**Verificación:**
```bash
# En browser console después de login:
supabase.from('registrations').select('*')
# Debe retornar SOLO tu registro, no todos
```

---

### V3. Square Credentials Security

**Problema Actual:**
- ACCESS_TOKEN en .env (correcto)
- Pero si .env alguna vez se committeó = expuesto públicamente

**Solución Inmediata:**

#### Paso 1: Verificar historial de Git (5 min)
```bash
cd /Users/fabiolafranco/Desktop/MVP-SaludCompartida

# Buscar .env en historial completo
git log --all --full-history --source --pretty=format:'%h %s' -- .env

# Si sale CUALQUIER cosa:
# ALERTA ROJA - .env se committeó antes
```

#### Paso 2: Si se expuso (60 min de gestión)

**A. Rotar Square Access Token INMEDIATAMENTE:**
1. Ir a: https://squareup.com/dashboard/account/credentials
2. Click "Regenerate" en Personal Access Token
3. Copiar nuevo token
4. Actualizar en Vercel:
   ```bash
   vercel env add SQUARE_ACCESS_TOKEN
   # Pegar nuevo token
   # Seleccionar: Production, Preview, Development
   ```
5. Redeploy:
   ```bash
   vercel --prod
   ```

**B. Rotar TODOS los otros secrets:**
- Supabase SERVICE_KEY (regenerar en Supabase settings)
- WATI API_TOKEN (regenerar en WATI settings)
- Resend API_KEY (regenerar en Resend settings)

**C. Limpiar historial de Git:**
```bash
# SOLO si .env se expuso:
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (¡cuidado!)
git push origin --force --all
```

#### Paso 3: Prevención Futura (10 min)

```bash
# Verificar .gitignore
cat .gitignore | grep .env
# Debe contener:
# .env
# .env.local
# .env*.local

# Añadir pre-commit hook para prevenir commits de .env
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
if git diff --cached --name-only | grep -E "^\.env"; then
  echo "ERROR: Intentaste commitear un archivo .env!"
  echo "Por seguridad, esto está bloqueado."
  exit 1
fi
EOF

chmod +x .git/hooks/pre-commit
```

---

### V1. Autenticación Persistente

**Problema Actual:**
- sessionStorage se borra al cerrar browser
- No hay login real
- Cualquiera puede ir a /dashboard

**Solución Temporal (1 hora) - Para Launch Mañana:**

#### Opción A: Auth con family_code (Simple)

```typescript
// Crear: /app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function LoginPage() {
  const [familyCode, setFamilyCode] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Buscar registro con este family_code
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('family_code', familyCode.toUpperCase())
        .eq('status', 'active')
        .single()

      if (error || !data) {
        setError('Código no válido o suscripción inactiva')
        return
      }

      // Guardar en sessionStorage
      sessionStorage.setItem('registrationData', JSON.stringify({
        registration_id: data.registration_id,
        family_code: data.family_code,
        migrant_first_name: data.migrant_first_name,
        family_first_name: data.family_first_name,
        companion_assigned: data.companion_assigned,
        migrant_phone_full: data.migrant_phone_full,
        family_phone_full: data.family_phone_full,
      }))

      // Guardar también en localStorage (persiste)
      localStorage.setItem('family_code', data.family_code)
      
      // Cookie httpOnly para seguridad adicional
      await fetch('/api/auth/set-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ family_code: data.family_code })
      })

      router.push('/dashboard')
    } catch (err) {
      setError('Error al validar código')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Iniciar Sesión</h1>
        <p className="text-gray-300 text-center mb-6">Ingresa tu código familiar</p>
        
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={familyCode}
            onChange={(e) => setFamilyCode(e.target.value.toUpperCase())}
            placeholder="ABC123"
            maxLength={6}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white text-center text-2xl tracking-widest uppercase mb-4"
            required
          />
          
          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}
          
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl"
          >
            Acceder
          </button>
        </form>
        
        <p className="text-gray-400 text-sm text-center mt-6">
          ¿No tienes código? <a href="/registro-jan" className="text-cyan-400 hover:underline">Regístrate aquí</a>
        </p>
      </div>
    </div>
  )
}
```

```typescript
// Crear: /app/api/auth/set-session/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const { family_code } = await req.json()
    
    // Set httpOnly cookie (más seguro que localStorage)
    cookies().set('auth_session', family_code, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 días
      path: '/'
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set session' }, { status: 500 })
  }
}
```

```typescript
// Crear: /middleware.ts (proteger rutas)
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('auth_session')
  
  // Proteger /dashboard y subrutas
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
```

**Verificación:**
1. Ir a /dashboard sin login → debe redirigir a /login
2. Login con código válido → debe permitir acceso
3. Cerrar browser y reabrir → debe seguir logueado (cookie persiste)

---

## 🟡 PRIORIDAD 2: ALTA (Hacer Pre-Launch - 3 horas)

### V6. Rate Limiting en APIs

**Problema:**
- APIs sin límites = spam, abuse, costos elevados

**Solución:**

#### Opción A: Vercel Edge Config (Recomendado)

```bash
# Instalar
npm install @vercel/edge-config
```

```typescript
// Crear: /lib/rate-limit.ts
import { get } from '@vercel/edge-config'

export async function rateLimit(identifier: string): Promise<boolean> {
  const key = `ratelimit:${identifier}`
  
  // Usar Edge Config para tracking
  const attempts = await get<number>(key) || 0
  
  if (attempts >= 10) {
    return false // Rate limited
  }
  
  // Incrementar contador (expire en 60 segundos)
  // Nota: Edge Config no soporta TTL, usar Upstash Redis para producción
  
  return true
}
```

#### Opción B: Upstash Redis (Más robusto)

```bash
# Instalar
npm install @upstash/redis @upstash/ratelimit
```

```typescript
// /lib/rate-limit.ts
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

const redis = Redis.fromEnv()

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests / 10 segundos
  analytics: true,
})

export async function checkRateLimit(identifier: string) {
  const { success, limit, remaining, reset } = await ratelimit.limit(identifier)
  
  return {
    allowed: success,
    limit,
    remaining,
    reset: new Date(reset),
  }
}
```

```typescript
// Usar en API routes:
// /app/api/send-notifications/route.ts
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  
  const { allowed, remaining } = await checkRateLimit(ip)
  
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Remaining': remaining.toString(),
        }
      }
    )
  }
  
  // Continuar con lógica normal...
}
```

**Setup Upstash:**
1. Ir a: https://upstash.com/
2. Create account (gratis hasta 10K requests/día)
3. Create Redis database
4. Copy `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`
5. Añadir a Vercel env variables

---

### V4. Validación Backend con Zod

**Problema:**
- Datos van directo a Supabase sin validación
- Posibles ataques de inyección

**Solución:**

```bash
npm install zod
```

```typescript
// Crear: /lib/validations.ts
import { z } from 'zod'

export const RegistrationSchema = z.object({
  // Migrante
  migrant_first_name: z.string()
    .min(2, 'Mínimo 2 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo letras'),
  
  migrant_last_name: z.string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
  
  migrant_mother_last_name: z.string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
  
  migrant_sex: z.enum(['M', 'F']),
  
  migrant_birthdate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato: YYYY-MM-DD'),
  
  migrant_phone: z.string()
    .regex(/^\d{10}$/, 'Debe ser 10 dígitos'),
  
  // Familiar
  family_first_name: z.string().min(2).max(50),
  family_last_name: z.string().min(2).max(50),
  family_mother_last_name: z.string().min(2).max(50),
  family_sex: z.enum(['M', 'F']),
  family_birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  family_phone: z.string().regex(/^\d{10}$/),
  
  // Otros
  terms_accepted: z.boolean().refine(val => val === true, {
    message: 'Debes aceptar los términos'
  }),
  
  family_code: z.string()
    .length(6, 'Debe ser exactamente 6 caracteres')
    .regex(/^[A-Z0-9]{6}$/, 'Solo mayúsculas y números'),
})

export type RegistrationData = z.infer<typeof RegistrationSchema>
```

```typescript
// Crear API para validar antes de insert:
// /app/api/registrations/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { RegistrationSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validar con Zod
    const parsed = RegistrationSchema.safeParse(body)
    
    if (!parsed.success) {
      return NextResponse.json(
        { 
          error: 'Datos inválidos',
          details: parsed.error.format()
        },
        { status: 400 }
      )
    }
    
    // Datos validados
    const validData = parsed.data
    
    // Insertar en Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY! // Usar SERVICE_KEY en backend
    )
    
    const { data, error } = await supabase
      .from('registrations')
      .insert(validData)
      .select()
      .single()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, data }, { status: 201 })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

```typescript
// Actualizar /registro-jan/page.tsx para usar API:
const handleFinalSubmit = async () => {
  try {
    const response = await fetch('/api/registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      alert(`Error: ${result.error}`)
      return
    }
    
    // Continuar con flujo normal...
  } catch (error) {
    console.error(error)
  }
}
```

---

## 🟢 PRIORIDAD 3: MEDIA (Post-Launch - Esta Semana)

### V8. Square Webhooks

**Beneficio:**
- Auto-actualizar status cuando pago se completa
- No depender de redirect del usuario

**Solución:**

```typescript
// Crear: /app/api/webhooks/square/route.ts
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-square-hmacsha256-signature')
    
    // Verificar signature (seguridad)
    const webhookSignatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY!
    const hmac = crypto.createHmac('sha256', webhookSignatureKey)
    const expectedSignature = hmac.update(body).digest('base64')
    
    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
    
    const event = JSON.parse(body)
    
    // Procesar evento: payment.created
    if (event.type === 'payment.created') {
      const payment = event.data.object.payment
      
      // Extraer registration_id del metadata
      const registrationId = payment.note || payment.reference_id
      
      if (registrationId) {
        // Actualizar status en Supabase
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_KEY!
        )
        
        await supabase
          .from('registrations')
          .update({ 
            status: 'active',
            payment_completed_at: new Date().toISOString()
          })
          .eq('registration_id', registrationId)
        
        // Enviar notificaciones
        await fetch(`${req.nextUrl.origin}/api/send-notifications`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ registration_id: registrationId })
        })
      }
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
```

**Configurar en Square:**
1. Ir a: https://squareup.com/dashboard/webhooks
2. Click "Create Webhook"
3. URL: `https://tudominio.com/api/webhooks/square`
4. Events: `payment.created`, `payment.updated`
5. Copy "Signature Key" → Añadir a Vercel como `SQUARE_WEBHOOK_SIGNATURE_KEY`

---

### V9. Sentry Error Tracking

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
```

**Setup:**
1. Crear cuenta: https://sentry.io/
2. Create project: Next.js
3. Copy DSN → Añadir a Vercel env

---

### V10. Assets Optimization

```bash
# Comprimir video
ffmpeg -i public/Video_Pagina_copy.mp4 \
  -vcodec h264 \
  -crf 28 \
  -preset slow \
  -vf scale=1280:-1 \
  public/Video_Pagina_compressed.mp4

# Reducir de 79MB a ~8MB
```

```typescript
// Actualizar landing-jan/page.tsx:
<video 
  src="/Video_Pagina_compressed.mp4"
  poster="/video-poster.jpg" // Añadir poster para carga rápida
  loading="lazy"
/>
```

---

## 📊 RESUMEN DE IMPLEMENTACIÓN

| Vulnerabilidad | Tiempo | Costo | Impacto | Status |
|----------------|--------|-------|---------|--------|
| V2 RLS Supabase | 45 min | $0 | 🔴 CRÍTICO | ⏳ PENDIENTE |
| V3 Square Security | 1h | $0 | 🔴 CRÍTICO | ⏳ PENDIENTE |
| V1 Auth Persistente | 1h | $0 | 🔴 CRÍTICO | ⏳ PENDIENTE |
| V6 Rate Limiting | 1h | $0-10/mes | 🟡 ALTO | ⏳ PENDIENTE |
| V4 Validación Zod | 1.5h | $0 | 🟡 ALTO | ⏳ PENDIENTE |
| V8 Square Webhooks | 1h | $0 | 🟢 MEDIO | Post-launch |
| V9 Sentry | 30 min | $0-26/mes | 🟢 MEDIO | Post-launch |
| V10 Asset Opt | 30 min | $0 | 🟢 BAJO | Post-launch |

**Total tiempo crítico:** ~3 horas
**Total tiempo recomendado:** ~6 horas

---

## ✅ CHECKLIST DE SEGURIDAD

### Antes del Launch (HOY):
- [ ] Habilitar RLS en Supabase (45 min)
- [ ] Verificar .env NO en GitHub (5 min)
- [ ] Implementar login con family_code (1h)
- [ ] Proteger /dashboard con middleware (15 min)
- [ ] Rate limiting básico en /api/* (1h)

### Post-Launch (Esta Semana):
- [ ] Validación Zod en todos los forms (1.5h)
- [ ] Square webhooks (1h)
- [ ] Sentry error tracking (30 min)
- [ ] Comprimir assets (30 min)

---

**Plan creado:** January 29, 2026 - 12:15 PM
**Owner:** Fabiola Franco
**Deadline Crítico:** January 29, 2026 - 8:00 PM (antes de dormir)
**Deadline Launch:** January 30, 2026 - 12:00 PM

🔒 **Objetivo:** Sistema 100% seguro antes del launch público
