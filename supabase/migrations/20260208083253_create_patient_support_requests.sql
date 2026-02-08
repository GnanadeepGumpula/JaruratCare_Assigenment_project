/*
  # Jarurat Care Patient Support System

  1. New Tables
    - `patient_support_requests`
      - `id` (uuid, primary key) - Unique identifier for each request
      - `full_name` (text) - Patient's full name
      - `age` (integer) - Patient's age
      - `location` (text) - Patient's location/city
      - `support_type` (text) - Type of support: Financial, Nutritional, or Emotional
      - `priority_level` (integer) - Priority level from 1-10
      - `status` (text) - Request status: pending, approved, rejected
      - `created_at` (timestamptz) - Request submission timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `impact_stats`
      - `id` (uuid, primary key)
      - `patients_supported` (integer) - Total patients supported count
      - `active_volunteers` (integer) - Active volunteers count
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `patient_support_requests` table
    - Enable RLS on `impact_stats` table
    - Add policy for public to insert support requests
    - Add policy for public to read impact stats
*/

CREATE TABLE IF NOT EXISTS patient_support_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  age integer NOT NULL,
  location text NOT NULL,
  support_type text NOT NULL CHECK (support_type IN ('Financial', 'Nutritional', 'Emotional')),
  priority_level integer NOT NULL CHECK (priority_level >= 1 AND priority_level <= 10),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS impact_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patients_supported integer DEFAULT 0,
  active_volunteers integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE patient_support_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert support requests"
  ON patient_support_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view their own requests"
  ON patient_support_requests
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can read impact stats"
  ON impact_stats
  FOR SELECT
  TO anon
  USING (true);

-- Insert initial impact stats
INSERT INTO impact_stats (patients_supported, active_volunteers)
VALUES (1247, 89)
ON CONFLICT DO NOTHING;