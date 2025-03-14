export interface AdModel {
  actionId: string;
  status: 'success';
  data: {
    contentType: 'miniAppVideo' | 'miniAppImage';
    content: {
      title: string;
      button: {
        url: string;
        text: string;
        isWebApp: boolean;
      };
      iconUrl: string;
      subtitle: string;
      videoUrl?: string;
      imageUrl?: string;
      notSkipSeconds: number;
    };
    ageLimit: number;
    confirmKey: string;
  };
}

export interface AdUnitModel {
  id: string;

  type: AdTypes;
  format: AdFormats;
}

export enum AdTypes {
  NonSkippable = 'non-skippable',
  Skippable = 'skippable',
  StaticCreative = 'static',
}

export enum AdFormats {
  Interstitial = 'interstitial',
  Rewarded = 'rewarded',
  Banner = 'banner',
}

export type AdPlayedStatus = 'skipped' | 'closed';

export type OnAdSuccess = (success: AdPlayedStatus) => void;

export enum AdQuality {
  Low = 360,
  Medium = 480,
  High = 720,
  VeryHigh = 1080,
}
