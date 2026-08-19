import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://wkkhjuaagbcwutygofih.supabase.co';

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indra2hqdWFhZ2Jjd3V0eWdvZmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0Mzk5MjMsImV4cCI6MjA5OTAxNTkyM30._M4WioixJvJ-RJ3Kyow_14QbI_kqxibT29iSWWJC96E';

export const supabase = createClient(supabaseUrl, supabaseKey);
