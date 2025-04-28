import { ImageManipulator } from 'expo-image-manipulator';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useImageEditorContext } from './useImageEditorContext';

const {
  width: screenWidth,
  // height: screenHeight
} = Dimensions.get('screen');

export const useSetInitialDimensions = function () {
  const { image, imageRef, setDimensions, boxScale, boxPosition } =
    useImageEditorContext();

  useEffect(() => {
    if (!imageRef.current) return;

    const calcDimensions = async (image: string) => {
      if (!imageRef.current) return;

      const { width, height } =
        await ImageManipulator.manipulate(image).renderAsync();

      imageRef.current.measure((_x, _y, layoutWidth, layoutHeight) => {
        const imageAspectRatio = width / height;
        const viewAspectRatio = layoutWidth / layoutHeight;

        let displayedImageWidth = layoutWidth;
        let displayedImageHeight = layoutWidth / imageAspectRatio;
        let offsetX = 0;
        let offsetY = Math.round((layoutHeight - displayedImageHeight) / 2);
        let rotateScale = 1;

        // The image height is larger than it's width
        if (imageAspectRatio <= viewAspectRatio) {
          displayedImageWidth = layoutHeight * imageAspectRatio;
          displayedImageHeight = layoutHeight;
          offsetX = Math.round((layoutWidth - displayedImageWidth) / 2);
          offsetY = 0;
          rotateScale = displayedImageHeight / screenWidth;
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
          rotateScale,
        }));
      });
    };

    calcDimensions(image);
  }, [image, imageRef, setDimensions, boxScale, boxPosition]);
};
