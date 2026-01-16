-- Add missing columns to registrations table
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS traffic_source VARCHAR(50) DEFAULT 'direct';
CREATE INDEX IF NOT EXISTS idx_traffic_source ON registrations(traffic_source);
SELECT 'traffic_source column added' as status;
