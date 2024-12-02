import { create } from 'zustand';

import { AdTypes, OnAdSuccess, AdModel } from '~/shared/api/ad';

export interface ShowOptions {
  type: AdTypes | null;

  onEnded?: OnAdSuccess;
  onReward?: () => void;
  onClick?: () => void;
}

export interface GlobalStore {
  ad: AdModel | null;
  token: string | null;
  isVisible: boolean;

  init(token: string): void;

  /**
   * Shows AD player.
   */
  show(options: ShowOptions): void;

  hide(): void;
}

export const useGlobal = create<GlobalStore & ShowOptions>((setState) => ({
  token: null,
  isVisible: false,
  ad: null,
  type: null,

  init(token) {
    setState({ token });
  },
  show(payload) {
    setState({
      isVisible: true,
      ad: {
        src: '',
        link: '',
        canSkip: true,
        closeLimit: 10,
      },
      ...payload,
    });
  },
  hide() {
    setState({
      isVisible: false,
      ad: null,
      onEnded: undefined,
      onReward: undefined,
      onClick: undefined,
    });
  },
}));
