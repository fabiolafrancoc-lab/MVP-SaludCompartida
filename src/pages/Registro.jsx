import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import { insertRegistration } from '../lib/supabase';
import { sendAccessCode } from '../lib/notifications';
import '../Registro.css';

function Registro() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('register');
  const [spotsLeft, setSpotsLeft] = useState(300);
  const totalSpots = 1000;
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showContactSuccess, setShowContactSuccess] = useState(false);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  
  const [migrantFirstName, setMigrantFirstName] = useState('');
  const [migrantLastName, setMigrantLastName] = useState('');
  const [migrantMotherLastName, setMigrantMotherLastName] = useState('');
  const [migrantEmail, setMigrantEmail] = useState('');
  const [migrantPhone, setMigrantPhone] = useState('');
  const [familyCountry, setFamilyCountry] = useState('');
  
  const [familyFirstName, setFamilyFirstName] = useState('');
  const [familyLastName, setFamilyLastName] = useState('');
  const [familyMotherLastName, setFamilyMotherLastName] = useState('');
  const [familyEmail, setFamilyEmail] = useState('');
  const [familyPhone, setFamilyPhone] = useState('');
  
  // Estados para validación y errores
  const [formError, setFormError] = useState('');
  const [missingFields, setMissingFields] = useState([]);
  
  // Estados para los códigos de acceso generados
  const [migrantAccessCode, setMigrantAccessCode] = useState('');
  const [familyAccessCode, setFamilyAccessCode] = useState('');
  
  // Estado para trackear origen de tráfico
  const [trafficSource, setTrafficSource] = useState('');

  const testimonials = [
    "Estoy ahorrando cada mes gracias a SaludCompartida.",
    "Mi familia ahora puede llamar a doctores cuando quiera sin estrés.",
    "El servicio me ayudó a manejar los medicamentos de mi mamá desde lejos.",
    "Ahora mi familia tiene acceso a terapia cuando la necesita.",
    "Los descuentos en medicinas nos han ayudado muchísimo."
  ];

  // Capturar origen de tráfico desde URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('source') || params.get('utm_source') || params.get('ref');
    
    if (source) {
      setTrafficSource(source.toLowerCase());
      // Guardar en localStorage para persistencia
      localStorage.setItem('trafficSource', source.toLowerCase());
    } else {
      // Intentar recuperar de localStorage si existe
      const savedSource = localStorage.getItem('trafficSource');
      if (savedSource) {
        setTrafficSource(savedSource);
      }
    }
  }, []);

  useEffect(() => {
    if (currentPage === 'register' && spotsLeft > 87) {
      const interval = setInterval(() => {
        setSpotsLeft(prev => {
          if (prev <= 87) return 87;
          const decrease = Math.floor(Math.random() * 3) + 1;
          return Math.max(87, prev - decrease);
        });
      }, Math.random() * 3000 + 2000);
      
      return () => clearInterval(interval);
    }
  }, [currentPage, spotsLeft]);

  useEffect(() => {
    if (currentPage === 'confirmation' || currentPage === 'access') {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5500);
      
      return () => clearInterval(interval);
    }
  }, [currentPage, testimonials.length]);

  const formatUSPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    // Limitar a máximo 10 dígitos
    const limited = numbers.slice(0, 10);
    if (limited.length <= 3) return limited;
    if (limited.length <= 6) return `${limited.slice(0, 3)} ${limited.slice(3)}`;
    return `${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6)}`;
  };

  const formatMXPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    // Limitar a máximo 10 dígitos
    const limited = numbers.slice(0, 10);
    if (limited.length <= 3) return limited;
    if (limited.length <= 6) return `${limited.slice(0, 3)} ${limited.slice(3)}`;
    return `${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6)}`;
  };

  const clearError = () => {
    setFormError('');
    setMissingFields([]);
  };

  const handleContactRequest = async () => {
    setIsSubmittingContact(true);
    try {
      const emailBody = `
📬 SOLICITUD DE INFORMACIÓN DESDE REGISTRO

Un usuario solicitó más información sobre el servicio.

--- INFORMACIÓN ---
Origen: Página de Registro (App.jsx)
Fecha: ${new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
      `.trim();

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Usuario Interesado',
          email: 'usuario@saludcompartida.com',
          message: emailBody,
          type: 'consulta-general',
          to: 'contact@saludcompartida.com'
        }),
      });

      if (response.ok) {
        setShowContactSuccess(true);
        setTimeout(() => {
          setShowContactSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error al enviar consulta:', error);
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const handleRegister = async () => {
    // Limpiar errores previos
    setFormError('');
    setMissingFields([]);
    
    // Validar campos requeridos
    const missing = [];
    if (!migrantFirstName) missing.push('migrantFirstName');
    if (!migrantLastName) missing.push('migrantLastName');
    if (!migrantEmail) missing.push('migrantEmail');
    
    // Validar formato de email del migrante
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (migrantEmail && !emailRegex.test(migrantEmail)) {
      missing.push('migrantEmail');
      setMissingFields(['migrantEmail']);
      setFormError('Por favor ingresa un correo electrónico válido (ejemplo: nombre@email.com). Intenta de nuevo.');
      return;
    }
    
    if (!migrantPhone || migrantPhone.replace(/\s/g, '').length < 10) missing.push('migrantPhone');
    
    // Validar que el teléfono del migrante no sea un número inválido
    const cleanMigrantPhoneCheck = migrantPhone.replace(/\s/g, '');
    if (cleanMigrantPhoneCheck) {
      // Rechazar números repetitivos (1111111111, 2222222222, etc.)
      if (/^(\d)\1+$/.test(cleanMigrantPhoneCheck)) {
        setMissingFields(['migrantPhone']);
        setFormError('Por favor ingresa un número de teléfono válido. No uses números repetitivos (ejemplo: 111 111 1111).');
        return;
      }
      
      // Rechazar números secuenciales comunes
      if (cleanMigrantPhoneCheck === '1234567890' || cleanMigrantPhoneCheck === '0123456789') {
        setMissingFields(['migrantPhone']);
        setFormError('Por favor ingresa tu número de teléfono real. No uses números secuenciales.');
        return;
      }
    }
    if (!familyCountry) missing.push('familyCountry');
    if (!familyFirstName) missing.push('familyFirstName');
    if (!familyLastName) missing.push('familyLastName');
    if (!familyPhone || familyPhone.replace(/\s/g, '').length < 10) missing.push('familyPhone');
    
    // Validar que el teléfono del familiar no sea un número inválido
    const cleanFamilyPhoneCheck = familyPhone.replace(/\s/g, '');
    if (cleanFamilyPhoneCheck) {
      // Rechazar números repetitivos (1111111111, 2222222222, etc.)
      if (/^(\d)\1+$/.test(cleanFamilyPhoneCheck)) {
        setMissingFields(['familyPhone']);
        setFormError('Por favor ingresa un número de teléfono válido para tu familiar. No uses números repetitivos (ejemplo: 111 111 1111).');
        return;
      }
      
      // Rechazar números secuenciales comunes
      if (cleanFamilyPhoneCheck === '1234567890' || cleanFamilyPhoneCheck === '0123456789') {
        setMissingFields(['familyPhone']);
        setFormError('Por favor ingresa el número de teléfono real de tu familiar. No uses números secuenciales.');
        return;
      }
    }
    
    if (missing.length > 0) {
      setMissingFields(missing);
      setFormError('Por favor completa toda la información requerida. Intenta de nuevo.');
      return;
    }
    
    if (migrantFirstName && migrantLastName && migrantEmail && 
        migrantPhone && familyCountry && familyFirstName && familyLastName && 
        familyPhone) {
      
      try {
        // Limpiar números de teléfono (quitar espacios)
        const cleanMigrantPhone = migrantPhone.replace(/\s/g, '');
        const cleanFamilyPhone = familyPhone.replace(/\s/g, '');
        
        // Guardar registro completo (migrante + familiar en una sola fila)
        const result = await insertRegistration(
          {
            firstName: migrantFirstName,
            lastName: migrantLastName,
            motherLastName: migrantMotherLastName,
            email: migrantEmail,
            countryCode: '+1',
            phone: cleanMigrantPhone
          },
          {
            firstName: familyFirstName,
            lastName: familyLastName,
            motherLastName: familyMotherLastName,
            email: familyEmail,
            countryCode: '+52',
            phone: cleanFamilyPhone,
            country: familyCountry
          },
          trafficSource || 'direct' // Agregar origen de tráfico
        );
        
        if (!result.success) {
          setFormError('Error al registrar: ' + result.error);
          return;
        }
        
        // Guardar códigos de acceso generados
        setMigrantAccessCode(result.migrantAccessCode);
        setFamilyAccessCode(result.familyAccessCode);
        
        console.log('✅ Registro exitoso en Supabase');
        console.log('Código Migrante:', result.migrantAccessCode);
        console.log('Código Familiar:', result.familyAccessCode);
        
        // También guardar en localStorage para compatibilidad
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        const migrantPhoneId = `+1${cleanMigrantPhone}`;
        const familyPhoneId = `+52${cleanFamilyPhone}`;
        
        registeredUsers[migrantPhoneId] = {
          firstName: migrantFirstName,
          lastName: migrantLastName,
          motherLastName: migrantMotherLastName,
          email: migrantEmail,
          phone: cleanMigrantPhone,
          accessCode: result.migrantAccessCode,
          registeredAt: new Date().toISOString(),
          type: 'migrant',
          linkedFamilyPhone: familyPhoneId
        };
        
        registeredUsers[familyPhoneId] = {
          firstName: familyFirstName,
          lastName: familyLastName,
          motherLastName: familyMotherLastName,
          phone: cleanFamilyPhone,
          accessCode: result.familyAccessCode,
          registeredAt: new Date().toISOString(),
          type: 'family',
          linkedMigrantPhone: migrantPhoneId
        };
        
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

        // Enviar email con los códigos generados
        const emailMessage = `
🎉 NUEVO REGISTRO DE PREVENTA - CÓDIGOS GENERADOS

--- DATOS DEL MIGRANTE EN EEUU ---
Nombre completo: ${migrantFirstName} ${migrantLastName} ${migrantMotherLastName || ''}
Email: ${migrantEmail}
Teléfono (WhatsApp): +1 ${migrantPhone}
🔑 CÓDIGO DE ACCESO: ${result.migrantAccessCode}

--- DATOS DEL FAMILIAR EN MÉXICO ---
Nombre completo: ${familyFirstName} ${familyLastName} ${familyMotherLastName || ''}
Teléfono (WhatsApp): +52 ${familyPhone}
🔑 CÓDIGO DE ACCESO: ${result.familyAccessCode}
País: ${familyCountry}

--- INFORMACIÓN ADICIONAL ---
Fecha de registro: ${new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
Suscripciones restantes después de este registro: ${spotsLeft - 1}

--- SIGUIENTE PASO ---
⚠️ IMPORTANTE: Los usuarios deben usar su código de acceso para ingresar.
- Migrante (USA): ${result.migrantAccessCode}
- Familiar (México): ${result.familyAccessCode}
        `.trim();

        await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `${migrantFirstName} ${migrantLastName}`,
            email: migrantEmail,
            message: emailMessage,
            type: 'registration'
          }),
        });

        // Continuar con el flujo de UI
        setSpotsLeft(prev => Math.max(0, prev - 1));
        setShowConfetti(true);
        
        // Guardar datos del usuario para la página de pago
        const registrationUser = {
          firstName: migrantFirstName,
          lastName: migrantLastName,
          motherLastName: migrantMotherLastName,
          email: migrantEmail,
          phone: cleanMigrantPhone,
          countryCode: '+1',
          familyFirstName: familyFirstName,
          familyLastName: familyLastName,
          familyMotherLastName: familyMotherLastName,
          familyEmail: familyEmail,
          familyPhone: cleanFamilyPhone,
          familyCountryCode: '+52',
          familyCountry: familyCountry,
          migrantAccessCode: result.migrantAccessCode,
          familyAccessCode: result.familyAccessCode
        };
        localStorage.setItem('registrationUser', JSON.stringify(registrationUser));
        
        // Redirigir a página de pago
        navigate('/pago');
        
        // Enviar códigos de acceso por WhatsApp/SMS y Email
        try {
          // Enviar WhatsApp/SMS al migrante (USA)
          const migrantNotification = await sendAccessCode(
            cleanMigrantPhone,
            result.migrantAccessCode,
            migrantFirstName
          );
          
          if (migrantNotification.success) {
            console.log(`✅ Código enviado al migrante por ${migrantNotification.method}`);
          }

          // Enviar Email de CONFIRMACIÓN DE REGISTRO al migrante (SIN código aún)
          if (migrantEmail) {
            console.log('📧 Enviando confirmación de registro a migrante:', migrantEmail);
            const confirmResponse = await fetch('/api/send-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                to: migrantEmail,
                subject: '✅ Registro Exitoso - SaludCompartida',
                message: `Hola ${migrantFirstName},

¡Gracias por registrarte en SaludCompartida! 🎉

Tu solicitud ha sido recibida exitosamente. 

📋 Estado de tu registro:
Has sido registrado en nuestro programa piloto. Estamos revisando todas las solicitudes para seleccionar a los primeros 1,000 participantes.

🔔 ¿Qué sigue?
En los próximos 3 días recibirás un email con:
• Tu código de acceso personalizado
• Instrucciones para activar tu cuenta
• Acceso inmediato a todos los servicios

⏰ Fecha estimada de respuesta:
Recibirás notificación antes del 18 de noviembre de 2025.

👨‍👩‍👧 Datos registrados:
• Migrante (USA): ${migrantFirstName} ${migrantLastName}
• Familiar (México): ${familyFirstName} ${familyLastName}
• Suscripciones restantes: ${spotsLeft} de 1,000

💡 Importante:
Mantén tu email activo. Te contactaremos a: ${migrantEmail}

¿Dudas? Escríbenos a contact@saludcompartida.com

¡Estamos emocionados de tenerte con nosotros! 💙
Equipo SaludCompartida`,
                type: 'registration-confirmation'
              })
            });
            
            if (confirmResponse.ok) {
              console.log('✅ Confirmación de registro enviada al migrante');
            }

            // NOTA: El email con código de acceso se enviará después de la selección
            // Esto se puede hacer manualmente o mediante un proceso separado en 3 días
            /*
            MENSAJE PARA CUANDO SEA SELECCIONADO (enviar después):
            
            Subject: 🎉 ¡Felicidades! Has sido seleccionado - SaludCompartida
            
            Hola ${migrantFirstName},

            ¡Excelentes noticias! Has sido seleccionado para participar en el programa piloto de SaludCompartida. 🎉

            Tu código de acceso es: ${result.migrantAccessCode}

            � **Activa tu cuenta ahora:**
            👉 https://prototype.saludcompartida.com

            Ingresa con tu código para empezar a disfrutar de:
            ✅ Telemedicina 24/7 para tu familiar en México
            ✅ Descuentos de 40-75% en medicamentos
            ✅ Sesiones de terapia psicológica semanales
            ✅ 30 días completamente GRATIS

            � **Guarda este código:** ${result.migrantAccessCode}
            Lo necesitarás para acceder a todos tus servicios de salud.

            ⏰ **¡Activa tu cuenta hoy!**
            Los 30 días gratis comienzan desde tu primer acceso.

            ¿Dudas? Escríbenos a contact@saludcompartida.com

            ¡Bienvenido oficialmente a la familia SaludCompartida! 💙
            Equipo SaludCompartida
            */
          }

          // Enviar WhatsApp/SMS al familiar (México)
          const familyNotification = await sendAccessCode(
            cleanFamilyPhone,
            result.familyAccessCode,
            familyFirstName
          );
          
          if (familyNotification.success) {
            console.log(`✅ Código enviado al familiar por ${familyNotification.method}`);
          }

          // Enviar Email de CONFIRMACIÓN DE REGISTRO al familiar (SIN código aún)
          if (familyEmail) {
            // Esperar 2 segundos antes de enviar el segundo email para evitar rate limiting
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('📧 Enviando confirmación de registro a familiar:', familyEmail);
            const confirmResponse = await fetch('/api/send-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                to: familyEmail,
                subject: '✅ Registro Exitoso - SaludCompartida',
                message: `Hola ${familyFirstName},

${migrantFirstName} ${migrantLastName} (tu familiar en Estados Unidos) te registró en nuestro programa piloto. Su solicitud ha sido recibida exitosamente.

📋 Estado de tu registro:
Estamos revisando todas las solicitudes para seleccionar a los primeros 1,000 participantes.

🔔 ¿Qué sigue?
En los próximos 3 días recibirás un email con:
• Tu código de acceso personalizado
• Instrucciones para activar tu cuenta
• Acceso inmediato a todos los servicios

⏰ Fecha estimada de respuesta:
Recibirás notificación antes del 18 de noviembre de 2025.

👨‍👩‍👧 Datos registrados:
• Familiar (México): ${familyFirstName} ${familyLastName}
• Migrante (USA): ${migrantFirstName} ${migrantLastName}
• Suscripciones restantes: ${spotsLeft} de 1,000

🏥 Servicios incluidos si eres seleccionado:
• Telemedicina 24/7
• Descuentos en farmacias (40-75%)
• Sesiones de terapia semanales
• 30 días completamente GRATIS

💡 Importante:
Mantén tu email activo. Te contactaremos a: ${familyEmail}

¿Dudas? Escríbenos a contact@saludcompartida.com

¡Estamos emocionados de tenerte con nosotros! 💙
Equipo SaludCompartida`,
                type: 'registration-confirmation'
              })
            });
            
            if (confirmResponse.ok) {
              console.log('✅ Confirmación de registro enviada al familiar');
            }

            // NOTA: El email con código de acceso se enviará después de la selección
            // Esto se puede hacer manualmente o mediante un proceso separado en 3 días
            /*
            MENSAJE PARA CUANDO SEA SELECCIONADO (enviar después):
            
            Subject: 🎉 ¡Felicidades! Has sido seleccionado - SaludCompartida
            
            Hola ${familyFirstName},

            ¡Excelentes noticias! Has sido seleccionado para participar en el programa piloto de SaludCompartida. 🎉

            ${migrantFirstName} ${migrantLastName} (Migrante en USA) te registró para que puedas utilizar los beneficios de SaludCompartida sin costo durante 30 días.

            Tu código de acceso es: ${result.familyAccessCode}

            🔗 **Activa tu cuenta ahora:**
            👉 https://prototype.saludcompartida.com

            Para acceder debes ingresar el código en el link indicado arriba. Te registras y una vez registrado podrás empezar a utilizar los servicios inmediatamente. ¡Empieza a ahorrar! Empieza a utilizar SaludCompartida.

            � **Guarda este código:** ${result.familyAccessCode}
            Lo necesitarás para acceder a todos tus servicios de salud.

            🏥 **Tus beneficios incluyen:**
            ✅ Telemedicina 24/7 - Consulta médicos cuando lo necesites
            ✅ Descuentos de 40-75% en medicamentos
            ✅ Terapia psicológica semanal
            ✅ 30 días completamente GRATIS

            ⏰ **¡Activa tu cuenta hoy!**
            Los 30 días gratis comienzan desde tu primer acceso.

            ¿Dudas? Escríbenos a contact@saludcompartida.com

            ¡Estamos para cuidarte! 💙
            Equipo SaludCompartida
            */
          }
        } catch (notifError) {
          console.error('Error enviando notificaciones:', notifError);
          // No bloqueamos el registro si falla la notificación
        }
        
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
        
      } catch (error) {
        console.error('Error en el registro:', error);
        alert('Hubo un error al procesar el registro. Por favor intenta nuevamente.');
      }
    } else {
      alert('Por favor completa todos los campos');
    }
  };

  // Unified header uses TopNav component

  if (currentPage === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
  <TopNav hideUser={true} />

        <div className="max-w-7xl mx-auto px-6 py-8">
          
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
              Suscríbete hoy por $12 mensuales y en 30 segundos tu familia empieza a utilizar todos los beneficios de <span className="text-cyan-500">SaludCompartida</span>. Estamos donde está tu corazón.
            </h2>
          </div>

          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            <div className="relative space-y-8">
              <div className="sticky top-24">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
                  <img 
                    src="/girl%203.jpeg"
                    alt="Niña sonriendo"
                    className="w-full h-[550px] object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4 hover:shadow-xl transition-shadow">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Telemedicina 24/7</h3>
                      <p className="text-sm text-gray-600">Consultas ilimitadas por WhatsApp</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4 hover:shadow-xl transition-shadow">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Red de Farmacias</h3>
                      <p className="text-sm text-gray-600">40-75% de descuento en 1,700+ ubicaciones</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4 hover:shadow-xl transition-shadow">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Sesiones de Terapia Semanal</h3>
                      <p className="text-sm text-gray-600">Apoyo psicológico profesional</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-pink-500 to-rose-500 p-8 shadow-xl animate-pulse">
                <div className="relative z-10">
                  <div className="mb-6">
                    <p className="text-white/90 text-sm font-medium uppercase tracking-wider mb-2">
                      Suscripciones Disponibles - Segunda Fase
                    </p>
                    <div className="flex items-baseline gap-3 mb-4">
                      <p className="text-white text-5xl font-bold animate-bounce">
                        {spotsLeft}
                      </p>
                      <p className="text-white/80 text-lg">
                        de {totalSpots} suscripciones
                      </p>
                    </div>
                    
                    <div className="bg-white/20 rounded-xl p-4 mb-4">
                      <p className="text-white text-sm leading-relaxed">
                        <span className="block text-yellow-200 font-semibold">Ya están suscritos {totalSpots - spotsLeft} familias</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-10">
                  
                  <div className="mb-10">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">
                      Comienza Tu Registro
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Regístrate ahora y sé parte de las 1,000 familias que acceden a SaludCompartida. Estamos donde está tu corazón.
                    </p>
                  </div>

                  <div className="space-y-10">
                    
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b-2 border-cyan-100">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Tus Datos</h4>
                          <p className="text-sm text-gray-500">Información del migrante en EE.UU.</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 items-start">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2 text-left">Nombre</label>
                          <input
                            type="text"
                            value={migrantFirstName}
                            onChange={(e) => {
                              setMigrantFirstName(e.target.value);
                              clearError();
                            }}
                            placeholder="María"
                            className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-cyan-500 transition-all text-gray-900 placeholder-gray-400 bg-white ${
                              missingFields.includes('migrantFirstName') ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-cyan-500'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2 text-left">Apellido Paterno</label>
                          <input
                            type="text"
                            value={migrantLastName}
                            onChange={(e) => {
                              setMigrantLastName(e.target.value);
                              clearError();
                            }}
                            placeholder="García"
                            className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-cyan-500 transition-all text-gray-900 placeholder-gray-400 bg-white ${
                              missingFields.includes('migrantLastName') ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-cyan-500'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2 text-left">Apellido Materno <span className="text-gray-500 font-normal text-[10px]">(opcional)</span></label>
                          <input
                            type="text"
                            value={migrantMotherLastName}
                            onChange={(e) => {
                              setMigrantMotherLastName(e.target.value);
                              clearError();
                            }}
                            placeholder="López"
                            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-gray-900 placeholder-gray-400 bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2 text-left">Correo Electrónico</label>
                        <input
                          type="email"
                          value={migrantEmail}
                          onChange={(e) => {
                            setMigrantEmail(e.target.value);
                            clearError();
                          }}
                          placeholder="maria.garcia@email.com"
                          className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-cyan-500 transition-all text-gray-900 placeholder-gray-400 bg-white ${
                            missingFields.includes('migrantEmail') ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-cyan-500'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2 text-left">
                          <span>Proporciónanos tu WhatsApp (Estados Unidos)</span>
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold pointer-events-none z-10">+1</div>
                          <input
                            type="tel"
                            value={migrantPhone}
                            onChange={(e) => {
                              setMigrantPhone(formatUSPhone(e.target.value));
                              clearError();
                            }}
                            placeholder="305 123 4567"
                            maxLength="14"
                            className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-cyan-500 transition-all text-gray-900 placeholder-gray-400 bg-white ${
                              missingFields.includes('migrantPhone') ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-cyan-500'
                            }`}
                          />
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          10 dígitos • Tu código de acceso será enviado a este WhatsApp
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Haga clic en el lugar donde vive su familiar</label>
                        <select
                          value={familyCountry}
                          onChange={(e) => {
                            setFamilyCountry(e.target.value);
                            clearError();
                          }}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-gray-900 bg-white"
                        >
                          <option value="">Selecciona un país</option>
                          <option value="MX">🇲🇽 México</option>
                          <option value="GT" disabled>🇬🇹 Guatemala (Próximamente)</option>
                          <option value="HN" disabled>🇭🇳 Honduras (Próximamente)</option>
                          <option value="SV" disabled>🇸🇻 El Salvador (Próximamente)</option>
                          <option value="NI" disabled>🇳🇮 Nicaragua (Próximamente)</option>
                          <option value="CO" disabled>🇨🇴 Colombia (Próximamente)</option>
                          <option value="PE" disabled>🇵🇪 Perú (Próximamente)</option>
                          <option value="EC" disabled>🇪🇨 Ecuador (Próximamente)</option>
                          <option value="IN" disabled>🇮🇳 India (Próximamente)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b-2 border-pink-100">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Tu Conexión en Casa</h4>
                          <p className="text-sm text-gray-500">Familiar en México</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 items-start">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2 text-left">Nombre</label>
                          <input
                            type="text"
                            value={familyFirstName}
                            onChange={(e) => {
                              setFamilyFirstName(e.target.value);
                              clearError();
                            }}
                            placeholder="Rosa"
                            className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-pink-500 transition-all text-gray-900 placeholder-gray-400 bg-white ${
                              missingFields.includes('familyFirstName') ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-pink-500'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2 text-left">Apellido Paterno</label>
                          <input
                            type="text"
                            value={familyLastName}
                            onChange={(e) => {
                              setFamilyLastName(e.target.value);
                              clearError();
                            }}
                            placeholder="Hernández"
                            className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-pink-500 transition-all text-gray-900 placeholder-gray-400 bg-white ${
                              missingFields.includes('familyLastName') ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-pink-500'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2 text-left">Apellido Materno <span className="text-gray-500 font-normal text-[10px]">(opcional)</span></label>
                          <input
                            type="text"
                            value={familyMotherLastName}
                            onChange={(e) => {
                              setFamilyMotherLastName(e.target.value);
                              clearError();
                            }}
                            placeholder="Pérez"
                            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all text-gray-900 placeholder-gray-400 bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2 text-left">Correo Electrónico <span className="text-gray-500 font-normal text-[10px]">(opcional)</span></label>
                        <input
                          type="email"
                          value={familyEmail}
                          onChange={(e) => {
                            setFamilyEmail(e.target.value);
                            clearError();
                          }}
                          placeholder="rosa.hernandez@email.com"
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all text-gray-900 placeholder-gray-400 bg-white"
                        />
                        <p className="mt-2 text-xs text-gray-500">
                          Si tu familiar tiene email, lo usaremos para enviarle su código de acceso
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2 text-left">
                          <span>Proporciónanos su WhatsApp (México)</span>
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold pointer-events-none z-10">+52</div>
                          <input
                            type="tel"
                            value={familyPhone}
                            onChange={(e) => {
                              setFamilyPhone(formatMXPhone(e.target.value));
                              clearError();
                            }}
                            placeholder="55 1234 5678"
                            maxLength="14"
                            className={`w-full pl-14 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-pink-500 transition-all text-gray-900 placeholder-gray-400 bg-white ${
                              missingFields.includes('familyPhone') ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-pink-500'
                            }`}
                          />
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          10 dígitos • Su código de acceso será enviado a este WhatsApp
                        </p>
                      </div>
                    </div>

                    {/* Mensaje de Error antes del botón */}
                    {formError && (
                      <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 flex items-start gap-3">
                        <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <p className="font-bold text-red-900 mb-1">Error en el registro</p>
                          <p className="text-sm text-red-700">{formError}</p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleRegister}
                      className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3"
                    >
                      <span>Suscribirme Ahora</span>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>

                    {/* Sección de contacto */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                      <div className="text-center">
                        <p className="text-gray-700 font-semibold mb-2">
                          ¿Quieres saber más sobre el servicio?
                        </p>
                        <p className="text-gray-600 text-sm mb-2">
                          Consultas, escríbenos a:
                        </p>
                        <p className="text-cyan-600 font-bold text-lg">
                          contact@saludcompartida.com
                        </p>
                      </div>
                    </div>

                    <p className="text-center text-sm text-gray-500 leading-relaxed">
                      Al registrarte, aceptas nuestros{' '}
                      <button 
                        onClick={() => navigate('/terms', { state: { from: '/' } })}
                        className="text-cyan-600 hover:text-cyan-700 font-medium underline"
                      >
                        términos y condiciones
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default Registro;
