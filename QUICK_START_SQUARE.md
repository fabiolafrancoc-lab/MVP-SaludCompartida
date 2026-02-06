# Square Webhook Integration - Quick Start

## ✅ What Was Fixed

Your Square webhook integration had several critical issues that prevented payments from updating your database:

1. **❌ Wrong event type**: Looking for `payment.completed` which doesn't exist
2. **❌ No database inserts**: Webhook wasn't writing to `square_customers`, `square_subscriptions`, or `square_payments` tables
3. **❌ No signature validation**: Security risk
4. **❌ No error logging**: No way to debug issues
5. **❌ Wrong lookup field**: Looking for `square_order_id` instead of `square_customer_id`

### ✅ Now Fixed

- ✅ Handles proper Square events: `subscription.created`, `subscription.updated`, `payment.created`, `payment.updated`, `invoice.payment_made`
- ✅ Inserts/updates all Square tables properly
- ✅ Updates registration status to `active` when payment succeeds
- ✅ Validates webhook signatures for security
- ✅ Logs all webhooks to `square_webhooks` table
- ✅ Idempotent operations (prevents duplicates)

## 🚀 Quick Setup (5 Minutes)

### Step 1: Configure Square Webhook (2 min)

1. Go to https://developer.squareup.com/
2. Click on your application
3. Go to "Webhooks" tab
4. Add endpoint URL:
   ```
   https://your-vercel-app.vercel.app/api/webhooks/square
   ```
5. Subscribe to these events:
   - ✅ `subscription.created`
   - ✅ `subscription.updated`
   - ✅ `payment.created`
   - ✅ `payment.updated`
   - ✅ `invoice.payment_made`
   - ✅ `invoice.paid`

6. Copy the "Signature Key" and add to Vercel environment variables:
   ```
   SQUARE_WEBHOOK_SIGNATURE_KEY=wh_...your_key_here...
   ```

### Step 2: Verify Environment Variables (1 min)

Make sure you have in Vercel:

```bash
# CRITICAL - Must have this!
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# Also needed
SQUARE_ACCESS_TOKEN=sq0atp-...
SQUARE_LOCATION_ID=L...
SQUARE_PLAN_VARIATION_ID=VU76FHKSAXPGGJT2MM72WKSZ

# Optional but recommended
SQUARE_WEBHOOK_SIGNATURE_KEY=wh_...
```

⚠️ **Without `SUPABASE_SERVICE_ROLE_KEY`, the webhook will fail due to RLS!**

### Step 3: Backfill Existing Payments (2 min)

For registrations 71, 72, 74 that already paid:

1. **Get Square payment data** (see `SQUARE_BACKFILL_GUIDE.md`)
   - Go to Square Dashboard > Payments
   - Find each $12 payment
   - Copy: Payment ID, Customer ID, Subscription ID (if any)

2. **Update backfill script**
   ```bash
   nano scripts/backfill-square-payments.ts
   ```
   
   Add your payment data:
   ```typescript
   const PAYMENTS_TO_BACKFILL = [
     {
       registrationId: 71,
       squarePaymentId: 'payment_...',      // From Square
       squareCustomerId: 'CUSTOMER...',     // From Square
       squareSubscriptionId: 'SUBSCRIPTION...', // From Square (optional)
       amountCents: 1200,
       paymentDate: '2026-02-05',
       status: 'COMPLETED',
     },
     // Add 72 and 74...
   ];
   ```

3. **Run backfill**
   ```bash
   npx tsx scripts/backfill-square-payments.ts
   ```

4. **Verify in Supabase**
   ```sql
   SELECT id, migrant_email, status, square_customer_id, square_payment_id
   FROM registrations
   WHERE id IN (71, 72, 74);
   ```
   
   Should show `status = 'active'` with Square IDs populated!

## ✅ Test It Works

### Option A: Make a Test Payment
- Create a new registration
- Complete payment
- Check webhook fires
- Verify database updates

### Option B: Replay Existing Webhook
- Go to Square Dashboard > Webhooks > Event Log
- Find recent webhook
- Click "Resend"
- Check Supabase `square_webhooks` table

### Option C: Manual Curl Test
```bash
curl -X POST https://your-app.vercel.app/api/webhooks/square \
  -H "Content-Type: application/json" \
  -d '{
    "type": "payment.created",
    "event_id": "test_123",
    "data": {
      "object": {
        "payment": {
          "id": "TEST_PAY_123",
          "customer_id": "EXISTING_CUSTOMER_ID",
          "status": "COMPLETED",
          "amount_money": { "amount": 1200, "currency": "USD" }
        }
      }
    }
  }'
```

## 🔍 Debugging

### Check Webhook Logs in Vercel
Search for: `SQUARE WEBHOOK`

You should see:
```
🔔 [SQUARE WEBHOOK] Incoming webhook request
📨 [SQUARE WEBHOOK] Event type: payment.created
✅ [SQUARE WEBHOOK] Completed in 234ms
```

### Check Webhook Logs in Supabase
```sql
SELECT * FROM square_webhooks ORDER BY created_at DESC LIMIT 10;
```

### Check Registration Status
```sql
SELECT id, status, square_customer_id, square_payment_id
FROM registrations
WHERE id IN (71, 72, 74);
```

### Common Issues

**"Registration not found"**
- Webhook received but no matching customer_id
- Run backfill script first

**"Insert violates RLS policy"**  
- Missing `SUPABASE_SERVICE_ROLE_KEY`
- Add it to Vercel environment variables

**"Invalid signature"**
- Wrong `SQUARE_WEBHOOK_SIGNATURE_KEY`
- Or remove it to skip validation (not recommended)

**Webhooks not received**
- Check Square Dashboard > Webhooks > Event Log
- Verify URL is correct
- Check Vercel logs for errors

## 📚 Full Documentation

- **Setup Guide**: `SQUARE_WEBHOOK_FIX.md`
- **Backfill Guide**: `SQUARE_BACKFILL_GUIDE.md`
- **SQL Queries**: `scripts/sql/square-debugging-queries.sql`
- **Backfill Script**: `scripts/backfill-square-payments.ts`

## ✅ Checklist

- [ ] Webhook URL configured in Square Dashboard
- [ ] Events subscribed (subscription.*, payment.*, invoice.*)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set in Vercel
- [ ] `SQUARE_WEBHOOK_SIGNATURE_KEY` set in Vercel (optional)
- [ ] Backfill script updated with payment data
- [ ] Backfill script executed
- [ ] Registrations 71, 72, 74 now show `active` status
- [ ] Test webhook fires and processes successfully
- [ ] Monitor `square_webhooks` table for new events

## 🎉 Success!

Once complete:
- ✅ Future payments will automatically update database
- ✅ Registrations will activate immediately
- ✅ All Square data will be tracked
- ✅ Webhook events logged for debugging
- ✅ No more manual database updates needed!

---

**Need help?** Check the full documentation in `SQUARE_WEBHOOK_FIX.md` or review webhook logs in Supabase.
