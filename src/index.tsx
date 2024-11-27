import { initApp, showVideo } from '~/app';

if (import.meta.env.DEV) {
  initApp('');

  showVideo({
    video: {
      canSkip: true,
      skipLimit: 5,
      closeLimit: 10,
    },
  });
}

export { showVideo, initApp };
