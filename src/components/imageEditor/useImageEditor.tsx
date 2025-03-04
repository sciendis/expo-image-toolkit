import {
  createPickImageLibrary,
  createSaveCroppedImage,
  createTakePhotoCamera,
} from '@/utils';
import { useState } from 'react';
import { Modal } from 'react-native';
import { ImageEditor } from './ImageEditor';
import { DefaultDimensionState } from '@/constants';

export const useImageEditor = function () {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const [image, setImage] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({
    ...DefaultDimensionState,
    rotate: 0,
  });

  const pickImage = createPickImageLibrary({ setOriginalImage, setShowEditor });
  const takePhoto = createTakePhotoCamera({ setOriginalImage, setShowEditor });
  const saveCroppedImage = createSaveCroppedImage({
    setDimensions,
    setImage,
    setShowEditor,
  });

  const onCancel = () => setShowEditor(false);

  const ImageEditorModal = () => (
    <Modal visible={showEditor} animationType="slide" onRequestClose={onCancel}>
      <ImageEditor
        image={originalImage}
        onCrop={saveCroppedImage}
        onCancel={onCancel}
      />
    </Modal>
  );

  return {
    pickImage,
    image,
    dimensions,
    ImageEditorModal,
    takePhoto,
  };
};
