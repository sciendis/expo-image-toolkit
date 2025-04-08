import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { DefaultPositionState } from '../../constants';
import { useImageEditorContext } from '../useImageEditorContext';
import { useInitialEditorState } from '../useInitialEditorState';
export const useResizeFromTopRight = () => {
    const { boxPosition, boxScale } = useImageEditorContext();
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
    });
};
//# sourceMappingURL=useResizeFromTopRight.js.map