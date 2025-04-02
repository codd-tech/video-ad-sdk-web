import { useEffect, useState } from 'react';
import * as iframeApiLoader from '@kinescope/player-iframe-api-loader';

export const useLoadKinescope = (onError?: (error: Error) => void) => {
  const [factory, setFactory] = useState<Kinescope.IframePlayer | null>(null);

  useEffect(() => {
    iframeApiLoader
      .load()
      .then((factory) => {
        setFactory(factory);
      })
      .catch(onError);
  }, [onError]);

  return factory;
};
