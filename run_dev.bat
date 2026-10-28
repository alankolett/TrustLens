@echo off
echo ==========================================================
echo            TrustLens — Cyber Resilience Shield            
echo        Seva First Innovation Challenge Prototype 2026     
echo ==========================================================

echo [1/2] Starting FastAPI Backend on http://127.0.0.1:8000...
start "TrustLens Backend" backend\.venv\Scripts\python.exe -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload

echo [2/2] Starting Vite Frontend on http://localhost:5173...
start "TrustLens Frontend" npm --prefix frontend run dev

echo.
echo === Both servers launched! Open http://localhost:5173 in your browser ===
