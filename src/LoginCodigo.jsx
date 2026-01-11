import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from './hooks/useGeolocation';
import { UserContext } from './contexts/UserContext';
import { getUserByAccessCode } from './lib/supabase';
import TopNav from './components/TopNav';
import { LightbulbIcon } from './components/CustomIcons';
import { trackEvent } from './hooks/useMetaPixel';

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
  const [sendingEmail, setSendingEmail] = useState(false);

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

      // 📊 META PIXEL: Track CompleteRegistration (Usuario Normal)
      trackEvent('CompleteRegistration', {
        content_name: 'Login Usuario Normal',
        user_type: 'normal',
        status: 'success'
      });

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

        // 📊 META PIXEL: Track CompleteRegistration (Usuario Normal desde Supabase)
        trackEvent('CompleteRegistration', {
          content_name: 'Login Usuario Normal',
          user_type: 'normal',
          status: 'success'
        });

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

  const handleCodeError = async () => {
    setSendingEmail(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${firstName || 'Usuario'} ${lastName || ''}`.trim(),
          email: email || 'no-email@saludcompartida.com',
          phone: `${countryCode} ${whatsappNumber || 'No proporcionado'}`,
          message: `PROBLEMA CON CÓDIGO DE ACCESO\n\nCódigo intentado: ${specialCode || 'No proporcionado'}\n\nEl usuario reporta que su código de acceso no funciona correctamente.`,
          type: 'code-error'
        })
      });

      if (response.ok) {
        alert('✅ Tu solicitud ha sido enviada. Te contactaremos pronto.');
      } else {
        alert('❌ Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar email:', error);
      alert('❌ Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.');
    } finally {
      setSendingEmail(false);
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
          <nav className="hidden lg:flex items-center gap-4">
            <button
              onClick={handleCodeError}
              disabled={sendingEmail}
              className="bg-pink-100 hover:bg-pink-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {sendingEmail ? 'Enviando...' : 'Código Erróneo'}
            </button>

            <button
              onClick={() => navigate('/contact', { state: { from: '/page3' } })}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
            >
              Contacto
            </button>
          </nav>

          {/* Menú Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={handleCodeError}
              disabled={sendingEmail}
              className="bg-pink-100 hover:bg-pink-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendingEmail ? 'Enviando...' : 'Código Erróneo'}
            </button>
            <button
              onClick={() => navigate('/contact', { state: { from: '/page3' } })}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all"
            >
              Contacto
            </button>
          </div>
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
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                ¡Bienvenido!
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-8">
                Ingresa tu código de acceso para continuar
              </p>

              <div className="space-y-6">
                {/* Código de Acceso */}
                <div>
                  <label className="block text-gray-800 font-bold mb-2 text-left text-sm md:text-base">
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
                    className={`w-full px-4 py-3.5 sm:py-4 border-2 rounded-xl focus:outline-none focus:border-cyan-500 text-base md:text-lg font-mono ${
                      errors.specialCode ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.specialCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.specialCode}</p>
                  )}
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-gray-800 font-bold mb-2 text-left text-sm md:text-base">
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
                    className={`w-full px-4 py-3.5 sm:py-4 border-2 rounded-xl focus:outline-none focus:border-cyan-500 text-base md:text-lg ${
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
                  <label className="block text-gray-800 font-bold mb-2 text-left text-sm md:text-base">
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
                    className={`w-full px-4 py-3.5 sm:py-4 border-2 rounded-xl focus:outline-none focus:border-cyan-500 text-base md:text-lg ${
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
                  <label className="block text-gray-800 font-bold mb-2 text-left text-sm md:text-base">
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      disabled={codeVerified}
                      className={`px-3 py-3 border-2 rounded-xl focus:outline-none focus:border-cyan-500 text-sm md:text-base ${
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
                      className={`flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-cyan-500 text-base md:text-lg ${
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
                  className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-4 sm:py-5 rounded-xl font-bold text-lg md:text-xl lg:text-2xl hover:from-cyan-700 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl touch-manipulation"
                >
                  Ingresar a SaludCompartida
                </button>

                {/* Código erróneo - Recuadro pastel */}
                <div className="mt-6 p-4 bg-pink-50 rounded-xl border border-pink-200">
                  <button
                    onClick={handleCodeError}
                    disabled={sendingEmail}
                    className="w-full text-base md:text-lg font-semibold text-gray-700 hover:text-cyan-600 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {sendingEmail ? 'Enviando...' : '¿Código erróneo? Contáctanos'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
