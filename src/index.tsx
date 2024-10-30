import { initApp, showVideo } from '~/app';

export { initApp, showVideo } from './app';

initApp();

showVideo({
  video: {
    src: 'https://videos.pexels.com/video-files/2035391/2035391-hd_1080_1440_30fps.mp4',
    canSkip: true,
    skipLimit: 5,
    closeLimit: 10,
  },
  onVideoEnded: (status) => {
    console.log(status);
  },
  onReward: null,
});
