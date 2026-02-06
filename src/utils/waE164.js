/**
 * WhatsApp E.164 Validation & Formatting Utility
 * Maneja números telefónicos para migrant (US +1) y mexico (MX +52)
 */

export const WA_CONFIG = {
  migrant: {
    cc: '1',           // Country code
    len: 10,           // Expected digit length
    mask: '(XXX) XXX-XXXX',
    flag: '🇺🇸',
    example: '(305) 522-7150'
  },
  mexico: {
    cc: '52',
    len: 10,
    mask: 'XX XXXX XXXX',
    flag: '🇲🇽',
    example: '55 1234 5678'
  }
};

/**
 * Convierte dígitos a formato E.164 (+ccXXXXXXXXXX)
 * @param {string} digits - Solo números, sin prefijos
 * @param {string} userType - 'migrant' | 'mexico'
 * @returns {string} Número en formato E.164
 */
export function formatE164(digits, userType = 'mexico') {
  const cfg = WA_CONFIG[userType];
  if (!cfg) return null;
  
  // Limpiar todo excepto dígitos
  const clean = String(digits).replace(/\D/g, '');
  
  // Validar longitud
  if (clean.length !== cfg.len) return null;
  
  return `+${cfg.cc}${clean}`;
}

/**
 * Formatea dígitos para display UI (con máscara visual)
 * @param {string} digits - Solo números
 * @param {string} userType - 'migrant' | 'mexico'
 * @returns {string} Número formateado para mostrar
 */
export function formatDisplay(digits, userType = 'mexico') {
  const cfg = WA_CONFIG[userType];
  if (!cfg) return digits;
  
  const clean = String(digits).replace(/\D/g, '');
  if (clean.length !== cfg.len) return digits;
  
  if (userType === 'migrant') {
    // (305) 522-7150
    return `(${clean.slice(0, 3)}) ${clean.slice(3, 6)}-${clean.slice(6)}`;
  } else {
    // 55 1234 5678
    return `${clean.slice(0, 2)} ${clean.slice(2, 6)} ${clean.slice(6)}`;
  }
}

/**
 * Valida que un número sea válido para WhatsApp según userType
 * @param {string} digits - Número a validar
 * @param {string} userType - 'migrant' | 'mexico'
 * @returns {boolean} True si es válido
 */
export function isValidWa(digits, userType = 'mexico') {
  const cfg = WA_CONFIG[userType];
  if (!cfg) return false;
  
  const clean = String(digits).replace(/\D/g, '');
  return clean.length === cfg.len;
}

/**
 * Parsea un número E.164 a componentes (cc, number)
 * @param {string} e164 - Número en formato +CCXXXXXXXXXX
 * @returns {object} { cc, number, userType } o null
 */
export function parseE164(e164) {
  if (!e164 || typeof e164 !== 'string') return null;
  
  const match = e164.match(/^\+(\d{1,3})(\d+)$/);
  if (!match) return null;
  
  const [, cc, number] = match;
  
  // Detectar userType por country code
  let userType = null;
  if (cc === '1' && number.length === 10) userType = 'migrant';
  else if (cc === '52' && number.length === 10) userType = 'mexico';
  
  return { cc, number, userType };
}

/**
 * Genera link directo a WhatsApp con mensaje pre-escrito
 * @param {string} phone - Número en formato E.164 (+CCXXXXXXXXXX)
 * @param {string} message - Mensaje pre-escrito (opcional)
 * @returns {string} URL de WhatsApp
 */
export function generateWhatsAppLink(phone, message = '') {
  if (!phone) return '#';
  
  const clean = phone.replace(/\D/g, '');
  const encoded = encodeURIComponent(message);
  
  return `https://wa.me/${clean}${message ? `?text=${encoded}` : ''}`;
}
