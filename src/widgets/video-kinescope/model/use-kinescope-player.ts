import { MouseEventHandler, useCallback, useEffect, useState } from 'react';

import { useWindowFocus } from '~/shared/hooks';
import { ShowOptions } from '~/shared/store/global.store.ts';

import { KINESCOPE_PLAYER_ID } from '../lib/constants';

const useKinescopePlayer = (
  factory: Kinescope.IframePlayer | null,
  src: string,
  onAdLoaded: ShowOptions['onAdLoaded'],
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
        },
        ui: {
          // @ts-expect-error Kinescope has not described options
          controlBar: false,
          buttonsBar: false,
          controls: false,
        },
        keepElement: false,
      });

      setPlayer(player);

      player.once(player.Events.Ready, () => {
        onAdLoaded?.();
        console.log('ready');
      });
      player.once(player.Events.Error, (e) => console.log('error', e));

      player.on(player.Events.TimeUpdate, ({ data }) => setPlayedSeconds(data.currentTime));

      player.once(player.Events.DurationChange, ({ data }) => setDuration(data.duration));

      player.once(player.Events.Ended, () => setIsEnded(true));

      player.once(player.Events.VolumeChange, ({ data }) => setIsMuted(data.muted));
    })();
  }, [factory, player, src]);

  const handleDestroy =
    (onDestroyed?: () => void): MouseEventHandler =>
    (e) => {
      e.stopPropagation();
      player?.destroy()?.then(() => onDestroyed?.());
    };

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
    duration,
    toggleMute,
    isMuted,
  };
};

export default useKinescopePlayer;
