import { useCallback, useEffect, useState } from 'react';

import { OnAdSuccess } from '~/shared/api/ad';

const useCloseVideo = (closeLimit: number, playedSeconds: number, onEnded?: OnAdSuccess) => {
  const [isCanClose, setIsCanClose] = useState(false);

  const handleClose = useCallback(() => {
    onEnded?.('closed');
  }, [onEnded]);

  useEffect(() => {
    if (playedSeconds >= closeLimit) setIsCanClose(true);
  }, [closeLimit, playedSeconds]);

  return {
    isCanClose,
    handleClose,
  };
};

export default useCloseVideo;
