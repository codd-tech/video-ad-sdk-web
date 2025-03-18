import { useCallback, useEffect, useState } from 'react';

import { telegram } from '~/shared/lib/telegram.ts';

const useLayoutHeight = () => {
  const [layoutHeight, setLayoutHeight] = useState(
    telegram?.viewportStableHeight || window.innerHeight,
  );

  const onLayoutUpdate = useCallback(() => setLayoutHeight(telegram?.viewportStableHeight), []);

  useEffect(() => {
    telegram?.onEvent('viewportChanged', onLayoutUpdate);

    return () => telegram?.offEvent('viewportChanged', onLayoutUpdate);
  }, [onLayoutUpdate]);

  return layoutHeight;
};

export default useLayoutHeight;
