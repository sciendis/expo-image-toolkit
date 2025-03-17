export const getNextRightAngle = (currentAngle: number) => {
  if (currentAngle <= -360) return -270;
  if (currentAngle <= -270) return -180;
  if (currentAngle <= -180) return -90;
  if (currentAngle <= -90) return 0;
  if (currentAngle <= 0) return 90;
  if (currentAngle <= 90) return 180;
  if (currentAngle <= 180) return 270;
  return 360;
};
