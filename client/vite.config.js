import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(".", "./src"),
    },
  },
  plugins: [
    react(), tailwindcss()
  ],
  server: {
    host: '0.0.0.0', // Allow all hosts (LAN, Live Share tunnel)
    strictPort: true, // Ensure port 5173 is used
  }
})
