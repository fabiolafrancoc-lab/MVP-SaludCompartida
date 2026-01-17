'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

// Ícono personalizado de Farmacia
const PharmacyIcon = () => (
  <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="url(#pharmacyGradient)" />
    <path d="M40 35H60V65H40V35Z" fill="white" />
    <path d="M45 45H55M50 40V50" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" />
    <rect x="35" y="30" width="30" height="5" fill="white" />
    <defs>
      <linearGradient id="pharmacyGradient" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#F43F5E" />
      </linearGradient>
    </defs>
  </svg>
);

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
        {/* Header con Ícono */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <PharmacyIcon />
          </div>
          <h1 className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl font-black text-white mb-6">
            Descuentos en Farmacias
          </h1>
          <p className="text-lg md:text-3xl lg:text-4xl text-gray-300 max-w-3xl mx-auto">
            40-75% de ahorro en medicamentos
          </p>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-pink-900/30 via-gray-800/50 to-rose-900/30 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-12 border-2 border-pink-500/30">
          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-xl p-6 border-2 border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                <h3 className="font-bold text-pink-400 mb-2 text-base md:text-2xl lg:text-3xl">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Use Cases */}
          <div className="bg-gradient-to-br from-rose-900/40 to-pink-900/40 rounded-2xl p-8 border-2 border-pink-400/50 shadow-xl shadow-pink-500/10 mb-8">
            <h3 className="font-bold text-pink-300 mb-6 text-base md:text-2xl lg:text-3xl">¿Cuándo usar este beneficio?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {useCases.map((useCase, index) => (
                <div key={index} className="flex items-center gap-3 bg-pink-500/10 rounded-lg p-4 shadow border-2 border-pink-500/30 hover:bg-pink-500/20 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ejemplos de Ahorros */}
          <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-2xl p-8 border-2 border-green-400/50 shadow-xl shadow-green-500/10">
            <h3 className="font-bold text-green-300 mb-6 text-base md:text-2xl lg:text-3xl">Ejemplos de Ahorros Reales</h3>
            <div className="space-y-4">
              {examples.map((example, index) => (
                <div key={index} className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 shadow-lg border-2 border-green-500/30 hover:border-green-500/60 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <p className="font-bold text-white text-base md:text-2xl lg:text-3xl">{example.medicine}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-400">Precio Normal</p>
                        <p className="text-lg md:text-3xl lg:text-4xl text-gray-500 line-through font-bold">{example.normal}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-green-400 font-semibold">Con Descuento</p>
                        <p className="text-base md:text-2xl lg:text-3xl text-green-400 font-black">{example.discount}</p>
                      </div>
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-black shadow-lg">
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
        <div className="bg-gradient-to-r from-fuchsia-500 to-pink-600 rounded-3xl shadow-2xl p-10 text-center text-white">
          <h2 className="text-lg md:text-3xl lg:text-4xl md:text-lg md:text-3xl lg:text-4xl font-black mb-6">
            Todo Esto por Solo $12 al Mes
          </h2>
          <p className="text-lg md:text-3xl lg:text-4xl mb-8 max-w-2xl mx-auto">
            Menos de lo que gastas en café. Más valioso que cualquier otra cosa.
          </p>
          <button
            onClick={() => navigate('/registro')}
            className="bg-white text-fuchsia-600 px-10 py-4 rounded-2xl font-bold text-lg md:text-3xl lg:text-4xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Contratar Ahora
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FarmaciasPre;
