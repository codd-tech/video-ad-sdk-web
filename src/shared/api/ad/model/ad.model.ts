export interface AdModel {
  src: string;
  link: string;
  canSkip: boolean;

  skipLimit?: number;
  closeLimit: number;
}

export enum AdTypes {
  Static = 'MiniAppImage',
  Dynamic = 'MiniAppVideo',
}

export type AdPlayedStatus = 'skipped' | 'closed';

export type OnAdSuccess = (success: AdPlayedStatus) => void;

export enum AdQuality {
  Low = 360,
  Medium = 480,
  High = 720,
  VeryHigh = 1080,
}
