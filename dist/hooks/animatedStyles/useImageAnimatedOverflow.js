import { useAnimatedReaction, useAnimatedStyle, useSharedValue, } from 'react-native-reanimated';
import { EditorModes } from '../../constants';
import { useImageEditorContext } from '../useImageEditorContext';
export const useImageAnimatedOverflow = function (activeEditor) {
    const { zoom } = useImageEditorContext();
    const isOverflowVisible = useSharedValue(true);
    useAnimatedReaction(() => zoom.get(), (currentZoom) => {
        isOverflowVisible.set(currentZoom === 1 && activeEditor === EditorModes.ROTATE);
    }, [activeEditor]);
    return useAnimatedStyle(() => {
        'worklet';
        return {
            overflow: isOverflowVisible.get() ? 'visible' : 'hidden',
        };
    });
};
//# sourceMappingURL=useImageAnimatedOverflow.js.map