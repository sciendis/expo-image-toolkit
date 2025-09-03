import { ImageManipulator } from 'expo-image-manipulator';
import { useEffect, useRef } from 'react';
import { useImageEditorContext } from './useImageEditorContext';
import { useUpdateDeviceOrientation } from './useUpdateDeviceOrientation';

/**
 * @description This custom hook calculates the actual and displayed image dimensions, along with all necessary scales and offsets.
 * These values are needed for further calculations like zooming on a focal point, moving a zoomed image, and cropping.
 * The effect only runs on initial render or when a new image is generated. for example, after cropping or rotating the image by ±90/±270 degrees.
 */
export const useSetInitialDimensions = function () {
  const {
    image,
    imageRef,
    setDimensions,
    boxScale,
    boxPosition,
    isUndoRedoUpdated,
    setIsLoading,
  } = useImageEditorContext();

  const { isLandscapeMode, screenWidth, isDeviceRotated } =
    useUpdateDeviceOrientation();

  const prevDeviceOrientation = useRef(isLandscapeMode);

  useEffect(() => {
    if (!imageRef.current) return;
    if (isUndoRedoUpdated.current) return;

    const calcDimensions = async (image: string) => {
      if (!imageRef.current) return;

      if (prevDeviceOrientation.current !== isLandscapeMode) {
        prevDeviceOrientation.current = isLandscapeMode;
        setIsLoading('full');
      } else {
        setIsLoading('contents');
      }

      // calculate the actual image dimensions. using Image.getSize on android don't give us full image sizes when image is too large.
      const { width: imageWidth, height: imageHeight } =
        await ImageManipulator.manipulate(image).renderAsync();

      // calculate scales/offsets/aspectRatios using layout-width/height
      imageRef.current.measure((_x, _y, layoutWidth, layoutHeight) => {
        const imageAspectRatio = imageWidth / imageHeight;

        // The image width is larger than it's height
        let displayedImageWidth = isLandscapeMode
          ? layoutHeight * imageAspectRatio
          : layoutWidth;
        let displayedImageHeight = isLandscapeMode
          ? layoutHeight
          : layoutWidth / imageAspectRatio;

        let rotateScale = isLandscapeMode
          ? displayedImageWidth / layoutHeight
          : 1;

        // The image height is larger than it's width
        if (imageWidth < imageHeight) {
          displayedImageWidth = layoutHeight * imageAspectRatio;
          displayedImageHeight = layoutHeight;

          rotateScale = isLandscapeMode
            ? 1
            : displayedImageHeight / screenWidth;
        }

        const scaleX = imageWidth / displayedImageWidth;
        const scaleY = imageHeight / displayedImageHeight;

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
          centerX,
          centerY,
          displayedImageWidth,
          displayedImageHeight,
          imageWidth,
          imageHeight,
          initialCropFramePosition,
          initialCropFrameScale,
          rotateScale,
        }));
        setIsLoading('none');
      });
    };

    calcDimensions(image);
  }, [
    image,
    imageRef,
    setDimensions,
    boxScale,
    boxPosition,
    isUndoRedoUpdated,
    setIsLoading,
    isLandscapeMode,
    screenWidth,
  ]);

  return { isDeviceRotated };
};
