import { FC, useCallback } from 'react';
import { Flex } from 'antd';

import { VideoAction } from '~/features/video/action';
import { AdModel } from '~/shared/api/ad';
import { IconXMark } from '~/shared/assets';
import { getTelegram } from '~/shared/lib/telegram';
import { ShowOptions } from '~/shared/store/global.store';
import { ButtonIcon, Loader, OverlayHeader, SafeAreaView, Timer } from '~/shared/ui';

import { DEFAULT_SKIP_LIMIT } from '../lib/constants';
import { useImageContent } from '../model/use-image-content';

import styles from './styles.module.scss';

const ImageContent: FC<AdModel['data'] & Omit<ShowOptions, 'adUnitId' | 'token'>> = ({
  content,
  ageLimit,
  onEnded,
  onClick,
  onAdLoaded,
}) => {
  const { notSkipSeconds = DEFAULT_SKIP_LIMIT, imageUrl, button } = content;

  const handleClick = useCallback(() => {
    onClick?.();

    getTelegram()?.openLink(button.url, { try_instant_view: true });
  }, [button.url, onClick]);

  const { isLoaded, isEnded, handleLoad, playedSeconds, handleClose } = useImageContent(
    notSkipSeconds,
    onEnded,
    onAdLoaded,
  );

  return (
    <>
      {isLoaded ? null : <Loader />}

      <Flex vertical align="center" className={styles.wrapper}>
        <img onLoad={handleLoad} src={imageUrl} alt="" />

        <SafeAreaView>
          <VideoAction text={button.text} onClick={handleClick} absolute />

          <OverlayHeader
            ageLimit={ageLimit}
            right={isEnded ? <ButtonIcon icon={<IconXMark />} onClick={handleClose} /> : null}
          />

          {isEnded ? null : <Timer duration={notSkipSeconds} progress={playedSeconds} offset />}
        </SafeAreaView>
      </Flex>
    </>
  );
};

export default ImageContent;
