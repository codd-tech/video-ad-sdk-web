import { useCallback, useEffect, useState } from 'react';

import { OnVideoSuccess } from '~/shared/api/video';

const useCloseVideo = (
  onVideoEnded: Nullable<OnVideoSuccess>,
  closeLimit: number,
  playedSeconds: number,
) => {
  const [isCanClose, setIsCanClose] = useState(false);

  const handleClose = useCallback(() => {
    onVideoEnded?.('closed');
  }, [onVideoEnded]);

  useEffect(() => {
    if (playedSeconds >= closeLimit) setIsCanClose(true);
  }, [closeLimit, playedSeconds]);

  return {
    isCanClose,
    handleClose,
  };
};

export default useCloseVideo;
