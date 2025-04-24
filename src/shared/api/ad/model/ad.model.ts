export enum AdType {
  Video = 'miniAppVideo',
  Image = 'miniAppImage',
}

export interface AdModel {
  actionId: string;
  status: 'success';
  data: {
    contentType: AdType;
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

export type AdPlayedStatus = 'skipped' | 'completed';

export type OnAdSuccess = (success: AdPlayedStatus) => void;

export enum AdQuality {
  Low = 360,
  Medium = 480,
  High = 720,
  VeryHigh = 1080,
}
