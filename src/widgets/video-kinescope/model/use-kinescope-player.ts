import { useCallback, useEffect, useState } from 'react';

import { AdQuality } from '~/shared/api/ad';
import { useWindowFocus } from '~/shared/hooks';

import { KINESCOPE_PLAYER_ID } from '../lib/constants';

const useKinescopePlayer = (
  factory: Kinescope.IframePlayer | null,
  src: string,
  quality: AdQuality,
) => {
  const [player, setPlayer] = useState<Kinescope.IframePlayer.Player | null>(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!factory || player) return;

    (async () => {
      const player = await factory.create(KINESCOPE_PLAYER_ID, {
        url: src,
        size: {
          width: '100%',
          height: '100%',
        },
        behavior: {
          muted: true,
          autoPlay: true,
          localStorage: false,
          // @ts-expect-error Kinescope has not described options
          seekable: false,
          endscreen: 'reset',
        },
        ui: {
          // @ts-expect-error Kinescope has not described options
          controlBar: 'always',
          buttonsBar: false,
        },
        keepElement: false,
      });

      setPlayer(player);

      player.on(player.Events.TimeUpdate, ({ data }) => setPlayedSeconds(data.currentTime));

      player.once(player.Events.DurationChange, ({ data }) => setDuration(data.duration));

      player.once(player.Events.Ended, () => setIsEnded(true));

      player.once(player.Events.VolumeChange, ({ data }) => setIsMuted(data.muted));
    })();
  }, [factory, player, src]);

  useEffect(() => {
    if (!player) return;

    if (quality) player.setVideoQuality(quality as Kinescope.IframePlayer.VideoQuality);
  }, [player, quality]);

  const handleDestroy = useCallback(
    (onDestroyed?: () => void) => () => player?.destroy()?.then(() => onDestroyed?.()),
    [player],
  );

  const handleFocus = useCallback(() => player?.play(), [player]);
  const handleBlur = useCallback(() => player?.pause(), [player]);

  const handleEnd = useCallback(
    (callback?: () => void) => () => {
      player?.seekTo(duration);
      callback?.();
    },
    [duration, player],
  );

  const toggleMute = useCallback(() => {
    if (!player) return;

    player.isMuted().then((muted) => (muted ? player.unmute() : player.mute()));
  }, [player]);

  useWindowFocus(handleFocus, handleBlur);

  return {
    playedSeconds,
    handleDestroy,
    handleEnd,
    isEnded,
    toggleMute,
    isMuted,
  };
};

export default useKinescopePlayer;
