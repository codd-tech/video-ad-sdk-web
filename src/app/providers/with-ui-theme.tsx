import { JSX } from 'react';
import { App, ConfigProvider } from 'antd';

import { theme } from '~/shared/lib/antd';

export const withUiTheme = (component: () => JSX.Element) => () => (
  <ConfigProvider theme={theme}>
    <App>{component()}</App>
  </ConfigProvider>
);

export default withUiTheme;
