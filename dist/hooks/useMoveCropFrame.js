import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { CropFrameOffset, DefaultPositionState } from '../constants';
import { useImageEditorContext } from './useImageEditorContext';
import { useInitialEditorState } from './useInitialEditorState';
/**
 * @description Handles the gesture for moving the CropFrame within the image boundaries.
 *
 * On gesture start, it stores the current CropFrame position. During movement, it updates the position
 * while keeping it constrained within the allowed bounds based on layout size and CropFrame scale.
 */
export const useMoveCropFrame = function () {
    const { boxPosition, boxScale, saveHistoryState } = useImageEditorContext();
    const { maxX, maxY, minX, minY } = useInitialEditorState();
    const startPosition = useSharedValue(DefaultPositionState);
    return Gesture.Pan()
        .onStart(() => startPosition.set(boxPosition.get()))
        .onUpdate((e) => {
        const startPosVal = startPosition.get();
        const newX = startPosVal.x + e.translationX;
        const newY = startPosVal.y + e.translationY;
        const boundedMinX = Math.max(newX, minX);
        const boundedMinY = Math.max(newY, minY);
        boxPosition.set({
            x: Math.min(boundedMinX, maxX - boxScale.get().x),
            y: Math.min(boundedMinY, maxY - boxScale.get().y - CropFrameOffset),
        });
    })
        .onEnd(() => {
        const { x: spX, y: spY } = startPosition.get();
        const { x: pX, y: pY } = boxPosition.get();
        if (spX === pX && spY === pY)
            return;
        saveHistoryState({ boxPosition: startPosition.get() });
    });
};
//# sourceMappingURL=useMoveCropFrame.js.map