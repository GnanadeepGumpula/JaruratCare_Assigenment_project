import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PatientSupportRequest {
  id?: string;
  full_name: string;
  age: number;
  location: string;
  support_type: 'Financial' | 'Nutritional' | 'Emotional';
  priority_level: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ImpactStats {
  id?: string;
  patients_supported: number;
  active_volunteers: number;
  updated_at?: string;
}
