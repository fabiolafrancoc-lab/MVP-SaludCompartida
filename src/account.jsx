import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Account() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user name from location state or localStorage
  let storedUserData = null;
  try {
    // Check currentUser first (new system), fallback to accessUser
    const currentUserStored = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
    const accessUserStored = typeof window !== 'undefined' ? localStorage.getItem('accessUser') : null;
    
    if (currentUserStored) {
      storedUserData = JSON.parse(currentUserStored);
    } else if (accessUserStored) {
      storedUserData = JSON.parse(accessUserStored);
    }
  } catch (e) {
    storedUserData = null;
  }

  const userName = location.state?.name || storedUserData?.firstName || '';

  // Detectar código de país desde localStorage
  const [countryCode, setCountryCode] = useState(storedUserData?.countryCode || '+52');

  const [userData, setUserData] = useState({
    firstName: storedUserData?.firstName || '',
    lastName: storedUserData?.lastName || '',
    motherLastName: storedUserData?.motherLastName || '',
    birthDate: storedUserData?.birthDate || '',
    phone: storedUserData?.phone || '',
    email: storedUserData?.email || ''
  });

  const [familyMembers, setFamilyMembers] = useState(
    storedUserData?.familyMembers || [
      { firstName: '', lastName: '', motherLastName: '', relationship: '' },
      { firstName: '', lastName: '', motherLastName: '', relationship: '' },
      { firstName: '', lastName: '', motherLastName: '', relationship: '' }
    ]
  );

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleUserChange = (field, value) => {
    // Limpiar error cuando el usuario empieza a escribir
    setErrors(prev => ({ ...prev, [field]: false }));

    if (field === 'phone') {
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setUserData(prev => ({ ...prev, phone: cleaned }));
    } else if (field === 'birthDate') {
      setUserData(prev => ({ ...prev, birthDate: value }));
    } else {
      setUserData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleFamilyChange = (index, field, value) => {
    const updated = [...familyMembers];
    updated[index][field] = value;
    setFamilyMembers(updated);
  };

  const formatPhoneDisplay = (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  };

  const handleSave = () => {
    const newErrors = {};

    if (!userData.firstName || !userData.firstName.trim()) {
      newErrors.firstName = true;
    }

    if (!userData.lastName || !userData.lastName.trim()) {
      newErrors.lastName = true;
    }

    if (!userData.birthDate) {
      newErrors.birthDate = true;
    }

    if (!userData.phone || userData.phone.length !== 10) {
      newErrors.phone = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll al primer campo con error
      const firstErrorField = Object.keys(newErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      return;
    }

    setIsSaving(true);
    
    // Save to localStorage to share across all forms
    const userDataToSave = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      motherLastName: userData.motherLastName,
      phone: userData.phone,
      birthDate: userData.birthDate,
      email: userData.email,
      countryCode: countryCode,
      familyMembers: familyMembers
    };
    
    localStorage.setItem('accessUser', JSON.stringify(userDataToSave));
    localStorage.setItem('currentUser', JSON.stringify(userDataToSave));
    
    // Simulate save
    setTimeout(() => {
      console.log('Guardando datos:', { userData, familyMembers });
      setIsSaving(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 500);
  };

  const relationshipOptions = [
    'Mamá',
    'Papá',
    'Hijo/a',
    'Hermano/a',
    'Esposo/a',
    'Abuelo/a',
    'Tío/a',
    'Primo/a',
    'Otro'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <img 
            src="/saludcompartida logo WT.png" 
            alt="SaludCompartida" 
            className="h-16"
          />
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/page4');
            }}
            className="text-gray-600 hover:text-gray-900 font-medium text-lg"
          >
            Volver
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Bienvenida a tu Cuenta <span className="text-cyan-600">{userData.firstName || 'Usuario'}</span>
          </h1>
          <p className="text-lg text-gray-600">
            Gestiona tu información personal y la de tu familia
          </p>
        </div>

        {/* User Information Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-cyan-100">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Tus Datos</h2>
              <p className="text-sm text-gray-600">Usuario en México</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={(e) => handleUserChange('firstName', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-cyan-500 transition-all ${
                    errors.firstName 
                      ? 'border-red-500 focus:border-red-600 bg-red-50' 
                      : userData.firstName 
                        ? 'border-gray-200 focus:border-cyan-500' 
                        : 'border-gray-200 bg-gray-50 text-gray-500 focus:border-cyan-500'
                  }`}
                  placeholder="Tu nombre"
                />
                {errors.firstName && (
                  <div className="flex items-center gap-2 mt-2">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-600 font-medium">Este campo es obligatorio</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Apellido Paterno <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={(e) => handleUserChange('lastName', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-cyan-500 transition-all ${
                    errors.lastName 
                      ? 'border-red-500 focus:border-red-600 bg-red-50' 
                      : userData.lastName 
                        ? 'border-gray-200 focus:border-cyan-500' 
                        : 'border-gray-200 bg-gray-50 text-gray-500 focus:border-cyan-500'
                  }`}
                  placeholder="Apellido paterno"
                />
                {errors.lastName && (
                  <div className="flex items-center gap-2 mt-2">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-600 font-medium">Este campo es obligatorio</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Apellido Materno <span className="text-gray-500 text-xs">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={userData.motherLastName}
                  onChange={(e) => handleUserChange('motherLastName', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-cyan-500 transition-all ${
                    userData.motherLastName 
                      ? 'border-gray-200 focus:border-cyan-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-500 focus:border-cyan-500'
                  }`}
                  placeholder="Apellido materno"
                />
              </div>
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha de Nacimiento <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="birthDate"
                value={userData.birthDate}
                onChange={(e) => handleUserChange('birthDate', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-cyan-500 transition-all ${
                  errors.birthDate 
                    ? 'border-red-500 focus:border-red-600 bg-red-50' 
                    : userData.birthDate 
                      ? 'border-gray-200 focus:border-cyan-500' 
                      : 'border-gray-200 bg-gray-50 text-gray-500 focus:border-cyan-500'
                }`}
                placeholder="dd/mm/aaaa"
              />
              {errors.birthDate && (
                <div className="flex items-center gap-2 mt-2">
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-600 font-medium">Este campo es obligatorio</p>
                </div>
              )}
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span>WhatsApp <span className="text-red-500">*</span></span>
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </label>
              <div className="flex">
                <div className={`flex items-center border-2 border-r-0 rounded-l-xl px-4 ${
                  errors.phone ? 'border-red-500 bg-red-50' : 'bg-gray-100 border-gray-200'
                }`}>
                  <span className="text-gray-700 font-semibold">{countryCode}</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formatPhoneDisplay(userData.phone)}
                  onChange={(e) => handleUserChange('phone', e.target.value)}
                  className={`flex-1 px-4 py-3 border-2 rounded-r-xl focus:ring-2 focus:ring-cyan-500 transition-all ${
                    errors.phone 
                      ? 'border-red-500 focus:border-red-600 bg-red-50' 
                      : userData.phone 
                        ? 'border-gray-200 focus:border-cyan-500' 
                        : 'border-gray-200 bg-gray-50 text-gray-500 focus:border-cyan-500'
                  }`}
                  placeholder="555 123 4567"
                  maxLength="12"
                />
              </div>
              {errors.phone && (
                <div className="flex items-center gap-2 mt-2">
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-600 font-medium">Este campo es obligatorio</p>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Formato: XXX XXX XXXX
              </p>
            </div>
          </div>
        </div>

        {/* Family Members Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-start gap-3 mb-6 pb-4 border-b-2 border-pink-100">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Miembros de tu Familia</h2>
              <p className="text-gray-600">
                Incluye hasta tres miembros de tu familia que accederán a SaludCompartida{' '}
                <span className="text-gray-500 italic">(Registro Opcional)</span>
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {familyMembers.map((member, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border-2 border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-pink-500 text-white rounded-full text-sm font-bold">
                    {index + 1}
                  </span>
                  Familiar {index + 1}
                </h3>

                <div className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        value={member.firstName}
                        onChange={(e) => handleFamilyChange(index, 'firstName', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                        placeholder="Nombre"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Apellido Paterno
                      </label>
                      <input
                        type="text"
                        value={member.lastName}
                        onChange={(e) => handleFamilyChange(index, 'lastName', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                        placeholder="Apellido paterno"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Apellido Materno <span className="text-gray-400 text-xs">(opcional)</span>
                      </label>
                      <input
                        type="text"
                        value={member.motherLastName}
                        onChange={(e) => handleFamilyChange(index, 'motherLastName', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                        placeholder="Apellido materno"
                      />
                    </div>
                  </div>

                  {/* Relationship */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Parentesco <span className="text-gray-400 text-xs">(Opcional)</span>
                    </label>
                    <select
                      value={member.relationship}
                      onChange={(e) => handleFamilyChange(index, 'relationship', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                    >
                      <option value="">Selecciona parentesco</option>
                      {relationshipOptions.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
              isSaving
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 hover:shadow-xl'
            } text-white`}
          >
            {isSaving ? 'Guardando...' : 'Guardar Información'}
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mt-6 bg-green-50 border-l-4 border-green-500 rounded-lg p-4 mx-auto max-w-md">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-800 font-semibold">¡Información guardada exitosamente!</p>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-cyan-50 border-l-4 border-cyan-500 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-cyan-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm text-cyan-900 font-semibold mb-1">
                Tu información está protegida
              </p>
              <p className="text-sm text-cyan-800">
                Todos los datos que compartes con nosotros están protegidos y son completamente confidenciales. Solo se usan para brindarte un mejor servicio.
              </p>
            </div>
          </div>
        </div>

        {/* Consultas Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/contact');
            }}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ¿Tienes Consultas?
          </button>
        </div>
      </main>
    </div>
  );
}
