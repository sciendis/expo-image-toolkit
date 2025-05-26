import { CropFrameOffset, DefaultCropFrameState } from '../constants';
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
  const {
    dimensions: { offsetX, offsetY, layoutWidth, layoutHeight },
  } = useImageEditorContext();
  const { minWidth, minHeight } = DefaultCropFrameState;

  return {
    minX: 0,
    maxX: layoutWidth - offsetX * 2, // 2 is because of left & right offsets
    minY: 0,
    maxY: layoutHeight + CropFrameOffset - offsetY * 2, // 2 is because of top & bottom offsets
    minWidth,
    minHeight,
  };
};
