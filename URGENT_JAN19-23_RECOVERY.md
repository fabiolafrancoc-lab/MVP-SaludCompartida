# URGENT: Recover Missing January 19-23 Payments

## 🚨 Critical Issue Identified

**PROBLEM:** Square shows successful payments from **January 19-23, 2026**, but these are **NOT in your Supabase database**.

**IMPACT:** Lost customer records, no way to contact these customers, no service activation.

## 📊 Data Gap Summary

| Date Range | Square Payments | Supabase Records | Status |
|------------|----------------|------------------|---------|
| Jan 19-23, 2026 | ✅ EXISTS | ❌ MISSING | 🚨 CRITICAL |
| Jan 24-30, 2026 | Unknown | ❌ MISSING | ⚠️ Check Square |
| Jan 31-Feb 6, 2026 | ✅ EXISTS | ✅ EXISTS | ⚠️ Partial (need backfill) |

## 🔍 Root Cause

1. **Webhook Not Configured:** Webhook endpoint didn't exist until after Jan 23
2. **Database Created Later:** Supabase `registrations` table created around Jan 29-31
3. **No Backfill Run:** Historical data never imported from Square
4. **Webhook Retries Expired:** Square attempted delivery but got no response

## 🎯 Recovery Steps - DO THIS NOW

### Step 1: Get ALL Square Payments (Jan 19-23)

1. **Log into Square Dashboard**
   - Go to https://squareup.com/dashboard
   - Navigate to **Payments** tab

2. **Filter by Date**
   - Start Date: January 19, 2026
   - End Date: January 23, 2026
   - Status: Completed/Successful

3. **Export Payment List**
   - Click on each payment individually
   - Collect this information for EACH:

   ```
   Payment ID: _______________________
   Customer ID: ______________________
   Customer Email: ___________________
   Customer Name: ____________________
   Customer Phone: ___________________
   Amount: $_________
   Date: _____________
   Subscription ID (if any): __________
   Invoice ID (if any): _______________
   Card Last 4: _______
   ```

4. **Create Spreadsheet**
   
   | Payment Date | Payment ID | Customer ID | Email | Name | Phone | Amount | Subscription ID |
   |--------------|-----------|-------------|-------|------|-------|--------|-----------------|
   | 2026-01-19 | pay_xxx | cust_xxx | email@example.com | John Doe | 555-1234 | $12.00 | sub_xxx |
   | ... | ... | ... | ... | ... | ... | ... | ... |

### Step 2: Match Square Data to Expected User Flow

For each payment, determine:

**What information was captured during registration?**
- Look in Square customer notes
- Check subscription metadata
- Review any custom fields

**User details needed for database:**
```
Migrant (Subscriber in USA):
- First Name
- Last Name
- Email (from Square)
- Phone (from Square)
- State

Family (Beneficiary in Mexico):
- First Name
- Last Name
- Email
- Phone
- Country Code (52)
- Relationship
```

### Step 3: Manual Database Insert

For EACH payment from Jan 19-23, run this SQL in Supabase:

```sql
-- Insert registration for Jan 19-23 payment
INSERT INTO registrations (
  -- Migrant info (from Square)
  migrant_email,
  migrant_first_name,
  migrant_last_name,
  migrant_phone,
  migrant_state,
  migrant_country_code,
  
  -- Family info (from Square metadata or notes)
  family_first_name,
  family_last_name,
  family_email,
  family_phone,
  family_country_code,
  family_country,
  
  -- Plan info
  plan_id,
  plan_name,
  plan_price,
  
  -- Square IDs (CRITICAL - from dashboard)
  square_customer_id,
  square_subscription_id,
  square_payment_id,
  
  -- Status
  status,
  
  -- Access codes (generate new)
  migrant_code,
  family_code,
  
  -- Dates
  activated_at,
  last_payment_at,
  created_at,
  updated_at,
  
  -- Terms
  terms_accepted
) VALUES (
  -- Replace with actual values from Square
  'customer@email.com',           -- migrant_email
  'FirstName',                     -- migrant_first_name
  'LastName',                      -- migrant_last_name
  '3051234567',                    -- migrant_phone
  'FL',                            -- migrant_state
  1,                               -- migrant_country_code (USA)
  
  'FamilyFirstName',               -- family_first_name
  'FamilyLastName',                -- family_last_name
  'family@email.com',              -- family_email
  '5512345678',                    -- family_phone
  52,                              -- family_country_code (Mexico)
  'MX',                            -- family_country
  
  'plan_mensual',                  -- plan_id
  'Plan Familiar Mensual',         -- plan_name
  12,                              -- plan_price
  
  'CUSTOMER_ID_FROM_SQUARE',       -- square_customer_id
  'SUBSCRIPTION_ID_FROM_SQUARE',   -- square_subscription_id
  'PAYMENT_ID_FROM_SQUARE',        -- square_payment_id
  
  'active',                        -- status
  
  -- Generate random 6-char codes
  substr(md5(random()::text), 1, 6),  -- migrant_code
  substr(md5(random()::text), 1, 6),  -- family_code
  
  '2026-01-19 12:00:00+00',       -- activated_at (use actual payment date)
  '2026-01-19 12:00:00+00',       -- last_payment_at
  '2026-01-19 12:00:00+00',       -- created_at
  NOW(),                           -- updated_at
  
  true                             -- terms_accepted
);
```

### Step 4: Create Square Table Records

For each payment, also create entries in Square tracking tables:

```sql
-- Insert into square_customers
INSERT INTO square_customers (
  registration_id,
  square_customer_id,
  migrant_email,
  migrant_first_name,
  migrant_last_name,
  migrant_phone,
  created_at
) VALUES (
  (SELECT id FROM registrations WHERE square_customer_id = 'CUSTOMER_ID_FROM_SQUARE'),
  'CUSTOMER_ID_FROM_SQUARE',
  'customer@email.com',
  'FirstName',
  'LastName',
  '3051234567',
  '2026-01-19 12:00:00+00'
);

-- Insert into square_subscriptions (if subscription exists)
INSERT INTO square_subscriptions (
  registration_id,
  square_customer_id,
  square_subscription_id,
  square_plan_variation_id,
  status,
  start_date,
  created_at
) VALUES (
  (SELECT id FROM registrations WHERE square_customer_id = 'CUSTOMER_ID_FROM_SQUARE'),
  'CUSTOMER_ID_FROM_SQUARE',
  'SUBSCRIPTION_ID_FROM_SQUARE',
  'PLAN_VARIATION_ID',
  'ACTIVE',
  '2026-01-19',
  '2026-01-19 12:00:00+00'
);

-- Insert into square_payments
INSERT INTO square_payments (
  subscription_id,
  square_subscription_id,
  square_customer_id,
  square_payment_id,
  amount_cents,
  status,
  payment_date,
  billing_period_start,
  created_at
) VALUES (
  (SELECT id FROM square_subscriptions WHERE square_subscription_id = 'SUBSCRIPTION_ID_FROM_SQUARE'),
  'SUBSCRIPTION_ID_FROM_SQUARE',
  'CUSTOMER_ID_FROM_SQUARE',
  'PAYMENT_ID_FROM_SQUARE',
  1200,
  'COMPLETED',
  '2026-01-19',
  '2026-01-19',
  '2026-01-19 12:00:00+00'
);
```

### Step 5: Alternative - Use Backfill Script

If you have all the data, use the existing backfill script:

```bash
# Edit scripts/backfill-square-payments.ts
nano scripts/backfill-square-payments.ts

# Add Jan 19-23 payments to PAYMENTS_TO_BACKFILL array
const PAYMENTS_TO_BACKFILL = [
  {
    registrationId: null,  // Will create new
    squarePaymentId: 'PAYMENT_ID_FROM_JAN_19',
    squareCustomerId: 'CUSTOMER_ID_FROM_JAN_19',
    squareSubscriptionId: 'SUBSCRIPTION_ID_FROM_JAN_19',
    amountCents: 1200,
    paymentDate: '2026-01-19',
    status: 'COMPLETED',
    // Add user info for registration creation
    migrantEmail: 'email@example.com',
    migrantFirstName: 'FirstName',
    // ... etc
  },
  // Repeat for each Jan 19-23 payment
];

# Run script
npx tsx scripts/backfill-square-payments.ts
```

## 🔍 Verification

After backfill, verify:

```sql
-- Check registrations from Jan 19-23 exist
SELECT 
  id,
  migrant_email,
  status,
  square_customer_id,
  square_payment_id,
  created_at,
  activated_at
FROM registrations
WHERE created_at >= '2026-01-19'
  AND created_at < '2026-01-24'
ORDER BY created_at;

-- Check square_payments from Jan 19-23
SELECT 
  square_payment_id,
  square_customer_id,
  amount_cents,
  status,
  payment_date
FROM square_payments
WHERE payment_date >= '2026-01-19'
  AND payment_date < '2026-01-24'
ORDER BY payment_date;
```

## 📧 Customer Communication

After recovering data, you MUST contact these customers:

1. **Send Welcome Email**
   - Apologize for delay
   - Provide their access codes (migrant_code, family_code)
   - Explain how to use the service

2. **Send WhatsApp to Family in Mexico**
   - Use family_code
   - Provide instructions in Spanish

3. **Verify Service Works**
   - Have them test login
   - Verify they can access dashboard

## ⚠️ Prevention

To prevent this from happening again:

1. ✅ **Webhook is now fixed** (this PR)
2. ✅ **Square tables created** (this PR)
3. ✅ **Monitoring added** (square_webhooks table)
4. 🔄 **Set up daily check:** Compare Square vs Supabase counts
5. 🔄 **Alert on discrepancies:** Automated alert if counts don't match

## 📁 Related Files

- `scripts/backfill-square-payments.ts` - Automated backfill tool
- `HISTORICAL_DATA_ANALYSIS.md` - Full analysis of the issue
- `SQUARE_WEBHOOK_FIX.md` - Technical fix documentation
- `SQUARE_BACKFILL_GUIDE.md` - How to get Square data

## ✅ Checklist

- [ ] Logged into Square Dashboard
- [ ] Filtered payments Jan 19-23, 2026
- [ ] Collected ALL payment IDs, customer IDs, subscription IDs
- [ ] Collected customer emails, names, phones
- [ ] Created spreadsheet with data
- [ ] Ran SQL inserts OR backfill script for each payment
- [ ] Verified registrations created
- [ ] Verified square_customers created
- [ ] Verified square_payments created
- [ ] Generated access codes for each customer
- [ ] Sent welcome emails with codes
- [ ] Sent WhatsApp to families in Mexico
- [ ] Verified customers can log in
- [ ] Documented how many customers recovered

---

**URGENCY:** These customers paid 2+ weeks ago and have NO SERVICE. This is a critical customer service issue that must be resolved immediately.
