import * as FileSystem from 'expo-file-system';
import { Dispatch, SetStateAction } from 'react';
import { OnSaveProps, SavedImageInfo } from '../types';

type Props = {
  setDimensions: Dispatch<SetStateAction<SavedImageInfo>>;
  setImage: Dispatch<SetStateAction<string | null>>;
  setShowEditor: Dispatch<SetStateAction<boolean>>;
};

export const createSaveCroppedImage = function ({
  setDimensions,
  setImage,
  setShowEditor,
}: Props) {
  return async function saveCroppedImage({
    uri,
    width,
    height,
    rotate,
  }: OnSaveProps) {
    const fileName = `cropped_image_${Date.now()}.png`;
    const newUri = `${FileSystem.documentDirectory}${fileName}`;

    await FileSystem.copyAsync({
      from: uri,
      to: newUri,
    });

    setImage(newUri);
    setShowEditor(false);
    setDimensions({ width, height, rotate });
  };
};
