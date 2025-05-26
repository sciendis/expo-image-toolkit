import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { CropFrameOffset, DefaultPositionState } from '../../constants';
import { useImageEditorContext } from '../useImageEditorContext';
import { useInitialEditorState } from '../useInitialEditorState';
/**
 * @description Gesture handler for resizing the crop frame from the bottom-left corner.
 *
 * - Adjusts X and Y scale based on drag direction.
 * - Enforces minimum width/height and bounding limits.
 * - Updates both position and scale to preserve top-right anchor.
 */
export const useResizeFromBottomLeft = () => {
    const { boxPosition, boxScale, saveHistoryState } = useImageEditorContext();
    const { minWidth, minHeight, minX, maxY } = useInitialEditorState();
    const startPosition = useSharedValue(DefaultPositionState);
    const startScale = useSharedValue(DefaultPositionState);
    return Gesture.Pan()
        .onStart(() => {
        startPosition.set(Object.assign({}, boxPosition.get()));
        startScale.set(Object.assign({}, boxScale.get()));
    })
        .onUpdate((event) => {
        const startPosVal = startPosition.get();
        const startScaleVal = startScale.get();
        const boxPosVal = boxPosition.get();
        const newX = Math.max(startPosVal.x + event.translationX, minX);
        const newWidth = Math.max(startScaleVal.x - (newX - startPosVal.x), minWidth);
        const newHeight = Math.min(Math.max(startScaleVal.y + event.translationY, minHeight), maxY - boxPosVal.y - CropFrameOffset);
        boxPosition.set({
            x: startPosVal.x + startScaleVal.x - newWidth,
            y: boxPosVal.y,
        });
        boxScale.set({
            x: newWidth,
            y: newHeight,
        });
    })
        .onEnd(() => {
        const { x: spX, y: spY } = startPosition.get();
        const { x: ssX, y: ssY } = startScale.get();
        const { x: pX, y: pY } = boxPosition.get();
        const { x: sX, y: sY } = boxScale.get();
        if ((spX === pX && spY === pY) || (ssX === sX && ssY === sY))
            return;
        saveHistoryState({
            boxPosition: startPosition.get(),
            boxScale: startScale.get(),
        });
    });
};
//# sourceMappingURL=useResizeFromBottomLeft.js.map