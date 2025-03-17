import { ActionCrop } from 'expo-image-manipulator';
import { SharedValue } from 'react-native-reanimated';
import { Dimensions, LayoutDimensions, Position } from '../types';
import { calculateImageOffset } from './calculateImageOffset';

type Props = {
  image: string;
  imageLayout: LayoutDimensions;
  containerLayout: LayoutDimensions;
  exactImageDimensions: Dimensions;
  boxScale: SharedValue<Position>;
  boxPosition: SharedValue<Position>;
  imagePosition: SharedValue<Position>;
  zoom: SharedValue<number>;
  focalPoint: SharedValue<Position>;
};

export const getCropData = async function ({
  image,
  imageLayout,
  containerLayout,
  exactImageDimensions,
  boxScale,
  boxPosition,
  imagePosition,
  zoom,
  focalPoint,
}: Props) {
  const { scaleX, scaleY } = await calculateImageOffset({
    image,
    imageLayout,
  });

  const boxScaleVal = boxScale.get();
  const zoomVal = zoom.get();
  const imagePosVal = imagePosition.get();
  const boxPosVal = boxPosition.get();
  const focalPointVal = focalPoint.get();

  const croppedWidth = boxScaleVal.x * scaleX;
  const croppedHeight = boxScaleVal.y * scaleY;

  // calculate the center of the image
  const imageCenterX = exactImageDimensions.width / 2;
  const imageCenterY = exactImageDimensions.height / 2;

  // calculate the offset from the center caused by zooming on a focal point
  const focalOffsetX =
    ((imageCenterX - focalPointVal.x) * (zoomVal - 1)) / zoomVal;
  const focalOffsetY =
    ((imageCenterY - focalPointVal.y) * (zoomVal - 1)) / zoomVal;

  // calculate position covered image by cropFrame
  const relativeScaleX = imageCenterX * (1 - 1 / zoomVal);
  const relativeScaleY = imageCenterY * (1 - 1 / zoomVal);
  const relativeOffsetX = boxPosVal.x - containerLayout.x - imagePosVal.x;
  const relativeOffsetY = boxPosVal.y - containerLayout.y - imagePosVal.y;

  const relativeX = relativeOffsetX / zoomVal - focalOffsetX + relativeScaleX;
  const relativeY = relativeOffsetY / zoomVal - focalOffsetY + relativeScaleY;

  const cropData: ActionCrop['crop'] = {
    originX: relativeX * scaleX,
    originY: relativeY * scaleY,
    width: croppedWidth / zoomVal,
    height: croppedHeight / zoomVal,
  };

  return cropData;
};
