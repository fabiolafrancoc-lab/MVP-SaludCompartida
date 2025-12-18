import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';

export default function SubscriptionSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const [countdown, setCountdown] = useState(5);
  const [processing, setProcessing] = useState(true);
  const [codes, setCodes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Procesar el pago y enviar códigos
    const processPayment = async () => {
      if (!sessionId) {
        setError('No se encontró ID de sesión');
        setProcessing(false);
        return;
      }

      try {
        const response = await fetch('/api/process-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        });

        const data = await response.json();

        if (response.ok) {
          setCodes(data.codes);
          console.log('✅ Códigos generados y enviados:', data);
        } else {
          setError(data.error || 'Error al procesar el pago');
          console.error('❌ Error:', data);
        }
      } catch (err) {
        setError('Error de conexión');
        console.error('❌ Error procesando pago:', err);
      } finally {
        setProcessing(false);
      }
    };

    processPayment();
  }, [sessionId]);

  useEffect(() => {
    // Countdown para redirigir a registro (solo después de procesar)
    if (!processing && !error) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/registro');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [navigate, processing, error]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header con navegación completa */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo - REDUCIDO */}
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
              <img 
                src="/saludcompartida logo WT.png" 
                alt="SaludCompartida" 
                className="h-8 md:h-10 object-contain group-hover:opacity-80 transition-opacity"
              />
            </div>
            
            {/* Navegación Desktop */}
            <nav className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => navigate('/quienes-somos-internal')}
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
            
            {/* Ya tengo mi Código - Log In */}
            <button
              onClick={() => navigate('/page3')}
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-pink-600 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Ya tengo mi Código - Log In
            </button>
            
            {/* Botón Volver */}
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 font-medium text-sm md:text-2xl transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          
          {/* Loading */}
          {processing && (
            <>
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <svg className="w-10 h-10 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Procesando tu pago...
              </h1>
              <p className="text-gray-600">
                Estamos generando tus códigos de acceso y enviándolos por WhatsApp.
              </p>
            </>
          )}

          {/* Error */}
          {error && (
            <>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Hubo un problema
              </h1>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => navigate('/')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
              >
                Volver al inicio
              </button>
            </>
          )}

          {/* Success */}
          {!processing && !error && codes && (
            <>
              {/* Ícono de éxito */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* Título - REDUCIDO */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                ¡Pago Exitoso! 🎉
              </h1>

              {/* Mensaje - REDUCIDO */}
              <p className="text-3xl text-gray-600 mb-4">
                Tu suscripción a <span className="font-semibold text-indigo-600">SaludCompartida</span> está activa.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-semibold mb-2">
                  ✅ Códigos enviados por WhatsApp
                </p>
                <p className="text-sm text-green-700">
                  Revisa tu WhatsApp para ver tus códigos de acceso.
                </p>
              </div>

              {/* Info de sesión */}
              {sessionId && (
                <div className="bg-gray-50 rounded-lg p-4 mb-8">
                  <p className="text-sm text-gray-500 mb-1">ID de transacción:</p>
                  <p className="text-xs text-gray-700 font-mono break-all">{sessionId}</p>
                </div>
              )}

              {/* Siguiente paso - REDUCIDO */}
              <div className="bg-indigo-50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Próximo Paso
                </h2>
                <p className="text-sm text-gray-700 mb-4">
                  Completa tu registro para comenzar a usar tu membresía.
                </p>
                <div className="text-3xl font-bold text-indigo-600">
                  {countdown}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Redirigiendo al registro...
                </p>
              </div>

              {/* Botón manual - REDUCIDO */}
              <button
                onClick={() => navigate('/registro')}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-3xl"
              >
                Ir al Registro Ahora →
              </button>

              {/* Info adicional */}
              <p className="text-sm text-gray-500 mt-6">
                Recibirás un correo de confirmación con los detalles de tu suscripción.
              </p>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
