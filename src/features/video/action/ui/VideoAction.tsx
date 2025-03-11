import { FC } from 'react';
import { Button } from 'antd';

import styles from './styles.module.scss';

type VideoActionProps = {
  fixedWidth?: boolean;
  absolute?: boolean;
};

const VideoAction: FC<VideoActionProps> = ({ absolute, fixedWidth }) => (
  <Button
    size="large"
    className={styles.btn}
    type="primary"
    data-fixed={fixedWidth}
    data-absolute={absolute}
  >
    Action
  </Button>
);

export default VideoAction;
