import { useAnimatedStyle } from 'react-native-reanimated';
import { useImageEditorContext } from '../useImageEditorContext';
export const useCropFrameAnimatedStyle = function () {
    const { boxPosition, boxScale } = useImageEditorContext();
    return useAnimatedStyle(() => {
        'worklet';
        const boxScaleVal = boxScale.get();
        const boxPosVal = boxPosition.get();
        if (boxScaleVal.x === 0 || boxScaleVal.y === 0)
            return {};
        if (boxPosVal.x === 0 && boxPosVal.y === 0)
            return {};
        return {
            width: boxScaleVal.x,
            height: boxScaleVal.y,
            left: boxPosVal.x,
            top: boxPosVal.y,
            opacity: 100,
        };
    });
};
//# sourceMappingURL=useCropFrameAnimatedStyle.js.map