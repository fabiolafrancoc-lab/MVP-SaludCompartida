import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Caritas SVG Personalizadas - Diseño Único Profesional
const HappyFaceIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#06B6D4" opacity="0.1"/>
    <circle cx="50" cy="50" r="40" stroke="#06B6D4" strokeWidth="3" fill="white"/>
    <circle cx="35" cy="42" r="4" fill="#06B6D4"/>
    <circle cx="65" cy="42" r="4" fill="#06B6D4"/>
    <path d="M32 58C32 58 38 68 50 68C62 68 68 58 68 58" stroke="#06B6D4" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M28 36C28 36 32 32 38 32" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M72 36C72 36 68 32 62 32" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const SmileFaceIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#10B981" opacity="0.1"/>
    <circle cx="50" cy="50" r="40" stroke="#10B981" strokeWidth="3" fill="white"/>
    <circle cx="35" cy="43" r="3.5" fill="#10B981"/>
    <circle cx="65" cy="43" r="3.5" fill="#10B981"/>
    <path d="M35 58C35 58 40 64 50 64C60 64 65 58 65 58" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const NeutralFaceIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#F59E0B" opacity="0.1"/>
    <circle cx="50" cy="50" r="40" stroke="#F59E0B" strokeWidth="3" fill="white"/>
    <circle cx="35" cy="43" r="3" fill="#F59E0B"/>
    <circle cx="65" cy="43" r="3" fill="#F59E0B"/>
    <line x1="35" y1="60" x2="65" y2="60" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const SadFaceIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#EF4444" opacity="0.1"/>
    <circle cx="50" cy="50" r="40" stroke="#EF4444" strokeWidth="3" fill="white"/>
    <circle cx="35" cy="43" r="3" fill="#EF4444"/>
    <circle cx="65" cy="43" r="3" fill="#EF4444"/>
    <path d="M35 64C35 64 40 58 50 58C60 58 65 64 65 64" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/>
    <path d="M28 38C28 38 32 42 38 42" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
    <path d="M72 38C72 38 68 42 62 42" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const VerySadFaceIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#DC2626" opacity="0.1"/>
    <circle cx="50" cy="50" r="40" stroke="#DC2626" strokeWidth="3" fill="white"/>
    <path d="M31 40L39 48M39 40L31 48" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M61 40L69 48M69 40L61 48" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M32 66C32 66 38 56 50 56C62 56 68 66 68 66" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round"/>
  </svg>
);

const Rating = () => {
  const navigate = useNavigate();
  
  // Get user data from localStorage
  let storedUserData = null;
  try {
    // Primero intentar con currentUser (nuevo sistema)
    const currentUserStored = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
    const accessUserStored = typeof window !== 'undefined' ? localStorage.getItem('accessUser') : null;
    
    if (currentUserStored) {
      storedUserData = JSON.parse(currentUserStored);
    } else if (accessUserStored) {
      storedUserData = JSON.parse(accessUserStored);
    }
  } catch (e) {
    storedUserData = null;
  }
  
  // Nombre del usuario
  const nombreUsuario = storedUserData?.firstName || "Usuario";
  
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [otroReason, setOtroReason] = useState('');
  const [showOtroInput, setShowOtroInput] = useState(false);
  const [comment, setComment] = useState('');
  const [contactInfo, setContactInfo] = useState({
    nombre: storedUserData?.firstName ? `${storedUserData.firstName} ${storedUserData.lastName || ''}`.trim() : '',
    email: storedUserData?.email || ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({});

  const reasons = {
    positive: [
      'Excelente servicio médico',
      'Rápida atención',
      'Buenos descuentos en farmacias',
      'Fácil de usar',
      'Personal amable',
      'Resolvió mi problema',
      'Otro'
    ],
    negative: [
      'Tiempos de espera largos',
      'Dificultad para usar la app',
      'Descuentos no aplicados',
      'Mala calidad de atención',
      'Problema técnico',
      'No resolvió mi problema',
      'Otro'
    ]
  };

  const handleReasonToggle = (reason) => {
    if (reason === 'Otro') {
      setShowOtroInput(!showOtroInput);
      if (showOtroInput) {
        setSelectedReasons(prev => prev.filter(r => r !== 'Otro'));
        setOtroReason('');
      } else {
        setSelectedReasons(prev => [...prev, 'Otro']);
      }
    } else {
      setSelectedReasons(prev =>
        prev.includes(reason)
          ? prev.filter(r => r !== reason)
          : [...prev, reason]
      );
    }
  };

  const handleSubmit = async () => {
    // Validar que se haya seleccionado un rating
    if (!rating || rating === 0) {
      setShowError(true);
      alert('Por favor selecciona una calificación antes de continuar. Intenta de nuevo.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Preparar el mensaje con nombre y rating (comentarios son opcionales)
      const starsText = '⭐'.repeat(rating);
      const userName = contactInfo.nombre || storedUserData?.firstName || 'Usuario Anónimo';
      const reasonsList = selectedReasons.length > 0 ? selectedReasons.join(', ') : 'No especificado';
      const otroText = (showOtroInput && otroReason) ? `\nOtro motivo: ${otroReason}` : '';
      const commentText = comment ? `\n\nComentario adicional: ${comment}` : '';
      const contactText = (rating <= 3 && contactInfo.email) 
        ? `\n\n--- Información de Contacto ---\nNombre: ${userName}\nEmail: ${contactInfo.email}` 
        : '';
      
      const fullMessage = `Calificación: ${starsText} (${rating}/5 estrellas)\n\nMotivos: ${reasonsList}${otroText}${commentText}${contactText}`;
      
      // Simular envío (no llamar API externa)
      console.log('Calificación enviada:', {
        name: userName,
        rating: rating,
        email: contactInfo.email || '',
        message: fullMessage,
        type: 'rating'
      });

      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Redirigir al dashboard después de 3 segundos
      setTimeout(() => {
        navigate('/page4');
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar tu calificación. Intenta de nuevo.');
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return rating > 0;
    if (step === 2) {
      if (selectedReasons.includes('Otro')) {
        return selectedReasons.length > 0 && otroReason.trim() !== '';
      }
      return selectedReasons.length > 0;
    }
    if (step === 3) return true; // Comentarios son opcionales
    if (step === 4 && rating <= 3) {
      // Validar nombre y email si el rating es bajo
      const newErrors = {};
      if (!contactInfo.nombre || !contactInfo.nombre.trim()) {
        newErrors.nombre = true;
      }
      if (!contactInfo.email || !contactInfo.email.trim()) {
        newErrors.email = true;
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    return true;
  };

  const StarIcon = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="transition-transform hover:scale-110 focus:outline-none"
    >
      <svg
        className={`w-12 h-12 ${filled ? 'text-yellow-400' : 'text-gray-300'} transition-colors`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  );

  const getRatingFace = (ratingValue) => {
    if (ratingValue === 5) return <HappyFaceIcon />;
    if (ratingValue === 4) return <SmileFaceIcon />;
    if (ratingValue === 3) return <NeutralFaceIcon />;
    if (ratingValue === 2) return <SadFaceIcon />;
    if (ratingValue === 1) return <VerySadFaceIcon />;
    return null;
  };

  const getRatingText = (ratingValue) => {
    if (ratingValue === 5) return '¡Excelente!';
    if (ratingValue === 4) return '¡Muy bueno!';
    if (ratingValue === 3) return 'Bueno';
    if (ratingValue === 2) return 'Regular';
    if (ratingValue === 1) return 'Necesitamos mejorar';
    return '';
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-magenta-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              ¡Gracias por tu opinión!
            </h2>
            <p className="text-gray-600 text-lg">
              Tu feedback nos ayuda a mejorar cada día
            </p>
          </div>
          
          <div className="bg-cyan-50 rounded-2xl p-6 mb-6">
            <div className="w-20 h-20 mx-auto mb-4">
              {getRatingFace(rating)}
            </div>
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-8 h-8 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 font-medium">
              Calificación: {rating} de 5 estrellas
            </p>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Redirigiendo en 3 segundos...
          </p>

          <button
            onClick={() => navigate('/page4')}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-magenta-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <img 
              src="/saludcompartida logo WT.png" 
              alt="SaludCompartida" 
              className="h-16"
            />
            <button
              onClick={() => navigate('/page4')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-semibold transition-colors text-lg"
            >
              Volver
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, ...(rating <= 3 ? [4] : [])].map((s, index) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  s <= step ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {s}
                </div>
                <span className="text-xs mt-2 text-gray-600">
                  {s === 1 && 'Calificar'}
                  {s === 2 && 'Razones'}
                  {s === 3 && 'Comentario'}
                  {s === 4 && 'Contacto'}
                </span>
              </div>
              {index < (rating <= 3 ? 3 : 2) && (
                <div className={`flex-1 h-1 mx-2 rounded transition-colors ${
                  s < step ? 'bg-cyan-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Step 1: Rating */}
          {step === 1 && (
            <div className="text-center">
              {/* Mensaje inspirador con energía y felicidad */}
              <div className="mb-8 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border-2 border-orange-200">
                <p className="text-xl font-bold text-orange-600 mb-3">
                  {nombreUsuario}, ayúdanos a mejorar, ¡solo tomará dos minutos!
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Para el equipo de SaludCompartida es vital; nos permite mejorar, atendiéndote mejor y llegar a más familias mexicanas. <span className="font-semibold text-orange-600">Ayúdanos a ser mejores.</span>
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                ¿Cómo fue tu experiencia?
              </h2>
              <p className="text-cyan-600 text-lg font-semibold mb-8">
                Tu opinión nos ayuda a ser mejores
              </p>
              
              <div className="flex justify-center gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    filled={star <= (hoverRating || rating)}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
              </div>

              {rating > 0 && (
                <div className="bg-cyan-50 rounded-2xl p-6 mb-6">
                  <div className="w-24 h-24 mx-auto mb-4">
                    {getRatingFace(rating)}
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {getRatingText(rating)}
                  </p>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-cyan-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Continuar
              </button>
            </div>
          )}

          {/* Step 2: Reasons */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                ¿Qué influyó en tu calificación?
              </h2>
              <p className="text-cyan-600 font-semibold mb-6">
                Comparte tu experiencia con SaludCompartida
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {(rating >= 4 ? reasons.positive : reasons.negative).map((reason) => (
                  <button
                    key={reason}
                    onClick={() => handleReasonToggle(reason)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedReasons.includes(reason)
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selectedReasons.includes(reason)
                          ? 'bg-cyan-500 border-cyan-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedReasons.includes(reason) && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium text-gray-700">{reason}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Campo de texto para "Otro" */}
              {showOtroInput && (
                <div className="mb-6 animate-fadeIn">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cuéntanos más sobre tu experiencia
                  </label>
                  <textarea
                    value={otroReason}
                    onChange={(e) => setOtroReason(e.target.value)}
                    rows={3}
                    placeholder="Escribe aquí tu opinión..."
                    className="w-full px-4 py-3 border-2 border-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceed()}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Comment */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                ¿Algo más que quieras compartir?
              </h2>
              <p className="text-gray-600 mb-6">
                Tus comentarios son muy valiosos (opcional)
              </p>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={6}
                placeholder="Cuéntanos más sobre tu experiencia..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none mb-6"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={() => {
                    if (rating <= 3) {
                      setStep(4);
                    } else {
                      handleSubmit();
                    }
                  }}
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Enviando...' : (rating <= 3 ? 'Continuar' : 'Enviar')}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Contact Info (only for low ratings) */}
          {step === 4 && rating <= 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Queremos resolverlo
              </h2>
              <p className="text-gray-600 mb-6">
                Déjanos tus datos para darte seguimiento personalizado
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactInfo.nombre}
                    onChange={(e) => {
                      setContactInfo(prev => ({ ...prev, nombre: e.target.value }));
                      setErrors(prev => ({ ...prev, nombre: false }));
                    }}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-cyan-500 transition-all ${
                      errors.nombre ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-cyan-500'
                    }`}
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Este campo es obligatorio
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => {
                      setContactInfo(prev => ({ ...prev, email: e.target.value }));
                      setErrors(prev => ({ ...prev, email: false }));
                    }}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-cyan-500 transition-all ${
                      errors.email ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-cyan-500'
                    }`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Este campo es obligatorio
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={() => {
                    if (canProceed()) {
                      handleSubmit();
                    } else {
                      alert('Por favor completa todos los campos requeridos. Intenta de nuevo.');
                    }
                  }}
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </div>
          )}

          {/* Consultas Button */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/contact');
              }}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ¿Tienes Consultas?
            </button>
          </div>
        </div>
      </div>



      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Rating;