import { UserConfig } from '../../types';
/**
 * @description To use the expoImageToolkit package, simply import this hook wherever you want to use it.
 * Make sure your app is wrapped with the `ExpoImageToolkitProvider`.
 *
 * This custom hook provides the image picker and camera functionality, along with access to the edited image
 * and its calculated dimensions.
 *
 * @param userConfig - Optional user configuration for the toolkit.
 * @returns {object} An object containing:
 *  - `pickImage`: `() => Promise<void>` – Opens the image library to select an image.
 *  - `takePhoto`: `() => Promise<void>` – Opens the camera to take a photo.
 *  - `editedImageUri`: `string | null` – URI of the final cropped/edited image. Also available in `onSubmit` callback from `userConfig`.
 *  - `aspectRatio`: `number` – Aspect ratio (width/height) of the edited image for accurate rendering.
 *  - `width`: `number` – Width of the edited image in pixels (swapped with height if rotated 90/270 degrees).
 *  - `height`: `number` – Height of the edited image in pixels (swapped with width if rotated 90/270 degrees).
 */
export declare const useExpoImageToolkit: (userConfig?: UserConfig) => {
    width: number;
    height: number;
    pickImage: () => Promise<import("expo-image-picker").ImagePickerSuccessResult | import("expo-image-picker").ImagePickerCanceledResult>;
    takePhoto: () => Promise<import("expo-image-picker").ImagePickerSuccessResult | import("expo-image-picker").ImagePickerCanceledResult | undefined>;
    editedImageUri: string | null;
    aspectRatio: number;
};
//# sourceMappingURL=useExpoImageToolkit.d.ts.map