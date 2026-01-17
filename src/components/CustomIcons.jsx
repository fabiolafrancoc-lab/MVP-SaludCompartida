'use client';

import React from 'react';

// Icono de Lightbulb (Idea/Tip) - Diseño geométrico personalizado
export const LightbulbIcon = ({ className = "w-5 h-5", color = "currentColor" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Filamento interno */}
      <path 
        d="M12 6V8M12 16V18" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="square"
      />
      
      {/* Bulbo principal */}
      <path 
        d="M9 15C7.34315 13.5 6 11.5 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9C18 11.5 16.6569 13.5 15 15" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="square" 
        strokeLinejoin="miter"
      />
      
      {/* Base del bulbo */}
      <path 
        d="M9 15H15V17H9V15Z" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="square" 
        strokeLinejoin="miter"
      />
      
      {/* Rosca */}
      <path 
        d="M10 18H14V19H10V18ZM10 19H14V20H10V19ZM11 20H13V21H11V20Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="square"
      />
      
      {/* Rayos de luz */}
      <path 
        d="M4 9H2M22 9H20M19.07 4.93L17.66 6.34M6.34 6.34L4.93 4.93M4.93 13.07L6.34 11.66M17.66 11.66L19.07 13.07" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="square"
      />
    </svg>
  );
};

// Icono de Fuego (Popular/Hot) - Diseño geométrico personalizado
export const FireIcon = ({ className = "w-5 h-5", color = "currentColor" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Llama principal */}
      <path 
        d="M12 2L14 6L16 4L17 8L19 7L18 12C18 16.4183 14.4183 20 10 20C5.58172 20 2 16.4183 2 12C2 9 3.5 6.5 6 5L8 7L10 3L12 6V2Z" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="square" 
        strokeLinejoin="miter"
        fill="none"
      />
      
      {/* Llama interna */}
      <path 
        d="M10 9L11 11L13 10L13 13C13 14.6569 11.6569 16 10 16C8.34315 16 7 14.6569 7 13C7 11.5 8 10 9 9.5L10 11V9Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="square" 
        strokeLinejoin="miter"
        fill={color}
        fillOpacity="0.3"
      />
      
      {/* Chispas */}
      <path 
        d="M20 10L21 11L20 12L19 11L20 10Z" 
        fill={color}
      />
      <path 
        d="M21 15L22 16L21 17L20 16L21 15Z" 
        fill={color}
      />
    </svg>
  );
};

// Componente Badge con icono de fuego
export const FireBadge = ({ children, className = "" }) => {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <FireIcon className="w-4 h-4" />
      {children}
    </span>
  );
};

// Componente Tip/Nota con icono de lightbulb
export const TipBadge = ({ children, className = "" }) => {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <LightbulbIcon className="w-4 h-4" />
      {children}
    </span>
  );
};
