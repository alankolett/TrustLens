/**
 * Global API configuration.
 * Automatically adapts between:
 * 1. Local development (proxied by Vite)
 * 2. Vercel all-in-one deployment (relative /api path)
 * 3. Split deployment (VITE_API_URL points to Render/Railway backend)
 */
export const API_BASE_URL: string = (
  import.meta.env.VITE_API_URL ? String(import.meta.env.VITE_API_URL).replace(/\/$/, '') : ''
);
