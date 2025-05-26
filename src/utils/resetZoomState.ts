import { SharedValue, withTiming } from 'react-native-reanimated';
import { Position } from '../types';

/**
 * This function will reset the zoom value to 1 and the image position to the initial position {0, 0}.
 * This reset is triggered when an image is zoomed first and then rotated or flipped. It's necessary because if we don't reset the zoom state,
 * the zoomed area shown in the layout after rotation won't be accurate, and the final calculation will also be incorrect.
 *
 * For this reason, I chose the RotateEditor as the first editor, so the user can decide about rotation first.
 * I also added a hint message in the RotateEditor to inform the user that if they zoom and then rotate, the zoom state will reset.
 * I know this behavior can be confusing, but for now, I had no other choice.
 *
 * @param zoom - Shared value for the zoom level.
 * @param imagePosition - Shared value for the image position.
 */
export const resetZoomState = function (
  zoom: SharedValue<number>,
  imagePosition: SharedValue<Position>
) {
  if (zoom.get() === 1) return;

  zoom.set(withTiming(1));
  imagePosition.set(withTiming({ x: 0, y: 0 }));
};
