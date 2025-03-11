import { FC, ReactNode } from 'react';
import { Flex, Typography } from 'antd';

import { OverlayHeader } from '~/shared/ui';

import styles from './styles.module.scss';

const { Text, Title } = Typography;

type ADFinalOverlayProps = {
  Action: ReactNode;
  HeaderAction: ReactNode;
};

const ADFinalOverlay: FC<ADFinalOverlayProps> = ({ HeaderAction, Action }) => (
  <Flex gap={28} vertical justify="center" align="center" className={styles.overlay}>
    <OverlayHeader right={HeaderAction} />

    <div className={styles.logo}></div>

    <Flex gap={12} vertical align="center">
      <Title>Find your superpower</Title>

      <Text className={styles.text}>
        Unlock Your Superpower with Adidas. From iconic footwear to backpacks and caps
      </Text>
    </Flex>

    {Action}
  </Flex>
);

export default ADFinalOverlay;
