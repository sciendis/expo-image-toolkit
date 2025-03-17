import * as ImagePicker from 'expo-image-picker';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setOriginalImage: Dispatch<SetStateAction<string | null>>;
  setShowEditor: Dispatch<SetStateAction<boolean>>;
};

export const createPickImageLibrary = function ({
  setOriginalImage,
  setShowEditor,
}: Props) {
  return async function pickImageLibrary() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;

    setOriginalImage(result.assets[0].uri);
    setShowEditor(true);
  };
};
