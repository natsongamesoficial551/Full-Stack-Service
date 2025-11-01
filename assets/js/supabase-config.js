window.SUPABASE_URL = window.env.SUPABASE_URL;
window.SUPABASE_ANON_KEY = window.env.SUPABASE_ANON_KEY;

const supabase = window.supabase.createClient(
  window.SUPABASE_URL,
  window.SUPABASE_ANON_KEY
);
