import * as ImagePicker from 'expo-image-picker';
type Props = {
    onImageSelected: (uri: string) => void;
};
/**
 * @description Creates a function to open the device's camera and capture a photo.
 * If permission is granted, launches the camera and passes the image URI to a callback.
 *
 * @param props - An object containing:
 * - `onImageSelected`: `(uri: string) => void` – Callback triggered with the URI of the captured image.
 *
 * @returns A function that requests camera permission and launches the camera.
 */
export declare const createTakePhotoCamera: ({ onImageSelected }: Props) => () => Promise<ImagePicker.ImagePickerSuccessResult | ImagePicker.ImagePickerCanceledResult | undefined>;
export {};
//# sourceMappingURL=createTakePhotoCamera.d.ts.map