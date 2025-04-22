import { useEffect } from 'react';
import { useImageEditorContext } from './useImageEditorContext';
import { ImageManipulator } from 'expo-image-manipulator';
import { View } from 'react-native';

export const useSetInitialDimensions = function () {
  const { image, imageRef, setDimensions, boxScale, boxPosition } =
    useImageEditorContext();

  useEffect(() => {
    if (!imageRef.current) return;

    const calcDimensions = async (image: string, imageRef: View) => {
      const { width, height } =
        await ImageManipulator.manipulate(image).renderAsync();

      imageRef.measure((_x, _y, layoutWidth, layoutHeight) => {
        const imageAspectRatio = width / height;
        const viewAspectRatio = layoutWidth / layoutHeight;

        let displayedImageWidth = layoutWidth;
        let displayedImageHeight = layoutWidth / imageAspectRatio;
        let offsetX = 0;
        let offsetY = Math.round((layoutHeight - displayedImageHeight) / 2);

        // The image height is larger than it's width
        if (imageAspectRatio <= viewAspectRatio) {
          displayedImageWidth = layoutHeight * imageAspectRatio;
          displayedImageHeight = layoutHeight;
          offsetX = Math.round((layoutWidth - displayedImageWidth) / 2);
          offsetY = 0;
        }

        const scaleX = width / displayedImageWidth;
        const scaleY = height / displayedImageHeight;

        const centerX = displayedImageWidth / 2;
        const centerY = displayedImageHeight / 2;

        const initialCropFramePosition = {
          x: 0,
          y: 0,
        };
        const initialCropFrameScale = {
          x: displayedImageWidth,
          y: displayedImageHeight,
        };

        boxScale.set({ ...initialCropFrameScale });
        boxPosition.set({ ...initialCropFramePosition });

        // set all calculated data at once to avoid multiple re rendering.
        setDimensions((prev) => ({
          ...prev, // this is for `savedInitialCropFramePosition` & `savedInitialCropFrameScale`
          scaleX,
          scaleY,
          offsetX,
          offsetY,
          centerX,
          centerY,
          displayedImageWidth,
          displayedImageHeight,
          imageWidth: width,
          imageHeight: height,
          layoutWidth,
          layoutHeight,
          initialCropFramePosition,
          initialCropFrameScale,
        }));
      });
    };

    calcDimensions(image, imageRef.current);
  }, [image, imageRef, setDimensions, boxScale, boxPosition]);
};
