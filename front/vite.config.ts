/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // vitestの設定
  test: {
    // https://vitest.dev/config/
    environment: "happy-dom",
  },

  plugins: [
    react(),
    tailwindcss(),
  ],
})
