import { useEffect, useState } from 'react';

import { VideoQuality } from '~/shared/api/video';

import useNetworkSpeed from './use-network-speed';

const useVideoQuality = (src: string) => {
  const networkSpeed = useNetworkSpeed(src);

  const [videoQuality, setVideoQuality] = useState(VideoQuality.Low);

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

  return videoQuality;
};

export default useVideoQuality;
