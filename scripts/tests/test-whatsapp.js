// Script de prueba para verificar envío de WhatsApp
// Ejecutar: node test-whatsapp.js

const testWhatsAppAPI = async () => {
  console.log('🧪 Iniciando prueba de WhatsApp API...\n');

  // Número de prueba (reemplaza con tu número real)
  const testNumber = '+13055227150'; // Tu número personal para prueba
  
  // Simular que usamos el número correcto de Twilio
  console.log('⚠️  IMPORTANTE: Asegúrate de actualizar en Vercel:');
  console.log('   TWILIO_WHATSAPP_NUMBER = whatsapp:+15558390419\n');
  
  const testMessage = `🧪 Mensaje de Prueba

Este es un mensaje de prueba desde SaludCompartida.

Si recibes este mensaje, la integración con Twilio está funcionando correctamente.

Fecha: ${new Date().toLocaleString()}`;

  try {
    console.log('📱 Enviando mensaje de prueba a:', testNumber);
    console.log('📝 Mensaje:', testMessage);
    console.log('\n🔄 Llamando a la API...\n');

    const response = await fetch('https://www.saludcompartida.app/api/send-whatsapp', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: testNumber,
        message: testMessage,
        type: 'test',
        countryCode: '+1'
      })
    });

    const data = await response.json();
    
    console.log('📊 Respuesta de la API:');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n✅ ÉXITO: Mensaje enviado correctamente');
      console.log('Message SID:', data.messageSid);
    } else {
      console.log('\n❌ ERROR:', data.error);
      if (data.details) {
        console.log('Detalles:', data.details);
      }
    }

  } catch (error) {
    console.error('\n❌ ERROR en la llamada:', error.message);
  }
};

// Ejecutar prueba
testWhatsAppAPI();
