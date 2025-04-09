import * as ImagePicker from 'expo-image-picker';

type Props = {
  acceptedFormats?: string[];
  onImageSelected: (uri: string) => void;
};

export const createPickImageLibrary = function ({
  acceptedFormats,
  onImageSelected,
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

    onImageSelected(uri);

    return result;
  };
};
