#!/usr/bin/env tsx
// ════════════════════════════════════════════════════════════════════════════
// BACKFILL SCRIPT: Reconcile existing Square payments into database
// ════════════════════════════════════════════════════════════════════════════
// Usage: 
//   1. Update the PAYMENTS_TO_BACKFILL array with your Square payment data
//   2. Run: npx tsx scripts/backfill-square-payments.ts
// ════════════════════════════════════════════════════════════════════════════

import { getSupabaseClient } from '../src/lib/supabase';

// ════════════════════════════════════════════════════════════════════════════
// CONFIGURATION: Add your payment data here
// ════════════════════════════════════════════════════════════════════════════
// Get this data from Square Dashboard:
// 1. Go to Square Dashboard > Payments
// 2. Find each payment by last 4 digits and timestamp
// 3. Click on payment to see details
// 4. Copy payment_id, customer_id, subscription_id (if any)

interface PaymentToBackfill {
  registrationId: number;           // Your Supabase registration ID (71, 72, 74)
  squarePaymentId: string;          // From Square Dashboard
  squareCustomerId: string;         // From Square Dashboard
  squareSubscriptionId?: string;    // From Square Dashboard (if subscription exists)
  squareInvoiceId?: string;         // From Square Dashboard (if invoice exists)
  amountCents: number;              // Amount in cents (e.g., 1200 = $12.00)
  paymentDate: string;              // YYYY-MM-DD format
  status: string;                   // Usually 'COMPLETED'
}

const PAYMENTS_TO_BACKFILL: PaymentToBackfill[] = [
  // Example - replace with your actual data:
  // {
  //   registrationId: 71,
  //   squarePaymentId: 'PAYMENT_ID_FROM_SQUARE',
  //   squareCustomerId: 'CUSTOMER_ID_FROM_SQUARE',
  //   squareSubscriptionId: 'SUBSCRIPTION_ID_FROM_SQUARE', // optional
  //   amountCents: 1200,
  //   paymentDate: '2026-02-05',
  //   status: 'COMPLETED',
  // },
];

// ════════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ════════════════════════════════════════════════════════════════════════════
async function main() {
  console.log('🔧 [BACKFILL] Starting Square payment backfill...\n');

  if (PAYMENTS_TO_BACKFILL.length === 0) {
    console.log('⚠️  No payments to backfill. Please update PAYMENTS_TO_BACKFILL array.');
    console.log('📖 See script comments for instructions on how to get Square payment data.');
    return;
  }

  const supabase = getSupabaseClient();
  let successCount = 0;
  let errorCount = 0;

  for (const payment of PAYMENTS_TO_BACKFILL) {
    console.log(`\n${'═'.repeat(80)}`);
    console.log(`Processing Registration ${payment.registrationId}`);
    console.log(`${'═'.repeat(80)}`);

    try {
      // ════════════════════════════════════════════════════════════════════════
      // 1. Get registration data
      // ════════════════════════════════════════════════════════════════════════
      console.log('🔍 Fetching registration...');
      const { data: registration, error: regError } = await supabase
        .from('registrations')
        .select('*')
        .eq('id', payment.registrationId)
        .single();

      if (regError || !registration) {
        throw new Error(`Registration ${payment.registrationId} not found: ${regError?.message}`);
      }

      console.log(`✅ Found registration: ${registration.migrant_email}`);

      // ════════════════════════════════════════════════════════════════════════
      // 2. Create/update Square customer
      // ════════════════════════════════════════════════════════════════════════
      console.log('👤 Upserting Square customer...');
      const { error: customerError } = await supabase
        .from('square_customers')
        .upsert({
          registration_id: payment.registrationId,
          square_customer_id: payment.squareCustomerId,
          migrant_email: registration.migrant_email,
          migrant_first_name: registration.migrant_first_name,
          migrant_last_name: registration.migrant_last_name,
          migrant_phone: registration.migrant_phone,
          migrant_code: registration.migrant_code,
          family_primary_email: registration.family_email,
          family_first_name: registration.family_first_name,
          family_code: registration.family_code,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'square_customer_id',
        });

      if (customerError) {
        console.error('❌ Customer upsert failed:', customerError);
      } else {
        console.log('✅ Customer upserted');
      }

      // ════════════════════════════════════════════════════════════════════════
      // 3. Create/update Square subscription (if exists)
      // ════════════════════════════════════════════════════════════════════════
      let internalSubId = null;
      
      if (payment.squareSubscriptionId) {
        console.log('📋 Upserting Square subscription...');
        const { data: sub, error: subError } = await supabase
          .from('square_subscriptions')
          .upsert({
            registration_id: payment.registrationId,
            square_customer_id: payment.squareCustomerId,
            square_subscription_id: payment.squareSubscriptionId,
            square_plan_variation_id: process.env.SQUARE_PLAN_VARIATION_ID || 'UNKNOWN',
            status: 'ACTIVE',
            start_date: payment.paymentDate,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'square_subscription_id',
          })
          .select('id')
          .single();

        if (subError) {
          console.error('❌ Subscription upsert failed:', subError);
        } else {
          internalSubId = sub?.id;
          console.log('✅ Subscription upserted, internal ID:', internalSubId);
        }
      }

      // ════════════════════════════════════════════════════════════════════════
      // 4. Create Square payment
      // ════════════════════════════════════════════════════════════════════════
      console.log('💰 Inserting Square payment...');
      
      // Check if payment already exists
      const { data: existingPayment } = await supabase
        .from('square_payments')
        .select('id')
        .eq('square_payment_id', payment.squarePaymentId)
        .single();

      if (existingPayment) {
        console.log('ℹ️  Payment already exists, skipping insert');
      } else {
        const { error: paymentError } = await supabase
          .from('square_payments')
          .insert({
            subscription_id: internalSubId,
            square_subscription_id: payment.squareSubscriptionId || 'NONE',
            square_customer_id: payment.squareCustomerId,
            square_payment_id: payment.squarePaymentId,
            square_invoice_id: payment.squareInvoiceId || null,
            amount_cents: payment.amountCents,
            status: payment.status,
            payment_date: payment.paymentDate,
            billing_period_start: payment.paymentDate,
          });

        if (paymentError) {
          throw new Error(`Payment insert failed: ${paymentError.message}`);
        }
        console.log('✅ Payment inserted');
      }

      // ════════════════════════════════════════════════════════════════════════
      // 5. Update registration status
      // ════════════════════════════════════════════════════════════════════════
      console.log('📝 Updating registration...');
      const updateData: any = {
        status: 'active',
        square_customer_id: payment.squareCustomerId,
        square_payment_id: payment.squarePaymentId,
        last_payment_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (payment.squareSubscriptionId) {
        updateData.square_subscription_id = payment.squareSubscriptionId;
      }

      if (!registration.activated_at) {
        updateData.activated_at = new Date().toISOString();
      }

      const { error: updateError } = await supabase
        .from('registrations')
        .update(updateData)
        .eq('id', payment.registrationId);

      if (updateError) {
        throw new Error(`Registration update failed: ${updateError.message}`);
      }

      console.log('✅ Registration updated to active');
      console.log(`\n✨ Registration ${payment.registrationId} successfully backfilled!`);
      successCount++;

    } catch (error: any) {
      console.error(`\n❌ Error processing registration ${payment.registrationId}:`);
      console.error(error.message);
      errorCount++;
    }
  }

  // ════════════════════════════════════════════════════════════════════════
  // SUMMARY
  // ════════════════════════════════════════════════════════════════════════
  console.log(`\n${'═'.repeat(80)}`);
  console.log('📊 BACKFILL SUMMARY');
  console.log(`${'═'.repeat(80)}`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📋 Total: ${PAYMENTS_TO_BACKFILL.length}`);
  console.log(`${'═'.repeat(80)}\n`);

  if (successCount > 0) {
    console.log('🎉 Backfill completed! Your database is now in sync with Square.');
    console.log('💡 Next steps:');
    console.log('   1. Verify in Supabase that registrations show status="active"');
    console.log('   2. Check that square_payments table has the records');
    console.log('   3. Configure Square webhooks to prevent future mismatches');
  }
}

// ════════════════════════════════════════════════════════════════════════════
// RUN
// ════════════════════════════════════════════════════════════════════════════
main()
  .then(() => {
    console.log('\n✅ Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
