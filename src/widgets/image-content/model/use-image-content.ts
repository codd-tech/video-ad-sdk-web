import { useCallback, useEffect, useRef, useState } from 'react';

import { useWindowFocus } from '~/shared/hooks';
import { ShowOptions } from '~/shared/store/global.store.ts';

export const useImageContent = (notSkipSeconds: number, onEnded: ShowOptions['onEnded']) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const handleLoad = () => setIsLoaded(true);

  const handleClose = () => onEnded?.('closed');

  const [playedSeconds, setPlayedSeconds] = useState(0);

  const cancelTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const startTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setPlayedSeconds((prev) => {
        const isDone = prev === notSkipSeconds;

        if (isDone) cancelTimer();

        setIsEnded(isDone);

        return isDone ? prev : prev + 1;
      });
    }, 1000);
  }, [cancelTimer, notSkipSeconds]);

  useWindowFocus(startTimer, cancelTimer);

  useEffect(() => {
    if (isLoaded) startTimer();
  }, [isLoaded]);

  return {
    isEnded,
    isLoaded,
    handleLoad,
    handleClose,
    playedSeconds,
  };
};
