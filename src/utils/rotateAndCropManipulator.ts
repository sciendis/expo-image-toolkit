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
