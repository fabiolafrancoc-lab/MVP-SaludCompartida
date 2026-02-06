# CONFIRMED: Manual Matching Required for 6 Square Payments

## ✅ SQL Confirmation Results

**Query Run:**
```sql
-- Searched for 6 Square Payment IDs in registrations table
SELECT * FROM registrations 
WHERE square_payment_id IN (
  'BmnCgA5Gc9As2NeC4PQQXjMOlpKZY',
  'PdHQX98bpqPEF9kNbxdYkK9GC2RZY',
  'XV3XL6bNFRyG7opVu3ZQjheFl2BZY',
  'pyh5u5rlHGEC2VDEw3Hac3taa3PZY',
  'blE2ZYmJvwMR7b2q1G2BIt0vYPRZY',
  'VWWWj0lefhllyoZDgQ1vkIgGYkLZY'
);
```

**Result:** `0 rows` ❌

**Conclusion:** 100% confirmed - these payments exist ONLY in Square, not in database.

## 🎯 Matching Strategy

Since we can't match by Payment ID (doesn't exist in DB), we must match by:
1. **Date/Time proximity** - Payment time vs registration created_at
2. **Email/Phone** - If you remember who paid when
3. **Context** - Were you manually processing someone's payment?

## 📊 Square Payment Timeline (Jan 19-23)

### Payment 1: January 23, 2026 - 22:17:24 ET
```
Payment ID: BmnCgA5Gc9As2NeC4PQQXjMOlpKZY
UTC Time: 2026-01-24 03:17:24+00 (next day UTC)
Amount: $12.00
Card: American Express ...1008
```

**Find matching registration around this time:**
```sql
-- Look for registrations created near this time
SELECT 
  id,
  migrant_email,
  migrant_first_name,
  migrant_last_name,
  migrant_phone,
  status,
  created_at,
  updated_at
FROM registrations
WHERE created_at BETWEEN '2026-01-23 20:00:00+00' AND '2026-01-24 06:00:00+00'
  AND status = 'pending_payment'
ORDER BY created_at;
```

**Expected registrations in that window:** Check for IDs 7-24 (earliest registrations)

### Payment 2: January 21, 2026 - 21:45:13 ET
```
Payment ID: PdHQX98bpqPEF9kNbxdYkK9GC2RZY
UTC Time: 2026-01-22 02:45:13+00
Amount: $12.00
Card: MasterCard ...5405
```

**Find matching registration:**
```sql
SELECT 
  id, migrant_email, migrant_first_name, status, created_at
FROM registrations
WHERE created_at BETWEEN '2026-01-21 20:00:00+00' AND '2026-01-22 06:00:00+00'
  AND status = 'pending_payment'
ORDER BY created_at;
```

### Payment 3: January 21, 2026 - 21:31:13 ET (14 min before #2!)
```
Payment ID: XV3XL6bNFRyG7opVu3ZQjheFl2BZY
UTC Time: 2026-01-22 02:31:13+00
Amount: $12.00
Card: MasterCard ...5405 (SAME CARD as #2)
```

**ALERT:** Same card, 14 minutes apart! Either:
- Testing/retry by same person
- Two different family members using same card

**Find matching registration:**
```sql
SELECT 
  id, migrant_email, migrant_first_name, status, created_at
FROM registrations
WHERE created_at BETWEEN '2026-01-21 20:00:00+00' AND '2026-01-22 06:00:00+00'
  AND status = 'pending_payment'
ORDER BY created_at;
```

### Payment 4: January 21, 2026 - 19:04:04 ET
```
Payment ID: pyh5u5rlHGEC2VDEw3Hac3taa3PZY
UTC Time: 2026-01-22 00:04:04+00
Amount: $12.00
Card: MasterCard ...5405 (SAME CARD again)
```

**Find matching registration:**
```sql
SELECT 
  id, migrant_email, migrant_first_name, status, created_at
FROM registrations
WHERE created_at BETWEEN '2026-01-21 18:00:00+00' AND '2026-01-22 02:00:00+00'
  AND status = 'pending_payment'
ORDER BY created_at;
```

### Payment 5: January 20, 2026 - 10:45:50 ET
```
Payment ID: blE2ZYmJvwMR7b2q1G2BIt0vYPRZY
UTC Time: 2026-01-20 15:45:50+00
Amount: $12.00
Card: MasterCard ...5405 (SAME CARD again)
```

**Find matching registration:**
```sql
SELECT 
  id, migrant_email, migrant_first_name, status, created_at
FROM registrations
WHERE created_at BETWEEN '2026-01-20 10:00:00+00' AND '2026-01-20 20:00:00+00'
  AND status = 'pending_payment'
ORDER BY created_at;
```

### Payment 6: January 19, 2026 - 09:34:58 ET
```
Payment ID: VWWWj0lefhllyoZDgQ1vkIgGYkLZY
UTC Time: 2026-01-19 14:34:58+00
Amount: $12.00
Card: MasterCard ...5405 (SAME CARD again)
```

**Find matching registration:**
```sql
SELECT 
  id, migrant_email, migrant_first_name, status, created_at
FROM registrations
WHERE created_at BETWEEN '2026-01-19 09:00:00+00' AND '2026-01-19 20:00:00+00'
  AND status = 'pending_payment'
ORDER BY created_at;
```

## 🚨 CRITICAL: Card Pattern Analysis

**MasterCard ...5405 used 5 times in 5 days:**
- Jan 19, 09:34 ET
- Jan 20, 10:45 ET
- Jan 21, 19:04 ET
- Jan 21, 21:31 ET (same day as above, 2.5 hrs later)
- Jan 21, 21:45 ET (same day, 14 min later)

**Question:** Is card ...5405 YOUR personal test card?
- [ ] YES → These are test payments, DON'T activate
- [ ] NO → These are 5 real customers using same payment method

## 📋 Manual Activation Script

Once you identify which registrations match, run this for EACH:

```sql
-- TEMPLATE: Update for Payment 1 (Jan 23 - Amex 1008)
-- Replace REGISTRATION_ID with actual matched ID
UPDATE registrations
SET 
  status = 'active',
  square_payment_id = 'BmnCgA5Gc9As2NeC4PQQXjMOlpKZY',
  activated_at = '2026-01-24 03:17:24+00',  -- UTC time from Square
  last_payment_at = '2026-01-24 03:17:24+00',
  payment_completed_at = '2026-01-24 03:17:24+00',
  updated_at = NOW()
WHERE id = REGISTRATION_ID_HERE  -- Replace with matched registration
  AND status = 'pending_payment';

-- Verify it worked
SELECT 
  id, migrant_email, status, square_payment_id, 
  migrant_code, family_code
FROM registrations
WHERE id = REGISTRATION_ID_HERE;
```

## 🔍 Matching Worksheet

Fill this out as you match:

### Match 1: Amex ...1008 (Jan 23, 22:17 ET)
```
Square Payment ID: BmnCgA5Gc9As2NeC4PQQXjMOlpKZY
Matched Registration ID: _______
Migrant Email: _______________________
Reason for match: _____________________
□ Activated
□ Codes sent
```

### Match 2-6: MasterCard ...5405
```
Are these test payments? □ YES □ NO

If YES:
  □ Skip all 5
  □ Don't activate any registrations
  
If NO (real customers):
  Match each to a registration:
  
  Payment 2 (Jan 21, 21:45): Reg ID _____ Email: ___________
  Payment 3 (Jan 21, 21:31): Reg ID _____ Email: ___________
  Payment 4 (Jan 21, 19:04): Reg ID _____ Email: ___________
  Payment 5 (Jan 20, 10:45): Reg ID _____ Email: ___________
  Payment 6 (Jan 19, 09:34): Reg ID _____ Email: ___________
```

## ✅ Verification Queries

### After activation, verify:

```sql
-- Check how many are now active
SELECT COUNT(*) FROM registrations WHERE status = 'active';
-- Expected: 2 (existing) + N (newly activated) = 2+N

-- Check all active have Square payment IDs
SELECT 
  id,
  migrant_email,
  square_payment_id,
  activated_at
FROM registrations
WHERE status = 'active'
ORDER BY activated_at;

-- Check if codes exist for active users
SELECT 
  id,
  migrant_email,
  migrant_code,
  family_code,
  status
FROM registrations
WHERE status = 'active'
  AND (migrant_code IS NULL OR family_code IS NULL);
-- Should return 0 rows
```

## 📧 Send Access Codes

After activation, get codes and send to customers:

```sql
-- Get all newly activated users who need codes
SELECT 
  id,
  migrant_email,
  migrant_first_name,
  migrant_code,
  family_email,
  family_first_name,
  family_code,
  family_phone,
  activated_at
FROM registrations
WHERE square_payment_id IN (
  'BmnCgA5Gc9As2NeC4PQQXjMOlpKZY',
  'PdHQX98bpqPEF9kNbxdYkK9GC2RZY',
  'XV3XL6bNFRyG7opVu3ZQjheFl2BZY',
  'pyh5u5rlHGEC2VDEw3Hac3taa3PZY',
  'blE2ZYmJvwMR7b2q1G2BIt0vYPRZY',
  'VWWWj0lefhllyoZDgQ1vkIgGYkLZY'
)
AND status = 'active';
```

For each row:
1. Send email to migrant_email with migrant_code
2. Send WhatsApp to family_phone with family_code
3. Test that they can log in at /login

## ⚠️ Important Notes

1. **Database doesn't have registrations before Jan 31**
   - If Square payments are Jan 19-23
   - But earliest registration is Jan 31
   - Then these payments have NO matching registrations!
   - Would need to CREATE new registrations with customer info from Square

2. **Check if registrations exist in date range**
   ```sql
   -- Check earliest registration
   SELECT MIN(created_at) FROM registrations;
   -- If this returns 2026-01-31 or later, then Jan 19-23 payments can't match
   ```

3. **If NO registrations in Jan 19-23:**
   - These payments are orphaned
   - Need customer information from Square transaction details
   - Would need to manually CREATE registrations, not just UPDATE

## 🎯 Action Plan

1. **Run earliest registration check:**
   ```sql
   SELECT MIN(created_at) FROM registrations;
   ```

2. **If result is Jan 31 or later:**
   - Jan 19-23 payments are ORPHANED
   - No registrations to match
   - Need to get customer info from Square and CREATE new registrations

3. **If result is Jan 19-23:**
   - Run the matching queries above
   - Match by date/time proximity
   - UPDATE to activate

4. **Determine card ownership:**
   - Is ...5405 your personal card? → Skip those 5
   - Is ...1008 a real customer? → Activate that 1

---

**Status:** ⏳ WAITING FOR:
1. Result of `SELECT MIN(created_at) FROM registrations;`
2. Confirmation if card ...5405 is test card
3. Matching decisions based on date/time queries
