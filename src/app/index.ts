import { useGlobal } from '~/shared/store/global.store';

export { initApp } from './model/init-app';

export const showVideo = useGlobal.getState().show;
