import { TextInputProps } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  AnimatedProps,
  SharedValue,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useImageEditorContext } from "../components/imageEditor/useImageEditorContext";
import { LayoutDimensions } from "../types";
import { clamp, getBoundingLimitation } from "../utils";

type Props = {
  currentX: SharedValue<number>;
  rangeLayout: LayoutDimensions;
};

export const useMoveZoomRangeBar = function ({ currentX, rangeLayout }: Props) {
  const { zoom, focalPoint, containerLayout, imagePosition, config } =
    useImageEditorContext();
  const { minZoom, maxZoom } = config;

  const startX = useSharedValue(0);

  const zoomRange = maxZoom - minZoom;

  const pointerWidth = 20;
  const effectiveWidth = rangeLayout.width - pointerWidth;

  const calculateZoom = (currentPosition: number) => {
    "worklet";
    return minZoom + (currentPosition / effectiveWidth) * zoomRange;
  };

  const calculatePosition = (currentZoom: number) => {
    "worklet";
    return ((currentZoom - minZoom) / zoomRange) * effectiveWidth;
  };

  useAnimatedReaction(
    () => zoom.value,
    (currentZoom) => {
      currentX.value = withTiming(calculatePosition(currentZoom), {
        duration: 100,
      });
    },
    [effectiveWidth]
  );

  const moveRangeBar = Gesture.Pan()
    .onBegin(() => {
      startX.value = currentX.value;

      const cx = containerLayout.width / 2;
      const cy = containerLayout.height / 2;

      if (zoom.value === 1) focalPoint.value = { x: cx, y: cy };
    })
    .onUpdate((e) => {
      const newXRangebar = startX.value + e.translationX;
      const maxXRangenar = Math.min(newXRangebar, effectiveWidth);
      currentX.value = Math.max(0, maxXRangenar);

      const newZoom = calculateZoom(currentX.value);
      zoom.value = parseFloat(newZoom.toFixed(2));

      const { minX, maxX, minY, maxY } = getBoundingLimitation(
        containerLayout,
        zoom,
        focalPoint
      );

      imagePosition.value = {
        x: clamp(imagePosition.value.x, minX, maxX),
        y: clamp(imagePosition.value.y, minY, maxY),
      };
    });

  const styledRangeAnimated = useAnimatedStyle(() => ({
    left: currentX.value,
  }));

  const animatedTextProps = useAnimatedProps(() => ({
    text: `${zoom.value.toFixed(2)}x`,
  }));

  return {
    moveRangeBar,
    styledRangeAnimated,
    animatedTextProps: animatedTextProps as Partial<
      AnimatedProps<TextInputProps>
    >,
    currentZoom: zoom.value,
  };
};
