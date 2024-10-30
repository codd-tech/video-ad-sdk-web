import { QueryClient } from '@tanstack/react-query';

import baseQueryFn from './base-query-fn';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: baseQueryFn,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});
