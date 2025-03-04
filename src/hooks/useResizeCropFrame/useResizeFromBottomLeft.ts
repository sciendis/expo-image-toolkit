import { useImageEditorContext } from "@/components/imageEditor/useImageEditorContext";
import { CropFrameOffset, DefaultPositionState } from "@/constants";
import { Position } from "@/types";
import { Gesture } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { useInitialEditorState } from "../useInitialEditorState";

export const useResizeFromBottomLeft = () => {
  const { boxPosition, boxScale } = useImageEditorContext();
  const { minWidth, minHeight, minX, maxY } = useInitialEditorState();

  const startPosition = useSharedValue<Position>(DefaultPositionState);
  const startScale = useSharedValue<Position>(DefaultPositionState);

  return Gesture.Pan()
    .onStart(() => {
      startPosition.value = { ...boxPosition.value };
      startScale.value = { ...boxScale.value };
    })
    .onUpdate((event) => {
      const newX = Math.max(startPosition.value.x + event.translationX, minX);
      const newWidth = Math.max(
        startScale.value.x - (newX - startPosition.value.x),
        minWidth
      );
      const newHeight = Math.min(
        Math.max(startScale.value.y + event.translationY, minHeight),
        maxY - boxPosition.value.y - CropFrameOffset
      );

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
