'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopNav from '../components/TopNav';

const BeneficiosDetallados = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('telemedicina');

  // Detectar hash en la URL y cambiar tab activo
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    // Mapear "ahorros" a "farmacias" ya que los ahorros son parte del descuento en farmacias
    const tabMapping = {
      'ahorros': 'farmacias',
      'telemedicina': 'telemedicina',
      'farmacias': 'farmacias',
      'terapia': 'terapia',
      'cobertura': 'cobertura'
    };
    
    if (hash && tabMapping[hash]) {
      setActiveTab(tabMapping[hash]);
      // Scroll suave al contenido
      setTimeout(() => {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const benefits = {
    telemedicina: {
      title: 'Telemedicina 24/7',
      subtitle: 'Doctor disponible cuando lo necesites',
      features: [
        {
          title: 'Consultas Ilimitadas',
          description: 'Sin límite de consultas al mes. Usa el servicio tantas veces como necesites.',
          icon: '∞'
        },
        {
          title: 'Respuesta en Minutos',
          description: 'Tiempo promedio de respuesta: 5 minutos. Emergencias: respuesta inmediata.',
          icon: '⚡'
        },
        {
          title: 'Por WhatsApp',
          description: 'Usa la app que ya conoces. No necesitas descargar nada nuevo.',
          icon: '💬'
        },
        {
          title: 'Recetas Digitales',
          description: 'El doctor envía recetas válidas directamente a tu WhatsApp.',
          icon: '📋'
        },
        {
          title: 'Médicos Certificados',
          description: 'Todos nuestros doctores están certificados y colegiados en México.',
          icon: '👨‍⚕️'
        },
        {
          title: 'Historial Médico',
          description: 'Guardamos el historial para que cada consulta sea más efectiva.',
          icon: '📊'
        }
      ],
      useCases: [
        'Dolor de cabeza o estómago',
        'Gripe, tos o fiebre',
        'Presión alta o diabetes',
        'Consultas de seguimiento',
        'Segunda opinión médica',
        'Orientación sobre síntomas'
      ]
    },
    farmacias: {
      title: 'Descuentos en Farmacias',
      subtitle: '40-75% de ahorro en medicamentos',
      features: [
        {
          title: 'Más de 5,000 Farmacias',
          description: 'Red en todo México: Similares, YZA, San Pablo, Roma, Benavides y más.',
          icon: '🏪'
        },
        {
          title: 'Hasta 75% de Descuento',
          description: 'Ahorros reales en medicamentos genéricos y de marca.',
          icon: '💰'
        },
        {
          title: 'Sin Receta para Genéricos',
          description: 'Muchos medicamentos sin necesidad de receta médica.',
          icon: '💊'
        },
        {
          title: 'Tarjeta Digital',
          description: 'Solo muestra tu código en el celular. No necesitas tarjeta física.',
          icon: '📱'
        },
        {
          title: 'Cobertura Nacional',
          description: 'Disponible en todos los estados de México.',
          icon: '🇲🇽'
        },
        {
          title: 'Compara Precios',
          description: 'Ve precios en diferentes farmacias antes de comprar.',
          icon: '🔍'
        }
      ],
      useCases: [
        'Medicamentos para presión alta',
        'Diabetes (metformina, insulina)',
        'Antibióticos',
        'Analgésicos y antiinflamatorios',
        'Medicamentos del corazón',
        'Vitaminas y suplementos'
      ],
      examples: [
        { medicine: 'Metformina 850mg (30 tabs)', normal: '$280', discount: '$70', savings: '75%' },
        { medicine: 'Losartán 50mg (30 tabs)', normal: '$320', discount: '$96', savings: '70%' },
        { medicine: 'Omeprazol 20mg (30 caps)', normal: '$240', discount: '$72', savings: '70%' },
        { medicine: 'Atorvastatina 20mg (30 tabs)', normal: '$400', discount: '$120', savings: '70%' }
      ]
    },
    terapia: {
      title: 'Terapia Psicológica',
      subtitle: 'Apoyo emocional profesional',
      features: [
        {
          title: 'Sesiones Semanales',
          description: 'Una sesión de 45 minutos cada semana con tu psicólogo asignado.',
          icon: '🗓️'
        },
        {
          title: 'Psicólogos Certificados',
          description: 'Profesionales con licencia y experiencia en terapia familiar.',
          icon: '🎓'
        },
        {
          title: 'Videollamadas Privadas',
          description: 'Sesiones por videollamada segura desde la comodidad del hogar.',
          icon: '📹'
        },
        {
          title: 'Temas Especializados',
          description: 'Experiencia en migración, ansiedad, depresión y relaciones familiares.',
          icon: '💭'
        },
        {
          title: 'Sin Estigma',
          description: 'Confidencialidad total. Nadie más se entera.',
          icon: '🔒'
        },
        {
          title: 'Apoyo Continuo',
          description: 'Mensajes entre sesiones para soporte adicional cuando lo necesites.',
          icon: '💬'
        }
      ],
      useCases: [
        'Ansiedad por separación familiar',
        'Depresión y soledad',
        'Estrés laboral y económico',
        'Conflictos familiares',
        'Adaptación a cambios',
        'Duelo y pérdidas'
      ]
    },
    cobertura: {
      title: 'Cobertura Familiar',
      subtitle: 'Hasta 4 personas protegidas',
      features: [
        {
          title: 'Hasta 4 Miembros',
          description: 'Cubre padres, abuelos, hermanos, hijos. Tú decides quiénes.',
          icon: '👨‍👩‍👧‍👦'
        },
        {
          title: 'Mismo Precio',
          description: '$12/mes total. No importa si es 1 persona o 4.',
          icon: '💵'
        },
        {
          title: 'Códigos Individuales',
          description: 'Cada familiar recibe su propio código de acceso.',
          icon: '🔑'
        },
        {
          title: 'Uso Independiente',
          description: 'Cada uno usa los servicios cuando quiera, sin permisos.',
          icon: '✨'
        },
        {
          title: 'Cambios Permitidos',
          description: 'Puedes cambiar familiares una vez al mes si es necesario.',
          icon: '🔄'
        },
        {
          title: 'Sin Preexistencias',
          description: 'No importa si tienen condiciones de salud previas.',
          icon: '❤️'
        }
      ],
      useCases: [
        'Mamá con diabetes',
        'Papá con presión alta',
        'Abuela con artritis',
        'Hermano con ansiedad',
        'Familiar con depresión',
        'Cualquier adulto de tu familia'
      ]
    }
  };

  const currentBenefit = benefits[activeTab];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <TopNav onBack={() => navigate('/home')} hideUser={true} showMenu={true} />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl font-black text-white mb-6">
            Beneficios Detallados
          </h1>
          <p className="text-lg md:text-3xl lg:text-4xl text-gray-300 max-w-3xl mx-auto">
            Conoce todo lo que incluye tu membresía de <strong className="text-cyan-400">$12/mes</strong>
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('telemedicina')}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'telemedicina'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg scale-105'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 shadow border border-gray-700'
            }`}
          >
            🏥 Telemedicina
          </button>
          <button
            onClick={() => setActiveTab('farmacias')}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'farmacias'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg scale-105'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 shadow border border-gray-700'
            }`}
          >
            💊 Farmacias
          </button>
          <button
            onClick={() => setActiveTab('terapia')}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'terapia'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg scale-105'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 shadow border border-gray-700'
            }`}
          >
            🧠 Terapia
          </button>
          <button
            onClick={() => setActiveTab('cobertura')}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'cobertura'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 shadow border border-gray-700'
            }`}
          >
            👨‍👩‍👧‍👦 Cobertura
          </button>
        </div>

        {/* Content */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-12 border border-gray-700">
          {/* Header del beneficio */}
          <div className="mb-8 pb-8 border-b border-gray-700">
            <h2 className="text-lg md:text-3xl lg:text-4xl font-black text-white mb-2">{currentBenefit.title}</h2>
            <p className="text-lg md:text-3xl lg:text-4xl text-gray-300">{currentBenefit.subtitle}</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {currentBenefit.features.map((feature, index) => (
              <div key={index} className="bg-gray-900/50 rounded-xl p-6 border border-gray-600">
                <div className="flex items-start gap-4">
                  <div className="text-lg md:text-3xl lg:text-4xl">{feature.icon}</div>
                  <div>
                    <h3 className="font-bold text-white mb-2 text-base md:text-2xl lg:text-3xl">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Use Cases */}
          <div className="bg-cyan-900/30 rounded-2xl p-8 border-2 border-cyan-700 mb-8">
            <h3 className="font-bold text-white mb-6 text-base md:text-2xl lg:text-3xl">¿Cuándo usar este beneficio?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {currentBenefit.useCases.map((useCase, index) => (
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

          {/* Ejemplos de precios (solo para farmacias) */}
          {activeTab === 'farmacias' && currentBenefit.examples && (
            <div className="bg-green-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h3 className="font-bold text-white mb-6 text-base md:text-2xl lg:text-3xl">Ejemplos de Ahorros Reales</h3>
              <div className="space-y-4">
                {currentBenefit.examples.map((example, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-700">
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
                        <div className="bg-green-500 text-white px-4 py-2 rounded-full font-black">
                          {example.savings}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-300 mt-6 font-semibold">
                ✨ Con solo usar el descuento 1 vez al mes, tu membresía se paga sola
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-500 to-pink-500 rounded-3xl shadow-2xl p-10 text-center text-white">
          <h2 className="text-lg md:text-3xl lg:text-4xl md:text-lg md:text-3xl lg:text-4xl font-black mb-6">
            Todo Esto por Solo $12 al Mes
          </h2>
          <p className="text-lg md:text-3xl lg:text-4xl mb-8 max-w-2xl mx-auto">
            Menos de lo que gastas en café. Más valioso que cualquier otra cosa.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-cyan-600 px-10 py-4 rounded-2xl font-bold text-lg md:text-3xl lg:text-4xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Empezar Ahora →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeneficiosDetallados;
