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
/**
 * @description This is a reusable function to do the crop/rotate/flip on the image with ImageManipulator
 * based on the cropData and current state of rotate and flip. This is used once on the finish button
 * (CropImageButton - useCropImage) and once in the useSaveStateOnSwitch when the image is rotated ±90/±270.
 *
 * @param Props - An object containing:
 * - `image`: `string` – The image URI to manipulate.
 * - `rotate`: `SharedValue<number>` – The current rotation value.
 * - `flipX`: `SharedValue<number>` – The horizontal flip value.
 * - `flipY`: `SharedValue<number>` – The vertical flip value.
 * - `cropData`: `ActionCrop['crop']` (optional) – Optional crop data to apply. includes zoom on focal point state
 * - quality defines the compression rate when picking or taking an image. 0 = lowest quality, 1 = highest quality
 *
 * @returns `Promise<string>` – A promise that resolves to the manipulated image URI saved as PNG.
 */
export const rotateAndCropManipulator = function ({ image, rotate, flipX, flipY, cropData, quality = 1, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const saveOptions = {
            format: SaveFormat.PNG,
            compress: quality,
        };
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
        return yield result.saveAsync(saveOptions);
    });
};
//# sourceMappingURL=rotateAndCropManipulator.js.map