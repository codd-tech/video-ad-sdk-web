import ky from 'ky';

import { baseApiTimeout, baseUrl } from '~/shared/config';
import { useGlobal } from '~/shared/store/global.store';

const kyInstance = ky.create({
  prefixUrl: `${baseUrl}/api/v1`,
  timeout: baseApiTimeout,
  hooks: {
    beforeRequest: [
      (request) => {
        if (request.url.includes('auth')) return request;

        request.headers.append('Authorization', `Bearer ${useGlobal.getState().token}`);

        return request;
      },
    ],
  },
});

export default kyInstance;
