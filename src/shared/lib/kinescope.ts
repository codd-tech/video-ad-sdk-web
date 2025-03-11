import { useEffect, useState } from 'react';
import * as iframeApiLoader from '@kinescope/player-iframe-api-loader';

export const useLoadKinescope = () => {
  const [factory, setFactory] = useState<Kinescope.IframePlayer | null>(null);

  useEffect(() => {
    iframeApiLoader.load().then((factory) => {
      setFactory(factory);
    });
  }, []);

  return factory;
};
