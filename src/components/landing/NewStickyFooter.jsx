/**
 * ============================================
 * STICKY FOOTER COMPONENT - SaludCompartida
 * ============================================
 * 
 * ESPECIFICACIONES TÉCNICAS:
 * 
 * POSICIÓN Y DIMENSIONES:
 * - Position: fixed
 * - Bottom: 0
 * - Left: 0, Right: 0
 * - Z-index: 100
 * - Padding: 16px 20px
 * - Max-width contenido: 480px (centrado)
 * 
 * BACKGROUND:
 * - Color: rgba(31, 41, 55, 0.98) → gray-900 con 98% opacidad
 * - Backdrop-filter: blur(20px)
 * - Border-top: 1px solid rgba(6, 182, 212, 0.2)
 * 
 * BOTÓN PRINCIPAL (WhatsApp):
 * - Width: 100%
 * - Height: 48px
 * - Background: linear-gradient(135deg, #25D366, #128C7E)
 * - Border-radius: 12px
 * - Font-size: 14px
 * - Font-weight: 700
 * - Shadow: 0 8px 32px rgba(37, 211, 102, 0.3)
 * - Hover shadow: 0 12px 40px rgba(37, 211, 102, 0.4)
 * 
 * ICONO WHATSAPP:
 * - Size: 20x20px
 * - Gap con texto: 8px
 * 
 * FONTS:
 * - Family: 'Plus Jakarta Sans', sans-serif
 * 
 * ============================================
 */

import React from 'react';

const COLORS = {
  whatsappGreen: '#25D366',
  whatsappGreenDark: '#128C7E',
  gray900: '#1F2937',
  white: '#FFFFFF',
  cyan: '#06B6D4',
};

const NewStickyFooter = () => {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '16px 20px',
        background: 'rgba(31, 41, 55, 0.98)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)', // Safari
        borderTop: '1px solid rgba(6, 182, 212, 0.2)',
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/525599906900?text=Hola%2C%20quiero%20contratar%20SaludCompartida"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            height: '48px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 700,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            textDecoration: 'none',
            background: `linear-gradient(135deg, ${COLORS.whatsappGreen}, ${COLORS.whatsappGreenDark})`,
            color: COLORS.white,
            boxShadow: '0 8px 32px rgba(37, 211, 102, 0.3)',
            transition: 'all 0.3s ease',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(37, 211, 102, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(37, 211, 102, 0.3)';
          }}
        >
          {/* WhatsApp Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
              fill="currentColor"
            />
          </svg>

          {/* Button Text */}
          <span>Contratar por WhatsApp</span>
        </a>
      </div>
    </footer>
  );
};

export default NewStickyFooter;


/**
 * ============================================
 * VERSIÓN TAILWIND CSS
 * ============================================
 * 
 * Si prefieres usar Tailwind:
 * 
 * <footer className="fixed bottom-0 left-0 right-0 z-[100] px-5 py-4 bg-gray-900/98 backdrop-blur-[20px] border-t border-cyan-500/20">
 *   <div className="max-w-[480px] mx-auto">
 *     <a
 *       href="https://wa.me/525599906900?text=Hola%2C%20quiero%20contratar%20SaludCompartida"
 *       target="_blank"
 *       rel="noopener noreferrer"
 *       className="flex items-center justify-center gap-2 w-full h-12 rounded-xl text-sm font-bold bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-[0_8px_32px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.4)] hover:-translate-y-0.5 transition-all duration-300"
 *     >
 *       <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
 *         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967..." fill="currentColor"/>
 *       </svg>
 *       <span>Contratar por WhatsApp</span>
 *     </a>
 *   </div>
 * </footer>
 * 
 * ============================================
 */
