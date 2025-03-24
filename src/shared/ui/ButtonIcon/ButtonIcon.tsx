import { FC } from 'react';
import { Button, ButtonProps } from 'antd';

import styles from './styles.module.scss';

type ButtonIconProps = {
  hideBlur?: boolean;
};

const ButtonIcon: FC<Omit<ButtonProps, 'children'> & ButtonIconProps> = ({
  hideBlur,
  ...props
}) => <Button size="middle" data-noblur={hideBlur} className={styles.btn} {...props} />;

export default ButtonIcon;
