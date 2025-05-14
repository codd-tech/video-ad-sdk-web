import { useGlobal } from '~/shared/store/global.store.ts';

// Abort
export const abort = () => {
  const { onError, hide, isVisible } = useGlobal.getState();

  if (!isVisible) return Promise.reject(new Error('nothing_to_abort'));

  onError?.(new Error('aborted'));
  hide();
};
