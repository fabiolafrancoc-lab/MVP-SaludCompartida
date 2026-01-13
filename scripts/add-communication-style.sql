-- Add communication_style column to ai_companions table
ALTER TABLE ai_companions 
ADD COLUMN IF NOT EXISTS communication_style JSONB DEFAULT '{
  "uses_refranes": false,
  "uses_spanglish": false,
  "formality": "neutral",
  "mexicanismos_frequency": "medium",
  "detected_patterns": []
}'::jsonb;
