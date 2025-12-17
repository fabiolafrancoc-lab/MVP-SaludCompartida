import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

// Ícono personalizado de Ahorros
const SavingsIcon = () => (
  <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="url(#savingsGradient)" />
    <circle cx="50" cy="45" r="20" stroke="white" strokeWidth="4" fill="none" />
    <path d="M50 30V35M50 55V60M35 45H40M60 45H65" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <text x="50" y="50" fontSize="20" fill="white" textAnchor="middle" dy=".3em" fontWeight="bold">$</text>
    <path d="M30 60C30 60 35 65 50 65C65 65 70 60 70 60" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <defs>
      <linearGradient id="savingsGradient" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
  </svg>
);

const MisAhorrosPre = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Seguimiento de Gastos',
      description: 'Visualiza cuánto has ahorrado en consultas y medicamentos cada mes.'
    },
    {
      title: 'Reporte Mensual',
      description: 'Recibe un reporte detallado de todos tus ahorros acumulados.'
    },
    {
      title: 'Historial Completo',
      description: 'Accede al historial de todas tus consultas y compras con descuento.'
    },
    {
      title: 'Comparativa de Precios',
      description: 'Ve cuánto habrías gastado sin SaludCompartida vs. lo que realmente pagaste.'
    },
    {
      title: 'Proyección Anual',
      description: 'Calcula cuánto ahorrarás en el año completo con tu membresía.'
    },
    {
      title: 'Exportar Reportes',
      description: 'Descarga tus reportes de ahorro en PDF para tus registros.'
    }
  ];

  const savingsExamples = [
    {
      category: 'Consultas Médicas',
      normal: 'Promedio $500/consulta',
      withPlan: '$0 (ilimitadas)',
      savings: 'Ahorro: $2,000+/mes'
    },
    {
      category: 'Medicamentos',
      normal: 'Precio regular en farmacia',
      withPlan: '40-75% descuento',
      savings: 'Ahorro: $300-500/mes'
    },
    {
      category: 'Terapia Psicológica',
      normal: 'Promedio $800/sesión',
      withPlan: '$0 (4 sesiones/mes)',
      savings: 'Ahorro: $3,200/mes'
    }
  ];

  const useCases = [
    'Ver ahorros del mes actual',
    'Comparar con meses anteriores',
    'Calcular retorno de inversión',
    'Exportar para impuestos',
    'Compartir con familiares',
    'Planificar presupuesto de salud'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <TopNav onBack={() => navigate('/home')} hideUser={true} showMenu={true} />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header con Ícono */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <SavingsIcon />
          </div>
          <h1 className="text-base md:text-lg font-black text-white mb-6">
            Mis Ahorros
          </h1>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            Visualiza cuánto estás ahorrando con SaludCompartida
          </p>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-green-900/30 via-gray-800/50 to-emerald-900/30 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-12 border-2 border-green-500/30">
          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-6 border-2 border-green-500/30 hover:border-green-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
                <h3 className="font-bold text-green-400 mb-2 text-lg">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Savings Examples */}
          <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 rounded-2xl p-8 border-2 border-green-400/50 shadow-xl shadow-green-500/10 mb-8">
            <h3 className="font-bold text-green-300 mb-6 text-lg">Ejemplos de Ahorros Promedio</h3>
            <div className="space-y-4">
              {savingsExamples.map((example, index) => (
                <div key={index} className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 shadow-lg border-2 border-green-500/30 hover:border-green-500/60 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <p className="font-bold text-white text-lg">{example.category}</p>
                      <p className="text-gray-400 text-sm mt-1">{example.normal}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-green-400 font-semibold">Con SaludCompartida</p>
                      <p className="text-base text-green-400 font-black">{example.withPlan}</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-black text-sm shadow-lg">
                      {example.savings}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-300 mt-6 font-semibold">
              Ahorro total estimado: $5,500+ al mes
            </p>
          </div>

          {/* Use Cases */}
          <div className="bg-gradient-to-br from-green-900/30 via-gray-800/50 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-500/30">
            <h3 className="font-bold text-white mb-6 text-lg">¿Para qué usar Mis Ahorros?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {useCases.map((useCase, index) => (
                <div key={index} className="flex items-center gap-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-4 shadow-lg border-2 border-green-500/30 hover:border-green-500/60 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
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
            Invierte $12 y ahorra $5,500+ cada mes. El mejor retorno de inversión de tu vida.
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

export default MisAhorrosPre;
