import compose from 'compose-function';

import withQueryClient from './with-query-client';
import withUiTheme from './with-ui-theme';

export const withProviders = compose(withQueryClient, withUiTheme);

export default withProviders;
