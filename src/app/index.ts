import { useGlobal } from '~/shared/store/global.store';

export { abort } from './model/abort';
export { init } from './model/init-app';

export const showAd = useGlobal.getState().show;
