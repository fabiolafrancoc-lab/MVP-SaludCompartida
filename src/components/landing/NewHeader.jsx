/**
 * ============================================
 * HEADER COMPONENT - SaludCompartida
 * ============================================
 * 
 * ESPECIFICACIONES TÉCNICAS:
 * 
 * POSICIÓN Y DIMENSIONES:
 * - Position: fixed
 * - Top: 0
 * - Left: 0, Right: 0
 * - Z-index: 100
 * - Padding: 12px 20px
 * - Max-width contenido: 480px (centrado)
 * 
 * BACKGROUND:
 * - Color: rgba(31, 41, 55, 0.95) → gray-900 con 95% opacidad
 * - Backdrop-filter: blur(20px)
 * - Border-bottom: 1px solid rgba(6, 182, 212, 0.2) → cyan con 20% opacidad
 * 
 * LOGO:
 * - Icono: 32x32px
 * - Gap entre icono y texto: 8px
 * - Font-size texto: 16px
 * - Font-weight: 700
 * - "Salud" color: #06B6D4 (cyan)
 * - "Compartida" color: #FFFFFF (white)
 * 
 * BOTONES:
 * - Gap entre botones: 8px
 * - Padding: 8px 12px
 * - Border-radius: 8px
 * - Font-size: 11px
 * - Font-weight: 600
 * 
 * BOTÓN PRIMARIO (Contratar):
 * - Background: linear-gradient(135deg, #EC4899, #DB2777)
 * - Color: #FFFFFF
 * 
 * BOTÓN SECUNDARIO (Ya tengo Código):
 * - Background: transparent
 * - Border: 1px solid #06B6D4
 * - Color: #06B6D4
 * 
 * HOVER AMBOS BOTONES:
 * - Transform: translateY(-1px)
 * - Transition: all 0.2s ease
 * 
 * FONTS:
 * - Family: 'Plus Jakarta Sans', sans-serif
 * 
 * ============================================
 */

import React from 'react';

// Colores como constantes para fácil referencia
const COLORS = {
  cyan: '#06B6D4',
  cyanDark: '#0891B2',
  magenta: '#EC4899',
  magentaDark: '#DB2777',
  gray900: '#1F2937',
  white: '#FFFFFF',
};

const NewHeader = () => {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '12px 20px',
        background: 'rgba(31, 41, 55, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)', // Safari
        borderBottom: '1px solid rgba(6, 182, 212, 0.2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        {/* Logo */}
        <a 
          href="/" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            textDecoration: 'none',
          }}
        >
          {/* Logo Icon - SVG 32x32 */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="16"
              cy="16"
              r="14"
              stroke={COLORS.cyan}
              strokeWidth="2"
            />
            <path
              d="M16 8v8l6 4"
              stroke={COLORS.magenta}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Logo Text */}
          <span
            style={{
              fontSize: '16px',
              fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <span style={{ color: COLORS.cyan }}>Salud</span>
            <span style={{ color: COLORS.white }}>Compartida</span>
          </span>
        </a>

        {/* Buttons Container */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Primary Button - Contratar */}
          <a
            href="#subscribe"
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 600,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              textDecoration: 'none',
              background: `linear-gradient(135deg, ${COLORS.magenta}, ${COLORS.magentaDark})`,
              color: COLORS.white,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Contratar
          </a>

          {/* Secondary Button - Ya tengo Código */}
          <a
            href="#login"
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 600,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              textDecoration: 'none',
              background: 'transparent',
              border: `1px solid ${COLORS.cyan}`,
              color: COLORS.cyan,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Ya tengo Código
          </a>
        </div>
      </div>
    </header>
  );
};

export default NewHeader;


/**
 * ============================================
 * VERSIÓN TAILWIND CSS
 * ============================================
 * 
 * Si prefieres usar Tailwind, aquí está la versión equivalente:
 * 
 * <header className="fixed top-0 left-0 right-0 z-[100] px-5 py-3 bg-gray-900/95 backdrop-blur-[20px] border-b border-cyan-500/20">
 *   <div className="flex justify-between items-center max-w-[480px] mx-auto">
 *     
 *     <!-- Logo -->
 *     <a href="/" className="flex items-center gap-2 no-underline">
 *       <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
 *         <circle cx="16" cy="16" r="14" stroke="#06B6D4" strokeWidth="2"/>
 *         <path d="M16 8v8l6 4" stroke="#EC4899" strokeWidth="2" strokeLinecap="round"/>
 *       </svg>
 *       <span className="text-base font-bold">
 *         <span className="text-cyan-500">Salud</span>
 *         <span className="text-white">Compartida</span>
 *       </span>
 *     </a>
 *     
 *     <!-- Buttons -->
 *     <div className="flex gap-2">
 *       <a 
 *         href="#subscribe" 
 *         className="px-3 py-2 rounded-lg text-[11px] font-semibold bg-gradient-to-br from-pink-500 to-pink-600 text-white transition-transform hover:-translate-y-px"
 *       >
 *         Contratar
 *       </a>
 *       <a 
 *         href="#login" 
 *         className="px-3 py-2 rounded-lg text-[11px] font-semibold bg-transparent border border-cyan-500 text-cyan-500 transition-transform hover:-translate-y-px"
 *       >
 *         Ya tengo Código
 *       </a>
 *     </div>
 *     
 *   </div>
 * </header>
 * 
 * ============================================
 */
