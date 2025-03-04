import { Position } from "@/types";
import { SharedValue, withTiming } from "react-native-reanimated";

export const resetZoomState = function (
  zoom: SharedValue<number>,
  imagePosition: SharedValue<Position>
) {
  if (zoom.value === 1) return;

  zoom.value = withTiming(1);
  imagePosition.value = withTiming({ x: 0, y: 0 });
};
