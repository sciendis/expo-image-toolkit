import {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { EditorModes } from '../../constants';
import { useImageEditorContext } from '../useImageEditorContext';

/**
 * @description Controls the overflow behavior based on the zoom level:
 * - Overflow is hidden when the zoom value is greater than 1.
 * - Overflow is visible when the zoom value is exactly 1.
 *
 * This logic is important for the RotateEditor. When the image is rotated ±90° or ±270°,
 * the width and height swap, and the zoom is reset to 1 to maintain correct dimensions.
 * Without resetting zoom and making overflow visible, the image would be cropped or distorted
 * due to misaligned focal zoom calculations.
 *
 * @param activeEditor - The currently active editor mode.
 * @returns Animated style that sets the correct overflow.
 */
export const useImageAnimatedOverflow = function (activeEditor: EditorModes) {
  const { zoom } = useImageEditorContext();

  const isOverflowHidden = useSharedValue(true);

  useAnimatedReaction(
    () => zoom.get(),
    (currentZoom) => isOverflowHidden.set(currentZoom !== 1),
    [activeEditor]
  );

  return useAnimatedStyle(() => {
    'worklet';
    return {
      overflow: isOverflowHidden.get() ? 'hidden' : 'visible',
    };
  });
};
