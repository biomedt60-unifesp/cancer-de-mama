import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  plugins: [react({ jsxRuntime: 'automatic' }), tailwindcss()],
  // Subpath no GitHub Pages (permite outras páginas no mesmo site, ex.: /outro-projeto/)
  base: command === 'build' ? '/cancer-de-mama/' : '/',
}));
