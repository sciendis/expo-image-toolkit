var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getCropData, rotateAndCropManipulator } from '../utils';
import { useImageEditorContext } from './useImageEditorContext';
export const useCropImage = function ({ onCrop }) {
    const { image, boxPosition, boxScale, zoom, rotate, flipX, flipY, setIsSaving, focalPoint, imagePosition, dimensions, } = useImageEditorContext();
    const cropImage = () => __awaiter(this, void 0, void 0, function* () {
        setIsSaving(true);
        const cropData = getCropData({
            dimensions,
            boxScale,
            boxPosition,
            imagePosition,
            zoom,
            focalPoint,
        });
        try {
            const result = yield rotateAndCropManipulator({
                image,
                rotate,
                flipX,
                flipY,
                cropData,
            });
            onCrop({
                uri: result.uri,
                width: cropData.width,
                height: cropData.height,
                rotate: rotate.get(),
            });
        }
        catch (error) {
            console.error('Wrong Crop Data:', error);
            onCrop(); // Call onCrop without arguments to close the editor if something fails, to avoid confusion caused by the loading indicator.
        }
    });
    return cropImage;
};
//# sourceMappingURL=useCropImage.js.map