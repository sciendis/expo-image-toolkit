import { useState } from 'react';
import { SavedImageDimensions, UserConfig } from '../../types';
import {
  createPickImageLibrary,
  createSaveCroppedImage,
  createTakePhotoCamera,
  isRotate90,
} from '../../utils';
import { useExpoImageToolkitContext } from './useExpoImageToolkitContext';

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
export const useExpoImageToolkit = function (userConfig?: UserConfig) {
  const [editedImageUri, setEditedImageUri] = useState<string | null>(null);
  const [savedImageDimensions, setSavedImageDimensions] =
    useState<SavedImageDimensions>({
      width: 0,
      height: 0,
      rotate: 0,
    });

  const { showEditor, hideEditor } = useExpoImageToolkitContext();

  const saveCroppedImage = createSaveCroppedImage({
    setSavedImageDimensions,
    onCrop: (editedUri) => {
      if (editedUri) setEditedImageUri(editedUri);
      hideEditor();
    },
  });

  const pickImage = createPickImageLibrary({
    acceptedFormats: userConfig?.acceptedFormats,
    onImageSelected: (originalUri) => {
      setEditedImageUri(null);
      showEditor(originalUri, saveCroppedImage, userConfig);
    },
  });
  const takePhoto = createTakePhotoCamera({
    onImageSelected: (originalUri) => {
      setEditedImageUri(null);
      showEditor(originalUri, saveCroppedImage, userConfig);
    },
  });

  const { width, height, rotate } = savedImageDimensions;
  const croppedDimensions = {
    width: (isRotate90(rotate) ? height : width) || 250,
    height: (isRotate90(rotate) ? width : height) || 250,
  };
  const aspectRatio = croppedDimensions.width / croppedDimensions.height;

  return {
    pickImage,
    takePhoto,
    editedImageUri,
    aspectRatio,
    ...croppedDimensions,
  };
};
