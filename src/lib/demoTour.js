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
    id: 'landing-page',
    title: 'Paso 1: Contratas el Servicio',
    description: 'Desde www.saludcompartida.app por $12/mes',
    route: '/',
    perspective: 'migrant',
    duration: 3000
  },
  {
    id: 'whatsapp-codes',
    title: 'Paso 2: Códigos de Acceso',
    description: 'Ambos reciben sus códigos por WhatsApp en 30 segundos',
    duration: 3000
  },
  {
    id: 'family-benefits-telemedicine',
    title: 'Paso 3: Telemedicina para Ana',
    description: 'Tu ser querido en México tiene doctores 24/7',
    route: '/telemedicine',
    perspective: 'family',
    duration: 3000
  },
  {
    id: 'family-benefits-pharmacy',
    title: 'Paso 3: Farmacias para Ana',
    description: 'Descuentos hasta 75% en medicamentos',
    route: '/pharmacy',
    perspective: 'family',
    duration: 3000
  },
  {
    id: 'family-benefits-therapy',
    title: 'Paso 3: Terapia para Ana',
    description: 'Sesiones de terapia psicológica incluidas',
    route: '/therapy',
    perspective: 'family',
    duration: 3000
  },
  {
    id: 'family-dashboard',
    title: 'Paso 4: Dashboard de Ana en México',
    description: 'Así navega tu familiar en México',
    route: '/page4',
    perspective: 'family',
    duration: 3000
  },
  {
    id: 'migrant-dashboard',
    title: 'Paso 5: Tu Dashboard en USA',
    description: 'Desde aquí controlas todo',
    route: '/page4',
    perspective: 'migrant',
    duration: 3000
  },
  {
    id: 'migrant-savings',
    title: 'Paso 5: Monitoreas los Ahorros',
    description: 'Ve cuánto está ahorrando tu familia',
    route: '/savings',
    perspective: 'migrant',
    duration: 3000
  },
  {
    id: 'migrant-account',
    title: 'Paso 5: Gestionas la Cuenta',
    description: 'Cancela cuando quieras, sin compromiso',
    route: '/account',
    perspective: 'migrant',
    duration: 3000
  },
  {
    id: 'finish',
    title: '¡Tour Completado!',
    description: 'Listo para cuidar a tu familia desde USA',
    route: '/page4',
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
