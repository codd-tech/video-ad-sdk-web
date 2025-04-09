import { FC, PropsWithChildren } from 'react';

import { useIsFullScreen } from '~/shared/hooks';

import styles from './styles.module.scss';

type SafeAreaViewProps = {
  disableBottom?: boolean;
};

const SafeAreaView: FC<PropsWithChildren<SafeAreaViewProps>> = ({
  children,
  disableBottom = false,
}) => {
  const isFullScreen = useIsFullScreen();

  return (
    <div
      className={styles.root}
      data-fullscreen={isFullScreen}
      data-bottom-disabled={disableBottom}
    >
      {children}
    </div>
  );
};

export default SafeAreaView;
