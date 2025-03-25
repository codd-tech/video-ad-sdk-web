import { FC, useCallback } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Flex, Progress } from 'antd';

import { VideoAction } from '~/features/video/action';
import { AdModel } from '~/shared/api/ad';
import { getTelegram } from '~/shared/lib/telegram';
import { ShowOptions } from '~/shared/store/global.store';
import { ButtonIcon, Loader, OverlayHeader } from '~/shared/ui';

import { DEFAULT_SKIP_LIMIT } from '../lib/constants';
import { useImageContent } from '../model/use-image-content';

import styles from './styles.module.scss';

const ImageContent: FC<AdModel['data'] & Omit<ShowOptions, 'adUnitId' | 'token'>> = ({
  content,
  ageLimit,
  onEnded,
  onClick,
}) => {
  const { notSkipSeconds = DEFAULT_SKIP_LIMIT, imageUrl, button } = content;

  const handleClick = useCallback(() => {
    onClick?.();

    getTelegram()?.openLink(button.url, { try_instant_view: true });
  }, [button.url, onClick]);

  const { isLoaded, isEnded, handleLoad, playedSeconds, handleClose } = useImageContent(
    notSkipSeconds,
    onEnded,
  );

  return (
    <>
      {isLoaded ? null : <Loader />}

      <Flex vertical align="center" className={styles.wrapper}>
        <img onLoad={handleLoad} src={imageUrl} alt="" />

        <VideoAction text={button.text} onClick={handleClick} absolute />

        <OverlayHeader
          ageLimit={ageLimit}
          right={isEnded ? <ButtonIcon icon={<CloseOutlined />} onClick={handleClose} /> : null}
        />

        {isEnded ? null : (
          <Progress
            size="small"
            className={styles.progress}
            percent={(playedSeconds / notSkipSeconds) * 100}
            type="line"
          />
        )}
      </Flex>
    </>
  );
};

export default ImageContent;
