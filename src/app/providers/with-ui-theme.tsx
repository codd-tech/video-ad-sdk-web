import { JSX } from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '~/shared/lib/chakra-ui';

export const withUiTheme = (component: () => JSX.Element) => () => (
  <ChakraProvider value={theme}>{component()}</ChakraProvider>
);

export default withUiTheme;
