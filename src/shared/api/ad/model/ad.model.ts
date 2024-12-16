export interface AdModel {
  src: string;
  link: string;
}

export interface AdUnitModel {
  name: string;
  id: string;

  type: AdTypes;
  format: AdFormats;

  gamblingEnabled?: boolean;
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
