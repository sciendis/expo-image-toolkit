var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FlipType, manipulateAsync, SaveFormat, } from 'expo-image-manipulator';
import { useImageEditorContext } from '../components/imageEditor/useImageEditorContext';
import { EditorModes } from '../constants';
import { getCropData } from '../utils';
export const useSaveStateOnSwitch = function () {
    const { rotate, zoom, image, setImage, setPreviousRotate, flipX, flipY, imageLayout, imagePosition, containerLayout, exactImageDimensions, focalPoint, initialBoxScale, initialBoxPosition, boxPosition, boxScale, } = useImageEditorContext();
    const saveStateOnSwitch = (activeEditor, shouldCrop = false) => __awaiter(this, void 0, void 0, function* () {
        const actions = [];
        const format = { format: SaveFormat.PNG };
        const currentZoom = rotate.get();
        if (activeEditor !== EditorModes.CROP) {
            if (currentZoom !== 0 && currentZoom !== 360)
                actions.push({ rotate: currentZoom });
            if (flipX.get() === 180)
                actions.push({ flip: FlipType.Vertical });
            if (flipY.get() === 180)
                actions.push({ flip: FlipType.Horizontal });
        }
        else {
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
                actions.push({ crop: cropData });
                // reset zoom and image position
                zoom.set(1);
                imagePosition.set({ x: 0, y: 0 });
            }
        }
        if (!actions.length)
            return { needsConfirmation: false, needsTimeout: false };
        try {
            //TODO: Update
            const result = yield manipulateAsync(image, actions, format);
            setImage(result.uri);
        }
        catch (error) {
            console.error('Error saving image:', error);
        }
        // Reset rest values
        setPreviousRotate((prev) => (prev + currentZoom) % 360);
        rotate.set(0);
        flipX.set(0);
        flipY.set(0);
        return { needsConfirmation: false, needsTimeout: true };
    });
    return { saveStateOnSwitch };
};
//# sourceMappingURL=useSaveStateOnSwitch.js.map