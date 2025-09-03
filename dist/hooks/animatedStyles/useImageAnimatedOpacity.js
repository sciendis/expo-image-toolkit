import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
import { useImageEditorContext } from '../useImageEditorContext';
export const useImageAnimatedOpacity = function () {
    const { isLoading, dimensions: { rotateScale }, } = useImageEditorContext();
    const opacity = useSharedValue(0);
    useEffect(() => {
        opacity.set(0);
        if (isLoading === 'none') {
            opacity.set(withTiming(1, { duration: 500 }));
        }
    }, [rotateScale, isLoading, opacity]);
    return useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));
};
//# sourceMappingURL=useImageAnimatedOpacity.js.map