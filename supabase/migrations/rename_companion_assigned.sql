-- Migration: Rename companion_assigned to family_companion_assigned
-- This clarifies that the companion is assigned to the USUARIO (México), not MIGRANTE (USA)

-- Check if old column exists and rename it, or create new column if it doesn't exist
DO $$
BEGIN
  -- Try to rename the column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'registrations' 
    AND column_name = 'companion_assigned'
  ) THEN
    ALTER TABLE registrations 
    RENAME COLUMN companion_assigned TO family_companion_assigned;
  -- If old column doesn't exist, create the new one
  ELSIF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'registrations' 
    AND column_name = 'family_companion_assigned'
  ) THEN
    ALTER TABLE registrations 
    ADD COLUMN family_companion_assigned VARCHAR(20);
  END IF;
END $$;

-- Add comment for clarity
COMMENT ON COLUMN registrations.family_companion_assigned 
IS 'Companion assigned to user in Mexico (lupita for 55+, fernanda for <55)';

-- Ensure other necessary columns exist
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS migrant_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS family_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS migrant_code VARCHAR(6),
ADD COLUMN IF NOT EXISTS square_order_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS square_payment_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS payment_completed_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP;

-- Create indexes (will skip if already exist)
CREATE UNIQUE INDEX IF NOT EXISTS idx_migrant_code ON registrations(migrant_code);
CREATE UNIQUE INDEX IF NOT EXISTS idx_family_code ON registrations(family_code);
CREATE INDEX IF NOT EXISTS idx_family_companion ON registrations(family_companion_assigned);
