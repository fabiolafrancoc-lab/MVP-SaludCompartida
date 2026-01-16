/**
 * TEST WATI.IO INTEGRATION
 * 
 * Script para probar que WATI.io está correctamente configurado
 * 
 * USO:
 * 1. Asegúrate de tener WATI_ENDPOINT y WATI_API_TOKEN en .env
 * 2. Ejecuta: node scripts/test-wati.js
 */

// Cargar variables de entorno
import dotenv from 'dotenv';
dotenv.config();

const testWATI = async () => {
  console.log('\n🧪 PRUEBA DE INTEGRACIÓN WATI.IO\n');
  console.log('='.repeat(50));

  // Verificar configuración
  const WATI_ENDPOINT = process.env.WATI_ENDPOINT;
  const WATI_TOKEN = process.env.WATI_API_TOKEN;

  if (!WATI_ENDPOINT || !WATI_TOKEN) {
    console.error('\n❌ ERROR: Variables de entorno no configuradas');
    console.log('\nAsegúrate de agregar en .env:');
    console.log('WATI_ENDPOINT=https://live-server-XXXXX.wati.io');
    console.log('WATI_API_TOKEN=tu_token_aqui\n');
    process.exit(1);
  }

  console.log('\n✅ Variables de entorno encontradas:');
  console.log(`   Endpoint: ${WATI_ENDPOINT}`);
  console.log(`   Token: ${WATI_TOKEN.substring(0, 20)}...\n`);

  // Número de prueba (CAMBIAR POR TU NÚMERO)
  const testPhone = '+13055227150'; // Número de Fabiola para prueba
  
  console.log('📱 Número de prueba:', testPhone);
  console.log('\n⚠️  IMPORTANTE: Cambia testPhone en scripts/test-wati.js por tu número real\n');

  // Mensaje de prueba
  const testMessage = `🧪 *Prueba de WATI.io*

Este es un mensaje de prueba desde Salud Compartida.

Si recibes esto, ¡la integración está funcionando correctamente! ✅

Fecha: ${new Date().toLocaleString('es-MX')}

_Prueba enviada desde scripts/test-wati.js_`;

  try {
    console.log('📤 Enviando mensaje de prueba...\n');

    const response = await fetch(`${WATI_ENDPOINT}/api/v1/sendSessionMessage/${testPhone}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WATI_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messageText: testMessage
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Error de WATI API:');
      console.error(JSON.stringify(data, null, 2));
      
      if (data.error?.includes('not found')) {
        console.log('\n💡 SOLUCIÓN: El número no está registrado en WATI.');
        console.log('   1. Ve a tu dashboard de WATI');
        console.log('   2. Envía un mensaje de prueba desde allí primero');
        console.log('   3. O asegúrate de que el usuario te haya escrito antes\n');
      }
      
      process.exit(1);
    }

    console.log('✅ ¡MENSAJE ENVIADO EXITOSAMENTE!\n');
    console.log('Detalles de la respuesta:');
    console.log(JSON.stringify(data, null, 2));
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 ¡WATI.IO ESTÁ FUNCIONANDO CORRECTAMENTE!');
    console.log('='.repeat(50));
    console.log('\nRevisa tu WhatsApp para confirmar que recibiste el mensaje.\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.log('\nVerifica:');
    console.log('1. ✅ Variables WATI_ENDPOINT y WATI_API_TOKEN en .env');
    console.log('2. ✅ Endpoint correcto (debe ser https://live-server-XXXXX.wati.io)');
    console.log('3. ✅ Token válido (copia desde WATI dashboard)');
    console.log('4. ✅ Número de teléfono correcto (+52 seguido de 10 dígitos)\n');
    process.exit(1);
  }
};

// Ejecutar prueba
testWATI();
