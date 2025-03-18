import { useCallback, useEffect, useState } from 'react';

import { OnAdSuccess } from '~/shared/api/ad';

const useSkipVideo = (
  canSkip: boolean,
  skipLimit: number,
  playedSeconds: number,
  onEnded?: OnAdSuccess,
) => {
  const [isCanSkip, setIsCanSkip] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    if (canSkip && playedSeconds >= skipLimit) setIsCanSkip(true);
  }, [canSkip, playedSeconds, skipLimit]);

  const handleSkipToEnd = useCallback(() => setIsSkipped(true), []);

  const handleSkip = useCallback(() => {
    onEnded?.('skipped');
  }, [onEnded]);

  return {
    isCanSkip,
    handleSkip,
    handleSkipToEnd,
    isSkipped,
  };
};

export default useSkipVideo;
