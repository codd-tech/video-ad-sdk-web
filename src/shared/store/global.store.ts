import { create } from 'zustand';

import { OnVideoSuccess, VideoModel } from '~/shared/api/video';

export interface ShowVideoOptions {
  video: VideoModel | null;

  onVideoEnded?: OnVideoSuccess;
  onReward?: () => void;
}

export interface GlobalStore {
  token: string | null;
  isVisible: boolean;

  init(token: string): void;

  /**
   * Shows video AD player.
   */
  show(options: ShowVideoOptions): void;

  hide(): void;
}

export const useGlobal = create<GlobalStore & ShowVideoOptions>((setState) => ({
  token: null,
  isVisible: false,
  video: null,

  init(token) {
    setState({ token });
  },
  show(payload) {
    setState({ isVisible: true, ...payload });
  },
  hide() {
    setState({ isVisible: false, video: null, onVideoEnded: undefined, onReward: undefined });
  },
}));
