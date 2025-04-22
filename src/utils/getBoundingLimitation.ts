import { SharedValue } from 'react-native-reanimated';
import { Dimensions, Position } from '../types';

export const getBoundingLimitation = function (
  {
    displayedImageWidth,
    displayedImageHeight,
  }: Pick<Dimensions, 'displayedImageWidth' | 'displayedImageHeight'>,
  zoom: SharedValue<number>,
  focalPoint: SharedValue<Position>
) {
  'worklet';

  const fp = focalPoint.get();
  const z = zoom.get();
  const w = displayedImageWidth;
  const h = displayedImageHeight;
  const sw = w * z;
  const sh = h * z;

  const focalRatioX = fp.x / w;
  const focalRatioY = fp.y / h;

  const offsetX = (sw - w) * focalRatioX;
  const offsetY = (sh - h) * focalRatioY;

  const minX = w - sw + offsetX;
  const maxX = offsetX;
  const minY = h - sh + offsetY;
  const maxY = offsetY;

  return { minX, maxX, minY, maxY };
};
