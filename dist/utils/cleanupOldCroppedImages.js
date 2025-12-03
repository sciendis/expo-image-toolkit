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
 * @deprecated Temporary migration utility.
 *
 * Cleans up legacy cropped image files that were previously saved
 * in `FileSystem.documentDirectory` by older versions of the
 * Expo Image Toolkit.
 *
 * This function should ONLY be used internally during the
 * transition phase. It can safely be removed in the next major
 * release once all users have migrated and no legacy files remain.
 *
 * Purpose:
 * - Remove `cropped_image_*.png` files created before v1.2.10
 * - Avoid long-term storage bloat caused by outdated behavior
 *
 * Do NOT use this function for new features.
 * New versions of the editor no longer create permanent image files.
 */
export function cleanupOldCroppedImages() {
    return __awaiter(this, void 0, void 0, function* () {
        const dir = FileSystem.documentDirectory;
        try {
            const files = yield FileSystem.readDirectoryAsync(dir);
            const oldImages = files.filter((f) => f.startsWith('cropped_image_'));
            yield Promise.all(oldImages.map((name) => FileSystem.deleteAsync(dir + name, { idempotent: true })));
        }
        catch (e) {
            console.warn('Cleanup failed:', e);
        }
    });
}
//# sourceMappingURL=cleanupOldCroppedImages.js.map