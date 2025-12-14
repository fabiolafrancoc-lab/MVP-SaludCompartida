import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

const FarmaciasPre = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Más de 5,000 Farmacias',
      description: 'Red en todo México: Similares, YZA, San Pablo, Roma, Benavides y más.'
    },
    {
      title: 'Hasta 75% de Descuento',
      description: 'Ahorros reales en medicamentos genéricos y de marca.'
    },
    {
      title: 'Sin Receta para Genéricos',
      description: 'Muchos medicamentos sin necesidad de receta médica.'
    },
    {
      title: 'Tarjeta Digital',
      description: 'Solo muestra tu código en el celular. No necesitas tarjeta física.'
    },
    {
      title: 'Cobertura Nacional',
      description: 'Funciona en cualquier farmacia afiliada en todo México.'
    },
    {
      title: 'Uso Ilimitado',
      description: 'Compra medicamentos con descuento tantas veces como necesites.'
    }
  ];

  const examples = [
    {
      medicine: 'Metformina 850mg (30 tabletas)',
      normal: '$280',
      discount: '$70',
      savings: '75% OFF'
    },
    {
      medicine: 'Losartán 50mg (30 tabletas)',
      normal: '$320',
      discount: '$96',
      savings: '70% OFF'
    },
    {
      medicine: 'Omeprazol 20mg (30 cápsulas)',
      normal: '$250',
      discount: '$75',
      savings: '70% OFF'
    },
    {
      medicine: 'Atorvastatina 20mg (30 tabletas)',
      normal: '$380',
      discount: '$114',
      savings: '70% OFF'
    }
  ];

  const useCases = [
    'Medicamentos para diabetes',
    'Medicamentos para presión alta',
    'Analgésicos y antiinflamatorios',
    'Antibióticos con receta',
    'Medicamentos crónicos',
    'Vitaminas y suplementos'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <TopNav onBack={() => navigate('/home')} hideUser={true} showMenu={true} />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Descuentos en Farmacias
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            40-75% de ahorro en medicamentos
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
          <div className="bg-cyan-900/30 rounded-2xl p-8 border-2 border-cyan-700 mb-8">
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

          {/* Ejemplos de Ahorros */}
          <div className="bg-green-900/30 rounded-2xl p-8 border-2 border-green-700">
            <h3 className="font-bold text-white mb-6 text-2xl">Ejemplos de Ahorros Reales</h3>
            <div className="space-y-4">
              {examples.map((example, index) => (
                <div key={index} className="bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-700">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <p className="font-bold text-white text-lg">{example.medicine}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-400">Precio Normal</p>
                        <p className="text-xl text-gray-500 line-through font-bold">{example.normal}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-green-400 font-semibold">Con Descuento</p>
                        <p className="text-2xl text-green-400 font-black">{example.discount}</p>
                      </div>
                      <div className="bg-green-500 text-white px-4 py-2 rounded-full font-black">
                        {example.savings}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-300 mt-6 font-semibold">
              Con solo usar el descuento 1 vez al mes, tu membresía se paga sola
            </p>
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

export default FarmaciasPre;
