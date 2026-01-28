'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * LANDING ALTERNATIVA - saludcompartida.app/landing-nueva
 * 
 * Diseño emocional con foto izquierda, formulario derecha
 * Contador naranja de familias protegidas (847)
 * Form: firstName + lastName + email + phone → /registro-nuevo
 * 
 * @route /landing-nueva (URL separada para campañas específicas)
 * @approved Diseño aprobado - No cambiar layout sin autorización
 * @purpose Página alternativa para pruebas A/B o campañas dirigidas
 */

export default function Page1Landing() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+1'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Contador de familias (puede venir de API)
  const familiesProtected = 847;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Guardar en localStorage para siguiente página
      localStorage.setItem('registrationData', JSON.stringify(formData));
      
      // Navegar a página 2 (registro completo)
      router.push('/registro');
    } catch (err) {
      setError('Hubo un error. Por favor intenta de nuevo.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <img 
            src="/saludcompartida_logo.png" 
            alt="SaludCompartida" 
            className="h-10 md:h-12"
          />
          <div className="flex items-center gap-4">
            <a 
              href="tel:+18001234567" 
              className="hidden md:flex items-center gap-2 text-gray-600 hover:text-cyan-600 transition-colors"
            >
              <PhoneIcon className="w-5 h-5" />
              <span className="font-medium">1-800-123-4567</span>
            </a>
            <button 
              onClick={() => router.push('/login')}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Side - Image & Emotional Content */}
          <div className="order-2 lg:order-1">
            {/* Main Image */}
            <div className="relative">
              <img 
                src="/images/familia-mexicana.jpg" 
                alt="Familia mexicana feliz"
                className="rounded-3xl shadow-2xl w-full object-cover"
                style={{ maxHeight: '500px' }}
              />
              
              {/* Overlay Badge */}
              <div className="absolute -bottom-4 -right-4 md:bottom-6 md:right-6 bg-white rounded-2xl shadow-xl p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                    <HeartIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Cuidando familias</p>
                    <p className="text-gray-900 font-bold text-lg">Desde USA a México</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emotional Text */}
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Porque la distancia no debería separarte de 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500"> cuidar a quien amas</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Tu mamá merece atención médica de calidad. Tu papá merece sus medicamentos a tiempo. 
                Tus hijos merecen un doctor cuando lo necesitan.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                <CheckIcon className="w-5 h-5 text-green-500" />
                <span className="text-green-700 font-medium text-sm">Telemedicina 24/7</span>
              </div>
              <div className="flex items-center gap-2 bg-cyan-50 px-4 py-2 rounded-full">
                <CheckIcon className="w-5 h-5 text-cyan-500" />
                <span className="text-cyan-700 font-medium text-sm">75% descuento farmacia</span>
              </div>
              <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full">
                <CheckIcon className="w-5 h-5 text-pink-500" />
                <span className="text-pink-700 font-medium text-sm">Terapia semanal</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="order-1 lg:order-2">
            {/* Counter Badge - Orange */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-4 mb-6 shadow-lg">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <UsersIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <p className="text-3xl font-bold">{familiesProtected.toLocaleString()}</p>
                  <p className="text-white/90 text-sm">familias ya protegidas</p>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Protege a tu familia hoy
                </h1>
                <p className="text-gray-600">
                  Desde <span className="text-cyan-600 font-bold">$12 USD</span> al mes para toda la familia
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1 text-sm">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1 text-sm">
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Tu apellido"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    Teléfono (WhatsApp)
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="px-3 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none bg-gray-50"
                    >
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+52">🇲🇽 +52</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="(555) 123-4567"
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoadingSpinner />
                      Procesando...
                    </span>
                  ) : (
                    'Comenzar Ahora →'
                  )}
                </button>

                {/* Terms */}
                <p className="text-center text-gray-500 text-xs mt-4">
                  Al continuar, aceptas nuestros{' '}
                  <a href="/terminos" className="text-cyan-600 hover:underline">
                    Términos de Servicio
                  </a>{' '}
                  y{' '}
                  <a href="/privacidad" className="text-cyan-600 hover:underline">
                    Política de Privacidad
                  </a>
                </p>
              </form>

              {/* Social Proof */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white"></div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold">+2,500</span> familias confían en nosotros
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Help */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-2">¿Necesitas ayuda?</p>
              <a 
                href="https://wa.me/5529984922702?text=Hola,%20necesito%20información%20sobre%20SaludCompartida"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <img 
            src="/saludcompartida_logo_white.png" 
            alt="SaludCompartida" 
            className="h-8 mx-auto mb-4 opacity-80"
          />
          <p className="text-gray-400 text-sm">
            SaludCompartida © 2025 - Cuidando familias, construyendo futuro
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Servicio de salud para familias de migrantes en México, Centroamérica e India
          </p>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// ICONOS SVG
// ============================================

const PhoneIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const HeartIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const UsersIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);