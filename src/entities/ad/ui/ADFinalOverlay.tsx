import { FC, ReactNode } from 'react';
import { Flex, Typography } from 'antd';

import { AdModel } from '~/shared/api/ad';
import { OverlayHeader } from '~/shared/ui';

import styles from './styles.module.scss';

const { Text, Title } = Typography;

type ADFinalOverlayProps = {
  Action: ReactNode;
  HeaderAction: ReactNode;
} & Pick<AdModel['data'], 'ageLimit'> &
  Pick<AdModel['data'], 'content'>;

const ADFinalOverlay: FC<ADFinalOverlayProps> = ({ HeaderAction, Action, ageLimit, content }) => {
  const { title, subtitle, iconUrl } = content;

  return (
    <Flex gap={28} vertical justify="center" align="center" className={styles.overlay}>
      <OverlayHeader ageLimit={ageLimit} right={HeaderAction} />

      <div className={styles.logo}>
        <img src={iconUrl} alt="" />
      </div>

      <Flex gap={12} vertical align="center">
        <Title>{title}</Title>

        <Text className={styles.text}>{subtitle}</Text>
      </Flex>

      {Action}
    </Flex>
  );
};

export default ADFinalOverlay;
