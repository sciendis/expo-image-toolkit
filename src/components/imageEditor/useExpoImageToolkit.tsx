import { useState } from 'react';
import { Modal } from 'react-native';
import { DefaultDimensionState } from '../../constants';
import { OnSaveProps, SavedImageInfo, UserConfig } from '../../types';
import {
  createPickImageLibrary,
  createSaveCroppedImage,
  createTakePhotoCamera,
} from '../../utils';
import { ImageEditor } from './ImageEditor';

export const useExpoImageToolkit = function (userConfig?: UserConfig) {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<SavedImageInfo>({
    ...DefaultDimensionState,
    rotate: 0,
  });

  const pickImage = createPickImageLibrary({
    setOriginalImage,
    setShowEditor,
    setImage,
  });
  const takePhoto = createTakePhotoCamera({
    setOriginalImage,
    setShowEditor,
    setImage,
  });
  const saveCroppedImage = createSaveCroppedImage({
    setDimensions,
    setImage,
    setShowEditor,
  });

  const onCancel = () => {
    setShowEditor(false);
    setImage(null);
    userConfig?.onCancel?.();
  };

  const onCrop = (props: OnSaveProps) => {
    saveCroppedImage(props);
    userConfig?.onSubmit?.(props.uri);
  };

  const ImageEditorModal = () => (
    <Modal visible={showEditor} animationType="slide" onRequestClose={onCancel}>
      <ImageEditor
        image={originalImage}
        onCrop={onCrop}
        onCancel={onCancel}
        userConfig={userConfig}
      />
    </Modal>
  );

  const { width, height, rotate } = dimensions;
  const croppedDimensions = {
    width: (rotate % 180 === 90 ? height : width) || 250,
    height: (rotate % 180 === 90 ? width : height) || 250,
  };
  const aspectRatio = width / height;

  return {
    pickImage,
    image,
    aspectRatio,
    ImageEditorModal,
    takePhoto,
    ...croppedDimensions,
  };
};
