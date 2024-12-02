import { FC, useCallback } from 'react';

import { Flex, IconButton } from '@chakra-ui/react';

import { AdModel } from '~/shared/api/ad';
import { useVideoQuality } from '~/shared/hooks';
import { telegram } from '~/shared/lib/telegram.ts';
import { ShowOptions } from '~/shared/store/global.store';

import { useCloseVideo, VideoClose } from '~/features/video/close';
import { useSkipVideo, VideoSkip } from '~/features/video/skip';

import { KINESCOPE_PLAYER_ID, SKIP_SECONDS_LIMIT } from '../lib/constants';
import useKinescopePlayer from '../model/use-kinescope-player';

interface VideoKinescopeProps {
  factory: Kinescope.IframePlayer | null;
}

const VideoKinescope: FC<AdModel & Omit<ShowOptions, 'type'> & VideoKinescopeProps> = ({
  factory,
  onEnded,
  onClick,
  src,
  link,
  canSkip,
  skipLimit = SKIP_SECONDS_LIMIT,
  closeLimit,
}) => {
  const quality = useVideoQuality(src);

  const { playedSeconds, handleDestroy } = useKinescopePlayer(factory, src, quality);

  const { handleSkip, isCanSkip } = useSkipVideo(canSkip, skipLimit, playedSeconds, onEnded);

  const { isCanClose, handleClose } = useCloseVideo(closeLimit, playedSeconds, onEnded);

  const handleClick = useCallback(() => {
    onClick?.();

    telegram?.openLink(link, { try_instant_view: true });
  }, [link, onClick]);

  return (
    <Flex
      direction="column"
      pos="relative"
      overflow="hidden"
      h="full"
      w="full"
      onClick={handleClick}
    >
      <div id={KINESCOPE_PLAYER_ID} />

      {isCanSkip && !isCanClose ? (
        <IconButton top={1} right={1} size="xs" pos="absolute" onClick={handleDestroy(handleSkip)}>
          <VideoSkip />
        </IconButton>
      ) : isCanClose ? (
        <IconButton top={1} right={1} size="xs" pos="absolute" onClick={handleDestroy(handleClose)}>
          <VideoClose />
        </IconButton>
      ) : null}
    </Flex>
  );
};

export default VideoKinescope;
