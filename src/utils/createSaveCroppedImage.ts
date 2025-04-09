import * as FileSystem from 'expo-file-system';
import { Dispatch, SetStateAction } from 'react';
import { OnSaveProps, SavedImageInfo } from '../types';

type Props = {
  setDimensions: Dispatch<SetStateAction<SavedImageInfo>>;
  onCrop: (editedImageUri?: string) => void;
};

export const createSaveCroppedImage = function ({
  setDimensions,
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
    setDimensions({ width, height, rotate });
  };
};
