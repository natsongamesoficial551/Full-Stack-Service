// netlify/functions/atualizar-ia.js
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');

// Handler da função
exports.handler = async (event, context) => {
  console.log('🚀 Iniciando atualização da IA...');

  // Segurança: verifica token secreto
  const authHeader = event.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  
  if (token !== process.env.WEBHOOK_SECRET) {
    console.log('❌ Token inválido');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Não autorizado' })
    };
  }

  try {
    // Inicializa Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    const resultados = {
      planos: false,
      portfolio: false,
      contato: false
    };

    // ============================================
    // 1️⃣ EXTRAI PLANOS
    // ============================================
    console.log('📊 Extraindo planos...');
    try {
      const resPlanos = await fetch('https://natansites.com.br/planos', {
        timeout: 10000
      });
      const htmlPlanos = await resPlanos.text();
      const $planos = cheerio.load(htmlPlanos);

      const planos = {};

      // 🔧 ADAPTE ESTES SELETORES PARA SEU HTML REAL
      // Exemplo genérico - você precisa ajustar!
      
      // Opção 1: Se você usa classes específicas
      $('.plano-card, .pricing-card, .plan-item').each((i, elem) => {
        const nome = $planos(elem).find('h2, h3, .plano-nome, .plan-name').first().text().trim();
        const precoSetup = $planos(elem).find('.preco-setup, .setup-price').text().trim();
        const precoMensal = $planos(elem).find('.preco-mensal, .monthly-price').text().trim();
        
        const features = [];
        $planos(elem).find('li, .feature').each((j, li) => {
          features.push($planos(li).text().trim());
        });

        if (nome) {
          const chave = nome.toLowerCase().replace(/\s+/g, '_');
          planos[chave] = {
            nome: nome,
            preco_setup: precoSetup || 'N/A',
            preco_mensal: precoMensal || 'N/A',
            features: features.filter(f => f.length > 0)
          };
        }
      });

      // Se encontrou planos, atualiza
      if (Object.keys(planos).length > 0) {
        await supabase
          .from('plataforma_info')
          .upsert({
            secao: 'planos',
            dados: planos,
            atualizado_em: new Date().toISOString()
          }, {
            onConflict: 'secao'
          });

        console.log(`✅ ${Object.keys(planos).length} planos atualizados`);
        resultados.planos = true;
      } else {
        console.log('⚠️ Nenhum plano encontrado');
      }

    } catch (error) {
      console.error('❌ Erro ao extrair planos:', error.message);
    }

    // ============================================
    // 2️⃣ EXTRAI PORTFÓLIO
    // ============================================
    console.log('💼 Extraindo portfólio...');
    try {
      const resPortfolio = await fetch('https://natansites.com.br/portfolio', {
        timeout: 10000
      });
      const htmlPortfolio = await resPortfolio.text();
      const $portfolio = cheerio.load(htmlPortfolio);

      const projetos = [];

      // 🔧 ADAPTE PARA SEU HTML
      $('.projeto-card, .portfolio-item, .project-card').each((i, elem) => {
        const nome = $portfolio(elem).find('h2, h3, .projeto-nome, .project-name').first().text().trim();
        const url = $portfolio(elem).find('a').first().attr('href') || '';
        const descricao = $portfolio(elem).find('p, .descricao, .description').first().text().trim();

        if (nome) {
          projetos.push({
            nome: nome,
            url: url,
            descricao: descricao || ''
          });
        }
      });

      if (projetos.length > 0) {
        await supabase
          .from('plataforma_info')
          .upsert({
            secao: 'portfolio',
            dados: { projetos },
            atualizado_em: new Date().toISOString()
          }, {
            onConflict: 'secao'
          });

        console.log(`✅ ${projetos.length} projetos atualizados`);
        resultados.portfolio = true;
      }

    } catch (error) {
      console.error('❌ Erro ao extrair portfólio:', error.message);
    }

    // ============================================
    // 3️⃣ EXTRAI CONTATO
    // ============================================
    console.log('📞 Extraindo contato...');
    try {
      const resContato = await fetch('https://natansites.com.br/contato', {
        timeout: 10000
      });
      const htmlContato = await resContato.text();
      const $contato = cheerio.load(htmlContato);

      const contato = {
        whatsapp: $contato('a[href*="wa.me"], a[href*="whatsapp"]').first().text().trim() || '(21) 99282-6074',
        email: $contato('a[href^="mailto:"]').first().text().trim() || 'borgesnatan09@gmail.com',
        site: 'https://natansites.com.br'
      };

      await supabase
        .from('plataforma_info')
        .upsert({
          secao: 'contato',
          dados: contato,
          atualizado_em: new Date().toISOString()
        }, {
          onConflict: 'secao'
        });

      console.log('✅ Contato atualizado');
      resultados.contato = true;

    } catch (error) {
      console.error('❌ Erro ao extrair contato:', error.message);
    }

    // ============================================
    // RESULTADO FINAL
    // ============================================
    const total = Object.values(resultados).filter(Boolean).length;
    const mensagem = `✨ Atualização concluída: ${total}/3 seções atualizadas`;
    
    console.log(mensagem);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: mensagem,
        resultados: resultados,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('❌ Erro geral:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};