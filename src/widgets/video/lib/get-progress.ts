export const getProgress = (progress: number, value: number) => (progress / value) * 100;

export const getProgressInverted = (progress: number, value: number) => (progress / 100) * value;
