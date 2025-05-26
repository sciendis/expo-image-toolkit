import {
  ActionCrop,
  FlipType,
  ImageManipulator,
  SaveFormat,
} from 'expo-image-manipulator';
import { SharedValue } from 'react-native-reanimated';
import { isRotate90 } from './isRotate90';

type Props = {
  image: string;
  rotate: SharedValue<number>;
  flipX: SharedValue<number>;
  flipY: SharedValue<number>;
  cropData?: ActionCrop['crop'];
};

/**
 * @description This is a reusable function to do the crop/rotate/flip on the image with ImageManipulator
 * based on the cropData and current state of rotate and flip. This is used once on the finish button
 * (CropImageButton - useCropImage) and once in the useSaveStateOnSwitch when the image is rotated ±90/±270.
 *
 * @param Props - An object containing:
 * - `image`: `string` – The image URI to manipulate.
 * - `rotate`: `SharedValue<number>` – The current rotation value.
 * - `flipX`: `SharedValue<number>` – The horizontal flip value.
 * - `flipY`: `SharedValue<number>` – The vertical flip value.
 * - `cropData`: `ActionCrop['crop']` (optional) – Optional crop data to apply. includes zoom on focal point state
 *
 * @returns `Promise<string>` – A promise that resolves to the manipulated image URI saved as PNG.
 */
export const rotateAndCropManipulator = async function ({
  image,
  rotate,
  flipX,
  flipY,
  cropData,
}: Props) {
  const format = { format: SaveFormat.PNG };

  const rotateVal = rotate.get();
  const flipValX = flipX.get();
  const flipValY = flipY.get();

  const manipulate = ImageManipulator.manipulate(image);
  let manipulator = manipulate.rotate(rotateVal);

  if (flipValX === 180) {
    manipulator = manipulator.flip(
      isRotate90(rotateVal) ? FlipType.Horizontal : FlipType.Vertical
    );
  }
  if (flipValY === 180) {
    manipulator = manipulator.flip(
      isRotate90(rotateVal) ? FlipType.Vertical : FlipType.Horizontal
    );
  }

  if (cropData) manipulator = manipulator.crop(cropData);

  const result = await manipulator.renderAsync();
  return await result.saveAsync(format);
};
