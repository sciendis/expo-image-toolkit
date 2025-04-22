var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FlipType, ImageManipulator, SaveFormat, } from 'expo-image-manipulator';
import { isRotate90 } from './isRotate90';
export const rotateAndCropManipulator = function ({ image, rotate, flipX, flipY, cropData, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const format = { format: SaveFormat.PNG };
        const rotateVal = rotate.get();
        const flipValX = flipX.get();
        const flipValY = flipY.get();
        const manipulate = ImageManipulator.manipulate(image);
        let manipulator = manipulate.rotate(rotateVal);
        if (flipValX === 180) {
            manipulator = manipulator.flip(isRotate90(rotateVal) ? FlipType.Horizontal : FlipType.Vertical);
        }
        if (flipValY === 180) {
            manipulator = manipulator.flip(isRotate90(rotateVal) ? FlipType.Vertical : FlipType.Horizontal);
        }
        if (cropData)
            manipulator = manipulator.crop(cropData);
        const result = yield manipulator.renderAsync();
        return yield result.saveAsync(format);
    });
};
//# sourceMappingURL=rotateAndCropManipulator.js.map