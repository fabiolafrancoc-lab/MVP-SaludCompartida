-- ════════════════════════════════════════════════════════════════════════════
-- SQUARE INTEGRATION - DEBUGGING QUERIES
-- ════════════════════════════════════════════════════════════════════════════
-- Purpose: Debug and monitor Square webhook integration
-- ════════════════════════════════════════════════════════════════════════════

-- ┌────────────────────────────────────────────────────────────────────────┐
-- │ 1. CHECK REGISTRATIONS STATUS                                           │
-- └────────────────────────────────────────────────────────────────────────┘

-- View specific registrations (71, 72, 74)
SELECT 
  id, migrant_email, migrant_first_name, status,
  square_customer_id, square_subscription_id, square_payment_id,
  activated_at, last_payment_at, created_at
FROM registrations
WHERE id IN (71, 72, 74)
ORDER BY id;

-- ┌────────────────────────────────────────────────────────────────────────┐
-- │ 2. CHECK SQUARE TABLES                                                  │
-- └────────────────────────────────────────────────────────────────────────┘

-- Count rows in each Square table
SELECT 
  (SELECT COUNT(*) FROM square_customers) AS customers_count,
  (SELECT COUNT(*) FROM square_subscriptions) AS subscriptions_count,
  (SELECT COUNT(*) FROM square_payments) AS payments_count,
  (SELECT COUNT(*) FROM square_webhooks) AS webhooks_count;

-- View all Square payments
SELECT 
  id, square_payment_id, square_customer_id, square_subscription_id,
  amount_cents, status, payment_date, created_at
FROM square_payments
ORDER BY payment_date DESC;

-- ┌────────────────────────────────────────────────────────────────────────┐
-- │ 3. WEBHOOK MONITORING                                                   │
-- └────────────────────────────────────────────────────────────────────────┘

-- View recent webhooks
SELECT 
  id, event_type, square_event_id, processed,
  processing_error, created_at
FROM square_webhooks
ORDER BY created_at DESC
LIMIT 20;

-- View failed webhooks
SELECT 
  event_type, square_event_id, processing_error, created_at
FROM square_webhooks 
WHERE processing_error IS NOT NULL
ORDER BY created_at DESC;
