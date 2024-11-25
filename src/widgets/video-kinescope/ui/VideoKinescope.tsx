import { FC } from 'react';

import { Flex } from '@chakra-ui/react';

import { OnVideoSuccess, VideoModel } from '~/shared/api/video';
import { useVideoQuality } from '~/shared/hooks';
import {
  ProgressCircleRing,
  ProgressCircleRoot,
  ProgressCircleValueText,
} from '~/shared/ui/progress-circle';

import { useCloseVideo, VideoClose } from '~/features/video/close';
import { useSkipVideo, VideoSkip } from '~/features/video/skip';

import { KINESCOPE_PLAYER_ID, SKIP_SECONDS_LIMIT } from '../lib/constants';
import useKinescopePlayer from '../model/use-kinescope-player';

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

  const { progress, playedSeconds } = useKinescopePlayer(factory, src, quality);

  const { handleSkip, isCanSkip } = useSkipVideo(canSkip, skipLimit, playedSeconds, onVideoEnded);

  const { isCanClose, handleClose } = useCloseVideo(closeLimit, playedSeconds, onVideoEnded);

  return (
    <Flex direction="column" pos="relative" overflow="hidden" h="full" w="full">
      <div id={KINESCOPE_PLAYER_ID} />

      <ProgressCircleRoot
        top={1}
        right={1}
        size="sm"
        pos="absolute"
        value={progress}
        colorPalette="gray"
        color="gray"
      >
        <ProgressCircleRing css={{ '--thickness': '4px' }} cap="round" />

        {isCanSkip && !isCanClose ? (
          <ProgressCircleValueText onClick={handleSkip}>
            <VideoSkip />
          </ProgressCircleValueText>
        ) : isCanClose ? (
          <ProgressCircleValueText onClick={handleClose}>
            <VideoClose />
          </ProgressCircleValueText>
        ) : null}
      </ProgressCircleRoot>
    </Flex>
  );
};

export default VideoKinescope;
