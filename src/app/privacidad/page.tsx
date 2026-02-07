'use client';

export default function PrivacidadPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827', color: '#fff', fontFamily: '"Plus Jakarta Sans", sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <img src="/saludcompartida-dark-no-tagline.png" alt="SaludCompartida" style={{ height: '40px', marginBottom: '32px' }} />
        
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>Política de Privacidad</h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>Última actualización: Febrero 2026</p>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#EC4899' }}>1. Información que Recopilamos</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
            Recopilamos la siguiente información:
          </p>
          <ul style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)', paddingLeft: '20px' }}>
            <li><strong>Información personal:</strong> Nombre, apellido, correo electrónico, número de teléfono</li>
            <li><strong>Información de pago:</strong> Procesada de forma segura por Stripe (no almacenamos datos de tarjetas)</li>
            <li><strong>Información de salud:</strong> Historial de consultas, síntomas reportados, sesiones de terapia</li>
            <li><strong>Información de uso:</strong> Servicios utilizados, fechas de acceso, interacciones con Lupita/Fernanda</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#EC4899' }}>2. Cómo Usamos tu Información</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
            Utilizamos tu información para:
          </p>
          <ul style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)', paddingLeft: '20px' }}>
            <li>Proveer y mejorar nuestros servicios de salud</li>
            <li>Conectarte con doctores y terapeutas</li>
            <li>Procesar tus pagos y gestionar tu membresía</li>
            <li>Enviarte recordatorios de citas y sesiones</li>
            <li>Calcular y mostrar tus ahorros</li>
            <li>Personalizar tu experiencia con Lupita/Fernanda</li>
            <li>Comunicarnos contigo sobre tu cuenta</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#EC4899' }}>3. Protección de tu Información</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)' }}>
            Implementamos medidas de seguridad estrictas para proteger tu información personal y de salud. Esto incluye: encriptación SSL/TLS, almacenamiento seguro en Supabase, acceso restringido solo a personal autorizado, y cumplimiento con HIPAA (Health Insurance Portability and Accountability Act).
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#EC4899' }}>4. Compartir tu Información</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
            NO vendemos tu información personal. Solo compartimos tu información con:
          </p>
          <ul style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)', paddingLeft: '20px' }}>
            <li><strong>Proveedores de salud:</strong> Doctores y terapeutas que te atienden</li>
            <li><strong>Procesadores de pago:</strong> Stripe para procesar transacciones</li>
            <li><strong>Proveedores de infraestructura:</strong> Supabase (base de datos), Vercel (hosting)</li>
            <li><strong>Autoridades legales:</strong> Solo si es requerido por ley</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#EC4899' }}>5. Tus Derechos</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
            Tienes derecho a:
          </p>
          <ul style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)', paddingLeft: '20px' }}>
            <li>Acceder a tu información personal</li>
            <li>Corregir información incorrecta</li>
            <li>Solicitar la eliminación de tu cuenta</li>
            <li>Exportar tus datos</li>
            <li>Optar por no recibir comunicaciones de marketing</li>
          </ul>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)', marginTop: '12px' }}>
            Para ejercer estos derechos, contáctanos en <a href="mailto:privacy@saludcompartida.com" style={{ color: '#EC4899', textDecoration: 'underline' }}>privacy@saludcompartida.com</a>
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#EC4899' }}>6. Cookies y Tecnologías de Seguimiento</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)' }}>
            Utilizamos cookies esenciales para el funcionamiento del sitio (autenticación, preferencias). No utilizamos cookies de terceros para publicidad.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#EC4899' }}>7. Retención de Datos</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)' }}>
            Mantenemos tu información mientras tu cuenta esté activa. Si cancelas tu membresía, conservamos cierta información por requisitos legales (registros médicos por 7 años, información de pago por 5 años).
          </p>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#EC4899' }}>8. Contacto</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)' }}>
            Para preguntas sobre privacidad, contáctanos en: <a href="mailto:privacy@saludcompartida.com" style={{ color: '#EC4899', textDecoration: 'underline' }}>privacy@saludcompartida.com</a>
          </p>
        </section>

        <div style={{ textAlign: 'center', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button 
            onClick={() => window.history.back()} 
            aria-label="Volver a la página anterior"
            style={{ 
              color: '#EC4899', 
              textDecoration: 'none', 
              fontSize: '14px', 
              fontWeight: '600',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            ← Volver
          </button>
        </div>
      </div>
    </div>
  );
}
