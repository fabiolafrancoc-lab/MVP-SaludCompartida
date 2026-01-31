-- Migration: Rename companion_assigned to family_companion_assigned
-- This clarifies that the companion is assigned to the USUARIO (México), not MIGRANTE (USA)

-- Rename column to clarify it belongs to the family user (Mexico)
ALTER TABLE registrations 
RENAME COLUMN companion_assigned TO family_companion_assigned;

-- If column doesn't exist yet, create it
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS family_companion_assigned VARCHAR(20);

-- Add comment for clarity
COMMENT ON COLUMN registrations.family_companion_assigned 
IS 'Companion assigned to user in Mexico (lupita for 55+, fernanda for <55)';

-- Ensure other necessary columns exist
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS migrant_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS family_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS migrant_code VARCHAR(6) UNIQUE,
ADD COLUMN IF NOT EXISTS square_order_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS square_payment_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS payment_completed_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP;

-- Create indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_migrant_code ON registrations(migrant_code);
CREATE UNIQUE INDEX IF NOT EXISTS idx_family_code ON registrations(family_code);
CREATE INDEX IF NOT EXISTS idx_family_companion ON registrations(family_companion_assigned);
