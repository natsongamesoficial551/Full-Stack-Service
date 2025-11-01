// Carrega variáveis do Netlify (injetadas no HTML pelo inject command)
window.env = window.env || {};

const SUPABASE_URL = window.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = window.env.SUPABASE_ANON_KEY;

// Admin
window.ADMIN_EMAIL = "natan@natandev.com";

// Inicializa Supabase global
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn("⚠️ Credenciais Supabase não configuradas!");
    window.supabase = null;
} else {
    window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("✅ Supabase conectado!");
}
