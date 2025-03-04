import { Dimensions, Position } from "@/types";
import { SharedValue } from "react-native-reanimated";

export const getBoundingLimitation = function (
  { width, height }: Dimensions,
  zoom: SharedValue<number>,
  focalPoint: SharedValue<Position>
) {
  "worklet";
  const w = width;
  const h = height;
  const z = zoom.value;
  const sw = w * z;
  const sh = h * z;

  const focalRatioX = focalPoint.value.x / w;
  const focalRatioY = focalPoint.value.y / h;

  const offsetX = (sw - w) * focalRatioX;
  const offsetY = (sh - h) * focalRatioY;

  const minX = w - sw + offsetX;
  const maxX = offsetX;
  const minY = h - sh + offsetY;
  const maxY = offsetY;

  return { minX, maxX, minY, maxY };
};
