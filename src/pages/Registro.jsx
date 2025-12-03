import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from '../hooks/useGeolocation';

export default function Registro() {
  const navigate = useNavigate();
  const { countryCode: detectedCountry, loading: geoLoading } = useGeolocation();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [motherLastName, setMotherLastName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  
  // Datos del familiar en México
  const [familyFirstName, setFamilyFirstName] = useState('');
  const [familyLastName, setFamilyLastName] = useState('');
  const [familyWhatsapp, setFamilyWhatsapp] = useState('');
  
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Scroll al tope cuando se monta el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!geoLoading && detectedCountry) {
      if (detectedCountry === 'US') {
        setCountryCode('+1');
      } else if (detectedCountry === 'MX') {
        setCountryCode('+52');
      }
    }
  }, [detectedCountry, geoLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'El apellido paterno es requerido';
    }
    
    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Ingresa un correo válido';
    }
    
    if (!whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'El número de WhatsApp es requerido';
    } else if (whatsappNumber.replace(/\s/g, '').length !== 10) {
      newErrors.whatsappNumber = 'Debe tener 10 dígitos';
    }
    
    // Validación del familiar en México
    if (!familyFirstName.trim()) {
      newErrors.familyFirstName = 'El nombre del familiar es requerido';
    }
    
    if (!familyLastName.trim()) {
      newErrors.familyLastName = 'El apellido del familiar es requerido';
    }
    
    if (!familyWhatsapp.trim()) {
      newErrors.familyWhatsapp = 'El WhatsApp del familiar es requerido';
    } else if (familyWhatsapp.replace(/\s/g, '').length !== 10) {
      newErrors.familyWhatsapp = 'Debe tener 10 dígitos';
    }
    
    if (!acceptedTerms) {
      newErrors.acceptedTerms = 'Debes aceptar los términos y condiciones';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const userData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      motherLastName: motherLastName.trim(),
      email: email.trim(),
      phone: whatsappNumber.replace(/\s/g, ''),
      countryCode: countryCode,
      phoneId: `${countryCode}${whatsappNumber.replace(/\s/g, '')}`,
      // Datos del familiar en México
      familyMember: {
        firstName: familyFirstName.trim(),
        lastName: familyLastName.trim(),
        whatsapp: familyWhatsapp.replace(/\s/g, ''),
        countryCode: '+52',
        phoneId: `+52${familyWhatsapp.replace(/\s/g, '')}`
      },
      registeredAt: new Date().toISOString()
    };
    
    localStorage.setItem('registrationUser', JSON.stringify(userData));
    
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    registeredUsers[userData.phoneId] = userData;
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    setShowSuccessMessage(true);
    
    setFirstName('');
    setLastName('');
    setMotherLastName('');
    setEmail('');
    setWhatsappNumber('');
    setFamilyFirstName('');
    setFamilyLastName('');
    setFamilyWhatsapp('');
    setAcceptedTerms(false);
    setErrors({});
    
    window.scrollTo(0, 0);
    
    setTimeout(() => {
      navigate('/pago');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-pink-50">
      {/* Header con navegación completa */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 md:gap-4 cursor-pointer group" onClick={() => navigate('/')}>
              <img 
                src="/saludcompartida logo WT.png" 
                alt="SaludCompartida" 
                className="h-10 md:h-12 object-contain group-hover:opacity-80 transition-opacity"
              />
            </div>
            
            {/* Navegación Desktop */}
            <nav className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => navigate('/quienes-somos')}
                className="text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors"
              >
                Quiénes Somos
              </button>
              <button
                onClick={() => navigate('/beneficios')}
                className="text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors"
              >
                Nuestros Servicios
              </button>
              <button
                onClick={() => navigate('/savings')}
                className="text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors"
              >
                Mis Ahorros
              </button>
              <button
                onClick={() => navigate('/account')}
                className="text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors"
              >
                Mi Cuenta
              </button>
              <button
                onClick={() => navigate('/blog')}
                className="text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors"
              >
                Blog
              </button>
            </nav>
            
            {/* Botón Volver */}
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 font-medium text-sm md:text-lg transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-12">
        {showSuccessMessage ? (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ¡Registro Exitoso!
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Gracias por registrarte en SaludCompartida. En un momento te redirigiremos para completar tu suscripción.
              </p>
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <p className="text-cyan-700 font-semibold">
                  🎉 ¡Bienvenido a SaludCompartida!
                </p>
                <p className="text-cyan-600 text-sm mt-1">
                  Redirigiendo...
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="mb-10">
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-300 rounded-2xl p-6 shadow-lg">
                <div className="text-center">
                  <div className="mb-4">
                    <svg className="w-12 h-12 mx-auto text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-cyan-600 mb-2">
                    Regístrate en SaludCompartida
                  </h1>
                  <p className="text-gray-700 text-sm md:text-base">
                    Completa tus datos para comenzar a proteger a tu familia
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setErrors({ ...errors, firstName: '' });
                  }}
                  placeholder="Ejemplo: María"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-cyan-500 text-lg ${
                    errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Apellido Paterno <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setErrors({ ...errors, lastName: '' });
                  }}
                  placeholder="Ejemplo: González"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-cyan-500 text-lg ${
                    errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.lastName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Apellido Materno <span className="text-gray-500 text-sm font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={motherLastName}
                  onChange={(e) => setMotherLastName(e.target.value)}
                  placeholder="Ejemplo: López"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Correo Electrónico <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: '' });
                  }}
                  placeholder="Ejemplo: maria@email.com"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-cyan-500 text-lg ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Número de WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-lg bg-white text-gray-700"
                  >
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+52">🇲🇽 +52</option>
                  </select>
                  <input
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) {
                        const formatted = value.length <= 3 ? value :
                                        value.length <= 6 ? `${value.slice(0, 3)} ${value.slice(3)}` :
                                        `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
                        setWhatsappNumber(formatted);
                        setErrors({ ...errors, whatsappNumber: '' });
                      }
                    }}
                    placeholder="555 123 4567"
                    className={`flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-cyan-500 text-lg ${
                      errors.whatsappNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {countryCode === '+1' ? 'Formato: +1 XXX XXX XXXX (10 dígitos USA)' : 'Formato: +52 XXX XXX XXXX (10 dígitos México)'}
                </p>
                {errors.whatsappNumber && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.whatsappNumber}
                  </p>
                )}
              </div>

              {/* Separador - Datos del familiar en México */}
              <div className="border-t-2 border-gray-200 pt-6 mt-6">
                <div className="bg-gradient-to-r from-cyan-50 to-pink-50 rounded-xl p-4 mb-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    👨‍👩‍👧‍👦 Datos de tu Familiar en México
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ambos recibirán códigos de acceso por WhatsApp
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Nombre del Familiar <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={familyFirstName}
                      onChange={(e) => {
                        setFamilyFirstName(e.target.value);
                        setErrors({ ...errors, familyFirstName: '' });
                      }}
                      placeholder="Ejemplo: Juan"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-cyan-500 text-lg ${
                        errors.familyFirstName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.familyFirstName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.familyFirstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Apellido del Familiar <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={familyLastName}
                      onChange={(e) => {
                        setFamilyLastName(e.target.value);
                        setErrors({ ...errors, familyLastName: '' });
                      }}
                      placeholder="Ejemplo: Pérez"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-cyan-500 text-lg ${
                        errors.familyLastName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.familyLastName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.familyLastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      WhatsApp del Familiar en México <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-lg bg-gray-100 text-gray-700 flex items-center">
                        🇲🇽 +52
                      </div>
                      <input
                        type="tel"
                        value={familyWhatsapp}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 10) {
                            const formatted = value.length <= 3 ? value :
                                            value.length <= 6 ? `${value.slice(0, 3)} ${value.slice(3)}` :
                                            `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
                            setFamilyWhatsapp(formatted);
                            setErrors({ ...errors, familyWhatsapp: '' });
                          }
                        }}
                        placeholder="555 123 4567"
                        className={`flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-cyan-500 text-lg ${
                          errors.familyWhatsapp ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Formato: +52 XXX XXX XXXX (10 dígitos México)
                    </p>
                    {errors.familyWhatsapp && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.familyWhatsapp}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => {
                      setAcceptedTerms(e.target.checked);
                      setErrors({ ...errors, acceptedTerms: '' });
                    }}
                    className="mt-1 w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                  />
                  <span className="text-gray-700 text-sm leading-relaxed">
                    Acepto los{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/terms', { state: { from: '/registro' } })}
                      className="text-cyan-600 font-semibold hover:underline"
                    >
                      Términos y Condiciones
                    </button>
                    {' '}y la{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/privacy', { state: { from: '/registro' } })}
                      className="text-cyan-600 font-semibold hover:underline"
                    >
                      Política de Privacidad
                    </button>
                    <span className="text-red-500"> *</span>
                  </span>
                </label>
                {errors.acceptedTerms && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.acceptedTerms}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-4 rounded-lg font-bold text-lg hover:from-cyan-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
              >
                Registrarse y Suscribirse
              </button>

              <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <p className="text-sm text-gray-600 text-center">
                  <span className="font-semibold text-cyan-700">💡 ¿Qué sigue?</span><br />
                  Después de registrarte, te llevaremos a completar tu suscripción y empezar a proteger a tu familia.
                </p>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Footer completo */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo y tagline */}
            <div className="col-span-1 md:col-span-1">
              <img 
                src="/saludcompartida logo WT.png" 
                alt="SaludCompartida" 
                className="h-12 mb-4"
              />
              <p className="text-sm text-gray-600 italic">
                Donde está tu corazón, está SaludCompartida
              </p>
            </div>

            {/* Columna: Servicios */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Servicios</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/telemedicine')}
                    className="text-sm text-gray-600 hover:text-cyan-600 transition-colors text-left"
                  >
                    Telemedicina
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/pharmacy')}
                    className="text-sm text-gray-600 hover:text-cyan-600 transition-colors text-left"
                  >
                    Descuentos en Farmacias
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/therapy')}
                    className="text-sm text-gray-600 hover:text-cyan-600 transition-colors text-left"
                  >
                    Terapia Psicológica
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/savings')}
                    className="text-sm text-gray-600 hover:text-cyan-600 transition-colors text-left"
                  >
                    Mis Ahorros
                  </button>
                </li>
              </ul>
            </div>

            {/* Columna: Nosotros */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Nosotros</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/quienes-somos')}
                    className="text-sm text-gray-600 hover:text-cyan-600 transition-colors text-left"
                  >
                    Quiénes Somos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/mision-y-valores')}
                    className="text-sm text-gray-600 hover:text-cyan-600 transition-colors text-left"
                  >
                    Misión y Valores
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/nuestros-pilares')}
                    className="text-sm text-gray-600 hover:text-cyan-600 transition-colors text-left"
                  >
                    Nuestros Pilares
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/blog')}
                    className="text-sm text-gray-600 hover:text-cyan-600 transition-colors text-left"
                  >
                    Blog
                  </button>
                </li>
              </ul>
            </div>

            {/* Columna: Soporte */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Soporte</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/contacto')}
                    className="text-sm text-gray-600 hover:text-cyan-600 transition-colors text-left"
                  >
                    Contacto
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/account')}
                    className="text-sm text-gray-600 hover:text-cyan-600 transition-colors text-left"
                  >
                    Mi Cuenta
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/privacy')}
                    className="text-sm text-gray-600 hover:text-cyan-600 transition-colors text-left"
                  >
                    Política de Privacidad
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/terms')}
                    className="text-sm text-gray-600 hover:text-cyan-600 transition-colors text-left"
                  >
                    Términos y Condiciones
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Línea divisora */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                © 2025 SaludCompartida. Todos los derechos reservados.
              </p>
              <p className="text-sm text-gray-600 font-medium">
                SaludCompartida · Cuidando lo que más importa
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
