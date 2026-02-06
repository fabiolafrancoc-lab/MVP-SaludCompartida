# Square Webhook Fix - Complete Documentation

## 🔴 Problem Summary

**Issue:** Payments were being processed successfully in Square ($12 charges appearing in Square dashboard), but the Supabase database was not being updated:
- Registrations 71, 72, 74 remained in `pending_payment` status
- Square fields (`square_customer_id`, `square_subscription_id`, `square_payment_id`) were NULL
- `square_subscriptions` and `square_payments` tables had 0 rows

**Root Cause:** The webhook handler had several critical issues:
1. ❌ No signature validation (security risk)
2. ❌ Looking for `square_order_id` which doesn't exist in subscription flow
3. ❌ Using wrong event type (`payment.completed` doesn't exist)
4. ❌ Not inserting into `square_customers`, `square_subscriptions`, or `square_payments` tables
5. ❌ No idempotency handling (could create duplicates)
6. ❌ No webhook event logging
7. ❌ Potentially using anon key (RLS would block inserts)

## ✅ Solution Implemented

### 1. Fixed Webhook Handler (`/src/app/api/webhooks/square/route.ts`)

**New Features:**
- ✅ **Signature Validation**: Verifies `X-Square-HMACSHA256-Signature` header
- ✅ **Event Logging**: All webhooks logged to `square_webhooks` table for auditing
- ✅ **Idempotent Operations**: Checks for existing records before inserting
- ✅ **Comprehensive Event Handling**:
  - `subscription.created` / `subscription.updated`
  - `payment.created` / `payment.updated`
  - `invoice.payment_made` / `invoice.paid`
- ✅ **Database Updates**:
  - Upserts to `square_customers`
  - Upserts to `square_subscriptions`
  - Inserts/updates to `square_payments`
  - Updates `registrations` status to `active`
- ✅ **Email Notifications**: Sends welcome emails on first activation
- ✅ **Error Handling**: Comprehensive logging and error tracking

### 2. Created Backfill Script (`/scripts/backfill-square-payments.ts`)

**Purpose:** Manually reconcile existing Square payments that were missed

**Usage:**
```bash
# 1. Edit the script and add your payment data
nano scripts/backfill-square-payments.ts

# 2. Run the script
npx tsx scripts/backfill-square-payments.ts
```

**What it does:**
- Fetches Square payment data you provide
- Creates records in `square_customers`, `square_subscriptions`, `square_payments`
- Updates `registrations` to `active` status
- Sets `activated_at`, `last_payment_at` timestamps
- Links all Square IDs to registration

## 🔧 Setup Instructions

### Step 1: Configure Square Webhook

1. **Go to Square Developer Dashboard**
   - URL: https://developer.squareup.com/

2. **Navigate to Webhooks**
   - Select your application
   - Click on "Webhooks" tab

3. **Add Webhook Endpoint**
   ```
   URL: https://your-domain.vercel.app/api/webhooks/square
   ```

4. **Subscribe to Events**
   - ✅ `subscription.created`
   - ✅ `subscription.updated`
   - ✅ `payment.created`
   - ✅ `payment.updated`
   - ✅ `invoice.payment_made`
   - ✅ `invoice.paid`

5. **Get Signature Key** (Optional but recommended)
   - Copy the "Signature Key" from Square dashboard
   - Add to your environment variables:
     ```bash
     SQUARE_WEBHOOK_SIGNATURE_KEY=your_signature_key_here
     ```

### Step 2: Verify Environment Variables

Ensure you have these variables set in Vercel/`.env`:

```bash
# Square API
SQUARE_ACCESS_TOKEN=sq0atp-...
SQUARE_LOCATION_ID=L...
SQUARE_PLAN_VARIATION_ID=VU76FHKSAXPGGJT2MM72WKSZ
SQUARE_WEBHOOK_SIGNATURE_KEY=wh_signature_key... # Optional but recommended

# Supabase (MUST have service role key)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbG... # CRITICAL - needed to bypass RLS
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...

# Email
RESEND_API_KEY=re_...
```

⚠️ **CRITICAL**: `SUPABASE_SERVICE_ROLE_KEY` must be set! Without it, the webhook handler will use the anon key and RLS will block all inserts to `square_*` tables.

### Step 3: Backfill Existing Payments

For registrations 71, 72, 74 that already have charges:

1. **Get Square Payment Data**
   - Log into Square Dashboard
   - Go to Payments tab
   - Find each $12 charge by date/last 4 digits
   - Click on each payment to see:
     - Payment ID
     - Customer ID
     - Subscription ID (if applicable)
     - Invoice ID (if applicable)

2. **Update Backfill Script**
   ```typescript
   const PAYMENTS_TO_BACKFILL: PaymentToBackfill[] = [
     {
       registrationId: 71,
       squarePaymentId: 'PAYMENT_ID_FROM_SQUARE',
       squareCustomerId: 'CUSTOMER_ID_FROM_SQUARE',
       squareSubscriptionId: 'SUBSCRIPTION_ID_FROM_SQUARE', // if exists
       amountCents: 1200,
       paymentDate: '2026-02-05',
       status: 'COMPLETED',
     },
     // Add registrations 72 and 74...
   ];
   ```

3. **Run Backfill**
   ```bash
   npx tsx scripts/backfill-square-payments.ts
   ```

4. **Verify Results**
   - Check Supabase `registrations` table: status should be `active`
   - Check `square_customers`: should have 3 rows
   - Check `square_subscriptions`: should have subscriptions if they exist
   - Check `square_payments`: should have 3 payment records

### Step 4: Test Webhook

1. **Option A: Make a Test Payment**
   - Use Square sandbox environment
   - Create a test subscription
   - Verify webhook fires and database updates

2. **Option B: Replay Webhook from Square**
   - In Square Dashboard > Webhooks
   - Find recent webhook events
   - Click "Resend" to replay

3. **Option C: Manual Test**
   ```bash
   curl -X POST https://your-domain.vercel.app/api/webhooks/square \
     -H "Content-Type: application/json" \
     -d '{
       "type": "payment.created",
       "data": {
         "object": {
           "payment": {
             "id": "TEST_PAYMENT_ID",
             "customer_id": "EXISTING_CUSTOMER_ID",
             "status": "COMPLETED",
             "amount_money": { "amount": 1200, "currency": "USD" }
           }
         }
       }
     }'
   ```

### Step 5: Monitor Webhooks

Check webhook logs in Supabase:

```sql
-- View recent webhooks
SELECT 
  event_type,
  square_event_id,
  processed,
  processing_error,
  created_at
FROM square_webhooks
ORDER BY created_at DESC
LIMIT 20;

-- View unprocessed webhooks
SELECT * FROM square_webhooks 
WHERE processed = false;

-- View failed webhooks
SELECT * FROM square_webhooks 
WHERE processing_error IS NOT NULL;
```

## 📊 Database Schema

### RLS Policies

The `square_*` tables have RLS enabled with service role only access:

```sql
CREATE POLICY "Service role only" ON square_customers 
FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role only" ON square_subscriptions 
FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role only" ON square_payments 
FOR ALL USING (auth.role() = 'service_role');
```

This is why `SUPABASE_SERVICE_ROLE_KEY` is required!

## 🔍 Debugging

### Check if webhook is receiving events

```bash
# In Vercel logs, search for:
"SQUARE WEBHOOK"

# You should see:
🔔 [SQUARE WEBHOOK] Incoming webhook request
📨 [SQUARE WEBHOOK] Event type: payment.created
✅ [SQUARE WEBHOOK] Completed in XXXms
```

### Check webhook logs in database

```sql
SELECT * FROM square_webhooks ORDER BY created_at DESC LIMIT 10;
```

### Check if service role key is being used

Look for this warning in logs:
```
⚠️ Using NEXT_PUBLIC_SUPABASE_ANON_KEY instead of service role key
```

If you see this, the webhook WILL fail due to RLS. Set `SUPABASE_SERVICE_ROLE_KEY`!

### Common Issues

1. **"Registration not found"**
   - Webhook received but no matching `square_customer_id` in registrations
   - Solution: Run backfill script first OR check that payment flow creates customer

2. **"Insert violates RLS policy"**
   - Using anon key instead of service role key
   - Solution: Set `SUPABASE_SERVICE_ROLE_KEY` environment variable

3. **"Invalid signature"**
   - Webhook signature doesn't match
   - Solution: Verify `SQUARE_WEBHOOK_SIGNATURE_KEY` is correct OR remove it to skip validation (not recommended for production)

4. **Webhooks not being received**
   - Check Square Dashboard > Webhooks > Event Log
   - Verify webhook URL is correct and accessible
   - Check firewall/Vercel routing

## 🔐 Security Considerations

1. **Always use signature validation in production**
   - Set `SQUARE_WEBHOOK_SIGNATURE_KEY`
   - Webhook handler will verify signatures

2. **Never expose service role key in client-side code**
   - Only use in API routes and server components
   - Never in React components or pages

3. **Use environment variables**
   - Never commit keys to git
   - Use Vercel environment variables

## 📈 Future Improvements

- [ ] Add retry logic for failed webhook processing
- [ ] Add alerting for consecutive webhook failures
- [ ] Create admin dashboard to view webhook history
- [ ] Add webhook replay functionality
- [ ] Implement webhook event queue for high volume

## 📞 Support

If issues persist:
1. Check Vercel logs for errors
2. Check Supabase `square_webhooks` table for failed events
3. Verify all environment variables are set
4. Test webhook with curl command above
5. Check Square Dashboard webhook event log

## ✅ Checklist

- [ ] Webhook endpoint configured in Square Dashboard
- [ ] All required environment variables set (especially `SUPABASE_SERVICE_ROLE_KEY`)
- [ ] Webhook events subscribed (subscription.*, payment.*, invoice.*)
- [ ] Backfill script run for existing payments (71, 72, 74)
- [ ] Test webhook fired and processed successfully
- [ ] Verified registrations updated to `active`
- [ ] Verified `square_payments` table populated
- [ ] Webhook logging enabled and working
- [ ] Signature validation configured (optional but recommended)
