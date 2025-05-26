import * as ImagePicker from 'expo-image-picker';
type Props = {
    acceptedFormats?: string[];
    onImageSelected: (uri: string) => void;
};
/**
 * @description Creates a function to open the device's image library and select an image.
 * Handles optional format filtering and calls a callback with the image URI.
 *
 * @param props - An object containing:
 * - `acceptedFormats`: `string[]` (optional) – Array of accepted image file extensions (e.g., ['.jpg', '.png']).
 * - `onImageSelected`: `(uri: string) => void` – Callback triggered with the URI of the selected image.
 *
 * @returns A function that launches the image picker and returns the result.
 */
export declare const createPickImageLibrary: ({ acceptedFormats, onImageSelected, }: Props) => () => Promise<ImagePicker.ImagePickerSuccessResult | ImagePicker.ImagePickerCanceledResult>;
export {};
//# sourceMappingURL=createPickImageLibrary.d.ts.map