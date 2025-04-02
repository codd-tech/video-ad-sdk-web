import { Flex, Typography } from 'antd';

const { Text, Title } = Typography;

import { FC, ReactNode, useMemo } from 'react';

import { AdModel } from '~/shared/api/ad';
import { getTelegram, getTGUserData } from '~/shared/lib/telegram';

import styles from './styles.module.scss';

type OverlayHeaderProps = {
  left?: ReactNode;
  right?: ReactNode;
};

const OverlayHeader: FC<OverlayHeaderProps & Pick<AdModel['data'], 'ageLimit'>> = ({
  left,
  right,
  ageLimit,
}) => {
  const lang = useMemo(() => {
    const userData = getTGUserData();

    return userData.language_code ?? 'en';
  }, []);

  const handleLinkClick = () => getTelegram()?.openLink('https://teleads.pro/?utm_source=sdk');

  return (
    <Flex className={styles.header} justify="space-between" align="center">
      <div style={{ width: 42 }}>{left}</div>

      <Flex justify="center" vertical gap={2}>
        <Title level={2} className={styles.title}>
          <span>{['ru', 'kk', 'be'].includes(lang) ? 'Реклама' : 'Ad'}</span>

          {ageLimit >= 18 ? (
            <>
              {' '}
              <Text>•</Text> <span>{ageLimit}+</span>
            </>
          ) : null}
        </Title>

        <Text onClick={handleLinkClick} className={styles.text}>
          teleads.pro
        </Text>
      </Flex>

      <div style={{ width: 42 }}>{right}</div>
    </Flex>
  );
};

export default OverlayHeader;
