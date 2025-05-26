import { TextInputProps } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
  AnimatedProps,
  SharedValue,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { LayoutDimensions } from '../types';
import { useImageEditorContext } from './useImageEditorContext';

type Props = {
  currentX: SharedValue<number>;
  rangeLayout: LayoutDimensions;
};

/**
 * @description Handles the gesture of the rotate range bar. This range bar has been temporarily disabled due to CropFrame limitations
 * and issues in the previous version of ImageManipulator.
 * It is kept for future reactivation after the SDK 52 update where ImageManipulator is expected to receive improvements.
 * This hook also help for displaying the current rotate angle.
 *
 * @param props - An object containing:
 * - `currentX`: `SharedValue<number>` – Shared value that holds the current horizontal position of the rotate pointer.
 * - `rangeLayout`: `LayoutDimensions` – Object representing the layout dimensions of the rotate range bar.
 *
 * @returns {object} An object containing:
 * - `moveRangeBar`: `PanGesture` – Gesture handler to move the rotate range bar. Temporary unused.
 * - `styledRangeAnimated`: `AnimatedStyle` – Animated style used to update the bar’s position. Temporary unused.
 * - `animatedTextProps`: `Partial<AnimatedProps<TextInputProps>>` – Animated props used to display the current rotation in degrees.
 * - `currentAngle`: `DerivedValue<number>` – The total calculated rotation angle.
 */
export const useMoveRotateRangeBar = function ({
  currentX,
  rangeLayout,
}: Props) {
  const { rotate, previousRotate } = useImageEditorContext();
  const startX = useSharedValue(0);

  const calculateRotate = (currentPosition: number, totalWidth: number) => {
    'worklet';
    return Math.round((currentPosition / totalWidth) * 360);
  };

  const totalRotation = useDerivedValue(() => {
    return previousRotate + rotate.get();
  });

  useAnimatedReaction(
    () => totalRotation.get(),
    (total) => {
      currentX.set((total / 360) * rangeLayout.width);
    }
  );

  const moveRangeBar = Gesture.Pan()
    .onBegin(() => startX.set(currentX.get()))
    .onUpdate((e) => {
      const newX = startX.get() + e.translationX;
      const minX = Math.max(newX, 0);
      currentX.set(Math.min(minX, rangeLayout.width));

      const newRotation = calculateRotate(currentX.get(), rangeLayout.width);
      rotate.set(newRotation - previousRotate);
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
      text: `${Math.round(totalRotation.get())}°`,
    };
  });

  return {
    moveRangeBar,
    styledRangeAnimated,
    animatedTextProps: animatedTextProps as Partial<
      AnimatedProps<TextInputProps>
    >,
    currentAngle: totalRotation,
  };
};
