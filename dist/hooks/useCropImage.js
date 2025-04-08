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
import { getCropData } from '../utils';
import { useImageEditorContext } from './useImageEditorContext';
export const useCropImage = function ({ onCrop }) {
    const { imageLayout, containerLayout, image, boxPosition, boxScale, zoom, rotate, flipX, flipY, setIsSaving, focalPoint, imagePosition, exactImageDimensions, } = useImageEditorContext();
    const cropImage = () => __awaiter(this, void 0, void 0, function* () {
        if (imageLayout.width <= 0 || imageLayout.height <= 0)
            return;
        setIsSaving(true);
        const format = { format: SaveFormat.PNG };
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
            const rotateVal = rotate.get();
            const manipulate = ImageManipulator.manipulate(image);
            let manipulator = manipulate.rotate(rotateVal);
            if (flipX.get() === 180)
                manipulator = manipulator.flip(FlipType.Vertical);
            if (flipY.get() === 180)
                manipulator = manipulator.flip(FlipType.Horizontal);
            if (Math.abs(rotateVal) % 180 === 90) {
                // If this condition is true, the rotate value is 90, -90, 270, or -270.
                // In this case, the width and height should be swapped.
                const { width, height } = cropData;
                cropData.width = height;
                cropData.height = width;
            }
            manipulator = manipulator.crop(cropData);
            const result = yield manipulator.renderAsync();
            const res = yield result.saveAsync(format);
            onCrop({
                uri: res.uri,
                width: cropData.width,
                height: cropData.height,
                rotate: Math.abs(rotateVal),
            });
        }
        catch (error) {
            console.error('Wrong Crop Data:', error);
        }
    });
    return cropImage;
};
//# sourceMappingURL=useCropImage.js.map