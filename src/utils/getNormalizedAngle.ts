export const getNormalizedAngle = (angle: number) =>
  ((angle % 360) + 360) % 360;
