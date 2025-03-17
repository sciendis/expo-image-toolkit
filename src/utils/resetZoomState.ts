import { SharedValue, withTiming } from 'react-native-reanimated';
import { Position } from '../types';

export const resetZoomState = function (
  zoom: SharedValue<number>,
  imagePosition: SharedValue<Position>
) {
  if (zoom.get() === 1) return;

  zoom.set(withTiming(1));
  imagePosition.set(withTiming({ x: 0, y: 0 }));
};
