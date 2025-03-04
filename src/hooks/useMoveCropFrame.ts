import { useImageEditorContext } from "@/components/imageEditor/useImageEditorContext";
import { CropFrameOffset, DefaultPositionState } from "@/constants";
import { Position } from "@/types";
import { Gesture } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { useInitialEditorState } from "./useInitialEditorState";

export const useMoveCropFrame = function () {
  const { boxPosition, boxScale } = useImageEditorContext();

  const { maxX, maxY, minX, minY } = useInitialEditorState();

  const startBoxPosition = useSharedValue<Position>(DefaultPositionState);

  return Gesture.Pan()
    .onBegin(() => (startBoxPosition.value = boxPosition.value))
    .onUpdate((e) => {
      const newX = startBoxPosition.value.x + e.translationX;
      const newY = startBoxPosition.value.y + e.translationY;

      const boundedMinX = Math.max(newX, minX);
      const boundedMinY = Math.max(newY, minY);

      boxPosition.value = {
        x: Math.min(boundedMinX, maxX - boxScale.value.x),
        y: Math.min(boundedMinY, maxY - boxScale.value.y - CropFrameOffset),
      };
    });
};
