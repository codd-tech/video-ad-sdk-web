import { FC } from 'react';

import { Flex, IconButton } from '@chakra-ui/react';

import { OnVideoSuccess, VideoModel } from '~/shared/api/video';
import { useVideoQuality } from '~/shared/hooks';

import { useCloseVideo, VideoClose } from '~/features/video/close';
import { useSkipVideo, VideoSkip } from '~/features/video/skip';

import { KINESCOPE_PLAYER_ID, SKIP_SECONDS_LIMIT } from '../lib/constants';
import useKinescopePlayer from '../model/use-kinescope-player';

import './styles.css';

interface VideoKinescopeProps {
  factory: Kinescope.IframePlayer | null;
  onVideoEnded: OnVideoSuccess;
}

const VideoKinescope: FC<VideoModel & VideoKinescopeProps> = ({
  factory,
  onVideoEnded,
  src,
  canSkip,
  skipLimit = SKIP_SECONDS_LIMIT,
  closeLimit,
}) => {
  const quality = useVideoQuality(src);

  const { playedSeconds, handleDestroy } = useKinescopePlayer(factory, src, quality);

  const { handleSkip, isCanSkip } = useSkipVideo(canSkip, skipLimit, playedSeconds, onVideoEnded);

  const { isCanClose, handleClose } = useCloseVideo(closeLimit, playedSeconds, onVideoEnded);

  return (
    <Flex direction="column" pos="relative" overflow="hidden" h="full" w="full">
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
