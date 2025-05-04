import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react() , tailwindcss()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500
  },
  preview: {
    port: process.env.PORT || 4173,
    host: true,
    allowedHosts: ['codeify-7bqk.onrender.com'], 
  },
  server: {
    port: 3000,
    host: true
  }
})
