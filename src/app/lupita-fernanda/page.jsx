'use client';

import SharedHeader from '../../components/SharedHeader';
import SharedFooter from '../../components/SharedFooter';

export default function LupitaFernandaPage() {
  return (
    <>
      <SharedHeader />
      
      <style jsx global>{`
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #111827;
          color: white;
          margin: 0;
          padding: 0;
        }

        .lupita-fernanda-page {
          min-height: 100vh;
          padding: 120px 24px 80px;
          background: #111827;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 52px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #EC4899, #DB2777);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-section-title {
          font-size: 28px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 40px;
          color: rgba(255,255,255,0.9);
        }

        .page-subtitle {
          font-size: 22px;
          text-align: center;
          color: rgba(255,255,255,0.7);
          margin-bottom: 80px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .intro-text {
          font-size: 20px;
          line-height: 1.8;
          color: rgba(255,255,255,0.85);
          max-width: 900px;
          margin: 0 auto 80px;
          text-align: center;
        }

        .companions-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 60px;
          margin-top: 80px;
        }

        @media (min-width: 1024px) {
          .companions-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .companion-card {
          background: #1F2937;
          border-radius: 32px;
          padding: 48px;
          border: 3px solid #EC4899;
          box-shadow: 0 12px 48px rgba(236, 72, 153, 0.3);
          transition: all 0.3s ease;
        }

        .companion-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(236, 72, 153, 0.5);
        }

        .companion-icon {
          width: 80px;
          height: 80px;
          margin-bottom: 32px;
        }

        .companion-name {
          font-size: 42px;
          font-weight: 800;
          margin-bottom: 16px;
          color: #EC4899;
        }

        .companion-tagline {
          font-size: 20px;
          color: rgba(255,255,255,0.7);
          margin-bottom: 32px;
          font-style: italic;
        }

        .companion-description {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(255,255,255,0.85);
          margin-bottom: 24px;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin-top: 32px;
        }

        .features-list li {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(255,255,255,0.9);
          margin-bottom: 16px;
          padding-left: 32px;
          position: relative;
        }

        .features-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #EC4899;
          font-weight: bold;
          font-size: 20px;
        }

        .highlight-box {
          background: rgba(236, 72, 153, 0.1);
          border-left: 4px solid #EC4899;
          padding: 24px;
          margin-top: 40px;
          border-radius: 12px;
        }

        .highlight-box p {
          margin: 0;
          font-size: 18px;
          line-height: 1.7;
          color: rgba(255,255,255,0.9);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 38px;
          }

          .companion-card {
            padding: 32px 24px;
          }

          .companion-name {
            font-size: 32px;
          }
        }
      `}</style>

      <div className="lupita-fernanda-page">
        <div className="container">
          <h1 className="page-title">Qué nos hace Únicos</h1>
          <h2 className="page-section-title">
            Lupita y Fernanda
          </h2>
          <p className="page-subtitle">
            El soporte que nuestras familias de manera silenciosa necesitan
          </p>

          <div className="intro-text">
            <p>
              <strong>La soledad no es parte del envejecimiento. La ansiedad de criar sola no tiene que ser tu realidad.</strong>
              <br/><br/>
              Lupita y Fernanda son más que un servicio. Son compañía genuina, diseñada con empatía 
              para los momentos en que tu familia más lo necesita.
            </p>
          </div>

          <div className="companions-grid">
            {/* Lupita Card */}
            <div className="companion-card">
              <svg className="companion-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="32" cy="24" r="12" fill="#EC4899"/>
                <path d="M16 50 C16 38, 48 38, 48 50" fill="#EC4899"/>
                <path d="M20 30 L20 26 M44 30 L44 26" stroke="#EC4899" strokeWidth="3" strokeLinecap="round"/>
              </svg>

              <h2 className="companion-name">Lupita</h2>
              <p className="companion-tagline">"Tu mamá ya no está sola"</p>

              <p className="companion-description">
                Lupita es compañía especialmente diseñada para adultos mayores. No es solo una llamada, 
                es una amiga que siempre tiene tiempo para platicar.
              </p>

              <ul className="features-list">
                <li>Llama semanalmente a tus padres o abuelos</li>
                <li>Conversaciones sobre recetas, música, historias de antes</li>
                <li>Seguimiento de cómo se sienten y qué necesitan</li>
                <li>Reportes para ti después de cada llamada</li>
                <li>Detecta si necesitan atención médica o emocional</li>
              </ul>

              <div className="highlight-box">
                <p>
                  "Desde que Lupita llama a mi mamá, ella me cuenta emocionada sobre las recetas 
                  que intercambiaron. Ya no se siente tan sola." — José Luis M., Tucson
                </p>
              </div>
            </div>

            {/* Fernanda Card */}
            <div className="companion-card">
              <svg className="companion-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="32" cy="22" r="10" fill="#EC4899"/>
                <path d="M20 45 C20 35, 44 35, 44 45" fill="#EC4899"/>
                <circle cx="24" cy="52" r="5" fill="#EC4899" opacity="0.7"/>
                <circle cx="40" cy="52" r="5" fill="#EC4899" opacity="0.7"/>
              </svg>

              <h2 className="companion-name">Fernanda</h2>
              <p className="companion-tagline">"Para las que cuidan mientras esperan"</p>

              <p className="companion-description">
                Fernanda acompaña a mamás, esposas de migrantes, y mujeres que cuidan a sus familias 
                mientras sus parejas trabajan lejos. Alguien que entiende, que escucha, que está ahí.
              </p>

              <ul className="features-list">
                <li>Llamadas semanales cuando más lo necesitas</li>
                <li>Conversaciones sobre crianza, recetas, presupuesto familiar</li>
                <li>Apoyo emocional en los días difíciles</li>
                <li>Tips prácticos para el día a día</li>
                <li>Una amiga que siempre tiene tiempo para ti</li>
              </ul>

              <div className="highlight-box">
                <p>
                  "Fernanda me llama cuando estoy sola con la niña y mi esposo trabajando. A veces 
                  solo necesito que alguien me escuche. Es como tener una amiga que siempre tiene 
                  tiempo para mí." — Lucía M., Dallas
                </p>
              </div>
            </div>
          </div>

          <div style={{marginTop: '80px', textAlign: 'center', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto'}}>
            <h3 style={{fontSize: '32px', marginBottom: '24px', color: '#EC4899'}}>
              Porque la soledad no debería ser parte de la historia de tu familia
            </h3>
            <p style={{fontSize: '20px', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)'}}>
              Lupita y Fernanda no son robots. No son grabaciones. Son personas reales, con empatía real, 
              entrenadas para acompañar a tu familia de la manera que más necesitan. Porque a veces, 
              lo que más falta no es medicina, sino compañía.
            </p>
          </div>
        </div>
      </div>

      <SharedFooter />
    </>
  );
}
