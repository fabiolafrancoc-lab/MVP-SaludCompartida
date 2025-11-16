// src/components/blog/VotingSection.jsx

import { useState } from 'react';

export default function VotingSection() {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [otherTopic, setOtherTopic] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const votingOptions = [
    "Cómo manejar el estrés",
    "Dormir mejor",
    "Cómo ahorrar dinero en medicinas",
    "Ejercicios en casa (sin gimnasio)",
    "Cómo hablar de sexualidad con mis hijos",
    "Depresión: señales y qué hacer",
    "Cómo cuidarme si tengo diabetes",
    "Recetas económicas y nutritivas",
    "Cómo mejorar mi relación de pareja",
    "Qué hacer cuando los hijos se pelean"
  ];

  const handleToggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      if (selectedTopics.length < 3) {
        setSelectedTopics([...selectedTopics, topic]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError(false);
    
    if (selectedTopics.length === 0 && !otherTopic.trim()) {
      setError(true);
      alert('Por favor selecciona al menos un tema o escribe tu sugerencia');
      return;
    }

    const votingData = {
      timestamp: new Date().toISOString(),
      selectedTopics: selectedTopics,
      otherTopic: otherTopic,
      totalVotes: selectedTopics.length + (otherTopic ? 1 : 0)
    };

    console.log('Votos enviados:', votingData);
    
    try {
      // Enviar email via API
      const message = `
📊 VOTOS PARA NUEVOS TEMAS DE BLOG

--- Temas Seleccionados ---
${selectedTopics.length > 0 ? selectedTopics.map((topic, i) => `${i + 1}. ${topic}`).join('\n') : 'Ninguno'}

--- Sugerencia Personalizada ---
${otherTopic || 'Ninguna'}

--- Resumen ---
Total de votos: ${votingData.totalVotes}
Fecha: ${new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      `.trim();

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Usuario del Blog',
          email: 'blog@saludcompartida.com',
          message: message,
          type: 'blog-topic'
        }),
      });

      if (!response.ok) {
        console.error('Error al enviar votos');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          ¡Gracias por tu opinión!
        </h3>
        
        <p className="text-lg text-gray-600 mb-8">
          Tus sugerencias nos ayudan a crear el contenido que realmente necesitas. 
          Pronto verás artículos sobre los temas más votados.
        </p>

        <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-3">
          <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-semibold text-purple-900">
            Tu voz importa
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          ¿Qué temas te interesan más?
        </h2>
        
        <p className="text-lg text-gray-600 mb-2">
          Queremos escribir sobre lo que TÚ necesitas.
        </p>
        <p className="text-gray-600 mb-4">
          Vota por los temas que te gustaría leer.
        </p>
        <p className="text-sm font-semibold text-purple-600">
          Puedes elegir hasta 3 opciones
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Opciones de votación */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {votingOptions.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer ${
                selectedTopics.includes(option)
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedTopics.includes(option)}
                onChange={() => handleToggleTopic(option)}
                disabled={!selectedTopics.includes(option) && selectedTopics.length >= 3}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className={`ml-3 ${selectedTopics.includes(option) ? 'font-semibold text-purple-900' : 'text-gray-700'}`}>
                {option}
              </span>
            </label>
          ))}
        </div>

        {/* Campo "Otros" */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Otros temas (escribe tu sugerencia):
          </label>
          <textarea
            value={otherTopic}
            onChange={(e) => { setOtherTopic(e.target.value); setError(false); }}
            rows="3"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 resize-none ${
              error && selectedTopics.length === 0 && !otherTopic.trim() 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-300'
            }`}
            placeholder="Ejemplo: Cómo superar el duelo, Cuidar mi salud mental en el trabajo..."
          />
          {error && selectedTopics.length === 0 && !otherTopic.trim() && (
            <p className="text-red-500 text-xs mt-1">Selecciona al menos un tema o escribe una sugerencia</p>
          )}
        </div>

        {/* Contador de selecciones */}
        <div className="mb-6 text-center">
          <span className={`text-sm font-semibold ${selectedTopics.length === 3 ? 'text-purple-600' : 'text-gray-600'}`}>
            Has seleccionado {selectedTopics.length} de 3 temas
          </span>
        </div>

        {/* Botón enviar */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
        >
          Enviar mis votos
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Gracias por ayudarnos a mejorar 💚
        </p>
      </form>
    </div>
  );
}