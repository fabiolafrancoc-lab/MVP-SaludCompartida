import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://7424291d4047ffdeba57b9d6d9665ad9@o4510726860177408.ingest.us.sentry.io/4510727032406016",
  
  // Performance Monitoring
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0, // Captura 100% de las transacciones (reduce en producción a 0.1-0.2)
  
  // Release tracking
  release: `salud-compartida@${process.env.VITE_APP_VERSION || '1.0.0'}`,
  environment: process.env.NODE_ENV || 'production',
  
  // Error filtering
  ignoreErrors: [
    // Errores comunes del navegador que no son críticos
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
  ],
  
  beforeSend(event, hint) {
    // Filtrar información sensible
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers;
    }
    return event;
  },
});
