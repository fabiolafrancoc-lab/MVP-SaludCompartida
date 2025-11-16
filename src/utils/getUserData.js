/**
 * Función centralizada para obtener datos del usuario desde localStorage
 * Busca primero en 'currentUser' (nuevo sistema), luego en 'accessUser' (legacy)
 * @returns {Object|null} Datos del usuario o null si no existe
 */
export const getUserData = () => {
  try {
    // Primero intentar con currentUser (nuevo sistema)
    const currentUserData = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
    if (currentUserData) {
      return JSON.parse(currentUserData);
    }
    
    // Fallback a accessUser (sistema anterior)
    const accessUserData = typeof window !== 'undefined' ? localStorage.getItem('accessUser') : null;
    if (accessUserData) {
      return JSON.parse(accessUserData);
    }
    
    return null;
  } catch (error) {
    console.error('Error obteniendo datos del usuario:', error);
    return null;
  }
};

/**
 * Obtiene un campo específico del usuario con valor por defecto
 * @param {string} field - Campo a obtener (firstName, lastName, etc.)
 * @param {string} defaultValue - Valor por defecto si no existe
 * @returns {string} Valor del campo o valor por defecto
 */
export const getUserField = (field, defaultValue = '') => {
  const userData = getUserData();
  return userData?.[field] || defaultValue;
};
