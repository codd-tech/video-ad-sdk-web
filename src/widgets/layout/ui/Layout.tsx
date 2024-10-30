import { FC, PropsWithChildren } from 'react';

import { Flex } from '@chakra-ui/react';

import useLayoutHeight from '../model/use-layout-height';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const layoutHeight = useLayoutHeight();

  return (
    <Flex
      h={layoutHeight}
      direction="column"
      justify="center"
      align="center"
      bg="gray.200"
      pos="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
    >
      {children}
    </Flex>
  );
};

export default Layout;
