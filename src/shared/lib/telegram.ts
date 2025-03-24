export const telegram = window.Telegram?.WebApp ?? null;

export const getTGUserData = () => {
  const params = new URLSearchParams(telegram?.initData || '');

  return JSON.parse(params.get('user') || '{}');
};
