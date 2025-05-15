import { useCallback, useEffect, useRef, useState } from 'react';

import { useWindowFocus } from '~/shared/hooks';
import { ShowOptions } from '~/shared/store/global.store.ts';

import { INTERVAL } from '../lib/constants';

export const useImageContent = (
  notSkipSeconds: number,
  onEnded: ShowOptions['onEnded'],
  onAdLoaded: ShowOptions['onAdLoaded'],
) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onAdLoaded?.();
  };

  const handleClose = () => onEnded?.('completed');

  const [playedSeconds, setPlayedSeconds] = useState(0);

  const cancelTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const startTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setPlayedSeconds((prev) => {
        const isDone = prev >= notSkipSeconds * 1000;

        setIsEnded(isDone);

        return isDone ? prev : prev + INTERVAL;
      });
    }, INTERVAL);
  }, [notSkipSeconds]);

  useWindowFocus(startTimer, cancelTimer);

  useEffect(() => {
    if (isLoaded) startTimer();
  }, [isLoaded]);

  useEffect(() => {
    if (isEnded) cancelTimer();
  }, [cancelTimer, isEnded]);

  return {
    isEnded,
    isLoaded,
    handleLoad,
    handleClose,
    playedSeconds: playedSeconds / 1000,
  };
};
