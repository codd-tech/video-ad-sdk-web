import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { globalCss } from './styles';

const config = defineConfig({
  globalCss,
});

export const theme = createSystem(defaultConfig, config);
