// Configuración centralizada de WhatsApp
// Este archivo contiene todos los números y configuraciones de WhatsApp de la app

export const WHATSAPP_CONFIG = {
  // Número principal de negocio (sin +52)
  businessNumber: '5529984922702',
  
  // Número con formato internacional para wa.me
  businessNumberFull: '5529984922702',
  
  // Número formateado para mostrar
  businessNumberDisplay: '55 2998 4922 702',
  
  // Mensajes predeterminados
  defaultMessages: {
    general: 'Hola, quiero más información sobre SaludCompartida',
    telemedicine: '¡Hola! Necesito hablar con un doctor',
    therapy: 'Hola, tengo una pregunta sobre mi sesión de terapia',
    contact: 'Hola, necesito ayuda',
  },
  
  // Generar URL de WhatsApp
  getWhatsAppURL: (message = null) => {
    const msg = message || WHATSAPP_CONFIG.defaultMessages.general;
    return `https://wa.me/${WHATSAPP_CONFIG.businessNumberFull}?text=${encodeURIComponent(msg)}`;
  },
  
  // Abrir WhatsApp en nueva pestaña
  openWhatsApp: (message = null) => {
    window.open(WHATSAPP_CONFIG.getWhatsAppURL(message), '_blank');
  }
};

export default WHATSAPP_CONFIG;
