import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, CheckCircle } from 'lucide-react';

// Square Application ID y Location ID
const SQUARE_APP_ID = import.meta.env.VITE_SQUARE_APP_ID || 'sandbox-sq0idb-NKXeieWPwl3DnnkJ3asYcw';
const SQUARE_LOCATION_ID = import.meta.env.VITE_SQUARE_LOCATION_ID || 'LT92PZMMZ3CQ2';

export default function Pago() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [squareLoaded, setSquareLoaded] = useState(false);
  const cardContainerRef = useRef(null);
  const [card, setCard] = useState(null);
  const [payments, setPayments] = useState(null);

  // Datos del usuario del registro
  const [userData, setUserData] = useState({});

  // Errores
  const [errors, setErrors] = useState({});

  // Scroll al tope cuando se monta el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Cargar datos del usuario registrado
  useEffect(() => {
    const registrationData = localStorage.getItem('registrationUser');
    if (!registrationData) {
      navigate('/registro');
      return;
    }
    setUserData(JSON.parse(registrationData));
  }, [navigate]);

  // Cargar el SDK de Square
  useEffect(() => {
    if (!userData.firstName) return;
    
    // Por ahora habilitamos el modo de prueba directo
    setSquareLoaded(true);
  }, [userData]);

  // Manejar el pago con Square (modo simulación)
  const handleSquarePayment = async () => {
    setIsProcessing(true);

    // Simular éxito del pago después de 2 segundos
    setTimeout(() => {
      handleSuccessfulPayment({
        id: 'SIM-' + Date.now(),
        status: 'COMPLETED'
      });
    }, 2000);
  };

  // Procesar pago con Square (llamada al backend)
  const processSquarePayment = async (token) => {
    try {
      const response = await fetch('/api/square-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceId: token,
          amount: 1200, // $12.00 en centavos
          currency: 'USD',
          description: 'SaludCompartida - Plan Familiar Mensual'
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en API:', error);
      return { success: false, error: error.message };
    }
  };

  // Procesar pago exitoso
  const handleSuccessfulPayment = async (paymentData) => {
    setIsProcessing(true);

    console.log('💳 Procesando pago exitoso de Square...');
    console.log('Payment ID:', paymentData.id);
    
    // Generar códigos únicos para migrante y familiar
    const generateCode = (prefix) => {
      return `SC-${prefix}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    };

    const migrantCode = generateCode('USA');
    const familyCode = generateCode('MX');

    // Guardar información del pago
    const subscriptionData = {
      ...userData,
      subscriptionDate: new Date().toISOString(),
      confirmationNumber: 'SC' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      plan: 'Plan Familiar',
      amount: 12.00,
      paymentMethod: 'Square',
      squarePaymentId: paymentData.id,
      status: 'active',
      migrantAccessCode: migrantCode,
      familyAccessCode: familyCode
    };

    localStorage.setItem('subscriptionData', JSON.stringify(subscriptionData));

    // Guardar códigos con mapping a datos de usuario
    const accessCodes = JSON.parse(localStorage.getItem('accessCodes') || '{}');
    
    // Código del migrante
    accessCodes[migrantCode] = {
      type: 'migrant',
      firstName: userData.firstName,
      lastName: userData.lastName,
      motherLastName: userData.motherLastName,
      email: userData.email,
      phone: userData.phone,
      countryCode: userData.countryCode,
      phoneId: userData.phoneId,
      confirmationNumber: subscriptionData.confirmationNumber,
      activatedAt: null
    };

    // Código del familiar en México
    accessCodes[familyCode] = {
      type: 'family',
      firstName: userData.familyMember.firstName,
      lastName: userData.familyMember.lastName,
      whatsapp: userData.familyMember.whatsapp,
      countryCode: userData.familyMember.countryCode,
      phoneId: userData.familyMember.phoneId,
      confirmationNumber: subscriptionData.confirmationNumber,
      activatedAt: null
    };

    localStorage.setItem('accessCodes', JSON.stringify(accessCodes));

    // ENVIAR CÓDIGOS POR WHATSAPP Y EMAIL
    await sendAccessCodes(migrantCode, familyCode, userData);

    setIsProcessing(false);
    setShowSuccess(true);

    // Redirigir a confirmación después de 2 segundos
    setTimeout(() => {
      navigate('/confirmacion', { state: subscriptionData });
    }, 2000);
  };

  // Función para enviar códigos de acceso por WhatsApp y Email
  const sendAccessCodes = async (migrantCode, familyCode, userData) => {
    console.log('🚀 Iniciando envío de códigos...');
    console.log('📋 Datos del usuario:', {
      migrantEmail: userData.email,
      migrantPhone: userData.phoneId,
      familyPhone: userData.familyMember.phoneId,
      migrantCode,
      familyCode
    });

    try {
      // 1. ENVIAR WHATSAPP AL MIGRANTE (USA)
      const migrantMessage = `🎉 ¡Bienvenido a SaludCompartida!

Tu código de acceso: ${migrantCode}

Ingresa a: www.saludcompartida.app
Haz clic en "¿Tienes tu Código?" e ingresa tu código.

¡Tu familia está protegida! 💙

- Telemedicina 24/7
- Descuentos en farmacias
- Terapia psicológica
- Acceso para tu familiar en México

¿Necesitas ayuda? Escríbenos a este número.`;

      console.log('📱 Enviando WhatsApp a migrante:', userData.phoneId);
      const whatsappMigrantResponse = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: userData.phoneId,
          message: migrantMessage,
          type: 'access-code'
        })
      });
      const whatsappMigrantData = await whatsappMigrantResponse.json();
      console.log('✅ WhatsApp migrante:', whatsappMigrantData);

      // 2. ENVIAR WHATSAPP AL FAMILIAR (MÉXICO)
      const familyMessage = `🎉 ¡Bienvenido a SaludCompartida!

Tu código de acceso: ${familyCode}

Ingresa a: www.saludcompartida.app
Haz clic en "¿Tienes tu Código?" e ingresa tu código.

Tu familiar en USA te ha incluido en el plan familiar 💙

Beneficios disponibles:
- Telemedicina 24/7
- Descuentos hasta 75% en farmacias
- Terapia psicológica
- Y mucho más

¿Necesitas ayuda? Escríbenos a este número.`;

      console.log('📱 Enviando WhatsApp a familiar:', userData.familyMember.phoneId);
      const whatsappFamilyResponse = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: userData.familyMember.phoneId,
          message: familyMessage,
          type: 'access-code'
        })
      });
      const whatsappFamilyData = await whatsappFamilyResponse.json();
      console.log('✅ WhatsApp familiar:', whatsappFamilyData);

      // 3. ENVIAR EMAIL AL MIGRANTE
      const migrantEmailMessage = `
        <h2>¡Bienvenido a SaludCompartida, ${userData.firstName}! 🎉</h2>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #0891b2;">Tu Código de Acceso Personal:</h3>
          <p style="font-size: 32px; font-weight: bold; color: #0891b2; letter-spacing: 2px; text-align: center;">
            ${migrantCode}
          </p>
        </div>

        <h3>Cómo Activar tu Cuenta:</h3>
        <ol>
          <li>Ve a <strong>www.saludcompartida.app</strong></li>
          <li>Haz clic en <strong>"¿Tienes tu Código?"</strong></li>
          <li>Ingresa tu código: <strong>${migrantCode}</strong></li>
          <li>Confirma tus datos y listo!</li>
        </ol>

        <h3>Tus Beneficios Incluyen:</h3>
        <ul>
          <li>✅ Telemedicina 24/7 por WhatsApp</li>
          <li>✅ Descuentos hasta 75% en farmacias</li>
          <li>✅ Terapia psicológica para toda la familia</li>
          <li>✅ Acceso para tu familiar en México</li>
        </ul>

        <p><strong>Código de tu familiar en México:</strong> ${familyCode}</p>
        <p>Tu familiar también recibirá su código por WhatsApp.</p>
      `;

      console.log('📧 Enviando email a migrante:', userData.email);
      const emailMigrantResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: userData.email,
          subject: '🎉 Tu Código de Acceso a SaludCompartida',
          message: migrantEmailMessage,
          type: 'direct'
        })
      });
      const emailMigrantData = await emailMigrantResponse.json();
      console.log('✅ Email migrante:', emailMigrantData);

      // 4. ENVIAR NOTIFICACIÓN INTERNA (contact@ y ffranco@)
      const notificationMessage = `
        <h2>🎉 Nueva Suscripción Completada</h2>
        
        <h3>Datos del Migrante (USA):</h3>
        <ul>
          <li><strong>Nombre:</strong> ${userData.firstName} ${userData.lastName}</li>
          <li><strong>Email:</strong> ${userData.email}</li>
          <li><strong>Teléfono:</strong> ${userData.phoneId}</li>
          <li><strong>Código:</strong> ${migrantCode}</li>
        </ul>

        <h3>Datos del Familiar (México):</h3>
        <ul>
          <li><strong>Nombre:</strong> ${userData.familyMember.firstName} ${userData.familyMember.lastName}</li>
          <li><strong>WhatsApp:</strong> ${userData.familyMember.phoneId}</li>
          <li><strong>Código:</strong> ${familyCode}</li>
        </ul>

        <h3>Detalles de Pago:</h3>
        <ul>
          <li><strong>Monto:</strong> $12.00 USD</li>
          <li><strong>Fecha:</strong> ${new Date().toLocaleString('es-MX')}</li>
        </ul>
      `;

      console.log('📧 Enviando notificaciones internas...');
      
      // Enviar a contact@saludcompartida.com
      const notifContact = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'contact@saludcompartida.com',
          subject: '🎉 Nueva Suscripción - SaludCompartida',
          message: notificationMessage,
          type: 'direct'
        })
      });
      const notifContactData = await notifContact.json();
      console.log('✅ Notificación a contact@:', notifContactData);

      // Enviar a ffranco@saludcompartida.com
      const notifFfranco = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'ffranco@saludcompartida.com',
          subject: '🎉 Nueva Suscripción - SaludCompartida',
          message: notificationMessage,
          type: 'direct'
        })
      });
      const notifFfrancoData = await notifFfranco.json();
      console.log('✅ Notificación a ffranco@:', notifFfrancoData);

      console.log('✅ Todos los códigos y notificaciones enviados exitosamente');
    } catch (error) {
      console.error('❌ Error enviando códigos:', error);
    }
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
                <p className="text-2xl font-bold text-cyan-600">$12.00</p>
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

          {/* Columna derecha - PayPal */}
          <div>
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-xl p-4 mb-6">
                <CreditCard className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Información de Pago</h2>
              </div>

              {/* Información de suscripción */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Suscripción para:</p>
                <p className="font-semibold text-gray-900">
                  {userData.firstName} {userData.lastName}
                </p>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>

              {/* Formulario de tarjeta Square */}
              <div className="mb-6">
                {!squareLoaded && (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center gap-2 text-gray-600">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Cargando formulario de pago...</span>
                    </div>
                  </div>
                )}
                
                {/* Formulario de tarjeta simulado */}
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      placeholder="4111 1111 1111 1111"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiración
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                {squareLoaded && (
                  <button
                    onClick={handleSquarePayment}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                      </span>
                    ) : (
                      'Pagar $12.00 USD'
                    )}
                  </button>
                )}
              </div>

              {/* Info sobre seguridad */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-green-900 font-semibold mb-2">� Pago 100% Seguro</p>
                <p className="text-xs text-green-700">
                  Procesado por Square. Tus datos están encriptados y protegidos.
                </p>
              </div>

              {/* Mensaje de procesamiento */}
              {isProcessing && (
                <div className="text-center py-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="inline-flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-green-700 font-medium">Procesando pago y enviando códigos...</span>
                  </div>
                </div>
              )}

              {/* Términos */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-center text-gray-500">
                  Al completar el pago, aceptas nuestros{' '}
                  <a href="/terms" className="text-cyan-600 hover:underline">Términos y Condiciones</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
