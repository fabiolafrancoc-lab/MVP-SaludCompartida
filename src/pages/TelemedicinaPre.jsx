import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

const TelemedicinaPre = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Consultas Ilimitadas',
      description: 'Sin límite de consultas al mes. Usa el servicio tantas veces como necesites.'
    },
    {
      title: 'Respuesta en Minutos',
      description: 'Tiempo promedio de respuesta: 5 minutos. Emergencias: respuesta inmediata.'
    },
    {
      title: 'Por WhatsApp',
      description: 'Usa la app que ya conoces. No necesitas descargar nada nuevo.'
    },
    {
      title: 'Recetas Digitales',
      description: 'El doctor envía recetas válidas directamente a tu WhatsApp.'
    },
    {
      title: 'Médicos Certificados',
      description: 'Todos nuestros doctores están certificados y colegiados en México.'
    },
    {
      title: 'Historial Médico',
      description: 'Guardamos el historial para que cada consulta sea más efectiva.'
    }
  ];

  const useCases = [
    'Dolor de cabeza o estómago',
    'Gripe, tos o fiebre',
    'Presión alta o diabetes',
    'Consultas de seguimiento',
    'Segunda opinión médica',
    'Orientación sobre síntomas'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <TopNav onBack={() => navigate('/home')} hideUser={true} showMenu={true} />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Telemedicina 24/7
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Doctor disponible cuando lo necesites
          </p>
        </div>

        {/* Content */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-12 border border-gray-700">
          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900/50 rounded-xl p-6 border border-gray-600">
                <h3 className="font-bold text-white mb-2 text-lg">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Use Cases */}
          <div className="bg-cyan-900/30 rounded-2xl p-8 border-2 border-cyan-700">
            <h3 className="font-bold text-white mb-6 text-2xl">¿Cuándo usar este beneficio?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {useCases.map((useCase, index) => (
                <div key={index} className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-4 shadow border border-gray-700">
                  <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-200 font-medium">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-500 to-pink-500 rounded-3xl shadow-2xl p-10 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Todo Esto por Solo $12 al Mes
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Menos de lo que gastas en café. Más valioso que cualquier otra cosa.
          </p>
          <button
            onClick={() => navigate('/registro')}
            className="bg-white text-cyan-600 px-10 py-4 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Empezar Ahora
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TelemedicinaPre;
