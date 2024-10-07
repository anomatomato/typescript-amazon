/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL for the application (specified in vite.config.ts) */
  BASE_URL: string;
  // You can add more environment variables here if needed 
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}