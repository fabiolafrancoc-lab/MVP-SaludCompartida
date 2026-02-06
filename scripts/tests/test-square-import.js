const square = require('square');

console.log('=== SQUARE MODULE STRUCTURE ===');
console.log('Type of square:', typeof square);
console.log('\n=== TOP LEVEL EXPORTS (primeros 20) ===');
const keys = Object.keys(square);
console.log(keys.slice(0, 20).join(', '));
console.log('\n=== BUSCANDO Client ===');
console.log('square.Client:', typeof square.Client);
console.log('square.default:', typeof square.default);
console.log('square.default?.Client:', square.default ? typeof square.default.Client : 'N/A');

// Intentar importar de diferentes formas
try {
  const { Client } = require('square');
  console.log('\n✅ Destructuring funciona, Client type:', typeof Client);
} catch (e) {
  console.log('\n❌ Destructuring falló:', e.message);
}
