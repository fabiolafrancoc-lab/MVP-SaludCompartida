import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Demo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goToDemo = () => {
    // Navigate to page3 with demo code pre-filled
    navigate('/page3', { state: { demoCode: 'DEMO-2025' } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-pink-50 to-purple-50 flex items-center justify-center p-6">
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
                    📱 Pasos para Explorar
                  </h3>
                  <ol className="text-gray-700 space-y-2 list-decimal list-inside">
                    <li className="font-semibold">Presiona el botón "Explorar Plataforma" abajo</li>
                    <li className="font-semibold">Ingresa el código: <span className="text-cyan-600 font-mono text-xl">DEMO-2025</span></li>
                    <li className="font-semibold">Navega por todas las secciones del menú</li>
                    <li className="font-semibold">Descubre cómo funciona cada servicio</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Botón CTA */}
            <div className="text-center">
              <button
                onClick={goToDemo}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-5 px-12 rounded-xl text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
              >
                🚀 Explorar Plataforma
              </button>
              <p className="text-sm text-gray-500 mt-4">
                No se requiere tarjeta de crédito ni información personal
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
    </div>
  );
};

export default Demo;
