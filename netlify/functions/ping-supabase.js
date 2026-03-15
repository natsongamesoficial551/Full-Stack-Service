// netlify/functions/ping-supabase.js
// Roda automaticamente a cada 10 minutos via cron do Netlify.
// Faz uma query leve no Supabase para evitar hibernação do banco.

const https = require("https");

exports.handler = async () => {
  const url  = process.env.SUPABASE_URL;
  const key  = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("❌ Variáveis SUPABASE_URL ou SUPABASE_ANON_KEY não definidas.");
    return { statusCode: 500, body: "Variáveis de ambiente ausentes." };
  }

  // Query leve: busca 1 linha da tabela free_access_config (sempre existe)
  const endpoint = `${url}/rest/v1/free_access_config?select=id&limit=1`;

  return new Promise((resolve) => {
    const req = https.request(
      endpoint,
      {
        method: "GET",
        headers: {
          "apikey": key,
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json",
        },
      },
      (res) => {
        const status = res.statusCode;
        const now = new Date().toISOString();

        if (status === 200 || status === 206) {
          console.log(`✅ [${now}] Supabase pingado com sucesso. Status: ${status}`);
          resolve({ statusCode: 200, body: `Ping OK às ${now}` });
        } else {
          console.warn(`⚠️ [${now}] Supabase retornou status inesperado: ${status}`);
          resolve({ statusCode: status, body: `Status inesperado: ${status}` });
        }
      }
    );

    req.on("error", (err) => {
      console.error("❌ Erro ao pingar Supabase:", err.message);
      resolve({ statusCode: 500, body: `Erro: ${err.message}` });
    });

    req.end();
  });
};
