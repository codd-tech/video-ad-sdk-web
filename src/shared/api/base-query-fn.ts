import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

import ky from '~/shared/lib/ky';

const baseQueryFn = async <T = unknown, TQueryKey extends QueryKey = QueryKey>({
  queryKey,
  signal,
}: QueryFunctionContext<TQueryKey>) => {
  if (!queryKey.length && queryKey.some((v) => !v)) return undefined;

  const data = await ky.get(queryKey.join('/'), { signal });

  return data.json<T>();
};

export default baseQueryFn;
