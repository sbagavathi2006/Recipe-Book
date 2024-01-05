import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'index-[hash].js', // Set the desired JS file name with hashing
        assetFileNames: 'index-[hash].css', // Set the desired CSS file name with hashing
      },
    },
  },
});
