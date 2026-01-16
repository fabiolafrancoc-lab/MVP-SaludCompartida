#!/usr/bin/env node

/**
 * TEST WATI - Envío Simple de Mensaje
 * Prueba rápida sin templates
 */

import dotenv from 'dotenv';
dotenv.config();

const testWATISimple = async () => {
  console.log('\n🧪 PRUEBA SIMPLE DE WATI.IO\n');
  console.log('='.repeat(50));

  const WATI_ENDPOINT = process.env.WATI_ENDPOINT;
  const WATI_TOKEN = process.env.WATI_API_TOKEN;

  if (!WATI_ENDPOINT || !WATI_TOKEN) {
    console.error('\n❌ Variables no configuradas');
    process.exit(1);
  }

  console.log('✅ Credenciales encontradas');
  console.log(`   Endpoint: ${WATI_ENDPOINT}\n`);

  // CAMBIA ESTE NÚMERO POR EL TUYO
  const testPhone = '13055227150'; // Sin + ni espacios
  
  console.log(`📱 Enviando a: +${testPhone}\n`);

  const message = `🎉 ¡Prueba de Salud Compartida!

Este mensaje confirma que WATI está funcionando correctamente.

Fecha: ${new Date().toLocaleString('es-MX')}`;

  try {
    // Endpoint correcto para mensajes de sesión (texto simple)
    const url = `${WATI_ENDPOINT}/api/v1/sendSessionMessage/${testPhone}`;
    
    console.log('📤 Enviando mensaje...');
    console.log(`URL: ${url}\n`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WATI_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messageText: message
      })
    });

    const contentType = response.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.log('⚠️  Respuesta no-JSON:', text);
      
      if (text.includes('Offline Mode')) {
        console.log('\n💡 WATI está en "Offline Mode"');
        console.log('   Esto significa que está procesando la conexión con WhatsApp.');
        console.log('   Puede tomar hasta 24 horas.\n');
        console.log('✅ Tu configuración es CORRECTA, solo espera la activación.\n');
        return;
      }
      
      throw new Error(`Respuesta inesperada: ${text}`);
    }

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Error:', data);
      
      if (data.error?.includes('not found')) {
        console.log('\n💡 El contacto no existe en WATI aún.');
        console.log('   Primero debe escribirte el usuario por WhatsApp.\n');
      }
      
      process.exit(1);
    }

    console.log('✅ ¡MENSAJE ENVIADO!\n');
    console.log('Respuesta:', JSON.stringify(data, null, 2));
    console.log('\n🎉 ¡WATI FUNCIONANDO CORRECTAMENTE!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\nSi ves "Offline Mode": Espera activación de WATI (hasta 24h)');
    console.log('Si ves otro error: Verifica credenciales\n');
  }
};

testWATISimple();
