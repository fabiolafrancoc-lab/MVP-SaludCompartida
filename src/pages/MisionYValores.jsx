import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

const MisionYValores = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <TopNav onBack={() => navigate('/page4')} hideUser={true} />

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Nuestra Visión y Misión
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Donde está tu corazón, está SaludCompartida
          </p>
        </div>

        {/* Visión */}
        <section className="bg-white rounded-3xl shadow-xl p-10 mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Visión</h2>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p className="text-2xl font-bold text-cyan-900 leading-relaxed">
              "Que ninguna familia que recibe remesas tenga que elegir entre medicinas o comida. Estamos aquí para que cuides a los tuyos desde donde estés."
            </p>
            
            <div className="mt-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-cyan-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nuestro compromiso</h3>
              <p>
                Creemos en un mundo donde la distancia no sea una barrera para el cuidado de la salud. 
                Cada migrante que trabaja incansablemente merece la tranquilidad de saber que su familia 
                está protegida, sin importar las fronteras que los separen.
              </p>
            </div>
          </div>
        </section>

        {/* Misión */}
        <section className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl shadow-xl p-10 mb-12 border-2 border-cyan-200">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Misión</h2>

          <div className="space-y-6">
            <p className="text-2xl font-bold text-cyan-900 leading-relaxed">
              "Convertimos tu esfuerzo en protección real. Por una suscripción mensual, tu familia tiene doctor cuando lo necesita, medicinas a precio justo y la tranquilidad de saber que están cuidados—aunque estés lejos."
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cómo lo hacemos realidad:</h3>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-3 text-xl">Acceso inmediato a salud de calidad</h4>
                <p className="text-gray-700">
                  Telemedicina 24/7, consultas con profesionales certificados, y recetas médicas cuando se necesitan.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-3 text-xl">Medicinas a precio justo</h4>
                <p className="text-gray-700">
                  Descuentos de hasta 75% en más de 1,700 farmacias. Porque nadie debería elegir entre curarse o comer.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-3 text-xl">Tranquilidad para ti y los tuyos</h4>
                <p className="text-gray-700">
                  Tú trabajas tranquilo sabiendo que tu familia está protegida. Ellos viven seguros sabiendo que tienen 
                  respaldo médico inmediato, sin importar la hora ni el día.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-3 text-xl">Una suscripción, múltiples beneficios</h4>
                <p className="text-gray-700">
                  Por $12 al mes, hasta 4 personas de tu familia tienen acceso completo. Sin letra chica, sin sorpresas, 
                  sin trámites complicados.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impacto Real */}
        <section className="bg-white rounded-3xl shadow-xl p-10 mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">
            El Impacto Real
          </h2>

          <div className="text-center space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              No son solo palabras. Son familias reales, con nombres y rostros, que ahora pueden dormir tranquilas 
              sabiendo que la salud de sus seres queridos está asegurada.
            </p>
            
            <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <p className="text-2xl font-bold text-gray-900 mb-4">
                Tu sacrificio + Nuestra plataforma = Familias protegidas
              </p>
              <p className="text-lg text-gray-700">
                Transformamos cada dólar que envías en cuidado médico real, en medicinas accesibles, 
                en consultas profesionales, en tranquilidad genuina.
              </p>
            </div>
          </div>
        </section>

        {/* Tagline Final */}
        <div className="text-center py-12">
          <p className="text-3xl font-black text-transparent bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text">
            Donde está tu corazón, está SaludCompartida
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MisionYValores;
