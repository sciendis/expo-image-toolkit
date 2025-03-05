import { Gesture } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { useImageEditorContext } from "../../components/imageEditor/useImageEditorContext";
import { CropFrameOffset } from "../../constants";
import { useInitialEditorState } from "../useInitialEditorState";
export const useResizeFromBottomRight = function () {
    const { boxPosition, boxScale } = useImageEditorContext();
    const { minWidth, minHeight, maxX, maxY } = useInitialEditorState();
    const bottomRight = useSharedValue(Object.assign({}, boxScale.value));
    return Gesture.Pan()
        .onBegin(() => {
        bottomRight.value = boxScale.value;
    })
        .onUpdate((e) => {
        const newWidth = bottomRight.value.x + e.translationX;
        const newHeight = bottomRight.value.y + e.translationY;
        const boundedMinX = Math.max(newWidth, minWidth);
        const boundedMinY = Math.max(newHeight, minHeight);
        boxScale.value = {
            x: Math.min(boundedMinX, maxX - boxPosition.value.x),
            y: Math.min(boundedMinY, maxY - boxPosition.value.y - CropFrameOffset),
        };
    });
};
//# sourceMappingURL=useResizeFromBottomRight.js.map