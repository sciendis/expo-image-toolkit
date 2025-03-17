import { LayoutDimensions } from '../types';

type Props = {
  imageLayout: LayoutDimensions;
  imageAspectRatio: number;
  viewAspectRatio: number;
  width: number;
  height: number;
};

export const calculateOffsets = function ({
  imageLayout,
  imageAspectRatio,
  viewAspectRatio,
  width,
  height,
}: Props) {
  const { width: layoutWidth, height: layoutHeight } = imageLayout;
  // The image width is larger than it's height
  let displayedImageWidth = layoutWidth;
  let displayedImageHeight = layoutWidth / imageAspectRatio;
  let offsetX = 0;
  let offsetY = Math.round((layoutHeight - displayedImageHeight) / 2);

  // The image height is larger than it's width
  if (imageAspectRatio <= viewAspectRatio) {
    displayedImageWidth = layoutHeight * imageAspectRatio;
    displayedImageHeight = layoutHeight;
    offsetX = Math.round((imageLayout.width - displayedImageWidth) / 2);
    offsetY = 0;
  }

  const scaleX = width / displayedImageWidth;
  const scaleY = height / displayedImageHeight;

  return {
    scaleX,
    scaleY,
    offsetX,
    offsetY,
    displayedImageWidth,
    displayedImageHeight,
  };
};
