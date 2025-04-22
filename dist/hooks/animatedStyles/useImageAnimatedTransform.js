import { useAnimatedStyle } from 'react-native-reanimated';
import { useImageEditorContext } from '../useImageEditorContext';
export const useImageAnimatedTransform = function () {
    const { zoom, flipX, flipY, rotate, focalPoint, imagePosition, dimensions: { centerX, centerY }, } = useImageEditorContext();
    const animatedStyleImage = useAnimatedStyle(() => {
        'worklet';
        const focalPointVal = focalPoint.get();
        const imagePositionVal = imagePosition.get();
        const focalOffsetX = focalPointVal.x - centerX;
        const focalOffsetY = focalPointVal.y - centerY;
        // when rotate is ±180, the Coordinate Axis is reverse
        const rotateVal = rotate.get();
        const focalTransformFactor = Math.abs(rotateVal) === 180 ? -1 : 1;
        return {
            transform: [
                { translateX: imagePositionVal.x * focalTransformFactor },
                { translateY: imagePositionVal.y * focalTransformFactor },
                { translateX: focalOffsetX * focalTransformFactor },
                { translateY: focalOffsetY * focalTransformFactor },
                { scale: zoom.get() },
                { translateX: -focalOffsetX * focalTransformFactor },
                { translateY: -focalOffsetY * focalTransformFactor },
                { rotateX: `${flipX.get()}deg` },
                { rotateY: `${flipY.get()}deg` },
            ],
        };
    });
    const animatedStyleContainer = useAnimatedStyle(() => {
        'worklet';
        return {
            transform: [{ rotate: `${rotate.get()}deg` }],
        };
    });
    return { animatedStyleContainer, animatedStyleImage };
};
//# sourceMappingURL=useImageAnimatedTransform.js.map