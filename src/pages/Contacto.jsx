import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import { LightbulbIcon } from '../components/CustomIcons';

const Contacto = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'consulta-general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const emailBody = `
📬 NUEVO MENSAJE DE CONTACTO

--- INFORMACIÓN DEL CONTACTO ---
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone || 'No proporcionado'}
Asunto: ${formData.subject}

--- MENSAJE ---
${formData.message}

--- FECHA ---
${new Date().toLocaleDateString('es-MX', { 
  weekday: 'long', 
  day: 'numeric', 
  month: 'long', 
  year: 'numeric', 
  hour: '2-digit', 
  minute: '2-digit' 
})}
      `.trim();

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: emailBody,
          type: formData.subject,
          to: 'contacto@saludcompartida.com'
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'consulta-general',
          message: ''
        });
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitError('Hubo un error al enviar tu mensaje. Por favor intenta de nuevo o contáctanos directamente por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const whatsappNumber = '5215512345678'; // Reemplazar con número real
  const whatsappMessage = encodeURIComponent('Hola, me gustaría obtener más información sobre SaludCompartida.');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <TopNav internalPage={true} showMenu={true} />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Envíanos un Mensaje</h2>

            {submitSuccess && (
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 mb-6 flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-bold text-green-900">¡Mensaje enviado!</p>
                  <p className="text-sm text-green-700">Te responderemos en menos de 24 horas.</p>
                </div>
              </div>
            )}

            {submitError && (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-6 flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-700">{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tu Nombre *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="María García"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tu Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="maria@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tu Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 555 123 4567"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Asunto *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                >
                  <option value="consulta-general">Consulta General</option>
                  <option value="informacion-planes">Información sobre Planes</option>
                  <option value="soporte-tecnico">Soporte Técnico</option>
                  <option value="cancelacion">Cancelación</option>
                  <option value="sugerencia">Sugerencia</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tu Mensaje *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-6">
            {/* WhatsApp */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl p-8 border-2 border-green-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">WhatsApp</h3>
                  <p className="text-green-700 font-semibold">Respuesta inmediata</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                La forma más rápida de contactarnos. Te respondemos en minutos.
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 text-white text-center py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Abrir WhatsApp →
              </a>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl shadow-xl p-8 border-2 border-cyan-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Email</h3>
                  <p className="text-cyan-700 font-semibold">24-48 horas</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Envíanos un correo y te responderemos en menos de 24 horas.
              </p>

              <a
                href="mailto:contacto@saludcompartida.com"
                className="text-cyan-600 font-bold text-lg hover:text-cyan-700 transition-colors"
              >
                contacto@saludcompartida.com
              </a>
            </div>

            {/* Horarios */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Horarios de Atención</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">WhatsApp</span>
                  <span className="text-gray-900 font-bold">24/7</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Email</span>
                  <span className="text-gray-900 font-bold">24/7</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="font-semibold text-gray-700">Respuesta</span>
                  <span className="text-gray-900 font-bold">{"<"} 24h</span>
                </div>
              </div>

              <div className="mt-6 bg-cyan-50 border border-cyan-200 rounded-xl p-4">
                <p className="text-sm text-cyan-900 flex items-center gap-2">
                  <LightbulbIcon className="w-5 h-5 text-cyan-700 flex-shrink-0" />
                  <span><strong>Tip:</strong> Para respuesta más rápida, usa WhatsApp. Revisamos mensajes constantemente.</span>
                </p>
              </div>
            </div>

            {/* Preguntas Frecuentes */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 border-2 border-purple-200">
              <h3 className="text-2xl font-black text-gray-900 mb-4">¿Tienes Dudas?</h3>
              <p className="text-gray-700 mb-6">
                Muchas de tus preguntas probablemente ya están respondidas en nuestras páginas.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/beneficios')}
                  className="w-full bg-white text-left px-4 py-3 rounded-xl font-semibold text-gray-700 hover:bg-purple-100 transition-all shadow"
                >
                  📋 Ver Beneficios Detallados →
                </button>
                <button
                  onClick={() => navigate('/quienes-somos')}
                  className="w-full bg-white text-left px-4 py-3 rounded-xl font-semibold text-gray-700 hover:bg-purple-100 transition-all shadow"
                >
                  👥 Conocer Quiénes Somos →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
