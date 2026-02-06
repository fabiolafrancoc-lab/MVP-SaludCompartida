'use client';

import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   PANTALLA: TÉRMINOS Y CONDICIONES + POLÍTICA DE PRIVACIDAD
   2 tabs · Platinum UX · Lenguaje accesible
   Contenido legal completo para saludcompartida.app
   ═══════════════════════════════════════════════════════════ */

const I = {
  Arrow: ({s=18,c='#fff'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  Shield: ({s=20,c='#06B6D4'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>,
  Lock: ({s=20,c='#8B5CF6'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Check: ({s=16,c='#10B981'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Info: ({s=16,c='#F59E0B'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
};

const TABS = ['Términos y Condiciones', 'Política de Privacidad'];

const S = {
  page: { minHeight: '100vh', background: '#111827', color: '#fff', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", maxWidth: 430, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  logo: { fontFamily: "'DM Serif Display', serif", fontSize: 20, background: 'linear-gradient(135deg, #06B6D4, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 },
  px: { padding: '0 20px' },
  back: { display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '8px 0', marginBottom: 8 },
  st: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.35)', marginBottom: 14, marginTop: 24 },
  tagline: { fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontStyle: 'italic' },
  serif: { fontFamily: "'DM Serif Display', serif" },
  sec: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '18px 16px', marginBottom: 12 },
  secTitle: { fontSize: 15, fontWeight: 700, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 },
  secText: { fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 },
  li: { fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, paddingLeft: 6, marginBottom: 6, display: 'flex', alignItems: 'flex-start', gap: 8 },
  dot: { width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', flexShrink: 0, marginTop: 8 },
};


/* ═══════════════════════════════════════════════════════════
   TAB 1 — TÉRMINOS Y CONDICIONES
   ═══════════════════════════════════════════════════════════ */
function TabTerminos() {
  return (
    <div>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ width: 68, height: 68, borderRadius: 20, background: 'rgba(6,182,212,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', border: '1px solid rgba(6,182,212,0.2)' }}>
          <I.Shield s={34} />
        </div>
        <h2 style={{ ...S.serif, fontSize: 22, lineHeight: 1.3, marginBottom: 8 }}>
          Términos y Condiciones
        </h2>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Última actualización: Enero 2026</p>
      </div>

      {/* Intro */}
      <div style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(236,72,153,0.05))', border: '1px solid rgba(6,182,212,0.15)', borderRadius: 16, padding: 18, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <I.Info />
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
            Al usar SaludCompartida aceptas estas condiciones. Si tienes alguna duda, puedes escribirnos a <b style={{ color: '#06B6D4' }}>contact@saludcompartida.com</b> y con mucho gusto te ayudamos.
          </p>
        </div>
      </div>

      {/* 1. Qué es */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#06B6D4' }}>1.</span> ¿Qué es SaludCompartida?</p>
        <p style={S.secText}>
          SaludCompartida es una <b style={{ color: '#06B6D4' }}>plataforma electrónica</b> que te da acceso a servicios de salud. <b style={{ color: '#F59E0B' }}>No es un seguro médico.</b> A través de tu suscripción, puedes acceder a consultas con doctores, descuentos en farmacias, sesiones con psicólogos y compañía inteligente con Lupita y Fernanda.
        </p>
        <p style={{ ...S.secText, marginTop: 12 }}>
          <b style={{ color: '#F59E0B' }}>Importante:</b> SaludCompartida conecta a los usuarios con empresas que brindan los servicios de salud (doctores, farmacias, psicólogos). SaludCompartida <b>no es responsable</b> por la atención que brindan estas empresas ni por los resultados de sus servicios. Cada empresa que presta el servicio es responsable de la calidad de su propia atención.
        </p>
      </div>

      {/* 2. Lupita y Fernanda */}
      <div style={{ ...S.sec, borderColor: 'rgba(245,158,11,0.15)' }}>
        <p style={S.secTitle}><span style={{ color: '#F59E0B' }}>2.</span> Lupita y Fernanda — tu compañía</p>
        <p style={S.secText}>
          Lupita y Fernanda son <b style={{ color: '#F59E0B' }}>tecnología propiedad de SaludCompartida</b>. Son compañeras inteligentes que te llaman para saludarte, preguntarte cómo te sientes, recordarte tus medicinas y platicar contigo. Lupita y Fernanda no son doctores ni psicólogos — son una compañía que te escucha y te acompaña. Si detectan que necesitas atención médica o emocional, te van a conectar con un profesional.
        </p>
      </div>

      {/* 2. Qué incluye */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#06B6D4' }}>3.</span> ¿Qué incluye el servicio?</p>
        <div style={S.secText}>
          {[
            'Consultas médicas por teléfono o video, las 24 horas, los 7 días de la semana',
            'Descuentos del 40% al 75% en más de 1,700 farmacias en todo México — en todos los productos de la farmacia, no solo medicinas',
            'Una sesión semanal con un psicólogo profesional (máximo 50 minutos)',
            'Compañía inteligente con Lupita, que te llama para saludarte, recordarte tus medicinas y platicar contigo',
            'Todo esto para ti y hasta 3 familiares más'
          ].map((t, i) => (
            <div key={i} style={S.li}><I.Check /><span>{t}</span></div>
          ))}
        </div>
      </div>

      {/* 3. Qué NO incluye */}
      <div style={{ ...S.sec, borderColor: 'rgba(245,158,11,0.15)' }}>
        <p style={S.secTitle}><span style={{ color: '#F59E0B' }}>4.</span> ¿Qué NO incluye?</p>
        <p style={{ ...S.secText, marginBottom: 10 }}>
          Es importante que sepas que SaludCompartida <b style={{ color: '#F59E0B' }}>no cubre</b>:
        </p>
        <div style={S.secText}>
          {[
            'Emergencias médicas — si es una emergencia, llama al 911',
            'Hospitalizaciones ni cirugías',
            'Medicamentos controlados',
            'Enfermedades que necesiten atención especializada inmediata'
          ].map((t, i) => (
            <div key={i} style={S.li}><div style={S.dot}/><span>{t}</span></div>
          ))}
        </div>
      </div>

      {/* 4. Costo */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#06B6D4' }}>5.</span> ¿Cuánto cuesta?</p>
        <p style={S.secText}>
          La suscripción cuesta entre <b style={{ color: '#06B6D4' }}>$12 y $18 dólares al mes</b>, dependiendo del plan que elijas. Incluye hasta 4 personas. La suscripción se renueva cada mes de forma automática. Puedes cancelar en cualquier momento sin ningún cargo extra.
        </p>
      </div>

      {/* 5. Telemedicina */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#06B6D4' }}>6.</span> Sobre las consultas médicas</p>
        <p style={S.secText}>
          Las consultas son por videollamada o teléfono, con doctores titulados en México. Si el doctor lo considera necesario, te puede dar una receta electrónica. Estas consultas <b>no reemplazan</b> una visita presencial al doctor cuando sea necesario. Si tu caso lo requiere, el doctor te va a recomendar que vayas a consulta presencial.
        </p>
      </div>

      {/* 6. Farmacias */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#06B6D4' }}>7.</span> Sobre los descuentos en farmacias</p>
        <p style={S.secText}>
          Los descuentos aplican en las farmacias afiliadas al presentar tu tarjeta digital de SaludCompartida. Los porcentajes de descuento pueden variar según la farmacia y los productos. Solo aplican para productos autorizados.
        </p>
      </div>

      {/* 7. Terapia */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#06B6D4' }}>8.</span> Sobre las sesiones de psicología</p>
        <p style={S.secText}>
          Tienes derecho a una sesión por semana, de hasta 50 minutos, con un psicólogo profesional. Las sesiones son para apoyo emocional y psicológico; <b>no incluyen receta de medicamentos</b>. Si tienes menores de edad, un adulto debe autorizar y agendar la cita.
        </p>
      </div>

      {/* 8. Quién puede usarlo */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#06B6D4' }}>9.</span> ¿Quién puede usar el servicio?</p>
        <p style={S.secText}>
          El migrante que paga la suscripción puede agregar hasta 3 personas de su familia en México. El usuario en México decide quiénes son las otras personas sin necesidad de avisarnos. SaludCompartida puede limitar o cambiar el número de personas incluidas con previo aviso.
        </p>
      </div>

      {/* 9. Tus responsabilidades */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#06B6D4' }}>10.</span> Tus responsabilidades</p>
        <div style={S.secText}>
          {[
            'Dar información verdadera y actual',
            'No compartir tu código de acceso con personas fuera de tu familia',
            'Usar el servicio de manera respetuosa',
            'Buscar atención de emergencia cuando sea necesario — SaludCompartida no es para emergencias'
          ].map((t, i) => (
            <div key={i} style={S.li}><div style={S.dot}/><span>{t}</span></div>
          ))}
        </div>
      </div>

      {/* 10. Uso de testimoniales */}
      <div style={{ ...S.sec, borderColor: 'rgba(245,158,11,0.15)' }}>
        <p style={S.secTitle}><span style={{ color: '#F59E0B' }}>11.</span> Uso de testimoniales</p>
        <p style={S.secText}>
          Al usar SaludCompartida, nos das permiso para usar información sobre dónde hiciste tus compras en farmacia para compartir historias de éxito. <b style={{ color: '#F59E0B' }}>Tu nombre real nunca se va a mostrar.</b> Solo usamos datos generales, como la ciudad o región, para que otras familias vean que el servicio sí funciona.
        </p>
      </div>

      {/* 11. Cambios */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#06B6D4' }}>12.</span> Cambios a estos términos</p>
        <p style={S.secText}>
          Podemos actualizar estos términos en cualquier momento. Si hacemos cambios importantes, te avisamos por la app o por WhatsApp. Si sigues usando el servicio después del aviso, significa que aceptas los cambios.
        </p>
      </div>

      {/* 12. Limitaciones */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#06B6D4' }}>13.</span> Limitaciones</p>
        <p style={S.secText}>
          SaludCompartida no garantiza que el servicio esté disponible sin interrupciones todo el tiempo — puede haber fallas técnicas. No nos hacemos responsables por el uso indebido de recetas ni por medicamentos mal administrados. Tú aceptas que la telemedicina tiene limitaciones y que debes ir al doctor en persona cuando tu estado de salud lo requiera.
        </p>
      </div>

      {/* 13. Contacto */}
      <div style={{ ...S.sec, background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(236,72,153,0.05))', borderColor: 'rgba(6,182,212,0.2)' }}>
        <p style={S.secTitle}><span style={{ color: '#06B6D4' }}>14.</span> ¿Tienes dudas?</p>
        <p style={S.secText}>
          Escríbenos a <b style={{ color: '#06B6D4' }}>contact@saludcompartida.com</b>. Estamos para ayudarte.
        </p>
      </div>

      {/* Ley aplicable */}
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 20, lineHeight: 1.7 }}>
        Estos términos se rigen por las leyes de México y Estados Unidos aplicables a servicios de salud transfronterizos.
      </p>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   TAB 2 — POLÍTICA DE PRIVACIDAD / AVISO DE PRIVACIDAD
   Cumplimiento LFPDPPP y Derechos ARCO
   ═══════════════════════════════════════════════════════════ */
function TabPrivacidad() {
  return (
    <div>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ width: 68, height: 68, borderRadius: 20, background: 'rgba(139,92,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', border: '1px solid rgba(139,92,246,0.2)' }}>
          <I.Lock s={34} />
        </div>
        <h2 style={{ ...S.serif, fontSize: 22, lineHeight: 1.3, marginBottom: 8 }}>
          Aviso de Privacidad
        </h2>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Última actualización: Enero 2026</p>
      </div>

      {/* Legal compliance banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.06))', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 16, padding: 18, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <I.Check c="#10B981" />
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8 }}>
            SaludCompartida cumple cabalmente con la <b style={{ color: '#10B981' }}>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</b> vigente en México, así como con las disposiciones aplicables en materia de transferencia internacional de datos y estándares de protección de información de salud.
          </p>
        </div>
      </div>

      {/* Intro */}
      <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(236,72,153,0.05))', border: '1px solid rgba(139,92,246,0.15)', borderRadius: 16, padding: 18, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <I.Info c="#8B5CF6" />
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
            Tu información es privada y está protegida por la ley. Este aviso de privacidad te explica qué datos guardamos, para qué los usamos, y cuáles son tus derechos. <b style={{ color: '#8B5CF6' }}>Tu información no será utilizada para otros fines que no sean brindarte y mejorar el servicio.</b>
          </p>
        </div>
      </div>

      {/* 1. Responsable */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#8B5CF6' }}>1.</span> Responsable del tratamiento de datos</p>
        <p style={S.secText}>
          <b style={{ color: '#8B5CF6' }}>SaludCompartida S.A.P.I. de C.V.</b> es el responsable del tratamiento de tus datos personales, conforme a lo establecido en la LFPDPPP. Puedes contactarnos para cualquier asunto relacionado con tus datos personales a través de <b style={{ color: '#8B5CF6' }}>contact@saludcompartida.com</b>
        </p>
      </div>

      {/* 2. Qué datos recabamos */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#8B5CF6' }}>2.</span> Datos personales que recabamos</p>
        <p style={{ ...S.secText, marginBottom: 10 }}>
          <b>Datos de identificación:</b>
        </p>
        <div style={S.secText}>
          {[
            'Tu nombre y apellido',
            'Tu número de celular',
            'Tu correo electrónico'
          ].map((t, i) => (
            <div key={i} style={S.li}><I.Check /><span>{t}</span></div>
          ))}
        </div>
        <p style={{ ...S.secText, marginBottom: 10, marginTop: 14 }}>
          <b>Datos sensibles de salud</b> (estrictamente confidenciales entre tú y el profesional que te atiende):
        </p>
        <div style={S.secText}>
          {[
            'Síntomas, diagnósticos y recetas de tus consultas médicas',
            'Tu historial médico y antecedentes',
            'El contenido de tus sesiones con el psicólogo',
            'Expedientes clínicos y resultados de consultas'
          ].map((t, i) => (
            <div key={i} style={S.li}><div style={S.dot}/><span>{t}</span></div>
          ))}
        </div>
        <p style={{ ...S.secText, marginBottom: 10, marginTop: 14 }}>
          <b>Datos de uso</b> (únicamente con fines estadísticos y de mejora, sin vinculación a tu identidad):
        </p>
        <div style={S.secText}>
          {[
            'Frecuencia de uso del servicio y secciones visitadas',
            'Tipo de dispositivo, dirección IP y navegador',
            'Horarios de conexión'
          ].map((t, i) => (
            <div key={i} style={S.li}><div style={S.dot}/><span>{t}</span></div>
          ))}
        </div>
      </div>

      {/* 3. Finalidades del tratamiento */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#8B5CF6' }}>3.</span> Finalidades del tratamiento</p>
        <p style={{ ...S.secText, marginBottom: 10 }}>
          <b>Finalidades primarias</b> (necesarias para brindarte el servicio):
        </p>
        <div style={S.secText}>
          {[
            'Proveer consultas de telemedicina y sesiones de psicología',
            'Gestionar recetas electrónicas y su uso en farmacias afiliadas',
            'Operar el programa de descuentos en farmacias',
            'Que Lupita y Fernanda puedan llamarte, acompañarte y darte recordatorios',
            'Cumplir con requerimientos legales y regulatorios'
          ].map((t, i) => (
            <div key={i} style={S.li}><I.Check /><span>{t}</span></div>
          ))}
        </div>
        <p style={{ ...S.secText, marginBottom: 10, marginTop: 14 }}>
          <b>Finalidades secundarias</b> (para mejorar tu experiencia):
        </p>
        <div style={S.secText}>
          {[
            'Mejorar la calidad de nuestros servicios',
            'Enviarte recordatorios e información útil sobre tu servicio',
            'Elaborar estadísticas y análisis de uso — siempre a nivel agregado y sin tu nombre'
          ].map((t, i) => (
            <div key={i} style={S.li}><div style={S.dot}/><span>{t}</span></div>
          ))}
        </div>
      </div>

      {/* 4. Compromiso de uso exclusivo */}
      <div style={{ ...S.sec, background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(6,182,212,0.04))', borderColor: 'rgba(16,185,129,0.2)' }}>
        <p style={S.secTitle}><span style={{ color: '#10B981' }}>4.</span> Tu información solo se usa para lo que te dijimos</p>
        <p style={S.secText}>
          <b style={{ color: '#10B981' }}>Tu información personal no será utilizada con fines distintos</b> a los señalados en este aviso de privacidad. No vendemos, alquilamos ni comercializamos tus datos personales. Si en algún momento necesitamos usar tus datos para algo diferente, te lo informaremos primero y te pediremos tu consentimiento.
        </p>
        <p style={{ ...S.secText, marginTop: 10 }}>
          En caso de generar perfiles de usuario o análisis de comportamiento, estos se elaborarán <b style={{ color: '#10B981' }}>exclusivamente a nivel agregado</b>, es decir, como estadísticas generales que no permiten identificar a ninguna persona individual. Tu nombre, datos de contacto e información personal nunca se vinculan a estos análisis.
        </p>
      </div>

      {/* 5. Confidencialidad de sesiones */}
      <div style={{ ...S.sec, borderColor: 'rgba(139,92,246,0.2)' }}>
        <p style={S.secTitle}><span style={{ color: '#8B5CF6' }}>5.</span> Confidencialidad médica y psicológica</p>
        <p style={S.secText}>
          Todo lo que platiques con tu doctor o psicólogo es <b style={{ color: '#8B5CF6' }}>completamente confidencial</b>, protegido por la legislación mexicana en materia de salud y secreto profesional. Esta información queda exclusivamente entre tú y el profesional que te atiende. Ni SaludCompartida ni terceros tienen acceso al contenido de tus consultas.
        </p>
      </div>

      {/* 6. Transferencia de datos */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#8B5CF6' }}>6.</span> ¿Con quién compartimos tus datos?</p>
        <p style={{ ...S.secText, marginBottom: 10 }}>
          <b style={{ color: '#F59E0B' }}>Nunca vendemos tu información.</b> Únicamente la transferimos a:
        </p>
        <div style={S.secText}>
          {[
            'Los profesionales de salud que te atienden (doctores, psicólogos) — exclusivamente para prestarte el servicio',
            'Las farmacias afiliadas — solo la información necesaria para aplicar tus descuentos',
            'Proveedores de tecnología que nos ayudan a operar la plataforma — sujetos a obligaciones de confidencialidad',
            'Autoridades competentes — únicamente cuando exista una obligación legal o mandato judicial'
          ].map((t, i) => (
            <div key={i} style={S.li}><div style={S.dot}/><span>{t}</span></div>
          ))}
        </div>
        <p style={{ ...S.secText, marginTop: 10 }}>
          Todas las transferencias cumplen con lo establecido en la LFPDPPP. En caso de transferencias internacionales (nuestros servidores están en Estados Unidos y México), garantizamos niveles de protección equivalentes a los exigidos por la ley mexicana.
        </p>
      </div>

      {/* 7. Seguridad */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#8B5CF6' }}>7.</span> Seguridad de tus datos</p>
        <p style={S.secText}>
          Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger tus datos personales contra daño, pérdida, alteración, destrucción o acceso no autorizado. Tus datos se guardan en servidores seguros con encriptación de nivel bancario. Mantenemos protocolos de seguridad actualizados conforme a las mejores prácticas de la industria.
        </p>
      </div>

      {/* 8. Derechos ARCO */}
      <div style={{ ...S.sec, background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(6,182,212,0.04))', borderColor: 'rgba(139,92,246,0.2)' }}>
        <p style={S.secTitle}><span style={{ color: '#8B5CF6' }}>8.</span> Tus Derechos ARCO</p>
        <p style={{ ...S.secText, marginBottom: 10 }}>
          Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), tienes los siguientes derechos sobre tus datos personales:
        </p>
        <div style={S.secText}>
          {[
            { t: 'Acceso', d: '— Tienes derecho a conocer qué datos personales tenemos de ti y cómo los usamos' },
            { t: 'Rectificación', d: '— Si tus datos son inexactos, incompletos o no están actualizados, tienes derecho a que los corrijamos' },
            { t: 'Cancelación', d: '— Puedes solicitar que eliminemos tus datos personales de nuestros registros cuando consideres que no se están usando conforme a esta política' },
            { t: 'Oposición', d: '— Puedes oponerte al tratamiento de tus datos para fines específicos que te causen perjuicio o que no hayas autorizado' }
          ].map((item, i) => (
            <div key={i} style={S.li}>
              <I.Check c="#8B5CF6" />
              <span><b style={{ color: '#8B5CF6' }}>{item.t}</b> {item.d}</span>
            </div>
          ))}
        </div>
        <p style={{ ...S.secText, marginTop: 14 }}>
          <b>¿Cómo ejercer tus derechos ARCO?</b> Envía tu solicitud a <b style={{ color: '#8B5CF6' }}>contact@saludcompartida.com</b> indicando tu nombre completo, una descripción del derecho que deseas ejercer, y una copia de tu identificación. Te responderemos en un plazo máximo de 20 días hábiles conforme a lo establecido por la ley. El ejercicio de estos derechos es gratuito.
        </p>
      </div>

      {/* 9. Consentimiento */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#8B5CF6' }}>9.</span> Tu consentimiento</p>
        <p style={S.secText}>
          Al utilizar SaludCompartida, otorgas tu consentimiento expreso para el tratamiento de tus datos personales conforme a las finalidades descritas en este aviso. Para los datos sensibles de salud, tu consentimiento se obtiene de forma expresa al momento de utilizar los servicios de telemedicina y psicología, conforme a lo dispuesto en la LFPDPPP y la Ley General de Salud.
        </p>
        <p style={{ ...S.secText, marginTop: 10 }}>
          Puedes revocar tu consentimiento en cualquier momento enviándonos una solicitud a <b style={{ color: '#8B5CF6' }}>contact@saludcompartida.com</b>. La revocación no tendrá efectos retroactivos.
        </p>
      </div>

      {/* 10. Menores */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#8B5CF6' }}>10.</span> Menores de edad</p>
        <p style={S.secText}>
          Si algún miembro de tu familia es menor de 18 años, el padre, madre o tutor legal debe autorizar el uso del servicio y agendar sus citas. Los datos de menores reciben protección reforzada conforme a las reglas de representación establecidas en la legislación civil mexicana.
        </p>
      </div>

      {/* 11. Cookies */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#8B5CF6' }}>11.</span> Cookies y tecnologías de seguimiento</p>
        <p style={S.secText}>
          Utilizamos cookies (pequeños archivos que guarda tu navegador) exclusivamente para el correcto funcionamiento de la plataforma y para recordar tus preferencias. No utilizamos cookies con fines publicitarios ni para rastrear tu actividad fuera de SaludCompartida.
        </p>
      </div>

      {/* 12. Cambios */}
      <div style={S.sec}>
        <p style={S.secTitle}><span style={{ color: '#8B5CF6' }}>12.</span> Cambios a este aviso</p>
        <p style={S.secText}>
          SaludCompartida podrá modificar el presente aviso de privacidad en cualquier momento. Cualquier cambio será notificado a través de la plataforma, por correo electrónico o por WhatsApp. La fecha de última actualización aparece al inicio de este documento. El uso continuado del servicio después de la notificación constituye la aceptación de los cambios.
        </p>
      </div>

      {/* 13. Contacto */}
      <div style={{ ...S.sec, background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(236,72,153,0.05))', borderColor: 'rgba(139,92,246,0.2)' }}>
        <p style={S.secTitle}><span style={{ color: '#8B5CF6' }}>13.</span> ¿Tienes dudas sobre tus datos?</p>
        <p style={S.secText}>
          Para cualquier consulta, solicitud de derechos ARCO o aclaración sobre el tratamiento de tus datos personales, escríbenos a <b style={{ color: '#8B5CF6' }}>contact@saludcompartida.com</b>. Estamos comprometidos a atenderte y proteger tu información.
        </p>
      </div>

      {/* Legal footer */}
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 20, lineHeight: 1.7 }}>
        El presente Aviso de Privacidad se emite en cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) publicada en el DOF el 20 de marzo de 2025, su Reglamento, y las disposiciones aplicables en materia de transferencia internacional de datos y protección de información de salud.
      </p>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════ */
export default function TerminosPrivacidad({ initialTab = 0 }) {
  const [tab, setTab] = useState(initialTab);

  return (
    <div style={S.page}>
      <div style={S.header}>
        {/* Logo: usar /saludcompartida-dark-no-tagline.png (h-16) */}
        <img src="/saludcompartida-dark-no-tagline.png" alt="SaludCompartida" style={{ height: 40 }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', marginRight: 6, boxShadow: '0 0 8px #10B981' }} />
          <span style={{ fontSize: 12, color: '#10B981', fontWeight: 600 }}>Activo</span>
        </div>
      </div>

      <div style={S.px}>
        <button style={S.back}><I.Arrow /> Volver al inicio</button>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'rgba(255,255,255,0.03)', borderRadius: 14, padding: 4, border: '1px solid rgba(255,255,255,0.06)' }}>
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              flex: 1, padding: '10px 4px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 11, fontWeight: tab === i ? 700 : 500,
              background: tab === i ? 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(236,72,153,0.1))' : 'transparent',
              color: tab === i ? '#fff' : 'rgba(255,255,255,0.35)',
              transition: 'all 0.2s ease',
              ...(tab === i ? { boxShadow: '0 2px 8px rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.2)' } : {}),
            }}>
              {t}
            </button>
          ))}
        </div>

        {tab === 0 && <TabTerminos />}
        {tab === 1 && <TabPrivacidad />}
      </div>

      <div style={{ padding: '28px 20px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 24 }}>
        <p style={S.tagline}>SaludCompartida, donde está tu corazón</p>
      </div>
    </div>
  );
}
