import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://7424291d4047ffdeba57b9d6d9665ad9@o4510726860177408.ingest.us.sentry.io/4510727032406016",
  
  // Performance Monitoring para APIs
  tracesSampleRate: 0.1, // 10% de requests en producción
  
  environment: process.env.NODE_ENV || 'production',
  
  // Capturar errores de APIs
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
  ],
  
  beforeSend(event, hint) {
    // No enviar información sensible
    if (event.request) {
      delete event.request.cookies;
      if (event.request.data) {
        // Enmascarar campos sensibles
        const sensitiveFields = ['password', 'token', 'apiKey', 'access_token'];
        sensitiveFields.forEach(field => {
          if (event.request.data[field]) {
            event.request.data[field] = '[REDACTED]';
          }
        });
      }
    }
    return event;
  },
});

// Helper para capturar errores en API routes
export const captureAPIError = (error, context = {}) => {
  Sentry.withScope((scope) => {
    Object.keys(context).forEach(key => {
      scope.setContext(key, context[key]);
    });
    Sentry.captureException(error);
  });
};

export default Sentry;
