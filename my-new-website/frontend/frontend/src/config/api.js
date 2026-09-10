// Vite exposes env vars on import.meta.env, not process.env — `process` is
// undefined in the browser bundle, so the old CRA-style read threw a
// ReferenceError and took the page down with it.
export const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// Web3Forms delivers the contact form straight to my inbox, so the form works
// with no backend deployed. Set VITE_WEB3FORMS_KEY in Vercel's env vars.
// Without a key the form falls back to a plain mailto link.
export const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";
export const CONTACT_EMAIL = "kevinogetobwoma@gmail.com";
