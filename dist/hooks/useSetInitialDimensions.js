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
const { width: screenWidth } = Dimensions.get('screen');
/**
 * @description This custom hook calculates the actual and displayed image dimensions, along with all necessary scales and offsets.
 * These values are needed for further calculations like zooming on a focal point, moving a zoomed image, and cropping.
 * The effect only runs on initial render or when a new image is generated. for example, after cropping or rotating the image by ±90/±270 degrees.
 */
export const useSetInitialDimensions = function () {
    const { image, imageRef, setDimensions, boxScale, boxPosition, isUndoRedoUpdated, } = useImageEditorContext();
    useEffect(() => {
        if (!imageRef.current)
            return;
        if (isUndoRedoUpdated.current)
            return;
        const calcDimensions = (image) => __awaiter(this, void 0, void 0, function* () {
            if (!imageRef.current)
                return;
            // calculate the actual image dimensions. using Image.getSize on android don't give us full image sizes when image is too large.
            const { width, height } = yield ImageManipulator.manipulate(image).renderAsync();
            // calculate scales/offsets/aspectRatios using layout-width/height
            imageRef.current.measure((_x, _y, layoutWidth, layoutHeight) => {
                const imageAspectRatio = width / height;
                const viewAspectRatio = layoutWidth / layoutHeight;
                // The image width is larger than it's height
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
                boxScale.set(Object.assign({}, initialCropFrameScale));
                boxPosition.set(Object.assign({}, initialCropFramePosition));
                // set all calculated data at once to avoid multiple re rendering.
                setDimensions((prev) => (Object.assign(Object.assign({}, prev), { // this is for `savedInitialCropFramePosition` & `savedInitialCropFrameScale`
                    scaleX,
                    scaleY,
                    offsetX,
                    offsetY,
                    centerX,
                    centerY,
                    displayedImageWidth,
                    displayedImageHeight, imageWidth: width, imageHeight: height, layoutWidth,
                    layoutHeight,
                    initialCropFramePosition,
                    initialCropFrameScale,
                    rotateScale })));
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
    ]);
};
//# sourceMappingURL=useSetInitialDimensions.js.map