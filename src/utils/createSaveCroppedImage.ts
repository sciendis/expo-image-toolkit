import * as FileSystem from 'expo-file-system';
import { Dispatch, SetStateAction } from 'react';
import { OnSaveProps, SavedImageDimensions } from '../types';

type Props = {
  setSavedImageDimensions: Dispatch<SetStateAction<SavedImageDimensions>>;
  onCrop: (editedImageUri?: string) => void;
};

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
export const createSaveCroppedImage = function ({
  setSavedImageDimensions,
  onCrop,
}: Props) {
  return async function saveCroppedImage(
    args: OnSaveProps | undefined = undefined
  ) {
    if (!args) {
      onCrop();
      return;
    }

    const fileName = `cropped_image_${Date.now()}.png`;
    const newUri = `${FileSystem.documentDirectory}${fileName}`;

    const { uri, width, height } = args;

    await FileSystem.copyAsync({
      from: uri,
      to: newUri,
    });

    onCrop(newUri);
    setSavedImageDimensions({ width, height });
  };
};
