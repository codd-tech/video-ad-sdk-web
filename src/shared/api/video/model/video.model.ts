export interface VideoModel {
  src: string;
  canSkip: boolean;

  skipLimit?: number;
  closeLimit: number;
}

export type VideoPlayedStatus = 'skipped' | 'closed';

export type OnVideoSuccess = (success: VideoPlayedStatus) => void;
