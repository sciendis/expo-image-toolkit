var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as ImagePicker from 'expo-image-picker';
export const createPickImageLibrary = function ({ setOriginalImage, setShowEditor, }) {
    return function pickImageLibrary() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 1,
            });
            if (result.canceled)
                return;
            setOriginalImage(result.assets[0].uri);
            setShowEditor(true);
        });
    };
};
//# sourceMappingURL=createPickImageLibrary.js.map