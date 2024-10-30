import { StrictMode } from 'react';

import App from '../ui/App';

import { createRoot } from 'react-dom/client';

export const initApp = () => {
  const container = document.createElement('div');

  document.body.appendChild(container);

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};
