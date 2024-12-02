import { AdTypes } from '~/shared/api/ad';

import { init, showAD } from '~/app';

if (import.meta.env.DEV) {
  init('');

  showAD({
    type: AdTypes.Dynamic,
  });
}

export default { AdTypes, init, showAD };
