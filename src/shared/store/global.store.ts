import { create } from 'zustand';

import { AdFormats, AdModel, AdTypes, AdUnitModel, OnAdSuccess } from '~/shared/api/ad';

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
  adUnit: {
    type: AdTypes.StaticCreative,
    format: AdFormats.Interstitial,
    id: '123',
  },

  init(token) {
    setState({ token });
  },
  show(payload) {
    setState({
      isVisible: true,
      adUnit: {
        id: payload.adUnitId,
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
