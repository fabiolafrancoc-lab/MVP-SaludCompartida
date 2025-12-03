import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

const NuestrosPilares = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-pink-50 to-cyan-50">
      <TopNav onBack={() => navigate('/como-funciona')} hideUser={true} />

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Nuestros Pilares
          </h1>
        </div>

        {/* Pilar 1 */}
        <section className="bg-white rounded-3xl shadow-xl p-10 mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-6">1) Equidad al Acceso de Salud</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Atención médica de calidad para tu familia, sin importar dónde vivan o cuánto ganen
          </p>
        </section>

        {/* Pilar 2 */}
        <section className="bg-white rounded-3xl shadow-xl p-10 mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-6">2) Integración de Segmentos Desprotegidos</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Servimos a quienes el sistema ha ignorado—las familias que trabajan duro y merecen ser atendidas
          </p>
        </section>

        {/* Pilar 3 */}
        <section className="bg-white rounded-3xl shadow-xl p-10 mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-6">3) Precio Justo</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Salud accesible sin sorpresas, sin letra chiquita, sin que tengas que elegir entre comer o curarte
          </p>
        </section>

        {/* Pilar 4 */}
        <section className="bg-white rounded-3xl shadow-xl p-10 mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-6">4) Modelo Sostenible</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Un servicio sólido que estará aquí hoy, mañana y siempre que tu familia lo necesite
          </p>
        </section>

        {/* Tagline */}
        <div className="text-center py-8">
          <p className="text-2xl font-bold text-gray-900 italic">
            Donde está tu corazón, está SaludCompartida.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NuestrosPilares;
