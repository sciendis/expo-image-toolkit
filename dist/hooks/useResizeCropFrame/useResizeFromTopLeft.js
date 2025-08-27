import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { DefaultPositionState } from '../../constants';
import { useImageEditorContext } from '../useImageEditorContext';
import { useInitialEditorState } from '../useInitialEditorState';
/**
 * @description Gesture handler for resizing the crop frame from the top-left corner.
 *
 * - Adjusts X and Y scale based on drag direction.
 * - Enforces minimum width/height and bounding limits.
 * - Updates both position and scale to preserve bottom-right anchor.
 */
export const useResizeFromTopLeft = () => {
    const { boxPosition, boxScale, saveHistoryState, dimensions: { rotateScale }, } = useImageEditorContext();
    const { minWidth, minHeight, minX, minY } = useInitialEditorState();
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
        const translationX = event.translationX * rotateScale;
        const translationY = event.translationY * rotateScale;
        const newX = Math.max(startPosVal.x + translationX, minX);
        const newY = Math.max(startPosVal.y + translationY, minY);
        const newWidth = Math.max(startScaleVal.x - (newX - startPosVal.x), minWidth);
        const newHeight = Math.max(startScaleVal.y - (newY - startPosVal.y), minHeight);
        boxPosition.set({
            x: startPosVal.x + startScaleVal.x - newWidth,
            y: startPosVal.y + startScaleVal.y - newHeight,
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
//# sourceMappingURL=useResizeFromTopLeft.js.map