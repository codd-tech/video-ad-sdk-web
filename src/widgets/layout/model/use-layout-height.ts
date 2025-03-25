import { useCallback, useEffect, useState } from 'react';

import { getTelegram } from '~/shared/lib/telegram';

const useLayoutHeight = () => {
  const [layoutHeight, setLayoutHeight] = useState(
    getTelegram()?.viewportStableHeight || window.innerHeight,
  );

  const onLayoutUpdate = useCallback(
    () => setLayoutHeight(getTelegram()?.viewportStableHeight),
    [],
  );

  useEffect(() => {
    getTelegram()?.onEvent('viewportChanged', onLayoutUpdate);

    return () => getTelegram()?.offEvent('viewportChanged', onLayoutUpdate);
  }, [onLayoutUpdate]);

  return layoutHeight;
};

export default useLayoutHeight;
