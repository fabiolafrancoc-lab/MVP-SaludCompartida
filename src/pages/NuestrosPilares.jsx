import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

const NuestrosPilares = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <TopNav onBack={() => navigate('/page4')} hideUser={true} />

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Nuestros Pilares
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Los valores fundamentales que guían cada decisión que tomamos
          </p>
        </div>

        {/* Pilar 1: Equidad al Acceso de Salud */}
        <section className="bg-white rounded-3xl shadow-xl p-10 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-black">
              1
            </div>
            <h2 className="text-3xl font-black text-gray-900">Equidad al Acceso de Salud</h2>
          </div>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p className="text-xl font-bold text-cyan-900">
              Atención médica de calidad para tu familia, sin importar dónde vivan o cuánto ganen
            </p>
            
            <p>
              La salud no debería ser un privilegio reservado para unos pocos. Creemos que cada persona, 
              sin importar su código postal, su historial laboral o su estatus migratorio, merece acceso 
              a atención médica profesional y de calidad.
            </p>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200">
              <h3 className="font-bold text-gray-900 mb-3">En la práctica, esto significa:</h3>
              <ul className="space-y-2">
                <li>✓ Telemedicina 24/7 sin restricciones geográficas</li>
                <li>✓ Sin periodos de espera ni requisitos de empleo</li>
                <li>✓ Mismo nivel de atención para todos los miembros</li>
                <li>✓ Profesionales certificados que atienden con dignidad y respeto</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pilar 2: Integración de Segmentos Desprotegidos */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl p-10 mb-12 border-2 border-purple-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-black">
              2
            </div>
            <h2 className="text-3xl font-black text-gray-900">Integración de Segmentos Desprotegidos</h2>
          </div>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p className="text-xl font-bold text-purple-900">
              Servimos a quienes el sistema ha ignorado—las familias que trabajan duro y merecen ser atendidas
            </p>
            
            <p>
              54 millones de mexicanos no tienen acceso a servicios de salud. Nosotros no competimos con el sistema 
              tradicional—<strong>servimos a quienes ellos se niegan a ver</strong>. Las familias que reciben remesas, 
              que trabajan en la economía informal, que han sido sistemáticamente excluidas.
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-3">Nuestro enfoque:</h3>
              <ul className="space-y-2">
                <li>✓ Diseñado específicamente para familias de migrantes</li>
                <li>✓ Sin verificación de empleo ni historial crediticio</li>
                <li>✓ Activación instantánea vía WhatsApp</li>
                <li>✓ Soporte en español con empatía cultural</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pilar 3: Precio Justo */}
        <section className="bg-white rounded-3xl shadow-xl p-10 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-black">
              3
            </div>
            <h2 className="text-3xl font-black text-gray-900">Precio Justo</h2>
          </div>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p className="text-xl font-bold text-green-900">
              Salud accesible sin sorpresas, sin letra chiquita, sin que tengas que elegir entre comer o curarte
            </p>
            
            <p>
              $12 al mes. Punto. Sin cargos ocultos, sin aumentos sorpresa, sin "solo por hoy". 
              Un precio que respeta tu esfuerzo y que realmente puedes pagar sin sacrificar otras necesidades básicas.
            </p>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
              <h3 className="font-bold text-gray-900 mb-3">Transparencia total:</h3>
              <ul className="space-y-2">
                <li>✓ $12/mes para hasta 4 personas</li>
                <li>✓ Sin cobros adicionales por consultas</li>
                <li>✓ Sin letra chica ni exclusiones ocultas</li>
                <li>✓ Cancela cuando quieras, sin penalizaciones</li>
                <li>✓ Descuentos reales en farmacias (hasta 75%)</li>
              </ul>
            </div>

            <p className="text-center text-xl font-bold text-gray-900 mt-8">
              Lo que ves es lo que pagas. Así de simple.
            </p>
          </div>
        </section>

        {/* Pilar 4: Modelo Sostenible */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-xl p-10 mb-12 border-2 border-amber-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-black">
              4
            </div>
            <h2 className="text-3xl font-black text-gray-900">Modelo Sostenible</h2>
          </div>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p className="text-xl font-bold text-amber-900">
              Un servicio sólido que estará aquí hoy, mañana y siempre que tu familia lo necesite
            </p>
            
            <p>
              No somos una promesa temporal ni un experimento. Hemos construido un modelo de negocio sostenible 
              que nos permite mantener precios justos mientras proporcionamos servicios de calidad a largo plazo.
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-3">Sostenibilidad significa:</h3>
              <ul className="space-y-2">
                <li>✓ Alianzas estratégicas con red de 1,700+ farmacias</li>
                <li>✓ Tecnología propia que reduce costos operativos</li>
                <li>✓ Escala regional (México, Centroamérica, Latinoamérica, India)</li>
                <li>✓ Modelo de suscripción predecible y escalable</li>
                <li>✓ Compromiso a largo plazo con nuestras familias</li>
              </ul>
            </div>

            <p className="text-center text-xl font-bold text-gray-900 mt-8">
              Construido para durar. Diseñado para crecer contigo.
            </p>
          </div>
        </section>

        {/* Conclusión */}
        <section className="bg-gradient-to-br from-cyan-500 to-pink-500 rounded-3xl shadow-2xl p-10 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Estos Pilares nos Definen
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            No son solo valores en una página. Son los principios que guían cada decisión que tomamos, 
            cada característica que desarrollamos, cada familia que servimos.
          </p>
          <p className="text-2xl font-bold">
            Donde está tu corazón, está SaludCompartida
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default NuestrosPilares;
