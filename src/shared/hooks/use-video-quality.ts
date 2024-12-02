import { useEffect, useState } from 'react';

import { AdQuality } from '~/shared/api/ad';

import useNetworkSpeed from './use-network-speed';

const useVideoQuality = (src: string) => {
  const networkSpeed = useNetworkSpeed(src);

  const [videoQuality, setVideoQuality] = useState(AdQuality.Low);

  useEffect(() => {
    if (networkSpeed) {
      switch (true) {
        case networkSpeed >= 5000:
          setVideoQuality(AdQuality.VeryHigh);
          break;
        case networkSpeed >= 3000:
          setVideoQuality(AdQuality.High);
          break;
        case networkSpeed >= 1000:
          setVideoQuality(AdQuality.Medium);
          break;
        default:
          setVideoQuality(AdQuality.Low);
      }

      return;
    }

    setVideoQuality(AdQuality.Low);
  }, [networkSpeed]);

  return videoQuality;
};

export default useVideoQuality;
