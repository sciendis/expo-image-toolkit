var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DefaultDimensionState, EditorModes } from '../constants';
import { getCropData, isCropFrameChanged, isRotate90, rotateAndCropManipulator, } from '../utils';
import { useImageEditorContext } from './useImageEditorContext';
/**
 * @description This hook returns the saveStateOnSwitch function, which saves the current state of the RotateEditor
 * when switching to another editor, only if the rotation value is ±90/±270. In such cases, it generates a new image.
 * For other rotation values (like ±180/±360), this function won’t run since the image dimensions stay the same.
 * It also checks if the CropFrame was modified. If changes are detected while switching editors, an alert will ask whether to keep the cropped area.
 * If the user selects “No,” nothing happens. If they confirm, a new image is generated using the current CropFrame.
 */
export const useSaveStateOnSwitch = function () {
    const { rotate, zoom, image, setImage, setPreviousRotate, flipX, flipY, imagePosition, focalPoint, boxPosition, boxScale, dimensions, setDimensions, saveHistoryState, config: { quality, saveFormat }, } = useImageEditorContext();
    return function saveStateOnSwitch(activeEditor, shouldCrop = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (activeEditor === EditorModes.ZOOM)
                return true;
            const rotateVal = rotate.get();
            if (activeEditor === EditorModes.ROTATE) {
                if (!isRotate90(rotateVal))
                    return true;
                try {
                    const { uri, width, height } = yield rotateAndCropManipulator({
                        image,
                        rotate,
                        flipX,
                        flipY,
                        quality,
                        saveFormat,
                    });
                    setImage(uri);
                    setPreviousRotate((prev) => (prev + rotateVal) % 360);
                    setDimensions(DefaultDimensionState);
                    rotate.set(0);
                    flipX.set(0);
                    flipY.set(0);
                    boxScale.set({ x: width, y: height });
                }
                catch (error) {
                    console.error('Error rotating image:', error);
                }
                return true;
            }
            // activeEditor === Crop editor
            const isChanged = isCropFrameChanged({
                boxPosition,
                boxScale,
                dimensions,
            });
            const needsConfirmation = isChanged && !shouldCrop;
            if (needsConfirmation) {
                return setDimensions((prev) => (Object.assign(Object.assign({}, prev), { savedInitialCropFramePosition: boxPosition.get(), savedInitialCropFrameScale: boxScale.get() })));
            }
            if (!shouldCrop)
                return true;
            const cropData = getCropData({
                dimensions,
                boxScale,
                boxPosition,
                imagePosition,
                zoom,
                focalPoint,
                activeEditor,
            });
            try {
                const { uri } = yield rotateAndCropManipulator({
                    image,
                    rotate,
                    flipX,
                    flipY,
                    cropData,
                    quality,
                    saveFormat,
                });
                saveHistoryState({ image, dimensions });
                setImage(uri);
                setPreviousRotate((prev) => (prev + rotateVal) % 360);
                setDimensions(DefaultDimensionState);
                rotate.set(0);
                flipX.set(0);
                flipY.set(0);
            }
            catch (error) {
                console.error('Error saving image:', error);
            }
            // reset zoom and image position
            zoom.set(1);
            imagePosition.set({ x: 0, y: 0 });
            return true;
        });
    };
};
//# sourceMappingURL=useSaveStateOnSwitch.js.map