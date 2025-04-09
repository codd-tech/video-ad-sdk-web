import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Layout } from 'antd';

import { useIsFullScreen, useLayoutHeight } from '~/shared/hooks';

import styles from './styles.module.scss';

const LayoutCommon: FC<PropsWithChildren> = ({ children }) => {
  const layoutHeight = useLayoutHeight();

  const isFullScreen = useIsFullScreen();

  const [width, setWidth] = useState<'100%' | number>(0);

  useEffect(() => {
    const calculateDimensions = () => {
      const needToScale = window.innerWidth / layoutHeight > 1;

      setWidth(needToScale ? (9 / 16) * layoutHeight : '100%');
    };

    calculateDimensions();

    window.addEventListener('resize', calculateDimensions);

    return () => window.removeEventListener('resize', calculateDimensions);
  }, [layoutHeight]);

  return (
    <Layout className={styles.layout} data-fullscreen={isFullScreen}>
      <div className={styles.content} style={{ width }}>
        {children}
      </div>

      <div className={styles.footer} />
    </Layout>
  );
};

export default LayoutCommon;
