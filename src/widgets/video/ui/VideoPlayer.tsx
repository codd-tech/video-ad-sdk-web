import { FC, useMemo } from 'react';

import { Box, Center, Flex, Spinner } from '@chakra-ui/react';

import { OnVideoSuccess, VideoModel } from '~/shared/api/video';
import {
  ProgressCircleRing,
  ProgressCircleRoot,
  ProgressCircleValueText,
} from '~/shared/ui/progress-circle';

import { useCloseVideo, VideoClose } from '~/features/video/close';
import { useSkipVideo, VideoSkip } from '~/features/video/skip';

import { SKIP_SECONDS_LIMIT } from '../lib/constants';
import { formatProgress } from '../lib/format-progress';
import usePlayer from '../model/use-player';

interface VideoPlayerProps {
  onVideoEnded: OnVideoSuccess;
}

const VideoPlayer: FC<VideoModel & VideoPlayerProps> = ({
  src,
  canSkip,
  skipLimit = SKIP_SECONDS_LIMIT,
  closeLimit,
  onVideoEnded,
}) => {
  const {
    videoRef,
    handleProgress,
    handlePause,
    handlePlay,
    handleTimeUpdate,
    handleWaiting,
    duration,
    progress,
    isWaiting,
  } = usePlayer(closeLimit);

  const playedSeconds = useMemo(() => formatProgress(progress, duration).getSeconds(), [progress]);

  const { handleSkip, isCanSkip } = useSkipVideo(onVideoEnded, canSkip, skipLimit, playedSeconds);

  const { isCanClose, handleClose } = useCloseVideo(onVideoEnded, closeLimit, playedSeconds);

  return (
    <Flex direction="column" pos="relative">
      {isWaiting ? (
        <Box inset={0} pos="absolute" bg="bg/20">
          <Center h="full">
            <Spinner color="gray.500" />
          </Center>
        </Box>
      ) : null}

      <video
        ref={videoRef}
        width="auto"
        height="100%"
        src={src}
        onProgress={handleProgress}
        onTimeUpdate={handleTimeUpdate}
        onWaiting={handleWaiting}
        onPlay={handlePlay}
        onPlaying={handlePlay}
        onPause={handlePause}
        autoPlay
        muted
      />

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

export default VideoPlayer;
