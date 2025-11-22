import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDemoTourInfo } from '../lib/demoTour';

const DemoTourOverlay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isActive, currentStep, stepIndex, totalSteps, progress } = useDemoTourInfo(location);

  const handleSkip = () => {
    localStorage.removeItem('isDemoTourActive');
    localStorage.removeItem('demoCurrentStep');
    navigate('/page4');
  };

  if (!isActive) return null;

  // Determinar el color según la perspectiva
  const isPerspectiveFamily = currentStep.perspective === 'family';
  const gradientColor = isPerspectiveFamily 
    ? 'from-pink-500 to-purple-500' 
    : 'from-cyan-500 to-blue-500';
  const perspectiveLabel = isPerspectiveFamily 
    ? '👁️ Viendo: Ana en México (Recibe beneficios)' 
    : '👁️ Viendo: Pedro en USA (Migrante que paga)';

  return (
    <>
      {/* Overlay superior con indicador de progreso */}
      <div className={`fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r ${gradientColor} text-white shadow-2xl`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-black text-xl mb-1">{currentStep.title}</p>
                <p className="text-sm text-white/90">{currentStep.description}</p>
                <p className="text-xs text-white/70 mt-1 font-semibold">{perspectiveLabel}</p>
              </div>
            </div>
            
            <button
              onClick={handleSkip}
              className="ml-4 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg font-bold transition-all text-sm whitespace-nowrap"
            >
              Salir del Tour
            </button>
          </div>
          
          {/* Barra de progreso */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-bold whitespace-nowrap">
              {stepIndex + 1}/{totalSteps}
            </span>
          </div>
        </div>
      </div>

      {/* Espaciador para evitar que el contenido quede debajo del overlay */}
      <div className="h-32" />
    </>
  );
};

export default DemoTourOverlay;
