import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/dying-design-system/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@mp/dying': path.resolve(__dirname, './src'),
      '@/components/MathView': path.resolve(__dirname, './demo/MathView.tsx'),
    },
  },
  build: {
    outDir: 'dist',
  },
});
