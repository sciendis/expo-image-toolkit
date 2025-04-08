var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FlipType, ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { EditorModes } from '../constants';
import { getCropData } from '../utils';
import { useImageEditorContext } from './useImageEditorContext';
export const useSaveStateOnSwitch = function () {
    const { rotate, zoom, image, setImage, setPreviousRotate, flipX, flipY, imageLayout, imagePosition, containerLayout, exactImageDimensions, focalPoint, initialBoxScale, initialBoxPosition, boxPosition, boxScale, } = useImageEditorContext();
    const saveStateOnSwitch = (activeEditor, shouldCrop = false) => __awaiter(this, void 0, void 0, function* () {
        const format = { format: SaveFormat.PNG };
        const rotateVal = rotate.get();
        if (activeEditor === EditorModes.ROTATE) {
            try {
                if (rotateVal === 0 && flipX.get() === 0 && flipY.get() === 0)
                    return { needsConfirmation: false, needsTimeout: false };
                const manipulate = ImageManipulator.manipulate(image);
                let manipulator = manipulate.rotate(rotateVal);
                if (flipX.get() === 180)
                    manipulator = manipulator.flip(FlipType.Vertical);
                if (flipY.get() === 180)
                    manipulator = manipulator.flip(FlipType.Horizontal);
                const result = yield manipulator.renderAsync();
                const { uri } = yield result.saveAsync(format);
                setImage(uri);
                setPreviousRotate((prev) => (prev + rotateVal) % 360);
                rotate.set(0);
                flipX.set(0);
                flipY.set(0);
            }
            catch (error) {
                console.error('Error saving image:', error);
            }
        }
        else if (activeEditor === EditorModes.CROP) {
            const boxScaleVal = boxScale.get();
            const initBoxScaleVal = initialBoxScale.get();
            const boxPosVal = boxPosition.get();
            const initBoxPosVal = initialBoxPosition.get();
            // Handle crop mode
            const curScaleX = Math.round(boxScaleVal.x);
            const curScaleY = Math.round(boxScaleVal.y);
            const initScaleX = Math.round(initBoxScaleVal.x);
            const initScaleY = Math.round(initBoxScaleVal.y);
            const curPosX = Math.round(boxPosVal.x);
            const curPosY = Math.round(boxPosVal.y);
            const initPosX = Math.round(initBoxPosVal.x);
            const initPosY = Math.round(initBoxPosVal.y);
            const hasScaleChanged = curScaleX !== initScaleX || curScaleY !== initScaleY;
            const hasPositionChanged = curPosX !== initPosX || curPosY !== initPosY;
            const isValidScale = curScaleX !== 0 && curScaleY !== 0;
            const needsConfirmation = isValidScale && (hasScaleChanged || hasPositionChanged) && !shouldCrop;
            if (needsConfirmation) {
                return { needsConfirmation: true, needsTimeout: false };
            }
            else if (shouldCrop) {
                const cropData = yield getCropData({
                    image,
                    imageLayout,
                    containerLayout,
                    exactImageDimensions,
                    boxScale,
                    boxPosition,
                    imagePosition,
                    zoom,
                    focalPoint,
                });
                try {
                    const manipulate = ImageManipulator.manipulate(image);
                    const manipulator = manipulate.crop(cropData);
                    const result = yield manipulator.renderAsync();
                    const { uri } = yield result.saveAsync(format);
                    setImage(uri);
                }
                catch (error) {
                    console.error('Error saving image:', error);
                }
                // reset zoom and image position
                zoom.set(1);
                imagePosition.set({ x: 0, y: 0 });
            }
        }
        return { needsConfirmation: false, needsTimeout: true };
    });
    return { saveStateOnSwitch };
};
//# sourceMappingURL=useSaveStateOnSwitch.js.map