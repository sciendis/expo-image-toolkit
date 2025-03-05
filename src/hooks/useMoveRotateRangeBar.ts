import { TextInputProps } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  AnimatedProps,
  SharedValue,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { useImageEditorContext } from "../components/imageEditor/useImageEditorContext";
import { LayoutDimensions } from "../types";

type Props = {
  currentX: SharedValue<number>;
  rangeLayout: LayoutDimensions;
};

export const useMoveRotateRangeBar = function ({
  currentX,
  rangeLayout,
}: Props) {
  const { rotate, previousRotate } = useImageEditorContext();
  const startX = useSharedValue(0);

  const calculateRotate = (currentPosition: number, totalWidth: number) => {
    "worklet";
    return Math.round((currentPosition / totalWidth) * 360);
  };

  const totalRotation = useDerivedValue(() => {
    return previousRotate + rotate.value;
  });

  useAnimatedReaction(
    () => totalRotation.value,
    (total) => {
      currentX.value = (total / 360) * rangeLayout.width;
    }
  );

  const moveRangeBar = Gesture.Pan()
    .onBegin(() => (startX.value = currentX.value))
    .onUpdate((e) => {
      const newX = startX.value + e.translationX;
      const minX = Math.max(newX, 0);
      currentX.value = Math.min(minX, rangeLayout.width);

      const newRotation = calculateRotate(currentX.value, rangeLayout.width);
      rotate.value = newRotation - previousRotate;
    });

  const styledRangeAnimated = useAnimatedStyle(() => ({
    left: currentX.value,
  }));

  const animatedTextProps = useAnimatedProps(() => ({
    text: `${Math.round(totalRotation.value)}°`,
  }));

  return {
    moveRangeBar,
    styledRangeAnimated,
    animatedTextProps: animatedTextProps as Partial<
      AnimatedProps<TextInputProps>
    >,
    currentAngle: totalRotation.value,
  };
};
