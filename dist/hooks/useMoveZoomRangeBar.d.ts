import { TextInputProps } from 'react-native';
import { AnimatedProps, SharedValue } from 'react-native-reanimated';
import { LayoutDimensions } from '../types';
type Props = {
    currentX: SharedValue<number>;
    rangeLayout: LayoutDimensions;
};
/**
 * @description Gesture handler for the ZoomRangeBar. Allows users to zoom between 1 and the maxZoom defined in the config (default is 10).
 * Also displays the current zoom level as text.
 *
 * If zoom is at 1x, the focal point resets to the center of the image.
 * Otherwise, the range bar continues zooming based on the last focal point
 * (set by pinch or double tap) until it resets back to 1x.
 *
 * @param props - An object containing:
 * - `currentX`: `SharedValue<number>` – Shared value that holds the current horizontal position of the zoom range pointer.
 * - `rangeLayout`: `LayoutDimensions` – Object representing the layout dimensions of the zoom range bar.
 *
 * @returns { moveRangeBar, styledRangeAnimated, animatedTextProps: animatedTextProps as Partial<AnimatedProps<TextInputProps>> } An object containing:
 * - `moveRangeBar`: `PanGesture` – Gesture handler to move the zoom range bar.
 * - `styledRangeAnimated`: `AnimatedStyle` – Animated style used to update the pointer’s position.
 * - `animatedTextProps`: `Partial<AnimatedProps<TextInputProps>>` – Animated props used to show the current zoom level as text.
 */
export declare const useMoveZoomRangeBar: ({ currentX, rangeLayout }: Props) => {
    moveRangeBar: import("react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture").PanGesture;
    styledRangeAnimated: {
        left: number;
    };
    animatedTextProps: Partial<AnimatedProps<TextInputProps>>;
};
export {};
//# sourceMappingURL=useMoveZoomRangeBar.d.ts.map