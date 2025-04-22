import * as FileSystem from 'expo-file-system';
import { Dispatch, SetStateAction } from 'react';
import { OnSaveProps, SavedImageDimensions } from '../types';

type Props = {
  setSavedImageDimensions: Dispatch<SetStateAction<SavedImageDimensions>>;
  onCrop: (editedImageUri?: string) => void;
};

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

    const { uri, width, height, rotate } = args;

    await FileSystem.copyAsync({
      from: uri,
      to: newUri,
    });

    onCrop(newUri);
    setSavedImageDimensions({ width, height, rotate });
  };
};
