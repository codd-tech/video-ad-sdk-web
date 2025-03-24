import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '~/shared/api';
import { useGlobal } from '~/shared/store/global.store';

import App from '../ui/App';

/**
 * Init the SDK at the app's document.
 * @param token - Token for the SDK.
 */
export const init = (token: string) => {
  useGlobal.getState().init(token);

  const container = document.createElement('div');

  document.body.appendChild(container);

  createRoot(container).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>,
  );
};
