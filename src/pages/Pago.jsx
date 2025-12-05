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

    const loadSquareSDK = async () => {
      try {
        // Cargar el script de Square
        if (!window.Square) {
          const script = document.createElement('script');
          script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
          script.async = false; // Cambiar a false para carga sincrónica
          script.onload = () => {
            console.log('✅ Script de Square cargado');
            // Esperar 500ms antes de inicializar
            setTimeout(() => initializeSquare(), 500);
          };
          script.onerror = () => {
            console.error('❌ Error cargando script de Square');
          };
          document.body.appendChild(script);
        } else {
          initializeSquare();
        }
      } catch (error) {
        console.error('Error cargando Square SDK:', error);
      }
    };

    const initializeSquare = async () => {
      try {
        if (!window.Square) {
          console.error('❌ window.Square no está disponible');
          return;
        }

        console.log('🔄 Inicializando Square Payments...');
        const payments = window.Square.payments(SQUARE_APP_ID, SQUARE_LOCATION_ID);
        const card = await payments.card();
        await card.attach('#card-container');
        
        setPayments(payments);
        setCard(card);
        setSquareLoaded(true);
        
        console.log('✅ Square SDK cargado correctamente');
      } catch (error) {
        console.error('❌ Error inicializando Square:', error);
        setSquareLoaded(false);
      }
    };

    loadSquareSDK();
  }, [userData]);

  // Manejar el pago con Square (REAL - SANDBOX)
  const handleSquarePayment = async () => {
    if (!card) {
      alert('Square no está cargado correctamente');
      return;
    }

    setIsProcessing(true);

    try {
      // Tokenizar la tarjeta
      const result = await card.tokenize();
      
      if (result.status === 'OK') {
        console.log('✅ Token generado:', result.token);
        
        // Procesar el pago con el backend
        const paymentResult = await processSquarePayment(result.token);
        
        if (paymentResult.success) {
          console.log('✅ Pago procesado exitosamente:', paymentResult.data);
          handleSuccessfulPayment(paymentResult.data);
        } else {
          console.error('❌ Error en pago:', paymentResult.error);
          alert('Error procesando el pago: ' + paymentResult.error);
          setIsProcessing(false);
        }
      } else {
        console.error('❌ Error tokenizando:', result.errors);
        alert('Error con los datos de la tarjeta');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('❌ Error general:', error);
      alert('Error procesando el pago');
      setIsProcessing(false);
    }
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

      // Verificar si la respuesta es JSON antes de parsear
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Respuesta no es JSON:', text.substring(0, 200));
        throw new Error('El servidor retornó un error. Por favor intenta de nuevo.');
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error procesando el pago');
      }
      
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
    console.log('UserData disponible:', userData);
    
    // Validar que userData existe y tiene datos
    if (!userData || Object.keys(userData).length === 0 || !userData.firstName) {
      console.error('❌ Error: userData no está disponible o está vacío');
      console.error('userData:', userData);
      
      // Intentar recargar desde localStorage
      const registrationData = localStorage.getItem('registrationUser');
      if (registrationData) {
        const parsedData = JSON.parse(registrationData);
        console.log('✅ Datos recuperados de localStorage:', parsedData);
        setUserData(parsedData);
        
        // Procesar el pago con los datos recuperados
        await handleSuccessfulPayment(paymentData);
        return;
      }
      
      alert('Error: Datos de usuario no encontrados. Por favor recarga la página e intenta de nuevo.');
      setIsProcessing(false);
      return;
    }
    
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

    setIsProcessing(false);
    setShowSuccess(true);

    // ENVIAR CÓDIGOS POR WHATSAPP Y EMAIL (en background)
    sendAccessCodes(migrantCode, familyCode, userData).catch(error => {
      console.error('❌ Error enviando códigos (continuando flujo):', error);
    });

    // Redirigir a confirmación después de 1.5 segundos
    setTimeout(() => {
      navigate('/confirmacion', { state: subscriptionData });
    }, 1500);
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
          type: 'access-code',
          countryCode: userData.countryCode
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
          type: 'access-code',
          countryCode: userData.familyMember.countryCode
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
                  <p className="font-semibold text-gray-900">Plan Familiar US-MEX</p>
                  <p className="text-sm text-gray-600">Hasta 4 familiares en México</p>
                </div>
                <p className="text-2xl font-bold text-cyan-600">$12.00</p>
              </div>
              
              <p className="text-sm text-gray-700 mb-4 font-medium">
                Servicio Mensual para tus familiares en México:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Telemedicina ilimitada 24/7. Receta Electrónica de ser necesaria.</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Descuentos en Farmacias</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Terapia Psicológica Semanal</p>
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
                
                {/* Container para Square Card */}
                <div 
                  id="card-container" 
                  ref={cardContainerRef}
                  className={`${squareLoaded ? 'block' : 'hidden'}`}
                  style={{ minHeight: '100px' }}
                ></div>

                {squareLoaded && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs text-yellow-800">
                      <strong>Modo Prueba:</strong> Usa tarjeta 4111 1111 1111 1111, CVV: 111
                    </p>
                  </div>
                )}
              </div>
                
              <button
                onClick={handleSquarePayment}
                disabled={isProcessing || !squareLoaded}
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

              {/* Info sobre seguridad */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-green-900 font-semibold mb-2">🔒 Pago 100% Seguro</p>
                <p className="text-xs text-green-700">
                  Procesado por Square. Tus datos están encriptados y protegidos.
                </p>
              </div>

              {/* Disclaimer Legal de Square */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Aviso Importante:</strong> SaludCompartida no tiene acceso ni almacena información de tu tarjeta de crédito o débito. 
                  Todos los pagos son procesados de forma segura por Square, Inc., un procesador de pagos certificado PCI DSS Nivel 1.
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  Tu información financiera está protegida por encriptación de nivel bancario y cumple con todos los estándares de seguridad internacionales.
                </p>
                <p className="text-xs text-gray-500">
                  Al procesar tu pago, aceptas los{' '}
                  <a href="https://squareup.com/us/en/legal/general/ua" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">
                    Términos de Servicio de Square
                  </a>
                  {' '}y su{' '}
                  <a href="https://squareup.com/us/en/legal/general/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">
                    Política de Privacidad
                  </a>
                  .
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
