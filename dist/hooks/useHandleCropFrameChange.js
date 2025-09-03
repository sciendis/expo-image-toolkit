import { runOnJS } from 'react-native-reanimated';
import { isCropFrameChanged } from '../utils';
import { useImageEditorContext } from './useImageEditorContext';
export const useHandleCropFrameChange = function ({ setPendingEditor, setShowAlert, }) {
    const { boxPosition, boxScale, setDimensions, dimensions: { initialCropFramePosition, initialCropFrameScale }, } = useImageEditorContext();
    return function handleCropFrameChange(mode) {
        const isChanged = isCropFrameChanged({
            boxPosition,
            boxScale,
            initialCropFramePosition,
            initialCropFrameScale,
        });
        if (isChanged) {
            const pos = boxPosition.get();
            const scale = boxScale.get();
            runOnJS(setDimensions)((prev) => (Object.assign(Object.assign({}, prev), { savedInitialCropFramePosition: pos, savedInitialCropFrameScale: scale })));
            setPendingEditor(mode);
            setShowAlert(true);
            return true;
        }
        return false;
    };
};
//# sourceMappingURL=useHandleCropFrameChange.js.map