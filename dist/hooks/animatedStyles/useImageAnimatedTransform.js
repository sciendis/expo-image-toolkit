import { useAnimatedStyle } from 'react-native-reanimated';
import { useImageEditorContext } from '../useImageEditorContext';
export const useImageAnimatedTransform = function ({ centerX, centerY, }) {
    const { zoom, flipX, flipY, rotate, focalPoint, imagePosition } = useImageEditorContext();
    const animatedStyleImage = useAnimatedStyle(() => {
        'worklet';
        const focalPointVal = focalPoint.get();
        const imagePositionVal = imagePosition.get();
        const focalOffsetX = focalPointVal.x - centerX;
        const focalOffsetY = focalPointVal.y - centerY;
        return {
            transform: [
                { translateX: imagePositionVal.x },
                { translateY: imagePositionVal.y },
                { translateX: focalOffsetX },
                { translateY: focalOffsetY },
                { scale: zoom.get() },
                { translateX: -focalOffsetX },
                { translateY: -focalOffsetY },
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