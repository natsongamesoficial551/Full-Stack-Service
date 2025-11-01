Write-Host "🚀 DEPLOY E ATUALIZAÇÃO AUTOMÁTICA DA IA" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Gray

# 1. Git push
Write-Host "`n📤 Fazendo commit e push..." -ForegroundColor Yellow
git add .
git commit -m "Atualização do site - $(Get-Date -Format 'dd/MM/yyyy HH:mm')"
git push origin main

# 2. Aguarda deploy
Write-Host "`n⏳ Aguardando 45 segundos para Netlify fazer deploy..." -ForegroundColor Magenta
Start-Sleep -Seconds 45

# 3. Chama webhook
Write-Host "`n🔄 Atualizando IA com novos dados..." -ForegroundColor Green
try {
    $response = Invoke-WebRequest `
        -Uri "https://natansites.com.br/.netlify/functions/atualizar-ia" `
        -Headers @{ 
            Authorization = "Bearer 1e3f6161ed2412732e3604ed3ce100ea93a29141c3dcb500b76a46cc085b182e"
            "Content-Type" = "application/json"
        } `
        -Method POST `
        -TimeoutSec 30

    Write-Host "`n✅ SUCESSO!" -ForegroundColor Green
    Write-Host $response.Content
    Write-Host "`nℹ️ IA será atualizada em até 5 minutos" -ForegroundColor Cyan
} catch {
    Write-Host "`n❌ Erro ao chamar webhook:" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

Write-Host "`n" + ("=" * 60) -ForegroundColor Gray
Write-Host "✨ Processo concluído!" -ForegroundColor Green