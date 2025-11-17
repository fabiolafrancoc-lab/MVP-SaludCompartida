import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

export default function SubscriptionSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Countdown para redirigir a registro
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
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <TopNav />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Ícono de éxito */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Título */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¡Pago Exitoso! 🎉
          </h1>

          {/* Mensaje */}
          <p className="text-lg text-gray-600 mb-8">
            Tu suscripción a <span className="font-semibold text-indigo-600">SaludCompartida</span> está activa.
          </p>

          {/* Info de sesión */}
          {sessionId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-500 mb-1">ID de transacción:</p>
              <p className="text-xs text-gray-700 font-mono break-all">{sessionId}</p>
            </div>
          )}

          {/* Siguiente paso */}
          <div className="bg-indigo-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Próximo Paso
            </h2>
            <p className="text-gray-700 mb-4">
              Completa tu registro para recibir tus códigos de acceso y comenzar a cuidar la salud de tu ser querido.
            </p>
            <div className="text-4xl font-bold text-indigo-600">
              {countdown}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Redirigiendo al registro...
            </p>
          </div>

          {/* Botón manual */}
          <button
            onClick={() => navigate('/registro')}
            className="w-full bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Ir al Registro Ahora →
          </button>

          {/* Info adicional */}
          <p className="text-sm text-gray-500 mt-6">
            Recibirás un correo de confirmación con los detalles de tu suscripción.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
