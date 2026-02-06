# Quick Guide: How to Get Square Payment Data for Backfill

## 🎯 Goal
Get the Square payment IDs for registrations 71, 72, and 74 so we can backfill them into the database.

## 📋 Step-by-Step Instructions

### 1. Log into Square Dashboard
- Go to https://squareup.com/dashboard
- Use your Square account credentials

### 2. Navigate to Payments
- Click on "Payments" in the left sidebar
- This shows all recent payments

### 3. Find Each $12 Payment
Look for:
- Amount: $12.00 USD
- Date: When the payment was made
- Last 4 digits of card (if you know them)

### 4. Click on Each Payment
For each payment, you need to collect:

#### Required Fields:
- **Payment ID**: Usually starts with `payment_` or similar
  - Location: Top of payment details page
  - Example: `payment_abc123xyz789`

- **Customer ID**: The Square customer ID
  - Location: In payment details, under "Customer" section
  - Example: `CUSTOMER123ABC456DEF789`

#### Optional but Helpful:
- **Subscription ID**: If this is a recurring subscription
  - Location: Under "Subscription" section if present
  - Example: `SUBSCRIPTION123ABC`

- **Invoice ID**: If payment was from an invoice
  - Location: Under "Invoice" section if present
  - Example: `INVOICE123ABC`

### 5. Match to Your Registrations

You need to know which Square payment goes with which registration:
- Registration 71 → Find user's email/name → Match to Square payment
- Registration 72 → Find user's email/name → Match to Square payment
- Registration 74 → Find user's email/name → Match to Square payment

**Tip:** Check the email address or name in Square payment details and match it to your Supabase registrations table.

### 6. Fill in the Backfill Script

Open `/scripts/backfill-square-payments.ts` and update:

```typescript
const PAYMENTS_TO_BACKFILL: PaymentToBackfill[] = [
  {
    registrationId: 71,
    squarePaymentId: 'payment_abc123xyz789',           // From Square
    squareCustomerId: 'CUSTOMER123ABC456DEF789',       // From Square
    squareSubscriptionId: 'SUBSCRIPTION123ABC',        // From Square (optional)
    squareInvoiceId: 'INVOICE123ABC',                  // From Square (optional)
    amountCents: 1200,                                 // $12.00 = 1200 cents
    paymentDate: '2026-02-05',                         // YYYY-MM-DD format
    status: 'COMPLETED',                               // Usually COMPLETED
  },
  {
    registrationId: 72,
    squarePaymentId: 'payment_def456uvw123',
    squareCustomerId: 'CUSTOMER456DEF789GHI012',
    squareSubscriptionId: 'SUBSCRIPTION456DEF',
    amountCents: 1200,
    paymentDate: '2026-02-05',
    status: 'COMPLETED',
  },
  {
    registrationId: 74,
    squarePaymentId: 'payment_ghi789rst456',
    squareCustomerId: 'CUSTOMER789GHI012JKL345',
    squareSubscriptionId: 'SUBSCRIPTION789GHI',
    amountCents: 1200,
    paymentDate: '2026-02-06',
    status: 'COMPLETED',
  },
];
```

### 7. Run the Backfill Script

```bash
npx tsx scripts/backfill-square-payments.ts
```

Expected output:
```
🔧 [BACKFILL] Starting Square payment backfill...

════════════════════════════════════════════════════════════════════════════════
Processing Registration 71
════════════════════════════════════════════════════════════════════════════════
🔍 Fetching registration...
✅ Found registration: user71@example.com
👤 Upserting Square customer...
✅ Customer upserted
📋 Upserting Square subscription...
✅ Subscription upserted, internal ID: 1
💰 Inserting Square payment...
✅ Payment inserted
📝 Updating registration...
✅ Registration updated to active

✨ Registration 71 successfully backfilled!
```

### 8. Verify in Supabase

Check your Supabase database:

```sql
-- Check registrations are now active
SELECT id, migrant_email, status, square_customer_id, square_payment_id
FROM registrations
WHERE id IN (71, 72, 74);

-- Check square_customers has 3 rows
SELECT COUNT(*) FROM square_customers;

-- Check square_payments has 3 rows
SELECT COUNT(*) FROM square_payments;

-- Check square_subscriptions (if subscriptions exist)
SELECT COUNT(*) FROM square_subscriptions;
```

All should show data now!

## 🔍 Troubleshooting

### "Can't find payment in Square Dashboard"
- Check date range filter (expand to show more dates)
- Search by amount ($12.00)
- Search by customer name/email

### "Payment exists but no Subscription ID"
This is normal if:
- Payment was one-time, not a subscription
- Leave `squareSubscriptionId` blank in script

### "Multiple payments for same user"
- Use the MOST RECENT successful payment
- Or include multiple entries in the backfill script

### "Don't know which payment belongs to which registration"
Run this SQL in Supabase:
```sql
SELECT id, migrant_email, migrant_first_name, migrant_last_name
FROM registrations
WHERE id IN (71, 72, 74);
```

Then match email/name to Square customer in payment details.

## 📞 Need Help?

If you're stuck:
1. Take a screenshot of the Square payment details page
2. Take a screenshot of the Supabase registrations for 71, 72, 74
3. The developer can help match them up

## ✅ Checklist

- [ ] Logged into Square Dashboard
- [ ] Found all 3 payments ($12 each)
- [ ] Collected Payment ID for each
- [ ] Collected Customer ID for each
- [ ] Collected Subscription ID (if exists)
- [ ] Matched payments to registrations 71, 72, 74
- [ ] Updated backfill script with data
- [ ] Ran backfill script
- [ ] Verified registrations are now `active` in Supabase
- [ ] Verified `square_payments` table has 3 rows
