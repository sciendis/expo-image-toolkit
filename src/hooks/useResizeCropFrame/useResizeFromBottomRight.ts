import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { CropFrameOffset, DefaultPositionState } from '../../constants';
import { Position } from '../../types';
import { useImageEditorContext } from '../useImageEditorContext';
import { useInitialEditorState } from '../useInitialEditorState';

/**
 * @description Gesture handler for resizing the crop frame from the bottom-right corner.
 *
 * - Increases width and height based on drag.
 * - Enforces minimum size and stays within the canvas boundary.
 * - Only scale is updated; position remains fixed at top-left.
 */
export const useResizeFromBottomRight = function () {
  const { boxPosition, boxScale, saveHistoryState } = useImageEditorContext();
  const { minWidth, minHeight, maxX, maxY } = useInitialEditorState();

  const startScale = useSharedValue<Position>(DefaultPositionState);

  return Gesture.Pan()
    .onStart(() => {
      startScale.set(boxScale.get());
    })
    .onUpdate((e) => {
      const startScaleVal = startScale.get();
      const boxPosVal = boxPosition.get();

      const newWidth = startScaleVal.x + e.translationX;
      const newHeight = startScaleVal.y + e.translationY;

      const boundedMinX = Math.max(newWidth, minWidth);
      const boundedMinY = Math.max(newHeight, minHeight);

      boxScale.set({
        x: Math.min(boundedMinX, maxX - boxPosVal.x),
        y: Math.min(boundedMinY, maxY - boxPosVal.y - CropFrameOffset),
      });
    })
    .onEnd(() => {
      const { x: ssX, y: ssY } = startScale.get();
      const { x: sX, y: sY } = boxScale.get();
      if (ssX === sX && ssY === sY) return;
      saveHistoryState({ boxScale: startScale.get() });
    });
};
