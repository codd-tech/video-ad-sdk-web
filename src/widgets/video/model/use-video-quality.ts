import { useEffect, useMemo, useState } from 'react';

import { VideoQuality } from '~/shared/api/video';
import { useNetworkSpeed } from '~/shared/hooks';

const useVideoQuality = (src: string) => {
  // TODO: change test file url
  const networkSpeed = useNetworkSpeed(src);

  const [videoQuality, setVideoQuality] = useState(VideoQuality.Low);

  const videoSource = useMemo(() => {
    const [path, ext] = src.split('.');

    return `${path}-${videoQuality}.${ext}`;
  }, [src, videoQuality]);

  useEffect(() => {
    if (networkSpeed) {
      switch (true) {
        case networkSpeed >= 5000:
          setVideoQuality(VideoQuality.VeryHigh);
          break;
        case networkSpeed >= 3000:
          setVideoQuality(VideoQuality.High);
          break;
        case networkSpeed >= 1000:
          setVideoQuality(VideoQuality.Medium);
          break;
        default:
          setVideoQuality(VideoQuality.Low);
      }

      return;
    }

    setVideoQuality(VideoQuality.Low);
  }, [networkSpeed]);

  return videoSource;
};

export default useVideoQuality;
