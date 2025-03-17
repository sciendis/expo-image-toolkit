import { LayoutDimensions } from '../types';
import { calculateAspectRatio } from './calculateAspectRatio';
import { calculateOffsets } from './calculateOffsets';

export type CalculateImageOffsetProps = {
  image: string;
  imageLayout: LayoutDimensions;
};

export const calculateImageOffset = async function ({
  image,
  imageLayout,
}: CalculateImageOffsetProps) {
  const { imageAspectRatio, viewAspectRatio, width, height } =
    await calculateAspectRatio({ image, imageLayout });

  return calculateOffsets({
    imageLayout,
    imageAspectRatio,
    viewAspectRatio,
    width,
    height,
  });
};
