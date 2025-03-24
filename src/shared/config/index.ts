export const baseUrl = 'https://api.teleads.pro/api';

export const baseApiTimeout = +(
  process.env.API_TIMEOUT ||
  import.meta.env.VITE_APP_API_TIMEOUT ||
  10000
);
