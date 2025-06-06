/// <reference types="react" />
import { Animated, StyleProp, ViewStyle } from 'react-native';
type Props = {
    opacity?: Animated.Value;
    size?: number | 'small' | 'large';
    style?: StyleProp<ViewStyle>;
};
/**
 * @description The loading screen which appears in two variants. First is while switching between editors. The second one is while saving
 * the final image edit. While switching between editors, there is a re-render for `RenderActiveImage`, and if no loading screen shows up, it feels like
 * a blinking problem rather than switching between editors. So I have to use this loading screen there. Also, for rotating on ±90/±270,
 * where the width/height of the image will swap,
 * it needs to generate a new image for correct calculation and it takes time for heavy images (for normal images is working fast).
 * This is the second reason for using a loading screen while switching between editors.
 *
 * @param props - An object containing:
 * - `opacity`: `Animated.Value` (optional) – Controls the opacity animation of the loading screen.
 * - `style`: `StyleProp<ViewStyle>` (optional) – Additional styles for customizing the loading container.
 *
 * @returns An animated loading screen with an ActivityIndicator.
 */
export declare const LoadingIndicator: ({ opacity, size, style, }: Props) => import("react").JSX.Element;
export {};
//# sourceMappingURL=LoadingIndicator.d.ts.map