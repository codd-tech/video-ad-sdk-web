import { initApp, showVideo } from '~/app';

if (import.meta.env.DEV) {
  initApp('');

  showVideo({
    video: {
      src: 'https://kinescope.io/mMZhUWSyT2F4aWFp6BJT5X',
      canSkip: true,
      skipLimit: 5,
      closeLimit: 10,
    },
  });
}

export { showVideo, initApp };
