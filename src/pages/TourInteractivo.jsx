import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TourInteractivo = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: '¡Bienvenido!',
      subtitle: 'Conoce cómo funciona SaludCompartida',
      description: 'Te vamos a mostrar paso a paso cómo cuidar la salud de tu familia en México desde Estados Unidos',
      icon: '👋',
      color: 'from-cyan-500 to-blue-500',
      action: null
    },
    {
      title: 'Paso 1: Te Registras',
      subtitle: 'Solo necesitas 2 minutos',
      description: 'Ingresas tu nombre, email y teléfono. Es muy sencillo, como llenar un formulario en papel.',
      icon: '📝',
      color: 'from-blue-500 to-purple-500',
      image: '/registro-ejemplo.png',
      bullets: [
        'Tu nombre completo',
        'Tu email (correo electrónico)',
        'Tu número de teléfono en USA',
        'Datos de tu familiar en México'
      ]
    },
    {
      title: 'Paso 2: Pagas $12 al mes',
      subtitle: 'Un café al día por la salud de tu familia',
      description: 'Pagas con tu tarjeta de forma segura. El cargo es automático cada mes.',
      icon: '💳',
      color: 'from-purple-500 to-pink-500',
      bullets: [
        'Solo $12 dólares al mes',
        'Pago seguro con tarjeta',
        'Se cobra automáticamente',
        'Puedes cancelar cuando quieras'
      ]
    },
    {
      title: 'Paso 3: Recibes Códigos por WhatsApp',
      subtitle: '¡Automático! En menos de 30 segundos',
      description: 'Te llegan 2 códigos por WhatsApp: uno para ti y otro para tu familia en México',
      icon: '📱',
      color: 'from-pink-500 to-red-500',
      whatsappSimulation: true,
      messages: [
        {
          type: 'incoming',
          text: '✅ ¡Bienvenido a SaludCompartida!\n\nTu código de acceso: SC-USA-123456\n\nIngresa este código en saludcompartida.app para acceder a tu panel',
          time: 'Ahora'
        },
        {
          type: 'incoming',
          text: '👨‍👩‍👧 Código para tu familia en México: SC-MX-789012\n\nEnvíale este código a tu familiar para que acceda a todos los servicios',
          time: 'Ahora'
        }
      ]
    },
    {
      title: 'Paso 4: Tu Familia en México Accede',
      subtitle: 'Servicios disponibles 24/7',
      description: 'Tu familiar ingresa su código y puede usar todos estos servicios inmediatamente:',
      icon: '🇲🇽',
      color: 'from-green-500 to-emerald-500',
      services: [
        {
          icon: '👨‍⚕️',
          name: 'Telemedicina 24/7',
          description: 'Habla con un doctor por WhatsApp o videollamada a cualquier hora',
          value: 'Ahorro: ~$1,100 MXN por consulta'
        },
        {
          icon: '💊',
          name: 'Descuentos en Farmacias',
          description: 'Hasta 75% de descuento en medicinas en miles de farmacias',
          value: 'Ahorro: Hasta $500 MXN al mes'
        },
        {
          icon: '🧠',
          name: 'Terapia Psicológica',
          description: 'Sesión semanal con psicólogo profesional',
          value: 'Ahorro: ~$1,476 MXN al mes'
        }
      ]
    },
    {
      title: 'Paso 5: Tú También Tienes Acceso',
      subtitle: 'Desde Estados Unidos',
      description: 'Con tu código puedes ver todo desde tu teléfono:',
      icon: '🇺🇸',
      color: 'from-blue-600 to-cyan-500',
      features: [
        {
          icon: '💰',
          name: 'Mis Ahorros',
          description: 'Ve cuánto dinero has ahorrado cada mes'
        },
        {
          icon: '📊',
          name: 'Dashboard Completo',
          description: 'Controla todo desde tu teléfono'
        },
        {
          icon: '📞',
          name: 'Soporte 24/7',
          description: 'Escríbenos cuando necesites ayuda'
        }
      ]
    },
    {
      title: '¡Listo! Es así de simple',
      subtitle: 'Comienza hoy mismo',
      description: '5 pasos sencillos para cuidar a tu familia en México desde Estados Unidos',
      icon: '🎉',
      color: 'from-cyan-500 to-blue-500',
      cta: true
    }
  ];

  const currentStepData = steps[currentStep];

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 5000); // 5 segundos por paso
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep]);

  const startTour = () => {
    setIsPlaying(true);
    if (currentStep === steps.length - 1) {
      setCurrentStep(0);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <img 
            src="/saludcompartida logo WT.png" 
            alt="SaludCompartida" 
            className="h-16"
          />
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 font-medium text-lg"
          >
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Paso {currentStep + 1} de {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header del paso */}
          <div className={`bg-gradient-to-r ${currentStepData.color} p-8 text-center text-white`}>
            <div className="text-6xl mb-4">{currentStepData.icon}</div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              {currentStepData.title}
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              {currentStepData.subtitle}
            </p>
          </div>

          {/* Contenido del paso */}
          <div className="p-8 md:p-12">
            <p className="text-xl text-gray-700 mb-8 text-center leading-relaxed">
              {currentStepData.description}
            </p>

            {/* Bullets */}
            {currentStepData.bullets && (
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <ul className="space-y-3">
                  {currentStepData.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-lg text-gray-800">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* WhatsApp Simulation */}
            {currentStepData.whatsappSimulation && (
              <div className="max-w-md mx-auto">
                <div className="bg-[#128C7E] rounded-t-xl p-4 text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl">💚</span>
                  </div>
                  <div>
                    <p className="font-bold">SaludCompartida</p>
                    <p className="text-sm opacity-75">en línea</p>
                  </div>
                </div>
                <div className="bg-[#E5DDD5] p-4 space-y-3 min-h-[300px]">
                  {currentStepData.messages.map((message, index) => (
                    <div key={index} className="flex justify-start">
                      <div className="bg-white rounded-lg p-4 shadow max-w-[85%]">
                        <p className="text-gray-800 whitespace-pre-line">{message.text}</p>
                        <p className="text-xs text-gray-500 mt-2 text-right">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services Grid (México) */}
            {currentStepData.services && (
              <div className="space-y-4">
                {currentStepData.services.map((service, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{service.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                        <p className="text-gray-700 mb-2">{service.description}</p>
                        <p className="text-green-600 font-semibold">{service.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Features Grid (USA) */}
            {currentStepData.features && (
              <div className="grid md:grid-cols-3 gap-6">
                {currentStepData.features.map((feature, index) => (
                  <div key={index} className="bg-blue-50 rounded-xl p-6 text-center">
                    <div className="text-4xl mb-3">{feature.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.name}</h3>
                    <p className="text-gray-700 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Final */}
            {currentStepData.cta && (
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-8 mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    ¿Te gustó cómo funciona?
                  </h3>
                  <p className="text-lg text-gray-700 mb-6">
                    Comienza hoy mismo por solo $12 al mes
                  </p>
                  <button
                    onClick={() => navigate('/registro')}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Registrarme Ahora
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="text-gray-600 hover:text-gray-900 font-medium underline"
                  >
                    Ver el tour de nuevo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-800 hover:bg-gray-100 shadow-lg'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-bold shadow-lg transition-all"
            >
              Siguiente
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => navigate('/registro')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-bold shadow-lg transition-all"
            >
              ¡Comenzar Ahora!
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default TourInteractivo;
