# Square Payment Integration - Environment Variables

This document lists the required environment variables for the Square payment integration.

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# Square (PRODUCTION)
SQUARE_ACCESS_TOKEN=sq0atp-...   # Production access token from Square dashboard
SQUARE_LOCATION_ID=L...           # Your Square location ID
SQUARE_ENVIRONMENT=production     # Use "sandbox" for testing, "production" for live payments

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://rzmdekjegbdgitqekjee.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# App
NEXT_PUBLIC_APP_URL=https://saludcompartida.app  # Your app's public URL
```

## How to Get Square Credentials

1. **Access Token**: 
   - Log in to [Square Developer Dashboard](https://developer.squareup.com/)
   - Go to your application
   - Navigate to "Production" tab
   - Copy your Production Access Token

2. **Location ID**:
   - In Square Developer Dashboard
   - Go to "Locations" tab
   - Copy your location ID

3. **Environment**:
   - Set to `production` for real payments
   - Set to `sandbox` for testing (uses test credit cards)

## Database Schema

Run the SQL migration in Supabase SQL Editor:

```sql
-- See: scripts/add-square-payment-fields.sql
```

This adds:
- `migrant_email` and `family_email` columns
- `migrant_code` column (separate from `family_code`)
- `square_order_id` and `square_payment_id` tracking
- `payment_completed_at` timestamp
- `last_login_at` for login tracking
- Indexes for fast code lookups

## Testing

### Test with Sandbox Environment

1. Set `SQUARE_ENVIRONMENT=sandbox`
2. Use Square test credit cards:
   - Card: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date
   - ZIP: Any 5 digits

### Production Testing

⚠️ **WARNING**: Production environment charges real money!

- Use a real credit card
- Amount: $12.00 USD
- Refunds must be processed manually through Square dashboard

## API Endpoints

### Created Endpoints

1. **POST /api/create-square-checkout**
   - Creates Square payment link
   - Validates registration status
   - Returns checkout URL for redirect

2. **POST /api/square-webhook**
   - Receives payment status updates from Square
   - Activates registration when payment completes
   - Configure webhook URL in Square dashboard

### Webhook Configuration

1. Go to Square Developer Dashboard
2. Navigate to "Webhooks" section
3. Add endpoint: `https://your-domain.com/api/square-webhook`
4. Subscribe to event: `payment.updated`

## Pages Created

1. **/login** - User code entry
2. **/terms-acceptance** - Terms acceptance after first login
3. **/confirmacion** - Payment success page (shows both codes)

## Flow

1. User completes registration form → generates 2 codes
2. Redirected to Square checkout → pays $12
3. Square webhook activates registration
4. User redirected to confirmation page
5. User receives codes via WhatsApp/Email
6. User logs in with their code
7. First time: accepts terms
8. Subsequent times: direct to dashboard

## Security Notes

- Payment processing handled by Square (PCI compliant)
- No credit card data stored in application
- Service role key only used server-side
- All API routes validate registration status
- Codes are 6 characters, alphanumeric, unique
