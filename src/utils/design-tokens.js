/**
 * ============================================
 * DESIGN TOKENS - SaludCompartida
 * ============================================
 * 
 * Archivo central con todas las constantes de diseño
 * para mantener consistencia en todos los componentes.
 * 
 * ============================================
 */

// ============================================
// COLORES
// ============================================

export const COLORS = {
  // Primarios
  cyan: '#06B6D4',
  cyanDark: '#0891B2',
  magenta: '#EC4899',
  magentaDark: '#DB2777',
  
  // Neutrales
  gray900: '#1F2937',
  gray800: '#374151',
  gray700: '#4B5563',
  gray100: '#F3F4F6',
  white: '#FFFFFF',
  
  // Acentos
  gold: '#F59E0B',
  green: '#10B981',
  purple: '#9333EA',
  
  // WhatsApp
  whatsappGreen: '#25D366',
  whatsappGreenDark: '#128C7E',
};

// ============================================
// GRADIENTES
// ============================================

export const GRADIENTS = {
  // Botones y CTAs
  magentaButton: 'linear-gradient(135deg, #EC4899, #DB2777)',
  cyanButton: 'linear-gradient(135deg, #06B6D4, #0891B2)',
  
  // Avatars de compañeras
  lupita: 'linear-gradient(135deg, #EC4899, #9333EA)',
  fernanda: 'linear-gradient(135deg, #06B6D4, #0891B2)',
  
  // Backgrounds
  heroGlow: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 60%)',
  heroGlowMagenta: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 60%)',
  
  // Texto con gradiente
  textGradient: 'linear-gradient(135deg, #06B6D4, #EC4899)',
  
  // WhatsApp
  whatsapp: 'linear-gradient(135deg, #25D366, #128C7E)',
};

// ============================================
// TIPOGRAFÍA
// ============================================

export const FONTS = {
  // Familias
  primary: "'Plus Jakarta Sans', sans-serif",
  display: "'DM Serif Display', serif",
  
  // Tamaños
  sizes: {
    xs: '11px',
    sm: '12px',
    base: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
    '5xl': '36px',
    '6xl': '40px',
    '7xl': '48px',
  },
  
  // Pesos
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
};

// ============================================
// ESPACIADO
// ============================================

export const SPACING = {
  // Padding general
  pagePadding: '20px',
  
  // Gaps
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '28px',
  '4xl': '32px',
  '5xl': '40px',
  '6xl': '48px',
};

// ============================================
// BORDES Y RADIOS
// ============================================

export const BORDERS = {
  // Border radius
  radius: {
    sm: '8px',
    md: '10px',
    lg: '12px',
    xl: '14px',
    '2xl': '16px',
    '3xl': '20px',
    full: '9999px',
  },
  
  // Border colors con opacidad
  cyanSubtle: 'rgba(6, 182, 212, 0.2)',
  cyanMedium: 'rgba(6, 182, 212, 0.3)',
  magentaSubtle: 'rgba(236, 72, 153, 0.2)',
  magentaMedium: 'rgba(236, 72, 153, 0.3)',
  whiteSubtle: 'rgba(255, 255, 255, 0.1)',
};

// ============================================
// SOMBRAS
// ============================================

export const SHADOWS = {
  // Botones
  magentaButton: '0 8px 32px rgba(236, 72, 153, 0.3)',
  magentaButtonHover: '0 12px 40px rgba(236, 72, 153, 0.4)',
  cyanButton: '0 8px 32px rgba(6, 182, 212, 0.3)',
  cyanButtonHover: '0 12px 40px rgba(6, 182, 212, 0.4)',
};

// ============================================
// BACKGROUNDS CON OPACIDAD
// ============================================

export const BACKGROUNDS = {
  // Headers/Footers
  headerBg: 'rgba(31, 41, 55, 0.95)',
  footerBg: 'rgba(31, 41, 55, 0.98)',
  
  // Cards
  cardSubtle: 'rgba(255, 255, 255, 0.05)',
  cyanSubtle: 'rgba(6, 182, 212, 0.1)',
  cyanMedium: 'rgba(6, 182, 212, 0.12)',
  magentaSubtle: 'rgba(236, 72, 153, 0.1)',
  magentaMedium: 'rgba(236, 72, 153, 0.15)',
};

// ============================================
// TRANSICIONES
// ============================================

export const TRANSITIONS = {
  fast: 'all 0.2s ease',
  medium: 'all 0.3s ease',
  slow: 'all 0.5s ease',
  transform: 'transform 0.3s ease',
};

// ============================================
// BREAKPOINTS
// ============================================

export const BREAKPOINTS = {
  mobile: '480px',  // Max-width para contenido móvil
  tablet: '768px',
  desktop: '1024px',
};

// ============================================
// Z-INDEX
// ============================================

export const Z_INDEX = {
  base: 1,
  dropdown: 50,
  sticky: 100,
  modal: 200,
  toast: 300,
};

// ============================================
// TEXTOS CON OPACIDAD
// ============================================

export const TEXT_OPACITY = {
  primary: 'rgba(255, 255, 255, 1)',
  secondary: 'rgba(255, 255, 255, 0.85)',
  tertiary: 'rgba(255, 255, 255, 0.7)',
  muted: 'rgba(255, 255, 255, 0.6)',
  subtle: 'rgba(255, 255, 255, 0.5)',
};

// ============================================
// EXPORT DEFAULT
// ============================================

const designTokens = {
  COLORS,
  GRADIENTS,
  FONTS,
  SPACING,
  BORDERS,
  SHADOWS,
  BACKGROUNDS,
  TRANSITIONS,
  BREAKPOINTS,
  Z_INDEX,
  TEXT_OPACITY,
};

export default designTokens;
