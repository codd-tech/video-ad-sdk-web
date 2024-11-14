export interface VideoModel {
  src: string;
  canSkip: boolean;

  skipLimit?: number;
  closeLimit: number;
}

export type VideoPlayedStatus = 'skipped' | 'closed';

export type OnVideoSuccess = (success: VideoPlayedStatus) => void;

export enum VideoQuality {
  Low = '360',
  Medium = '480',
  High = '720',
  VeryHigh = '1080',
}
