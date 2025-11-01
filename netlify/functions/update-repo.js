const fetch = require("node-fetch");
const { createClient } = require("@supabase/supabase-js");

exports.handler = async () => {
  try {
    const repoUrl = "https://api.github.com/repos/natsongamesoficial551/Full-Stack-Service/contents/";

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    async function fetchFiles(url, path = "") {
      const res = await fetch(url);
      const files = await res.json();

      for (const file of files) {
        if (file.type === "file" && file.name.match(/\.(js|html|css|md)$/)) {
          const raw = await fetch(file.download_url);
          const text = await raw.text();

          await supabase.from("repo_content").upsert({
            file_path: path + file.name,
            content: text,
            updated_at: new Date()
          });

          console.log("✅ Atualizado:", path + file.name);
        }

        if (file.type === "dir") {
          await fetchFiles(file.url, file.path + "/");
        }
      }
    }

    await fetchFiles(repoUrl);
    return {
      statusCode: 200,
      body: "✅ Repositório atualizado!"
    };
  } catch (e) {
    return { statusCode: 500, body: e.toString() };
  }
};
