import * as ImagePicker from 'expo-image-picker';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setOriginalImage: Dispatch<SetStateAction<string | null>>;
  setShowEditor: Dispatch<SetStateAction<boolean>>;
  setImage: Dispatch<SetStateAction<string | null>>;
};

export const createTakePhotoCamera = function ({
  setOriginalImage,
  setShowEditor,
  setImage,
}: Props) {
  return async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== ImagePicker.PermissionStatus.GRANTED) {
      alert('Sorry, we need camera permissions to make this work!');
      setImage(null);
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return result;

    setOriginalImage(result.assets[0].uri);
    setShowEditor(true);
    setImage(null);

    return result;
  };
};
