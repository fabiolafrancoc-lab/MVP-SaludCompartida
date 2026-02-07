import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// ════════════════════════════════════════════════════════════════════════════
// ENDPOINT: /api/diagnostics
// ════════════════════════════════════════════════════════════════════════════
// Diagnóstico 360° de todos los sistemas: Square, Supabase, Resend (Email)
// Acceso: GET /api/diagnostics
// ════════════════════════════════════════════════════════════════════════════

export async function GET() {
  const startTime = Date.now();

  const results = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    overall_status: 'checking' as string,
    systems: {
      square: {} as Record<string, unknown>,
      supabase: {} as Record<string, unknown>,
      resend: {} as Record<string, unknown>,
    },
    env_variables: {} as Record<string, string>,
    recommendations: [] as string[],
    duration_ms: 0,
  };

  // ════════════════════════════════════════════════════════════════════
  // 1️⃣ CHECK ENVIRONMENT VARIABLES
  // ════════════════════════════════════════════════════════════════════
  const envChecks: Record<string, string | undefined> = {
    SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN,
    SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID,
    NEXT_PUBLIC_SQUARE_APP_ID: process.env.NEXT_PUBLIC_SQUARE_APP_ID,
    NEXT_PUBLIC_SQUARE_LOCATION_ID: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
    SUPABASE_URL: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  };

  for (const [key, value] of Object.entries(envChecks)) {
    if (value) {
      // Mask sensitive values, show just first few chars
      if (key.includes('KEY') || key.includes('TOKEN') || key.includes('SECRET')) {
        results.env_variables[key] = `✅ Configurado (${value.substring(0, 8)}...)`;
      } else {
        results.env_variables[key] = `✅ ${value}`;
      }
    } else {
      results.env_variables[key] = '❌ NO CONFIGURADO';
      results.recommendations.push(`Falta variable de entorno: ${key}`);
    }
  }

  // ════════════════════════════════════════════════════════════════════
  // 2️⃣ TEST SQUARE CONNECTIVITY
  // ════════════════════════════════════════════════════════════════════
  const squareToken = process.env.SQUARE_ACCESS_TOKEN;
  const squareLocationId = process.env.SQUARE_LOCATION_ID;

  if (squareToken) {
    try {
      const squareResponse = await fetch('https://connect.squareup.com/v2/locations', {
        headers: {
          'Square-Version': '2024-12-18',
          'Authorization': `Bearer ${squareToken}`,
        },
      });

      const squareData = await squareResponse.json();

      if (squareResponse.ok) {
        const locations = squareData.locations || [];
        const currentLocation = locations.find((l: any) => l.id === squareLocationId);

        results.systems.square = {
          status: '✅ CONECTADO',
          mode: squareToken.startsWith('EAAAE') ? '⚠️ SANDBOX' : '✅ PRODUCCIÓN',
          total_locations: locations.length,
          current_location: currentLocation ? {
            id: currentLocation.id,
            name: currentLocation.name,
            status: currentLocation.status,
            country: currentLocation.country,
            currency: currentLocation.currency,
          } : '❌ Location ID no encontrado en las locations disponibles',
          location_ids_match: squareLocationId === process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
            ? '✅ Coinciden' : '⚠️ SQUARE_LOCATION_ID y NEXT_PUBLIC_SQUARE_LOCATION_ID no coinciden',
          available_locations: locations.map((l: any) => ({
            id: l.id,
            name: l.name,
            status: l.status,
          })),
        };

        if (squareToken.startsWith('EAAAE')) {
          results.recommendations.push('Square está en modo SANDBOX. Cambia a producción para cobros reales.');
        }
        if (!currentLocation) {
          results.recommendations.push(`SQUARE_LOCATION_ID "${squareLocationId}" no coincide con ninguna location. Verifica el ID.`);
        }
      } else {
        results.systems.square = {
          status: '❌ ERROR DE AUTENTICACIÓN',
          error: squareData.errors?.[0]?.detail || 'Token inválido o expirado',
          http_status: squareResponse.status,
        };
        results.recommendations.push('El token de Square es inválido o expirado. Regenera el token en Square Dashboard.');
      }
    } catch (error: any) {
      results.systems.square = {
        status: '❌ ERROR DE CONEXIÓN',
        error: error.message,
      };
      results.recommendations.push('No se pudo conectar con Square API. Verifica la conexión de red.');
    }
  } else {
    results.systems.square = {
      status: '❌ NO CONFIGURADO',
      error: 'Falta SQUARE_ACCESS_TOKEN',
    };
    results.recommendations.push('Configura SQUARE_ACCESS_TOKEN en las variables de entorno.');
  }

  // ════════════════════════════════════════════════════════════════════
  // 3️⃣ TEST SUPABASE CONNECTIVITY
  // ════════════════════════════════════════════════════════════════════
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    || process.env.SUPABASE_SERVICE_KEY
    || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      // Test basic connectivity by querying registrations count
      const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/registrations?select=id&limit=1`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'count=exact',
        },
      });

      const keyType = process.env.SUPABASE_SERVICE_ROLE_KEY
        ? 'service_role'
        : process.env.SUPABASE_SERVICE_KEY
          ? 'service_key (legacy)'
          : 'anon_key (⚠️ permisos limitados)';

      if (supabaseResponse.ok) {
        const countHeader = supabaseResponse.headers.get('content-range');
        const totalCount = countHeader ? countHeader.split('/')[1] : 'desconocido';

        // Check table schemas
        const tablesCheck: Record<string, string> = {};
        const tablesToCheck = ['registrations', 'family_members', 'square_customers', 'square_subscriptions', 'square_payments'];

        for (const table of tablesToCheck) {
          try {
            const tableResponse = await fetch(`${supabaseUrl}/rest/v1/${table}?select=*&limit=0`, {
              headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
              },
            });
            tablesCheck[table] = tableResponse.ok ? '✅ Existe' : `❌ Error: ${tableResponse.status}`;
          } catch {
            tablesCheck[table] = '❌ Error de conexión';
          }
        }

        // Check recent registrations for data quality
        let recentRegistrations: any[] = [];
        try {
          const recentResponse = await fetch(
            `${supabaseUrl}/rest/v1/registrations?select=id,migrant_first_name,migrant_email,family_code,status,created_at&order=created_at.desc&limit=5`,
            {
              headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
              },
            }
          );
          if (recentResponse.ok) {
            recentRegistrations = await recentResponse.json();
          }
        } catch {
          // Non-critical, continue
        }

        // Check for data quality issues
        const dataIssues: string[] = [];
        for (const reg of recentRegistrations) {
          if (!reg.migrant_email) dataIssues.push(`Registro ${reg.id}: falta migrant_email`);
          if (!reg.family_code) dataIssues.push(`Registro ${reg.id}: falta family_code`);
          if (!reg.migrant_first_name) dataIssues.push(`Registro ${reg.id}: falta migrant_first_name`);
        }

        results.systems.supabase = {
          status: '✅ CONECTADO',
          key_type: keyType,
          total_registrations: totalCount,
          tables: tablesCheck,
          recent_registrations: recentRegistrations.map((r: any) => ({
            id: r.id,
            migrant: r.migrant_first_name || '⚠️ SIN NOMBRE',
            email: r.migrant_email || '⚠️ SIN EMAIL',
            family_code: r.family_code || '⚠️ SIN CÓDIGO',
            status: r.status,
            created: r.created_at,
          })),
          data_quality_issues: dataIssues.length > 0 ? dataIssues : '✅ Sin problemas detectados',
        };

        if (keyType.includes('anon_key')) {
          results.recommendations.push('Supabase usa anon_key. Configura SUPABASE_SERVICE_ROLE_KEY para acceso completo.');
        }
        if (dataIssues.length > 0) {
          results.recommendations.push(`Hay ${dataIssues.length} registros con datos incompletos en Supabase.`);
        }
      } else {
        const errorData = await supabaseResponse.text();
        results.systems.supabase = {
          status: '❌ ERROR DE CONEXIÓN',
          key_type: keyType,
          http_status: supabaseResponse.status,
          error: errorData.substring(0, 200),
        };
        results.recommendations.push('Supabase no respondió correctamente. Verifica URL y API key.');
      }
    } catch (error: any) {
      results.systems.supabase = {
        status: '❌ ERROR',
        error: error.message,
      };
      results.recommendations.push('No se pudo conectar con Supabase. Verifica la URL.');
    }
  } else {
    results.systems.supabase = {
      status: '❌ NO CONFIGURADO',
      error: 'Falta SUPABASE_URL o SUPABASE_KEY',
    };
    results.recommendations.push('Configura las variables de Supabase en el entorno.');
  }

  // ════════════════════════════════════════════════════════════════════
  // 4️⃣ TEST RESEND (EMAIL) CONNECTIVITY
  // ════════════════════════════════════════════════════════════════════
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@saludcompartida.app';

  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);

      // Check API key validity by listing domains
      const { data: domains, error: domainError } = await resend.domains.list();

      if (domainError) {
        results.systems.resend = {
          status: '❌ ERROR DE API KEY',
          error: domainError.message,
          from_email: fromEmail,
        };
        results.recommendations.push('La API key de Resend es inválida. Verifica en resend.com/api-keys.');
      } else {
        const verifiedDomains = domains?.data?.filter((d: any) => d.status === 'verified') || [];
        const fromDomain = fromEmail.split('@')[1];
        const isDomainVerified = verifiedDomains.some((d: any) => d.name === fromDomain);

        results.systems.resend = {
          status: isDomainVerified ? '✅ CONECTADO Y VERIFICADO' : '⚠️ CONECTADO PERO DOMINIO NO VERIFICADO',
          from_email: fromEmail,
          from_domain: fromDomain,
          domain_verified: isDomainVerified ? '✅ Sí' : `❌ No - El dominio "${fromDomain}" no está verificado en Resend`,
          verified_domains: verifiedDomains.map((d: any) => ({
            name: d.name,
            status: d.status,
          })),
          all_domains: domains?.data?.map((d: any) => ({
            name: d.name,
            status: d.status,
          })),
        };

        if (!isDomainVerified) {
          results.recommendations.push(
            `El dominio "${fromDomain}" no está verificado en Resend. ` +
            `Los emails no se enviarán. Verifica el dominio en resend.com o cambia RESEND_FROM_EMAIL.`
          );
        }
      }
    } catch (error: any) {
      results.systems.resend = {
        status: '❌ ERROR',
        error: error.message,
        from_email: fromEmail,
      };
      results.recommendations.push('Error conectando con Resend API.');
    }
  } else {
    results.systems.resend = {
      status: '❌ NO CONFIGURADO',
      error: 'Falta RESEND_API_KEY',
      from_email: fromEmail,
    };
    results.recommendations.push('Configura RESEND_API_KEY para enviar emails.');
  }

  // ════════════════════════════════════════════════════════════════════
  // 5️⃣ OVERALL STATUS
  // ════════════════════════════════════════════════════════════════════
  const squareOk = (results.systems.square as any).status?.includes('✅');
  const supabaseOk = (results.systems.supabase as any).status?.includes('✅');
  const resendOk = (results.systems.resend as any).status?.includes('✅');

  if (squareOk && supabaseOk && resendOk) {
    results.overall_status = '✅ TODOS LOS SISTEMAS FUNCIONANDO';
  } else if (!squareOk && !supabaseOk && !resendOk) {
    results.overall_status = '🔴 TODOS LOS SISTEMAS CAÍDOS';
  } else {
    const working = [squareOk && 'Square', supabaseOk && 'Supabase', resendOk && 'Resend'].filter(Boolean);
    const failing = [!squareOk && 'Square', !supabaseOk && 'Supabase', !resendOk && 'Resend'].filter(Boolean);
    results.overall_status = `⚠️ PARCIAL - Funcionando: ${working.join(', ')} | Fallando: ${failing.join(', ')}`;
  }

  results.duration_ms = Date.now() - startTime;

  return NextResponse.json(results, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
