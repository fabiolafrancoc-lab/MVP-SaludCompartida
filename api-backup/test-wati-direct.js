/**
 * TEST DIRECTO WATI - Probar diferentes estructuras de endpoint
 */

export default async function handler(req, res) {
  const { phone = '+523055227150' } = req.query;

  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImZmcmFuY29Ac2FsdWRjb21wYXJ0aWRhLmNvbSIsIm5hbWVpZCI6ImZmcmFuY29Ac2FsdWRjb21wYXJ0aWRhLmNvbSIsImVtYWlsIjoiZmZyYW5jb0BzYWx1ZGNvbXBhcnRpZGEuY29tIiwiYXV0aF90aW1lIjoiMDEvMTcvMjAyNiAyMToxMDozOCIsInRlbmFudF9pZCI6IjEwNzkxODUiLCJkYl9uYW1lIjoibXQtcHJvZC1UZW5hbnRzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQURNSU5JU1RSQVRPUiIsImV4cCI6MjUzNDAyMzAwODAwLCJpc3MiOiJDbGFyZV9BSSIsImF1ZCI6IkNsYXJlX0FJIn0.T3jiDtnHNlcN6VmJ6KbJOQh8cwXX1swfh2MbhuVs9N0';
  
  const results = [];

  // Estructura 1: Con tenant_id en URL (tu original)
  try {
    console.log('🧪 Test 1: https://live-mt-server.wati.io/1079185/api/v1/sendSessionMessage');
    const url1 = `https://live-mt-server.wati.io/1079185/api/v1/sendSessionMessage/${phone}`;
    const res1 = await fetch(url1, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messageText: '🧪 Test 1: Estructura con tenant_id en URL'
      })
    });
    
    const data1 = await res1.json();
    results.push({
      test: 'Estructura 1 (con /1079185/)',
      url: url1,
      status: res1.status,
      success: res1.ok,
      response: data1
    });
  } catch (err) {
    results.push({
      test: 'Estructura 1',
      error: err.message
    });
  }

  // Estructura 2: Sin tenant_id, solo base
  try {
    console.log('🧪 Test 2: https://live-mt-server.wati.io/api/v1/sendSessionMessage');
    const url2 = `https://live-mt-server.wati.io/api/v1/sendSessionMessage/${phone}`;
    const res2 = await fetch(url2, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messageText: '🧪 Test 2: Estructura sin tenant_id'
      })
    });
    
    const data2 = await res2.json();
    results.push({
      test: 'Estructura 2 (sin tenant_id)',
      url: url2,
      status: res2.status,
      success: res2.ok,
      response: data2
    });
  } catch (err) {
    results.push({
      test: 'Estructura 2',
      error: err.message
    });
  }

  // Estructura 3: Probar health check primero
  try {
    console.log('🧪 Test 3: Health check https://live-mt-server.wati.io/1079185/api/v1/getContacts');
    const url3 = `https://live-mt-server.wati.io/1079185/api/v1/getContacts?pageSize=1`;
    const res3 = await fetch(url3, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    });
    
    const data3 = await res3.json();
    results.push({
      test: 'Estructura 3 (Health check con tenant_id)',
      url: url3,
      status: res3.status,
      success: res3.ok,
      response: data3
    });
  } catch (err) {
    results.push({
      test: 'Estructura 3',
      error: err.message
    });
  }

  // Estructura 4: Health check sin tenant_id
  try {
    console.log('🧪 Test 4: Health check https://live-mt-server.wati.io/api/v1/getContacts');
    const url4 = `https://live-mt-server.wati.io/api/v1/getContacts?pageSize=1`;
    const res4 = await fetch(url4, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    });
    
    const data4 = await res4.json();
    results.push({
      test: 'Estructura 4 (Health check sin tenant_id)',
      url: url4,
      status: res4.status,
      success: res4.ok,
      response: data4
    });
  } catch (err) {
    results.push({
      test: 'Estructura 4',
      error: err.message
    });
  }

  return res.status(200).json({
    message: 'Pruebas de diferentes estructuras de endpoint WATI',
    phone_tested: phone,
    results: results,
    winner: results.find(r => r.success) || 'Ninguna estructura funcionó',
    instructions: 'Busca el test con success: true para saber la estructura correcta'
  });
}
