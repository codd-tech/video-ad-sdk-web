import { create } from 'zustand';

import { OnVideoSuccess, VideoModel } from '~/shared/api/video';

interface GlobalStore {
  token: Nullable<string>;
  isVisible: boolean;

  video: Nullable<VideoModel>;

  onVideoEnded: Nullable<OnVideoSuccess>;
  onReward: Nullable<() => void>;

  init(token: string): void;

  show(payload: Pick<GlobalStore, 'onVideoEnded' | 'onReward' | 'video'>): void;

  hide(): void;
}

export const useGlobal = create<GlobalStore>((setState) => ({
  token: null,
  isVisible: false,
  video: null,
  onVideoEnded: null,
  onReward: null,

  init(token) {
    setState({ token });
  },
  show(payload) {
    setState({ isVisible: true, ...payload });
  },
  hide() {
    setState({ isVisible: false });
  },
}));
