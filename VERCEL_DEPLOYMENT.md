# 🚀 Vercel Deployment Guide for TrustLens

TrustLens is architected to deploy seamlessly on **Vercel** either as an **All-in-One Full-Stack Monorepo** or via a **Split Architecture** (Vercel Frontend + Render/Railway Backend).

---

## ⚡ Option 1: All-in-One Full-Stack Deployment on Vercel (Recommended)

Thanks to the included `vercel.json` and `api/index.py`, Vercel can build both the **React 18 frontend** and deploy the **FastAPI backend as a Python Serverless Function** in a single project.

### Step 1: Import Repository
1. Log in to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** → **"Project"**.
3. Select your GitHub repository: **`alankolett/TrustLens`**.

### Step 2: Configure Project Settings
- **Framework Preset**: Select **`Vite`** (or leave as **`Other`**).
- **Root Directory**: Leave as **`./`** (repository root).
- **Build & Output Settings**:
  - Automatically read from `vercel.json`:
    - **Build Command**: `cd frontend && npm install && npm run build`
    - **Output Directory**: `frontend/dist`

### Step 3: Add Environment Variables
In the **Environment Variables** panel in Vercel, add:

| Key | Value | Description |
|---|---|---|
| `XAI_API_KEY` | `xai-xxxxxxxxxxxx` | *(Optional)* Your xAI Grok API key. If omitted, TrustLens operates automatically in deterministic Rule Engine mode. |
| `XAI_MODEL` | `grok-2-1212` | Grok LLM model for text analysis |
| `XAI_VISION_MODEL` | `grok-2-vision-1212` | Grok Vision model for deepfake forensics |
| `FRONTEND_ORIGIN` | `https://your-project.vercel.app` | Production domain (CORS already permits all `*.vercel.app` preview URLs) |

### Step 4: Click "Deploy"
Vercel will:
1. Compile the React TypeScript frontend into `frontend/dist`.
2. Install Python dependencies from `requirements.txt`.
3. Deploy `api/index.py` as a serverless ASGI handler.
4. Route `/api/*`, `/samples`, and `/health` to the FastAPI backend, and all other traffic to the React frontend.

---

## 🌐 Option 2: Split Deployment (Vercel Frontend + External Backend)

If you prefer a persistent, long-running backend on **Render**, **Railway**, **Fly.io**, or **AWS EC2**:

### Step 1: Deploy Backend (e.g. Render / Railway)
- **Root Directory**: `backend` (or project root).
- **Build Command**: `pip install -r backend/requirements.txt`
- **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
- Note your live backend URL (e.g., `https://trustlens-api.onrender.com`).

### Step 2: Deploy Frontend on Vercel
1. Import **`alankolett/TrustLens`** in Vercel.
2. Under **Project Settings** → **Root Directory**, click **Edit** and set it to **`frontend`**.
3. Under **Environment Variables**, add:
   ```env
   VITE_API_URL=https://trustlens-api.onrender.com
   ```
4. Click **Deploy**. The React frontend will directly communicate with your external backend.

---

## 🛠️ Key Architectural Changes Made for Vercel

1. **Root `vercel.json`**:
   - Defines build orchestration (`frontend/dist`) and rewrites:
     - `/api/(.*)` $\to$ `/api/index.py`
     - `/samples` $\to$ `/api/index.py`
     - `/(.*)` $\to$ `/index.html` (prevents 404 errors on browser refresh).
2. **Serverless Entrypoint (`api/index.py`)**:
   - Exposes the ASGI `app` instance with dynamic `sys.path` resolution for Vercel's serverless runtime.
3. **Dynamic Frontend API Base (`frontend/src/config.ts`)**:
   - Automatically uses relative `/api` paths for all-in-one Vercel deployments, or respects `VITE_API_URL` for split setups.
4. **Permissive Preview CORS (`backend/main.py`)**:
   - Uses `allow_origin_regex=r"^https?:\/\/.*(\.vercel\.app|\.onrender\.com)$"` so every Vercel preview branch works out of the box without manual CORS whitelisting.

---

## ⚠️ Vercel Serverless Considerations

- **Serverless Request Payload Limit**: Vercel's free hobby tier restricts HTTP request bodies to **4.5 MB**. Ensure test images uploaded during the demo remain under ~4.5 MB.
- **Execution Timeout**: Vercel Serverless Functions have a 10s default execution limit (configurable up to 60s in `vercel.json` on Pro tiers). The Rule Engine executes in **< 10ms**, and xAI Grok responses typically complete in **1.5s–3s**.
