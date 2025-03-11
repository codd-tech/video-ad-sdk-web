import { FC } from 'react';
import { Button, ButtonProps } from 'antd';

import styles from './styles.module.scss';

const ButtonIcon: FC<Omit<ButtonProps, 'children'>> = (props) => (
  <Button size="middle" className={styles.btn} {...props} />
);

export default ButtonIcon;
