import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Mis Ahorros
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Visualiza cuánto estás ahorrando con SaludCompartida
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

          {/* Savings Examples */}
          <div className="bg-green-900/30 rounded-2xl p-8 border-2 border-green-700 mb-8">
            <h3 className="font-bold text-white mb-6 text-2xl">Ejemplos de Ahorros Promedio</h3>
            <div className="space-y-4">
              {savingsExamples.map((example, index) => (
                <div key={index} className="bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-700">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <p className="font-bold text-white text-lg">{example.category}</p>
                      <p className="text-gray-400 text-sm mt-1">{example.normal}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-cyan-400 font-semibold">Con SaludCompartida</p>
                      <p className="text-xl text-cyan-400 font-black">{example.withPlan}</p>
                    </div>
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full font-black text-sm">
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
          <div className="bg-cyan-900/30 rounded-2xl p-8 border-2 border-cyan-700">
            <h3 className="font-bold text-white mb-6 text-2xl">¿Para qué usar Mis Ahorros?</h3>
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
            Invierte $12 y ahorra $5,500+ cada mes. El mejor retorno de inversión de tu vida.
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

export default MisAhorrosPre;
