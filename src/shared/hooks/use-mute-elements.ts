import { useCallback, useMemo, useState } from 'react';

const useMuteElements = () => {
  const [mutedElements, setMutedElements] = useState<Element[]>([]);

  const elements = useMemo(() => document.querySelectorAll('video, audio'), []);

  const mute = (elem: HTMLVideoElement | HTMLAudioElement) => {
    if (elem.muted) return;

    elem.muted = true;

    setMutedElements((prev) => [...prev, elem]);
  };

  const unmute = (elem: HTMLVideoElement | HTMLAudioElement) => {
    elem.muted = false;
  };

  const handleMuteAll = useCallback(
    (excludeId?: string) =>
      elements.forEach(
        (elem) => elem.id !== excludeId && mute(elem as HTMLVideoElement | HTMLAudioElement),
      ),
    [elements],
  );

  const handleUnmuteAll = useCallback(() => {
    mutedElements.forEach((elem) => unmute(elem as HTMLVideoElement | HTMLAudioElement));

    setMutedElements([]);
  }, [mutedElements]);

  return {
    handleMuteAll,
    handleUnmuteAll,
  };
};

export default useMuteElements;
