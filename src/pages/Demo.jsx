import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { DemoTourController } from '../lib/demoTour';

const Demo = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const [showWhatsAppSim, setShowWhatsAppSim] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [tourStarted, setTourStarted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Iniciar el tour automáticamente después de 800ms
    const autoStartTimer = setTimeout(() => {
      if (!tourStarted) {
        startDemoTour();
      }
    }, 800);

    return () => clearTimeout(autoStartTimer);
  }, []);

  const startDemoTour = () => {
    setTourStarted(true);
    
    // Paso 1: Mostrar introducción (3 segundos)
    setShowIntro(true);
    
    setTimeout(() => {
      setShowIntro(false);
      // Paso 2: Mostrar simulación de WhatsApp (solo 0.5 segundos para ver)
      setShowWhatsAppSim(true);
      
      setTimeout(() => {
        setShowWhatsAppSim(false);
        // Paso 3: Iniciar el tour automático INMEDIATAMENTE
        const tourController = new DemoTourController(navigate, setCurrentUser);
        tourController.start();
      }, 500);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-pink-50 to-purple-50 flex items-center justify-center p-6">
      
      {/* Ocultar contenido cuando el tour está activo */}
      {!showIntro && !showWhatsAppSim && !tourStarted && (
        <div className="max-w-4xl w-full">
        {/* Card Principal */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-8 text-center text-white">
            <div className="mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Cómo Funciona SaludCompartida
            </h1>
            <p className="text-xl md:text-2xl">
              Explora nuestra plataforma sin compromiso
            </p>
          </div>

          {/* Contenido */}
          <div className="p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
                ¿Qué puedes explorar?
              </h2>
              <p className="text-lg text-gray-700 text-center mb-6">
                Navega por toda la plataforma para conocer nuestros servicios
              </p>
            </div>

            {/* Características */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-cyan-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      Navegación Completa
                    </h3>
                    <p className="text-gray-700">
                      Explora todos los servicios: Telemedicina, Farmacias, Terapia, y más
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-pink-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      Mis Ahorros en $0
                    </h3>
                    <p className="text-gray-700">
                      Como usuario nuevo, empiezas en $0. Verás cómo se acumulan con el tiempo
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      Ver Todo el Sistema
                    </h3>
                    <p className="text-gray-700">
                      Descubre cómo funciona el dashboard, menú, y todas las funciones
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      Sin Compromiso
                    </h3>
                    <p className="text-gray-700">
                      No necesitas registrarte ni pagar nada. Solo explora
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Instrucciones */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    🎬 Tour Automático
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold">1.</span>
                      <span>Verás cómo <strong>Pedro</strong> (migrante en USA) se suscribe por <strong>$12/mes</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 font-bold">2.</span>
                      <span>Ambos reciben códigos de acceso por <strong>WhatsApp</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">3.</span>
                      <span>Conocerás los beneficios de <strong>Ana</strong> (familiar en México)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">4.</span>
                      <span>Verás cómo Pedro gestiona la suscripción</span>
                    </li>
                  </ul>
                  <p className="text-cyan-600 font-bold mt-4 text-center">
                    ¡Todo automático! Solo presiona el botón 👇
                  </p>
                </div>
              </div>
            </div>

            {/* Botón CTA */}
            <div className="text-center">
              <button
                onClick={startDemoTour}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-5 px-12 rounded-xl text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
              >
                🚀 Ver Cómo Funciona (Tour Automático)
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Te llevaremos por todas las secciones automáticamente
              </p>
            </div>
          </div>
        </div>

        {/* Nota adicional */}
        <div className="mt-6 text-center space-y-3">
          <p className="text-gray-600">
            ¿Listo para suscribirte?{' '}
            <button
              onClick={() => navigate('/registro')}
              className="text-cyan-600 hover:text-cyan-700 font-bold underline"
            >
              Regístrate aquí
            </button>
          </p>
          <p className="text-gray-600">
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700 underline"
            >
              Volver al inicio
            </button>
          </p>
        </div>
      </div>
      )}

      {/* Pantalla de Introducción */}
      {showIntro && (
        <div className="fixed inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center z-50 p-6">
          <div className="max-w-3xl w-full text-center text-white">
            <div className="mb-8 animate-bounce">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-5xl font-black mb-6">
              Pedro en USA se suscribe
            </h1>
            
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 mb-6">
              <p className="text-2xl font-bold mb-4">
                🇺🇸 Pedro González en Estados Unidos
              </p>
              <p className="text-xl mb-4">
                Paga <span className="text-4xl font-black">$12/mes</span>
              </p>
              <p className="text-2xl font-bold mt-6">
                🇲🇽 La usuaria en México es Ana Rojas
              </p>
            </div>

            <div className="animate-pulse text-white font-bold text-xl">
              Enviando credenciales...
            </div>
          </div>
        </div>
      )}

      {/* Simulación de WhatsApp - Doble: Migrante y Familiar */}
      {showWhatsAppSim && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6 overflow-y-auto">
            <div className="max-w-4xl w-full py-10">
              <h2 className="text-3xl font-black text-white text-center mb-8">
                📱 Ambos reciben sus códigos por WhatsApp
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* WhatsApp Migrante (USA) */}
                <div className="bg-white rounded-3xl p-6 shadow-2xl animate-bounce">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-gray-100">
                    <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-black text-gray-900">WhatsApp</p>
                      <p className="text-sm text-gray-600">🇺🇸 Pedro (USA)</p>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-4 mb-3">
                    <p className="text-gray-800 mb-2">
                      ¡Hola Pedro! 👋
                    </p>
                    <p className="text-gray-700 mb-2 text-sm">
                      Tu código de acceso es:
                    </p>
                    <p className="font-black text-cyan-600 text-xl mb-3">SC-USA-DEMO</p>
                    <p className="text-gray-600 text-sm">
                      Ingresa para gestionar la suscripción de tu familia 👨‍👩‍👧
                    </p>
                  </div>
                </div>

                {/* WhatsApp Familiar (México) */}
                <div className="bg-white rounded-3xl p-6 shadow-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-gray-100">
                    <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-black text-gray-900">WhatsApp</p>
                      <p className="text-sm text-gray-600">🇲🇽 Ana (México)</p>
                    </div>
                  </div>
                  <div className="bg-pink-50 rounded-2xl p-4 mb-3">
                    <p className="text-gray-800 mb-2">
                      ¡Hola Ana! 👋
                    </p>
                    <p className="text-gray-700 mb-2 text-sm">
                      Tu código de acceso es:
                    </p>
                    <p className="font-black text-pink-600 text-xl mb-3">SC-MX-DEMO</p>
                    <p className="text-gray-600 text-sm">
                      Ingresa para usar doctor, farmacias y terapia 🏥💊
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <div className="animate-pulse text-white font-bold text-xl">
                  Iniciando tour automático...
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Demo;
