import React from 'react';

// Ícono de WhatsApp con diseño personalizado Magenta
export const WhatsAppIconMagenta = ({ className = "w-12 h-12" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fondo circular magenta con gradiente */}
      <defs>
        <linearGradient id="magentaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E91E63" />
          <stop offset="50%" stopColor="#D81B60" />
          <stop offset="100%" stopColor="#C2185B" />
        </linearGradient>
        <filter id="shadowMagenta" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Círculo exterior con sombra */}
      <circle cx="100" cy="100" r="95" fill="url(#magentaGradient)" filter="url(#shadowMagenta)"/>
      
      {/* Ícono de WhatsApp blanco */}
      <g transform="translate(100, 100)">
        {/* Teléfono de WhatsApp */}
        <path 
          d="M-40,-5 C-40,-27 -22,-45 0,-45 C22,-45 40,-27 40,-5 C40,17 22,35 0,35 C-7,35 -14,33 -20,29 L-38,35 L-32,18 C-37,12 -40,-4 -40,-5 Z" 
          fill="white"
        />
        
        {/* Auricular interno */}
        <path 
          d="M-8,-25 C-6,-25 -4,-23 -2,-21 C0,-19 0,-17 0,-15 C0,-13 -1,-12 -2,-11 L-4,-9 C-4,-7 -3,-5 -1,-3 C1,-1 3,-0.5 5,-1 L7,-2 C8,-3 9,-3 11,-3 C13,-3 15,-1 15,1 C15,3 14,5 12,6 C10,7 7,8 5,8 C-1,8 -7,5 -12,0 C-17,-5 -20,-11 -20,-17 C-20,-20 -19,-22 -17,-24 C-15,-26 -12,-25 -8,-25 Z" 
          fill="#E91E63"
          transform="scale(1.5)"
        />
      </g>
      
      {/* Marca SaludCompartida en la parte inferior */}
      <g transform="translate(100, 165)">
        <rect x="-85" y="-8" width="170" height="16" rx="8" fill="rgba(255,255,255,0.2)"/>
        <text 
          x="0" 
          y="3" 
          textAnchor="middle" 
          fill="white" 
          fontSize="11" 
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
        >
          SaludCompartida
        </text>
      </g>
    </svg>
  );
};

// Ícono de WhatsApp con diseño personalizado Cyan
export const WhatsAppIconCyan = ({ className = "w-12 h-12" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fondo circular cyan con gradiente */}
      <defs>
        <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#0891B2" />
          <stop offset="100%" stopColor="#0E7490" />
        </linearGradient>
        <filter id="shadowCyan" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Círculo exterior con sombra */}
      <circle cx="100" cy="100" r="95" fill="url(#cyanGradient)" filter="url(#shadowCyan)"/>
      
      {/* Ícono de WhatsApp blanco */}
      <g transform="translate(100, 100)">
        {/* Teléfono de WhatsApp */}
        <path 
          d="M-40,-5 C-40,-27 -22,-45 0,-45 C22,-45 40,-27 40,-5 C40,17 22,35 0,35 C-7,35 -14,33 -20,29 L-38,35 L-32,18 C-37,12 -40,-4 -40,-5 Z" 
          fill="white"
        />
        
        {/* Auricular interno */}
        <path 
          d="M-8,-25 C-6,-25 -4,-23 -2,-21 C0,-19 0,-17 0,-15 C0,-13 -1,-12 -2,-11 L-4,-9 C-4,-7 -3,-5 -1,-3 C1,-1 3,-0.5 5,-1 L7,-2 C8,-3 9,-3 11,-3 C13,-3 15,-1 15,1 C15,3 14,5 12,6 C10,7 7,8 5,8 C-1,8 -7,5 -12,0 C-17,-5 -20,-11 -20,-17 C-20,-20 -19,-22 -17,-24 C-15,-26 -12,-25 -8,-25 Z" 
          fill="#06B6D4"
          transform="scale(1.5)"
        />
      </g>
      
      {/* Marca SaludCompartida en la parte inferior */}
      <g transform="translate(100, 165)">
        <rect x="-85" y="-8" width="170" height="16" rx="8" fill="rgba(255,255,255,0.2)"/>
        <text 
          x="0" 
          y="3" 
          textAnchor="middle" 
          fill="white" 
          fontSize="11" 
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
        >
          SaludCompartida
        </text>
      </g>
    </svg>
  );
};

// Botón de WhatsApp con estilo Magenta
export const WhatsAppButtonMagenta = ({ onClick, href, children = "Chatea con Nosotros" }) => {
  const Component = href ? 'a' : 'button';
  const props = href 
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick };

  return (
    <Component
      {...props}
      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
    >
      <WhatsAppIconMagenta className="w-8 h-8" />
      <span>{children}</span>
    </Component>
  );
};

// Botón de WhatsApp con estilo Cyan
export const WhatsAppButtonCyan = ({ onClick, href, children = "Chatea con Nosotros" }) => {
  const Component = href ? 'a' : 'button';
  const props = href 
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick };

  return (
    <Component
      {...props}
      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
    >
      <WhatsAppIconCyan className="w-8 h-8" />
      <span>{children}</span>
    </Component>
  );
};

// Ícono flotante de WhatsApp (FAB - Floating Action Button)
export const WhatsAppFloatingButton = ({ href, variant = "magenta", className = "" }) => {
  const Icon = variant === "magenta" ? WhatsAppIconMagenta : WhatsAppIconCyan;
  const bgColor = variant === "magenta" 
    ? "bg-gradient-to-br from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800" 
    : "bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 ${bgColor} p-4 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all transform hover:scale-110 z-50 group ${className}`}
      aria-label="Abrir WhatsApp"
    >
      <Icon className="w-14 h-14" />
      <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
        1
      </span>
    </a>
  );
};
