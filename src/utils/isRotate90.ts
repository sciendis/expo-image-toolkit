export const isRotate90 = (angle: number) => {
  'worklet';
  return Math.abs(angle) % 180 === 90;
};
