window.addEventListener("DOMContentLoaded", () => {
  window.env = window.env || {};

  const SUPABASE_URL = window.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = window.env.SUPABASE_ANON_KEY;

  window.ADMIN_EMAIL = "natan@natandev.com";

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.warn("⚠️ Credenciais Supabase não configuradas!");
      window.supabase = null;
      return;
  }

  try {
    window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("✅ Supabase conectado!");
  } catch (e) {
    console.error("❌ Erro ao iniciar Supabase:", e);
  }
});
