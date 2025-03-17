import { Image } from 'react-native';
import { Dimensions, LayoutDimensions } from '../types';

type Props = {
  image: string;
  imageLayout: LayoutDimensions;
};

export const calculateAspectRatio = async function ({
  image,
  imageLayout,
}: Props) {
  const { width, height } = await new Promise<Dimensions>((resolve, reject) => {
    Image.getSize(image, (width, height) => resolve({ width, height }), reject);
  });

  const imageAspectRatio = width / height;
  const viewAspectRatio = imageLayout.width / imageLayout.height;

  return { imageAspectRatio, viewAspectRatio, width, height };
};
