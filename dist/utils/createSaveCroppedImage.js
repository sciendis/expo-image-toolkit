var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as FileSystem from 'expo-file-system';
/**
 * @description Creates a function to save the cropped image on the device's file system.
 * It stores the image in the app's document directory, calls the callback with the `editedImageUri` and updates the saved image dimensions.
 *
 * @param props - An object containing:
 * - `setSavedImageDimensions`: `Dispatch<SetStateAction<SavedImageDimensions>>` – A state setter to store width, height, and rotation of the saved image.
 * - `onCrop`: `(editedImageUri?: string) => void` – Callback triggered after saving the cropped image. Called without arguments if no image was provided to close the editor.
 *
 * @returns A function that accepts image metadata and calls the callback with the `editedImageUri` to make the `editedImageUri` accessible in OnSubmit method and
 * also return the URI withing the useExpoImageToolkit hook.
 */
export const createSaveCroppedImage = function ({ setSavedImageDimensions, onCrop, }) {
    return function saveCroppedImage(args = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args) {
                onCrop();
                return;
            }
            const fileName = `cropped_image_${Date.now()}.png`;
            const newUri = `${FileSystem.documentDirectory}${fileName}`;
            const { uri, width, height } = args;
            yield FileSystem.copyAsync({
                from: uri,
                to: newUri,
            });
            onCrop(newUri);
            setSavedImageDimensions({ width, height });
        });
    };
};
//# sourceMappingURL=createSaveCroppedImage.js.map