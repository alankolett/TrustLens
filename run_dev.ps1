# TrustLens One-Command Local Development Launcher
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "           TrustLens — Cyber Resilience Shield            " -ForegroundColor Yellow
Write-Host "       Seva First Innovation Challenge Prototype 2026     " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Start FastAPI Backend
Write-Host "`n[1/2] Starting FastAPI Backend on http://127.0.0.1:8000..." -ForegroundColor Green
$backendProcess = Start-Process -FilePath "backend\.venv\Scripts\python.exe" -ArgumentList "-m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload" -PassThru

# 2. Start Vite Frontend
Write-Host "[2/2] Starting Vite Frontend on http://localhost:5173..." -ForegroundColor Green
$frontendProcess = Start-Process -FilePath "npm" -ArgumentList "--prefix frontend run dev" -PassThru

Write-Host "`n>>> Both servers running! Open http://localhost:5173 in your browser." -ForegroundColor Yellow
Write-Host "Press Ctrl+C or close this terminal window to stop.`n"

try {
    Wait-Process -Id $backendProcess.Id, $frontendProcess.Id
} finally {
    Stop-Process -Id $backendProcess.Id -ErrorAction SilentlyContinue
    Stop-Process -Id $frontendProcess.Id -ErrorAction SilentlyContinue
}
