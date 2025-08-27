var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ImageManipulator } from 'expo-image-manipulator';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useImageEditorContext } from './useImageEditorContext';
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
const isDeviceLandscapeMode = screenHeight < screenWidth;
/**
 * @description This custom hook calculates the actual and displayed image dimensions, along with all necessary scales and offsets.
 * These values are needed for further calculations like zooming on a focal point, moving a zoomed image, and cropping.
 * The effect only runs on initial render or when a new image is generated. for example, after cropping or rotating the image by ±90/±270 degrees.
 */
export const useSetInitialDimensions = function () {
    const { image, imageRef, setDimensions, boxScale, boxPosition, isUndoRedoUpdated, setIsLoading, } = useImageEditorContext();
    useEffect(() => {
        if (!imageRef.current)
            return;
        if (isUndoRedoUpdated.current)
            return;
        const calcDimensions = (image) => __awaiter(this, void 0, void 0, function* () {
            if (!imageRef.current)
                return;
            setIsLoading(true);
            // calculate the actual image dimensions. using Image.getSize on android don't give us full image sizes when image is too large.
            const { width: imageWidth, height: imageHeight } = yield ImageManipulator.manipulate(image).renderAsync();
            // calculate scales/offsets/aspectRatios using layout-width/height
            imageRef.current.measure((_x, _y, layoutWidth, layoutHeight) => {
                const imageAspectRatio = imageWidth / imageHeight;
                // The image width is larger than it's height
                let displayedImageWidth = isDeviceLandscapeMode
                    ? layoutHeight * imageAspectRatio
                    : layoutWidth;
                let displayedImageHeight = isDeviceLandscapeMode
                    ? layoutHeight
                    : layoutWidth / imageAspectRatio;
                let rotateScale = isDeviceLandscapeMode
                    ? displayedImageWidth / layoutHeight
                    : 1;
                // The image height is larger than it's width
                if (imageWidth < imageHeight) {
                    displayedImageWidth = layoutHeight * imageAspectRatio;
                    displayedImageHeight = layoutHeight;
                    rotateScale = isDeviceLandscapeMode
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
                boxScale.set(Object.assign({}, initialCropFrameScale));
                boxPosition.set(Object.assign({}, initialCropFramePosition));
                // set all calculated data at once to avoid multiple re rendering.
                setDimensions((prev) => (Object.assign(Object.assign({}, prev), { // this is for `savedInitialCropFramePosition` & `savedInitialCropFrameScale`
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
                    rotateScale })));
                setIsLoading(false);
                // setTimeout(() => setIsLoading(false), 200);
            });
        });
        calcDimensions(image);
    }, [
        image,
        imageRef,
        setDimensions,
        boxScale,
        boxPosition,
        isUndoRedoUpdated,
        setIsLoading,
    ]);
};
//# sourceMappingURL=useSetInitialDimensions.js.map