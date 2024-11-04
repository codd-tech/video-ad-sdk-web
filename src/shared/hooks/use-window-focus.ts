import { useCallback, useEffect } from 'react';

const useWindowFocus = (onFocus: () => void, onBlur: () => void) => {
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible') {
      onFocus();
      return;
    }

    onBlur();
  }, [onBlur, onFocus]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [handleVisibilityChange, onBlur, onFocus]);
};

export default useWindowFocus;
