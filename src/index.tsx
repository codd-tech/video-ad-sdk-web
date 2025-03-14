import { init, showAD } from '~/app';

if (import.meta.env.DEV) {
  init('4f5a35a6f748d5642246e880e065d63454539b41');

  showAD({
    adUnitId: '',
  });
}

export default { init, showAD };
