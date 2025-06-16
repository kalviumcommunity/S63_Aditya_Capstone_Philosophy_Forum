import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          vendor: ['dayjs'],
        },
      },
    },
  },
  resolve: {
    alias: {
      'dayjs': path.resolve(__dirname, 'node_modules/dayjs'),
    },
  },
  optimizeDeps: {
    include: ['dayjs'],
    exclude: [],
  },
})
