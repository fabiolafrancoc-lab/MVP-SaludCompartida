-- Create separate table for user demographics
-- This avoids schema cache issues with registrations table

CREATE TABLE IF NOT EXISTS user_demographics (
  id BIGSERIAL PRIMARY KEY,
  phone VARCHAR(20) NOT NULL UNIQUE,
  user_type VARCHAR(10) CHECK (user_type IN ('migrant', 'family')),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  gender VARCHAR(1) CHECK (gender IN ('M', 'F')),
  date_of_birth DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for fast lookups by phone
CREATE INDEX IF NOT EXISTS idx_demographics_phone ON user_demographics(phone);

-- Create index for age-based queries
CREATE INDEX IF NOT EXISTS idx_demographics_age ON user_demographics(age);

-- Enable RLS
ALTER TABLE user_demographics ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Enable insert for all users" 
ON user_demographics 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Enable read access for all users" 
ON user_demographics 
FOR SELECT 
USING (true);

CREATE POLICY "Enable update for all users" 
ON user_demographics 
FOR UPDATE 
USING (true);

-- Verify table was created
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'user_demographics'
ORDER BY ordinal_position;
