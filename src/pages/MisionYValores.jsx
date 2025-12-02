import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

const MisionYValores = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-pink-50 to-cyan-50">
      <TopNav onBack={() => navigate('/page4')} hideUser={true} />

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Visión y Misión
          </h1>
        </div>

        {/* Visión */}
        <section className="bg-white rounded-3xl shadow-xl p-10 mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-8">VISIÓN</h2>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p className="text-xl font-semibold text-gray-900">
              "Que ninguna familia que recibe remesas tenga que elegir entre medicinas o comida. Estamos aquí para que cuides a los tuyos desde donde estés."
            </p>
          </div>
        </section>

        {/* Misión */}
        <section className="bg-white rounded-3xl shadow-xl p-10 mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-8">MISIÓN</h2>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p className="text-xl font-semibold text-gray-900">
              "Convertimos tu esfuerzo en protección real. Por una suscripción mensual, tu familia tiene doctor cuando lo necesita, medicinas a precio justo y la tranquilidad de saber que están cuidados—aunque estés lejos."
            </p>
          </div>
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

export default MisionYValores;
