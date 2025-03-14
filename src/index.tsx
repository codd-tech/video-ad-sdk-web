import { init, showAD } from '~/app';
import { AdTypes } from '~/shared/api/ad';

if (import.meta.env.DEV) {
  init('4f5a35a6f748d5642246e880e065d63454539b41');

  showAD({
    adUnitId: '',
  });
}

export default { AdTypes, init, showAD };
