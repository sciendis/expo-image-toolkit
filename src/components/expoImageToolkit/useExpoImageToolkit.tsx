import { useState } from 'react';
import { DefaultDimensionState } from '../../constants';
import { SavedImageInfo, UserConfig } from '../../types';
import {
  createPickImageLibrary,
  createSaveCroppedImage,
  createTakePhotoCamera,
} from '../../utils';
import { useExpoImageToolkitContext } from './useExpoImageToolkitContext';

export const useExpoImageToolkit = function (userConfig?: UserConfig) {
  const [editedImageUri, setEditedImageUri] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<SavedImageInfo>({
    ...DefaultDimensionState,
    rotate: 0,
  });

  const { showEditor, hideEditor } = useExpoImageToolkitContext();

  const saveCroppedImage = createSaveCroppedImage({
    setDimensions,
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

  const { width, height, rotate } = dimensions;
  const croppedDimensions = {
    width: (rotate % 180 === 90 ? height : width) || 250,
    height: (rotate % 180 === 90 ? width : height) || 250,
  };
  const aspectRatio = width / height;

  return {
    pickImage,
    editedImageUri,
    aspectRatio,
    takePhoto,
    ...croppedDimensions,
  };
};
