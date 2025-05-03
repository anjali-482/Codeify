import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500 // (optional: increase chunk warning limit)
  },
  preview: {
    port: process.env.PORT || 4173, // 👈 important for Render
    host: true,                      // 👈 important for Render (listen on 0.0.0.0)
    allowedHosts: ['codeify-7bqk.onrender.com'],
  },
  server: {
    port: 3000,  // when you run locally using `npm run dev`
    host: true
  }
})
