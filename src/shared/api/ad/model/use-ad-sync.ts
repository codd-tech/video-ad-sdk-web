import { useMutation } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { AdModel } from '~/shared/api/ad';
import ky from '~/shared/lib/ky';
import { getTGUserData } from '~/shared/lib/telegram';

export const useAdSync = (onData: (data: AdModel) => void) => {
  const { mutate, data, isPending } = useMutation<AdModel, HTTPError, string>({
    mutationKey: ['ad-sync'],
    mutationFn: async (adUnitId: string) => {
      const userData = getTGUserData();

      const res = await ky.post('publish/sync', {
        json: {
          supid: userData.id + Math.random() * 100,
          userRawData: userData,
          unitId: adUnitId,
        },
      });

      return await res.json();
    },
    onSuccess: onData,
  });

  return {
    mutate,
    data,
    isPending,
  };
};
