import { getNormalizedAngle } from './getNormalizedAngle';

export const getNextRightAngle = (currentAngle: number) => {
  const normalizedAngle = getNormalizedAngle(currentAngle);

  if (currentAngle === 360 && normalizedAngle === 0) return 360;
  if (normalizedAngle < 90) return 90;
  if (normalizedAngle < 180) return 180;
  if (normalizedAngle < 270) return 270;
  return 360;
};
