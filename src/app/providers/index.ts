import compose from 'compose-function';

import withUiTheme from './with-ui-theme';

export const withProviders = compose(withUiTheme);

export default withProviders;
