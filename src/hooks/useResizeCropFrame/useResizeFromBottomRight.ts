import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { useImageEditorContext } from '../../components/imageEditor/useImageEditorContext';
import { CropFrameOffset, DefaultPositionState } from '../../constants';
import { Position } from '../../types';
import { useInitialEditorState } from '../useInitialEditorState';

export const useResizeFromBottomRight = function () {
  const { boxPosition, boxScale } = useImageEditorContext();
  const { minWidth, minHeight, maxX, maxY } = useInitialEditorState();

  const bottomRight = useSharedValue<Position>(DefaultPositionState);

  return Gesture.Pan()
    .onBegin(() => bottomRight.set(boxScale.get()))
    .onUpdate((e) => {
      const bottomRightVal = bottomRight.get();
      const boxPosVal = boxPosition.get();

      const newWidth = bottomRightVal.x + e.translationX;
      const newHeight = bottomRightVal.y + e.translationY;

      const boundedMinX = Math.max(newWidth, minWidth);
      const boundedMinY = Math.max(newHeight, minHeight);

      boxScale.set({
        x: Math.min(boundedMinX, maxX - boxPosVal.x),
        y: Math.min(boundedMinY, maxY - boxPosVal.y - CropFrameOffset),
      });
    });
};
