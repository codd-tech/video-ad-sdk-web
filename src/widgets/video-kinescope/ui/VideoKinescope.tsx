import { FC, useCallback, useMemo } from 'react';
import { Flex } from 'antd';

import { ADFinalOverlay } from '~/entities/ad';
import { VideoAction } from '~/features/video/action';
import { useCloseVideo } from '~/features/video/close';
import { useSkipVideo } from '~/features/video/skip';
import { AdModel } from '~/shared/api/ad';
import { IconSpeaker, IconSpeakerX, IconXMark } from '~/shared/assets';
import { getTelegram } from '~/shared/lib/telegram';
import { ShowOptions } from '~/shared/store/global.store';
import { ButtonIcon, OverlayHeader, SafeAreaView, Timer } from '~/shared/ui';

import { KINESCOPE_PLAYER_ID } from '../lib/constants';
import useKinescopePlayer from '../model/use-kinescope-player';

import styles from './styles.module.scss';

interface VideoKinescopeProps {
  factory: Kinescope.IframePlayer | null;
}

const VideoKinescope: FC<
  AdModel['data'] & Omit<ShowOptions, 'adUnitId' | 'token'> & VideoKinescopeProps
> = ({ factory, onEnded, onClick, content, ageLimit, onAdLoaded }) => {
  const src = content.videoUrl!;
  const notSkipSeconds = content.notSkipSeconds;
  const button = content.button;

  const { playedSeconds, handleDestroy, handleEnd, isEnded, isMuted, toggleMute, duration } =
    useKinescopePlayer(factory, src, onAdLoaded);

  const showActionButton = useMemo(() => playedSeconds >= 5, [playedSeconds]);

  const { handleSkip, isCanSkip, handleSkipToEnd, isSkipped } = useSkipVideo(
    notSkipSeconds < duration,
    notSkipSeconds,
    playedSeconds,
    onEnded,
  );

  const { isCanClose, handleClose } = useCloseVideo(
    duration || notSkipSeconds,
    playedSeconds,
    onEnded,
  );

  const handleClick = useCallback(() => {
    onClick?.();

    getTelegram()?.openLink(button.url, { try_instant_view: true });
  }, [button.url, onClick]);

  return (
    <Flex className={styles.wrapper} vertical>
      <div id={KINESCOPE_PLAYER_ID} />

      <SafeAreaView disableBottom={isEnded}>
        {isEnded ? null : (
          <Timer duration={duration} progress={playedSeconds} offset={showActionButton} />
        )}

        {!isEnded && showActionButton ? (
          <VideoAction text={button.text} onClick={handleClick} absolute />
        ) : null}

        {isEnded ? (
          <ADFinalOverlay
            onClick={handleClick}
            ageLimit={ageLimit}
            content={content}
            HeaderAction={
              <ButtonIcon
                hideBlur
                icon={<IconXMark />}
                onClick={handleDestroy(isSkipped ? handleSkip : handleClose)}
              />
            }
            Action={<VideoAction text={button.text} onClick={handleClick} fixedWidth />}
          />
        ) : (
          <OverlayHeader
            ageLimit={ageLimit}
            left={
              <ButtonIcon
                icon={isMuted ? <IconSpeakerX /> : <IconSpeaker />}
                onClick={toggleMute}
              />
            }
            right={
              isCanSkip && !isCanClose ? (
                <ButtonIcon icon={<IconXMark />} onClick={handleEnd(handleSkipToEnd)} />
              ) : isCanClose ? (
                <ButtonIcon icon={<IconXMark />} onClick={handleEnd()} />
              ) : null
            }
          />
        )}
      </SafeAreaView>
    </Flex>
  );
};

export default VideoKinescope;
