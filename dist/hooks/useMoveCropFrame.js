import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { CropFrameOffset, DefaultPositionState } from '../constants';
import { useImageEditorContext } from './useImageEditorContext';
import { useInitialEditorState } from './useInitialEditorState';
export const useMoveCropFrame = function () {
    const { boxPosition, boxScale } = useImageEditorContext();
    const { maxX, maxY, minX, minY } = useInitialEditorState();
    const startBoxPosition = useSharedValue(DefaultPositionState);
    return Gesture.Pan()
        .onBegin(() => startBoxPosition.set(boxPosition.get()))
        .onUpdate((e) => {
        const startBoxPosVal = startBoxPosition.get();
        const newX = startBoxPosVal.x + e.translationX;
        const newY = startBoxPosVal.y + e.translationY;
        const boundedMinX = Math.max(newX, minX);
        const boundedMinY = Math.max(newY, minY);
        boxPosition.set({
            x: Math.min(boundedMinX, maxX - boxScale.get().x),
            y: Math.min(boundedMinY, maxY - boxScale.get().y - CropFrameOffset),
        });
    });
};
//# sourceMappingURL=useMoveCropFrame.js.map