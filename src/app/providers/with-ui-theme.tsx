import { JSX } from 'react';
import { App, ConfigProvider } from 'antd';

import { theme } from '~/shared/lib/antd';

export const withUiTheme = (component: () => JSX.Element) => () => (
  <ConfigProvider wave={{ disabled: true }} theme={theme}>
    <App>{component()}</App>
  </ConfigProvider>
);

export default withUiTheme;
