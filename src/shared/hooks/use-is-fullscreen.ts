// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';

import { getTelegram } from '~/shared/lib/telegram.ts';

export const useIsFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(!!getTelegram()?.isFullscreen);

  const onFullScreenUpdate = useCallback(() => setIsFullScreen(getTelegram()?.isFullscreen), []);

  useEffect(() => {
    getTelegram()?.onEvent('fullscreenChanged', onFullScreenUpdate);

    return () => getTelegram()?.offEvent('fullscreenChanged', onFullScreenUpdate);
  }, [onFullScreenUpdate]);

  return isFullScreen;
};
