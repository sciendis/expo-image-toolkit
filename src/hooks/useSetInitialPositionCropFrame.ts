import { useImageEditorContext } from '@/components/imageEditor/useImageEditorContext';
import { calculateImageOffset } from '@/utils';
import { useEffect } from 'react';

/**
 * Step 3: Calculate CropFrame scale and position based on ImageLayout and
 * displayed image width and height.
 */
export const useSetInitialPositionCropFrame = function () {
  const { image, imageLayout, boxScale, boxPosition, containerLayout } =
    useImageEditorContext();

  useEffect(() => {
    if (!image || imageLayout.width <= 0 || imageLayout.height <= 0) return;

    try {
      calculateImageOffset({ image, imageLayout }).then(
        ({ displayedImageWidth, displayedImageHeight }) => {
          boxScale.value = {
            x: displayedImageWidth,
            y: displayedImageHeight,
          };
          boxPosition.value = {
            x: containerLayout.x,
            y: containerLayout.y,
          };
        }
      );
    } catch (error) {
      console.error('Failed to calculate image aspect ratio:', error);
    }
    // Here, I only need to set the scale and position for the first time.
    // The position and scale can change when the user edits the image.
    // This hook is only needed during the initial loading for the initial position.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, imageLayout, containerLayout]);
};
