import { create } from 'zustand';

import { AdModel, OnAdSuccess } from '~/shared/api/ad';

export interface ShowOptions {
  adUnitId: string;

  onEnded?: OnAdSuccess;
  onReward?: () => void;
  onClick?: () => void;
}

export interface GlobalStore {
  token: string | null;
  ad: AdModel | null;
  isVisible: boolean;

  init(token: string): void;

  /**
   * Shows AD player.
   */
  show(options: ShowOptions): void;

  hide(): void;

  setAd(ad: AdModel | null): void;
}

export const useGlobal = create<GlobalStore & ShowOptions>((setState) => ({
  token: null,
  isVisible: false,
  ad: null,
  adUnitId: '',

  init(token) {
    setState({ token });
  },
  show(payload) {
    setState({
      isVisible: true,
      ...payload,
    });
  },
  hide() {
    setState({
      isVisible: false,
      ad: null,
      adUnitId: '',
      onEnded: undefined,
      onReward: undefined,
      onClick: undefined,
    });
  },
  setAd(ad) {
    setState({ ad });
  },
}));
