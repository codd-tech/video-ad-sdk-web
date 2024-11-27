import { useEffect, useState } from 'react';

import { VideoQuality } from '~/shared/api/video';

import { KINESCOPE_PLAYER_ID } from '../lib/constants';

const useKinescopePlayer = (
  factory: Kinescope.IframePlayer | null,
  src: string,
  quality: VideoQuality,
) => {
  const [player, setPlayer] = useState<Kinescope.IframePlayer.Player | null>(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);

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
      });

      setPlayer(player);

      player.on(player.Events.TimeUpdate, ({ data }) => {
        setPlayedSeconds(data.currentTime);
      });

      player.once(player.Events.Playing, () => {});
    })();
  }, [factory, player, src]);

  useEffect(() => {
    if (!player) return;

    if (quality) player.setVideoQuality(quality as Kinescope.IframePlayer.VideoQuality);
  }, [player, quality]);

  return {
    playedSeconds,
  };
};

export default useKinescopePlayer;