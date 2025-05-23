import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { CropFrameOffset, DefaultPositionState } from '../../constants';
import { useImageEditorContext } from '../useImageEditorContext';
import { useInitialEditorState } from '../useInitialEditorState';
export const useResizeFromBottomLeft = () => {
    const { boxPosition, boxScale } = useImageEditorContext();
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
    });
};
//# sourceMappingURL=useResizeFromBottomLeft.js.map