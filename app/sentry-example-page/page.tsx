"use client";

import * as Sentry from "@sentry/nextjs";

export default function SentryExamplePage() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      gap: '20px',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Sentry Test Page</h1>
      
      <button
        type="button"
        style={{
          padding: '12px 24px',
          backgroundColor: '#5B21B6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          cursor: 'pointer',
          fontWeight: '600'
        }}
        onClick={() => {
          // This will trigger a test error in Sentry
          Sentry.captureException(new Error("🧪 Sentry Test Error - Sistema funcionando correctamente"));
        }}
      >
        Enviar Error de Prueba a Sentry
      </button>

      <button
        type="button"
        style={{
          padding: '12px 24px',
          backgroundColor: '#DC2626',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          cursor: 'pointer',
          fontWeight: '600'
        }}
        onClick={() => {
          // This will throw an actual undefined function error
          // @ts-ignore
          myUndefinedFunction();
        }}
      >
        Trigger Undefined Function Error
      </button>

      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#F3F4F6', 
        borderRadius: '8px',
        maxWidth: '600px'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '10px' }}>
          Instrucciones:
        </h2>
        <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>Haz clic en cualquiera de los botones arriba</li>
          <li>Ve a tu dashboard de Sentry (sentry.io)</li>
          <li>Verifica que el error aparezca en "Issues"</li>
          <li>Esto confirma que Sentry está capturando errores correctamente</li>
        </ol>
      </div>

      <a 
        href="https://saludcompartida.sentry.io/issues/" 
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#10B981',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: '500'
        }}
      >
        Ver Sentry Dashboard →
      </a>
    </div>
  );
}
