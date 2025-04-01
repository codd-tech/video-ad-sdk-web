import { FC, ReactNode } from 'react';
import { Flex, Typography } from 'antd';

import { AdModel } from '~/shared/api/ad';
import { OverlayHeader } from '~/shared/ui';

import styles from './styles.module.scss';

const { Text, Title } = Typography;

type ADFinalOverlayProps = {
  Action: ReactNode;
  HeaderAction: ReactNode;
  onClick?: () => void;
} & Pick<AdModel['data'], 'ageLimit'> &
  Pick<AdModel['data'], 'content'>;

const ADFinalOverlay: FC<ADFinalOverlayProps> = ({
  HeaderAction,
  Action,
  ageLimit,
  content,
  onClick,
}) => {
  const { title, subtitle, iconUrl } = content;

  return (
    <Flex
      onClick={onClick}
      gap={28}
      vertical
      justify="center"
      align="center"
      className={styles.overlay}
    >
      <OverlayHeader ageLimit={ageLimit} right={HeaderAction} />

      <div className={styles.logo}>
        <img src={iconUrl} alt="" />
      </div>

      <Flex gap={12} vertical align="center">
        <Title className={styles.title}>{title}</Title>

        <Text className={styles.text}>{subtitle}</Text>
      </Flex>

      {Action}
    </Flex>
  );
};

export default ADFinalOverlay;
