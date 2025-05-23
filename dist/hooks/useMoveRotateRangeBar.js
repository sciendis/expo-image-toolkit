import { Gesture } from 'react-native-gesture-handler';
import { useAnimatedProps, useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue, } from 'react-native-reanimated';
import { useImageEditorContext } from './useImageEditorContext';
export const useMoveRotateRangeBar = function ({ currentX, rangeLayout, }) {
    const { rotate, previousRotate } = useImageEditorContext();
    const startX = useSharedValue(0);
    const calculateRotate = (currentPosition, totalWidth) => {
        'worklet';
        return Math.round((currentPosition / totalWidth) * 360);
    };
    const totalRotation = useDerivedValue(() => {
        return previousRotate + rotate.get();
    });
    useAnimatedReaction(() => totalRotation.get(), (total) => {
        currentX.set((total / 360) * rangeLayout.width);
    });
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
        animatedTextProps: animatedTextProps,
        currentAngle: totalRotation,
    };
};
//# sourceMappingURL=useMoveRotateRangeBar.js.map