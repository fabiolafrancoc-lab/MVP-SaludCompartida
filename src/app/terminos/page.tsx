'use client';

export default function TerminosPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827', color: '#fff', fontFamily: '"Plus Jakarta Sans", sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <img src="/saludcompartida-dark-no-tagline.png" alt="SaludCompartida" style={{ height: '40px', marginBottom: '32px' }} />
        
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>Términos y Condiciones</h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>Última actualización: Febrero 2026</p>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#06B6D4' }}>1. Aceptación de los Términos</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)' }}>
            Al acceder y utilizar los servicios de SaludCompartida, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#06B6D4' }}>2. Descripción del Servicio</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
            SaludCompartida ofrece los siguientes servicios:
          </p>
          <ul style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)', paddingLeft: '20px' }}>
            <li>Telemedicina 24/7 con doctores certificados</li>
            <li>Descuentos en farmacias (hasta 75% en medicamentos)</li>
            <li>Sesiones de terapia psicológica semanal</li>
            <li>Acompañamiento con Lupita/Fernanda (asistente virtual)</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#06B6D4' }}>3. Membresía y Pago</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)' }}>
            La membresía tiene un costo mensual de $12-18 USD, dependiendo del plan seleccionado. El pago se realiza a través de Stripe. La suscripción se renueva automáticamente cada mes hasta que sea cancelada.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#06B6D4' }}>4. Política de Cancelación</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)' }}>
            Puedes cancelar tu membresía en cualquier momento desde tu cuenta. La cancelación será efectiva al final del período de facturación actual. No ofrecemos reembolsos por períodos parciales.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#06B6D4' }}>5. Uso Apropiado</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)' }}>
            Los servicios de SaludCompartida son para uso personal y familiar. No está permitido: compartir tu cuenta con terceros no autorizados, usar los servicios para fines comerciales, o abusar de los servicios (consultas ilimitadas no significa uso fraudulento).
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#06B6D4' }}>6. Limitación de Responsabilidad</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)' }}>
            SaludCompartida actúa como intermediario entre tú y los proveedores de servicios de salud. No somos responsables por diagnósticos médicos, tratamientos o decisiones clínicas. Siempre consulta con un profesional de la salud para emergencias médicas.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#06B6D4' }}>7. Privacidad</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)' }}>
            Tu privacidad es importante para nosotros. Lee nuestra <a href="/privacidad" style={{ color: '#06B6D4', textDecoration: 'underline' }}>Política de Privacidad</a> para entender cómo recopilamos, usamos y protegemos tu información personal.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#06B6D4' }}>8. Modificaciones</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)' }}>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos de cambios significativos por correo electrónico. El uso continuado de los servicios después de los cambios constituye tu aceptación de los nuevos términos.
          </p>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#06B6D4' }}>9. Contacto</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)' }}>
            Para preguntas sobre estos términos, contáctanos en: <a href="mailto:contact@saludcompartida.com" style={{ color: '#06B6D4', textDecoration: 'underline' }}>contact@saludcompartida.com</a>
          </p>
        </section>

        <div style={{ textAlign: 'center', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <a href="/dashboard" style={{ color: '#06B6D4', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>← Volver al Dashboard</a>
        </div>
      </div>
    </div>
  );
}
