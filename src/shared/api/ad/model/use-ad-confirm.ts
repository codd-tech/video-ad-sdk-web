import { useMutation } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import ky from '~/shared/lib/ky';

export const useAdConfirm = () => {
  return useMutation<unknown, HTTPError, string>({
    mutationKey: ['confirm'],
    mutationFn: async (confirmKey) => {
      const res = await ky.get(`publish/confirm/${confirmKey}`);

      return await res.json();
    },
  });
};
