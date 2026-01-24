// Square API integration functions

const square = require('square');
const { Client, Environment } = square;

// Initialize Square client
const getSquareClient = () => {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const environment = process.env.SQUARE_ENVIRONMENT === 'production' 
    ? Environment.Production 
    : Environment.Sandbox;

  if (!accessToken) {
    throw new Error('SQUARE_ACCESS_TOKEN is not configured');
  }

  return new Client({
    accessToken,
    environment
  });
};

/**
 * Create a Square Payment Link for subscription
 */
export async function createPaymentLink(data: {
  planId: string;
  planName: string;
  price: number;
  registrationId: string;
  customerEmail: string;
  customerName: string;
}) {
  try {
    const client = getSquareClient();
    const locationId = process.env.SQUARE_LOCATION_ID;

    if (!locationId) {
      throw new Error('SQUARE_LOCATION_ID is not configured');
    }

    // Create checkout with Square
    const response = await client.checkoutApi.createPaymentLink({
      idempotencyKey: `reg-${data.registrationId}-${Date.now()}`,
      quickPay: {
        name: `SaludCompartida - Plan ${data.planName}`,
        priceMoney: {
          amount: BigInt(data.price * 100), // Convert to cents
          currency: 'USD'
        },
        locationId
      },
      checkoutOptions: {
        allowTipping: false,
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?nuevo=true&codigo=${data.registrationId}`,
        askForShippingAddress: false,
        acceptedPaymentMethods: {
          applePay: true,
          googlePay: true,
          cashAppPay: false,
          afterpayClearpay: false
        }
      },
      prePopulatedData: {
        buyerEmail: data.customerEmail,
        buyerPhoneNumber: undefined
      }
    });

    if (response.result.paymentLink) {
      return {
        checkoutUrl: response.result.paymentLink.url,
        orderId: response.result.paymentLink.orderId || '',
        paymentLinkId: response.result.paymentLink.id
      };
    }

    throw new Error('Failed to create payment link');
  } catch (error) {
    console.error('Square Payment Link Error:', error);
    throw error;
  }
}

/**
 * Verify Square webhook signature
 */
export function verifyWebhookSignature(
  requestBody: string,
  signatureHeader: string,
  webhookSignatureKey: string,
  webhookUrl: string
): boolean {
  try {
    const crypto = require('crypto');
    
    // Construct the string to sign
    const stringToSign = webhookUrl + requestBody;
    
    // Create HMAC SHA-256 hash
    const hmac = crypto.createHmac('sha256', webhookSignatureKey);
    hmac.update(stringToSign);
    const expectedSignature = hmac.digest('base64');
    
    // Compare signatures
    return expectedSignature === signatureHeader;
  } catch (error) {
    console.error('Webhook verification error:', error);
    return false;
  }
}

/**
 * Get order details from Square
 */
export async function getOrder(orderId: string) {
  try {
    const client = getSquareClient();
    const response = await client.ordersApi.retrieveOrder(orderId);
    
    return response.result.order;
  } catch (error) {
    console.error('Get Order Error:', error);
    throw error;
  }
}

/**
 * Create Square customer
 */
export async function createCustomer(data: {
  email: string;
  givenName: string;
  familyName?: string;
  phoneNumber?: string;
  referenceId: string;
}) {
  try {
    const client = getSquareClient();
    
    const response = await client.customersApi.createCustomer({
      idempotencyKey: `cust-${data.referenceId}-${Date.now()}`,
      emailAddress: data.email,
      givenName: data.givenName,
      familyName: data.familyName,
      phoneNumber: data.phoneNumber,
      referenceId: data.referenceId
    });

    if (response.result.customer) {
      return {
        customerId: response.result.customer.id,
        createdAt: response.result.customer.createdAt
      };
    }

    throw new Error('Failed to create customer');
  } catch (error) {
    console.error('Create Customer Error:', error);
    throw error;
  }
}

/**
 * Create a subscription plan (catalog item)
 */
export async function createSubscriptionPlan(data: {
  name: string;
  price: number;
  cadence: 'MONTHLY' | 'ANNUAL';
}) {
  try {
    const client = getSquareClient();
    
    const response = await client.catalogApi.upsertCatalogObject({
      idempotencyKey: `plan-${data.name.toLowerCase()}-${Date.now()}`,
      object: {
        type: 'SUBSCRIPTION_PLAN',
        id: `#${data.name.toLowerCase()}-plan`,
        subscriptionPlanData: {
          name: `SaludCompartida ${data.name}`,
          phases: [
            {
              cadence: data.cadence,
              recurringPriceMoney: {
                amount: BigInt(data.price * 100),
                currency: 'USD'
              }
            }
          ]
        }
      }
    });

    return response.result.catalogObject;
  } catch (error) {
    console.error('Create Subscription Plan Error:', error);
    throw error;
  }
}

/**
 * Get payment details
 */
export async function getPayment(paymentId: string) {
  try {
    const client = getSquareClient();
    const response = await client.paymentsApi.getPayment(paymentId);
    
    return response.result.payment;
  } catch (error) {
    console.error('Get Payment Error:', error);
    throw error;
  }
}
