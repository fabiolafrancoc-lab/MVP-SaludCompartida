import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import { HeartIcon, ShieldIcon, FamilyIcon } from '../components/icons/CustomIcons';

const QuienesSomos = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <TopNav onBack={() => navigate('/page4')} hideUser={true} />

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Quiénes Somos
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            La primera plataforma de salud que transforma remesas en cuidado médico real
          </p>
        </div>

        {/* Nuestra Historia */}
        <section className="bg-white rounded-3xl shadow-xl p-10 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <HeartIcon className="w-16 h-16" />
            <h2 className="text-3xl font-black text-gray-900">¿Quiénes Somos?</h2>
          </div>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              <strong>SaludCompartida es la primera plataforma de salud transfronteriza</strong> que convierte los $64.7 mil millones 
              en remesas anuales en acceso real a atención médica para millones de familias en México, Centroamérica, Latinoamérica e India.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Un puente de salud entre dos mundos</h3>
            
            <p>
              Entendemos la realidad del migrante: tu cuerpo está aquí, pero tu corazón nunca dejó casa. Trabajas dos turnos, 
              envías dinero cada mes, pero cuando tu mamá se enferma a las 3 AM o tu hijo tiene fiebre de 40 grados, el dinero 
              no es suficiente. <strong>La distancia duele. La impotencia pesa más que cualquier jornada laboral.</strong>
            </p>

            <p>
              Por eso creamos SaludCompartida: <strong>para que cada dólar que envías se convierta en protección real para quienes más amas.</strong>
            </p>
          </div>
        </section>

        {/* Qué Ofrecemos */}
        <section className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl shadow-xl p-10 mb-12 border-2 border-cyan-200">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Qué ofrecemos</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Con una suscripción mensual de solo <strong className="text-cyan-600 text-2xl">$12</strong> le das a tu familia 
            (hasta 4 personas) acceso inmediato a:
          </p>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-3">
                <span className="text-2xl">📱</span> Telemedicina ilimitada 24/7
              </h3>
              <p className="text-gray-700">
                Consultas médicas desde cualquier lugar, cualquier hora por Videollamada (WhatsApp) y recetas médicas en caso de ser necesario.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-3">
                <span className="text-2xl">💊</span> Descuentos en Farmacias de Medicamentos y todos los otros productos
              </h3>
              <p className="text-gray-700">
                En más de 1,700 farmacias.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-3 text-xl flex items-center gap-3">
                <span className="text-2xl">⚡</span> Activación instantánea en 30 segundos
              </h3>
              <p className="text-gray-700">
                Vía WhatsApp, sin complicaciones, sin esperas
              </p>
            </div>
          </div>
        </section>

        {/* Servimos a quienes otros ignoran */}
        <section className="bg-white rounded-3xl shadow-xl p-10 mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">
            Servimos a quienes otros ignoran
          </h2>

          <div className="text-center space-y-6">
            <p className="text-2xl font-bold text-gray-900">
              54 millones de mexicanos no tienen acceso a servicios de salud.
            </p>
            <p className="text-xl text-gray-700">
              Nosotros no competimos con ellos. <strong className="text-cyan-600">Servimos a quienes ellos se niegan a ver.</strong>
            </p>
          </div>
        </section>

        {/* Nuestra Misión */}
        <section className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl shadow-xl p-10 mb-12 border-2 border-cyan-200">
          <div className="flex items-center gap-4 mb-8">
            <ShieldIcon className="w-16 h-16" />
            <h2 className="text-3xl font-black text-gray-900">Misión</h2>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Nuestra misión es <strong className="text-cyan-900">democratizar el acceso a servicios de salud de calidad</strong> mediante 
              una plataforma tecnológica transfronteriza que permite a los migrantes en Estados Unidos proveer protección médica inmediata, 
              accesible y digna a sus familias en México, Centroamérica, Latinoamérica e India.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Lo que esto significa:</h3>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-3 text-xl">Para el migrante que envía:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Transformar su sacrificio en protección tangible</li>
                  <li>Convertir la distancia en cuidado efectivo</li>
                  <li>Ofrecer paz mental sabiendo que hay respaldo 24/7</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-3 text-xl">Para la familia que recibe:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Acceso inmediato a telemedicina sin esperas de meses</li>
                  <li>Medicamentos hasta 75% más baratos</li>
                  <li>Atención médica digna sin verificación de empleo</li>
                  <li>Activación en 30 segundos vía WhatsApp</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-3 text-xl">Para la sociedad:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Servir a los 54 millones que el sistema tradicional ignora</li>
                  <li>Hacer de la salud un derecho, no un privilegio</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestros Valores */}
        <section className="bg-white rounded-3xl shadow-xl p-10 mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
            Nuestros Valores
          </h2>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-cyan-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dignidad Inclusiva</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Creemos que <strong>la salud no debe depender de tu estatus migratorio, tu historial laboral o tu código postal.</strong> 
                El 40% de los mexicanos que otros sistemas ignoran son nuestra prioridad. No competimos con hospitales o aseguradoras 
                tradicionales; servimos a quienes ellos rechazan sistemáticamente.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🌉 Conexión Transfronteriza</h3>
                <p className="text-gray-700">
                  La distancia física no debe significar abandono emocional. Transformamos las remesas en puentes de cuidado.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">⚡ Acceso Inmediato</h3>
                <p className="text-gray-700">
                  Cuando tu mamá tiene dolor de pecho a las 3 AM, esperar 30 días no es una opción. Activación en 30 segundos.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💰 Transparencia Total</h3>
                <p className="text-gray-700">
                  $12/mes. Sin letra chica. Sin cargos ocultos. Sin "solo por hoy". Lo que ves es lo que pagas.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6 border-2 border-pink-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🤝 Empatía Genuina</h3>
                <p className="text-gray-700">
                  Entendemos la culpa, el miedo, el sacrificio. Porque nosotros también hemos vivido la migración.
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
