import { useCallback, useEffect, useState } from 'react';

import { OnAdSuccess } from '~/shared/api/ad';

const useCloseVideo = (closeLimit: number, playedSeconds: number, onEnded?: OnAdSuccess) => {
  const [isCanClose, setIsCanClose] = useState(false);

  const handleClose = useCallback(() => {
    onEnded?.('closed');
  }, [onEnded]);

  useEffect(() => {
    setIsCanClose(playedSeconds >= closeLimit);
  }, [closeLimit, playedSeconds]);

  return {
    isCanClose,
    handleClose,
  };
};

export default useCloseVideo;
