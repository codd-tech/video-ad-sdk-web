import { FC, useCallback, useMemo } from 'react';

import { Box, Center, Flex, Spinner } from '@chakra-ui/react';

import { OnVideoSuccess, VideoModel } from '~/shared/api/video';
import { useWindowFocus } from '~/shared/hooks';
import {
  ProgressCircleRing,
  ProgressCircleRoot,
  ProgressCircleValueText,
} from '~/shared/ui/progress-circle';

import { useCloseVideo, VideoClose } from '~/features/video/close';
import { useSkipVideo, VideoSkip } from '~/features/video/skip';

import { SKIP_SECONDS_LIMIT, VIDEO_ID } from '../lib/constants';
import { formatProgress } from '../lib/format-progress';
import usePlayer from '../model/use-player';
import useVideoQuality from '../model/use-video-quality';

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
  const source = useVideoQuality(src);

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
    pause,
    play,
  } = usePlayer(closeLimit);

  const handleFocus = useCallback(() => play(), [play]);
  const handleBlur = useCallback(() => pause(), [pause]);

  useWindowFocus(handleFocus, handleBlur);

  const playedSeconds = useMemo(
    () => formatProgress(progress, duration).getSeconds(),
    [duration, progress],
  );

  const { handleSkip, isCanSkip } = useSkipVideo(canSkip, skipLimit, playedSeconds, onVideoEnded);

  const { isCanClose, handleClose } = useCloseVideo(closeLimit, playedSeconds, onVideoEnded);

  return (
    <Flex direction="column" pos="relative" overflow="hidden">
      {isWaiting ? (
        <Box inset={0} pos="absolute" bg="bg/20">
          <Center h="full">
            <Spinner color="gray.500" />
          </Center>
        </Box>
      ) : null}

      <video
        id={VIDEO_ID}
        style={{ height: '100%' }}
        ref={videoRef}
        width="auto"
        height="100%"
        src={source}
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
