import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500
  },
  preview: {
    port: parseInt(process.env.PORT) || 4173, // ⬅️ Ensures PORT is read as number
    host: '0.0.0.0',                          // ⬅️ Listen on all interfaces for Render
  },
  server: {
    port: 3000,
    host: '0.0.0.0'  // ⬅️ Listen on all interfaces for dev (optional but consistent)
  }
})
