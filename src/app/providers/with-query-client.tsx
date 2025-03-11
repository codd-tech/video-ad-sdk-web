import { JSX } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '~/shared/api';

export const withQueryClient = (component: () => JSX.Element) => () => (
  <QueryClientProvider client={queryClient}>{component()}</QueryClientProvider>
);

export default withQueryClient;
