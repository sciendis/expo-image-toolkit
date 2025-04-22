import { CropFrameOffset, DefaultCropFrameState } from '../constants';
import { useImageEditorContext } from './useImageEditorContext';

export const useInitialEditorState = function () {
  const {
    dimensions: { offsetX, offsetY, layoutWidth, layoutHeight },
  } = useImageEditorContext();
  const { minWidth, minHeight } = DefaultCropFrameState;

  return {
    minX: 0,
    maxX: layoutWidth - offsetX * 2,
    minY: 0,
    maxY: layoutHeight + CropFrameOffset - offsetY * 2,
    minWidth,
    minHeight,
  };
};
