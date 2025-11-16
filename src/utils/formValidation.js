/**
 * Utilidad centralizada para validación de formularios
 * Estilo de error consistente: borde rojo + mensaje específico debajo de cada campo
 */

/**
 * Valida un email
 */
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'El correo electrónico es requerido';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'El correo electrónico no es válido';
  }
  return null;
};

/**
 * Valida un teléfono (10 dígitos)
 */
export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return 'El número de teléfono es requerido';
  }
  const cleanPhone = phone.replace(/\s/g, '');
  if (cleanPhone.length !== 10) {
    return 'El teléfono debe tener 10 dígitos';
  }
  if (!/^\d+$/.test(cleanPhone)) {
    return 'El teléfono solo debe contener números';
  }
  return null;
};

/**
 * Valida un campo de texto requerido
 */
export const validateRequired = (value, fieldName) => {
  if (!value || !value.trim()) {
    return `${fieldName} es requerido`;
  }
  return null;
};

/**
 * Valida términos y condiciones
 */
export const validateTerms = (accepted) => {
  if (!accepted) {
    return 'Debes aceptar los términos y condiciones';
  }
  return null;
};

/**
 * Valida fecha de nacimiento
 */
export const validateBirthDate = (date) => {
  if (!date || !date.trim()) {
    return 'La fecha de nacimiento es requerida';
  }
  const birthDate = new Date(date);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  
  if (age < 0 || age > 120) {
    return 'La fecha de nacimiento no es válida';
  }
  
  return null;
};

/**
 * Clases CSS para inputs según su estado
 */
export const getInputClasses = (fieldValue, error, isOptional = false) => {
  const baseClasses = 'w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-cyan-500 transition-all';
  
  if (error) {
    return `${baseClasses} border-red-500 focus:border-red-600 bg-red-50`;
  }
  
  if (!fieldValue && isOptional) {
    return `${baseClasses} border-gray-200 bg-gray-50 text-gray-500 focus:border-cyan-500`;
  }
  
  return `${baseClasses} border-gray-200 focus:border-cyan-500`;
};

/**
 * Componente de mensaje de error
 */
export const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return (
    <div className="flex items-start gap-2 mt-2">
      <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
      <p className="text-sm text-red-600 font-medium">{error}</p>
    </div>
  );
};
