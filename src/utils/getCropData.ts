import { ActionCrop } from 'expo-image-manipulator';
import { SharedValue } from 'react-native-reanimated';
import { Dimensions, Position } from '../types';
import { EditorModes } from '../constants';

type Props = {
  dimensions: Dimensions;
  boxScale: SharedValue<Position>;
  boxPosition: SharedValue<Position>;
  imagePosition: SharedValue<Position>;
  zoom: SharedValue<number>;
  focalPoint: SharedValue<Position>;
  activeEditor: EditorModes;
};

/**
 * @description Calculates the cropping data for the zoomed and positioned image
 * based on the CropFrame-Scale/Position, zoom level, focal point, and image transformations.
 *
 * This is used in two cases:
 * - When the user presses the crop button (`CropImageButton`) to finish the crop.
 * - Inside `useSaveStateOnSwitch` when detecting the changes in the crop frame and user confirms the CropAlert.
 *
 *
 * @param param0 - An object containing:
 * - `dimensions`: `Dimensions` – Information about the image layout and scaling (scaleX, scaleY, centerX, etc.).
 * - `boxScale`: `SharedValue<Position>` – The current scale (width/height) of the CropFrame.
 * - `boxPosition`: `SharedValue<Position>` – The current position of the CropFrame.
 * - `imagePosition`: `SharedValue<Position>` – The current offset of the image itself.
 * - `zoom`: `SharedValue<number>` – The zoom scale applied to the image.
 * - `focalPoint`: `SharedValue<Position>` – The point at which the zoom is focused.
 *
 * @returns A `cropData` object containing:
 * - `originX`: `number` – The X coordinate of the crop box’s left axis in the actual image size.
 * - `originY`: `number` – The Y coordinate of the crop box’s top axis in the actual image size.
 * - `width`: `number` – The width of the cropped area in the actual image size.
 * - `height`: `number` – The height of the cropped area in the actual image size.
 */
export const getCropData = function ({
  dimensions: { scaleX, scaleY, centerX, centerY, imageWidth, imageHeight },
  boxScale,
  boxPosition,
  imagePosition,
  zoom,
  focalPoint,
  activeEditor,
}: Props) {
  const focalPointVal = { ...focalPoint.get() };
  const boxScaleVal = { ...boxScale.get() };
  const zoomVal = zoom.get();
  const imagePosVal = { ...imagePosition.get() };
  const boxPosVal = { ...boxPosition.get() };

  let croppedWidth = boxScaleVal.x * scaleX;
  let croppedHeight = boxScaleVal.y * scaleY;
  if (activeEditor !== EditorModes.CROP) {
    // if user update cropFrame, and switch to another editor, and do not confirm the crop alert.
    croppedWidth = imageWidth;
    croppedHeight = imageHeight;
    boxPosVal.x = 0;
    boxPosVal.y = 0;
  }

  // calculate the offset from the center caused by zooming on a focal point
  const focalOffsetX = ((centerX - focalPointVal.x) * (zoomVal - 1)) / zoomVal;
  const focalOffsetY = ((centerY - focalPointVal.y) * (zoomVal - 1)) / zoomVal;

  // calculate position covered image by cropFrame
  const relativeScaleX = centerX * (1 - 1 / zoomVal);
  const relativeScaleY = centerY * (1 - 1 / zoomVal);
  const relativeOffsetX = boxPosVal.x - imagePosVal.x;
  const relativeOffsetY = boxPosVal.y - imagePosVal.y;

  const relativeX = relativeOffsetX / zoomVal - focalOffsetX + relativeScaleX;
  const relativeY = relativeOffsetY / zoomVal - focalOffsetY + relativeScaleY;

  const cropData: ActionCrop['crop'] = {
    originX: relativeX * scaleX,
    originY: relativeY * scaleY,
    width: Math.min(croppedWidth / zoomVal, imageWidth),
    height: Math.min(croppedHeight / zoomVal, imageHeight),
  };

  return cropData;
};
