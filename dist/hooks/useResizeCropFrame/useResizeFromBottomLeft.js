import { Gesture } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { useImageEditorContext } from "../../components/imageEditor/useImageEditorContext";
import { CropFrameOffset, DefaultPositionState } from "../../constants";
import { useInitialEditorState } from "../useInitialEditorState";
export const useResizeFromBottomLeft = () => {
    const { boxPosition, boxScale } = useImageEditorContext();
    const { minWidth, minHeight, minX, maxY } = useInitialEditorState();
    const startPosition = useSharedValue(DefaultPositionState);
    const startScale = useSharedValue(DefaultPositionState);
    return Gesture.Pan()
        .onStart(() => {
        startPosition.value = Object.assign({}, boxPosition.value);
        startScale.value = Object.assign({}, boxScale.value);
    })
        .onUpdate((event) => {
        const newX = Math.max(startPosition.value.x + event.translationX, minX);
        const newWidth = Math.max(startScale.value.x - (newX - startPosition.value.x), minWidth);
        const newHeight = Math.min(Math.max(startScale.value.y + event.translationY, minHeight), maxY - boxPosition.value.y - CropFrameOffset);
        boxPosition.value = {
            x: startPosition.value.x + startScale.value.x - newWidth,
            y: boxPosition.value.y,
        };
        boxScale.value = {
            x: newWidth,
            y: newHeight,
        };
    });
};
//# sourceMappingURL=useResizeFromBottomLeft.js.map