/* ═══════════════════════════════════════════════════════════
   WHATSAPP E.164 — Shared Utility
   SaludCompartida · Reusable across all components
   
   REGLA DE NEGOCIO:
   - Migrante (EE.UU.)  → prefijo +1, 10 dígitos
   - Usuario México      → prefijo +52, 10 dígitos
   - Supabase almacena SIEMPRE en formato E.164: +1XXXXXXXXXX o +52XXXXXXXXXX
   - Meta/WATI requiere formato E.164 para no rechazar mensajes
   
   USO:
   import { WA_CONFIG, formatE164, formatDisplay, WaField } from './wa_e164';
   ═══════════════════════════════════════════════════════════ */

// ── Configuration by user type ──
export const WA_CONFIG = {
  migrant: {
    prefix: '+1',
    country: 'EE.UU.',
    flag: '🇺🇸',
    digits: 10,
    placeholder: '555 123 4567',
    format: (d) => {
      const c = d.replace(/\D/g, '');
      if (c.length <= 3) return c;
      if (c.length <= 6) return `${c.slice(0,3)} ${c.slice(3)}`;
      return `${c.slice(0,3)} ${c.slice(3,6)} ${c.slice(6,10)}`;
    },
    label: 'Ya incluye código de país EE.UU.',
  },
  mexico: {
    prefix: '+52',
    country: 'México',
    flag: '🇲🇽',
    digits: 10,
    placeholder: '55 1234 5678',
    format: (d) => {
      const c = d.replace(/\D/g, '');
      if (c.length <= 2) return c;
      if (c.length <= 6) return `${c.slice(0,2)} ${c.slice(2)}`;
      return `${c.slice(0,2)} ${c.slice(2,6)} ${c.slice(6,10)}`;
    },
    label: 'Ya incluye código de país México',
  },
};

// ── Core functions ──

/**
 * Convert raw digits to E.164 format for Supabase storage
 * @param {string} digits - Raw digits (no prefix)
 * @param {'migrant'|'mexico'} userType
 * @returns {string} E.164 format: +1XXXXXXXXXX or +52XXXXXXXXXX
 */
export const formatE164 = (digits, userType) => {
  const clean = digits.replace(/\D/g, '');
  const cfg = WA_CONFIG[userType] || WA_CONFIG.mexico;
  return `${cfg.prefix}${clean}`;
};

/**
 * Format digits for display with spaces
 * @param {string} digits - Raw digits
 * @param {'migrant'|'mexico'} userType
 * @returns {string} Formatted display: "55 1234 5678" or "555 123 4567"
 */
export const formatDisplay = (digits, userType) => {
  const cfg = WA_CONFIG[userType] || WA_CONFIG.mexico;
  return cfg.format(digits);
};

/**
 * Validate digit count
 * @param {string} digits - Raw digits
 * @param {'migrant'|'mexico'} userType
 * @returns {boolean}
 */
export const isValidWa = (digits, userType) => {
  const cfg = WA_CONFIG[userType] || WA_CONFIG.mexico;
  return digits.replace(/\D/g, '').length === cfg.digits;
};

/**
 * Parse E.164 back to raw digits (for editing existing records)
 * @param {string} e164 - Full E.164 number: +525512345678
 * @returns {{ digits: string, userType: 'migrant'|'mexico' }}
 */
export const parseE164 = (e164) => {
  if (!e164) return { digits: '', userType: 'mexico' };
  if (e164.startsWith('+1')) return { digits: e164.slice(2), userType: 'migrant' };
  if (e164.startsWith('+52')) return { digits: e164.slice(3), userType: 'mexico' };
  return { digits: e164.replace(/\D/g, ''), userType: 'mexico' };
};


/* ═══════════════════════════════════════════════════════════
   SUPABASE SCHEMA NOTES
   
   Columna: whatsapp_e164 TEXT NOT NULL
   Constraint: CHECK (whatsapp_e164 ~ '^\+\d{11,13}$')
   Index: CREATE INDEX idx_whatsapp ON members(whatsapp_e164);
   
   INSERT ejemplo:
   INSERT INTO members (nombre, apellido, whatsapp_e164)
   VALUES ('María', 'González', '+525589123456');
   
   WATI API envío:
   POST /api/v1/sendSessionMessage/{whatsapp_e164}
   (usa el campo directo, sin transformación)
   
   Meta Business API:
   El formato E.164 es el estándar:
   - +1 para EE.UU./Canadá (10 dígitos después del prefijo)
   - +52 para México (10 dígitos después del prefijo)
   - No incluir ceros iniciales
   - No incluir guiones ni espacios
   ═══════════════════════════════════════════════════════════ */
