import { create } from 'zustand';

import { OnAdSuccess, AdModel, AdUnitModel, AdTypes, AdFormats } from '~/shared/api/ad';

export interface ShowOptions {
  adUnitId: AdUnitModel['id'];

  onEnded?: OnAdSuccess;
  onReward?: () => void;
  onClick?: () => void;
}

export interface GlobalStore {
  token: string | null;
  ad: AdModel | null;
  adUnit: AdUnitModel | null;
  isVisible: boolean;

  init(token: string): void;

  /**
   * Shows AD player.
   */
  show(options: ShowOptions): void;

  hide(): void;
}

export const useGlobal = create<GlobalStore & Omit<ShowOptions, 'adUnitId'>>((setState) => ({
  token: null,
  isVisible: false,
  ad: null,
  adUnit: null,

  init(token) {
    setState({ token });
  },
  show(payload) {
    setState({
      isVisible: true,
      adUnit: {
        id: payload.adUnitId,
        name: '',
        type: AdTypes.Skippable,
        format: AdFormats.Interstitial,
      },
      ...payload,
    });
  },
  hide() {
    setState({
      isVisible: false,
      ad: null,
      adUnit: null,
      onEnded: undefined,
      onReward: undefined,
      onClick: undefined,
    });
  },
}));
