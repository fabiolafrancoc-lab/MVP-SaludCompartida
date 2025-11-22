// Demo Tour Controller - Customer Journey desde la perspectiva del MIGRANTE
// El migrante paga $12/mes y ve los beneficios que recibe su familiar en México

export const DEMO_MIGRANT = {
  firstName: 'Pedro',
  lastName: 'González',
  motherLastName: 'Martínez',
  phone: '7862341234',
  email: 'pedro@email.com',
  countryCode: '+1',
  isDemo: true,
  isMigrant: true,
  type: 'migrant',
  phoneId: '+17862341234',
  accessCode: 'SC-USA-DEMO'
};

export const DEMO_FAMILY_MEXICO = {
  firstName: 'Ana',
  lastName: 'Rojas',
  motherLastName: 'López',
  phone: '5512345678',
  email: 'ana@email.com',
  countryCode: '+52',
  isDemo: true,
  isMigrant: false,
  type: 'family',
  phoneId: '+525512345678',
  accessCode: 'SC-MX-DEMO'
};

// Tour steps - Customer journey
export const TOUR_STEPS = [
  {
    id: 'payment',
    title: 'Paso 1: Suscripción',
    description: 'Pagas $12/mes y registras a tu familiar en México',
    duration: 4000
  },
  {
    id: 'whatsapp-codes',
    title: 'Paso 2: Códigos de Acceso',
    description: 'Ambos reciben sus códigos por WhatsApp en 30 segundos',
    duration: 4000
  },
  {
    id: 'family-benefits-telemedicine',
    title: 'Beneficio 1: Telemedicina 24/7',
    description: 'Ana en México tiene acceso a doctores por WhatsApp',
    route: '/telemedicine',
    perspective: 'family',
    duration: 5000
  },
  {
    id: 'family-benefits-pharmacy',
    title: 'Beneficio 2: Descuentos en Farmacias',
    description: 'Ana ahorra hasta 75% en medicamentos',
    route: '/pharmacy',
    perspective: 'family',
    duration: 5000
  },
  {
    id: 'family-benefits-therapy',
    title: 'Beneficio 3: Terapia Psicológica',
    description: 'Ana tiene sesiones de terapia semanales incluidas',
    route: '/therapy',
    perspective: 'family',
    duration: 5000
  },
  {
    id: 'migrant-dashboard',
    title: 'Tu Dashboard (Migrante)',
    description: 'Desde aquí controlas todo',
    route: '/page4',
    perspective: 'migrant',
    duration: 5000
  },
  {
    id: 'migrant-savings',
    title: 'Tus Ahorros',
    description: 'Ve cuánto está ahorrando tu familia',
    route: '/savings',
    perspective: 'migrant',
    duration: 5000
  },
  {
    id: 'migrant-account',
    title: 'Tu Cuenta',
    description: 'Gestiona tu suscripción y cancela cuando quieras',
    route: '/account',
    perspective: 'migrant',
    duration: 5000
  },
  {
    id: 'finish',
    title: '¡Tour Completado!',
    description: 'Listo para cuidar a tu familia',
    route: '/page4',
    perspective: 'migrant',
    duration: 3000
  }
];

export class DemoTourController {
  constructor(navigate, setCurrentUser) {
    this.navigate = navigate;
    this.setCurrentUser = setCurrentUser;
    this.currentStepIndex = 0;
    this.isActive = false;
    this.timers = [];
  }

  start() {
    // Iniciar como migrante (quien paga)
    localStorage.setItem('currentUser', JSON.stringify(DEMO_MIGRANT));
    localStorage.setItem('demoFamilyUser', JSON.stringify(DEMO_FAMILY_MEXICO));
    localStorage.setItem('isDemoTourActive', 'true');
    localStorage.setItem('demoCurrentStep', '0');
    this.setCurrentUser(DEMO_MIGRANT);
    this.isActive = true;
    this.currentStepIndex = 0;
    
    // Iniciar el tour
    this.executeStep(0);
  }

  executeStep(stepIndex) {
    if (!this.isActive || stepIndex >= TOUR_STEPS.length) {
      this.finish();
      return;
    }

    const step = TOUR_STEPS[stepIndex];
    this.currentStepIndex = stepIndex;
    
    // Guardar paso actual
    localStorage.setItem('demoCurrentStep', stepIndex.toString());

    // Cambiar perspectiva si es necesario
    if (step.perspective === 'family') {
      localStorage.setItem('currentUser', JSON.stringify(DEMO_FAMILY_MEXICO));
      this.setCurrentUser(DEMO_FAMILY_MEXICO);
    } else if (step.perspective === 'migrant') {
      localStorage.setItem('currentUser', JSON.stringify(DEMO_MIGRANT));
      this.setCurrentUser(DEMO_MIGRANT);
    }

    // Navegar si el paso tiene ruta
    if (step.route) {
      this.navigate(step.route, { 
        state: { 
          isDemoTour: true, 
          demoStep: step.id,
          demoStepIndex: stepIndex 
        } 
      });
    }

    // Programar siguiente paso
    const timer = setTimeout(() => {
      this.executeStep(stepIndex + 1);
    }, step.duration);

    this.timers.push(timer);
  }

  skip() {
    this.finish();
    // Volver a migrante y al dashboard
    localStorage.setItem('currentUser', JSON.stringify(DEMO_MIGRANT));
    this.setCurrentUser(DEMO_MIGRANT);
    this.navigate('/page4');
  }

  finish() {
    this.isActive = false;
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers = [];
    localStorage.removeItem('isDemoTourActive');
    localStorage.removeItem('demoCurrentStep');
    // Mantener al usuario como migrante después del tour
    localStorage.setItem('currentUser', JSON.stringify(DEMO_MIGRANT));
    this.setCurrentUser(DEMO_MIGRANT);
  }

  cleanup() {
    this.finish();
  }
}

// Hook para obtener información del tour activo
export const useDemoTourInfo = (location) => {
  const isDemoActive = typeof window !== 'undefined' && localStorage.getItem('isDemoTourActive') === 'true';
  const isDemoTour = location?.state?.isDemoTour || false;
  const stepIndex = parseInt(localStorage.getItem('demoCurrentStep') || '0');
  const currentStep = TOUR_STEPS[stepIndex];
  
  return {
    isActive: isDemoActive && isDemoTour,
    currentStep: currentStep || TOUR_STEPS[0],
    stepIndex: stepIndex,
    totalSteps: TOUR_STEPS.length,
    progress: ((stepIndex + 1) / TOUR_STEPS.length) * 100
  };
};
