const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event) => {

  console.log("🚀 Atualização iniciada...");

  const auth = event.headers.authorization?.replace("Bearer ", "");
  if (!auth || auth !== process.env.WEBHOOK_SECRET) {
    return { statusCode: 401, body: "Não autorizado" };
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  const siteURL = "https://natansites.com.br";
  const githubRepo = "https://raw.githubusercontent.com/natsongamesoficial551/Full-Stack-Service/main";

  // Páginas para rastrear
  const pages = [
    "",
    "/login.html",
    "/contato.html",
    "/suporte.html",
    "/planos.html",
    "/dashboard.html",
    "/promocao_relampago.html"
  ];

  // Função para salvar conteúdo do site
  async function scrapePage(path) {
    try {
      const url = siteURL + path;
      const res = await fetch(url);
      const html = await res.text();
      const $ = cheerio.load(html);

      const text = $("body").text().replace(/\s+/g, " ").trim().slice(0, 2000);

      await supabase.from("site_content").upsert({
        page_name: path || "/",
        section: "body",
        content: text,
        source_url: url
      });

      console.log(`✅ Coletado do site: ${path}`);
    } catch (e) {
      console.log(`⚠️ Falha ao ler ${path}:`, e.message);
    }
  }

  // Função para salvar arquivos do GitHub
  async function scrapeGitHubFile(filePath) {
    try {
      const url = githubRepo + filePath;
      const res = await fetch(url);
      if (!res.ok) return;

      const text = await res.text();

      await supabase.from("site_content").upsert({
        page_name: "github",
        section: filePath,
        content: text.slice(0, 2000),
        source_url: url
      });

      console.log(`✅ Coletado do GitHub: ${filePath}`);
    } catch (e) {
      console.log("❌ GitHub falhou:", e.message);
    }
  }

  // Rastrear site
  for (const p of pages) await scrapePage(p);

  // Rastrear arquivos principais do GitHub
  const githubFiles = [
    "/index.html",
    "/README.md",
    "/assets/js/main.js",
    "/assets/js/auth.js"
  ];

  for (const file of githubFiles) await scrapeGitHubFile(file);

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, msg: "IA atualizada com sucesso ✅" })
  };
};

