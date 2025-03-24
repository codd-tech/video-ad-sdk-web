import { FC } from 'react';
import { Button } from 'antd';

import { AdModel } from '~/shared/api/ad';

import styles from './styles.module.scss';

type VideoActionProps = {
  fixedWidth?: boolean;
  absolute?: boolean;

  onClick?(): void;
};

const VideoAction: FC<VideoActionProps & Pick<AdModel['data']['content']['button'], 'text'>> = ({
  absolute,
  fixedWidth,
  text,
  onClick,
}) => (
  <Button
    size="large"
    className={styles.btn}
    type="primary"
    data-fixed={fixedWidth}
    data-absolute={absolute}
    onClick={onClick}
  >
    {text}
  </Button>
);

export default VideoAction;
