import { useMutation } from '@tanstack/react-query';

import { AdModel } from '~/shared/api/ad';
import ky from '~/shared/lib/ky';
import { telegram } from '~/shared/lib/telegram';

export const useAdSync = () => {
  const { mutate, data, isPending } = useMutation<AdModel>({
    mutationKey: ['ad-sync'],
    mutationFn: async () => {
      const params = new URLSearchParams(telegram?.initData || '');

      const userData = JSON.parse(params.get('user') || '{}');

      const res = await ky.post('publish/sync', {
        json: {
          supid: userData.id,
          userRawData: userData,
          unitId: 83,
        },
      });

      return await res.json();
    },
  });

  return {
    mutate,
    data,
    isPending,
  };
};
