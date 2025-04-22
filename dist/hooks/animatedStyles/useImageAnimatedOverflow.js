import { useAnimatedReaction, useAnimatedStyle, useSharedValue, } from 'react-native-reanimated';
import { useImageEditorContext } from '../useImageEditorContext';
export const useImageAnimatedOverflow = function (activeEditor) {
    const { zoom } = useImageEditorContext();
    const isOverflowHidden = useSharedValue(true);
    useAnimatedReaction(() => zoom.get(), (currentZoom) => isOverflowHidden.set(currentZoom !== 1), [activeEditor]);
    return useAnimatedStyle(() => {
        'worklet';
        return {
            overflow: isOverflowHidden.get() ? 'hidden' : 'visible',
        };
    });
};
//# sourceMappingURL=useImageAnimatedOverflow.js.map