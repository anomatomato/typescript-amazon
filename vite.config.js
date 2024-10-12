import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/typescript-amazon/', // Ensures asset paths are correct when deployed to GitHub Pages
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        checkout: path.resolve(__dirname, 'checkout.html'),
        orders: path.resolve(__dirname, 'orders.html'),
        tracking: path.resolve(__dirname, 'tracking.html')
      }
    },
  },
  test: {
    environment: 'happy-dom',
    reporters: ['default'],
  },
  server: {
    open: '/typescript-amazon/'
  }
});