export const getTelegram = () => window.Telegram?.WebApp ?? null;

export const getTGUserData = () => {
  const params = new URLSearchParams(getTelegram()?.initData || '');

  return JSON.parse(params.get('user') || '{}');
};
