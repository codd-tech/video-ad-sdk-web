import { useCallback, useRef, useState } from 'react';

import { getProgress, getProgressInverted } from '../lib/get-progress';

const usePlayer = (durationLimit: number) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bufferedProgress, setBufferedProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleProgress = () => {
    if (!videoRef.current?.buffered || !videoRef.current.buffered.length) return;

    const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);

    if (!videoRef.current.duration) return;

    setBufferedProgress(getProgress(bufferedEnd, videoRef.current.duration));
    setDuration(Math.min(videoRef.current.duration, durationLimit));
  };
  const handleTimeUpdate = () => {
    setIsWaiting(false);

    if (Number.isNaN(videoRef.current?.duration) || !videoRef.current) return;

    const currentProgress = getProgress(videoRef.current.currentTime, videoRef.current.duration);

    setProgress(currentProgress);

    if (!duration) setDuration(Math.min(videoRef.current.duration, durationLimit));
  };

  const handleWaiting = useCallback(() => {
    setIsPlaying(false);
    setIsWaiting(true);
  }, []);
  const handlePlay = useCallback(() => {
    setIsWaiting(false);
    setIsPlaying(true);
  }, []);
  const handlePause = useCallback(() => {
    setIsPlaying(false);
    setIsWaiting(false);
  }, []);

  const play = () => videoRef.current?.play();
  const pause = () => videoRef.current?.pause();

  const togglePlay = () => {
    if (isPlaying) {
      pause();
      return;
    }

    play();
  };

  const seekTo = (newProgress: number) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = getProgressInverted(newProgress, videoRef.current.duration);

    play();
  };

  return {
    handleWaiting,
    handlePlay,
    handlePause,
    handleProgress,
    handleTimeUpdate,

    togglePlay,
    play,
    pause,
    seekTo,

    videoRef,

    progress,
    bufferedProgress,
    isPlaying,
    isWaiting,

    duration,
  };
};

export default usePlayer;
