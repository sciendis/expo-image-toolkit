import { Position } from './Position';

export type Dimensions = {
  offsetX: number;
  offsetY: number;
  scaleX: number;
  scaleY: number;
  centerX: number;
  centerY: number;
  displayedImageWidth: number;
  displayedImageHeight: number;
  imageWidth: number;
  imageHeight: number;
  layoutWidth: number;
  layoutHeight: number;
  initialCropFramePosition: Position;
  initialCropFrameScale: Position;
  savedInitialCropFramePosition: Position;
  savedInitialCropFrameScale: Position;
};
