# Square Payment Data - January 19-23, 2026

## 🔍 Identified Transactions (6 Total)

Based on Square export data, here are the missing payments:

| Date | Time (ET) | Transaction ID | Payment ID | Amount | Card Type | Last 4 |
|------|-----------|----------------|------------|--------|-----------|--------|
| 1/23/26 | 22:17:24 | 9INHP8Yd7Y6i3UKJ00G4pOpmwYGZY | BmnCgA5Gc9As2NeC4PQQXjMOlpKZY | $12.00 | American Express | 1008 |
| 1/21/26 | 21:45:13 | XJHdqs0TwikR6Q18F43kukVab4dZY | PdHQX98bpqPEF9kNbxdYkK9GC2RZY | $12.00 | MasterCard | 5405 |
| 1/21/26 | 21:31:13 | v7II84A09OdADB6xcyV8Kshg1LJZY | XV3XL6bNFRyG7opVu3ZQjheFl2BZY | $12.00 | MasterCard | 5405 |
| 1/21/26 | 19:04:04 | LjJQDC6LqCYtUyEEL83jhpxYmebZY | pyh5u5rlHGEC2VDEw3Hac3taa3PZY | $12.00 | MasterCard | 5405 |
| 1/20/26 | 10:45:50 | L1OitcvaWlcwTzpdcrvowd8b7tSZY | blE2ZYmJvwMR7b2q1G2BIt0vYPRZY | $12.00 | MasterCard | 5405 |
| 1/19/26 | 09:34:58 | 77LRhZUkOCOsOiCDOeJWmMQWVmdZY | VWWWj0lefhllyoZDgQ1vkIgGYkLZY | $12.00 | MasterCard | 5405 |

## ⚠️ Critical Issue: Missing Customer Information

**PROBLEM:** The Square export shows:
- ✅ Payment IDs
- ✅ Transaction IDs
- ✅ Amounts
- ✅ Card details
- ❌ **Customer ID: Empty**
- ❌ **Customer Name: Empty**
- ❌ **Customer Email: Empty**
- ❌ **Customer Phone: Empty**

These appear to be **"Custom Amount"** payments, likely processed through:
- Square POS terminal
- Square Virtual Terminal
- Manual card entry
- NOT through the subscription flow

## 🔍 How to Get Customer Information

### Option 1: Check Square Dashboard Individual Transactions

For EACH payment, click the transaction link and check for:

1. **1/23/26 - BmnCgA5Gc9As2NeC4PQQXjMOlpKZY**
   - Link: https://app.squareup.com/dashboard/sales/transactions/9INHP8Yd7Y6i3UKJ00G4pOpmwYGZY
   - Look for: Buyer information, Receipt email, Phone number, Notes

2. **1/21/26 - PdHQX98bpqPEF9kNbxdYkK9GC2RZY**
   - Link: https://app.squareup.com/dashboard/sales/transactions/XJHdqs0TwikR6Q18F43kukVab4dZY
   - Look for: Buyer information, Receipt email, Phone number, Notes

3. **1/21/26 - XV3XL6bNFRyG7opVu3ZQjheFl2BZY**
   - Link: https://app.squareup.com/dashboard/sales/transactions/v7II84A09OdADB6xcyV8Kshg1LJZY
   - Look for: Buyer information, Receipt email, Phone number, Notes

4. **1/21/26 - pyh5u5rlHGEC2VDEw3Hac3taa3PZY**
   - Link: https://app.squareup.com/dashboard/sales/transactions/LjJQDC6LqCYtUyEEL83jhpxYmebZY
   - Look for: Buyer information, Receipt email, Phone number, Notes

5. **1/20/26 - blE2ZYmJvwMR7b2q1G2BIt0vYPRZY**
   - Link: https://app.squareup.com/dashboard/sales/transactions/L1OitcvaWlcwTzpdcrvowd8b7tSZY
   - Look for: Buyer information, Receipt email, Phone number, Notes

6. **1/19/26 - VWWWj0lefhllyoZDgQ1vkIgGYkLZY**
   - Link: https://app.squareup.com/dashboard/sales/transactions/77LRhZUkOCOsOiCDOeJWmMQWVmdZY
   - Look for: Buyer information, Receipt email, Phone number, Notes

### Option 2: Check Email/WhatsApp Records

If customers were contacted via email or WhatsApp around these dates:
- Search email inbox for messages around Jan 19-23
- Check WhatsApp sent messages
- Look for registration forms or customer inquiries

### Option 3: Check Pre-Checkout Table

If your system had a pre-checkout or lead capture table:

```sql
-- Check for leads/registrations around these dates
SELECT * FROM pre_checkout 
WHERE created_at >= '2026-01-19' 
  AND created_at <= '2026-01-23'
ORDER BY created_at;

-- Or check if you have any old tables
SELECT * FROM user_accounts
WHERE created_at >= '2026-01-19'
  AND created_at <= '2026-01-23';
```

## 📝 Data Collection Template

For each payment, fill out this information:

### Payment 1: 1/23/26 22:17 - BmnCgA5Gc9As2NeC4PQQXjMOlpKZY
```
Payment ID: BmnCgA5Gc9As2NeC4PQQXjMOlpKZY
Transaction ID: 9INHP8Yd7Y6i3UKJ00G4pOpmwYGZY
Date: 2026-01-23 22:17:24 (EST) = 2026-01-24 03:17:24 (UTC)
Amount: $12.00
Card: Amex ...1008

Customer Information (REQUIRED):
- Email: _______________________
- First Name: __________________
- Last Name: ___________________
- Phone: _______________________
- State: _______________________

Family Information (REQUIRED):
- First Name: __________________
- Last Name: ___________________
- Email: _______________________
- Phone: _______________________
- Relationship: ________________
```

### Payment 2: 1/21/26 21:45 - PdHQX98bpqPEF9kNbxdYkK9GC2RZY
```
Payment ID: PdHQX98bpqPEF9kNbxdYkK9GC2RZY
Transaction ID: XJHdqs0TwikR6Q18F43kukVab4dZY
Date: 2026-01-21 21:45:13 (EST) = 2026-01-22 02:45:13 (UTC)
Amount: $12.00
Card: MasterCard ...5405

Customer Information (REQUIRED):
- Email: _______________________
- First Name: __________________
- Last Name: ___________________
- Phone: _______________________
- State: _______________________

Family Information (REQUIRED):
- First Name: __________________
- Last Name: ___________________
- Email: _______________________
- Phone: _______________________
- Relationship: ________________
```

### Payment 3: 1/21/26 21:31 - XV3XL6bNFRyG7opVu3ZQjheFl2BZY
```
Payment ID: XV3XL6bNFRyG7opVu3ZQjheFl2BZY
Transaction ID: v7II84A09OdADB6xcyV8Kshg1LJZY
Date: 2026-01-21 21:31:13 (EST) = 2026-01-22 02:31:13 (UTC)
Amount: $12.00
Card: MasterCard ...5405

Customer Information (REQUIRED):
- Email: _______________________
- First Name: __________________
- Last Name: ___________________
- Phone: _______________________
- State: _______________________

Family Information (REQUIRED):
- First Name: __________________
- Last Name: ___________________
- Email: _______________________
- Phone: _______________________
- Relationship: ________________
```

### Payment 4: 1/21/26 19:04 - pyh5u5rlHGEC2VDEw3Hac3taa3PZY
```
Payment ID: pyh5u5rlHGEC2VDEw3Hac3taa3PZY
Transaction ID: LjJQDC6LqCYtUyEEL83jhpxYmebZY
Date: 2026-01-21 19:04:04 (EST) = 2026-01-22 00:04:04 (UTC)
Amount: $12.00
Card: MasterCard ...5405

Customer Information (REQUIRED):
- Email: _______________________
- First Name: __________________
- Last Name: ___________________
- Phone: _______________________
- State: _______________________

Family Information (REQUIRED):
- First Name: __________________
- Last Name: ___________________
- Email: _______________________
- Phone: _______________________
- Relationship: ________________
```

### Payment 5: 1/20/26 10:45 - blE2ZYmJvwMR7b2q1G2BIt0vYPRZY
```
Payment ID: blE2ZYmJvwMR7b2q1G2BIt0vYPRZY
Transaction ID: L1OitcvaWlcwTzpdcrvowd8b7tSZY
Date: 2026-01-20 10:45:50 (EST) = 2026-01-20 15:45:50 (UTC)
Amount: $12.00
Card: MasterCard ...5405

Customer Information (REQUIRED):
- Email: _______________________
- First Name: __________________
- Last Name: ___________________
- Phone: _______________________
- State: _______________________

Family Information (REQUIRED):
- First Name: __________________
- Last Name: ___________________
- Email: _______________________
- Phone: _______________________
- Relationship: ________________
```

### Payment 6: 1/19/26 09:34 - VWWWj0lefhllyoZDgQ1vkIgGYkLZY
```
Payment ID: VWWWj0lefhllyoZDgQ1vkIgGYkLZY
Transaction ID: 77LRhZUkOCOsOiCDOeJWmMQWVmdZY
Date: 2026-01-19 09:34:58 (EST) = 2026-01-19 14:34:58 (UTC)
Amount: $12.00
Card: MasterCard ...5405

Customer Information (REQUIRED):
- Email: _______________________
- First Name: __________________
- Last Name: ___________________
- Phone: _______________________
- State: _______________________

Family Information (REQUIRED):
- First Name: __________________
- Last Name: ___________________
- Email: _______________________
- Phone: _______________________
- Relationship: ________________
```

## 🎯 Next Steps

### Step 1: Gather Information
- [ ] Click each transaction link in Square Dashboard
- [ ] Extract customer email/name/phone from transaction details
- [ ] Fill out the templates above
- [ ] If no customer info exists, check email/WhatsApp/notes

### Step 2: Create Database Records
Once you have the customer information, use the backfill script:

```bash
# Edit scripts/backfill-square-payments.ts
nano scripts/backfill-square-payments.ts
```

Add each payment to the array:

```typescript
const PAYMENTS_TO_BACKFILL: PaymentToBackfill[] = [
  {
    registrationId: 0, // Will create new
    squarePaymentId: 'BmnCgA5Gc9As2NeC4PQQXjMOlpKZY',
    squareCustomerId: 'UNKNOWN', // Square didn't capture this
    amountCents: 1200,
    paymentDate: '2026-01-24', // UTC date
    status: 'COMPLETED',
    // Add customer info once you find it
    migrantEmail: 'customer@email.com',
    migrantFirstName: 'FirstName',
    migrantLastName: 'LastName',
    migrantPhone: '3051234567',
    familyFirstName: 'FamilyName',
    familyEmail: 'family@email.com',
    familyPhone: '5512345678',
  },
  // Repeat for all 6 payments
];
```

### Step 3: Handle "No Customer Info" Scenario

If you CANNOT find customer information:

**Option A: Contact via Square Receipt**
- Square may have sent receipt emails
- Find those emails and reply asking for details

**Option B: Card Last 4 Digits Match**
- See if any of these cards match your test transactions
- Card ...5405 appears 5 times (likely same person testing?)
- Card ...1008 appears once

**Option C: Create Placeholder Records**
- Create records with payment ID only
- Mark as "pending_customer_info"
- Try to contact when they attempt to use service

## 📊 Analysis

### Suspicious Pattern: Same Card Used 5 Times

Notice that MasterCard ending in 5405 was used for 5 out of 6 payments:
- 1/21/26 21:45:13
- 1/21/26 21:31:13 (14 minutes apart!)
- 1/21/26 19:04:04
- 1/20/26 10:45:50
- 1/19/26 09:34:58

**This suggests:**
1. **Testing:** Someone (possibly you) testing the payment system
2. **Multiple Family Members:** One person paying for multiple family accounts
3. **Payment Issues:** Multiple retry attempts

### Action Based on Pattern

If these are YOUR test payments:
- ✅ Don't need to recover customer info
- ✅ Can delete these test transactions
- ✅ Only need to backfill the 1 Amex payment (real customer)

If these are real customers:
- ⚠️ URGENT: Find customer information immediately
- ⚠️ They've been waiting 2+ weeks for service
- ⚠️ Major customer service issue

## ✅ Immediate Action

**DECIDE NOW:**
1. Are these test payments (card ...5405)? → Skip backfill
2. Is this a real customer paying for 5 accounts? → Find info + backfill
3. Is card ...1008 the only real customer? → Focus on that one

**Check your payment processor:**
- Do you recognize card ...5405?
- Is it your personal card?
- Was this you testing in January?

## 📁 Files to Complete

Once you have customer information:
- [ ] Fill out this template completely
- [ ] Run backfill script: `scripts/backfill-square-payments.ts`
- [ ] Verify records created in Supabase
- [ ] Send welcome emails with access codes
- [ ] Document outcome in HISTORICAL_DATA_ANALYSIS.md

---

**Status:** ⏳ WAITING FOR CUSTOMER INFORMATION FROM SQUARE DASHBOARD
