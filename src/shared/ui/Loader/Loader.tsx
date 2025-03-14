import { LoadingOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

const Loader = () => (
  <div className={styles.loader}>
    <LoadingOutlined />
  </div>
);

export default Loader;
