import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import { HeartIcon, ShieldIcon, FamilyIcon } from '../components/icons/CustomIcons';

const QuienesSomos = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <TopNav onBack={() => navigate('/')} hideUser={true} />

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Quiénes Somos
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Somos migrantes como tú, que entendemos el sacrificio de estar lejos de casa
          </p>
        </div>

        {/* Nuestra Historia */}
        <section className="bg-white rounded-3xl shadow-xl p-10 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <HeartIcon className="w-16 h-16" />
            <h2 className="text-3xl font-black text-gray-900">Nuestra Historia</h2>
          </div>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              <strong>SaludCompartida nació de una necesidad real.</strong> Como migrantes latinos en Estados Unidos, 
              conocemos la angustia de estar a miles de kilómetros cuando tu mamá te llama a las 3 AM porque le duele 
              el pecho, o cuando tu papá necesita sus medicamentos pero son demasiado caros.
            </p>

            <p>
              Trabajamos dos turnos, mandamos dinero cada mes, pero siempre sentimos que no es suficiente. 
              <strong> La culpa de estar lejos nunca se va.</strong>
            </p>

            <p>
              Por eso creamos SaludCompartida: para que <strong>tu sacrificio aquí se convierta en protección allá.</strong> 
              No somos una corporación fría. Somos una familia de migrantes que cuida de otras familias migrantes.
            </p>
          </div>
        </section>

        {/* Nuestra Misión */}
        <section className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl shadow-xl p-10 mb-12 border-2 border-cyan-200">
          <div className="flex items-center gap-4 mb-8">
            <ShieldIcon className="w-16 h-16" />
            <h2 className="text-3xl font-black text-gray-900">Nuestra Misión</h2>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong className="text-cyan-900">Conectar tu esfuerzo en Estados Unidos con el bienestar de tu familia en México.</strong>
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">🎯 Nuestro Propósito</h3>
                <p className="text-gray-700">
                  Que ningún migrante tenga que elegir entre su vida aquí y el bienestar de su familia allá.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">💡 Nuestra Visión</h3>
                <p className="text-gray-700">
                  Un futuro donde cada familia latina tenga acceso a salud de calidad, sin importar las fronteras.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Por Qué Somos Diferentes */}
        <section className="bg-white rounded-3xl shadow-xl p-10 mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
            Por Qué Somos Diferentes
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border-l-4 border-cyan-500">
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🤝</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2 text-xl">Te Entendemos</h3>
                <p className="text-gray-700">
                  No somos una empresa cualquiera. Somos migrantes que han pasado por lo mismo que tú. 
                  Conocemos la culpa, el miedo, el sacrificio.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border-l-4 border-pink-500">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2 text-xl">Acceso Inmediato</h3>
                <p className="text-gray-700">
                  Sin esperas de 30 días. Sin papeleo interminable. Te suscribes hoy, tu familia recibe 
                  atención hoy. Así de simple.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2 text-xl">Precio Justo</h3>
                <p className="text-gray-700">
                  $12 al mes. No $50, no $100. Un precio que respeta tu esfuerzo y que realmente puedes pagar 
                  sin sacrificar otras cosas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border-l-4 border-orange-500">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🔒</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2 text-xl">Sin Trampas</h3>
                <p className="text-gray-700">
                  Sin letra chica. Sin cargos ocultos. Sin "solo por hoy". Lo que ves es lo que pagas. 
                  Cancelas cuando quieras.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestro Equipo */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl p-10 mb-12 border-2 border-purple-200">
          <div className="flex items-center gap-4 mb-8">
            <FamilyIcon className="w-16 h-16" />
            <h2 className="text-3xl font-black text-gray-900">Nuestro Equipo</h2>
          </div>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Somos un equipo multicultural de profesionales de la salud, tecnología y atención al cliente, 
              <strong> todos unidos por una misma experiencia: la migración.</strong>
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-black">
                  MD
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Médicos Certificados</h3>
                <p className="text-sm text-gray-600">
                  Profesionales de la salud disponibles 24/7 para atender a tu familia
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-black">
                  PSI
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Psicólogos Expertos</h3>
                <p className="text-sm text-gray-600">
                  Terapeutas que entienden el impacto emocional de la migración
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-black">
                  CS
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Atención al Cliente</h3>
                <p className="text-sm text-gray-600">
                  Equipo bilingüe que te ayuda en español, cuando lo necesites
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="bg-gradient-to-r from-cyan-500 to-pink-500 rounded-3xl shadow-2xl p-10 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Únete a Nuestra Familia
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Miles de migrantes ya duermen tranquilos sabiendo que sus familias están protegidas. 
            Tú también puedes.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-cyan-600 px-10 py-4 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Conoce Nuestros Planes →
          </button>
        </section>
      </div>
    </div>
  );
};

export default QuienesSomos;
