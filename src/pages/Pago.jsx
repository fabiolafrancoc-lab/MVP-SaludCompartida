import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, CheckCircle } from 'lucide-react';

export default function Pago() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Datos del usuario del registro
  const [userData, setUserData] = useState({});

  // Datos de la tarjeta
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Errores
  const [errors, setErrors] = useState({});

  // Cargar datos del usuario registrado
  useEffect(() => {
    const registrationData = localStorage.getItem('registrationUser');
    if (!registrationData) {
      // Si no hay datos de registro, redirigir a registro
      navigate('/registro');
      return;
    }
    setUserData(JSON.parse(registrationData));
  }, [navigate]);

  // Formatear número de tarjeta (XXXX XXXX XXXX XXXX)
  const formatCardNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = numbers.match(/.{1,4}/g);
    return formatted ? formatted.join(' ') : numbers;
  };

  // Formatear fecha de expiración (MM/YY)
  const formatExpiryDate = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return numbers.slice(0, 2) + '/' + numbers.slice(2, 4);
    }
    return numbers;
  };

  // Validar tarjeta
  const validateCard = () => {
    const newErrors = {};

    // Número de tarjeta (16 dígitos)
    const cardNumbers = cardNumber.replace(/\s/g, '');
    if (!cardNumbers) {
      newErrors.cardNumber = 'El número de tarjeta es requerido';
    } else if (cardNumbers.length !== 16) {
      newErrors.cardNumber = 'Debe ser un número de 16 dígitos';
    }

    // Nombre en tarjeta
    if (!cardName.trim()) {
      newErrors.cardName = 'El nombre en la tarjeta es requerido';
    }

    // Fecha de expiración
    if (!expiryDate) {
      newErrors.expiryDate = 'La fecha de expiración es requerida';
    } else {
      const [month, year] = expiryDate.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      if (!month || !year) {
        newErrors.expiryDate = 'Formato inválido (MM/YY)';
      } else if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = 'Mes inválido';
      } else if (parseInt(year) < currentYear || 
                (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = 'Tarjeta expirada';
      }
    }

    // CVV (3 o 4 dígitos)
    if (!cvv) {
      newErrors.cvv = 'El CVV es requerido';
    } else if (cvv.length < 3 || cvv.length > 4) {
      newErrors.cvv = 'CVV inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Procesar pago
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCard()) {
      return;
    }

    setIsProcessing(true);

    // Simular procesamiento de pago (2 segundos)
    // En producción, aquí iría la llamada a Stripe
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);

      // Guardar información de la suscripción
      const subscriptionData = {
        ...userData,
        subscriptionDate: new Date().toISOString(),
        confirmationNumber: 'SC' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        plan: 'Plan Familiar',
        amount: 29.99,
        cardLast4: cardNumber.replace(/\s/g, '').slice(-4),
        status: 'active'
      };

      localStorage.setItem('subscriptionData', JSON.stringify(subscriptionData));

      // Redirigir a confirmación después de 3 segundos
      setTimeout(() => {
        navigate('/confirmacion', { state: subscriptionData });
      }, 3000);
    }, 2000);
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.replace(/\//g, '').length <= 4) {
      setExpiryDate(formatted);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setCvv(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/registro')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver</span>
          </button>
          <img src="/saludcompartida logo WT.png" alt="SaludCompartida" className="h-10" />
        </div>
      </div>

      {/* Modal de éxito */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h3>
            <p className="text-gray-600">
              Procesando tu suscripción...
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Columna izquierda - Resumen */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Completa tu Suscripción</h1>
            <p className="text-gray-600 mb-8">
              Solo un paso más para proteger a tu familia
            </p>

            {/* Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Plan Seleccionado</h3>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">Plan Familiar</p>
                  <p className="text-sm text-gray-600">Hasta 5 personas</p>
                </div>
                <p className="text-2xl font-bold text-cyan-600">$29.99</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Telemedicina ilimitada 24/7</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Descuentos hasta 75% en farmacias</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Terapia psicológica familiar</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Acceso para familiares en México</p>
                </div>
              </div>
            </div>

            {/* Seguridad */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 text-sm">Pago 100% Seguro</p>
                <p className="text-sm text-blue-700">
                  Tu información está protegida con encriptación de nivel bancario
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha - Formulario de pago */}
          <div>
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-xl p-4 mb-6">
                <CreditCard className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Información de Pago</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Número de tarjeta */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full px-4 py-3 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                      errors.cardNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>
                  )}
                </div>

                {/* Nombre en tarjeta */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre en la Tarjeta
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    placeholder="NOMBRE APELLIDO"
                    className={`w-full px-4 py-3 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                      errors.cardName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.cardName && (
                    <p className="text-red-600 text-sm mt-1">{errors.cardName}</p>
                  )}
                </div>

                {/* Fecha de expiración y CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha de Expiración
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      className={`w-full px-4 py-3 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                        errors.expiryDate ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-600 text-sm mt-1">{errors.expiryDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={handleCvvChange}
                      placeholder="123"
                      className={`w-full px-4 py-3 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                        errors.cvv ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.cvv && (
                      <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                {/* Botón de pago */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </span>
                  ) : (
                    `Pagar $29.99 USD`
                  )}
                </button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  Al hacer clic en "Pagar", aceptas nuestros{' '}
                  <a href="/terms" className="text-cyan-600 hover:underline">Términos y Condiciones</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
