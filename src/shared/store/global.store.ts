import { create } from 'zustand';

import { AdModel, AdPlayedStatus, OnAdSuccess } from '~/shared/api/ad';

export interface ShowOptions {
  adUnitId: string;

  onEnded?: OnAdSuccess;
  onError?: (error: Error) => void;
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
  show(options: ShowOptions): Promise<AdPlayedStatus>;

  hide(): void;

  setAd(ad: AdModel | null): void;
}

export const useGlobal = create<GlobalStore & ShowOptions>((setState, getState) => ({
  token: null,
  isVisible: false,
  ad: null,
  adUnitId: '',

  init(token) {
    setState({ token });
  },
  async show({ onEnded, onError, ...payload }) {
    if (!getState().token) {
      const error = new Error('sdk_not_initialized');

      onError?.(error);

      return Promise.reject(error);
    }

    if (!Number.isInteger(payload.adUnitId)) {
      const error = new Error('invalid_ad_unit');

      onError?.(error);

      return Promise.reject(error);
    }

    return new Promise((resolve, reject) => {
      setState({
        isVisible: true,
        onEnded: (status) => {
          onEnded?.(status);
          resolve(status);
        },
        onError: (error) => {
          onError?.(error);
          reject(error);
        },
        ...payload,
      });
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
