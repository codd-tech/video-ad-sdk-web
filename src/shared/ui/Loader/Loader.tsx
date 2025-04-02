import { IconSpinner } from '~/shared/assets';

import styles from './styles.module.scss';

const Loader = () => (
  <div className={styles.loader}>
    <IconSpinner />
  </div>
);

export default Loader;
