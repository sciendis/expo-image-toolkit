import { DefaultPositionState } from './DefaultPositionState';

export const DefaultDimensionState = {
  offsetX: 0,
  offsetY: 0,
  scaleX: 0,
  scaleY: 0,
  centerX: 0,
  centerY: 0,
  displayedImageWidth: 0,
  displayedImageHeight: 0,
  imageWidth: 0,
  imageHeight: 0,
  layoutWidth: 0,
  layoutHeight: 0,
  initialCropFramePosition: DefaultPositionState,
  initialCropFrameScale: DefaultPositionState,
  savedInitialCropFramePosition: DefaultPositionState,
  savedInitialCropFrameScale: DefaultPositionState,
} as const;
