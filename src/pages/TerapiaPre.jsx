import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

// Ícono personalizado de Terapia/Cerebro
const TherapyIcon = () => (
  <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="url(#therapyGradient)" />
    <path d="M35 45C35 35 42 28 50 28C58 28 65 35 65 45C65 48 64 51 62 54L50 72L38 54C36 51 35 48 35 45Z" fill="white" />
    <circle cx="45" cy="42" r="3" fill="#F97316" />
    <circle cx="55" cy="42" r="3" fill="#F97316" />
    <path d="M45 50C45 50 47.5 52 50 52C52.5 52 55 50 55 50" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="therapyGradient" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#FB923C" />
      </linearGradient>
    </defs>
  </svg>
);

const TerapiaPre = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Sesiones Semanales',
      description: 'Una sesión de 45 minutos cada semana con tu psicólogo asignado.'
    },
    {
      title: 'Psicólogos Certificados',
      description: 'Profesionales certificados con experiencia en distintas áreas.'
    },
    {
      title: 'Por Videollamada',
      description: 'Sesiones por videollamada desde la comodidad de tu hogar.'
    },
    {
      title: 'Confidencialidad Total',
      description: 'Tus sesiones son completamente privadas y confidenciales.'
    },
    {
      title: 'Horarios Flexibles',
      description: 'Agenda tus sesiones en el horario que mejor te convenga.'
    },
    {
      title: 'Seguimiento Continuo',
      description: 'Tu psicólogo lleva registro de tu progreso semana a semana.'
    }
  ];

  const useCases = [
    'Ansiedad y estrés',
    'Depresión',
    'Problemas de pareja',
    'Problemas familiares',
    'Duelo y pérdidas',
    'Autoestima y crecimiento personal'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <TopNav onBack={() => navigate('/home')} hideUser={true} showMenu={true} />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header con Ícono */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <TherapyIcon />
          </div>
          <h1 className="text-base md:text-lg font-black text-white mb-6">
            Terapia Psicológica
          </h1>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            Apoyo emocional profesional
          </p>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-orange-900/30 via-gray-800/50 to-amber-900/30 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-12 border-2 border-orange-500/30">
          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl p-6 border-2 border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
                <h3 className="font-bold text-orange-400 mb-2 text-lg">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Use Cases */}
          <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 rounded-2xl p-8 border-2 border-orange-400/50 shadow-xl shadow-orange-500/10">
            <h3 className="font-bold text-orange-300 mb-6 text-lg">¿Cuándo usar este beneficio?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {useCases.map((useCase, index) => (
                <div key={index} className="flex items-center gap-3 bg-orange-500/10 rounded-lg p-4 shadow border-2 border-orange-500/30 hover:bg-orange-500/20 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-fuchsia-500 to-pink-600 rounded-3xl shadow-2xl p-10 text-center text-white">
          <h2 className="text-base md:text-base font-black mb-6">
            Todo Esto por Solo $12 al Mes
          </h2>
          <p className="text-base mb-8 max-w-2xl mx-auto">
            Menos de lo que gastas en café. Más valioso que cualquier otra cosa.
          </p>
          <button
            onClick={() => navigate('/registro')}
            className="bg-white text-fuchsia-600 px-10 py-4 rounded-2xl font-bold text-base shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Contratar Ahora
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TerapiaPre;
