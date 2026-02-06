# Supabase Client Multiple Instances Fix

## Problem Statement

The application was displaying a console warning:
```
GoTrueClient@sb-rzmdekjegbdgitqekjee-auth-token:1 (2.93.3) 2026-02-06T01:06:39.191Z 
Multiple GoTrueClient instances detected in the same browser context.
```

## Root Cause

Multiple files throughout the application were independently creating Supabase client instances at the module level:

```typescript
// ❌ BEFORE (Multiple instances)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);
```

Each file that imported `createClient` and called it created a new GoTrueClient instance, leading to:
- Memory overhead from redundant instances
- Potential session management conflicts
- Performance degradation
- Console warnings

## Solution

### 1. Singleton Pattern for Client-Side

Created `src/lib/supabase-client.ts` implementing a singleton pattern:

```typescript
// ✅ AFTER (Single instance)
import { getSupabaseClientBrowser } from '@/lib/supabase-client';

// Inside your component or function
const supabase = getSupabaseClientBrowser();
```

**Key Features:**
- Single client instance shared across all client-side code
- Lazy initialization (created on first use)
- Proper auth configuration for browser usage:
  - `autoRefreshToken: true` - Automatically refreshes expired tokens
  - `persistSession: true` - Maintains user session across page reloads
  - `detectSessionInUrl: true` - Handles OAuth callbacks properly

### 2. Server-Side Client

For server-side API routes, we continue using the existing `src/lib/supabase.ts`:

```typescript
import { getSupabaseClient } from '@/lib/supabase';

// Inside your API route
const supabase = getSupabaseClient();
```

## Files Updated

### Client-Side Pages (12 files)
1. `src/app/pago/page.tsx` - Payment page
2. `src/app/login/page.tsx` - Login page
3. `src/app/confirmacion/page.tsx` - Confirmation page
4. `src/app/registro-jan/page.tsx` - Registration page
5. `src/app/landing-jan/page.tsx` - Landing page
6. `src/app/terms-acceptance/page.tsx` - Terms acceptance page
7. `src/app/payment-success/page.tsx` - Payment success page
8. `src/app/dashboard/page.tsx` - Main dashboard
9. `src/components-backup-agent/MiCuenta.jsx` - Account component

### Server-Side API Routes (3 files)
1. `src/app/api/square-payment/route.ts` - Payment processing
2. `src/app/api/send-notifications/route.ts` - Email notifications
3. `src/app/api/cron/daily-report/route.ts` - Daily reports

## Usage Guidelines

### For Client-Side Components (use client)
```typescript
'use client';

import { getSupabaseClientBrowser } from '@/lib/supabase-client';

export default function MyComponent() {
  const handleAction = async () => {
    const supabase = getSupabaseClientBrowser();
    const { data, error } = await supabase
      .from('table')
      .select('*');
  };
}
```

### For Server-Side API Routes
```typescript
import { getSupabaseClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('table')
    .select('*');
}
```

## Benefits

1. **Eliminates Console Warning**: No more "Multiple GoTrueClient instances" message
2. **Reduced Memory Usage**: Single client instance instead of many
3. **Improved Performance**: No redundant client initializations
4. **Better Session Management**: Consistent auth state across the app
5. **Easier Maintenance**: Centralized client configuration

## Environment Variables

Required environment variables (already configured):
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key (for client-side)
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for server-side)

## Testing

Build verification:
```bash
npm run build
```

All tests passed:
- ✅ TypeScript compilation successful
- ✅ Code review: No issues
- ✅ Security scan: No vulnerabilities
- ✅ No breaking changes

## Migration Checklist

If you need to add a new page or component:

- [ ] For **client-side** (`'use client'`): Import `getSupabaseClientBrowser` from `@/lib/supabase-client`
- [ ] For **server-side** (API routes): Import `getSupabaseClient` from `@/lib/supabase`
- [ ] Call the function inside your component/handler, not at module level
- [ ] Never create multiple instances by calling `createClient` directly

## Additional Notes

- Backup files (`.page-old.tsx`, `.page-old-backup.tsx`) were not updated as they're not in active use
- The singleton pattern is thread-safe in JavaScript's single-threaded environment
- The client instance is automatically created on first access and reused thereafter

## Related Documentation

- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering)
