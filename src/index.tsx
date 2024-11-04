import { initApp, showVideo } from '~/app';

if (import.meta.env.DEV) {
  initApp('');

  showVideo({
    video: {
      src: 'https://videos.pexels.com/video-files/2035391/2035391-hd_1080_1440_30fps.mp4',
      canSkip: true,
      skipLimit: 5,
      closeLimit: 10,
    },
  });
}

export { showVideo, initApp };
