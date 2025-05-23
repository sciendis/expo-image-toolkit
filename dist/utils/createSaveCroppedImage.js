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
export const createSaveCroppedImage = function ({ setSavedImageDimensions, onCrop, }) {
    return function saveCroppedImage(args = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args) {
                onCrop();
                return;
            }
            const fileName = `cropped_image_${Date.now()}.png`;
            const newUri = `${FileSystem.documentDirectory}${fileName}`;
            const { uri, width, height, rotate } = args;
            yield FileSystem.copyAsync({
                from: uri,
                to: newUri,
            });
            onCrop(newUri);
            setSavedImageDimensions({ width, height, rotate });
        });
    };
};
//# sourceMappingURL=createSaveCroppedImage.js.map