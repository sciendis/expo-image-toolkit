import { TextInputProps } from "react-native";
import { AnimatedProps, SharedValue } from "react-native-reanimated";
import { LayoutDimensions } from "../types";
type Props = {
    currentX: SharedValue<number>;
    rangeLayout: LayoutDimensions;
};
export declare const useMoveRotateRangeBar: ({ currentX, rangeLayout, }: Props) => {
    moveRangeBar: import("react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture").PanGesture;
    styledRangeAnimated: {
        left: number;
    };
    animatedTextProps: Partial<AnimatedProps<TextInputProps>>;
    currentAngle: number;
};
export {};
//# sourceMappingURL=useMoveRotateRangeBar.d.ts.map