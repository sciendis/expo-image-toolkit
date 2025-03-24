import * as ImagePicker from 'expo-image-picker';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setOriginalImage: Dispatch<SetStateAction<string | null>>;
  setShowEditor: Dispatch<SetStateAction<boolean>>;
  setImage: Dispatch<SetStateAction<string | null>>;
  acceptedFormats?: string[];
};

export const createPickImageLibrary = function ({
  setOriginalImage,
  setShowEditor,
  setImage,
  acceptedFormats,
}: Props) {
  return async function pickImageLibrary() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return result;

    const uri = result.assets[0].uri;

    if (acceptedFormats && acceptedFormats.length) {
      const isAccepted = acceptedFormats.some((format) => uri.endsWith(format));
      if (!isAccepted) return result;
    }

    setOriginalImage(uri);
    setShowEditor(true);
    setImage(null);

    return result;
  };
};
