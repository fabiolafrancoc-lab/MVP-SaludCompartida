'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

/**
 * ============================================
 * SaludCompartida - Mobile Landing Page
 * ============================================
 * 
 * CONVERTIDO DEL HTML: saludcompartida-mobile-landing.html
 * 
 * "La distancia duele" - Diseño emocional premium
 * Dark theme con gradientes cyan/magenta
 * 
 * ============================================
 */

// CSS-in-JS Styles (convertidos del HTML)
const styles = {
  // CSS Variables como objeto
  colors: {
    cyan: '#06B6D4',
    cyanDark: '#0891B2',
    magenta: '#EC4899',
    magentaDark: '#DB2777',
    gray900: '#1F2937',
    gray800: '#374151',
    gray700: '#4B5563',
    gray100: '#F3F4F6',
    white: '#FFFFFF',
    gold: '#F59E0B',
    green: '#10B981',
  }
};

export default function MobileLandingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    countryCode: '+1'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(23);

  // Simular actualización de spots
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8 && spotsLeft > 5) {
        setSpotsLeft(prev => prev - 1);
      }
    }, 45000);
    return () => clearInterval(interval);
  }, [spotsLeft]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      localStorage.setItem('registrationData', JSON.stringify(formData));
      router.push('/registro');
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mobile-landing">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap');
        
        :root {
          --cyan: #06B6D4;
          --cyan-dark: #0891B2;
          --magenta: #EC4899;
          --magenta-dark: #DB2777;
          --gray-900: #1F2937;
          --gray-800: #374151;
          --gray-700: #4B5563;
          --gray-100: #F3F4F6;
          --white: #FFFFFF;
          --gold: #F59E0B;
          --green: #10B981;
        }

        .mobile-landing {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--gray-900);
          color: var(--white);
          min-height: 100vh;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* ===== HERO SECTION ===== */
        .hero {
          padding: 40px 20px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .hero::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -30%;
          width: 80%;
          height: 80%;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 60%);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 480px;
          margin: 0 auto;
        }

        /* Emotional opener */
        .emotional-opener {
          text-align: center;
          margin-bottom: 32px;
          animation: fadeInUp 0.8s ease-out;
        }

        .emotional-opener .greeting {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          color: var(--cyan);
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .emotional-opener .subtext {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }

        .emotional-opener .highlight {
          color: var(--magenta);
          font-weight: 600;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* FOMO Container */
        .fomo-container {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(236, 72, 153, 0.08));
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 20px;
          padding: 28px 24px;
          margin-bottom: 28px;
          text-align: center;
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .commitment-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 16px;
          color: var(--magenta);
          opacity: 0.9;
        }

        .commitment-text {
          font-size: 17px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 20px;
        }

        .commitment-text strong {
          color: var(--cyan);
        }

        .limit-box {
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.3);
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 16px;
        }

        .limit-number {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          color: var(--cyan);
          line-height: 1.2;
          margin-bottom: 4px;
        }

        .limit-detail {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }

        .limit-detail strong {
          color: var(--gold);
        }

        .commitment-why {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          font-style: italic;
        }

        /* Value Card */
        .value-card {
          background: var(--gray-800);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        .value-headline {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .value-headline .aqui {
          color: var(--cyan);
        }

        .value-headline .alla {
          color: var(--magenta);
        }

        .value-price {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: rgba(6, 182, 212, 0.1);
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .price-main {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .price-daily {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .price-cents {
          font-family: 'DM Serif Display', serif;
          font-size: 42px;
          color: var(--cyan);
          line-height: 1;
        }

        .price-per {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }

        .price-monthly {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 2px;
        }

        .value-includes {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .value-includes li {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
        }

        .value-includes li:last-child {
          border-bottom: none;
        }

        .include-icon {
          width: 32px;
          height: 32px;
          background: rgba(6, 182, 212, 0.15);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .include-icon svg {
          width: 18px;
          height: 18px;
          color: var(--cyan);
        }

        /* CTA Section */
        .cta-section {
          animation: fadeInUp 0.8s ease-out 0.6s both;
        }

        .cta-form {
          background: var(--gray-800);
          border-radius: 20px;
          padding: 24px;
          border: 1px solid rgba(6, 182, 212, 0.2);
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 8px;
          font-weight: 500;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          background: var(--gray-900);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          color: var(--white);
          font-size: 16px;
          font-family: inherit;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--cyan);
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.2);
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .phone-group {
          display: flex;
          gap: 8px;
        }

        .country-select {
          width: 90px;
          padding: 14px 8px;
          background: var(--gray-900);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          color: var(--white);
          font-size: 14px;
          font-family: inherit;
        }

        .country-select:focus {
          outline: none;
          border-color: var(--cyan);
        }

        .cta-button {
          width: 100%;
          padding: 18px 24px;
          background: linear-gradient(135deg, var(--magenta), var(--magenta-dark));
          border: none;
          border-radius: 14px;
          color: var(--white);
          font-size: 17px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(236, 72, 153, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(236, 72, 153, 0.4);
        }

        .cta-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .cta-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
        }

        .cta-note svg {
          width: 16px;
          height: 16px;
          color: var(--green);
        }

        /* Services Section */
        .services {
          padding: 40px 20px;
          background: var(--gray-800);
        }

        .services-content {
          max-width: 480px;
          margin: 0 auto;
        }

        .section-label {
          text-transform: uppercase;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          color: var(--cyan);
          margin-bottom: 12px;
          text-align: center;
        }

        .section-title {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          text-align: center;
          margin-bottom: 32px;
          line-height: 1.2;
        }

        .services-grid {
          display: grid;
          gap: 16px;
        }

        .service-card {
          background: var(--gray-900);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          gap: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.2s ease;
        }

        .service-card:hover {
          border-color: rgba(6, 182, 212, 0.3);
        }

        .service-icon {
          width: 48px;
          height: 48px;
          background: rgba(6, 182, 212, 0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .service-icon svg {
          width: 24px;
          height: 24px;
          color: var(--cyan);
        }

        .service-icon.magenta {
          background: rgba(236, 72, 153, 0.15);
        }

        .service-icon.magenta svg {
          color: var(--magenta);
        }

        .service-content h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .service-content p {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.4;
        }

        /* Companions Section */
        .companions {
          padding: 40px 20px;
          background: linear-gradient(180deg, var(--gray-900), var(--gray-800));
        }

        .companions-content {
          max-width: 480px;
          margin: 0 auto;
        }

        .companions-intro {
          text-align: center;
          margin-bottom: 24px;
        }

        .companions-intro em {
          color: var(--magenta);
          font-style: normal;
        }

        .companions-grid {
          display: grid;
          gap: 16px;
          margin-bottom: 24px;
        }

        .companion-card {
          background: var(--gray-900);
          border-radius: 20px;
          padding: 24px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .companion-card:hover {
          transform: translateY(-2px);
        }

        .companion-card.lupita {
          border-color: rgba(236, 72, 153, 0.3);
        }

        .companion-card.fernanda {
          border-color: rgba(6, 182, 212, 0.3);
        }

        .companion-avatar {
          width: 80px;
          height: 80px;
          margin: 0 auto 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .companion-avatar.lupita-avatar {
          background: linear-gradient(135deg, var(--magenta), #9333EA);
        }

        .companion-avatar.fernanda-avatar {
          background: linear-gradient(135deg, var(--cyan), var(--cyan-dark));
        }

        .companion-avatar svg {
          width: 40px;
          height: 40px;
          color: white;
        }

        .companion-name {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          margin-bottom: 4px;
        }

        .companion-card.lupita .companion-name {
          color: var(--magenta);
        }

        .companion-card.fernanda .companion-name {
          color: var(--cyan);
        }

        .companion-for {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 12px;
        }

        .companion-desc {
          font-size: 14px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 16px;
        }

        .companion-features {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        .companion-features span {
          font-size: 11px;
          padding: 6px 10px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.7);
        }

        /* WhatsApp Button */
        .whatsapp-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 16px 24px;
          background: linear-gradient(135deg, #25D366, #128C7E);
          border: none;
          border-radius: 14px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          margin-top: 16px;
          transition: all 0.2s ease;
        }

        .whatsapp-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.3);
        }

        .whatsapp-cta svg {
          width: 24px;
          height: 24px;
        }

        /* Footer */
        .footer {
          padding: 32px 20px;
          background: var(--gray-900);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          text-align: center;
        }

        .footer-logo {
          height: 32px;
          margin-bottom: 16px;
          opacity: 0.8;
        }

        .footer-text {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 8px;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 16px;
        }

        .footer-links a {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: var(--cyan);
        }

        /* Loading Spinner */
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
      `}</style>

      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero-content">
          
          {/* Emotional Opener */}
          <div className="emotional-opener">
            <h1 className="greeting">Sabemos que la distancia duele</h1>
            <p className="subtext">
              Y que cada día te preguntas si tu familia está bien.
              <br/>
              <span className="highlight">Ya no tienes que preocuparte solo.</span>
            </p>
          </div>

          {/* FOMO / Commitment Container */}
          <div className="fomo-container">
            <div className="commitment-icon">
              <HeartIcon />
            </div>
            <p className="commitment-text">
              Estamos comenzando con <strong>familias que realmente necesitan esto</strong>.
              No buscamos millones de usuarios, buscamos cuidar bien a cada familia.
            </p>
            <div className="limit-box">
              <div className="limit-number">{spotsLeft} lugares</div>
              <p className="limit-detail">disponibles este mes • <strong>Precio fundador $12/mes</strong></p>
            </div>
            <p className="commitment-why">
              Cuando crezcamos, los precios subirán. Pero tú mantendrás este precio.
            </p>
          </div>

          {/* Value Card */}
          <div className="value-card">
            <h2 className="value-headline">
              Tú <span className="aqui">aquí</span>, ellos <span className="alla">allá</span>
              <br/>—pero siempre cuidados.
            </h2>
            
            <div className="value-price">
              <div className="price-main">
                <div className="price-daily">
                  <span className="price-cents">40¢</span>
                  <span className="price-per">al día</span>
                </div>
                <span className="price-monthly">$12 USD/mes • Hasta 4 familiares</span>
              </div>
            </div>

            <ul className="value-includes">
              <li>
                <div className="include-icon">
                  <DoctorIcon />
                </div>
                <span>Doctores 24/7 por teléfono o video</span>
              </li>
              <li>
                <div className="include-icon">
                  <PharmacyIcon />
                </div>
                <span>Hasta 75% de descuento en farmacias</span>
              </li>
              <li>
                <div className="include-icon">
                  <TherapyIcon />
                </div>
                <span>Sesiones de terapia psicológica</span>
              </li>
              <li>
                <div className="include-icon">
                  <CompanionIcon />
                </div>
                <span>Lupita, tu compañera que llama a tu familia</span>
              </li>
            </ul>
          </div>

          {/* CTA Form */}
          <div className="cta-section">
            <form className="cta-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Tu nombre</label>
                <input 
                  type="text"
                  name="firstName"
                  className="form-input"
                  placeholder="¿Cómo te llamas?"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Tu WhatsApp (en USA)</label>
                <div className="phone-group">
                  <select 
                    name="countryCode"
                    className="country-select"
                    value={formData.countryCode}
                    onChange={handleChange}
                  >
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+52">🇲🇽 +52</option>
                  </select>
                  <input 
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="cta-button" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    Quiero cuidar a mi familia
                    <ArrowRightIcon />
                  </>
                )}
              </button>

              <p className="cta-note">
                <CheckCircleIcon />
                Sin compromiso • Cancela cuando quieras
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="services">
        <div className="services-content">
          <p className="section-label">Todo Incluido</p>
          <h2 className="section-title">Lo que tu familia recibe</h2>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <DoctorIcon />
              </div>
              <div className="service-content">
                <h3>Telemedicina 24/7</h3>
                <p>Doctores mexicanos certificados, a cualquier hora</p>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <PharmacyIcon />
              </div>
              <div className="service-content">
                <h3>Descuentos en farmacia</h3>
                <p>Hasta 75% en +1,700 farmacias en México</p>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon magenta">
                <TherapyIcon />
              </div>
              <div className="service-content">
                <h3>Terapia psicológica</h3>
                <p>Sesiones semanales con psicólogos profesionales</p>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon magenta">
                <CompanionIcon />
              </div>
              <div className="service-content">
                <h3>Lupita te acompaña</h3>
                <p>Llama a tu familia para que nunca se sientan solos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMPANIONS SECTION ===== */}
      <section className="companions">
        <div className="companions-content">
          <p className="section-label">Algo Único</p>
          <h2 className="section-title">Compañeras que cuidan con el corazón</h2>
          
          <p className="companions-intro">
            No son bots. Son <em>compañeras</em> que entienden lo que es estar lejos de la familia.
          </p>

          <div className="companions-grid">
            {/* Lupita Card */}
            <div className="companion-card lupita">
              <div className="companion-avatar lupita-avatar">
                <HeartIcon />
              </div>
              <h3 className="companion-name">Lupita</h3>
              <p className="companion-for">Para mayores de 55</p>
              <p className="companion-desc">
                Cálida y paciente. Llama a tu mamá o papá para platicar, recordarles sus medicinas, 
                o simplemente hacerles compañía.
              </p>
              <div className="companion-features">
                <span>Llamadas de cariño</span>
                <span>Recordatorios</span>
                <span>Compañía</span>
              </div>
            </div>

            {/* Fernanda Card */}
            <div className="companion-card fernanda">
              <div className="companion-avatar fernanda-avatar">
                <SparklesIcon />
              </div>
              <h3 className="companion-name">Fernanda</h3>
              <p className="companion-for">Para 25-55 años</p>
              <p className="companion-desc">
                Energética y práctica. Ayuda a tus hermanos o hijos a encontrar descuentos, 
                agendar citas, y resolver dudas de salud.
              </p>
              <div className="companion-features">
                <span>Gestión ágil</span>
                <span>Descuentos</span>
                <span>Citas médicas</span>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a 
            href="https://wa.me/5529984922702?text=Hola%20Lupita,%20quiero%20saber%20más%20sobre%20SaludCompartida"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-cta"
          >
            <WhatsAppIcon />
            Habla con Lupita ahora
          </a>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <img 
          src="/saludcompartida_logo_white.png" 
          alt="SaludCompartida" 
          className="footer-logo"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <p className="footer-text">
          SaludCompartida © 2025
        </p>
        <p className="footer-text">
          Cuidando familias, acortando distancias.
        </p>
        <div className="footer-links">
          <a href="/terminos">Términos</a>
          <a href="/privacidad">Privacidad</a>
          <a href="/contacto">Contacto</a>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// ICONOS SVG
// ============================================

const HeartIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const DoctorIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const PharmacyIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
  </svg>
);

const TherapyIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const CompanionIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </svg>
);

const SparklesIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
