'use client';

import { useState } from 'react';

export default function TerminosPrivacidad({ initialTab = 0 }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#111827',
      color: '#fff',
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      padding: '24px 16px',
      maxWidth: 430,
      margin: '0 auto'
    }}>
      
      {/* Header con logo */}
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <img 
          src="/saludcompartida-dark-no-tagline.png" 
          alt="SaludCompartida" 
          style={{ height: 40, marginBottom: 16 }}
        />
      </div>

      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: 8, 
        marginBottom: 32,
        background: 'rgba(255,255,255,0.04)',
        padding: 4,
        borderRadius: 12
      }}>
        <button
          onClick={() => setActiveTab(0)}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: 8,
            border: 'none',
            background: activeTab === 0 
              ? 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(236,72,153,0.1))' 
              : 'transparent',
            color: activeTab === 0 ? '#06B6D4' : 'rgba(255,255,255,0.6)',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Términos y Condiciones
        </button>
        <button
          onClick={() => setActiveTab(1)}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: 8,
            border: 'none',
            background: activeTab === 1 
              ? 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.1))' 
              : 'transparent',
            color: activeTab === 1 ? '#8B5CF6' : 'rgba(255,255,255,0.6)',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Privacidad
        </button>
      </div>

      {/* Tab 0: Términos y Condiciones */}
      {activeTab === 0 && (
        <div style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
          <h1 style={{ 
            fontFamily: '"DM Serif Display", serif', 
            fontSize: 28, 
            marginBottom: 24,
            color: '#06B6D4'
          }}>
            Términos y Condiciones
          </h1>

          <Section title="1. ¿Qué es SaludCompartida?">
            <p>SaludCompartida es una <strong>plataforma electrónica</strong> donde puedes contratar servicios de salud para tu familia en México desde Estados Unidos.</p>
            <p style={{ marginTop: 12 }}>🚨 <strong>Importante:</strong></p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>NO somos un seguro médico</li>
              <li>NO somos responsables por las empresas que prestan los servicios</li>
              <li>Somos una plataforma que te conecta con doctores, farmacias y psicólogos en México</li>
            </ul>
          </Section>

          <Section title="2. Lupita y Fernanda — tu compañía">
            <p><strong>Lupita y Fernanda</strong> son tecnología de inteligencia artificial propiedad de SaludCompartida.</p>
            <p style={{ marginTop: 12 }}>Ellas están para acompañar a tu familia cuando tú no estás, pero:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>NO son doctoras</li>
              <li>NO diagnostican</li>
              <li>NO recetan medicamentos</li>
              <li>Te escuchan, te acompañan y te ayudan a encontrar los servicios que necesitas</li>
            </ul>
          </Section>

          <Section title="3. ¿Qué incluye tu suscripción?">
            <ol style={{ paddingLeft: 20 }}>
              <li><strong>Consultas médicas ilimitadas</strong> por videollamada con doctores en México</li>
              <li><strong>Descuentos en farmacias</strong> de hasta 60% en medicamentos</li>
              <li><strong>1 sesión de psicología por semana</strong> para una persona de tu familia</li>
              <li><strong>Compañía de Lupita o Fernanda</strong> por WhatsApp cuando tu familia lo necesite</li>
              <li><strong>Hasta 4 personas</strong> de tu familia pueden usar todo (tú incluido si vives en México)</li>
            </ol>
          </Section>

          <Section title="4. ¿Qué NO incluye?">
            <p style={{ color: '#F59E0B', fontWeight: 600 }}>⚠️ SaludCompartida NO cubre:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>Emergencias (llama al 911 en México)</li>
              <li>Hospitalización ni cirugías</li>
              <li>Medicamentos controlados (solo con receta de tu doctor presencial)</li>
              <li>Exámenes de laboratorio o estudios (rayos X, tomografías, etc.)</li>
              <li>Enfermedades que requieren atención presencial inmediata</li>
            </ul>
          </Section>

          <Section title="5. ¿Cuánto cuesta?">
            <p>💵 <strong>$12-18 dólares al mes</strong>, pagado desde Estados Unidos con tarjeta de crédito o débito.</p>
            <ul style={{ paddingLeft: 20, marginTop: 12 }}>
              <li>Incluye hasta <strong>4 personas</strong></li>
              <li>Puedes cancelar cuando quieras, sin penalización</li>
              <li>Si cancelas, tu familia puede seguir usando los servicios hasta que termine el mes pagado</li>
            </ul>
          </Section>

          <Section title="6. Consultas médicas — lo que debes saber">
            <ul style={{ paddingLeft: 20 }}>
              <li>Los doctores están <strong>titulados en México</strong> y con cédula profesional vigente</li>
              <li>La consulta es por <strong>videollamada</strong>, no presencial</li>
              <li>El doctor puede darte una <strong>receta electrónica</strong> si lo considera necesario</li>
              <li>La telemedicina tiene limitaciones: si tu familiar necesita verlo en persona, el doctor se lo dirá</li>
              <li>La consulta <strong>NO reemplaza</strong> la atención médica presencial en casos graves</li>
            </ul>
          </Section>

          <Section title="7. Descuentos en farmacias — cómo funcionan">
            <ul style={{ paddingLeft: 20 }}>
              <li>Recibes una <strong>tarjeta digital</strong> con tu código familiar</li>
              <li>Tu familia muestra el código en farmacias afiliadas en México</li>
              <li>El descuento lo aplica la farmacia directamente</li>
              <li>Tú pagas el medicamento con el descuento aplicado</li>
              <li>No todos los medicamentos tienen descuento (depende de la farmacia)</li>
            </ul>
          </Section>

          <Section title="8. Psicología — reglas importantes">
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>1 sesión por semana</strong> para 1 persona de tu familia</li>
              <li>Cada sesión dura <strong>50 minutos</strong></li>
              <li>Los psicólogos están titulados en México</li>
              <li>La terapia es confidencial (nadie más sabe lo que hablan)</li>
              <li>El psicólogo <strong>NO puede recetar medicamentos</strong> (solo un psiquiatra puede hacerlo)</li>
            </ul>
          </Section>

          <Section title="9. ¿Quién puede usar SaludCompartida?">
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>Tú:</strong> Migrante en Estados Unidos que paga la suscripción</li>
              <li><strong>Tu familia en México:</strong> Hasta 3 familiares adicionales (total 4 personas)</li>
              <li>Si tú vives en México, también puedes usar los servicios</li>
              <li>Los menores de edad necesitan autorización de un adulto</li>
            </ul>
          </Section>

          <Section title="10. Tus responsabilidades">
            <p>Al usar SaludCompartida, te comprometes a:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>Dar información verdadera sobre tu salud y la de tu familia</li>
              <li>NO compartir tu código de acceso con personas que no sean tu familia</li>
              <li>Usar los servicios de buena fe (no abusar ni hacer fraude)</li>
              <li>Pagar tu suscripción a tiempo</li>
            </ul>
          </Section>

          <Section title="11. Testimoniales — tu historia puede inspirar">
            <p>A veces publicamos historias de éxito en nuestra app o redes sociales.</p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li><strong>NUNCA mostramos tu nombre completo</strong> sin tu permiso</li>
              <li>Usamos solo tu ubicación (por ejemplo: "Migrante en California")</li>
              <li>Si no quieres que usemos tu historia, solo dilo y no la publicamos</li>
            </ul>
          </Section>

          <Section title="12. Cambios en estos términos">
            <p>Podemos actualizar estos términos cuando sea necesario.</p>
            <p style={{ marginTop: 8 }}>Si hacemos cambios importantes, te avisamos por:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>La app</li>
              <li>WhatsApp</li>
              <li>Email</li>
            </ul>
          </Section>

          <Section title="13. Limitaciones — lo que debes entender">
            <p>SaludCompartida hace su mejor esfuerzo, pero:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>NO garantiza que siempre haya un doctor disponible (aunque casi siempre hay)</li>
              <li>La telemedicina tiene limitaciones técnicas (internet, video, etc.)</li>
              <li>Los descuentos en farmacias pueden cambiar sin aviso previo</li>
            </ul>
          </Section>

          <Section title="14. ¿Tienes dudas?">
            <p>Escríbenos a: <strong style={{ color: '#06B6D4' }}>contact@saludcompartida.com</strong></p>
            <p style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              Última actualización: Enero 2026
            </p>
          </Section>
        </div>
      )}

      {/* Tab 1: Política de Privacidad */}
      {activeTab === 1 && (
        <div style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
          {/* Banner legal verde */}
          <div style={{
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span style={{ fontWeight: 700, color: '#10B981' }}>Cumplimiento Legal</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              Este aviso cumple con la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong>, publicada en el Diario Oficial de la Federación el 20 de marzo de 2025.
            </p>
          </div>

          <h1 style={{ 
            fontFamily: '"DM Serif Display", serif', 
            fontSize: 28, 
            marginBottom: 24,
            color: '#8B5CF6'
          }}>
            Aviso de Privacidad
          </h1>

          <Section title="1. Responsable del tratamiento de tus datos">
            <p><strong>SaludCompartida SAPI de CV</strong> es responsable del uso y protección de tus datos personales, conforme a la <strong>LFPDPPP</strong>.</p>
            <p style={{ marginTop: 12 }}>Domicilio fiscal: [Agregar domicilio real]</p>
            <p>Contacto: <strong style={{ color: '#8B5CF6' }}>contact@saludcompartida.com</strong></p>
          </Section>

          <Section title="2. ¿Qué datos recabamos?">
            <p><strong>Datos de identificación:</strong></p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>Nombre completo</li>
              <li>Fecha de nacimiento</li>
              <li>Teléfono (US y México)</li>
              <li>Email</li>
              <li>Estado donde vives (US)</li>
            </ul>
            <p style={{ marginTop: 16 }}><strong style={{ color: '#EC4899' }}>Datos sensibles (salud y confidenciales):</strong></p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>Historial médico (lo que le cuentas al doctor)</li>
              <li>Sesiones de psicología (confidencial 100%)</li>
              <li>Recetas electrónicas</li>
            </ul>
            <p style={{ marginTop: 16 }}><strong>Datos de uso:</strong></p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>Cuántas veces usas la app</li>
              <li>Qué servicios usas más</li>
              <li>Con qué frecuencia hablas con Lupita o Fernanda</li>
            </ul>
          </Section>

          <Section title="3. ¿Para qué usamos tus datos?">
            <p><strong>Finalidades primarias (necesarias para darte el servicio):</strong></p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>Conectarte con doctores y psicólogos</li>
              <li>Procesar tu pago mensual</li>
              <li>Darte tu código de descuento en farmacias</li>
              <li>Que Lupita o Fernanda te acompañen por WhatsApp</li>
            </ul>
            <p style={{ marginTop: 16 }}><strong>Finalidades secundarias (para mejorar el servicio):</strong></p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>Entender qué servicios usas más (datos agregados, sin tu nombre)</li>
              <li>Mejorar la tecnología de Lupita y Fernanda</li>
              <li>Enviarte tips de salud que te puedan servir</li>
            </ul>
          </Section>

          <Section title="4. Tu info solo se usa para lo que te dijimos">
            <p>🔒 <strong>NO vendemos tus datos a nadie.</strong></p>
            <p style={{ marginTop: 12 }}>Cuando usamos datos para estadísticas o mejoras, lo hacemos así:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li><strong>Datos agregados:</strong> "50 migrantes en California usaron telemedicina esta semana" (sin nombres)</li>
              <li><strong>Datos anónimos:</strong> Nadie puede saber que eres tú</li>
            </ul>
          </Section>

          <Section title="5. Confidencialidad médica y psicológica">
            <p style={{ color: '#EC4899', fontWeight: 600 }}>💜 Esto es sagrado para nosotros:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>Lo que le cuentas al doctor o psicólogo es <strong>100% confidencial</strong></li>
              <li>Está protegido por la <strong>Ley General de Salud de México</strong></li>
              <li>Solo el doctor o psicólogo tiene acceso (nadie más en SaludCompartida puede verlo)</li>
              <li>Ni siquiera tu familia puede saber qué hablaste sin tu permiso</li>
            </ul>
          </Section>

          <Section title="6. ¿Con quién compartimos tus datos?">
            <p>Solo compartimos lo mínimo necesario con:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li><strong>Doctores y psicólogos:</strong> Para darte la consulta (tienen obligación de confidencialidad)</li>
              <li><strong>Farmacias:</strong> Solo tu código de descuento (no tu historial médico)</li>
              <li><strong>Proveedores de tecnología:</strong> Servidores donde guardamos los datos (con contrato de confidencialidad)</li>
              <li><strong>Autoridades:</strong> Solo si la ley mexicana o estadounidense nos obliga (orden judicial)</li>
            </ul>
          </Section>

          <Section title="7. ¿Cómo protegemos tu información?">
            <p>🔐 Usamos tecnología de <strong>encriptación nivel bancario</strong>:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>Tus datos viajan encriptados (nadie puede interceptarlos)</li>
              <li>Los guardamos en servidores seguros en Estados Unidos y México</li>
              <li>Solo personal autorizado puede acceder (con autenticación de 2 factores)</li>
              <li>Hacemos auditorías de seguridad regularmente</li>
            </ul>
          </Section>

          <Section title="8. Tus derechos ARCO">
            <p>La <strong>LFPDPPP</strong> te da estos derechos sobre tus datos:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li><strong>A</strong>cceso: Saber qué datos tenemos de ti</li>
              <li><strong>R</strong>ectificación: Corregir datos incorrectos</li>
              <li><strong>C</strong>ancelación: Eliminar tus datos (excepto los que la ley obliga a guardar)</li>
              <li><strong>O</strong>posición: Decir "no quiero que usen este dato para X cosa"</li>
            </ul>
            <p style={{ marginTop: 16 }}>Para ejercer tus derechos, escríbenos a: <strong style={{ color: '#8B5CF6' }}>contact@saludcompartida.com</strong></p>
            <p style={{ marginTop: 8, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
              Tenemos <strong>20 días hábiles</strong> para responderte. Es <strong>gratis</strong> (no cobramos por esto).
            </p>
          </Section>

          <Section title="9. Consentimiento">
            <p>Al usar SaludCompartida, nos das tu <strong>consentimiento expreso</strong> para usar tus datos conforme a este aviso.</p>
            <p style={{ marginTop: 12 }}>Para datos sensibles (salud), te pedimos consentimiento cada vez que sea necesario.</p>
            <p style={{ marginTop: 12 }}>Puedes <strong>revocar tu consentimiento</strong> en cualquier momento escribiendo a contact@saludcompartida.com</p>
          </Section>

          <Section title="10. Menores de edad">
            <p>Si el usuario es <strong>menor de 18 años</strong>, necesitamos el consentimiento de un adulto (padre, madre o tutor legal).</p>
            <p style={{ marginTop: 8 }}>El adulto es responsable de proteger los datos del menor.</p>
          </Section>

          <Section title="11. Cookies y tecnologías similares">
            <p>Usamos cookies solo para:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>Que recuerdes tu sesión (no tengas que iniciar sesión cada vez)</li>
              <li>Mejorar la velocidad de la app</li>
            </ul>
            <p style={{ marginTop: 12 }}><strong>NO usamos cookies de publicidad</strong> ni las compartimos con terceros.</p>
          </Section>

          <Section title="12. Cambios a este aviso">
            <p>Podemos actualizar este aviso cuando:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>Cambie la ley</li>
              <li>Agreguemos nuevos servicios</li>
              <li>Necesitemos mejorar la protección de tus datos</li>
            </ul>
            <p style={{ marginTop: 12 }}>Te avisamos por app, email o WhatsApp con <strong>10 días de anticipación</strong>.</p>
          </Section>

          <Section title="13. ¿Tienes dudas sobre tu privacidad?">
            <p>Escríbenos a: <strong style={{ color: '#8B5CF6' }}>contact@saludcompartida.com</strong></p>
            <p style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              Última actualización: Enero 2026<br/>
              Conforme a la LFPDPPP (DOF 20 marzo 2025)
            </p>
          </Section>
        </div>
      )}
    </div>
  );
}

// Componente auxiliar para secciones
function Section({ title, children }) {
  return (
    <div style={{ 
      marginBottom: 32,
      background: 'rgba(255,255,255,0.03)',
      padding: 20,
      borderRadius: 12,
      border: '1px solid rgba(255,255,255,0.06)'
    }}>
      <h2 style={{ 
        fontSize: 16, 
        fontWeight: 700, 
        marginBottom: 12,
        color: '#fff'
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
