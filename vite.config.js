import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 8787,
    host: true,
    strictPort: true,
  },
  preview: {
    port: 8787,
    host: true,
    strictPort: true,
  },
})
