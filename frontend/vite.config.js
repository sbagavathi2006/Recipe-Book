import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   build: {
      rollupOptions: {
        output: {
          entryFileNames: 'index-npm-build.js', // Set the desired file name pattern
        },
      },
    },
});
