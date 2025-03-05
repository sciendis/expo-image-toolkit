import { Gesture } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { useImageEditorContext } from "../../components/imageEditor/useImageEditorContext";
import { DefaultPositionState } from "../../constants";
import { useInitialEditorState } from "../useInitialEditorState";
export const useResizeFromTopRight = () => {
    const { boxPosition, boxScale } = useImageEditorContext();
    const { minWidth, minHeight, minY, maxX } = useInitialEditorState();
    const startPosition = useSharedValue(DefaultPositionState);
    const startScale = useSharedValue(DefaultPositionState);
    return Gesture.Pan()
        .onStart(() => {
        startPosition.value = Object.assign({}, boxPosition.value);
        startScale.value = Object.assign({}, boxScale.value);
    })
        .onUpdate((event) => {
        const newY = Math.max(startPosition.value.y + event.translationY, minY);
        const newWidth = Math.min(Math.max(startScale.value.x + event.translationX, minWidth), maxX - boxPosition.value.x);
        const newHeight = Math.max(startScale.value.y - (newY - startPosition.value.y), minHeight);
        boxPosition.value = {
            x: boxPosition.value.x,
            y: startPosition.value.y + startScale.value.y - newHeight,
        };
        boxScale.value = {
            x: newWidth,
            y: newHeight,
        };
    });
};
//# sourceMappingURL=useResizeFromTopRight.js.map