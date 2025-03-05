import { Gesture } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { useImageEditorContext } from "../../components/imageEditor/useImageEditorContext";
import { DefaultPositionState } from "../../constants";
import { Position } from "../../types";
import { useInitialEditorState } from "../useInitialEditorState";

export const useResizeFromTopLeft = () => {
  const { boxPosition, boxScale } = useImageEditorContext();
  const { minWidth, minHeight, minX, minY } = useInitialEditorState();

  const startPosition = useSharedValue<Position>(DefaultPositionState);
  const startScale = useSharedValue<Position>(DefaultPositionState);

  return Gesture.Pan()
    .onStart(() => {
      startPosition.value = { ...boxPosition.value };
      startScale.value = { ...boxScale.value };
    })
    .onUpdate((event) => {
      const newX = Math.max(startPosition.value.x + event.translationX, minX);
      const newY = Math.max(startPosition.value.y + event.translationY, minY);
      const newWidth = Math.max(
        startScale.value.x - (newX - startPosition.value.x),
        minWidth
      );
      const newHeight = Math.max(
        startScale.value.y - (newY - startPosition.value.y),
        minHeight
      );

      boxPosition.value = {
        x: startPosition.value.x + startScale.value.x - newWidth,
        y: startPosition.value.y + startScale.value.y - newHeight,
      };
      boxScale.value = {
        x: newWidth,
        y: newHeight,
      };
    });
};
