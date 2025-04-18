import { CropFrameOffset, DefaultCropFrameState } from '../constants';
import { useImageEditorContext } from './useImageEditorContext';

export const useInitialEditorState = function () {
  const { offset, containerLayout, imageLayout } = useImageEditorContext();
  const { minWidth, minHeight } = DefaultCropFrameState;

  return {
    minX: offset.x,
    maxX: imageLayout.width - offset.x,
    minY: containerLayout.y,
    maxY:
      containerLayout.y + imageLayout.height + CropFrameOffset - offset.y * 2,
    minWidth,
    minHeight,
  };
};
