import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Layout } from 'antd';

import useLayoutHeight from '../model/use-layout-height';

import styles from './styles.module.css';

const LayoutCommon: FC<PropsWithChildren> = ({ children }) => {
  const layoutHeight = useLayoutHeight();

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const calculateDimensions = () => setWidth((9 / 16) * layoutHeight);

    calculateDimensions();

    window.addEventListener('resize', calculateDimensions);

    return () => window.removeEventListener('resize', calculateDimensions);
  }, [layoutHeight]);

  return (
    <Layout className={styles.layout} style={{ height: layoutHeight }}>
      <div className={styles.content} style={{ width }}>
        {children}
      </div>
    </Layout>
  );
};

export default LayoutCommon;
