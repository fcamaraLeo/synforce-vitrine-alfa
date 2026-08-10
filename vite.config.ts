import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `base` sai de PAGES_BASE (definido pela Action do GitHub Pages, para os
// assets resolverem na subpasta do repo). Em dev e prévia a variável fica
// vazia e o app roda na raiz — dev não deve saber de deploy.
export default defineConfig({
  plugins: [react()],
  base: process.env.PAGES_BASE || "/",
});
