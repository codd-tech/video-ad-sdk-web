import { AdTypes } from '~/shared/api/ad';

import { init, showAD } from '~/app';

if (import.meta.env.DEV) {
  init('');

  showAD({
    adUnitId: '',
  });
}

export default { AdTypes, init, showAD };
