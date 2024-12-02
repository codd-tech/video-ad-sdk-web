import { useGlobal } from '~/shared/store/global.store';

export { init } from './model/init-app';

export const showAD = useGlobal.getState().show;
