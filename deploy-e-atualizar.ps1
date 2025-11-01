# ============================================
# 🔍 VERIFICADOR COMPLETO SUPABASE
# ============================================

$SUPABASE_URL = "https://jqihtlvhradhpfckauaj.supabase.co"  # ⚠️ ALTERE
$SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaWh0bHZocmFkaHBmY2thdWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NzEwOTEsImV4cCI6MjA3NzI0NzA5MX0.FO9_1dtEVdGstY2Rni3h5ul6Uu729n91ChA2njS-Mi8"                   # ⚠️ ALTERE
$BACKEND_URL = "https://natanai-dev.onrender.com"  # ⚠️ ALTERE

Write-Host "`n🔍 VERIFICADOR COMPLETO SUPABASE" -ForegroundColor Cyan
Write-Host "=" * 70 -ForegroundColor Gray

# ============================================
# Função para consultar Supabase
# ============================================
function Query-Supabase {
    param(
        [string]$Table,
        [string]$Select = "*",
        [int]$Limit = 10
    )
    
    $headers = @{
        "apikey" = $SUPABASE_KEY
        "Authorization" = "Bearer $SUPABASE_KEY"
        "Content-Type" = "application/json"
    }
    
    $url = "$SUPABASE_URL/rest/v1/$Table"
    $url += "?select=$Select&limit=$Limit&order=scraped_at.desc,criado_em.desc"
    
    try {
        $response = Invoke-RestMethod -Uri $url -Headers $headers -Method GET
        return $response
    } catch {
        Write-Host "❌ Erro ao consultar $Table : $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# ============================================
# 1. SITE_CONTENT
# ============================================
Write-Host "`n📄 1. SITE_CONTENT" -ForegroundColor Yellow
Write-Host "-" * 70 -ForegroundColor Gray

$siteContent = Query-Supabase -Table "site_content" -Limit 5

if ($siteContent) {
    Write-Host "✅ Total de registros: $($siteContent.Count)" -ForegroundColor Green
    
    if ($siteContent.Count -gt 0) {
        $ultimo = $siteContent[0]
        Write-Host "📅 Última atualização: $($ultimo.scraped_at)" -ForegroundColor Cyan
        Write-Host "📄 Última página: $($ultimo.page_name)" -ForegroundColor Cyan
        
        Write-Host "`n📋 Páginas recentes:" -ForegroundColor White
        foreach ($item in $siteContent) {
            $preview = $item.content.Substring(0, [Math]::Min(50, $item.content.Length))
            Write-Host "  • $($item.page_name) - $($item.scraped_at)" -ForegroundColor Gray
            Write-Host "    $preview..." -ForegroundColor DarkGray
        }
    }
} else {
    Write-Host "⚠️ Nenhum registro encontrado" -ForegroundColor Yellow
}

# ============================================
# 2. IA_MEMORIA
# ============================================
Write-Host "`n`n🧠 2. IA_MEMORIA" -ForegroundColor Yellow
Write-Host "-" * 70 -ForegroundColor Gray

$iaMemoria = Query-Supabase -Table "ia_memoria" -Select "texto,origem,criado_em" -Limit 5

if ($iaMemoria) {
    Write-Host "✅ Total de memórias: $($iaMemoria.Count)" -ForegroundColor Green
    
    if ($iaMemoria.Count -gt 0) {
        $ultima = $iaMemoria[0]
        Write-Host "📅 Última memória: $($ultima.criado_em)" -ForegroundColor Cyan
        Write-Host "📌 Origem: $($ultima.origem)" -ForegroundColor Cyan
        
        Write-Host "`n📋 Memórias recentes:" -ForegroundColor White
        foreach ($mem in $iaMemoria) {
            Write-Host "  • [$($mem.origem)] $($mem.criado_em)" -ForegroundColor Gray
            Write-Host "    $($mem.texto)" -ForegroundColor DarkGray
        }
    }
} else {
    Write-Host "⚠️ Nenhuma memória encontrada" -ForegroundColor Yellow
}

# ============================================
# 3. PLATAFORMA_INFO
# ============================================
Write-Host "`n`n💼 3. PLATAFORMA_INFO" -ForegroundColor Yellow
Write-Host "-" * 70 -ForegroundColor Gray

$plataformaInfo = Query-Supabase -Table "plataforma_info" -Limit 10

if ($plataformaInfo) {
    Write-Host "✅ Total de seções: $($plataformaInfo.Count)" -ForegroundColor Green
    
    Write-Host "`n📋 Seções disponíveis:" -ForegroundColor White
    foreach ($info in $plataformaInfo) {
        Write-Host "  • $($info.secao)" -ForegroundColor Gray
        if ($info.criado_em) {
            Write-Host "    Atualizado: $($info.criado_em)" -ForegroundColor DarkGray
        }
    }
} else {
    Write-Host "⚠️ Nenhuma seção encontrada" -ForegroundColor Yellow
}

# ============================================
# 4. REPO_CONTENT
# ============================================
Write-Host "`n`n🗂️ 4. REPO_CONTENT" -ForegroundColor Yellow
Write-Host "-" * 70 -ForegroundColor Gray

$repoContent = Query-Supabase -Table "repo_content" -Select "file_path,scraped_at" -Limit 5

if ($repoContent) {
    Write-Host "✅ Total de arquivos: $($repoContent.Count)" -ForegroundColor Green
    
    if ($repoContent.Count -gt 0) {
        Write-Host "`n📋 Arquivos recentes:" -ForegroundColor White
        foreach ($file in $repoContent) {
            Write-Host "  • $($file.file_path)" -ForegroundColor Gray
            Write-Host "    Atualizado: $($file.scraped_at)" -ForegroundColor DarkGray
        }
    }
} else {
    Write-Host "⚠️ Nenhum arquivo encontrado" -ForegroundColor Yellow
}

# ============================================
# 5. CACHE STATUS DO BACKEND
# ============================================
Write-Host "`n`n🔄 5. STATUS DO CACHE (BACKEND)" -ForegroundColor Yellow
Write-Host "-" * 70 -ForegroundColor Gray

try {
    $cacheStatus = Invoke-RestMethod -Uri "$BACKEND_URL/cache_status" -Method GET
    
    foreach ($tabela in $cacheStatus.status.PSObject.Properties) {
        $nome = $tabela.Name
        $info = $tabela.Value
        
        $status = if ($info.carregado) { "✅" } else { "❌" }
        $cor = if ($info.carregado) { "Green" } else { "Red" }
        
        Write-Host "`n  $status $nome" -ForegroundColor $cor
        Write-Host "     Registros: $($info.registros)" -ForegroundColor Gray
        
        if ($info.ultima_atualizacao) {
            Write-Host "     Última atualização: $($info.ultima_atualizacao)" -ForegroundColor Gray
        }
        
        if ($info.tempo_desde_atualizacao) {
            Write-Host "     Tempo decorrido: $($info.tempo_desde_atualizacao)" -ForegroundColor Gray
        }
    }
    
    Write-Host "`n  ⏱️ Intervalo de atualização: $($cacheStatus.intervalo_atualizacao)" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Erro ao verificar cache: $($_.Exception.Message)" -ForegroundColor Red
}

# ============================================
# RESUMO FINAL
# ============================================
Write-Host "`n`n" + ("=" * 70) -ForegroundColor Gray
Write-Host "📊 RESUMO" -ForegroundColor Cyan
Write-Host ("=" * 70) -ForegroundColor Gray

Write-Host "`n✅ Páginas do site: $($siteContent.Count) registros" -ForegroundColor Green
Write-Host "✅ Memórias da IA: $($iaMemoria.Count) registros" -ForegroundColor Green
Write-Host "✅ Info da plataforma: $($plataformaInfo.Count) seções" -ForegroundColor Green
Write-Host "✅ Arquivos do repo: $($repoContent.Count) arquivos" -ForegroundColor Green

if ($siteContent.Count -gt 0) {
    $ultimaAtualizacao = [DateTime]::Parse($siteContent[0].scraped_at)
    $tempoDecorrido = (Get-Date) - $ultimaAtualizacao
    
    Write-Host "`n⏰ Última atualização geral: $($siteContent[0].scraped_at)" -ForegroundColor Cyan
    Write-Host "⏱️ Tempo decorrido: $([Math]::Round($tempoDecorrido.TotalMinutes, 1)) minutos" -ForegroundColor Cyan
    
    if ($tempoDecorrido.TotalMinutes -lt 10) {
        Write-Host "✅ Dados ATUALIZADOS! 🎉" -ForegroundColor Green
    } elseif ($tempoDecorrido.TotalMinutes -lt 60) {
        Write-Host "⚠️ Dados um pouco desatualizados (menos de 1 hora)" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Dados DESATUALIZADOS! Rode o script de deploy novamente." -ForegroundColor Red
    }
}

Write-Host "`n" + ("=" * 70) -ForegroundColor Gray
Write-Host "✨ Verificação concluída!" -ForegroundColor Green
Write-Host "`n"