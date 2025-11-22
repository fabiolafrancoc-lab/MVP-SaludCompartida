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
    id: 'intro',
    title: 'Pedro en USA se suscribe',
    description: 'Pedro González en USA paga $12/mes. La usuaria en México es Ana Rojas.',
    duration: 3000
  },
  {
    id: 'whatsapp-codes',
    title: 'Códigos por WhatsApp',
    description: 'Ana y Pedro reciben sus credenciales por WhatsApp en 30 segundos',
    duration: 3000
  },
  {
    id: 'ana-telemedicine',
    title: 'Ana: Telemedicina',
    description: 'Ana accede a doctores 24/7 por WhatsApp',
    route: '/telemedicine',
    perspective: 'family',
    duration: 3000
  },
  {
    id: 'ana-pharmacy',
    title: 'Ana: Tarjeta Descuento Farmacia',
    description: 'Ana usa su tarjeta digital con hasta 75% descuento',
    route: '/pharmacy',
    perspective: 'family',
    duration: 3000
  },
  {
    id: 'ana-therapy',
    title: 'Ana: Terapia Semanal',
    description: 'Ana agenda hora y recibe confirmación',
    route: '/therapy',
    perspective: 'family',
    duration: 3000
  },
  {
    id: 'ana-savings',
    title: 'Ana: Mis Ahorros',
    description: 'Los ahorros de Ana en pesos mexicanos',
    route: '/savings',
    perspective: 'family',
    duration: 2500
  },
  {
    id: 'pedro-savings',
    title: 'Pedro: Ahorros Totales',
    description: 'Pedro ve ahorros TOTALES agregados en dólares (no desglosados)',
    route: '/savings',
    perspective: 'migrant',
    duration: 3000
  },
  {
    id: 'finish',
    title: '¡Listo para cuidar a tu familia!',
    description: 'Contrata ahora y cuida a tus seres queridos desde USA',
    route: '/registro',
    perspective: 'migrant',
    duration: 2000
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
