import { TextInputProps } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
  AnimatedProps,
  SharedValue,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { MIN_ZOOM } from '../constants';
import { LayoutDimensions } from '../types';
import { clamp, getBoundingLimitation } from '../utils';
import { useImageEditorContext } from './useImageEditorContext';

type Props = {
  currentX: SharedValue<number>;
  rangeLayout: LayoutDimensions;
};

export const useMoveZoomRangeBar = function ({ currentX, rangeLayout }: Props) {
  const {
    zoom,
    focalPoint,
    imagePosition,
    config,
    dimensions: { centerX, centerY, displayedImageWidth, displayedImageHeight },
  } = useImageEditorContext();
  const { maxZoom } = config;

  const startX = useSharedValue(0);

  const zoomRange = maxZoom - MIN_ZOOM;

  const pointerWidth = 20;
  const effectiveWidth = rangeLayout.width - pointerWidth;

  const calculateZoom = (currentPosition: number) => {
    'worklet';
    return MIN_ZOOM + (currentPosition / effectiveWidth) * zoomRange;
  };

  const calculatePosition = (currentZoom: number) => {
    'worklet';
    return ((currentZoom - MIN_ZOOM) / zoomRange) * effectiveWidth;
  };

  useAnimatedReaction(
    () => zoom.get(),
    (currentZoom) => {
      currentX.set(
        withTiming(calculatePosition(currentZoom), {
          duration: 100,
        })
      );
    },
    [effectiveWidth]
  );

  const moveRangeBar = Gesture.Pan()
    .onBegin(() => {
      startX.set(currentX.get());

      if (zoom.get() === 1) focalPoint.set({ x: centerX, y: centerY });
    })
    .onUpdate((e) => {
      const newXRangebar = startX.get() + e.translationX;
      const maxXRangeBar = Math.min(newXRangebar, effectiveWidth);
      const newX = Math.max(0, maxXRangeBar);
      currentX.set(newX);

      const newZoom = calculateZoom(newX);
      zoom.set(parseFloat(newZoom.toFixed(2)));

      const { minX, maxX, minY, maxY } = getBoundingLimitation(
        { displayedImageWidth, displayedImageHeight },
        zoom,
        focalPoint
      );

      imagePosition.set((prevPos) => ({
        x: clamp(prevPos.x, minX, maxX),
        y: clamp(prevPos.y, minY, maxY),
      }));
    });

  const styledRangeAnimated = useAnimatedStyle(() => {
    'worklet';
    return {
      left: currentX.get(),
    };
  });

  const animatedTextProps = useAnimatedProps(() => {
    'worklet';
    return {
      text: `${zoom.get().toFixed(2)}x`,
    };
  });

  return {
    moveRangeBar,
    styledRangeAnimated,
    animatedTextProps: animatedTextProps as Partial<
      AnimatedProps<TextInputProps>
    >,
  };
};
