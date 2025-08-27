import { CropFrameOffset, DefaultCropFrameState } from '../constants';
import { calculateFontScale } from '../utils';
import { useImageEditorContext } from './useImageEditorContext';
/**
 * @description Calculates min/max bounds and size for the CropFrame.
 *
 * - Provides `minX`, `maxX`, `minY`, `maxY` to limit frame movement within the CropFrame.
 * - Also returns `minWidth` and `minHeight` to enforce minimum frame size during resizing.
 *
 * These values depend on editor layout dimensions and configured CropFrame offset.
 */
export const useInitialEditorState = function () {
    const { dimensions: { displayedImageWidth, displayedImageHeight, rotateScale }, } = useImageEditorContext();
    const { minWidth, minHeight } = DefaultCropFrameState;
    return {
        minX: 0,
        maxX: displayedImageWidth,
        minY: 0,
        maxY: displayedImageHeight + CropFrameOffset,
        minWidth: calculateFontScale(minWidth) * rotateScale,
        minHeight: calculateFontScale(minHeight) * rotateScale,
    };
};
//# sourceMappingURL=useInitialEditorState.js.map