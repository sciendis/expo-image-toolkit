import { useAnimatedStyle, useDerivedValue, useSharedValue, } from 'react-native-reanimated';
import { useImageEditorContext } from '../useImageEditorContext';
import { useEffect } from 'react';
export const useCropFrameAnimatedStyle = function () {
    const { boxPosition, boxScale, image, dimensions: { initialCropFrameScale, initialCropFramePosition, savedInitialCropFrameScale, }, } = useImageEditorContext();
    const opacity = useSharedValue(0);
    useEffect(() => opacity.set(0), [image, opacity]);
    useDerivedValue(() => {
        'worklet';
        const boxScaleVal = boxScale.get();
        const boxPosVal = boxPosition.get();
        const scaleMatch = Math.abs(boxScaleVal.x - initialCropFrameScale.x) === 0 &&
            Math.abs(boxScaleVal.y - initialCropFrameScale.y) === 0;
        const positionMatch = Math.abs(boxPosVal.x - initialCropFramePosition.x) === 0 &&
            Math.abs(boxPosVal.y - initialCropFramePosition.y) === 0;
        const { x: scaleX, y: scaleY } = savedInitialCropFrameScale;
        if ((scaleMatch && positionMatch) || (scaleX !== 0 && scaleY !== 0)) {
            opacity.set(100);
        }
    });
    return useAnimatedStyle(() => {
        'worklet';
        const boxScaleVal = boxScale.get();
        const boxPosVal = boxPosition.get();
        if (boxScaleVal.x === 0 || boxScaleVal.y === 0)
            return { opacity: 0 };
        return {
            width: boxScaleVal.x,
            height: boxScaleVal.y,
            left: boxPosVal.x,
            top: boxPosVal.y,
            opacity: opacity.get(),
        };
    });
};
//# sourceMappingURL=useCropFrameAnimatedStyle.js.map