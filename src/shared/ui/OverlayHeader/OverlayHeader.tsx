import { Flex, Typography } from 'antd';

const { Text, Title } = Typography;

import { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

type OverlayHeaderProps = {
  left?: ReactNode;
  right?: ReactNode;
};

const OverlayHeader: FC<OverlayHeaderProps> = ({ left, right }) => (
  <Flex className={styles.header} justify="space-between" align="center">
    <div style={{ width: 42 }}>{left}</div>

    <Flex justify="center" vertical gap={2}>
      <Title level={2} className={styles.title}>
        <span>Ad</span> <Text>•</Text> <span>18+</span>
      </Title>

      <Text>teleads.pro</Text>
    </Flex>

    <div style={{ width: 42 }}>{right}</div>
  </Flex>
);

export default OverlayHeader;
