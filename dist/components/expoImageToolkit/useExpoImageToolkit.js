import { useState } from 'react';
import { createPickImageLibrary, createSaveCroppedImage, createTakePhotoCamera, } from '../../utils';
import { useExpoImageToolkitContext } from './useExpoImageToolkitContext';
/**
 * @description To use the expoImageToolkit package, simply import this hook wherever you want to use it.
 * Make sure your app is wrapped with the `ExpoImageToolkitProvider`.
 *
 * This custom hook provides the image picker and camera functionality,
 * along with access to the edited image and its calculated dimensions.
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
export const useExpoImageToolkit = function (userConfig) {
    const [editedImageUri, setEditedImageUri] = useState(null);
    const [savedImageDimensions, setSavedImageDimensions] = useState({
        width: 0,
        height: 0,
    });
    const { showEditor } = useExpoImageToolkitContext();
    const saveCroppedImage = createSaveCroppedImage({
        setSavedImageDimensions,
        onCrop: (editedUri) => {
            if (editedUri)
                setEditedImageUri(editedUri);
        },
    });
    const pickImage = createPickImageLibrary({
        acceptedFormats: userConfig === null || userConfig === void 0 ? void 0 : userConfig.acceptedFormats,
        quality: userConfig === null || userConfig === void 0 ? void 0 : userConfig.quality,
        onImageSelected: (originalUri) => {
            setEditedImageUri(null);
            showEditor(originalUri, saveCroppedImage, userConfig);
        },
    });
    const takePhoto = createTakePhotoCamera({
        quality: userConfig === null || userConfig === void 0 ? void 0 : userConfig.quality,
        onImageSelected: (originalUri) => {
            setEditedImageUri(null);
            showEditor(originalUri, saveCroppedImage, userConfig);
        },
    });
    const { width, height } = savedImageDimensions;
    const croppedDimensions = {
        width: width || 250,
        height: height || 250,
    };
    const aspectRatio = croppedDimensions.width / croppedDimensions.height;
    return Object.assign({ pickImage,
        takePhoto,
        editedImageUri,
        aspectRatio }, croppedDimensions);
};
//# sourceMappingURL=useExpoImageToolkit.js.map