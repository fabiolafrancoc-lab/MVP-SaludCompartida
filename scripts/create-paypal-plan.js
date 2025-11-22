// Script para crear Plan de Suscripción en PayPal Sandbox
const SANDBOX_CLIENT_ID = 'Acr924ZngcK1rVlLB0UUyvPYb5pSKkQB8rkZCk1burf7QZkl4HsKlDvuJJJGdoM_1KN3_z4dVRwp44iA';
const SANDBOX_SECRET = 'EO9DsshlUuFhnlrF7JA4U4V1KEuC96kffZkkYY69aDnIqkqnk2dqmGfUhClbE2GrWJbdBM36IEGSGdLZ';

async function createSubscriptionPlan() {
  try {
    // 1. Obtener Access Token
    const auth = Buffer.from(`${SANDBOX_CLIENT_ID}:${SANDBOX_SECRET}`).toString('base64');
    
    const tokenResponse = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });
    
    const { access_token } = await tokenResponse.json();
    console.log('✅ Access token obtenido');

    // 2. Crear Producto
    const productResponse = await fetch('https://api-m.sandbox.paypal.com/v1/catalogs/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'SaludCompartida Plan Familiar',
        description: 'Suscripción mensual para telemedicina y descuentos farmacéuticos',
        type: 'SERVICE',
        category: 'SOFTWARE'
      })
    });

    const product = await productResponse.json();
    console.log('✅ Producto creado:', product.id);

    // 3. Crear Plan de Suscripción
    const planResponse = await fetch('https://api-m.sandbox.paypal.com/v1/billing/plans', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: product.id,
        name: 'Plan Familiar Mensual',
        description: 'Suscripción mensual de $12 USD',
        billing_cycles: [{
          frequency: {
            interval_unit: 'MONTH',
            interval_count: 1
          },
          tenure_type: 'REGULAR',
          sequence: 1,
          total_cycles: 0, // 0 = infinito
          pricing_scheme: {
            fixed_price: {
              value: '12.00',
              currency_code: 'USD'
            }
          }
        }],
        payment_preferences: {
          auto_bill_outstanding: true,
          setup_fee_failure_action: 'CONTINUE',
          payment_failure_threshold: 3
        }
      })
    });

    const plan = await planResponse.json();
    console.log('✅ Plan creado:', plan.id);
    console.log('\n📋 COPIA ESTE PLAN ID PARA SANDBOX:');
    console.log(plan.id);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createSubscriptionPlan();
