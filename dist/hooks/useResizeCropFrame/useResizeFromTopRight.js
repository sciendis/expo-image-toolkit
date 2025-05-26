import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { DefaultPositionState } from '../../constants';
import { useImageEditorContext } from '../useImageEditorContext';
import { useInitialEditorState } from '../useInitialEditorState';
/**
 * @description Gesture handler for resizing the crop frame from the top-right corner.
 *
 * - Adjusts X and Y scale based on drag direction.
 * - Enforces minimum width/height and bounding limits.
 * - Updates both position and scale to preserve bottom-left anchor.
 */
export const useResizeFromTopRight = () => {
    const { boxPosition, boxScale, saveHistoryState } = useImageEditorContext();
    const { minWidth, minHeight, minY, maxX } = useInitialEditorState();
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
        const newY = Math.max(startPosVal.y + event.translationY, minY);
        const newWidth = Math.min(Math.max(startScaleVal.x + event.translationX, minWidth), maxX - boxPosVal.x);
        const newHeight = Math.max(startScaleVal.y - (newY - startPosVal.y), minHeight);
        boxPosition.set({
            x: boxPosVal.x,
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
//# sourceMappingURL=useResizeFromTopRight.js.map