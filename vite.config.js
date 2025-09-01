import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      sourcemap: false,
    }
  },
  build: {
    sourcemap: false, // Disables source map generation
  },
})
