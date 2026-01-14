/**
 * WhatsApp Helper Functions
 * Manejo de códigos de país y formatos de número para WhatsApp API
 */

/**
 * Construye el número completo de WhatsApp con código de país
 * @param {Object} user - Usuario o dependiente
 * @param {string} user.phone - Número de teléfono (10 dígitos)
 * @param {string} user.country_code - Código de país (solo para usuarios principales)
 * @param {boolean} user.is_dependent - Si es dependiente o no
 * @returns {string} - Número completo ej: "+525512345678" o "+13055551234"
 */
export function buildWhatsAppNumber(user) {
  if (!user.phone) {
    throw new Error('Número de teléfono es requerido');
  }

  // Limpiar el número (solo dígitos)
  const cleanPhone = user.phone.replace(/\D/g, '');

  // Validar que tenga 10 dígitos
  if (cleanPhone.length !== 10) {
    throw new Error(`Número de teléfono debe tener 10 dígitos, tiene ${cleanPhone.length}`);
  }

  // Si es dependiente, siempre usar +52 (México)
  if (user.is_dependent) {
    return `+52${cleanPhone}`;
  }

  // Si es usuario principal, usar su country_code
  const countryCode = user.country_code || '+52'; // Default a México
  
  // Validar código de país
  if (countryCode !== '+1' && countryCode !== '+52') {
    throw new Error(`Código de país inválido: ${countryCode}. Debe ser +1 o +52`);
  }

  return `${countryCode}${cleanPhone}`;
}

/**
 * Valida formato de número de WhatsApp
 * @param {string} fullNumber - Número completo con código de país
 * @returns {boolean}
 */
export function isValidWhatsAppNumber(fullNumber) {
  if (!fullNumber) return false;

  // Formato: +1 seguido de 10 dígitos (USA)
  const usaFormat = /^\+1\d{10}$/;
  
  // Formato: +52 seguido de 10 dígitos (México)
  const mexFormat = /^\+52\d{10}$/;

  return usaFormat.test(fullNumber) || mexFormat.test(fullNumber);
}

/**
 * Parsea número completo a componentes
 * @param {string} fullNumber - Número completo ej: "+525512345678"
 * @returns {Object|null} - {countryCode: "+52", phone: "5512345678"} o null si inválido
 */
export function parseWhatsAppNumber(fullNumber) {
  if (!fullNumber) return null;

  // Limpiar prefijo whatsapp: si existe
  const cleaned = fullNumber.replace('whatsapp:', '').trim();

  // Intentar match con USA (+1 + 10 dígitos)
  const usaMatch = cleaned.match(/^(\+1)(\d{10})$/);
  if (usaMatch) {
    return {
      countryCode: usaMatch[1],
      phone: usaMatch[2],
      country: 'USA'
    };
  }

  // Intentar match con México (+52 + 10 dígitos)
  const mexMatch = cleaned.match(/^(\+52)(\d{10})$/);
  if (mexMatch) {
    return {
      countryCode: mexMatch[1],
      phone: mexMatch[2],
      country: 'México'
    };
  }

  return null;
}

/**
 * Formatea número para Twilio WhatsApp API
 * @param {string} fullNumber - Número completo ej: "+525512345678"
 * @returns {string} - Número con prefijo whatsapp: ej: "whatsapp:+525512345678"
 */
export function formatForTwilio(fullNumber) {
  if (!fullNumber) {
    throw new Error('Número completo es requerido');
  }

  // Si ya tiene el prefijo, no hacer nada
  if (fullNumber.startsWith('whatsapp:')) {
    return fullNumber;
  }

  // Validar formato
  if (!isValidWhatsAppNumber(fullNumber)) {
    throw new Error(`Formato de número inválido: ${fullNumber}`);
  }

  return `whatsapp:${fullNumber}`;
}

/**
 * Obtiene el país desde el código de país
 * @param {string} countryCode - Código de país ej: "+52"
 * @returns {string} - Nombre del país o 'Desconocido'
 */
export function getCountryName(countryCode) {
  const countries = {
    '+1': 'USA',
    '+52': 'México'
  };
  return countries[countryCode] || 'Desconocido';
}

/**
 * Detecta el tipo de usuario desde el número
 * @param {string} fullNumber - Número completo
 * @returns {Object} - {type: 'migrant-usa'|'migrant-mexico'|'dependent', countryCode: string}
 */
export function detectUserType(fullNumber) {
  const parsed = parseWhatsAppNumber(fullNumber);
  
  if (!parsed) {
    return { type: 'unknown', countryCode: null };
  }

  if (parsed.countryCode === '+1') {
    return { type: 'migrant-usa', countryCode: '+1' };
  }

  // +52 puede ser migrante en México o dependiente
  // La distinción se hace en la DB
  return { type: 'migrant-mexico-or-dependent', countryCode: '+52' };
}

/**
 * Formatea número para display en UI
 * @param {string} phone - Número de 10 dígitos
 * @returns {string} - Formateado como "XXX XXX XXXX"
 */
export function formatPhoneDisplay(phone) {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
}

/**
 * Construye objeto de contacto completo para WhatsApp
 * @param {Object} user - Usuario de la DB
 * @returns {Object} - Objeto con toda la info necesaria para enviar mensaje
 */
export function buildContactObject(user) {
  const isDependent = user.user_access_code ? true : false; // Si tiene user_access_code, es dependiente
  
  const fullNumber = buildWhatsAppNumber({
    phone: user.phone,
    country_code: user.country_code,
    is_dependent: isDependent
  });

  return {
    id: isDependent ? user.id : user.access_code,
    type: isDependent ? 'dependent' : 'user',
    name: `${user.first_name} ${user.last_name}`,
    phone: fullNumber,
    twilioFormat: formatForTwilio(fullNumber),
    countryCode: isDependent ? '+52' : user.country_code,
    country: getCountryName(isDependent ? '+52' : user.country_code),
    isDependent: isDependent,
    userAccessCode: isDependent ? user.user_access_code : user.access_code
  };
}

export default {
  buildWhatsAppNumber,
  isValidWhatsAppNumber,
  parseWhatsAppNumber,
  formatForTwilio,
  getCountryName,
  detectUserType,
  formatPhoneDisplay,
  buildContactObject
};
