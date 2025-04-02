import { FC } from 'react';

import { formatTime } from '~/shared/utils';

import styles from './styles.module.scss';

type TimerProps = {
  duration: number;
  progress: number;

  offset?: boolean;
};

const Timer: FC<TimerProps> = ({ duration, progress, offset }) => (
  <div className={styles.timer} data-offset={!!offset}>
    <span>{formatTime(duration - progress)}</span>
  </div>
);

export default Timer;
