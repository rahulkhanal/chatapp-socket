import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Optional: You can set additional options here
        additionalData: `@import "variables";`, // Example for global variables
      },
    },
  },
})
