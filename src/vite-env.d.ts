/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_BASE_URL: string;
  readonly VITE_APP_API_TIMEOUT: string;
  readonly VITE_APP_API_AUTH_DATA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
