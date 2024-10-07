import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/typescript-amazon/', // Ensures asset paths are correct when deployed to GitHub Pages
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        checkout: path.resolve(__dirname, 'src/checkout.html'),
        orders: path.resolve(__dirname, 'src/orders.html'),
        tracking: path.resolve(__dirname, 'src/tracking.html')
      }
    },
  },
  server: {
    open: '/typescript-amazon/'
  }
});