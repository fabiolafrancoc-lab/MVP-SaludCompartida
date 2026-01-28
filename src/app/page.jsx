'use client';'use client';



import SharedHeader from '../components/SharedHeader';import { useState } from 'react';

import SharedFooter from '../components/SharedFooter';import { useRouter } from 'next/navigation';



export default function LandingPage() {/**

  return ( * LANDING ALTERNATIVA - saludcompartida.app/landing-nueva

    <> * 

      <SharedHeader /> * Diseño emocional con foto izquierda, formulario derecha

       * Contador naranja de familias protegidas (847)

      <style jsx global>{` * Form: firstName + lastName + email + phone → /registro-nuevo

        :root { * 

          --cyan: #06B6D4; * @route /landing-nueva (URL separada para campañas específicas)

          --magenta: #EC4899; * @approved Diseño aprobado - No cambiar layout sin autorización

          --gray-900: #111827; * @purpose Página alternativa para pruebas A/B o campañas dirigidas

          --gray-800: #1F2937; */

        }

export default function Page1Landing() {

        body {  const router = useRouter();

          font-family: 'Plus Jakarta Sans', sans-serif;  const [formData, setFormData] = useState({

          background: var(--gray-900);    firstName: '',

          color: white;    lastName: '',

          margin: 0;    email: '',

          padding: 0;    phone: '',

        }    countryCode: '+1'

  });

        /* HERO SECTION */  const [isLoading, setIsLoading] = useState(false);

        .hero {  const [error, setError] = useState('');

          min-height: 100vh;

          display: flex;  // Contador de familias (puede venir de API)

          flex-direction: column;  const familiesProtected = 847;

          justify-content: center;

          align-items: center;  const handleChange = (e) => {

          padding: 120px 24px 80px;    const { name, value } = e.target;

          background: var(--gray-900);    setFormData(prev => ({ ...prev, [name]: value }));

          position: relative;  };

          overflow: hidden;

        }  const handleSubmit = async (e) => {

    e.preventDefault();

        .hero-content {    setIsLoading(true);

          max-width: 1200px;    setError('');

          width: 100%;

          text-align: center;    try {

          z-index: 2;      // Guardar en localStorage para siguiente página

        }      localStorage.setItem('registrationData', JSON.stringify(formData));

      

        .hero-title {      // Navegar a página 2 (registro completo)

          font-size: 56px;      router.push('/registro');

          font-weight: 800;    } catch (err) {

          margin-bottom: 24px;      setError('Hubo un error. Por favor intenta de nuevo.');

          background: linear-gradient(135deg, var(--cyan), var(--magenta));      console.error('Error:', err);

          -webkit-background-clip: text;    } finally {

          -webkit-text-fill-color: transparent;      setIsLoading(false);

          background-clip: text;    }

          line-height: 1.2;  };

        }

  return (

        .hero-subtitle {    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-pink-50">

          font-size: 24px;      {/* Header */}

          color: rgba(255,255,255,0.8);      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">

          margin-bottom: 40px;        <div className="container mx-auto px-4 py-4 flex items-center justify-between">

          line-height: 1.6;          <img 

        }            src="/saludcompartida_logo.png" 

            alt="SaludCompartida" 

        .hero-video-container {            className="h-10 md:h-12"

          width: 100%;          />

          max-width: 900px;          <div className="flex items-center gap-4">

          margin: 40px auto;            <a 

          border-radius: 24px;              href="tel:+18001234567" 

          overflow: hidden;              className="hidden md:flex items-center gap-2 text-gray-600 hover:text-cyan-600 transition-colors"

          box-shadow: 0 20px 60px rgba(0,0,0,0.5);            >

          border: 2px solid rgba(6, 182, 212, 0.3);              <PhoneIcon className="w-5 h-5" />

        }              <span className="font-medium">1-800-123-4567</span>

            </a>

        .hero-video {            <button 

          width: 100%;              onClick={() => router.push('/login')}

          height: auto;              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"

          display: block;            >

        }              Iniciar Sesión

            </button>

        .hero-cta {          </div>

          margin-top: 40px;        </div>

        }      </header>



        .cta-button {      {/* Main Content */}

          display: inline-block;      <main className="container mx-auto px-4 py-8 md:py-12">

          background: linear-gradient(135deg, var(--cyan), var(--magenta));        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">

          color: white;          

          font-size: 20px;          {/* Left Side - Image & Emotional Content */}

          font-weight: 700;          <div className="order-2 lg:order-1">

          padding: 18px 48px;            {/* Main Image */}

          border-radius: 12px;            <div className="relative">

          text-decoration: none;              <img 

          transition: all 0.3s ease;                src="/images/familia-mexicana.jpg" 

          border: none;                alt="Familia mexicana feliz"

          cursor: pointer;                className="rounded-3xl shadow-2xl w-full object-cover"

        }                style={{ maxHeight: '500px' }}

              />

        .cta-button:hover {              

          transform: translateY(-2px);              {/* Overlay Badge */}

          box-shadow: 0 12px 32px rgba(6, 182, 212, 0.4);              <div className="absolute -bottom-4 -right-4 md:bottom-6 md:right-6 bg-white rounded-2xl shadow-xl p-4 md:p-6">

        }                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center">

        /* TESTIMONIALS SECTION */                    <HeartIcon className="w-6 h-6 text-white" />

        .testimonials {                  </div>

          padding: 80px 24px;                  <div>

          background: var(--gray-800);                    <p className="text-gray-600 text-sm">Cuidando familias</p>

        }                    <p className="text-gray-900 font-bold text-lg">Desde USA a México</p>

                  </div>

        .testimonials-container {                </div>

          max-width: 1200px;              </div>

          margin: 0 auto;            </div>

        }

            {/* Emotional Text */}

        .section-title {            <div className="mt-8 space-y-4">

          font-size: 48px;              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">

          font-weight: 800;                Porque la distancia no debería separarte de 

          text-align: center;                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500"> cuidar a quien amas</span>

          margin-bottom: 60px;              </h2>

          background: linear-gradient(135deg, var(--cyan), var(--magenta));              <p className="text-gray-600 text-lg">

          -webkit-background-clip: text;                Tu mamá merece atención médica de calidad. Tu papá merece sus medicamentos a tiempo. 

          -webkit-text-fill-color: transparent;                Tus hijos merecen un doctor cuando lo necesitan.

          background-clip: text;              </p>

        }            </div>



        .testimonial-card {            {/* Trust Badges */}

          background: var(--gray-900);            <div className="mt-6 flex flex-wrap gap-4">

          border-radius: 20px;              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">

          padding: 40px;                <CheckIcon className="w-5 h-5 text-green-500" />

          border: 2px solid rgba(6, 182, 212, 0.2);                <span className="text-green-700 font-medium text-sm">Telemedicina 24/7</span>

          margin-bottom: 32px;              </div>

        }              <div className="flex items-center gap-2 bg-cyan-50 px-4 py-2 rounded-full">

                <CheckIcon className="w-5 h-5 text-cyan-500" />

        .testimonial-text {                <span className="text-cyan-700 font-medium text-sm">75% descuento farmacia</span>

          font-size: 20px;              </div>

          line-height: 1.8;              <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full">

          color: rgba(255,255,255,0.9);                <CheckIcon className="w-5 h-5 text-pink-500" />

          margin-bottom: 24px;                <span className="text-pink-700 font-medium text-sm">Terapia semanal</span>

          font-style: italic;              </div>

        }            </div>

          </div>

        .testimonial-author {

          font-size: 18px;          {/* Right Side - Form */}

          font-weight: 600;          <div className="order-1 lg:order-2">

          color: var(--cyan);            {/* Counter Badge - Orange */}

        }            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-4 mb-6 shadow-lg">

              <div className="flex items-center justify-center gap-3">

        /* PRICING SECTION */                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">

        .pricing {                  <UsersIcon className="w-6 h-6 text-white" />

          padding: 80px 24px;                </div>

          background: var(--gray-900);                <div className="text-white">

        }                  <p className="text-3xl font-bold">{familiesProtected.toLocaleString()}</p>

                  <p className="text-white/90 text-sm">familias ya protegidas</p>

        .pricing-container {                </div>

          max-width: 800px;              </div>

          margin: 0 auto;            </div>

          text-align: center;

        }            {/* Form Card */}

            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">

        .pricing-card {              <div className="text-center mb-6">

          background: var(--gray-800);                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">

          border-radius: 24px;                  Protege a tu familia hoy

          padding: 60px 40px;                </h1>

          border: 3px solid var(--cyan);                <p className="text-gray-600">

          box-shadow: 0 20px 60px rgba(6, 182, 212, 0.3);                  Desde <span className="text-cyan-600 font-bold">$12 USD</span> al mes para toda la familia

        }                </p>

              </div>

        .price {

          font-size: 72px;              {error && (

          font-weight: 800;                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">

          color: var(--cyan);                  {error}

          margin: 20px 0;                </div>

        }              )}



        .price-period {              <form onSubmit={handleSubmit} className="space-y-4">

          font-size: 24px;                {/* Name Fields */}

          color: rgba(255,255,255,0.6);                <div className="grid grid-cols-2 gap-4">

        }                  <div>

                    <label className="block text-gray-700 font-medium mb-1 text-sm">

        .features-list {                      Nombre

          text-align: left;                    </label>

          margin: 40px 0;                    <input

        }                      type="text"

                      name="firstName"

        .feature-item {                      value={formData.firstName}

          font-size: 18px;                      onChange={handleChange}

          padding: 12px 0;                      required

          border-bottom: 1px solid rgba(255,255,255,0.1);                      placeholder="Tu nombre"

          color: rgba(255,255,255,0.9);                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"

        }                    />

                  </div>

        .feature-item:last-child {                  <div>

          border-bottom: none;                    <label className="block text-gray-700 font-medium mb-1 text-sm">

        }                      Apellido

                    </label>

        /* SUBSCRIPTION FORM */                    <input

        .subscription-form {                      type="text"

          padding: 80px 24px;                      name="lastName"

          background: var(--gray-800);                      value={formData.lastName}

        }                      onChange={handleChange}

                      required

        .form-container {                      placeholder="Tu apellido"

          max-width: 600px;                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"

          margin: 0 auto;                    />

        }                  </div>

                </div>

        .form-title {

          font-size: 36px;                {/* Email */}

          font-weight: 700;                <div>

          text-align: center;                  <label className="block text-gray-700 font-medium mb-1 text-sm">

          margin-bottom: 40px;                    Correo electrónico

          color: white;                  </label>

        }                  <input

                    type="email"

        .form-group {                    name="email"

          margin-bottom: 24px;                    value={formData.email}

        }                    onChange={handleChange}

                    required

        .form-label {                    placeholder="tu@email.com"

          display: block;                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"

          font-size: 16px;                  />

          font-weight: 600;                </div>

          margin-bottom: 8px;

          color: rgba(255,255,255,0.9);                {/* Phone */}

        }                <div>

                  <label className="block text-gray-700 font-medium mb-1 text-sm">

        .form-input {                    Teléfono (WhatsApp)

          width: 100%;                  </label>

          padding: 16px;                  <div className="flex gap-2">

          font-size: 16px;                    <select

          border: 2px solid rgba(6, 182, 212, 0.3);                      name="countryCode"

          border-radius: 8px;                      value={formData.countryCode}

          background: var(--gray-900);                      onChange={handleChange}

          color: white;                      className="px-3 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none bg-gray-50"

          transition: all 0.3s ease;                    >

        }                      <option value="+1">🇺🇸 +1</option>

                      <option value="+52">🇲🇽 +52</option>

        .form-input:focus {                    </select>

          outline: none;                    <input

          border-color: var(--cyan);                      type="tel"

          box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.1);                      name="phone"

        }                      value={formData.phone}

                      onChange={handleChange}

        .submit-button {                      required

          width: 100%;                      placeholder="(555) 123-4567"

          background: linear-gradient(135deg, var(--cyan), var(--magenta));                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"

          color: white;                    />

          font-size: 20px;                  </div>

          font-weight: 700;                </div>

          padding: 18px;

          border-radius: 12px;                {/* Submit Button */}

          border: none;                <button

          cursor: pointer;                  type="submit"

          transition: all 0.3s ease;                  disabled={isLoading}

        }                  className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"

                >

        .submit-button:hover {                  {isLoading ? (

          transform: translateY(-2px);                    <span className="flex items-center justify-center gap-2">

          box-shadow: 0 12px 32px rgba(6, 182, 212, 0.4);                      <LoadingSpinner />

        }                      Procesando...

                    </span>

        @media (max-width: 768px) {                  ) : (

          .hero-title {                    'Comenzar Ahora →'

            font-size: 36px;                  )}

          }                </button>



          .hero-subtitle {                {/* Terms */}

            font-size: 18px;                <p className="text-center text-gray-500 text-xs mt-4">

          }                  Al continuar, aceptas nuestros{' '}

                  <a href="/terminos" className="text-cyan-600 hover:underline">

          .section-title {                    Términos de Servicio

            font-size: 32px;                  </a>{' '}

          }                  y{' '}

                  <a href="/privacidad" className="text-cyan-600 hover:underline">

          .price {                    Política de Privacidad

            font-size: 48px;                  </a>

          }                </p>

        }              </form>

      `}</style>

              {/* Social Proof */}

      {/* HERO SECTION */}              <div className="mt-6 pt-6 border-t border-gray-100">

      <section className="hero">                <div className="flex items-center justify-center gap-2">

        <div className="hero-content">                  <div className="flex -space-x-2">

          <h1 className="hero-title">                    <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>

            Cuida a tu Familia en México desde Estados Unidos                    <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>

          </h1>                    <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white"></div>

          <p className="hero-subtitle">                  </div>

            Telemedicina 24/7, Descuentos en Farmacias y Apoyo Emocional por solo $12/mes                  <p className="text-gray-600 text-sm">

          </p>                    <span className="font-semibold">+2,500</span> familias confían en nosotros

                  </p>

          <div className="hero-video-container">                </div>

            <video               </div>

              className="hero-video"             </div>

              autoPlay 

              loop             {/* WhatsApp Help */}

              muted             <div className="mt-6 text-center">

              playsInline              <p className="text-gray-600 mb-2">¿Necesitas ayuda?</p>

            >              <a 

              <source src="/LANDING_VIDEO SIN FIN_LIVIANO.mov" type="video/mp4" />                href="https://wa.me/5529984922702?text=Hola,%20necesito%20información%20sobre%20SaludCompartida"

              Tu navegador no soporta el video.                target="_blank"

            </video>                rel="noopener noreferrer"

          </div>                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"

              >

          <div className="hero-cta">                <WhatsAppIcon className="w-5 h-5" />

            <a href="#subscription" className="cta-button">                Escríbenos por WhatsApp

              Protege a tu Familia Ahora              </a>

            </a>            </div>

          </div>          </div>

        </div>        </div>

      </section>      </main>



      {/* TESTIMONIALS SECTION */}      {/* Footer */}

      <section className="testimonials">      <footer className="bg-gray-900 text-white py-8 mt-12">

        <div className="testimonials-container">        <div className="container mx-auto px-4 text-center">

          <h2 className="section-title">HISTORIAS REALES</h2>          <img 

                      src="/saludcompartida_logo_white.png" 

          <div className="testimonial-card">            alt="SaludCompartida" 

            <p className="testimonial-text">            className="h-8 mx-auto mb-4 opacity-80"

              "Gracias a SaludCompartida, mi mamá en México puede hablar con un doctor a cualquier hora. Ya no tengo que preocuparme por si le pasa algo de noche."          />

            </p>          <p className="text-gray-400 text-sm">

            <p className="testimonial-author">— María G., Los Angeles, CA</p>            SaludCompartida © 2025 - Cuidando familias, construyendo futuro

          </div>          </p>

          <p className="text-gray-500 text-xs mt-2">

          <div className="testimonial-card">            Servicio de salud para familias de migrantes en México, Centroamérica e India

            <p className="testimonial-text">          </p>

              "Los descuentos en medicinas son increíbles. Mis papás ahorran más de $200 dólares al mes. El servicio se paga solo."        </div>

            </p>      </footer>

            <p className="testimonial-author">— Carlos R., Houston, TX</p>    </div>

          </div>  );

        </div>}

      </section>

// ============================================

      {/* PRICING SECTION */}// ICONOS SVG

      <section className="pricing">// ============================================

        <div className="pricing-container">

          <h2 className="section-title">Un Precio Simple</h2>const PhoneIcon = ({ className }) => (

            <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">

          <div className="pricing-card">    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />

            <div className="price">$12<span className="price-period">/mes</span></div>  </svg>

            );

            <div className="features-list">

              <div className="feature-item">✓ Telemedicina 24/7 ilimitada</div>const HeartIcon = ({ className }) => (

              <div className="feature-item">✓ Descuentos hasta 75% en farmacias</div>  <svg className={className} fill="currentColor" viewBox="0 0 24 24">

              <div className="feature-item">✓ Terapia semanal con psicólogo</div>    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />

              <div className="feature-item">✓ Dashboard de ahorros en tiempo real</div>  </svg>

              <div className="feature-item">✓ Lupita y Fernanda - Acompañamiento emocional</div>);

              <div className="feature-item">✓ Hasta 4 familiares incluidos</div>

            </div>const CheckIcon = ({ className }) => (

  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">

            <a href="#subscription" className="cta-button">    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

              Comenzar Ahora  </svg>

            </a>);

          </div>

        </div>const UsersIcon = ({ className }) => (

      </section>  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">

    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />

      {/* SUBSCRIPTION FORM */}  </svg>

      <section id="subscription" className="subscription-form">);

        <div className="form-container">

          <h2 className="form-title">¡Únete a SaludCompartida!</h2>const WhatsAppIcon = ({ className }) => (

            <svg className={className} fill="currentColor" viewBox="0 0 24 24">

          <form action="/subscribe" method="GET">    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>

            <div className="form-group">  </svg>

              <label className="form-label">Tu Nombre</label>);

              <input 

                type="text" const LoadingSpinner = () => (

                name="name"   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">

                className="form-input"     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>

                placeholder="¿Cómo te llamas?"     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>

                required   </svg>

              />);
            </div>

            <div className="form-group">
              <label className="form-label">Tu Email</label>
              <input 
                type="email" 
                name="email" 
                className="form-input" 
                placeholder="tu@email.com" 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tu Teléfono en EE.UU.</label>
              <input 
                type="tel" 
                name="phone" 
                className="form-input" 
                placeholder="+1 (555) 123-4567" 
                required 
              />
            </div>

            <button type="submit" className="submit-button">
              Quiero Proteger a mi Familia
            </button>
          </form>
        </div>
      </section>

      <SharedFooter />
    </>
  );
}
