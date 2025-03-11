import { FC, useCallback, useMemo } from 'react';
import { CloseOutlined, MutedFilled, SoundFilled } from '@ant-design/icons';
import { Flex } from 'antd';

import { ADFinalOverlay } from '~/entities/ad';
import { VideoAction } from '~/features/video/action';
import { useCloseVideo } from '~/features/video/close';
import { useSkipVideo } from '~/features/video/skip';
import { AdModel, AdTypes, AdUnitModel } from '~/shared/api/ad';
import { useVideoQuality } from '~/shared/hooks';
import { telegram } from '~/shared/lib/telegram';
import { ShowOptions } from '~/shared/store/global.store';
import { ButtonIcon, OverlayHeader } from '~/shared/ui';

import { CLOSE_SECONDS_LIMIT, KINESCOPE_PLAYER_ID, SKIP_SECONDS_LIMIT } from '../lib/constants';
import useKinescopePlayer from '../model/use-kinescope-player';

import styles from './styles.module.scss';

interface VideoKinescopeProps {
  factory: Kinescope.IframePlayer | null;
}

const VideoKinescope: FC<
  AdModel & AdUnitModel & Omit<ShowOptions, 'adUnitId' | 'token'> & VideoKinescopeProps
> = ({ factory, onEnded, onClick, src, link, type }) => {
  const quality = useVideoQuality(src);

  const { playedSeconds, handleDestroy, handleEnd, isEnded, isMuted, toggleMute } =
    useKinescopePlayer(factory, src, quality);

  const showActionButton = useMemo(() => playedSeconds >= 5, [playedSeconds]);

  const { handleSkip, isCanSkip, handleSkipToEnd, isSkipped } = useSkipVideo(
    type === AdTypes.Skippable,
    SKIP_SECONDS_LIMIT,
    playedSeconds,
    onEnded,
  );

  const { isCanClose, handleClose } = useCloseVideo(CLOSE_SECONDS_LIMIT, playedSeconds, onEnded);

  const handleClick = useCallback(() => {
    onClick?.();

    telegram?.openLink(link, { try_instant_view: true });
  }, [link, onClick]);

  return (
    <Flex className={styles.wrapper} vertical onClick={handleClick}>
      <div id={KINESCOPE_PLAYER_ID} />

      {showActionButton ? <VideoAction absolute /> : null}

      {isEnded ? (
        <ADFinalOverlay
          HeaderAction={
            <ButtonIcon
              icon={<CloseOutlined />}
              onClick={handleDestroy(isSkipped ? handleSkip : handleClose)}
            />
          }
          Action={<VideoAction fixedWidth />}
        />
      ) : (
        <OverlayHeader
          left={
            <ButtonIcon icon={isMuted ? <MutedFilled /> : <SoundFilled />} onClick={toggleMute} />
          }
          right={
            isCanSkip && !isCanClose ? (
              <ButtonIcon icon={<CloseOutlined />} onClick={handleEnd(handleSkipToEnd)} />
            ) : isCanClose ? (
              <ButtonIcon icon={<CloseOutlined />} onClick={handleEnd()} />
            ) : null
          }
        />
      )}
    </Flex>
  );
};

export default VideoKinescope;
