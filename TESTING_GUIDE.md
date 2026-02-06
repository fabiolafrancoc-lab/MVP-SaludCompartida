# Testing Guide for Square Payment Integration

## Pre-Testing Setup

### 1. Environment Variables

Ensure these are set in your `.env.local`:

```bash
# Square - Use SANDBOX for testing
SQUARE_ACCESS_TOKEN=sq0atp-sandbox-...
SQUARE_LOCATION_ID=L...
SQUARE_ENVIRONMENT=sandbox  # Use "sandbox" for testing

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://rzmdekjegbdgitqekjee.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Or your deployed URL
```

### 2. Database Migration

Run the SQL migration in Supabase SQL Editor:

```sql
-- See: scripts/add-square-payment-fields.sql
```

Verify columns were added:
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'registrations'
AND column_name IN ('migrant_email', 'family_email', 'migrant_code', 'square_order_id');
```

### 3. Start Development Server

```bash
npm run dev
```

## Test Cases

### Test 1: Complete Registration Flow (Happy Path)

**Objective**: Test full registration and payment flow

**Steps**:
1. Navigate to `/registro-jan` or `/subscribe`
2. Fill out Step 1 (Migrant in USA):
   - First name: Juan
   - Last name: Pérez
   - Mother's last name: García
   - Sex: M
   - Birthdate: 01/01/1985 (age > 18)
   - Email: juan@example.com (valid email)
   - Phone: (555) 123-4567
3. Click "Continuar →"
4. Fill out Step 2 (Family in Mexico):
   - First name: María
   - Last name: Pérez
   - Mother's last name: López
   - Sex: F
   - Birthdate: 01/01/1960 (age > 55, should show "Lupita")
   - Email: maria@example.com
   - Phone: 55 1234 5678
   - Check terms and conditions
5. Click "Finalizar Registro"
6. Should redirect to Square checkout page
7. Use Square test card:
   - Card: 4111 1111 1111 1111
   - CVV: 123
   - Expiry: 12/25
   - ZIP: 12345
8. Complete payment
9. Should redirect to `/confirmacion`
10. Verify TWO different codes are displayed:
    - 🇺🇸 Code for migrant (6 characters)
    - 🇲🇽 Code for family (6 characters)

**Expected Results**:
- ✅ Both codes are different
- ✅ Registration saved with status='active' (after webhook)
- ✅ Both emails saved correctly
- ✅ Companion assigned correctly (Lupita for age 55+)

### Test 2: Age Validation (Under 18)

**Objective**: Verify age validation works

**Steps**:
1. Navigate to `/registro-jan`
2. Fill out Step 1 with birthdate: 01/01/2010 (age < 18)
3. Complete Step 2 with valid data
4. Click "Finalizar Registro"

**Expected Results**:
- ❌ Error message: "El migrante debe ser mayor de 18 años"
- ❌ Form not submitted

**Repeat for Step 2**:
- Use valid birthdate in Step 1
- Use birthdate < 18 in Step 2
- Expected error: "El usuario en México debe ser mayor de 18 años"

### Test 3: Email Validation

**Objective**: Verify email validation works

**Test invalid emails**:
- `test@` (no domain)
- `test@domain` (no TLD)
- `test@@domain.com` (double @)
- `test..user@domain.com` (consecutive dots)

**Steps**:
1. Fill out form with invalid email
2. Try to submit

**Expected Results**:
- ❌ Error message: "Email del migrante inválido" or "Email del usuario en México inválido"

### Test 4: Unique Code Generation

**Objective**: Verify two different codes are generated

**Steps**:
1. Complete registration multiple times (at least 5 times)
2. Check database for `migrant_code` and `family_code`

**Expected Results**:
- ✅ migrant_code ≠ family_code for each registration
- ✅ All codes are unique (no duplicates in database)
- ✅ Codes are exactly 6 characters
- ✅ Codes are alphanumeric (A-Z, 2-9, no 0,1,I,O)

### Test 5: Login Flow with Migrant Code

**Objective**: Test login with migrant code

**Steps**:
1. Navigate to `/login`
2. Enter the migrant code from Test 1
3. Click "Ingresar"
4. If first time:
   - Should redirect to `/terms-acceptance`
   - Should show migrant's name, email, phone
   - Should show assigned companion
   - Check terms checkbox
   - Click "Acepto y Continuar"
5. Should redirect to `/dashboard`

**Expected Results**:
- ✅ Login successful
- ✅ User type = 'migrant' in sessionStorage
- ✅ Shows migrant's information
- ✅ Terms accepted saved to database

### Test 6: Login Flow with Family Code

**Objective**: Test login with family code

**Steps**:
1. Navigate to `/login`
2. Enter the family code from Test 1
3. Click "Ingresar"

**Expected Results**:
- ✅ Login successful
- ✅ User type = 'family' in sessionStorage
- ✅ Shows family member's information (not migrant's)
- ✅ Shows Mexican phone number (+52)

### Test 7: Invalid Code Login

**Objective**: Test login with invalid code

**Steps**:
1. Navigate to `/login`
2. Enter: `XXXXXX` (invalid code)
3. Click "Ingresar"

**Expected Results**:
- ❌ Error message: "Código no válido. Verifica e intenta de nuevo."

### Test 8: Pending Payment Login

**Objective**: Test login with unpaid registration

**Steps**:
1. Create a registration but don't complete payment
2. Navigate to `/login`
3. Enter the code from pending registration
4. Click "Ingresar"

**Expected Results**:
- ❌ Error message: "Este código está pendiente de pago. Completa el pago primero."

### Test 9: Companion Assignment

**Objective**: Verify companion is assigned correctly

**Test cases**:
- Age 60 → Lupita
- Age 55 → Lupita (boundary)
- Age 54 → Fernanda
- Age 30 → Fernanda
- Age 25 → Fernanda

**Steps**:
1. Fill form with different birthdates
2. Check Step 2 header shows correct companion
3. After registration, verify in database

**Expected Results**:
- ✅ Age >= 55 → companion_assigned = 'lupita'
- ✅ Age < 55 → companion_assigned = 'fernanda'

### Test 10: Payment Amount Validation

**Objective**: Verify only $12.00 is accepted

**Steps**:
1. Try to call `/api/create-square-checkout` with different amount
   ```bash
   curl -X POST http://localhost:3000/api/create-square-checkout \
     -H "Content-Type: application/json" \
     -d '{"registration_id": "xxx", "amount": 1500}'
   ```

**Expected Results**:
- ❌ Error: "Invalid amount"
- ✅ Only accepts amount=1200 (exactly $12.00)

### Test 11: Duplicate Registration Prevention

**Objective**: Verify same registration can't be paid twice

**Steps**:
1. Complete a registration and payment
2. Try to create checkout again with same registration_id

**Expected Results**:
- ❌ Error: "Already paid"
- ✅ Prevents double charging

### Test 12: Redirect to registro-jan

**Objective**: Verify subscribe page redirects correctly

**Steps**:
1. Navigate to `/subscribe`
2. Should immediately redirect to `/registro-jan`

**With query params**:
```
/subscribe?name=Test&email=test@example.com
→ /registro-jan?name=Test&email=test@example.com
```

**Expected Results**:
- ✅ Redirects to `/registro-jan`
- ✅ Query parameters preserved

## Database Verification Queries

After each test, verify data in Supabase:

```sql
-- View latest registration
SELECT 
  id,
  migrant_code,
  family_code,
  migrant_first_name,
  migrant_email,
  family_first_name,
  family_email,
  companion_assigned,
  status,
  square_order_id,
  payment_completed_at
FROM registrations
ORDER BY created_at DESC
LIMIT 1;

-- Check for duplicate codes
SELECT migrant_code, COUNT(*) 
FROM registrations 
GROUP BY migrant_code 
HAVING COUNT(*) > 1;

SELECT family_code, COUNT(*) 
FROM registrations 
GROUP BY family_code 
HAVING COUNT(*) > 1;

-- View all active registrations
SELECT COUNT(*) as active_count
FROM registrations
WHERE status = 'active';
```

## Square Dashboard Verification

1. Log in to [Square Dashboard](https://squareup.com/dashboard)
2. Navigate to "Payments" → "Transactions"
3. Verify test payments appear
4. Check payment details match registration

## Webhook Testing

### Manual Webhook Test

```bash
curl -X POST http://localhost:3000/api/square-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "type": "payment.updated",
    "data": {
      "object": {
        "payment": {
          "id": "test_payment_123",
          "status": "COMPLETED",
          "orderId": "YOUR_ORDER_ID_HERE"
        }
      }
    }
  }'
```

**Expected Results**:
- ✅ Registration status updated to 'active'
- ✅ payment_completed_at timestamp set
- ✅ Console log: "✅ Registration activated"

## Production Testing Checklist

⚠️ **ONLY test in production when ready for real payments!**

- [ ] Update `SQUARE_ENVIRONMENT=production`
- [ ] Update `SQUARE_ACCESS_TOKEN` to production token
- [ ] Test with real credit card
- [ ] Verify $12.00 USD charge
- [ ] Verify codes sent via WhatsApp/Email
- [ ] Verify login works
- [ ] Monitor for any errors
- [ ] Test refund process if needed (manual via Square Dashboard)

## Common Issues & Solutions

**Issue**: Build fails with Square environment error
- **Solution**: Ensure `SQUARE_ENVIRONMENT` is set to either 'sandbox' or 'production'

**Issue**: Codes not showing on confirmation page
- **Solution**: Check browser console, verify sessionStorage has registration data

**Issue**: Login always fails
- **Solution**: Verify payment webhook completed, check registration status in database

**Issue**: Webhook not receiving events
- **Solution**: Configure webhook URL in Square Dashboard, use ngrok for local testing

**Issue**: Email validation too strict
- **Solution**: RFC 5322 compliant regex is used, some rare valid emails may fail

## Performance Testing

Test with multiple concurrent registrations:
```bash
# Run 10 registrations simultaneously
for i in {1..10}; do
  # Create registration
  # Complete payment
  # Verify codes are unique
done
```

**Expected Results**:
- ✅ All codes are unique
- ✅ No race conditions
- ✅ Database constraints prevent duplicates
