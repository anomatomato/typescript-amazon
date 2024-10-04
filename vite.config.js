import { defineConfig } from 'vite';

export default defineConfig({
  root: './src', // Points Vite to the `src` directory where your amazon.html is located
  publicDir: '../public',
  build: {
    rollupOptions: {
      input: './amazon.html',  // HTML-Einstiegspunkt 
    },
    emptyOutDir: true,
    outDir: '../dist', // Where the built files will go
  },
  server: {
    open: './amazon.html', // Tells Vite to open amazon.html when the server starts
  },
});