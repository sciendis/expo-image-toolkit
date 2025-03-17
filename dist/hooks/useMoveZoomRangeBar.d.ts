import { TextInputProps } from 'react-native';
import { AnimatedProps, SharedValue } from 'react-native-reanimated';
import { LayoutDimensions } from '../types';
type Props = {
    currentX: SharedValue<number>;
    rangeLayout: LayoutDimensions;
};
export declare const useMoveZoomRangeBar: ({ currentX, rangeLayout }: Props) => {
    moveRangeBar: import("react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture").PanGesture;
    styledRangeAnimated: {
        left: any;
    };
    animatedTextProps: Partial<AnimatedProps<TextInputProps>>;
};
export {};
//# sourceMappingURL=useMoveZoomRangeBar.d.ts.map