// netlify/functions/atualizar-ia.js
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event) => {
  console.log("🚀 Atualização iniciada...");

  const auth = event.headers.authorization?.replace("Bearer ", "");
  if (!auth || auth !== process.env.WEBHOOK_SECRET) {
    console.log("❌ Token inválido");
    return { statusCode: 401, body: "Não autorizado" };
  }

  // Use a SERVICE KEY aqui para gravar em todas as tabelas
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY
  );

  const siteURL = "https://natansites.com.br";
  const githubApiRoot = "https://api.github.com/repos/natsongamesoficial551/Full-Stack-Service/contents";

  // lista de páginas públicas que queremos garantir
  const pages = [
    "/",
    "/index.html",
    "/home.html",
    "/login.html",
    "/contato.html",
    "/suporte.html",
    "/planos.html",
    "/dashboard.html",
    "/promocao_relampago.html",
    "/websites.html"
  ];

  // salva texto limpo em site_content
  async function saveSiteContent(pageName, section, content, source_url) {
    try {
      await supabase.from("site_content").upsert({
        page_name: pageName,
        section: section,
        content: content.slice(0, 20000),
        source_url
      }, { onConflict: ["page_name", "section", "source_url"] });
    } catch (e) {
      console.error("Erro ao salvar site_content:", e.message);
    }
  }

  // salva dados estruturados em plataforma_info (planos, promo, contato)
  async function savePlataformaInfo(secao, dados) {
    try {
      await supabase.from("plataforma_info").upsert({
        secao,
        dados,
        atualizado_em: new Date().toISOString()
      }, { onConflict: ["secao"] });
    } catch (e) {
      console.error("Erro ao salvar plataforma_info:", e.message);
    }
  }

  // extrai texto "visível" de uma página
  async function scrapePage(path) {
    const url = siteURL + path;
    try {
      const res = await fetch(url, { timeout: 15000 });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const html = await res.text();
      const $ = cheerio.load(html);

      const text = $("body").text().replace(/\s+/g, " ").trim();
      await saveSiteContent(path || "/", "body", text, url);
      console.log("✅ Coletado:", path);

      // heurísticas de extração:
      // 1) planos - procurar cards, tabelas com palavras-chave tipo 'plano', 'R$'
      const planos = [];
      $(".plano-card, .pricing-card, .plan-item, .pricing-table, .plan-card").each((i, el) => {
        const nome = $(el).find("h2, h3, .plan-name, .plano-nome").first().text().trim();
        const preco = $(el).find(".price, .preco, .plan-price, .monthly-price").first().text().trim();
        const desc = $(el).find("p, .description, .descricao").first().text().trim();
        if (nome || preco) planos.push({ nome, preco, descricao: desc });
      });

      // fallback: busca por linhas que contenham "R$"
      if (planos.length === 0) {
        const moneyLines = text.match(/[^.]{0,120}R\$\s?\d+[.,]?\d*/g);
        if (moneyLines) {
          moneyLines.slice(0, 5).forEach(m => planos.push({ raw: m.trim() }));
        }
      }

      if (planos.length) {
        await savePlataformaInfo("planos", { planos, source: url });
        console.log("✅ Planos extraídos:", planos.length);
      }

      // 2) promoções - busca por 'promo' / 'promoção' / '% de desconto'
      const promoText = text.match(/(promo(?:ção)?|relâmpago|desconto|% off|% de desconto|R\$ \d{1,3}[.,]\d{2})/gi);
      if (promoText) {
        await savePlataformaInfo("promocoes", { match: Array.from(new Set(promoText)), source: url });
        console.log("✅ Promo detectada em", path);
      }

      // 3) contato - procura whatsapp/email no HTML
      const contato = {};
      const wa = $('a[href*="wa.me"], a[href*="whatsapp"]').first().attr("href");
      const mail = $('a[href^="mailto:"]').first().attr("href");
      if (wa) contato.whatsapp = wa;
      if (mail) contato.email = mail.replace(/^mailto:/, "");
      if (contato.whatsapp || contato.email) {
        await savePlataformaInfo("contato", { ...contato, source: url });
        console.log("✅ Contato extraído");
      }

    } catch (e) {
      console.warn("⚠️ Falha ao scrapear", path, e.message);
    }
  }

  // função recursiva para pegar arquivos do GitHub (como update-repo)
  async function fetchGitHubDir(apiUrl, path = "") {
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`GitHub API status ${res.status}`);
      const files = await res.json();

      for (const file of files) {
        if (file.type === "file" && file.name.match(/\.(html|md|txt|js|json)$/)) {
          const raw = await fetch(file.download_url);
          const text = await raw.text();
          await supabase.from("repo_content").upsert({
            file_path: (path + file.name),
            content: text,
            updated_at: new Date().toISOString()
          }, { onConflict: ["file_path"] });
          console.log("✅ GitHub file saved:", path + file.name);
        }
        if (file.type === "dir") {
          await fetchGitHubDir(file.url, file.path + "/");
        }
      }
    } catch (e) {
      console.warn("⚠️ GitHub fetch falhou:", e.message);
    }
  }

  // --- EXECUÇÃO ---
  // 1) scrape das páginas listadas
  for (const p of pages) await scrapePage(p);

  // 2) busque o repo completo do GitHub (slow but thorough)
  await fetchGitHubDir(githubApiRoot);

  console.log("✨ Atualização finalizada");
  return { statusCode: 200, body: JSON.stringify({ ok: true, msg: "IA atualizada com sucesso ✅" }) };
};