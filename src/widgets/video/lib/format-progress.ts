import { getProgress, getProgressInverted } from './get-progress';

export const formatProgress = (progress: number, duration: number) => {
  const date = new Date(0);

  date.setSeconds(getProgressInverted(progress, duration));

  return date;
};

export const formatProgressInverted = (time: string, duration: number) => {
  const [hours, minutes, seconds] = time.split(':');

  const progress = getProgress(+hours * 60 * 60 + +minutes * 60 + +seconds, duration);

  return Number.isNaN(progress) ? 0 : progress;
};
