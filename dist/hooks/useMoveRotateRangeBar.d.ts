import { TextInputProps } from 'react-native';
import { AnimatedProps, SharedValue } from 'react-native-reanimated';
import { LayoutDimensions } from '../types';
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
export declare const useMoveRotateRangeBar: ({ currentX, rangeLayout, }: Props) => {
    moveRangeBar: import("react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture").PanGesture;
    styledRangeAnimated: {
        left: number;
    };
    animatedTextProps: Partial<AnimatedProps<TextInputProps>>;
    currentAngle: import("react-native-reanimated").DerivedValue<number>;
};
export {};
//# sourceMappingURL=useMoveRotateRangeBar.d.ts.map