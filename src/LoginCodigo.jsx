import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from './hooks/useGeolocation';
import { UserContext } from './contexts/UserContext';
import { getUserByAccessCode } from './lib/supabase';
import TopNav from './components/TopNav';
import { LightbulbIcon } from './components/CustomIcons';

export default function LoginCodigo() {
  const navigate = useNavigate();
  const { countryCode: detectedCountry, loading: geoLoading } = useGeolocation();
  const { setCurrentUser } = useContext(UserContext);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [motherLastName, setMotherLastName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+52');
  const [specialCode, setSpecialCode] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [codeVerified, setCodeVerified] = useState(false);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  // Scroll al tope
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-select country code based on geolocation
  useEffect(() => {
    if (!geoLoading && detectedCountry) {
      if (detectedCountry === 'MX') {
        setCountryCode('+52');
      }
    }
  }, [detectedCountry, geoLoading]);

  // Auto-verificar código
  useEffect(() => {
    const verifyCodeAutomatically = async () => {
      if (!specialCode.trim() || specialCode.trim().length < 5) {
        return;
      }

      const upperCode = specialCode.trim().toUpperCase();
      
      // 1. Verificar códigos de acceso en localStorage
      const accessCodes = JSON.parse(localStorage.getItem('accessCodes') || '{}');
      if (accessCodes[upperCode]) {
        const userData = accessCodes[upperCode];
        
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setMotherLastName(userData.motherLastName || '');
        setEmail(userData.email || '');
        
        const phoneNumber = userData.phone || userData.whatsapp || '';
        const formattedPhone = phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3');
        
        setWhatsappNumber(formattedPhone);
        setCountryCode(userData.countryCode || '+52');
        setCodeVerified(true);
        setErrors({});
        setUserDataLoaded(true);
        return;
      }
      
      // 2. Buscar en Supabase
      try {
        const result = await getUserByAccessCode(upperCode);
        
        if (result.success && result.data) {
          const dbUser = result.data;
          
          setFirstName(dbUser.first_name);
          setLastName(dbUser.last_name);
          setMotherLastName(dbUser.mother_last_name || '');
          setEmail(dbUser.email || '');
          
          const formattedPhone = dbUser.phone.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3');
          setWhatsappNumber(formattedPhone);
          setCountryCode(dbUser.country_code);
          
          setCodeVerified(true);
          setErrors({});
        }
      } catch (error) {
        console.error('Error verificando código:', error);
      }
    };

    const timeoutId = setTimeout(verifyCodeAutomatically, 500);
    return () => clearTimeout(timeoutId);
  }, [specialCode]);

  const handleAccessCode = async () => {
    const newErrors = {};
    
    if (!specialCode.trim()) {
      newErrors.specialCode = 'El código de acceso es requerido';
    }
    
    if (!firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'El apellido paterno es requerido';
    }
    
    if (!whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'El número de WhatsApp es requerido';
    } else if (whatsappNumber.replace(/\s/g, '').length !== 10) {
      newErrors.whatsappNumber = 'Debe tener 10 dígitos';
    }
    
    if (!acceptedTerms) {
      newErrors.acceptedTerms = 'Debes aceptar los términos y condiciones';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const upperCode = specialCode.trim().toUpperCase();
    
    // Verificar códigos de acceso
    const accessCodes = JSON.parse(localStorage.getItem('accessCodes') || '{}');
    if (accessCodes[upperCode]) {
      const codeData = accessCodes[upperCode];
      
      codeData.activatedAt = new Date().toISOString();
      accessCodes[upperCode] = codeData;
      localStorage.setItem('accessCodes', JSON.stringify(accessCodes));
      
      const isMigrantUser = Boolean(
        codeData.type === 'migrant' ||
        codeData.countryCode === '+1' ||
        (upperCode && upperCode.toUpperCase().includes('US'))
      );

      const userData = {
        firstName: codeData.firstName,
        lastName: codeData.lastName,
        motherLastName: codeData.motherLastName || '',
        email: codeData.email || '',
        whatsapp: whatsappNumber.replace(/\s/g, ''),
        countryCode: countryCode,
        accessCode: upperCode,
        isMigrant: isMigrantUser
      };

      localStorage.setItem('currentUser', JSON.stringify(userData));
      setCurrentUser(userData);

      if (isMigrantUser) {
        navigate('/migrant');
      } else {
        navigate('/page4');
      }
      return;
    }

    // Buscar en Supabase
    try {
      const result = await getUserByAccessCode(upperCode);
      
      if (result.success && result.data) {
        const dbUser = result.data;
        
        const isMigrantUser = Boolean(
          dbUser.country_code === '+1' ||
          (upperCode && upperCode.toUpperCase().includes('US'))
        );

        const userData = {
          firstName: dbUser.first_name,
          lastName: dbUser.last_name,
          motherLastName: dbUser.mother_last_name || '',
          email: dbUser.email || '',
          whatsapp: dbUser.phone,
          countryCode: dbUser.country_code,
          accessCode: upperCode,
          isMigrant: isMigrantUser
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));
        setCurrentUser(userData);

        if (isMigrantUser) {
          navigate('/migrant');
        } else {
          navigate('/page4');
        }
      } else {
        setErrors({ specialCode: 'Código de acceso no válido' });
      }
    } catch (error) {
      console.error('Error al verificar código:', error);
      setErrors({ specialCode: 'Error al verificar el código. Intenta de nuevo.' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header con TopNav estilo blanco */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo grande */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/saludcompartida logo WT.png" 
              alt="SaludCompartida" 
              className="h-16 md:h-20 object-contain hover:opacity-80 transition-opacity" 
            />
          </div>
          
          {/* Menú de navegación - Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => navigate('/home')}
              className="text-sm font-semibold text-gray-700 hover:text-cyan-600 transition-colors"
            >
              HOME
            </button>

            <div className="relative group">
              <button className="text-sm font-semibold text-gray-700 hover:text-cyan-600 transition-colors flex items-center gap-1">
                Quienes Somos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                  onClick={() => navigate('/quienes-somos')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-cyan-600 transition-colors first:rounded-t-lg"
                >
                  Quienes Somos
                </button>
                <button
                  onClick={() => navigate('/vision-mision')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-cyan-600 transition-colors"
                >
                  Visión y Misión
                </button>
                <button
                  onClick={() => navigate('/nuestros-pilares')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-cyan-600 transition-colors last:rounded-b-lg"
                >
                  Nuestros Pilares
                </button>
              </div>
            </div>

            <div className="relative group">
              <button className="text-sm font-semibold text-gray-700 hover:text-cyan-600 transition-colors flex items-center gap-1">
                Servicios
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                  onClick={() => navigate('/telemedicine')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-cyan-600 transition-colors first:rounded-t-lg"
                >
                  Videollamada con Doctores 24/7
                </button>
                <button
                  onClick={() => navigate('/pharmacy')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-cyan-600 transition-colors"
                >
                  Descuento en Farmacias
                </button>
                <button
                  onClick={() => navigate('/therapy')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-cyan-600 transition-colors last:rounded-b-lg"
                >
                  Sesiones con Terapeuta
                </button>
              </div>
            </div>

            <button
              onClick={() => navigate('/contacto')}
              className="text-sm font-semibold text-gray-700 hover:text-cyan-600 transition-colors"
            >
              Contacto
            </button>

            <button
              onClick={() => navigate('/registro')}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-2 rounded-lg font-bold hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
            >
              Contratar
            </button>
          </nav>

          {/* Menú Mobile */}
          <button 
            className="lg:hidden p-2 text-gray-700 hover:text-cyan-600"
            onClick={() => {
              // Toggle mobile menu logic here
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero con imágenes */}
      <div className="relative bg-gradient-to-br from-cyan-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Título grande antes de las fotos */}
          <h2 className="text-lg md:text-3xl lg:text-4xl md:text-lg md:text-3xl lg:text-4xl font-black text-cyan-500 text-center mb-12">
            SaludCompartida
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Columna izquierda - Imágenes */}
            <div className="space-y-6">
              <img 
                src="/girldoctor.jpeg" 
                alt="Doctora atendiendo" 
                className="w-full h-64 object-cover rounded-3xl shadow-2xl"
              />
              <img 
                src="/kidsgrass.jpeg" 
                alt="Familia feliz" 
                className="w-full h-64 object-cover rounded-3xl shadow-2xl"
              />
              
              {/* Texto grande después de la segunda foto */}
              <h3 className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl font-black text-cyan-500 text-center pt-6">
                Donde está tu CORAZÓN
              </h3>
            </div>

            {/* Columna derecha - Formulario */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-gray-200">
              <h1 className="text-lg md:text-3xl lg:text-4xl sm:text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl font-black text-gray-900 mb-4">
                ¡Bienvenido!
              </h1>
              <p className="text-base md:text-2xl lg:text-3xl sm:text-lg md:text-3xl lg:text-4xl text-gray-600 mb-8">
                Ingresa tu código de acceso para continuar
              </p>

              <div className="space-y-6">
                {/* Código de Acceso */}
                <div>
                  <label className="block text-gray-800 font-bold mb-2 text-left text-sm sm:text-lg md:text-3xl lg:text-4xl">
                    Código de Acceso <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={specialCode}
                    onChange={(e) => {
                      setSpecialCode(e.target.value.toUpperCase());
                      setErrors({ ...errors, specialCode: '' });
                    }}
                    placeholder="Ej: ABCD1234"
                    className={`w-full px-4 py-3.5 sm:py-4 border-2 rounded-xl focus:outline-none focus:border-cyan-500 text-lg md:text-3xl lg:text-4xl sm:text-base md:text-2xl lg:text-3xl font-mono ${
                      errors.specialCode ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.specialCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.specialCode}</p>
                  )}
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-gray-800 font-bold mb-2 text-left text-sm sm:text-lg md:text-3xl lg:text-4xl">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setErrors({ ...errors, firstName: '' });
                    }}
                    disabled={codeVerified}
                    className={`w-full px-4 py-3.5 sm:py-4 border-2 rounded-xl focus:outline-none focus:border-cyan-500 text-lg md:text-3xl lg:text-4xl sm:text-base md:text-2xl lg:text-3xl ${
                      errors.firstName ? 'border-red-500 bg-red-50' : codeVerified ? 'border-gray-300 bg-gray-100' : 'border-gray-300'
                    }`}
                    placeholder="Tu nombre"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                {/* Apellido Paterno */}
                <div>
                  <label className="block text-gray-800 font-bold mb-2 text-left text-sm sm:text-lg md:text-3xl lg:text-4xl">
                    Apellido Paterno <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setErrors({ ...errors, lastName: '' });
                    }}
                    disabled={codeVerified}
                    className={`w-full px-4 py-3.5 sm:py-4 border-2 rounded-xl focus:outline-none focus:border-cyan-500 text-lg md:text-3xl lg:text-4xl sm:text-base md:text-2xl lg:text-3xl ${
                      errors.lastName ? 'border-red-500 bg-red-50' : codeVerified ? 'border-gray-300 bg-gray-100' : 'border-gray-300'
                    }`}
                    placeholder="Tu apellido paterno"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-gray-800 font-bold mb-2 text-left">
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      disabled={codeVerified}
                      className={`px-3 py-3 border-2 rounded-xl focus:outline-none focus:border-cyan-500 text-base md:text-2xl lg:text-3xl ${
                        codeVerified ? 'border-gray-300 bg-gray-100' : 'border-gray-300'
                      }`}
                    >
                      <option value="+52">🇲🇽 +52</option>
                      <option value="+1">🇺🇸 +1</option>
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
                      disabled={codeVerified}
                      className={`flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-cyan-500 text-base md:text-2xl lg:text-3xl ${
                        errors.whatsappNumber ? 'border-red-500 bg-red-50' : codeVerified ? 'border-gray-300 bg-gray-100' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.whatsappNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.whatsappNumber}</p>
                  )}
                </div>

                {/* Términos */}
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
                        onClick={() => navigate('/page3-terms')}
                        className="text-cyan-600 font-semibold hover:underline"
                      >
                        Términos y Condiciones
                      </button>
                      {' '}y la{' '}
                      <button
                        type="button"
                        onClick={() => navigate('/page3-privacy')}
                        className="text-cyan-600 font-semibold hover:underline"
                      >
                        Política de Privacidad
                      </button>
                      <span className="text-red-500"> *</span>
                    </span>
                  </label>
                  {errors.acceptedTerms && (
                    <p className="text-red-500 text-sm mt-2">{errors.acceptedTerms}</p>
                  )}
                </div>

                {/* Botón */}
                <button
                  onClick={handleAccessCode}
                  className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-4 sm:py-5 rounded-xl font-bold text-base md:text-2xl lg:text-3xl sm:text-lg md:text-3xl lg:text-4xl hover:from-cyan-700 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl touch-manipulation"
                >
                  Ingresar a SaludCompartida
                </button>

                {/* Ayuda */}
                <div className="mt-6 p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                  <p className="text-sm text-gray-600 text-center flex items-center justify-center gap-2">
                    <LightbulbIcon className="w-5 h-5 text-cyan-700 flex-shrink-0" />
                    <span>
                      <span className="font-semibold text-cyan-700">¿Necesitas ayuda?</span><br />
                      Si no tienes tu código, contáctanos por WhatsApp
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
