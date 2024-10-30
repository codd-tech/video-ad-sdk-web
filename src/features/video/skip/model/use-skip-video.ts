import { useCallback, useEffect, useState } from 'react';

import { OnVideoSuccess } from '~/shared/api/video';

const useSkipVideo = (
  onVideoEnded: Nullable<OnVideoSuccess>,
  canSkip: boolean,
  skipLimit: number,
  playedSeconds: number,
) => {
  const [isCanSkip, setIsCanSkip] = useState(false);

  useEffect(() => {
    if (canSkip && playedSeconds >= skipLimit) setIsCanSkip(true);
  }, [canSkip, playedSeconds, skipLimit]);

  const handleSkip = useCallback(() => {
    onVideoEnded?.('skipped');
  }, [onVideoEnded]);

  return {
    isCanSkip,
    handleSkip,
  };
};

export default useSkipVideo;
