import { Dimensions } from '../types';
import { DefaultPositionState } from './DefaultPositionState';

export const DefaultDimensionState: Dimensions = {
  scaleX: 0,
  scaleY: 0,
  centerX: 0,
  centerY: 0,
  displayedImageWidth: 0,
  displayedImageHeight: 0,
  imageWidth: 0,
  imageHeight: 0,
  initialCropFramePosition: DefaultPositionState,
  initialCropFrameScale: DefaultPositionState,
  savedInitialCropFramePosition: DefaultPositionState,
  savedInitialCropFrameScale: DefaultPositionState,
  rotateScale: 1,
} as const;
