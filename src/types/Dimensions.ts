import { Position } from './Position';

export type Dimensions = {
  scaleX: number;
  scaleY: number;
  centerX: number;
  centerY: number;
  displayedImageWidth: number;
  displayedImageHeight: number;
  imageWidth: number;
  imageHeight: number;
  initialCropFramePosition: Position;
  initialCropFrameScale: Position;
  savedInitialCropFramePosition: Position;
  savedInitialCropFrameScale: Position;
  rotateScale: number;
};
