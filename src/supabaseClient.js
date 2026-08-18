import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wkkhjuaagbcwutygofih.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_30AmpgVdAQVFjZiOwLT1VA_QJdf9_FO';

export const supabase = createClient(supabaseUrl, supabaseKey);
