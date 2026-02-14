'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      backgroundColor: '#111827',
      color: 'white',
      minHeight: '100vh',
      padding: '0',
    }}>
      {/* HEADER */}
      <header style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#111827',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
      }}>
        <Image 
          src="/saludcompartida-dark-no-tagline.png" 
          alt="SaludCompartida" 
          width={140}
          height={36}
          style={{ height: '36px', width: 'auto' }}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link href="/registro-jan" style={{
            padding: '10px 14px',
            background: 'linear-gradient(135deg, #EC4899, #DB2777)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontSize: '12px',
            fontWeight: '700',
            textDecoration: 'none',
            display: 'inline-block',
          }}>Quiero Contratar Ahora</Link>
          <Link href="/login" style={{
            padding: '10px 14px',
            background: 'transparent',
            border: '2px solid #06B6D4',
            borderRadius: '10px',
            color: '#06B6D4',
            fontSize: '12px',
            fontWeight: '700',
            textDecoration: 'none',
            display: 'inline-block',
          }}>Ya Tengo Mi Código</Link>
        </div>
      </header>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        
        {/* HERO */}
        <section style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ color: '#06B6D4', fontSize: '14px', marginBottom: '16px' }}>
            Cuidamos a tu familia en México • 24/7
          </p>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '28px',
            lineHeight: '1.3',
            marginBottom: '16px',
          }}>
            Si llegaste hasta aquí, es porque tú también lo sientes.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
            Esa preocupación constante. Ese nudo en el estómago cuando tu mamá te dice que le duele algo y tú estás a miles de kilómetros.
          </p>
          <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>
            Tú trabajas duro <span style={{ color: '#06B6D4' }}>"aquí"</span>. 
            Nosotros los cuidamos <span style={{ color: '#EC4899' }}>"allá"</span>.
          </p>
          <Link href="/registro-jan" style={{
            display: 'block',
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #EC4899, #DB2777)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '700',
            width: '100%',
            textDecoration: 'none',
            textAlign: 'center',
          }}>Quiero Contratar Ahora</Link>
        </section>

        {/* STATS */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '40px',
        }}>
          {[
            { num: '24/7', label: 'Doctores disponibles' },
            { num: '1,700+', label: 'Farmacias con descuento' },
            { num: '75%', label: 'Descuento máximo' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center',
            }}>
              <div style={{ color: '#06B6D4', fontSize: '24px', fontWeight: '700' }}>{s.num}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>{s.label}</div>
            </div>
          ))}
        </section>

        {/* NO TODO ES DINERO - SECCIÓN MODIFICADA */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(147,51,234,0.1))',
          border: '2px solid #EC4899',
          borderRadius: '20px',
          padding: '28px 24px',
          marginBottom: '32px',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-block',
            background: '#EC4899',
            color: 'white',
            fontSize: '11px',
            fontWeight: '700',
            padding: '6px 14px',
            borderRadius: '20px',
            marginBottom: '16px',
          }}>La verdad que nadie dice</div>
          
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '28px',
            marginBottom: '20px',
          }}>No todo es dinero.</h2>
          
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', marginBottom: '20px' }}>
            Sí, mandamos remesas. Sí, pagamos las cuentas. Pero el dinero no resuelve todo.
          </p>

          <div style={{
            background: 'rgba(6,182,212,0.15)',
            border: '2px solid #06B6D4',
            borderRadius: '16px',
            padding: '20px',
          }}>
            <p style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '20px',
              color: 'rgba(255,255,255,0.95)',
              lineHeight: '1.5',
              fontStyle: 'italic',
            }}>
              La <span style={{ color: '#EC4899', fontStyle: 'normal', fontWeight: '600' }}>soledad de tu mamá</span>. 
              Tu <span style={{ color: '#EC4899', fontStyle: 'normal', fontWeight: '600' }}>esposa</span> que carga sola con tres niños mientras tú trabajas aquí. 
              El <span style={{ color: '#EC4899', fontStyle: 'normal', fontWeight: '600' }}>abuelo</span> que ya no tiene con quién platicar.
            </p>
          </div>
        </section>

        {/* VIDEO */}
        <section style={{
          marginBottom: '32px',
        }}>
          <h3 style={{
            textAlign: 'center',
            fontSize: '18px',
            marginBottom: '16px',
            color: 'rgba(255,255,255,0.9)',
          }}>Por qué creamos SaludCompartida</h3>
          <p style={{ textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>
            Escucha una conversación real con Lupita
          </p>
          <div style={{
            background: '#1F2937',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '2px solid rgba(6,182,212,0.3)',
          }}>
            <video 
              style={{ width: '100%', aspectRatio: '16/9' }}
              controls
              poster="/video-poster.jpg"
            >
              <source src="/Video_Pagina_copy.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
        </section>

        {/* QUÉ NOS HACE ÚNICOS */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(236,72,153,0.1))',
          borderRadius: '20px',
          padding: '32px 24px',
          marginBottom: '32px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
            Qué nos hace únicos
          </p>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #EC4899, #06B6D4)',
            color: 'white',
            fontSize: '14px',
            fontWeight: '700',
            padding: '10px 20px',
            borderRadius: '20px',
            marginBottom: '24px',
          }}>✨ Esto no es salud. Es conexión.</div>
          
          {/* Avatars */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #EC4899, #9333EA)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '22px',
              border: '3px solid #1F2937',
              zIndex: 2,
            }}>L</div>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #06B6D4, #0891B2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '22px',
              border: '3px solid #1F2937',
              marginLeft: '-14px',
              zIndex: 1,
            }}>F</div>
          </div>
          
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '28px',
            marginBottom: '16px',
          }}>Lupita y Fernanda</h2>
          
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.5' }}>
            Son amigas que llaman a tu familia para alegrar el día.
          </p>

          {/* Detalles Lupita y Fernanda */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
            <div style={{
              background: 'rgba(236,72,153,0.15)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'left',
            }}>
              <p style={{ color: '#EC4899', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>Para adultos 55+</p>
              <p style={{ fontWeight: '700', marginBottom: '8px' }}>Lupita</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Para tus papás y abuelos</p>
            </div>
            <div style={{
              background: 'rgba(6,182,212,0.15)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'left',
            }}>
              <p style={{ color: '#06B6D4', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>Para mamás 25–50</p>
              <p style={{ fontWeight: '700', marginBottom: '8px' }}>Fernanda</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Para tu esposa, hermana, prima</p>
            </div>
          </div>

          <p style={{
            marginTop: '20px',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.7)',
            fontStyle: 'italic',
          }}>
            <strong style={{ color: 'white', fontStyle: 'normal' }}>Ellas llaman a tu familia.</strong> Tu familia no tiene que hacer nada.
          </p>
        </section>

        {/* CTA */}
        <Link href="/registro-jan" style={{
          display: 'block',
          padding: '18px 32px',
          background: 'linear-gradient(135deg, #EC4899, #DB2777)',
          border: 'none',
          borderRadius: '14px',
          color: 'white',
          fontSize: '18px',
          fontWeight: '700',
          width: '100%',
          marginBottom: '40px',
          boxShadow: '0 8px 32px rgba(236,72,153,0.3)',
          textDecoration: 'none',
          textAlign: 'center',
        }}>Quiero Contratar Ahora</Link>

        {/* LOS CUATRO PILARES */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '26px',
            textAlign: 'center',
            marginBottom: '8px',
          }}>Los Cuatro Pilares de tu Tranquilidad</h2>
          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '24px',
          }}>Por qué SaludCompartida es tu solución</p>

          {/* PILAR 1 */}
          <div style={{
            background: '#1F2937',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '16px',
            borderLeft: '4px solid #06B6D4',
          }}>
            <p style={{ color: '#06B6D4', fontSize: '11px', fontWeight: '700', marginBottom: '8px' }}>PILAR 01</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="1.5">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
              </svg>
              <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Atención Médica 24/7</h3>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', marginBottom: '12px', fontWeight: '600' }}>
              Nuestra misión es reducir tus gastos médicos.
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', marginBottom: '12px' }}>
              Telemedicina ilimitada por video o teléfono, sin citas, sin esperas. A las 3 AM si es necesario.
            </p>
            <p style={{ fontSize: '14px', color: '#10B981', fontWeight: '600' }}>
              75% de descuento en 1,700+ farmacias.
            </p>
          </div>

          {/* PILAR 2 */}
          <div style={{
            background: '#1F2937',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '16px',
            borderLeft: '4px solid #EC4899',
          }}>
            <p style={{ color: '#EC4899', fontSize: '11px', fontWeight: '700', marginBottom: '8px' }}>PILAR 02</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 6v2M12 16v2M6 12h2M16 12h2"/>
              </svg>
              <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Terapia Psicológica</h3>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}>
              Sesiones semanales con psicólogos certificados. Para tu mamá que necesita hablar, para tu esposa que necesita apoyo.
            </p>
          </div>

          {/* PILAR 3 */}
          <div style={{
            background: '#1F2937',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '16px',
            borderLeft: '4px solid #F59E0B',
          }}>
            <p style={{ color: '#F59E0B', fontSize: '11px', fontWeight: '700', marginBottom: '8px' }}>PILAR 03</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5">
                <path d="M3 3v18h18"/>
                <path d="M7 16l4-4 4 4 5-6"/>
                <circle cx="20" cy="6" r="2" fill="#F59E0B"/>
              </svg>
              <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Seguimiento de tus Ahorros</h3>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}>
              Un seguimiento mensual donde ves los ahorros reales que estás obteniendo al utilizar los servicios de SaludCompartida.
            </p>
          </div>

          {/* PILAR 4 */}
          <div style={{
            background: '#1F2937',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '16px',
            borderLeft: '4px solid #9333EA',
          }}>
            <p style={{ color: '#9333EA', fontSize: '11px', fontWeight: '700', marginBottom: '8px' }}>PILAR 04</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                <path d="M12 8v8M8 12h8" strokeOpacity="0.5"/>
              </svg>
              <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Compañía</h3>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}>
              Lupita y Fernanda llaman a tu familia para platicar de lo que les gusta: recetas, bailes, el fin de semana. Una amiga que siempre tiene tiempo.
            </p>
          </div>

          {/* CTA ADICIONAL DESPUÉS DE PILARES */}
          <Link href="/registro-jan" style={{
            display: 'block',
            padding: '18px 32px',
            background: 'linear-gradient(135deg, #EC4899, #DB2777)',
            border: 'none',
            borderRadius: '14px',
            color: 'white',
            fontSize: '18px',
            fontWeight: '700',
            width: '100%',
            marginTop: '8px',
            boxShadow: '0 8px 32px rgba(236,72,153,0.3)',
            textDecoration: 'none',
            textAlign: 'center',
          }}>Quiero Contratar Ahora</Link>
        </section>

        {/* TESTIMONIOS */}
        <section style={{ marginBottom: '32px' }}>
          <p style={{ color: '#06B6D4', fontSize: '12px', textAlign: 'center', marginBottom: '8px' }}>Historias Reales</p>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '24px',
            textAlign: 'center',
            marginBottom: '20px',
          }}>Lo que dicen las familias</h2>

          <div style={{
            background: '#1F2937',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '12px',
          }}>
            <p style={{ fontSize: '15px', fontStyle: 'italic', marginBottom: '12px', lineHeight: '1.5' }}>
              "Por primera vez en 8 años, no me preocupo cuando mi mamá me dice que le duele algo."
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>María R. • Phoenix, Arizona</p>
          </div>

          <div style={{
            background: '#1F2937',
            borderRadius: '16px',
            padding: '20px',
          }}>
            <p style={{ fontSize: '15px', fontStyle: 'italic', marginBottom: '12px', lineHeight: '1.5' }}>
              "Mi mamá me habla de su amiga Lupita. Ya están intercambiando recetas."
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>José Luis M. • Los Angeles, CA</p>
          </div>
        </section>

        {/* PRICING */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(236,72,153,0.1))',
          borderRadius: '20px',
          padding: '28px 24px',
          marginBottom: '32px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '22px',
            marginBottom: '20px',
          }}>Cuida a los que más quieres</h2>
          
          <div style={{
            background: '#1F2937',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '20px',
          }}>
            <p style={{ fontSize: '48px', fontWeight: '700', color: '#06B6D4' }}>$12</p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>USD al mes</p>
            <p style={{ fontSize: '13px', marginTop: '8px' }}>Solo <strong>40¢ al día</strong></p>
          </div>

          <ul style={{ textAlign: 'left', fontSize: '14px', lineHeight: '2', marginBottom: '20px', listStyle: 'none', padding: 0 }}>
            <li>✓ Hasta <strong>4 familiares</strong> incluidos</li>
            <li>✓ Telemedicina <strong>24/7 ilimitada</strong></li>
            <li style={{ display: 'none' }}>✓ Hasta <strong>75% descuento</strong> en farmacias</li>
            <li>✓ <strong>Terapia semanal</strong> incluida</li>
            <li>✓ <strong>Lupita o Fernanda</strong> — compañía</li>
            <li>✓ <strong>Seguimiento de ahorros</strong> cada mes</li>
          </ul>

          <Link href="/registro-jan" style={{
            display: 'block',
            padding: '18px 32px',
            background: 'linear-gradient(135deg, #EC4899, #DB2777)',
            border: 'none',
            borderRadius: '14px',
            color: 'white',
            fontSize: '18px',
            fontWeight: '700',
            width: '100%',
            boxShadow: '0 8px 32px rgba(236,72,153,0.3)',
            textDecoration: 'none',
            textAlign: 'center',
          }}>Quiero Contratar Ahora</Link>
          
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
            Cancela cuando quieras. Sin preguntas.
          </p>
        </section>

        {/* FOOTER */}
        <footer style={{
          textAlign: 'center',
          padding: '20px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          <Image 
            src="/saludcompartida-dark-no-tagline.png" 
            alt="SaludCompartida" 
            width={120}
            height={32}
            style={{ height: '32px', width: 'auto', marginBottom: '12px' }}
          />
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
            Cuidando familias, acortando distancias.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>
            <Link href="/terminos" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Términos</Link>
            <Link href="/privacidad" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Privacidad</Link>
            <Link href="/contacto" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Contáctanos</Link>
          </div>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
            © 2025 SaludCompartida. Todos los derechos reservados.
          </p>
        </footer>

      </div>
    </div>
  );
}
