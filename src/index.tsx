import { init, showAD } from '~/app';
import { AdTypes } from '~/shared/api/ad';

if (import.meta.env.DEV) {
  init('');

  showAD({
    adUnitId: '',
  });
}

export default { AdTypes, init, showAD };
