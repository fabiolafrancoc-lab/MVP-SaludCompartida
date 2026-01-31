-- Add migrant_email and family_email if not exists
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS migrant_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS family_email VARCHAR(255);

-- Add migrant_code if not exists (different from family_code)
-- NOTE: This assumes the table has no existing rows with NULL migrant_code
-- If there are existing rows, populate them first before adding UNIQUE constraint
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS migrant_code VARCHAR(6);

-- Add unique constraint separately (safer for existing data)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'registrations_migrant_code_key'
  ) THEN
    ALTER TABLE registrations ADD CONSTRAINT registrations_migrant_code_key UNIQUE (migrant_code);
  END IF;
END $$;

-- Add square tracking columns
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS square_order_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS square_payment_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS payment_completed_at TIMESTAMP;

-- Add login tracking
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP;

-- Create indexes for fast lookups
CREATE UNIQUE INDEX IF NOT EXISTS idx_migrant_code ON registrations(migrant_code);
CREATE INDEX IF NOT EXISTS idx_square_order ON registrations(square_order_id);
