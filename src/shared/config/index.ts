export const baseUrl = process.env.BASE_URL || import.meta.env.VITE_APP_API_BASE_URL;

export const baseApiTimeout = +(
  process.env.API_TIMEOUT ||
  import.meta.env.VITE_APP_API_TIMEOUT ||
  2000
);
