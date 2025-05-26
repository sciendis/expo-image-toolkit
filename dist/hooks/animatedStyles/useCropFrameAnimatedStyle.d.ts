/**
 * @description Allows users to resize/move the CropFrame. This custom hook returns the animated style used in the `CropFrame` component.
 * It also handles an opacity effect triggered by image rotation. When rotating a large image by ±90°/±270°, a new image is generated and its width/height are swapped.
 * This causes the CropFrame to reposition, which can look like a visual glitch.
 * To improve the user experience, a shared value is used to control opacity, creating a small fade-in effect once the repositioning is complete.
 *
 * @returns Animated style for the CropFrame with position, size, and opacity.
 */
export declare const useCropFrameAnimatedStyle: () => {
    opacity: number;
    width?: undefined;
    height?: undefined;
    left?: undefined;
    top?: undefined;
} | {
    width: number;
    height: number;
    left: number;
    top: number;
    opacity: number;
};
//# sourceMappingURL=useCropFrameAnimatedStyle.d.ts.map